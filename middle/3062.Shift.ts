/*
  3062 - Shift
  
  ### Question
  
  Implement the type version of ```Array.shift```
  
  For example
  
  ```typescript
  type Result = Shift<[3, 2, 1]> // [2, 1]
  ```
*/

// [infer First, ...infer Rest] 结构
// 需要注意的是 ... 扩展运算符的使用
type Shift<T> = T extends [infer First, ...infer Rest] ? Rest : T


import type { Equal, Expect } from '@type-challenges/utils'
import { ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd' ]>, ['b', 'c', 'd']>>,
]
