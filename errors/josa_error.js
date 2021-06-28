import InterpreterError from "./interpreter_error.js";

export default class JosaError extends InterpreterError {
    constructor(incorrectJosa, correctJosa, code, line) {
        let message = `Incorrect josa value of \'${incorrectJosa}\', exptected \'${correctJosa}\'`;
        super(message, code, line);
    }
}