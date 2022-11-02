/*
  7544 - Construct Tuple
  
  ### Question
  
  Construct a tuple with a given length.
  
  For example
  
  ```ts
  type result = ConstructTuple<2> // expect to be [unknown, unkonwn]
  ```
  
  > View on GitHub: https://tsch.js.org/7544
*/


// 尾递归优化
type ConstructTupleByTail<L extends number, U extends any[] = []> = U['length'] extends L ? U : ConstructTupleByTail<L, [...U, unknown]>


import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ConstructTupleByTail<0>, []>>,
  Expect<Equal<ConstructTupleByTail<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTupleByTail<999>['length'], 999>>,
  // @ts-expect-error
  Expect<Equal<ConstructTupleByTail<1000>['length'], 1000>>,
]

