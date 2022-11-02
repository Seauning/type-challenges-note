/*
  15 - 最后一个元素
  
  ### 题目
  
  实现一个通用`Last<T>`，它接受一个数组`T`并返回其最后一个元素的类型。
  
  例如
  
  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]
  
  type tail1 = Last<arr1> // expected to be 'c'
  type tail2 = Last<arr2> // expected to be 1
  ```
*/


type Last<T extends any[]> = T extends [...infer Rest, infer Last] 
                                ? Last
                                : never

// 利用 [infer First, ...infer Rest] 以及 length 属性的递归解法
type RecusionLast<T extends any[]> = T extends [infer First, ...infer Rest]
                                        ? Rest['length'] extends 1
                                              ? Rest[0]
                                              : RecusionLast<Rest>
                                        : never


import type { Equal, Expect } from '@type-challenges/utils'

type Last1 = Last<[3, 2, 1]>;
type Last2 = Last<[() => 123, { a: string }]>;

type RecusionLast1 = Last<[3, 2, 1]>;
type RecusionLast2 = Last<[() => 123, { a: string }]>;

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
  Expect<Equal<RecusionLast<[3, 2, 1]>, 1>>,
  Expect<Equal<RecusionLast<[() => 123, { a: string }]>, { a: string }>>,
]

