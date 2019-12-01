"use strict";

var _dosCommonJs = _interopRequireDefault(require("dos-common-js"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log(DosCommon.extendMethod)

/**
 * 引数の文字列がnull、または空文字の時true
 * @param {*string} str 対象の文字列
 */
String.isEmpty = function (str) {
  return typeof str === 'undefined' || str === null || typeof str === 'string' && str.isEmpty();
};
/**
 * 空文字の場合trueを返す
 */


_dosCommonJs.default.extendMethod(String, 'isEmpty', function () {
  return this === '';
});
/**
 * 数値型を数値型にして出力（変更なし）
 */


_dosCommonJs.default.extendMethod(String, 'toNumber', function () {
  return this - 0;
});
/**
 * 数値型を日付型にして出力（変更なし）
 */


_dosCommonJs.default.extendMethod(String, 'toDate', function () {
  return new _moment.default(this);
});
/**
 * 正規表現でMatch確認
 */


_dosCommonJs.default.extendMethod(String, 'isRegExMatch', function (reg) {
  let re = new RegExp(reg, 'i');

  if (re.exec(this.substr(0))) {
    return true;
  }

  return false;
}); //  先頭から指定の文字列まで削除する


_dosCommonJs.default.extendMethod(String, 'deleteFromStart', function (target, isFirst = true, isDelete = true) {
  let index = isFirst ? this.indexOf(target) : this.lastIndexOf(target);
  if (index == -1) return this;
  let result = this.substr(index + target.length);
  if (!isDelete) result = target + result;
  return result;
}); //  終端から指定の文字列まで削除する


_dosCommonJs.default.extendMethod(String, 'deleteFromEnd', function (target, isFirst = true, isDelete = true) {
  let index = !isFirst ? this.indexOf(target) : this.lastIndexOf(target);
  if (index == -1) return this.substr(0);
  let result = this.substr(0, index);
  if (!isDelete) result = result + target;
  return result;
});
/**
 * 先頭から最後まですべてReplaceする
 * @param  {[type]} target  [description]
 * @param  {[type]} replace [description]
 * @return {[type]}         [description]
 */


_dosCommonJs.default.extendMethod(String, 'replaceAll', function (target, replace) {
  return this.split(target).join(replace);
});
/**
 * 改行要素でsplitする
 * @param  {Bool} needEmpty  空文字を配列に含める場合True
 * @return {Array} split結果
 */


_dosCommonJs.default.extendMethod(String, 'splitNewLine', function (needEmpty = false) {
  const target = this.replaceAll('\r\n', '\n');
  const lines = target.split('\n');
  return needEmpty ? lines : lines.filter(v => v != '');
});
/**
 * スネークケースをキャメルケースに変換
 */


_dosCommonJs.default.extendMethod(String, 'snakeToCamel', function () {
  //_+小文字を大文字にする(例:_a を A)
  return this.toLowerCase().replace(/_./g, function (s) {
    return s.charAt(1).toUpperCase();
  });
});

_dosCommonJs.default.extendMethod(String, 'camelToSnake', function () {
  //大文字を_+小文字にする(例:A を _a)
  return p.replace(/([A-Z])/g, function (s) {
    return '_' + s.charAt(0).toLowerCase();
  });
});
/**
 * CSV要素でsplitする
 * @param  {Bool} needEmpty  空文字を配列に含める場合True
 * @return {Array} split結果
 */


_dosCommonJs.default.extendMethod(String, 'csvSplit', function (strDelimiter = ',', needEmpty = false) {
  var strData = this;
  strDelimiter = strDelimiter || ',';
  var objPattern = new RegExp('(\\' + strDelimiter + '|\\r?\\n|\\r|^)' + '(?:"([^"]*(?:""[^"]*)*)"|' + '([^"\\' + strDelimiter + '\\r\\n]*))', 'gi');
  var arrData = [[]];
  var arrMatches = null;

  while (arrMatches = objPattern.exec(strData)) {
    var strMatchedDelimiter = arrMatches[1];

    if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {
      if (arrData[arrData.length - 1].length != 0) {
        arrData.push([]);
      }
    }

    if (arrMatches[2]) {
      var strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"');
    } else {
      var strMatchedValue = arrMatches[3];
    }

    arrData[arrData.length - 1].push(strMatchedValue);
  }

  return arrData;
});

_dosCommonJs.default.extendMethod(Date, 'toString', function (format, is12hours) {
  var weekday = ['日', '月', '火', '水', '木', '金', '土'];

  if (!format) {
    format = 'YYYY/MM/DD(WW) hh:mm:dd';
  }

  var year = this.getFullYear();
  var month = this.getMonth() + 1;
  var day = this.getDate();
  var weekday = weekday[this.getDay()];
  var hours = this.getHours();
  var minutes = this.getMinutes();
  var secounds = this.getSeconds();
  var ampm = hours < 12 ? 'AM' : 'PM';

  if (is12hours) {
    hours = hours % 12;
    hours = hours != 0 ? hours : 12; // 0時は12時と表示する
  }

  var replaceStrArray = {
    YYYY: year,
    Y: year,
    MM: ('0' + month).slice(-2),
    M: month,
    DD: ('0' + day).slice(-2),
    D: day,
    WW: weekday,
    hh: ('0' + hours).slice(-2),
    h: hours,
    mm: ('0' + minutes).slice(-2),
    m: minutes,
    ss: ('0' + secounds).slice(-2),
    s: secounds,
    AP: ampm
  };
  var replaceStr = '(' + Object.keys(replaceStrArray).join('|') + ')';
  var regex = new RegExp(replaceStr, 'g');
  ret = format.replace(regex, function (str) {
    return replaceStrArray[str];
  });
  return ret;
});