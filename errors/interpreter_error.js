export default class InterpreterError extends Error {
    constructor(message, code, line) {
        super(`${message} ⇒ \`${code}\` at line ${line}.`);
        this.name = this.constructor.name;
    }
}