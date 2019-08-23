import DosCommon from "dos-common-js";
import Moment from "moment";

console.log(DosCommon.extendMethod);

/**
 * 引数の文字列がnull、または空文字の時true
 * @param {*string} str 対象の文字列
 */
String.isEmpty = function(str) {
  return (
    typeof str === "undefined" ||
    str === null ||
    (typeof str === "string" && str.isEmpty())
  );
};

/**
 * 空文字の場合trueを返す
 */
DosCommon.extendMethod(String, "isEmpty", function() {
  return this === "";
});

/**
 * 数値型を数値型にして出力（変更なし）
 */
DosCommon.extendMethod(String, "toNumber", function() {
  return this - 0;
});

/**
 * 数値型を日付型にして出力（変更なし）
 */
DosCommon.extendMethod(String, "toDate", function() {
  return new Moment(this);
});

/**
 * 正規表現でMatch確認
 */
DosCommon.extendMethod(String, "isRegExMatch", function(reg) {
  let re = new RegExp(reg, "i");
  if (re.exec(this.substr(0))) {
    return true;
  }
  return false;
});

//  先頭から指定の文字列まで削除する
DosCommon.extendMethod(String, "deleteFromStart", function(
  target,
  isFirst = true,
  isDelete = true
) {
  let index = isFirst ? this.indexOf(target) : this.lastIndexOf(target);
  if (index == -1) return this;

  let result = this.substr(index + target.length);
  if (!isDelete) result = target + result;
  return result;
});

//  終端から指定の文字列まで削除する
DosCommon.extendMethod(String, "deleteFromEnd", function(
  target,
  isFirst = true,
  isDelete = true
) {
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
DosCommon.extendMethod(String, "replaceAll", function(target, replace) {
  return this.split(target).join(replace);
});

/**
 * 改行要素でsplitする
 * @param  {Bool} needEmpty  空文字を配列に含める場合True
 * @return {Array} split結果
 */
DosCommon.extendMethod(String, "splitNewLine", function(needEmpty = false) {
  const target = this.replaceAll("\r\n", "\n");
  const lines = target.split("\n");
  return needEmpty ? lines : lines.filter(v => v != "");
});

/**
 * スネークケースをキャメルケースに変換
 */
DosCommon.extendMethod(String, "snakeToCamel", function() {
  //_+小文字を大文字にする(例:_a を A)
  return this.toLowerCase().replace(/_./g, function(s) {
    return s.charAt(1).toUpperCase();
  });
});

DosCommon.extendMethod(String, "camelToSnake", function() {
  //大文字を_+小文字にする(例:A を _a)
  return p.replace(/([A-Z])/g, function(s) {
    return "_" + s.charAt(0).toLowerCase();
  });
});

/**
 * CSV要素でsplitする
 * @param  {Bool} needEmpty  空文字を配列に含める場合True
 * @return {Array} split結果
 */
DosCommon.extendMethod(String, "csvSplit", function(
  strDelimiter = ",",
  needEmpty = false
) {
  var strData = this;
  strDelimiter = strDelimiter || ",";
  var objPattern = new RegExp(
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
    "gi"
  );
  var arrData = [[]];
  var arrMatches = null;
  while ((arrMatches = objPattern.exec(strData))) {
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
