import DosCommon from 'dos-common-js'
import Moment from 'moment'
require('dos-number-js')

// console.log(process.title)
// console.log(process.title !== 'browser')


const Base64 = {_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){let t="";let n,r,i,s,o,u,a;let f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){let t="";let n,r,i;let s,o,u,a;let f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");let t="";for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){let t="";let n=0;let r=0, c1=0, c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);let c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}


  // console.log('Bugger -----------')
  // console.log(Buffer)


// console.log(DosCommon.extendMethod)

/**
 * 引数の文字列がnull、または空文字の時true
 * @param {*string} str 対象の文字列
 */
String.isEmpty = function (str) {
  return (
    typeof str === 'undefined' ||
    str === null ||
    (typeof str === 'string' && str.isEmpty())
  )
}

/**
 * 空文字の場合trueを返す
 */
DosCommon.extendMethod(String, 'isEmpty', function () {
  return this === ''
})

/**
 * 数値型を数値型にして出力（変更なし）
 */
DosCommon.extendMethod(String, 'toNumber', function () {
  console.log('String:toNumberは、非推奨　とtoInt/toFloatを使用')
  return this - 0
})

/**
 * 数値型を日付型にして出力（変更なし）
 */
DosCommon.extendMethod(String, 'toDate', function () {
  return new Moment(this)
})

/**
 * 正規表現でMatch確認
 */
DosCommon.extendMethod(String, 'isRegExMatch', function (reg) {
  const re = new RegExp(reg, 'i')
  if (re.exec(this.substr(0))) {
    return true
  }
  return false
})

//  先頭から指定の文字列まで削除する
DosCommon.extendMethod(
  String,
  'deleteFromStart',
  function (target, isFirst = true, isDelete = true) {
    const index = isFirst ? this.indexOf(target) : this.lastIndexOf(target)
    if (index == -1) return this

    let result = this.substr(index + target.length)
    if (!isDelete) result = target + result
    return result
  }
)

//  終端から指定の文字列まで削除する
DosCommon.extendMethod(
  String,
  'deleteFromEnd',
  function (target, isFirst = true, isDelete = true) {
    const index = !isFirst ? this.indexOf(target) : this.lastIndexOf(target)
    if (index == -1) return this.substr(0)

    let result = this.substr(0, index)
    if (!isDelete) result = result + target
    return result
  }
)

/**
 * 先頭から最後まですべてReplaceする
 * @param  {[type]} target  [description]
 * @param  {[type]} replace [description]
 * @return {[type]}         [description]
 */
DosCommon.extendMethod(String, 'replaceAll', function (target, replace) {
  return this.split(target).join(replace)
})

/**
 * 改行要素でsplitする
 * @param  {Bool} needEmpty  空文字を配列に含める場合True
 * @return {Array} split結果
 */
DosCommon.extendMethod(String, 'splitNewLine', function (needEmpty = false) {
  const target = this.replaceAll('\r\n', '\n')
  const lines = target.split('\n')
  return needEmpty ? lines : lines.filter((v) => v != '')
})

/**
 * チャンクごとに区分けする
 */
DosCommon.extendMethod(String, 'chunk', function (length) {
  const result = []
  for (let i = 0; i < this.length / length + 1; i++) {
    const str = this.substr(i * length, length)
    if (!!str) result.push(str)
  }
  return result
})

/**
 * スネークケースをキャメルケースに変換
 */
DosCommon.extendMethod(String, 'snakeToCamel', function () {
  //_+小文字を大文字にする(例:_a を A)
  return this.toLowerCase().replace(/_./g, function (s) {
    return s.charAt(1).toUpperCase()
  })
})

DosCommon.extendMethod(String, 'camelToSnake', function () {
  //大文字を_+小文字にする(例:A を _a)
  return p.replace(/([A-Z])/g, function (s) {
    return '_' + s.charAt(0).toLowerCase()
  })
})

/**
 * 指定の位置に文字列を挿入する
 * indexがマイナス値の場合後ろに入れる
 */
DosCommon.extendMethod(String, 'insertStr', function (str, index) {
  const insertIndex = index >= 0 ? index : this.length + index + 1

  const front = this.slice(0, insertIndex)
  const back = this.slice(insertIndex)
  return front + str + back
})

/**
 * String拡張
 * 文字列を整数値に変換して返す
 * @return {Number} [description]
 */
DosCommon.extendMethod(String, 'isNum', function () {
  const num = this.toFloat()
  return num == null ? false : true
})

/**
 * String拡張
 * 文字列を整数値に変換して返す
 * @return {Number} [description]
 */
DosCommon.extendMethod(String, 'toInt', function () {
  const intValue = parseInt(this, 10)
  if (/*isNaN(intValue) の精密版*/ intValue !== intValue) return 0
  if (intValue === this - 0) return intValue
  return null
})

/**
 * String拡張
 * 文字列を実数値に変換して返す
 * @return {Number} [description]
 */
DosCommon.extendMethod(String, 'toFloat', function () {
  try {
    const realValue = parseFloat(this)
    if (/*isNaN(intValue) の精密版*/ realValue !== realValue) return null
    if (realValue === this - 0) return realValue
    return null
  } catch (e) {
    console.error(e)
    return null
  }
})

/**
 * String拡張
 * 数値を3桁ごとに，を打つ記法の文字列に変換
 * @return {Integer} 3桁ごとに，を打った数値の文字列
 */
DosCommon.extendMethod(String, 'toCommaPrice', function () {
  const targets = this.split('.')
  if (targets.length == 1)
    return targets[0].replaceAll(',', '').toInt().toCommaPrice()
  else
    return (
      targets[0].replaceAll(',', '').toInt().toCommaPrice() + '.' + targets[1]
    )
})

/**
 * String拡張
 * 文字列のバイト数を取得
 * @return {Integer} 文字列のバイト数
 */
DosCommon.extendMethod(String, 'byteLength', function () {
  const str = !this ? '' : this
  return encodeURI(str).replace(/%../g, '*').length
})

/**
 * String拡張
 * 文字列を半角に変換する
 * @return {String} 変換後の文字列
 */
DosCommon.extendMethod(String, 'toHankaku', function (Unconvertible2Char) {
  const str = this
  let returnString = ''
  let s
  for (let i = 0; i < str.length; i++) {
    if ((s = kHACOS[str.charAt(i)])) {
      returnString += kHACOS[str.charAt(i)]
    } else if ((s = kH[str.charAt(i)])) {
      returnString += kH[str.charAt(i)]
    } else {
      if (!!Unconvertible2Char && str.charAt(i).byteLength() >= 2) {
        returnString += Unconvertible2Char
      } else {
        returnString += str.charAt(i)
      }
    }
  }
  return returnString
})

/**
 * String拡張
 * 文字列を全角に変換する
 * @return {String} 変換後の文字列
 */
DosCommon.extendMethod(String, 'toZenkaku', function () {
  const str = this
  let returnString = ''
  let s
  for (let i = 0; i < str.length; i++) {
    if (
      (str.charAt(i + 1) == 'ﾞ' || str.charAt(i + 1) == 'ﾟ') &&
      kZ[str.charAt(i) + str.charAt(i + 1)] != null &&
      kZ[str.charAt(i) + str.charAt(i + 1)] != undefined
    ) {
      returnString += kZ[str.charAt(i) + str.charAt(i + 1)]
      i++
    } else {
      if ((s = kZ[str.charAt(i)])) {
        returnString += kZ[str.charAt(i)]
      } else {
        if (str.charAt(i).byteLength() >= 2) {
          returnString += str.charAt(i)
        } else {
          returnString += str.charAt(i)
        }
      }
    }
  }
  return returnString
})

/**
 * String拡張
 * 少数からなる文字列を指定の桁数に丸める
 * 指定の桁数より大きい場合は、それぞれくらいの低い値から削除する
 * @param  {Integer} integerDigit 整数部の桁数
 * @param  {Inteer} decimalDigit 小数部の桁数
 * @param  {Boolean} decimalZero decimalDigit桁分0を埋めるかどうか
 * @return {String}              値を精査した文字列
 */
DosCommon.extendMethod(
  String,
  'changeDecimal',
  function (integerDigit, decimalDigit, decimalZero) {
    // console.log("aaa");
    if (this == '') return ''

    const target = this.toHankaku().toFloat().toString()
    if (target == 'NaN') return ''
    const divNum = target.split('.')
    //  最大に0が追加された場合の0の文字列
    const decimalZeroMax = decimalDigit
      .times(function () {
        return 0
      })
      .join('')

    //  小数点が多い場合は終了
    if (divNum.length > 2) return ''

    //  整数部のみの値ですべて数値要素の場合
    if (
      divNum.length == 1 &&
      target.toInt().toString().length == target.length
    ) {
      //  0埋めを行う場合
      if (decimalZero)
        return (
          target.substring(0, integerDigit) +
          (decimalZeroMax == '' ? '' : '.' + decimalZeroMax)
        )
      //  0梅を行わない場合
      else return target.substring(0, integerDigit)
    }

    //  整数部と小数部がある場合
    if (target.toInt().toString().length == target.length) {
    }

    const integerNum = divNum[0].substring(0, integerDigit)
    const decimalNum = (
      divNum[1] + (decimalZero ? decimalZeroMax : '')
    ).substring(0, decimalDigit)
    return integerNum + (decimalNum == '' ? '' : '.' + decimalNum)
  }
)

/**
 * Base64変換@エンコード
 */
DosCommon.extendMethod(String, 'toBase64', function () {
  // if (process.title !== 'browser') {
  //   return Buffer.from(this, 'utf8').toString('base64')
  // } else {
  //   return window.atob(this)
  // }

  return Base64.encode(this)

})

/**
 * Base64変換@デコード
 */
DosCommon.extendMethod(String, 'fromBase64', function () {
  // if (process.title !== 'browser') {
  //   return Buffer.from(this, 'base64').toString('utf8')
  // } else {
  //   return window.btoa(this)
  // }
  return Base64.decode(this)

})


/**
 * String拡張
 * 自身の文字列からhtmlエスケープをもとに戻す
 * @return {String}         生のHTML
 */
DosCommon.extendMethod(String, 'unescapeHTML', function () {
  const div = document.createElement('div')
  div.innerHTML = this.replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/ /g, '&nbsp;')
    .replace(/\r/g, '&#13;')
    .replace(/\n/g, '&#10;')
  return (div.textContent || div.innerText).replaceAll(' ', ' ')
})

