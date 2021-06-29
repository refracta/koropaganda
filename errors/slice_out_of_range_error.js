import InterpreterError from "./interpreter_error.js";

export default class SliceOutOfRangeError extends InterpreterError {
    constructor(index, size, code, line) {
        let message = `Invalid slice index value of ${index}, expected value between 0 and ${size}.`;
        super(message, code, line);
    }
}