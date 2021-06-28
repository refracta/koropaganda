import InterpreterError from "./interpreter_error.js";

export default class PercentOutOfRangeError extends InterpreterError {
    constructor(percent, code, line) {
        let message = `Invalid percent value of ${percent}, expected value between 0 and 100.`;
        super(message, code, line);
    }
}