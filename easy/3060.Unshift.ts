/*
  3060 - Unshift
  
  ### 题目
  
  实现类型版本的 ```Array.unshift```。
  
  举例，
  
  ```typescript
  type Result = Unshift<[1, 2], 0> // [0, 1, 2,]
  ```
*/


type Unshift<T extends any[], U> = [U, ...T]

import type { Equal, Expect } from '@type-challenges/utils'

type Unshift1 = Unshift<[], 1>;
type Unshift2 = Unshift<[1, 2], '3'>;
type Unshift3 = Unshift<['1', 2, '3'], boolean>;

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2 ]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
]