/**
 * CSV要素でsplitする
 * @param  {Bool} needEmpty  空文字を配列に含める場合True
 * @return {Array} split結果
 */
DosCommon.extendMethod(
  String,
  'csvSplit',
  function (strDelimiter = ',', needEmpty = false) {
    const strData = this
    strDelimiter = strDelimiter || ','
    const objPattern = new RegExp(
      '(\\' +
        strDelimiter +
        '|\\r?\\n|\\r|^)' +
        '(?:"([^"]*(?:""[^"]*)*)"|' +
        '([^"\\' +
        strDelimiter +
        '\\r\\n]*))',
      'gi'
    )
    const arrData = [[]]
    let arrMatches = null
    while ((arrMatches = objPattern.exec(strData))) {
      const strMatchedDelimiter = arrMatches[1]
      if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {
        if (arrData[arrData.length - 1].length != 0) {
          arrData.push([])
        }
      }
      if (arrMatches[2]) {
        var strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"')
      } else {
        var strMatchedValue = arrMatches[3]
      }
      arrData[arrData.length - 1].push(strMatchedValue)
    }
    return arrData
  }
)

DosCommon.extendMethod(Date, 'toString', function (format, is12hours) {
  const weekdayArray = ['日', '月', '火', '水', '木', '金', '土']
  if (!format) {
    format = 'YYYY/MM/DD(WW) hh:mm:dd'
  }
  const year = this.getFullYear()
  const month = this.getMonth() + 1
  const day = this.getDate()
  const weekday = weekdayArray[this.getDay()]
  const hours = this.getHours()
  const minutes = this.getMinutes()
  const secounds = this.getSeconds()

  const ampm = hours < 12 ? 'AM' : 'PM'
  if (is12hours) {
    hours = hours % 12
    hours = hours != 0 ? hours : 12 // 0時は12時と表示する
  }

  const replaceStrArray = {
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
    AP: ampm,
  }

  const replaceStr = '(' + Object.keys(replaceStrArray).join('|') + ')'
  const regex = new RegExp(replaceStr, 'g')

  return format.replace(regex, function (str) {
    return replaceStrArray[str]
  })
})

