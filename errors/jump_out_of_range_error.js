import InterpreterError from "./interpreter_error.js";

export default class JumpOutOfRangeError extends InterpreterError {
    constructor(index, size, code, line) {
        let lowerDiff = index;
        let upperDiff = size - index - 1;
        let message = `Invalid jump index value of ${index}, expected value between ${lowerDiff} and ${upperDiff}.`;
        super(message, code, line);
    }
}