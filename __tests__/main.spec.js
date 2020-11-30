require('../index')

test('isEmpty', () => {
  // expect(1).toBe(1);
  // expect(sum(1, 2)).toBe(3);
  expect(String.isEmpty('')).toBe(true)
})

test('repalceAll', () => {
  // expect(1).toBe(1);
  // expect(sum(1, 2)).toBe(3);
  expect('121212121'.replaceAll('2', '3')).toBe('131313131')
})

test('chunk', () => {
  const cc = '12345678901234567890'.chunk(6)
  expect(cc[0]).toBe('123456')
  expect(cc[1]).toBe('789012')
  expect(cc[2]).toBe('345678')
  expect(cc[3]).toBe('90')
  expect(!cc[4]).toBe(true)
})

/**
 *　半角変換
 */
test('tohankaku', () => {
  const str = 'abcａｂｃアイウｴｵｶ123４５６'
  expect(str.toHankaku()).toBe('abcabcｱｲｳｴｵｶ123456')
  expect(str.toZenkaku()).toBe('ａｂｃａｂｃアイウエオカ１２３４５６')
})

/**
 *  数値確認
 */
test('isNum', () => {
  expect('123'.isNum()).toBe(true)
  expect('123a'.isNum()).toBe(false)
  expect('12.13'.isNum()).toBe(true)
  expect('afda'.isNum()).toBe(false)
  expect('あｆ'.isNum()).toBe(false)
  expect('ｇ＆Ｊ％ＷＨＴＧＡＥ'.isNum()).toBe(false)
})

/**
 *  数値確認
 */
test('isNum', () => {
  const str = 'abcａｂｃアイウｴｵｶ123４５６'
  expect('123'.isNum()).toBe(true)
  expect('123a'.isNum()).toBe(false)
  expect('12.13'.isNum()).toBe(true)
  expect('afda'.isNum()).toBe(false)
  expect('あｆ'.isNum()).toBe(false)
  expect('ｇ＆Ｊ％ＷＨＴＧＡＥ'.isNum()).toBe(false)
})

/**
 *  数値確認
 */
test('changeDecimal', () => {
  const str = 'abcａｂｃアイウｴｵｶ123４５６'
  console.log('-----------------------')
  console.log('123'.changeDecimal(4, 4, true))
  expect('123'.changeDecimal(4, 4, true)).toBe('123.0000')
})
