/*
  898 - Includes
  
  ### 题目
  
  在类型系统里实现 JavaScript 的 `Array.includes` 方法，
  这个类型接受两个参数，返回的类型要么是 `true` 要么是 `false`。
  
  举例来说，
  
  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```
*/

import type { Equal, Expect } from '@type-challenges/utils'

// [infer First, ...infer Rest] 这个用法非常常用，常用于递归当中
type Includes<T extends readonly any[], U> = 
                          T extends [infer First, ...infer Rest] // 将整个数组通过 infer 和 扩展运算符 分为了两部分，infer 只能用在条件类型中
                          ? Equal<U, First> extends true    // 借助 Equal 方法 和 条件类型 判断结果
                            ? true                          // 如果比对成功就直接返回
                            : Includes<Rest, U>             // 否则递归剩余部分
                          : false                           // 如果一直比对失败，最终传入 Includes 的 U 会是一个空数组，也就不满足 T extends [infer First, ... infer Rest]

type Includes1 = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>;
type Includes2 = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>;
type Includes3 = Includes<[1, 2, 3, 5, 6, 7], 7>;
type Includes4 = Includes<[1, 2, 3, 5, 6, 7], 4>;
type Includes5 = Includes<[1, 2, 3], 2>;
type Includes6 = Includes<[1, 2, 3], 1>;
type Includes7 = Includes<[{}], { a: 'A'} >;
type Includes8 = Includes<[boolean, 2, 3, 5, 6, 7], false>;
type Includes9 = Includes<[true, 2, 3, 5, 6, 7], boolean>;
type Includes10 = Includes<[false, 2, 3, 5, 6, 7], false>;
type Includes11 = Includes<[{ a: 'A' }], { readonly a: 'A'} >;
type Includes12 = Includes<[{ readonly a: 'A' }], { a: 'A'} >;
type Includes13 = Includes<[1], 1 | 2>;
type Includes14 = Includes<[1 | 2], 1>;
type Includes15 = Includes<[null], undefined>;
type Includes16 = Includes<[undefined], null>;

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]