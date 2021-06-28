import Command from '../command.js'
import Keywords from '../keywords.js'

export default class BodaCommand extends Command {
    matchRegex = /(.+)보다 (.+)/;

    parse(currentCode) {
        let matchResult = currentCode.match(this.matchRegex);
        if (matchResult) {
            return [matchResult[1], matchResult[2]];
        }
    }

    eval(interpreter, currentCode, currentIndex, commandStack, currentLine) {
        let parameters = this.parse(currentCode);
        if (Keywords.COMPANY_CATEGORY.includes(parameters[0]) && Keywords.DEFAULT_CATEGORY.includes(parameters[1])) {
            // {취업}보다 {기본}
            let companyIndex = Keywords.COMPANY_CATEGORY.findIndex(e => e === parameters[0]);
            if (interpreter.smallCompanyStack.length - companyIndex - 2 < 0) {
                throw new Error('Invalid index parameter.');
            }
            let returnData = interpreter.smallCompanyStack[interpreter.smallCompanyStack.length - companyIndex - 2] < interpreter.smallCompanyStack[interpreter.smallCompanyStack.length - companyIndex - 1] ? 1 : 0;
            interpreter.largeCompanyStack.push(returnData);
        } else if (Keywords.SKY_ENG === parameters[0] && Keywords.KOREATECH_CATEGORY.includes(parameters[1])) {
            // {SKY}보다 {KOREATECH}
            interpreter.smallCompanyStack.push(1);
        } else if (Keywords.KOREATECH_CATEGORY.includes(parameters[0]) && Keywords.SKY_ENG === parameters[1]) {
            // {KOREATECH}보다 {SKY}
            interpreter.smallCompanyStack.push(-1);
        } else if (
            (Keywords.KOREATECH_CATEGORY.includes(parameters[0]) && Keywords.KOREATECH_CATEGORY.includes(parameters[1])) ||
            (Keywords.SKY_ENG === parameters[0] === parameters[1])
        ) {
            // {KOREATECH}보다 {KOREATECH}
            // {SKY}보다 {SKY}
            interpreter.smallCompanyStack.push(0);
        } else {
            throw new Error('Invalid use of Boda command.');
        }
    }
}