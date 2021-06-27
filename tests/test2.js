const Interpreter = require('../interpreter');

let k = new Interpreter(_ => {
}, _ => {
});

k.dataStack = 'hello world'.split('').reverse().map(e => e.charCodeAt(0));
k.parameterStack = [1, -1];
k.eval(`
<테스트 공시>
KOREATECH이 SKY했다!
<테스트 공시>
중견기업이 공기업했다!
`);

console.log(k.stdinStack);
console.log(k.parameterStack);
console.log(k.returnStack);
