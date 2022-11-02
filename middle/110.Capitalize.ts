/*
  110 - Capitalize
  
  ### 题目
  
  实现 `Capitalize<T>` 它将字符串的第一个字母转换为大写，其余字母保持原样。
  
  例如
  
  ```ts
  type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
  ```
*/

type CapitalizeMap = {
  a: 'A',
  b: 'B',
  c: 'C',
  d: 'D',
  e: 'E',
  f: 'F',
  g: 'G',
  h: 'H',
  i: 'I',
  j: 'J',
  k: 'K',
  l: 'L',
  m: 'M',
  n: 'N',
  o: 'O',
  p: 'P',
  q: 'Q',
  r: 'R',
  s: 'S',
  t: 'T',
  u: 'U',
  v: 'V',
  w: 'W',
  x: 'X',
  y: 'Y',
  z: 'Z',
}

// 一个新的特性，当 泛型 S 为一个字符串时
// 用条件类型限制字符串为 `${infer P}${infer Q}`
// `${infer P}${infer Q}` 也是一个很重要的结构与 [infer First, ...infer Rest] 类似
// infer 类型推断会在符合推断时就结束推断
type MyCapitalize<S extends string> =  S extends `${infer L}${infer R}`
                                          ? L extends keyof CapitalizeMap
                                                ? `${CapitalizeMap[L]}${R}`
                                                : S
                                          : S

type MyCapitalizeUppercase<S extends string> =  S extends `${infer L}${infer R}`
                                                ? `${Uppercase<L>}${R}`
                                                : S

type NyCapitalize3 = MyCapitalize<'foo bar'>;


import type { Equal, Expect } from '@type-challenges/utils'

type NyCapitalize1 = MyCapitalize<'foobar'>;
type NyCapitalize2 = MyCapitalize<'FOOBAR'>;
type NyCapitalize4 = MyCapitalize<''>;
type NyCapitalize5 = MyCapitalize<'a'>;
type NyCapitalize6 = MyCapitalize<'b'>;
type NyCapitalize7 = MyCapitalize<'c'>;
type NyCapitalize8 = MyCapitalize<'d'>;
type NyCapitalize9 = MyCapitalize<'e'>;
type NyCapitalize10 = MyCapitalize<'f'>;
type NyCapitalize11 = MyCapitalize<'g'>;
type NyCapitalize12 = MyCapitalize<'h'>;
type NyCapitalize13 = MyCapitalize<'i'>;
type NyCapitalize14 = MyCapitalize<'j'>;
type NyCapitalize15 = MyCapitalize<'k'>;
type NyCapitalize16 = MyCapitalize<'l'>;
type NyCapitalize17 = MyCapitalize<'m'>;
type NyCapitalize18 = MyCapitalize<'n'>;
type NyCapitalize19 = MyCapitalize<'o'>;
type NyCapitalize20 = MyCapitalize<'p'>;
type NyCapitalize21 = MyCapitalize<'q'>;
type NyCapitalize22 = MyCapitalize<'r'>;
type NyCapitalize23 = MyCapitalize<'s'>;
type NyCapitalize24 = MyCapitalize<'t'>;
type NyCapitalize25 = MyCapitalize<'u'>;
type NyCapitalize26 = MyCapitalize<'v'>;
type NyCapitalize27 = MyCapitalize<'w'>;
type NyCapitalize28 = MyCapitalize<'x'>;
type NyCapitalize29 = MyCapitalize<'y'>;
type NyCapitalize30 = MyCapitalize<'z'>;

type cases = [
  Expect<Equal<MyCapitalize<'foobar'>, 'Foobar'>>,
  Expect<Equal<MyCapitalize<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<MyCapitalize<'foo bar'>, 'Foo bar'>>,
  Expect<Equal<MyCapitalize<''>, ''>>,
  Expect<Equal<MyCapitalize<'a'>, 'A'>>,
  Expect<Equal<MyCapitalize<'b'>, 'B'>>,
  Expect<Equal<MyCapitalize<'c'>, 'C'>>,
  Expect<Equal<MyCapitalize<'d'>, 'D'>>,
  Expect<Equal<MyCapitalize<'e'>, 'E'>>,
  Expect<Equal<MyCapitalize<'f'>, 'F'>>,
  Expect<Equal<MyCapitalize<'g'>, 'G'>>,
  Expect<Equal<MyCapitalize<'h'>, 'H'>>,
  Expect<Equal<MyCapitalize<'i'>, 'I'>>,
  Expect<Equal<MyCapitalize<'j'>, 'J'>>,
  Expect<Equal<MyCapitalize<'k'>, 'K'>>,
  Expect<Equal<MyCapitalize<'l'>, 'L'>>,
  Expect<Equal<MyCapitalize<'m'>, 'M'>>,
  Expect<Equal<MyCapitalize<'n'>, 'N'>>,
  Expect<Equal<MyCapitalize<'o'>, 'O'>>,
  Expect<Equal<MyCapitalize<'p'>, 'P'>>,
  Expect<Equal<MyCapitalize<'q'>, 'Q'>>,
  Expect<Equal<MyCapitalize<'r'>, 'R'>>,
  Expect<Equal<MyCapitalize<'s'>, 'S'>>,
  Expect<Equal<MyCapitalize<'t'>, 'T'>>,
  Expect<Equal<MyCapitalize<'u'>, 'U'>>,
  Expect<Equal<MyCapitalize<'v'>, 'V'>>,
  Expect<Equal<MyCapitalize<'w'>, 'W'>>,
  Expect<Equal<MyCapitalize<'x'>, 'X'>>,
  Expect<Equal<MyCapitalize<'y'>, 'Y'>>,
  Expect<Equal<MyCapitalize<'z'>, 'Z'>>,
]