//  以下付録的なもの　^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

/*
                              半角・全角相互変換モジュール
                              半角英数・カナを全角に変換 toZenkaku(str)
                              全角英数・カナ・かなを半角に変換 toHankaku(str)
                              ※ACOS対応 ｧｨｩｪｫｬｭｮｯ は ｱｲｳｴｵﾔﾕﾖﾂに変換
                            */
let kH = new Object() // Objectの生成

let kHACOS = new Object() // Objectの生成(ACOS用小)

let han =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ'
han +=
  'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔｲﾕｴﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｬｭｮｯﾞﾟｰ､｡･ﾞﾟ､｡｢｣｢｣[]()/*-ｰ+,.:;!"#$%&\'=~|^\\@`{}<>?･_ '

let zen =
  '０１２３４５６７８９ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ'
zen +=
  'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔｲﾕｴﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｬｭｮｯﾞﾟｰ､｡･゛゜、。｢｣「」［］（）／＊－ー＋，．：；！”＃＄％＆’＝～｜＾￥＠‘｛｝＜＞？・＿  '
for (let i = 0; i < han.length; i++) {
  kH[zen.charAt(i)] = han.charAt(i)
}

// スペース
kH['　'] = ' '

// 全角ひらがな
kH['あ'] = 'ｱ'
kH['い'] = 'ｲ'
kH['う'] = 'ｳ'
kH['え'] = 'ｴ'
kH['お'] = 'ｵ'
kH['か'] = 'ｶ'
kH['き'] = 'ｷ'
kH['く'] = 'ｸ'
kH['け'] = 'ｹ'
kH['こ'] = 'ｺ'
kH['さ'] = 'ｻ'
kH['し'] = 'ｼ'
kH['す'] = 'ｽ'
kH['せ'] = 'ｾ'
kH['そ'] = 'ｿ'
kH['た'] = 'ﾀ'
kH['ち'] = 'ﾁ'
kH['つ'] = 'ﾂ'
kH['て'] = 'ﾃ'
kH['と'] = 'ﾄ'
kH['な'] = 'ﾅ'
kH['に'] = 'ﾆ'
kH['ぬ'] = 'ﾇ'
kH['ね'] = 'ﾈ'
kH['の'] = 'ﾉ'
kH['は'] = 'ﾊ'
kH['ひ'] = 'ﾋ'
kH['ふ'] = 'ﾌ'
kH['へ'] = 'ﾍ'
kH['ほ'] = 'ﾎ'
kH['ま'] = 'ﾏ'
kH['み'] = 'ﾐ'
kH['む'] = 'ﾑ'
kH['め'] = 'ﾒ'
kH['も'] = 'ﾓ'
kH['や'] = 'ﾔ'
kH['ゐ'] = 'ｲ'
kH['ゆ'] = 'ﾕ'
kH['ゑ'] = 'ｴ'
kH['よ'] = 'ﾖ'
kH['ら'] = 'ﾗ'
kH['り'] = 'ﾘ'
kH['る'] = 'ﾙ'
kH['れ'] = 'ﾚ'
kH['ろ'] = 'ﾛ'
kH['わ'] = 'ﾜ'
kH['を'] = 'ｦ'
kH['ん'] = 'ﾝ'

