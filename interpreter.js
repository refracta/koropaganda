const BodaCommand = require('./commands/boda_command');
const EmploymentRateCommand = require('./commands/employment_rate_command');

class Interpreter {
    parameterStack = [];
    returnStack = [];
    dataStack = [];
    commands = [new BodaCommand(), new EmploymentRateCommand()];

    constructor(stdinHandler) {
        this.stdinHandler = stdinHandler;
    }

    eval(code) {
        code = code.trim();
        let commandStack = code.split('\n');
        for (let i = 0; i < commandStack.length; i++) {
            let currentCode = commandStack[i];
            let command = this.commands.find(c => c.isMatchedCode(currentCode));
            if (!command) {
                throw new Error('Invalid command.');
            }
            command.eval(this, currentCode, i, commandStack);
        }
    }
}

module.exports = Interpreter;