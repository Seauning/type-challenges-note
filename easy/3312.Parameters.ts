/*
  3312 - Parameters
  
  ### 题目
  
  实现内置的 Parameters<T> 类型，而不是直接使用它
  由一个函数类型别名中的参数类型，来构造一个元组类型
  可参考[TypeScript官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)。
*/

// 借助 infer 推出传入的参数的类型的元组，由于是元组，所以 P 无需重新扩展
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;

import type { Equal, Expect } from '@type-challenges/utils'

const foo = (arg1: string, arg2: number): void => {}
const bar = (arg1: boolean, arg2: { a: 'A' }): void => {}
const baz = (arg1:number, ...args:number[]): void => {}
const bao = (): void => {}

type MyParameters1 = MyParameters<typeof foo>;
type MyParameters2 = MyParameters<typeof bar>;
type MyParameters3 = MyParameters<typeof baz>;
type MyParameters4 = MyParameters<typeof bao>;

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, [arg1: number, ...args: number[]]>>,
  Expect<Equal<MyParameters<typeof bao>, []>>,
]