// ひらがな(小)ACOS用
kHACOS['ぁ'] = 'ｱ'
kHACOS['ぃ'] = 'ｲ'
kHACOS['ぅ'] = 'ｳ'
kHACOS['ぇ'] = 'ｴ'
kHACOS['ぉ'] = 'ｵ'
kHACOS['ゃ'] = 'ﾔ'
kHACOS['ゅ'] = 'ﾕ'
kHACOS['ょ'] = 'ﾖ'
kHACOS['っ'] = 'ﾂ'
kHACOS['ゎ'] = 'ﾜ'

// ひらがな(小)
kH['ぁ'] = 'ｧ'
kH['ぃ'] = 'ｨ'
kH['ぅ'] = 'ｩ'
kH['ぇ'] = 'ｪ'
kH['ぉ'] = 'ｫ'
kH['ゃ'] = 'ｬ'
kH['ゅ'] = 'ｭ'
kH['ょ'] = 'ｮ'
kH['っ'] = 'ｯ'
kH['ゎ'] = 'ﾜ'

// ひらがな(濁音)
kH['が'] = 'ｶﾞ'
kH['ぎ'] = 'ｷﾞ'
kH['ぐ'] = 'ｸﾞ'
kH['げ'] = 'ｹﾞ'
kH['ご'] = 'ｺﾞ'
kH['ざ'] = 'ｻﾞ'
kH['じ'] = 'ｼﾞ'
kH['ず'] = 'ｽﾞ'
kH['ぜ'] = 'ｾﾞ'
kH['ぞ'] = 'ｿﾞ'
kH['だ'] = 'ﾀﾞ'
kH['ぢ'] = 'ﾁﾞ'
kH['づ'] = 'ﾂﾞ'
kH['で'] = 'ﾃﾞ'
kH['ど'] = 'ﾄﾞ'
kH['ば'] = 'ﾊﾞ'
kH['び'] = 'ﾋﾞ'
kH['ぶ'] = 'ﾌﾞ'
kH['べ'] = 'ﾍﾞ'
kH['ぼ'] = 'ﾎﾞ'

