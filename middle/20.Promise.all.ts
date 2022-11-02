/*
  20 - Promise.all
  
  ### 题目
  
  键入函数`PromiseAll`，它接受PromiseLike对象数组，返回值应为`Promise<T>`，其中`T`是解析的结果数组。
  
  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });
  
  // expected to be `Promise<[number, 42, string]>`
  const p = Promise.all([promise1, promise2, promise3] as const)
  ```
*/

type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer V> 
                                              ? V extends Promise<unknown>
                                                    ? MyAwaited<V>
                                                    : V
                                              : never
                                            
declare function PromiseAll<T extends unknown[]>(values: readonly [...T]): Promise<{
  [key in keyof T]: T[key] extends Promise<unknown> ? MyAwaited<T[key]>  : T[key]
}>

// 2. 递归解法
type TUtil1<T> = T extends PromiseLike<infer R> ? R : T;

type TUtil2<T extends readonly any[]> = T extends readonly [infer F, ...infer R] ? [TUtil1<F>, ...TUtil2<R>] : [];

declare function PromiseAll2<T extends unknown[]>(values: readonly [...T]): Promise<TUtil2<T>>;



declare function Test1<T>(values: T) : {  
  [K in keyof T]: T[K]
}
const test1 = Test1([1, 2, 3])    // number[]

declare function Test2<T extends any[]>(values: readonly [...T]) : {
  [K in keyof T]: T[K]
}
const test2 = Test2([1, 2, 3])    // [number, number, number]


import type { Equal, Expect } from '@type-challenges/utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
]

