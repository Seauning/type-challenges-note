/*
  119 - ReplaceAll
  
  ### 题目
  
  实现 `ReplaceAll<S, From, To>` 将一个字符串 `S` 中的所有子字符串 `From` 替换为 `To`。
  
  例如
  
  ```ts
  type replaced = ReplaceAll<'t y p e s', ' ', ''> // 期望是 'types'
  ```
*/


// 类似于 Replace ，需要注意的地方就是，不能递归 ReplaceAll 替换后的字符
// 因为可能存在 ReplaceAll8 这种情况
// 我们应该递归替换 Right 部分的字符，从上一次替换的位置接着往下替换
type ReplaceAll<S extends string,
             From extends string,
               To extends string> = From extends ''
                                          ? S
                                          : S extends `${infer L}${From}${infer R}`
                                              ? `${L}${To}${ReplaceAll<R, From, To>}`
                                              : S

import type { Equal, Expect } from '@type-challenges/utils'

type ReplaceAll1 = ReplaceAll<'foobar', 'bar', 'foo'>;
type ReplaceAll2 = ReplaceAll<'foobar', 'bag', 'foo'>;
type ReplaceAll3 = ReplaceAll<'foobarbar', 'bar', 'foo'>;
type ReplaceAll4 = ReplaceAll<'t y p e s', ' ', ''>;
type ReplaceAll5 = ReplaceAll<'foobarbar', '', 'foo'>;
type ReplaceAll6 = ReplaceAll<'barfoo', 'bar', 'foo'>;
type ReplaceAll7 = ReplaceAll<'foobarfoobar', 'ob', 'b'>;
type ReplaceAll8 = ReplaceAll<'foboorfoboar', 'bo', 'b'>;
type ReplaceAll9 = ReplaceAll<'', '', ''>;

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]
