/*
  10 - 元组转合集
  
  ### 题目
  
  实现泛型`TupleToUnion<T>`，它返回元组所有值的合集。
  
  例如
  
  ```ts
  type Arr = ['1', '2', '3']
  
  type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
  ```
*/

// 通过 [infer First, ...infer Rest] 的形式能将数组分为两部分
// 并且 infer 能推断出类型，我们可以利用 [infer First, ...infer Rest] 这个结构实现递归
type TupleToUnion<T> = T extends [infer First, ...infer Rest] ? First | TupleToUnion<Rest> : never;

// 上面的比较麻烦，其实可以直接使用对象的索引签名，还是要多多掌握熟练
// 元组也是一种对象，只是键名是数字类型
// 从 number 返回的类型必须与 string 返回的类型一致
// [参考链接](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)
type TupleToUnionByIndexSignature<T extends any[]> = T[number]

// 下面这四个获取的都是一样的，不大理解
type a1 = [1,2][any]
type a2 = [1,2][string & number]
type a3 = [1,2][never]
type a4 = [1,2][number]

import type { Equal, Expect } from '@type-challenges/utils';

type TupleToUnion1 = TupleToUnion<[123, '456', true]>;
type TupleToUnion2 = TupleToUnion<[123, () => void]>;

type TupleToUnionByIndexSignature1 = TupleToUnionByIndexSignature<[123, '456', true]>;
type TupleToUnionByIndexSignature2 = TupleToUnionByIndexSignature<[123, () => void]>;

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
  Expect<Equal<TupleToUnion<[123, () => void]>, 123 | (() => void)>>,

  Expect<Equal<TupleToUnionByIndexSignature<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnionByIndexSignature<[123]>, 123>>,
  Expect<Equal<TupleToUnionByIndexSignature<[123, () => void]>, 123 | (() => void)>>,
]
