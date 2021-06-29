let editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/koropaganda");

import Interpreter from "../../interpreter.js";
let clickResolve;
let executeMode = false;
let i = new Interpreter(_ => {
        return window.prompt('Input?');
    },
    o => {
        $('#stdout').text($('#stdout').text() + o);
    }, e => {
        $('#stderr').text($('#stderr').text() + e);
    }, e => {
        $('#exit-code').text(`종료코드: ${e}`);
    }, e => {
        $('#executed-command').text(`실행된 명령: \`${e.code}\``)
        $('#next-command').text(`다음 명령　: ${e.commandStack[e.index + 1] ? (`\`${e.commandStack[e.index + 1].code}\``) : '없음'}`);
        $('#command-line-number').text(`현재 명령 줄 번호: ${e.line}`);
        $('#command-index').text(`현재 명령 위치 　: ${e.index}`);
        $('#command-parameter').text(`매개변수: [${e.parameters.filter(e => e !== void 0).join(', ')}]`);
        $('#stack').text(`<스택>\n공기업　: [${e.publicCompanyStack.join(', ')}]\n중소기업: [${e.smallCompanyStack.join(', ')}]\n중견기업: [${e.midCompanyStack.join(', ')}]\n대기업　: [${e.largeCompanyStack.join(', ')}]`);
        return new Promise(async resolve => {
            clickResolve = resolve;
            if (executeMode) {
                resolve();
            }
        })
    });

$('#start').click(e => {
    i.setStandardInputStack($('#stdin').val());
    $('#stdin').hide();
    $('#start').hide();
    $('#execute-panel').show();

    i.eval(editor.getValue()).catch(e => {
        $('#stderr').text($('#stderr').text() + '\n' + e);
    });
});

$('#next').click(e => {
    clickResolve();
});

$('#execute').click(e => {
    executeMode = true;
    clickResolve();
});

$('#init').click(e => {
    executeMode = false;
    i.clean();
    $('#stdout').text('표준출력: ');
    $('#stderr').text('표준에러: ');
    $('#stdin').show();
    $('#start').show();
    $('#execute-panel').hide();
});

