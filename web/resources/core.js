let editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/koropaganda");

import Interpreter from "../../interpreter.js";

let clickResolve;
let clickReject;
let executeDelay = 10;
let executeMode = false;
let delayedMode = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


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
        $('#executed-command').text(`실행된 명령: \`${e.code}\``);
        let nextCommand = e.jumpDelta === 0 ? e.commandStack[e.index + 1] : e.commandStack[e.index + e.jumpDelta];
        $('#next-command').text(`다음 명령　: ${nextCommand ? (`\`${nextCommand.code}\``) : '없음'}`);
        $('#command-line-number').text(`현재 명령 줄 번호: ${e.line}`);
        $('#command-index').text(`현재 명령 위치 　: ${e.index}`);
        $('#command-parameter').text(`매개변수: [${e.parameters.filter(e => e !== void 0).join(', ')}]`);
        $('#stack').text(`##########스택##########\n공기업　: [${e.publicCompanyStack.join(', ')}]\n중소기업: [${e.smallCompanyStack.join(', ')}]\n중견기업: [${e.midCompanyStack.join(', ')}]\n대기업　: [${e.largeCompanyStack.join(', ')}]`);
        return new Promise(async (resolve, reject) => {
            clickResolve = resolve;
            clickReject = reject;
            if (executeMode) {
                if (delayedMode) {
                    await sleep(executeDelay);
                }
                resolve();
            }
        })
    });

$('#start').click(e => {
    $('#stdout').text('표준출력: ');
    $('#stderr').text('표준에러: ');
    $('#exit-code').text('종료코드: ');
    $('#executed-command').text(`실행된 명령: `);
    $('#next-command').text(`다음 명령　: `);
    $('#command-line-number').text(`현재 명령 줄 번호: `);
    $('#command-index').text(`현재 명령 위치 　: `);
    $('#command-parameter').text(`매개변수: `);
    $('#stack').text(`##########스택##########\n공기업　: \n중소기업: \n중견기업: \n대기업　: `);

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

$('#execute-instantly').click(e => {
    executeMode = true;
    delayedMode = false;
    clickResolve();
});

$('#execute').click(e => {
    if (!delayedMode) {
        executeMode = true;
        delayedMode = true;
        clickResolve();
    } else {
        executeMode = false;
        delayedMode = false;
    }

});
$('#delay').click(e => {
    let delay = prompt('Execution delay? (MS)');
    delay = parseInt(delay);
    if (!isNaN(delay)) {
        executeDelay = delay;
        $('#delay').text(`실행 지연 ${delay}MS`)
    }
});

$('#init').click(async e => {
    clickReject();
    executeMode = false;
    delayedMode = false;
    i.clean();
    $('#stdin').show();
    $('#start').show();
    $('#execute-panel').hide();
});

