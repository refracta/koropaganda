import InterpreterError from "./interpreter_error.js";

export default class StdoutHandlingError extends InterpreterError {
    constructor(code, line) {
        let message = `Could not find Standard Output Handler.`;
        super(message, code, line);
    }
}