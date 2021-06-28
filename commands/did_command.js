import Command from '../command.js'
import Keywords from '../keywords.js'

// import error handlers.
import EmptyStackError from "../errors/empty_stack_error.js";
import IndexOutOfRangeError from "../errors/index_out_of_range_error.js";
import InterpreterError from "../errors/interpreter_error.js";
import InvalidCommandError from "../errors/invalid_command_error.js";
import JosaError from '../errors/josa_error.js'
import JumpOutOfRangeError from "../errors/jump_out_of_range_error.js";
import StdOutHandlingError from "../errors/stdout_handling_error.js";
import SyntaxError from "../errors/syntax_error.js";

export default class DidCommand extends Command {
    matchRegex = /(.+)[이가] (.+)했다\!/

    parse(currentCode) {
        let matchResult = currentCode.match(this.matchRegex);
        if (matchResult) {
            return [matchResult[1], matchResult[2]];
        }
    }

    eval(interpreter, currentCode, currentIndex, commandStack, currentLine) {
        let parameters = this.parse(currentCode);
        if ((Keywords.JOSA_GA_CATEGORY.includes(parameters[0]) && currentCode[parameters[0].length] === '이') ||
            (!Keywords.JOSA_GA_CATEGORY.includes(parameters[0]) && currentCode[parameters[0].length] === '가')) {
            let currectJosa = currentCode[parameters[0].length] === '이' ? '가' : '이';
            throw new JosaError(currentCode[parameters[0].length], currectJosa, currentCode, currentLine);
        }
        if (Keywords.KOREATECH_CATEGORY.includes(parameters[0]) && Keywords.SKY_ENG === parameters[1]) {
            // {KOREATECH}이 {SKY}했다!
            if (interpreter.midCompanyStack.length === 0) {
                throw new EmptyStackError(currentCode, currentLine);
            }
            if (!interpreter.stdoutHandler) {
                throw new StdOutHandlingError(currentCode, currentLine);
            } else {
                interpreter.stdoutHandler(String.fromCharCode(interpreter.midCompanyStack.pop()));
            }
        } else if (Keywords.SKY_ENG === parameters[0] && Keywords.KOREATECH_CATEGORY.includes(parameters[1])) {
            // {SKY}가 {KOREATECH}했다!
            if (interpreter.midCompanyStack.length === 0) {
                throw new EmptyStackError(currentCode, currentLine);
            }
            if (!interpreter.stderrHandler) {
                throw new StdOutHandlingError(currentCode, currentLine);
            } else {
                interpreter.stderrHandler(String.fromCharCode(interpreter.midCompanyStack.pop()));
            }
        } else if (Keywords.KOREATECH_CATEGORY.includes(parameters[0]) && Keywords.KOREATECH_CATEGORY.includes(parameters[1])) {
            // {KOREATECH}이 {KOREATECH}했다!
            // process.exit(0);
            interpreter.exitHandler(0);
        } else if (Keywords.SKY_ENG === parameters[0] && Keywords.SKY_ENG === parameters[1]) {
            // {SKY}가 {SKY}했다!
            // process.exit(1);
            interpreter.exitHandler(1);
        } else if (Keywords.COMPANY_CATEGORY.includes(parameters[0]) && Keywords.DEFAULT_CATEGORY.includes(parameters[1])) {
            // {취업}이 {기본}했다!
            let companyIndex = Keywords.COMPANY_CATEGORY.findIndex(e => e === parameters[0]);
            let stack = interpreter.stackList[companyIndex];
            if (stack.length === 0) {
                throw new EmptyStackError(currentCode, currentLine);
            }
            interpreter.stackList[companyIndex].pop();
        } else if (Keywords.DEFAULT_CATEGORY.includes(parameters[0]) && Keywords.COMPANY_CATEGORY.includes(parameters[1])) {
            // {기본}이 {취업}했다!
            let companyIndex = Keywords.COMPANY_CATEGORY.findIndex(e => e === parameters[1]);

            if (interpreter.smallCompanyStack.length - companyIndex - 2 < 0) {
                throw new IndexOutOfRangeError(companyIndex, interpreter.smallCompanyStack.length, currentCode, currentLine);
            }
            if (interpreter.smallCompanyStack[interpreter.smallCompanyStack.length - companyIndex - 2] !== 0) {
                let jumpDelta = interpreter.smallCompanyStack[interpreter.smallCompanyStack.length - companyIndex - 1];
                if (currentIndex + jumpDelta < 0 || commandStack.length - 1 < currentIndex + jumpDelta) {
                    throw new JumpOutOfRangeError(currentIndex, commandStack.length, currentCode, currentLine);
                } else {
                    interpreter.jumpDelta = jumpDelta;
                }
            }
        } else if (Keywords.COMPANY_CATEGORY.includes(parameters[0]) && Keywords.COMPANY_CATEGORY.includes(parameters[1])) {
            // {취업}이 {취업}했다!
            let companyIndex1 = Keywords.COMPANY_CATEGORY.findIndex(e => e === parameters[0]);
            let companyIndex2 = Keywords.COMPANY_CATEGORY.findIndex(e => e === parameters[1]);
            let stack1 = interpreter.stackList[companyIndex1];
            let stack2 = interpreter.stackList[companyIndex2];
            if (stack1.length === 0) {
                if (companyIndex1 !== 2) {
                    throw new EmptyStackError(currentCode, currentLine);
                } else {
                    if (!interpreter.stdinHandler) {
                        throw new StdOutHandlingError(cuttentCode, currentLine);
                    } else {
                        interpreter.stdinStack = interpreter.stdinHandler().split('').reverse().map(e => e.charCodeAt(0));
                    }
                }
            }
            stack2.push(stack1.pop());
        } else {
            throw new SyntaxError('Invalid useage of Did command.', cuttentCode, curretnLine);
        }
    }
}