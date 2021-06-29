import InterpreterError from "./interpreter_error.js";

export default class InvalidCommandError extends InterpreterError {
    constructor(invalidCommand, code, line) {
        let message = `Invalid command of \'${invalidCommand}\'.`;
        super(message, code, line);
    }
}