const Interpreter = require('../interpreter');

let k = new Interpreter(_ => {
}, _ => {
});

k.eval(`
SKY보다 KOREATECH
KOREATECH보다 SKY
공기업보다 KOREATECH
대기업 취업률 압도적 3위 70%
대기업 취업률 3위 50.0%
대기업 취업률 압도적 3위
대기업 취업률 3위
대학원 취업률 2위 50% 
`);

console.log(k.parameterStack);
console.log(k.returnStack);