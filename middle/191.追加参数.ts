/*
  191 - 追加参数
  
  ### 题目
  
  实现一个泛型 `AppendArgument<Fn, A>`，
  对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。
  `G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数。
  
  ```typescript
  type Fn = (a: number, b: string) => number
  
  type Result = AppendArgument<Fn, boolean> 
  // 期望是 (a: number, b: string, x: boolean) => number
  ```
*/

// 如果想在 `原函数` 上加参数，首先需要保证原函数参数结构不变
// 我们需要通过 剩余参数 并 infer 出原函数的 函数参数类型列表，然后 infer 出原函数的返回值类型
// 需要注意的是，我们可以来 `类型` 中任意位置使用类型的扩展运算符，但是函数参数中扩展运算符总是最后一个
type AppendArgument<Fn, A> = Fn extends (...args: infer P) => infer R
                                ? (...args: [...P, A]) => R
                                : Fn


import type { Equal, Expect } from '@type-challenges/utils'

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Case2 = AppendArgument<() => void, undefined>

type Result1 = (a: number, b: string, x: boolean) => number
type Result2 = (x: undefined) => void

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
]
