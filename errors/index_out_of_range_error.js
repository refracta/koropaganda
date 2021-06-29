import InterpreterError from "./interpreter_error.js";

export default class IndexOutOfRangeError extends InterpreterError {
    constructor(index, size, code, line) {
        let message = `Invalid index value of ${index}, expected value between 0 and ${size - 1}.`;
        super(message, code, line);
    }
}