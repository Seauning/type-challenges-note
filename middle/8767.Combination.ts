/*
  8767 - Combination
  
  ### Question
  
  Given an array of strings, do Permutation & Combination.
  It's also useful for the prop types like video
  [controlsList](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList)
  
  ```ts
  // expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
  type Keys = Combination<['foo', 'bar', 'baz']>
  ```
  
  > View on GitHub: https://tsch.js.org/8767
*/




type TupleToUnion<U extends string[]> = U[number]

type Combinations<U extends string, T extends string = U> = [U] extends [never]
                        ? ''
                        : U extends T
                            // 模板字符串中的联合类型也具有分布式，`${a}${b}` ，a = 'A'，b = 'B' | 'C' => 'A' | 'AB' | 'AC'
                            // | 左边的表示以当前这个为起点的组合，| 右边表示没有当前字符 U 的组合，如 'A' | 'B' | 'C' => ('A...') | ('...')
                            // 从 T 中选出不包含 U 这个元素的剩余联合元素作为下一次分布式联合类型的遍历范围
                            ? `${U} ${Combinations<Exclude<T, U>>}` | `${Combinations<Exclude<T, U>>}`
                            : never

type TrimRight<S extends string> = S extends `${infer F}${' '}` ? TrimRight<F> : S;

// 1. 将字符串元组转为联合类型
// 2. 依据联合类型得到所有组合
// 3. 从组合中排除 ''
// 4. 去除每个组合中右边的空格
type Combination<T extends string[]> = TrimRight<Exclude<Combinations<TupleToUnion<T>>, ''>>


import type { Equal, Expect } from '@type-challenges/utils'

type Combination1 = Combination<['foo', 'bar', 'baz']>;

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>,
  'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
]

