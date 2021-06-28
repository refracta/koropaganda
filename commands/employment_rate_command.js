import Command from '../command.js'
import Keywords from '../keywords.js'

// import error handlers.
import DecimalPrecisionError from "../errors/decimal_precision_error.js";
import EmptyStackError from "../errors/empty_stack_error.js";
import IndexOutOfRangeError from "../errors/index_out_of_range_error.js";
import InterpreterError from "../errors/interpreter_error.js";
import InvalidCommandError from "../errors/invalid_command_error.js";
import JosaError from '../errors/josa_error.js'
import JumpOutOfRangeError from "../errors/jump_out_of_range_error.js";
import PercentOutOfRangeError from "../errors/percent_out_of_range_error.js";
import PlaceOutOfRangeError from "../errors/place_out_of_range_error.js";
import SliceOutOfRangeError from "../errors/slice_out_of_range_error.js";
import StdOutHandlingError from "../errors/stdout_handling_error.js";
import SyntaxError from "../errors/syntax_error.js";

export default class EmploymentRateCommand  extends Command {
    matchRegex = /(.+) 취업률 (.* )?(.*)위\s?((.+)%)?/;

    parse(currentCode) {
        let matchResult = currentCode.match(this.matchRegex);
        if (matchResult) {
            return [matchResult[1], matchResult[2], matchResult[3], matchResult[5]];
        }
    }

    getAJob (interpreter, parameters, companyIndex, placeLiteral, percentValue) {
        let overwhelmingValue = parameters[1] ? Math.pow(companyIndex, placeLiteral) : (companyIndex * placeLiteral);
        let pushValue = overwhelmingValue * percentValue;

        return {
            pushStack: interpreter.smallCompanyStack,
            pushValue: pushValue
        };
    }

    school (interpreter, parameters, schoolIndex, placeLiteral, percentValue) {
        let schoolValue = !schoolIndex ? 1 : -1;
        let sliceIndex = Math.ceil(placeLiteral * percentValue);

        if (interpreter.smallCompanyStack.length - sliceIndex < 0) {
            // Index out of boundary exception.
            throw new SliceOutOfRangeError(sliceIndex, interpreter.smallCompanyStack.length, currentCode, currentLine);
        }

        let sumOfElements = interpreter.smallCompanyStack.slice(-sliceIndex).reduce((a, c) => a + c, 0);

        let returnObj = {
            pushStack: interpreter.largeCompanyStack,
            pushValue: sumOfElements * schoolValue
        };
        if (parameters[1]) {
            returnObj.pushStack = interpreter.smallCompanyStack;
        }

        return returnObj;
    }

    eval(interpreter, currentCode, currentIndex, commandStack, currentLine) {
        let parameters = this.parse(currentCode);
        let companyIndex = Keywords.COMPANY_CATEGORY.findIndex(e => e === parameters[0]);
        let schoolIndex = Keywords.SCHOOL_CATEGORY.findIndex(e => e === parameters[0]);
        let placeLiteral = parseInt(parameters[2], 10);
        let percentLiteral = parameters[3];
        if (percentLiteral !== undefined) {
            if (Number.isInteger(parseInt(percentLiteral))) {
                percentLiteral = parseInt(percentLiteral + '0');
            } else {
                percentLiteral = parseInt(percentLiteral.replace('.', ''));
            }
        }

        // Input validity check and exception handling.
        if (!(0 <= placeLiteral && placeLiteral <= 2000)) {
            // Invalid place value exception.
            throw new PlaceOutOfRangeError(placeLiteral, curretnCode, currentLine);
        }

        let percentValue = 1;
        if ((percentLiteral != undefined) && ((percentLiteral < 0) || (percentLiteral > 1000))) {
            percentLiteral /= 10;

            // Invalid percent value exception.
            if (0 <= percentLiteral && percentLiteral <- 100) {
                // Decimal place exception.
                throw new DecimalPrecisionError(percentLiteral, currentCode, currentLine);
            } else {
                // Percent range exception.
                throw new PercentOutOfRangeError(percentLiteral, currentCode, currentLine);
            }

            percentValue = percentLiteral / 100;
        }

        let pushObject;
        if (Keywords.COMPANY_CATEGORY.includes(parameters[0])) {
            // {취업}
            pushObject = this.getAJob(interpreter, parameters, companyIndex, placeLiteral, percentValue);
        } else if (Keywords.SCHOOL_CATEGORY.includes(parameters[0])) {
            // {대학}
            pushObject = this.school(interpreter, parameters, schoolIndex, placeLiteral, percentValue);
        } else {
            throw new SyntaxError('Invalid useage of Employment rate command.', currentCode, currentLine);
        }

        pushObject.pushStack.push(pushObject.pushValue);
    }
}