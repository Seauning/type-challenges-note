/*
  4425 - Greater Than
  
  ### Question
  
  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`
  
  Negative numbers do not need to be considered.
  
  For example
  
  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```
  
  Good Luck!
  
*/

type MockArrayBySingle<N extends string, Arr extends any[] = []> =
                        `${Arr['length']}` extends N
                          ? Arr
                          : MockArrayBySingle<N, [...Arr, any]>

type MockArrayXTen<N extends any[], O extends any[] = []> = [...N, ...O, ...O, ...O, ...O, ...O, ...O, ...O, ...O, ...O, ...O]

type MockArray<N extends string, Arr extends number[] = []> = 
      N extends `${infer F}${infer R}`
            ? MockArray<R, MockArrayXTen<MockArrayBySingle<F>, Arr>>
            : Arr

type GreaterThan<T extends number, U extends number> = 
  MockArray<`${T}`> extends [...MockArray<`${U}`>, ...infer Rest]
    ? Rest['length'] extends 0
      ? false
      : true
    : false

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
]

