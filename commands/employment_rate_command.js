const Command = require('../command');
const Keywords = require('../keywords');

class EmploymentRateCommand  extends Command {
    matchRegex = /(.+) 취업률 (.* )?(.*)위\s?((.+)%)?/;

    parse(currentCode) {
        let matchResult = currentCode.match(this.matchRegex);
        if (matchResult) {
            return [matchResult[1], matchResult[2], matchResult[3], matchResult[5]];
        }
    }

    getAJob(interpreter, parameters)
    {
        let companyIndex = Keywords.COMPANY_CATEGORY.findIndex(e => e === parameters[0]);
        let Y = parseInt(parameters[2], 10);
        let Z = parameters[3];
        if (Y < 1)
            throw new Error('Invalid place parameter.');
        if ((Z != undefined) && (parseFloat(Z) % 1 === 0))
            Z = parseInt(parseInt(Z) + '0');
        else if ((Z != undefined) && (parseFloat(Z) % 1 != 0))
            Z = parseInt(Z.replace('.', ''));
        if ((Z != undefined) && ((Z < 0) || (Z > 1000)))
            throw new Error('Invalid percent parameter.');
        Z = Z ? (Z / 10) : Z;

        let overPart = parameters[1] ? Math.pow(companyIndex, parseInt(parameters[2], 10)) : (companyIndex * Y);
        let ZPart = Z ? Z / 100.0 : 1;

        let result = Math.ceil(overPart * ZPart);
        interpreter.parameterStack.push(result);
    }

    univ(interpreter, parameters)
    {
        let univIndex = Keywords.SCHOOL_CATEGORY.findIndex(e => e === parameters[0]);
        let Y = parseInt(parameters[2], 10);
        let Z = parameters[3];
        if (Y < 1)
            throw new Error('Invalid place parameter.');
        if ((Z != undefined) && (parseFloat(Z) % 1 === 0))
            Z = parseInt(parseInt(Z) + '0');
        else if ((Z != undefined) && (parseFloat(Z) % 1 != 0))
            Z = parseInt(Z.replace('.', ''));
        if ((Z != undefined) && ((Z < 0) || (Z > 1000)))
            throw new Error('Invalid percent parameter.');
        Z = Z ? (Z / 10) : Z;
        
        let univPart = !univIndex ? 1 : -1;
        let ZPart = Z ? Z / 100.0 : 1;
        let pushIndex = Math.ceil(Y * ZPart);
        if (interpreter.parameterStack.length - pushIndex < 0)
            throw new Error('Invalid index parameter.');
        let temp = interpreter.parameterStack.slice(-pushIndex).reduce((a, c) => a + c, 0);
        if (parameters[1])
            interpreter.parameterStack.push(univPart * temp);
        else
            interpreter.returnStack.push(univPart * temp);
    }

    eval(interpreter, currentCode, currentIndex, commandStack) {
        let parameters = this.parse(currentCode);
        if (!parameters) {
            throw new Error('A required parameter is missing from the Employment rate command.');
        } else if (Keywords.COMPANY_CATEGORY.includes(parameters[0])) {
            // {취업}
            this.getAJob(interpreter, parameters);
        } else if (Keywords.SCHOOL_CATEGORY.includes(parameters[0])) {
            // {대학}
            this.univ(interpreter, parameters);
        } else {
            throw new Error('Invalid use of Employment rate command.');
        }
    }
}

module.exports = EmploymentRateCommand;