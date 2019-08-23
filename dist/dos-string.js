"use strict";

var _dosCommonJs = require("dos-common-js");

var _dosCommonJs2 = _interopRequireDefault(_dosCommonJs);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_dosCommonJs2.default.extendMethod);

/**
 * 引数の文字列がnull、または空文字の時true
 * @param {*string} str 対象の文字列
 */
String.isEmpty = function (str) {
  return typeof str === "undefined" || str === null || typeof str === "string" && str.isEmpty();
};

/**
 * 空文字の場合trueを返す
 */
_dosCommonJs2.default.extendMethod(String, "isEmpty", function () {
  return this === "";
});

/**
 * 数値型を数値型にして出力（変更なし）
 */
_dosCommonJs2.default.extendMethod(String, "toNumber", function () {
  return this - 0;
});

/**
 * 数値型を日付型にして出力（変更なし）
 */
_dosCommonJs2.default.extendMethod(String, "toDate", function () {
  return new _moment2.default(this);
});

/**
 * 正規表現でMatch確認
 */
_dosCommonJs2.default.extendMethod(String, "isRegExMatch", function (reg) {
  var re = new RegExp(reg, "i");
  if (re.exec(this.substr(0))) {
    return true;
  }
  return false;
});

//  先頭から指定の文字列まで削除する
_dosCommonJs2.default.extendMethod(String, "deleteFromStart", function (target) {
  var isFirst = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var isDelete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var index = isFirst ? this.indexOf(target) : this.lastIndexOf(target);
  if (index == -1) return this;

  var result = this.substr(index + target.length);
  if (!isDelete) result = target + result;
  return result;
});

//  終端から指定の文字列まで削除する
_dosCommonJs2.default.extendMethod(String, "deleteFromEnd", function (target) {
  var isFirst = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var isDelete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var index = !isFirst ? this.indexOf(target) : this.lastIndexOf(target);
  if (index == -1) return this.substr(0);

  var result = this.substr(0, index);
  if (!isDelete) result = result + target;
  return result;
});

/**
 * 先頭から最後まですべてReplaceする
 * @param  {[type]} target  [description]
 * @param  {[type]} replace [description]
 * @return {[type]}         [description]
 */
_dosCommonJs2.default.extendMethod(String, "replaceAll", function (target, replace) {
  return this.split(target).join(replace);
});

/**
 * 改行要素でsplitする
 * @param  {Bool} needEmpty  空文字を配列に含める場合True
 * @return {Array} split結果
 */
_dosCommonJs2.default.extendMethod(String, "splitNewLine", function () {
  var needEmpty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var target = this.replaceAll("\r\n", "\n");
  var lines = target.split("\n");
  return needEmpty ? lines : lines.filter(function (v) {
    return v != "";
  });
});

/**
 * スネークケースをキャメルケースに変換
 */
_dosCommonJs2.default.extendMethod(String, "snakeToCamel", function () {
  //_+小文字を大文字にする(例:_a を A)
  return this.toLowerCase().replace(/_./g, function (s) {
    return s.charAt(1).toUpperCase();
  });
});

_dosCommonJs2.default.extendMethod(String, "camelToSnake", function () {
  //大文字を_+小文字にする(例:A を _a)
  return p.replace(/([A-Z])/g, function (s) {
    return "_" + s.charAt(0).toLowerCase();
  });
});

/**
 * CSV要素でsplitする
 * @param  {Bool} needEmpty  空文字を配列に含める場合True
 * @return {Array} split結果
 */
_dosCommonJs2.default.extendMethod(String, "csvSplit", function () {
  var strDelimiter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ",";
  var needEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var strData = this;
  strDelimiter = strDelimiter || ",";
  var objPattern = new RegExp("(\\" + strDelimiter + "|\\r?\\n|\\r|^)" + '(?:"([^"]*(?:""[^"]*)*)"|' + '([^"\\' + strDelimiter + "\\r\\n]*))", "gi");
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
      var strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      var strMatchedValue = arrMatches[3];
    }
    arrData[arrData.length - 1].push(strMatchedValue);
  }
  return arrData;
});