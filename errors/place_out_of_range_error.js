import InterpreterError from "./interpreter_error.js";

export default class PlaceOutOfRangeError extends InterpreterError {
    constructor(place, code, line) {
        let message = `Invalid place value of ${place}, expected value between 1 and 2000.`;
        super(message, code, line);
    }
}