import InterpreterError from "./interpreter_error.js";

export default class SyntaxError extends InterpreterError {
    constructor(message, code, line) {
        super(message, code, line);
    }
}