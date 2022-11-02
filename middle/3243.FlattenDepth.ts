/*
  3243 - FlattenDepth
  
  ### Question
  
  Recursively flatten array up to depth times.
  
  For example:
  
  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```
  
  If the depth is provided, it's guaranteed to be positive integer.
  
  > View on GitHub: https://tsch.js.org/3243
*/

type AddOne<T extends any[]> = [...T, any];

type FlattenDepth<T extends any[], F extends number = 1, Cur extends any[] = []>
 = Cur['length'] extends F
    ? T
    : T extends [infer First, ...infer R]
        ? First extends any[]
          ? [...FlattenDepth<First, F, AddOne<Cur>>, ...FlattenDepth<R, F, Cur>]
          : [First, ...FlattenDepth<R, F, Cur>]
        : []


type FlattenDepthByTail<T extends any[], F extends number = 1, Cur extends any[] = [], Result extends any[] = []>
  = Cur['length'] extends F
      ? [...Result, ...T] // 因为到达层数后可能还有别的元素
      : T extends [infer First, ...infer R] // 这个不符合就是真没有元素了
          ? First extends any[]
            ? FlattenDepthByTail<R, F, Cur, [...Result, ...FlattenDepthByTail<First, F, AddOne<Cur>>]>
            : FlattenDepthByTail<R, F, Cur, [...Result, First]>
          : Result

import type { Equal, Expect } from '@type-challenges/utils'

type FlattenDepth1 = FlattenDepth<[]>;
type FlattenDepth2 = FlattenDepth<[1, 2, 3, 4]>;
type FlattenDepth3 = FlattenDepth<[1, [2]]>;
type FlattenDepth4 = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>;
type FlattenDepth5 = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>;
type FlattenDepth6 = FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>;
type FlattenDepth7 = FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>;

type FlattenDepthByTail1 = FlattenDepthByTail<[]>;
type FlattenDepthByTail2 = FlattenDepthByTail<[1, 2, 3, 4]>;
type FlattenDepthByTail3 = FlattenDepthByTail<[1, [2]]>;
type FlattenDepthByTail4 = FlattenDepthByTail<[1, 2, [3, 4], [[[5]]]], 2>;
type FlattenDepthByTail5 = FlattenDepthByTail<[1, 2, [3, 4], [[[5]]]]>;
type FlattenDepthByTail6 = FlattenDepthByTail<[1, [2, [3, [4, [5]]]]], 3>;
type FlattenDepthByTail7 = FlattenDepthByTail<[1, [2, [3, [4, [5]]]]], 19260817>;

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,

  Expect<Equal<FlattenDepthByTail<[]>, []>>,
  Expect<Equal<FlattenDepthByTail<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepthByTail<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepthByTail<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepthByTail<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepthByTail<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepthByTail<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

