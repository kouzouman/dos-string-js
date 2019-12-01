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
