/*
  5310 - Join
  
  ### Question
  
  Implement the type version of Array.join, Join<T, U> takes an Array T, string or number U and returns the Array T with U stitching up.
  
  ```ts
  type Res = Join<["a", "p", "p", "l", "e"], "-">; // expected to be 'a-p-p-l-e'
  type Res1 = Join<["Hello", "World"], " ">; // expected to be 'Hello World'
  type Res2 = Join<["2", "2", "2"], 1>; // expected to be '21212'
  type Res3 = Join<["o"], "u">; // expected to be 'o'
  ```
  
  > View on GitHub: https://tsch.js.org/5310
*/


// 不使用尾递归
type Join<T extends any[], U extends string | number>
 = T extends [infer F, ...infer R]
      ? R['length'] extends 0
      ? F
      : `${F & string}${U}${Join<R, U>}`
      : ''

// 使用尾递归
type JoinByTail<T extends any[], U extends string | number, Res extends string = ''>
      = T extends [infer F, ...infer R]
           ? R['length'] extends 0
            ? JoinByTail<R, U, `${Res}${F & string}`> // 这里也可以直接拼接返回，如下
            // ? `${Res}${F & string}`
            : JoinByTail<R, U, `${Res}${F & string}${U}`>
           : Res

import type { Equal, Expect } from '@type-challenges/utils'


type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,

  Expect<Equal<JoinByTail<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<JoinByTail<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<JoinByTail<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<JoinByTail<['o'], 'u'>, 'o'>>,
]


