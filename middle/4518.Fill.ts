/*
  4518 - Fill
  
  ### Question
  
  `Fill`, a common JavaScript function, now let us implement it with types.

  `Fill<T, N, Start?, End?>`, as you can see,`Fill` accepts four types of parameters,
   of which `T` and `N` are required parameters, and `Start` and `End` are optional parameters.
  The requirements for these parameters are: `T` must be a `tuple`, 
  `N` can be any type of value, `Start` and `End` must be integers greater than or equal to 0.
  
  ```ts
  type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
  ```
  In order to simulate the real function, the test may contain some boundary conditions, I hope you can enjoy it :)
  
  > View on GitHub: https://tsch.js.org/4518
*/

// 简单的模拟一下元组
type MockArray<T, A extends any[] = []> = A['length'] extends T ? A : MockArray<T, [...A, any]>;

type Add<T, B extends any[] = []> = [...MockArray<T>, ...B];

type LeftMoreRight<Left extends any[], Right extends number> = Left extends [...MockArray<Right>, ...infer R]
                                                                  ? true
                                                                  : false

// 这题不是很好写，需要分清楚边界条件，哪里需要 fill 原数组的元素，哪里需要 fill 新的元素
// 利用好函数参数默认值，以尾递归的形式实现，也可不使用尾递归
// 不过个人觉得这题使用尾递归的思路更好理解一些，不采用尾递归的话就是由子结果得到最终结果

// 普通版本没运用尾递归
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Cur extends any[] = []  // 表示当前的下标
> = Cur['length'] extends T['length']
      ? []
      : LeftMoreRight<Cur, Start> extends true
        ? LeftMoreRight<Cur, End> extends true
          ? [T[Cur['length']], ...Fill<T, N, Start, End, Add<1, Cur>>]
          : [N, ...Fill<T, N, Start, End, Add<1, Cur>>]
        : [T[Cur['length']], ...Fill<T, N, Start, End, Add<1, Cur>>]


// 运用尾递归的版本
type FillByTail<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Array extends any[] = [],
  newArray extends any[] = []
> = Array['length'] extends T['length']
      ? newArray
      : LeftMoreRight<Array, Start> extends true
        ? LeftMoreRight<Array, End> extends true
          ? FillByTail<T, N, Start, End, Add<1, Array>, [...newArray, T[Array['length']]]>
          : FillByTail<T, N, Start, End, Add<1, Array>, [...newArray, N]>
        : FillByTail<T, N, Start, End, Add<1, Array>, [...newArray, T[Array['length']]]>


import type { Equal, Expect } from '@type-challenges/utils'

type Fill1 = Fill<[], 0>;
type Fill2 = Fill<[], 0, 0, 3>;
type Fill3 = Fill<[1, 2, 3], 0, 0, 0>;
type Fill4 = Fill<[1, 2, 3], 0, 2, 2>;
type Fill5 = Fill<[1, 2, 3], 0>;
type Fill6 = Fill<[1, 2, 3], true>;
type Fill7 = Fill<[1, 2, 3], true, 0, 1>;
type Fill8 = Fill<[1, 2, 3], true, 1, 3>;
type Fill9 = Fill<[1, 2, 3], true, 10, 0>;
type Fill10 = Fill<[1, 2, 3], true, 0, 10>;

type FillByTail1 = FillByTail<[], 0>;
type FillByTail2 = FillByTail<[], 0, 0, 3>;
type FillByTail3 = FillByTail<[1, 2, 3], 0, 0, 0>;
type FillByTail4 = FillByTail<[1, 2, 3], 0, 2, 2>;
type FillByTail5 = FillByTail<[1, 2, 3], 0>;
type FillByTail6 = FillByTail<[1, 2, 3], true>;
type FillByTail7 = FillByTail<[1, 2, 3], true, 0, 1>;
type FillByTail8 = FillByTail<[1, 2, 3], true, 1, 3>;
type FillByTail9 = FillByTail<[1, 2, 3], true, 10, 0>;
type FillByTail10 = FillByTail<[1, 2, 3], true, 0, 10>;

type cases = [
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,

  Expect<Equal<FillByTail<[], 0>, []>>,
  Expect<Equal<FillByTail<[], 0, 0, 3>, []>>,
  Expect<Equal<FillByTail<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<FillByTail<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<FillByTail<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<FillByTail<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<FillByTail<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<FillByTail<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<FillByTail<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<FillByTail<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
  Expect<Equal<FillByTail<[], 0>, []>>,
]



