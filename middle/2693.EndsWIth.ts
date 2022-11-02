/*
  2693 - EndsWith
  
  ### Question
  
  Implement `EndsWith<T, U>` which takes two exact string types and returns whether `T` ends with `U`
*/


// 和 2688.StartsWith 类似
type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true : false
type EndsWith2<T extends string, U extends string> = T extends `${infer Firsts}${U}` ? true : false

import type { Equal, Expect } from '@type-challenges/utils'
import { ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [
  Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'd'>, false>>,

  Expect<Equal<EndsWith2<'abc', 'bc'>, true>>,
  Expect<Equal<EndsWith2<'abc', 'abc'>, true>>,
  Expect<Equal<EndsWith2<'abc', 'd'>, false>>,
]
