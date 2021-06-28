let companyIndex = Keywords.COMPANY_CATEGORY.findIndex(e => e === parameters[0]);
let placeLiteral = parseInt(parameters[2], 10);
let percentLiteral = parameters[3];
if (percentLiteral !== undefined) {
    if (Number.isInteger(parseInt(percentLiteral))) {
        percentLiteral = parseInt(percentLiteral + '0');
    } else {
        percentLiteral = parseInt(percentLiteral.replace('.', ''));
    }
}

// Input validity check and exception handling.
if (placeLiteral < 1) {
    // Invalid place value exception.
    throw new Error(`Invalid place value of '${placeLiteral}', place vaule must be same or greater than 0.`);
}

let percentValue = 1;
if ((percentLiteral != undefined) && ((percentLiteral < 0) || (percentLiteral > 1000))) {
    percentLiteral /= 10;

    // Invalid percent value exception.
    if (0 <= percentLiteral && percentLiteral <- 100) {
        // Decimal place exception.
        throw new Error(`Invalid percent value of '${percentLiteral}', the length of decimal places must be same or lesser than 1.`);
    } else {
        // Percent range exception.
        throw new Error(`Invalid percent value of '${percentLiteral}', percent vaule must be between 0 and 100.`);
    }

    percentValue = percentLiteral / 100;
}

getAJob (interpreter, companyIndex, placeLiteral, percentValue) {
    let overwhelmingValue = parameters[1] ? Math.pow(companyIndex, parseInt(parameters[2], 10)) : (companyIndex * Y);
    let pushValue = overwhelmingValue * percentValue;

    return {
        pushStack: interpreter.parameterStack,
        pushValue = pushValue
    };
}

school (schoolIndex, placeLiteral, percentValue) {
    let schoolValue = !schoolIndex ? 1 : -1;
    let sliceIndex = Math.ceil(placeLiteral * percentValue);

    if (interpreter.parameterStack.length - pushIndex < 0) {
        // Index out of boundary exception.
        throw new Error(`Invalid slice index value of ${pushIndex}, slice index must be same or lesser than stack size of ${interpreter.parameterStack.length}.`);
    }

    let sumOfElements = interpreter.parameterStack.slice(-pushIndex).reduce((a, c) => a + c, 0);

    let returnObj = {
        pushStack: interpreter.returnStack,
        pushValue: sumOfElements * schoolValue
    };
    if (parameters[1])
        returnObj.pushStack = interpreter.parameterStack;

    return returnObj;
}