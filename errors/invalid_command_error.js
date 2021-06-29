import InterpreterError from "./interpreter_error.js";

export default class InvalidCommandError extends InterpreterError {
    constructor(code, line) {
        let message = `Invalid command.`;
        super(message, code, line);
    }
}