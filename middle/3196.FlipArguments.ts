/*
  3196 - Flip Arguments
  
  ### Question
  
  Implement the type version of lodash's ```_.flip```.
  
  Type ```FlipArguments<T>``` requires function type ```T``` 
  and returns a new function type which has the same 
  return type of T but reversed parameters.
  
  For example:
  
  ```typescript
  type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void> 
  // (arg0: boolean, arg1: number, arg2: string) => void
  ```
*/

// T extends (...args : infer P) => infer Result
//                           ? (...args : Reverse<P>) => Result
//                           : never

// 同 3292 的 Reverse
type Reverse<T, R extends any[] = []> = 
        T extends [infer First, ...infer Rest] 
                    ? Reverse<Rest, [First, ...R]>
                    : R

// 掌握函数的 infer 
// 1. 参数 infer 
// 2. 返回值 infer 
type FlipArguments<T> = T extends (...args : infer P) => infer Result
                          ? (...args : Reverse<P>) => Result
                          : never;

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<Equal<FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>,
]
