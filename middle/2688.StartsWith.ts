/*
  2688 - StartsWith
  
  ### Question
  
  Implement `StartsWith<T, U>` which takes two exact string types and returns whether `T` starts with `U`
  
  For example
  
  ```typescript
  type a = StartsWith<'abc', 'ac'> // expected to be false
  type b = StartsWith<'abc', 'ab'> // expected to be true
  type c = StartsWith<'abc', 'abcd'> // expected to be false
  ```
*/

// 搞清楚模板字符串，以及 extends 配合 infer 使用时的比较规则，它具体是怎么比较的
// 不过这题也可以不用 infer R ，可以替换为 string ，类似于占位符的概念
// 具体参考[模板字符串](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
type StartsWith<T extends string, U extends string> = T extends `${U}${infer R}`
                                                          ? true
                                                          : false


import type { Equal, Expect } from '@type-challenges/utils'
import { ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [
  Expect<Equal<StartsWith<'abc', 'ac'>, false>>,
  Expect<Equal<StartsWith<'abc', 'ab'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abcd'>, false>>,
]