// ひらがな(撥音)
kH['ぱ'] = 'ﾊﾟ'
kH['ぴ'] = 'ﾋﾟ'
kH['ぷ'] = 'ﾌﾟ'
kH['ぺ'] = 'ﾍﾟ'
kH['ぽ'] = 'ﾎﾟ'

// ひらがな(濁音2文字)

kH['か゛'] = 'ｶﾞ'
kH['き゛'] = 'ｷﾞ'
kH['く゛'] = 'ｸﾞ'
kH['け゛'] = 'ｹﾞ'
kH['こ゛'] = 'ｺﾞ'
kH['さ゛'] = 'ｻﾞ'
kH['し゛'] = 'ｼﾞ'
kH['す゛'] = 'ｽﾞ'
kH['せ゛'] = 'ｾﾞ'
kH['そ゛'] = 'ｿﾞ'
kH['た゛'] = 'ﾀﾞ'
kH['ち゛'] = 'ﾁﾞ'
kH['つ゛'] = 'ﾂﾞ'
kH['て゛'] = 'ﾃﾞ'
kH['と゛'] = 'ﾄﾞ'
kH['は゛'] = 'ﾊﾞ'
kH['ひ゛'] = 'ﾋﾞ'
kH['ふ゛'] = 'ﾌﾞ'
kH['へ゛'] = 'ﾍﾞ'
kH['ほ゛'] = 'ﾎﾞ'

// ひらがな(撥音)
kH['は゜'] = 'ﾊﾟ'
kH['ひ゜'] = 'ﾋﾟ'
kH['ふ゜'] = 'ﾌﾟ'
kH['へ゜'] = 'ﾍﾟ'
kH['ほ゜'] = 'ﾎﾟ'

