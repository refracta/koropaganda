// input char.
let targetChar = process.argv[2];
let target = targetChar.charCodeAt(0);

function getApproximation(target) {
    let approximation = 1;
    let diff = target - approximation;
    let count = 0;
    while (diff > 0) {
        approximation *= 3;
        diff = target - approximation;
        count++;
    }

    let percent = target / approximation * 100;
    percent = Math.floor(percent * 10) / 10;

    let result = approximation * (percent / 100);
    result = Math.ceil(result);

    return [result, count, percent];
}

// initial values.
let temp = getApproximation(target);
let value = temp[0];
let iter = 0;
while (value > 0) {
    // print exp and percent part.
    console.log(`대기업 취업률 압도적 ${temp[1]}위 ${temp[2]}%`);

    // iter update.
    target = target - value;
    temp = getApproximation(target);
    value = temp[0];

    iter++;
}

// print rest part.
console.log(`대학 취업률 ${iter}위`);
for (let i = 0; i < iter; i++)
    console.log('중소기업이 한기대했다!');
console.log('대기업이 중견기업했다!');