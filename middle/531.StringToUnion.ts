/*
  531 - String to Union
  
  ### 题目
  
  实现一个将接收到的String参数转换为一个字母Union的类型。
  
  例如
  
  ```ts
  type Test = '123';
  type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
  ```
*/

// 利用 `${infer First}${infer Rest}` 的性质递归求解
// 需要缕清的就是，infer 推断会在第一个满足 T extends 时跳出
// 注意最后返回的应该是 never 而不是 T
type StringToUnion<T extends string> = T extends `${infer First}${infer Rest}`
                                        ? First | StringToUnion<Rest>
                                        : never

import type { Equal, Expect } from '@type-challenges/utils'

type StringToUnion1 = StringToUnion<''>;
type StringToUnion2 = StringToUnion<'t'>;
type StringToUnion3 = StringToUnion<'hello'>;
type StringToUnion4 = StringToUnion<'coronavirus'>;

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
]