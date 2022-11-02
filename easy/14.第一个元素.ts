/*
  14 - 第一个元素
  
  ### 题目
  
  实现一个通用`First<T>`，它接受一个数组`T`并返回它的第一个元素的类型。
  
  例如：
  
  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]
  
  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```
*/

// 1. T 是空数组吗？是 never 不是 T[0]
type First1<T extends any[]> = T extends [] ? never : T[0]

// 2. T['length'] 是 0 吗？是 never 不是 T[0]
type First2<T extends any[]> = T['length'] extends 0 ? never : T[0]

// 3. T 是 [infer U, ...any] 的结构吗？是 U 不是 never
// infer 只能用在条件类型当中
type First3<T extends any[]> = T extends [infer U, ...any] ? U : never

// 4. T[0] 在 T[number] 返回的联合类型中吗？是T[0] 不是 never
// 如果 T 是空数组，则 T[0] 为 undefined，T[number] 为 never
type First4<T extends any[]> = T[0] extends T[number] ? T[0] : never

type First11 = First1<[3, 2, 1]>;
type First21 = First2<[() => 123, { a: string }]>;
type First31 = First3<[]>;
type First41 = First4<[undefined]>;