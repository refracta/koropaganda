import InterpreterError from "./interpreter_error.js";

export default class EmptyStackError extends InterpreterError {
    constructor(code, line) {
        let message = `There's no elements to pull out.`;
        super(message, code, line);
    }
}