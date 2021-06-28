import Interpreter from '../interpreter.js'

let k = new Interpreter(_ => {
}, process.stdout.write.bind(process.stdout), process.stderr.write.bind(process.stderr), process.exit.bind(process));

k.eval(`
asdfasdf
SKY이 SKY했다!

`);