"use strict"

// 初期化 要素の取得
let textarea1 = document.getElementById('paste-area');
let textarea2 = document.getElementById('copy-area');
//textareaのデフォルトの要素の高さを取得
let clientHeight1 = textarea1.clientHeight;
let clientHeight2 = textarea2.clientHeight;

// paste-areaの高さ自動調整
textarea1.addEventListener('input', () => {
    //textareaの要素の高さを設定
    textarea1.style.height = clientHeight1 + 'px';
    //textareaの入力内容の高さを取得
    let scrollHeight1 = textarea1.scrollHeight;
    //textareaの高さに入力内容の高さを設定
    textarea1.style.height = scrollHeight1 + 'px';
});


// 配列変換処理
function changeToArr() {
    // paste-areaの値を取得
    var pasteValue = document.getElementById('paste-area').value;
    // splitで、指定した区切り文字で文字列を区切る。
    var splitTextareaArray = pasteValue.split(/\r\n|\r|\n/);

    // 区切った文字をひとつずつ配列に入れる
    var arr = [];
    for (var i = 0; i < splitTextareaArray.length; i++) {
        arr += ` "${splitTextareaArray[i]}", `;
    }

    // 配列に文字列を加えて表示
    arr = `var x = [${arr}];`
    document.getElementById('copy-area').textContent = arr;

    // copy-areaの高さを自動調整
    let scrollHeight2 = textarea2.scrollHeight;
    textarea2.style.height = scrollHeight2 + 'px';
}

// コピー関数
function copy(id) {
    var copyText = document.getElementById(id);
    var ua = navigator.userAgent;
    if (ua.match(/iphone|ipod|ipad|android/i)) {
        try {
            copyText.select();
        } catch (error) { }
        var range = document.createRange();
        range.selectNode(copyText);
        window.getSelection().addRange(range);
    }
    else {
        try {
            copyText.select();
        } catch (error) {
            document.getSelection().selectAllChildren(copyText);
        }
    }
    var result = document.execCommand("copy");
    return result
}