import Interpreter from '../interpreter.js'

let k = new Interpreter(_ => {
}, process.stdout.write.bind(process.stdout), process.stderr.write.bind(process.stderr), process.exit.bind(process));

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

console.log(k.smallCompanyStack);
console.log(k.largeCompanyStack);