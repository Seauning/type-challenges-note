/*
  298 - Length of String
  
  ### 题目
  
  计算字符串的长度，类似于 `String#length` 。
*/

// 先通过递归将字符串转化为数组，再通过数组的 length 属性获取数组长度
type StringToArray<S extends string> = S extends `${infer First}${infer Rest}` 
                                          ? [First, ...StringToArray<Rest>]
                                          : [];

type LengthOfString<S extends string> = StringToArray<S>['length'];

import type { Equal, Expect } from '@type-challenges/utils'

type StringToArray1 = StringToArray<''>;
type StringToArray2 = StringToArray<'kumiko'>;
type StringToArray3 = StringToArray<'reina'>;
type StringToArray4 = StringToArray<'Sound! Euphonium'>;

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

