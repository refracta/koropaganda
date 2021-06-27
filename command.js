class Command {
    matchRegex;

    isMatchedCode(code) {
        return code.match(this.matchRegex) ? true : false;
    }

    parse(currentCode) {
    }

    eval(interpreter, currentCode, currentIndex, commandStack) {
    }
}

module.exports = Command;