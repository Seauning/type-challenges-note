/*
  4471 - Zip
  
  ### Question
  
  In This Challenge, You should implement a type `Zip<T, U>`, 
  T and U must be `Tuple`

  ```ts
  type exp = Zip<[1, 2], [true, false]> 
  // expected to be [[1, true], [2, false]]
  ```
  
*/


type Zip<T extends any[], U extends any[], Result extends any[] = []> =
                                           T extends [infer First, ...infer Rest]
                                              ? U extends [infer F, ...infer R]
                                                ? Zip<Rest, R, [...Result, [First, F]]>
                                                : Result
                                              : Result


import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]

