const Interpreter = require('../interpreter');

let k = new Interpreter(_ => {
}, _ => {
});

k.eval(`
중소기업 취업률 72위
중소기업이 중견기업했다!
중소기업 취업률 67위
중소기업이 중견기업했다!
중소기업 취업률 69위
중소기업이 중견기업했다!
중소기업 취업률 84위
중소기업이 중견기업했다!
중소기업 취업률 65위
중소기업이 중견기업했다!
중소기업 취업률 69위
중소기업이 중견기업했다!
중소기업 취업률 82위
중소기업이 중견기업했다!
중소기업 취업률 79위
중소기업이 중견기업했다!
중소기업 취업률 75위
중소기업이 중견기업했다!
중소기업 취업률 32위
중소기업이 중견기업했다!
중소기업 취업률 45796위
중소기업이 중견기업했다!
중소기업 취업률 48372위
중소기업이 중견기업했다!
중소기업 취업률 89위
중소기업이 중견기업했다!
중소기업 취업률 75위
중소기업이 중견기업했다!
중소기업 취업률 83위
중소기업이 중견기업했다!
한기대보다 한기대
중소기업 취업률 14위
KOREATECH보다 KOREATECH
KOREATECH보다 KOREATECH
중소기업이 한기대했다!
중소기업이 한기대했다!
공기업보다 한기대
KOREATECH이 SKY했다!
한기대보다 SKY
대학 취업률 2위
중소기업이 한기대했다!
중소기업이 한기대했다!
대기업이 중소기업했다!
대기업이 중소기업했다!
중소기업 취업률 14위
대학원 취업률 1위
중소기업이 한기대했다!
대기업이 중소기업했다!
한기대가 공기업했다!
`);

console.log();
console.log(Interpreter.stdinStack);
console.log(Interpreter.parameterStack);
console.log(Interpreter.dataStack);
console.log(Interpreter.returnStack);