// 全角カタカナ
kH['ア'] = 'ｱ'
kH['イ'] = 'ｲ'
kH['ウ'] = 'ｳ'
kH['エ'] = 'ｴ'
kH['オ'] = 'ｵ'
kH['カ'] = 'ｶ'
kH['キ'] = 'ｷ'
kH['ク'] = 'ｸ'
kH['ケ'] = 'ｹ'
kH['コ'] = 'ｺ'
kH['サ'] = 'ｻ'
kH['シ'] = 'ｼ'
kH['ス'] = 'ｽ'
kH['セ'] = 'ｾ'
kH['ソ'] = 'ｿ'
kH['タ'] = 'ﾀ'
kH['チ'] = 'ﾁ'
kH['ツ'] = 'ﾂ'
kH['テ'] = 'ﾃ'
kH['ト'] = 'ﾄ'
kH['ナ'] = 'ﾅ'
kH['ニ'] = 'ﾆ'
kH['ヌ'] = 'ﾇ'
kH['ネ'] = 'ﾈ'
kH['ノ'] = 'ﾉ'
kH['ハ'] = 'ﾊ'
kH['ヒ'] = 'ﾋ'
kH['フ'] = 'ﾌ'
kH['ヘ'] = 'ﾍ'
kH['ホ'] = 'ﾎ'
kH['マ'] = 'ﾏ'
kH['ミ'] = 'ﾐ'
kH['ム'] = 'ﾑ'
kH['メ'] = 'ﾒ'
kH['モ'] = 'ﾓ'
kH['ヤ'] = 'ﾔ'
kH['ヰ'] = 'ｲ'
kH['ユ'] = 'ﾕ'
kH['ヱ'] = 'ｴ'
kH['ヨ'] = 'ﾖ'
kH['ラ'] = 'ﾗ'
kH['リ'] = 'ﾘ'
kH['ル'] = 'ﾙ'
kH['レ'] = 'ﾚ'
kH['ロ'] = 'ﾛ'
kH['ワ'] = 'ﾜ'
kH['ヲ'] = 'ｦ'
kH['ン'] = 'ﾝ'

// 全角カタカナ(小)ACOS用
kHACOS['ァ'] = 'ｱ'
kHACOS['ィ'] = 'ｲ'
kHACOS['ゥ'] = 'ｳ'
kHACOS['ェ'] = 'ｴ'
kHACOS['ォ'] = 'ｵ'
kHACOS['ャ'] = 'ﾔ'
kHACOS['ュ'] = 'ﾕ'
kHACOS['ョ'] = 'ﾖ'
kHACOS['ッ'] = 'ﾂ'
kHACOS['ヮ'] = 'ﾜ'

// 半角カタカナ(小)ACOS用
kHACOS['ｧ'] = 'ｱ'
kHACOS['ｨ'] = 'ｲ'
kHACOS['ｩ'] = 'ｳ'
kHACOS['ｪ'] = 'ｴ'
kHACOS['ｫ'] = 'ｵ'
kHACOS['ｬ'] = 'ﾔ'
kHACOS['ｭ'] = 'ﾕ'
kHACOS['ｮ'] = 'ﾖ'
kHACOS['ｯ'] = 'ﾂ'

// 全角カタカナ(小)
kH['ァ'] = 'ｧ'
kH['ィ'] = 'ｨ'
kH['ゥ'] = 'ｩ'
kH['ェ'] = 'ｪ'
kH['ォ'] = 'ｫ'
kH['ャ'] = 'ｬ'
kH['ュ'] = 'ｭ'
kH['ョ'] = 'ｮ'
kH['ッ'] = 'ｯ'
kH['ヮ'] = 'ﾜ'

// 全角カタカナ(濁音)

kH['ガ'] = 'ｶﾞ'
kH['ギ'] = 'ｷﾞ'
kH['グ'] = 'ｸﾞ'
kH['ゲ'] = 'ｹﾞ'
kH['ゴ'] = 'ｺﾞ'
kH['ザ'] = 'ｻﾞ'
kH['ジ'] = 'ｼﾞ'
kH['ズ'] = 'ｽﾞ'
kH['ゼ'] = 'ｾﾞ'
kH['ゾ'] = 'ｿﾞ'
kH['ダ'] = 'ﾀﾞ'
kH['ヂ'] = 'ﾁﾞ'
kH['ヅ'] = 'ﾂﾞ'
kH['デ'] = 'ﾃﾞ'
kH['ド'] = 'ﾄﾞ'
kH['バ'] = 'ﾊﾞ'
kH['ビ'] = 'ﾋﾞ'
kH['ブ'] = 'ﾌﾞ'
kH['ベ'] = 'ﾍﾞ'
kH['ボ'] = 'ﾎﾞ'
kH['ヴ'] = 'ｳﾞ'

