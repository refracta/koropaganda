const Command = require('../command');
const Keywords = require('../keywords');

class BodaCommand extends Command {
    matchRegex = /(.+)보다 (.+)/;

    parse(currentCode) {
        let matchResult = currentCode.match(this.matchRegex);
        if (matchResult) {
            return [matchResult[1], matchResult[2]];
        }
    }

    eval(interpreter, currentCode, currentIndex, commandStack) {
        let parameters = this.parse(currentCode);
        if (!parameters) {
            throw new Error('A required parameter is missing from the Boda command.');
        }
        if (Keywords.COMPANY_CATEGORY.includes(parameters[0]) && Keywords.DEFAULT_CATEGORY.includes(parameters[1])) {
            // {취업}보다 {기본}
            let companyIndex = Keywords.COMPANY_CATEGORY.findIndex(e => e === parameters[0]);
            if (interpreter.parameterStack.length - companyIndex - 2 < 0) {
                throw new Error('Invalid index parameter.');
            }
            let returnData = interpreter.parameterStack[interpreter.parameterStack.length - companyIndex - 2] < interpreter.parameterStack[interpreter.parameterStack.length - companyIndex - 1] ? 1 : 0;
            interpreter.returnStack.push(returnData);
        } else if (Keywords.SKY_ENG === parameters[0] && Keywords.KOREATECH_CATEGORY.includes(parameters[1])) {
            // {SKY}보다 {KOREATECH}
            interpreter.parameterStack.push(1);
        } else if (Keywords.KOREATECH_CATEGORY.includes(parameters[0]) && Keywords.SKY_ENG === parameters[1]) {
            // {KOREATECH}보다 {SKY}
            interpreter.parameterStack.push(-1);
        } else if (
            (Keywords.KOREATECH_CATEGORY.includes(parameters[0]) && Keywords.KOREATECH_CATEGORY.includes(parameters[1])) ||
            (Keywords.SKY_ENG === parameters[0] === parameters[1])
        ) {
            // {KOREATECH}보다 {KOREATECH}
            // {SKY}보다 {SKY}
            interpreter.parameterStack.push(0);
        } else {
            throw new Error('Invalid use of Boda command.');
        }
    }
}

module.exports = BodaCommand;