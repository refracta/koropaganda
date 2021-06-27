const Interpreter = require('../interpreter');

let k = new Interpreter(_ => {
}, _ => {
});

k.eval(`
SKY보다 KOREATECH
KOREATECH보다 SKY
중소기업보다 KOREATECH
`);

console.log(k.parameterStack);
console.log(k.returnStack);