// 全角カタカナ(撥音)
kH['パ'] = 'ﾊﾟ'
kH['ピ'] = 'ﾋﾟ'
kH['プ'] = 'ﾌﾟ'
kH['ペ'] = 'ﾍﾟ'
kH['ポ'] = 'ﾎﾟ'

// 全角カタカナ(濁音)
kH['カ゛'] = 'ｶﾞ'
kH['キ゛'] = 'ｷﾞ'
kH['ク゛'] = 'ｸﾞ'
kH['ケ゛'] = 'ｹﾞ'
kH['コ゛'] = 'ｺﾞ'
kH['サ゛'] = 'ｻﾞ'
kH['シ゛'] = 'ｼﾞ'
kH['ス゛'] = 'ｽﾞ'
kH['セ゛'] = 'ｾﾞ'
kH['ソ゛'] = 'ｿﾞ'
kH['タ゛'] = 'ﾀﾞ'
kH['チ゛'] = 'ﾁﾞ'
kH['ツ゛'] = 'ﾂﾞ'
kH['テ゛'] = 'ﾃﾞ'
kH['ト゛'] = 'ﾄﾞ'
kH['ハ゛'] = 'ﾊﾞ'
kH['ヒ゛'] = 'ﾋﾞ'
kH['フ゛'] = 'ﾌﾞ'
kH['ヘ゛'] = 'ﾍﾞ'
kH['ホ゛'] = 'ﾎﾞ'
kH['ウ゛'] = 'ｳﾞ'

// 全角カタカナ(撥音)
kH['ハ゜'] = 'ﾊﾟ'
kH['ヒ゜'] = 'ﾋﾟ'
kH['フ゜'] = 'ﾌﾟ'
kH['ヘ゜'] = 'ﾍﾟ'
kH['ホ゜'] = 'ﾎﾟ'

// 半角→全角変換用ハッシュ
let kZ = new Object() // Objectの生成

let zen2 =
  '０１２３４５６７８９ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'
zen2 +=
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョッ、。゛゜「」［］（）／＊－ー＋，．：；！”＃＄％＆’＝～｜＾￥＠‘｛｝＜＞？・＿'

let han2 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
han2 +=
  'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｬｭｮｯ､｡ﾞﾟ｢｣[]()/*-ｰ+,.:;!"#$%&\'=~|^\\@`{}<>?･_'

// 数字・アルファベット 半角かな

for (let i = 0; i < han2.length; i++) {
  kZ[han2.charAt(i)] = zen2.charAt(i)
}

// スペース
kZ[' '] = '　'

kZ['ｶﾞ'] = 'ガ'
kZ['ｷﾞ'] = 'ギ'
kZ['ｸﾞ'] = 'グ'
kZ['ｹﾞ'] = 'ゲ'
kZ['ｺﾞ'] = 'ゴ'
kZ['ｻﾞ'] = 'ザ'
kZ['ｼﾞ'] = 'ジ'
kZ['ｽﾞ'] = 'ズ'
kZ['ｾﾞ'] = 'ゼ'
kZ['ｿﾞ'] = 'ゾ'
kZ['ﾀﾞ'] = 'ダ'
kZ['ﾁﾞ'] = 'ヂ'
kZ['ﾂﾞ'] = 'ヅ'
kZ['ﾃﾞ'] = 'デ'
kZ['ﾄﾞ'] = 'ド'
kZ['ﾊﾞ'] = 'バ'
kZ['ﾋﾞ'] = 'ビ'
kZ['ﾌﾞ'] = 'ブ'
kZ['ﾍﾞ'] = 'ベ'
kZ['ﾎﾞ'] = 'ボ'
kZ['ｳﾞ'] = 'ヴ'
// 全角カタカナ(撥音)
kZ['ﾊﾟ'] = 'パ'
kZ['ﾋﾟ'] = 'ピ'
kZ['ﾌﾟ'] = 'プ'
kZ['ﾍﾟ'] = 'ぺ'
kZ['ﾎﾟ'] = 'ポ'
