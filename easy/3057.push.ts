/*
  3057 - Push
  
  ### 题目
  
  在类型系统里实现通用的 ```Array.push``` 。
  
  举例如下，
  
  ```typescript
  type Result = Push<[1, 2], '3'> // [1, 2, '3']
  ```
*/


type Push<T extends any[], U> = [...T, U]


import type { Equal, Expect } from '@type-challenges/utils'

type Push1 = Push<[], 1>;
type Push2 = Push<[1, 2], '3'>;
type Push3 = Push<['1', 2, '3'], boolean>;

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
]