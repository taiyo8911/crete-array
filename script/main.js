"use strict"

// textarea要素の取得
const textarea1 = document.getElementById('before_conversion');
const textarea2 = document.getElementById('after_conversion');

// textareaのデフォルトの要素の高さを取得
const clientHeight1 = textarea1.clientHeight;

// before_conversion（貼り付けデータ）の高さを自動調整
textarea1.addEventListener('input', () => {
    // textareaの要素の高さを設定
    textarea1.style.height = clientHeight1 + 'px';
    // textareaの入力内容の高さを取得
    const scrollHeight1 = textarea1.scrollHeight;
    // textareaの高さに入力内容の高さを設定
    textarea1.style.height = scrollHeight1 + 'px';
});


// 配列変換処理
function changeToArray() {
    // before_conversionの値を取得
    const beforeConversionValue = document.getElementById('before_conversion').value;
    // 文字列を区切る
    const splitValue = beforeConversionValue.split(/\r\n|\r|\n/);

    // 区切った文字をひとつずつ配列に入れる
    let array = [];
    for (var i = 0; i < splitValue.length; i++) {
        array += ` "${splitValue[i]}", `;
    }

    // 配列に文字列を加えて表示
    array = `const array = [${array}];`
    document.getElementById('after_conversion').textContent = array;

    // after_conversionの高さを自動調整
    const scrollHeight2 = textarea2.scrollHeight;
    textarea2.style.height = scrollHeight2 + 'px';
}


// コピー関数
function copyData() {
    const afterConversionValue = document.getElementById('after_conversion');
    const ua = navigator.userAgent;
    if (ua.match(/iphone|ipod|ipad|android/i)) {
        try {
            afterConversionValue.select();
        } catch (error) { }
        const range = document.createRange();
        range.selectNode(afterConversionValue);
        window.getSelection().addRange(range);
    }
    else {
        try {
            afterConversionValue.select();
        } catch (error) {
            document.getSelection().selectAllChildren(afterConversionValue);
        }
    }
    const result = document.execCommand("copy");
    return result;
}