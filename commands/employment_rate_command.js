import Command from '../command.js'
import Keywords from '../keywords.js'

// import error handlers.
import PercentOutOfRangeError from "../errors/percent_out_of_range_error.js";
import PlaceOutOfRangeError from "../errors/place_out_of_range_error.js";
import SliceOutOfRangeError from "../errors/slice_out_of_range_error.js";
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
        let pushValue = Math.ceil(overwhelmingValue * percentValue / 100);

        return {
            pushStack: interpreter.smallCompanyStack,
            pushValue: pushValue
        };
    }

    school (interpreter, parameters, schoolIndex, placeLiteral, percentValue, commandInfo) {
        let schoolValue = !schoolIndex ? 1 : -1;
        let sliceIndex = Math.ceil(placeLiteral * percentValue / 100);

        if (interpreter.smallCompanyStack.length - sliceIndex < 0) {
            // Index out of boundary exception.
            throw new SliceOutOfRangeError(sliceIndex, interpreter.smallCompanyStack.length, commandInfo.currentCode, commandInfo.currentLine);
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
        let percentValue = percentLiteral !== undefined ? parseFloat(percentLiteral) : 1;
        if (percentLiteral !== undefined) {
            if (Number.isInteger(parseFloat(percentLiteral))) {
                percentLiteral = parseInt(percentLiteral + '0');
            } else {
                percentLiteral = parseInt(percentLiteral.replace('.', ''));
            }
        }

        // Input validity check and exception handling.
        if (!(1 <= placeLiteral && placeLiteral <= 2000)) {
            // Invalid place value exception.
            throw new PlaceOutOfRangeError(placeLiteral, currentCode, currentLine);
        }

        // percent validity cehck.
        let percentParsed = percentLiteral !== undefined ? parameters[3].split('.') : undefined;
        if (percentParsed !== undefined && !Number.isInteger(percentValue)) {
            if (percentParsed[1].length >= 2 || (!(0 <= percentValue && percentValue <= 100))) {
                throw new PercentOutOfRangeError(percentValue, currentCode, currentLine);
            }
        }

        let pushObject;
        if (Keywords.COMPANY_CATEGORY.includes(parameters[0])) {
            // {취업}
            pushObject = this.getAJob(interpreter, parameters, companyIndex, placeLiteral, percentValue);
        } else if (Keywords.SCHOOL_CATEGORY.includes(parameters[0])) {
            // {대학}
            pushObject = this.school(interpreter, parameters, schoolIndex, placeLiteral, percentValue, { currentCode, currentLine });
        } else {
            throw new SyntaxError('Invalid useage of Employment rate command.', currentCode, currentLine);
        }

        pushObject.pushStack.push(pushObject.pushValue);
    }
}