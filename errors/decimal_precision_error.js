import InterpreterError from "./interpreter_error.js";

export default class EmptyStackError extends InterpreterError {
    constructor(decimal, code, line) {
        let message = `Invalid percent value of '${decimal}', expected length of decimal places same or lesser than 1.`;
        super(message, code, line);
    }
}