/*
  5360 - Unique
  
  ### Question
  
  Implement the type version of Lodash.uniq,
  Unique<T> takes an Array T, returns the Array T without repeated values.
  
  ```ts
  type Res = Unique<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
  type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
  type Res2 = Unique<[1, "a", 2, "b", 2, "a"]>; // expected to be [1, "a", 2, "b"]
  type Res3 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]
  type Res4 = Unique<[unknown, unknown, any, any, never, never]>; // expected to be [unknown, any, never]
  ```
  
  > View on GitHub: https://tsch.js.org/5360
*/

import type { Equal, Expect } from '@type-challenges/utils'

// 递归检测 F 是否存在于 U 中
type CheckIsExist<F, U extends any[] = []> = U extends [infer First, ...infer R]
                                                ? Equal<F, First> extends true
                                                  ? true       // 存在
                                                  : CheckIsExist<F, R>      
                                                : false;      // 不存在
// 递归检测每个元素是否重复
type Unique<T, U extends any[] = []> = T extends [infer F, ...infer R]
                                        ? CheckIsExist<F, U> extends true // 检测 F 是否存在于 U 中
                                          ? Unique<R, U>                  // 存在就跳过该元素
                                          : [F, ...Unique<R, [...U, F]>]  // 不纯在就添加该元素
                                        : []

// 尾递归版本，尾递归版本的 U 可以省略，为了好理解还是不省略了
type UniqueTail<T, U extends any[] = [], Result extends any[] = []>
                                     = T extends [infer F, ...infer R]
                                        ? CheckIsExist<F, U> extends true // 检测 F 是否存在于 U 中
                                          ? UniqueTail<R, U, Result>      // 存在就跳过该元素
                                          : UniqueTail<R, [...U, F], [...Result, F]>    // 不存在就添加该元素
                                        : Result

type Unique1 = Unique<[1, 1, 2, 2, 3, 3]>;
type Unique2 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>;
type Unique3 = Unique<[1, 'a', 2, 'b', 2, 'a']>;
type Unique4 = Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>;
type Unique5 = Unique<[unknown, unknown, any, any, never, never]>;

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,

  Expect<Equal<UniqueTail<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<UniqueTail<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<UniqueTail<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<UniqueTail<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<UniqueTail<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]

