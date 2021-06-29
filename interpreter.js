import BodaCommand from './commands/boda_command.js'
import DidCommand from './commands/did_command.js'
import EmploymentRateCommand from './commands/employment_rate_command.js'
import InvalidCommandError from './errors/invalid_command_error.js'

export default class Interpreter {
    publicCompanyStack = [];
    smallCompanyStack = [];
    midCompanyStack = [];
    largeCompanyStack = [];

    commands = [new BodaCommand(), new DidCommand(), new EmploymentRateCommand()];
    jumpDelta = 0;

    constructor(stdinHandler, stdoutHandler, stderrHandler, exitHandler, debugHandler) {
        this.stdinHandler = stdinHandler;
        this.stdoutHandler = stdoutHandler;
        this.stderrHandler = stderrHandler;
        this.exitHandler = exitHandler;
        this.debugHandler = debugHandler;
    }

    get stackList() {
        return [this.publicCompanyStack, this.smallCompanyStack, this.midCompanyStack, this.largeCompanyStack];
    }

    async eval(code) {
        let commandStack = code.split('\n').map((code, line) => ({
            code: code.trim(),
            line: (line + 1)
        })).filter(c => !c.code.match(/(<(.*) 공시>)|(^\s*$)/));
        for (let i = 0; i < commandStack.length; i++) {
            let currentCode = commandStack[i].code;
            let currentLine = commandStack[i].line;
            let command = this.commands.find(c => c.isMatchedCode(currentCode));
            if (!command) {
                throw new InvalidCommandError(currentCode, currentLine);
            }
            command.eval(this, currentCode, i, commandStack, currentLine);
            if (this.debugHandler) {
                try {
                    await this.debugHandler({
                        commandStack,
                        index: i,
                        code: currentCode,
                        line: currentLine,
                        parameters: command.parse(currentCode),
                        publicCompanyStack: this.publicCompanyStack,
                        smallCompanyStack: this.smallCompanyStack,
                        midCompanyStack: this.midCompanyStack,
                        largeCompanyStack: this.largeCompanyStack,
                        jumpDelta: this.jumpDelta
                    });
                } catch (e){
                    throw e;
                }
            }
            if (this.jumpDelta !== 0) {
                i += this.jumpDelta - 1;
                this.jumpDelta = 0;
                continue;
            }
        }
        this.exitHandler(0);
    }

    setStandardInputStack(args) {
        if (args) {
            this.publicCompanyStack = args.split('').map(e => e.charCodeAt(0));
        }
    }

    clean() {
        this.publicCompanyStack = [];
        this.smallCompanyStack = [];
        this.midCompanyStack = [];
        this.largeCompanyStack = [];
    }
}