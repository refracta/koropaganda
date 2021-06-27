const BodaCommand = require('./commands/boda_command');
const EmploymentRateCommand = require('./commands/employment_rate_command');
const DidCommand = require('./commands/did_command');

class Interpreter {
    stdinStack = [];
    parameterStack = [];
    returnStack = [];
    dataStack = [];

    commands = [new BodaCommand(), new DidCommand(), new EmploymentRateCommand()];
    jumpDelta = 0;


    get stackList() {
        return [this.stdinStack, this.parameterStack, this.dataStack, this.returnStack];
    }

    constructor(stdinHandler) {
        this.stdinHandler = stdinHandler;
    }

    eval(code) {
        code = code.trim();
        let commandStack = code.split('\n').filter(c => !c.match(/<(.*) 공시>/));
        for (let i = 0; i < commandStack.length; i++) {
            let currentCode = commandStack[i];
            let command = this.commands.find(c => c.isMatchedCode(currentCode));
            if (!command) {
                throw new Error('Invalid command.');
            }
            // console.log('<', i + '번째', currentCode, '>');
            // console.log('PARAM:', JSON.stringify(this.parameterStack), 'RETURN:', JSON.stringify(this.returnStack), 'DATA:', JSON.stringify(this.dataStack))
            command.eval(this, currentCode, i, commandStack);
            if (this.jumpDelta !== 0) {
                i += this.jumpDelta - 1;
                this.jumpDelta = 0;
                continue;
            }
        }
    }
}

module.exports = Interpreter;