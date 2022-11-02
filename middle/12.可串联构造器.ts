/*
  12 - 可串联构造器
  by Anthony Fu (@antfu) #中等 #application
  
  ### 题目
  
  在 JavaScript 中我们很常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给他附上类型吗？
  
  在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 `option(key, value)` 和 `get()`。在 `option` 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 `get` 获取最终结果。
  
  例如
  
  ```ts
  declare const config: Chainable
  
  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()
  
  // 期望 result 的类型是：
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  ```
  
  你只需要在类型层面实现这个功能 - 不需要实现任何 TS/JS 的实际逻辑。
  
  你可以假设 `key` 只接受字符串而 `value` 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 `key` 只会被使用一次。
  
  > 在 Github 上查看：https://tsch.js.org/12/zh-CN
*/

type EmptyObject<T> = keyof T extends keyof {} ? true : false;

// 传入类型得到条件，返回值只可能为 string | 键名 | never
type Case<T, K> = EmptyObject<T> extends true ? string : Exclude<keyof T, K>

type case1 = Case<{}, 'a'>
type case2 = Case<{'a' : 1, 'b' : 2}, 'a'>

type Chainable<Result extends object = {}> = {
  // 包裹一层 Chainble 是为了链式调用，让返回的对象上有 option 和 get 方法
  // 1. 引入泛型，并且函数参数用泛型限制
  // 2. 同名属性，需要用 extends 限制禁止设置同名属性
  // 3. Record 生成一个键为 K 值为 V 的对象
  // option<K extends string, V>(key: K extends keyof Result ? never : K, value: V): Chainable<Result & Record<K, V>> 

  // 1. Case<Result, K> 是获取约束，如果得到的约束是 never 表明已经存在相同的键
  // 2. 括号里的一整部分是约束，如果约束为 never 那必定不符合，因为 string not extends never
  option<K extends (Case<Result, K> extends never ? never : string) , V>(key: K, value: V): Chainable<Result & Record<K, V>> 
  get(): Result
}


import type { Alike, Expect } from '@type-challenges/utils'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}


