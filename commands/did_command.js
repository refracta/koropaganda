import Command from '../command.js'
import Keywords from '../keywords.js'
import JosaError from '../errors/josa_error.js'

export default class DidCommand extends Command {
    matchRegex = /(.+)[이가] (.+)했다\!/;

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
            throw new JosaError('Invalid use of josa.', currentCode, currentLine);
        }
        if (Keywords.KOREATECH_CATEGORY.includes(parameters[0]) && Keywords.SKY_ENG === parameters[1]) {
            // {KOREATECH}이 {SKY}했다!
            if (interpreter.midCompanyStack.length === 0) {
                throw new Error('There are no elements to output in stack.');
            }
            if (!interpreter.stdoutHandler) {
                throw new Error('Could not find Standard Output Handler.');
            } else {
                interpreter.stdoutHandler(String.fromCharCode(interpreter.midCompanyStack.pop()));
            }
        } else if (Keywords.SKY_ENG === parameters[0] && Keywords.KOREATECH_CATEGORY.includes(parameters[1])) {
            // {SKY}가 {KOREATECH}했다!
            if (interpreter.midCompanyStack.length === 0) {
                throw new Error('There are no elements to output in stack.');
            }
            if (!interpreter.stderrHandler) {
                throw new Error('Could not find Standard Error Handler.');
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
                throw new Error('There are no elements left in the stack to pull out.');
            }
            interpreter.stackList[companyIndex].pop();
        } else if (Keywords.DEFAULT_CATEGORY.includes(parameters[0]) && Keywords.COMPANY_CATEGORY.includes(parameters[1])) {
            // {기본}이 {취업}했다!
            let companyIndex = Keywords.COMPANY_CATEGORY.findIndex(e => e === parameters[1]);

            if (interpreter.smallCompanyStack.length - companyIndex - 2 < 0) {
                throw new Error('Invalid index parameter.');
            }
            if (interpreter.smallCompanyStack[interpreter.smallCompanyStack.length - companyIndex - 2] !== 0) {
                let jumpDelta = interpreter.smallCompanyStack[interpreter.smallCompanyStack.length - companyIndex - 1];
                if (currentIndex + jumpDelta < 0 || commandStack.length - 1 < currentIndex + jumpDelta) {
                    throw new Error('Invalid jump index parameter.');
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
                    throw new Error('There are no elements left in the stack to pull out.');
                } else {
                    if (!interpreter.stdinHandler) {
                        throw new Error('Could not find Standard Input Handler.');
                    } else {
                        interpreter.stdinStack = interpreter.stdinHandler().split('').reverse().map(e => e.charCodeAt(0));
                    }
                }
            }
            stack2.push(stack1.pop());
        } else {
            throw new Error('Invalid use of Did command.');
        }
    }
}