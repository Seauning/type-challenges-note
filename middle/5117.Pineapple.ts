/*
  5117 - 去除数组指定元素
  
  ### 题目
  
  实现一个像 Lodash.without 函数一样的泛型 Without<T, U>，
  它接收数组类型的 T 和数字或数组类型的 U 为参数，会返回一个去除 U 中元素的数组 T。
  
  例如：
  
  ```ts
  type Res = Without<[1, 2], 1>; // expected to be [2]
  type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
  type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
  ```
  
  > 在 Github 上查看：https://tsch.js.org/5117/zh-CN
*/


// 普通版不用尾递归，需要注意的是第二个参数可能为数字或者元组
type Without<T extends any[], U extends any[] | number> = T extends [infer F, ...infer R]
                                                            ? U extends any[]
                                                              ? F extends U[number]
                                                                ? Without<R, U>         // 需要去除数字
                                                                : [F, ...Without<R, U>] // 不需要去除数字
                                                              : F extends U
                                                                ? Without<R, U>
                                                                : [F, ...Without<R, U>]
                                                            : []

// 采用尾递归的版本，用尾递归写需要注意的就是不要怕多用了函数参数
type WithoutByTail<T extends any[], U extends any[] | number, Result extends any[] = []> = 
                                                      T extends [infer F, ...infer R]
                                                            ? U extends any[]
                                                              ? F extends U[number]
                                                                ? WithoutByTail<R, U, Result>         // 需要去除数字
                                                                : WithoutByTail<R, U, [...Result, F]> // 不需要去除数字
                                                              : F extends U
                                                                ? WithoutByTail<R, U, Result>
                                                                : WithoutByTail<R, U, [...Result, F]>
                                                            : Result

import type { Equal, Expect } from '@type-challenges/utils'

type Without1 = Without<[1, 2], 1>;
type Without2 = Without<[1, 2, 4, 1, 5], [1, 2]>;
type Without3 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>;

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,

  Expect<Equal<WithoutByTail<[1, 2], 1>, [2]>>,
  Expect<Equal<WithoutByTail<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<WithoutByTail<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]
