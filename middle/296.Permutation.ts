/*
  296 - Permutation
  
  ### 题目
  
  实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。
  
  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; 
  // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```
*/

type MyExclude<T, U> = T extends U ? never : T;

type Permutation<T, K = T> = [T] extends [never]   // 条件类型分配，以及 never 作为联合类型的行为
                                  ? []    // 空联合时，返回空的联合
                                  : K extends K   // 泛型用在条件类型上会发生分配律，所以 K 中每个元素都会被遍历到，并且 K[number] 满足 extends K
                                      ? [K, ...Permutation<MyExclude<T, K>>]  // 从 T 中排除当前的选择，将排除后的联合传入 Permutation ，求排除后的联合的排列
                                      : []

import type { Equal, Expect } from '@type-challenges/utils'

type Permutation1 = Permutation<'A'>;
type Permutation2 = Permutation<'A' | 'B' | 'C'>;
type Permutation3 = Permutation<'B' | 'A' | 'C'>;
type Permutation4 = Permutation<never>;

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<never>, []>>,
]
