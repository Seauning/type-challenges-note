/*
  8987 - Subsequence(子序列)
  
  ### Question
  
  Given an array of unique elements, return all possible subsequences.
  
  A subsequence is a sequence that can be derived from an array 
  by deleting some or no elements without changing the order of the remaining elements.
  
  For example: 
  
  ```typescript
  type A = Subsequence<[1, 2] // [] | [1] | [2] | [1, 2]
  ```
  
  > View on GitHub: https://tsch.js.org/8987
*/

// [参考链接](https://github.com/type-challenges/type-challenges/issues/9091)
type Subsequence<T> = T extends [infer One, ...infer Rest]
  ? [One] | [...Subsequence<Rest>] | [One, ...Subsequence<Rest>]
  : []

// 翻译下来应该是这样
type s = [1] | [1, ...([2] | [3] | [2, 3])] | [...([2] | [3] | [2, 3])]

// 这个解法不仅很棒，还用了尾递归，真的需要好好学习一下
type SubsequenceByTail<T extends any[], Prefix extends any[] = []>
   = T extends [infer F, ...infer R]
      ? SubsequenceByTail<R, Prefix | [...Prefix, F]>
      : Prefix

// 这个翻译下来是这样
type s1 = [] | [1] | [...([] | [1]), 2] | [...([] | [1] | [...([] | [1]), 2]), 3]

type p3 =  [...([] | [1] | [...([] | [1]), 2]), 3]

// [...([] | [1] | [...([] | [1]), 2]), 3]
// => [...([] | [1] | [2] | [1, 2]), 3]
// => [3] | [1, 3] | [2, 3] | [1, 2, 3]

import type { Equal, Expect } from '@type-challenges/utils'

type Subsequence1 = Subsequence<[1, 2]>
type Subsequence2 = Subsequence<[1, 2, 3]>

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] >>,
]
