import Interpreter from '../interpreter.js'

let k = new Interpreter(_ => {
}, process.stdout.write.bind(process.stdout), process.stderr.write.bind(process.stderr), process.exit.bind(process));

k.eval(`
<주석 및 빈 줄 무시 공시>

<취업 커맨드 테스트 공시>
공기업 취업률 5위
중소기업 취업률 압도적 4위
중견기업 취업률 24위 75.4%
대기업 취업률 압도적 5위 90%

<대학 커맨드 테스트 공시>
대학 취업률 2위
대학원 취업률 압도적 3위
대학 취업률 5위 15.4%
대학원 취업률 압도적 5위 20%
`);

console.log('\n<Logging Stacks>');
console.log('Standard Input Stack:\t', k.publicCompanyStack);
console.log('Parameter Stack:\t', k.smallCompanyStack);
console.log('Data Stack:\t\t', k.midCompanyStack);
console.log('Return Stack:\t\t', k.largeCompanyStack);