/*
  5153 - IndexOf
  
  ### Question
  
  Implement the type version of Array.indexOf, indexOf<T, U> takes an Array T, any U and returns the index of the first U in Array T.
  
  ```ts
  type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
  type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
  type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
  ```
  
  > View on GitHub: https://tsch.js.org/5153
*/

import type { Equal, Expect } from '@type-challenges/utils'

// 数组模拟长度
type IndexOf<T, U, Cur extends any[] = []> 
                  = T extends [infer F, ...infer R]
                      ? Equal<F, U> extends true
                        ? Cur['length']
                        : IndexOf<R, U, [...Cur, any]>
                      : -1

// 也可以通过数组模拟下标，通过下标索引元素，懒得写了


type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
]

