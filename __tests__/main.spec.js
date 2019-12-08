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
