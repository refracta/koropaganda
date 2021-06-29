var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/koropaganda");

import Interpreter from "../../interpreter.js";


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let clickResolve;
let executeMode = false;
let i = new Interpreter(window.alert,
    o => {
        $('#stdout').text($('#stdout').text() + o);
    }, e => {
        $('#stderr').text($('#stderr').text() + e);
    }, console.error, e => {
        $('#executed-command').text(`실행된 명령: \`${e.code}\``)
        $('#next-command').text(`다음 명령: \`${e.commandStack[e.index + 1] ? e.commandStack[e.index + 1].code : '없음'}\``);
        $('#command-index').text(`현재 명령 위치: ${e.index}`);
        $('#command-line-number').text(`현재 명령 줄 번호: ${e.line}`);
        $('#command-parameter').text(`매개변수: [${e.parameters.filter(e => e !== void 0).join(', ')}]`);
        $('#stack').text(`공기업 스택: [${e.publicCompanyStack.join(', ')}]\n중소기업 스택: [${e.smallCompanyStack.join(', ')}]\n중견기업 스택: [${e.midCompanyStack.join(', ')}]\n대기업 스택: [${e.largeCompanyStack.join(', ')}]`);
        return new Promise(async resolve => {
            clickResolve = resolve;
            if(executeMode){
                resolve();
            }
        })
    });
$('#next').click(e=>{
    clickResolve();
});
$('#execute').click(e=>{
    executeMode = true;
    clickResolve();
});

$('#start').click(e => {
    i.setStandardInputStack($('#stdin').val());
    $('#stdin').hide();
    $('#start').hide();
    $('#execute-panel').show();

    i.eval(editor.getValue()).then(_ => {
    }).catch(e => {
        $('#stderr').text($('#stderr').text() + '\n' + e);
    });
});