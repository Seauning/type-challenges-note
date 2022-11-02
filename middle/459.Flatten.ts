/*
  459 - Flatten
  
  ### 题目
  
  在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。
  
  例如:
  
  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
  ```
*/


type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
                                  ? [...(First extends any[] ? Flatten<First> : [First]), ...Flatten<Rest>]
                                  : T // 注意这里要返回的是本身，递归到只有一层时就返回其本身

import type { Equal, Expect } from '@type-challenges/utils'

type Flatten1 = Flatten<[]>;
type Flatten2 = Flatten<[1, 2, 3, 4]>;
type Flatten3 = Flatten<[1, [2]]>;
type Flatten4 = Flatten<[1, 2, [3, 4], [[[5]]]]>;
type Flatten5 = Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>;

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>,
]