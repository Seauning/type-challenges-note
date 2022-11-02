/*
  189 - Awaited
  
  ### 题目
  
  假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。
  在 TS 中，我们用 Promise<T> 中的 T 来描述这个 Promise 返回的类型。
  请你实现一个类型，可以获取这个类型。
  
  比如：`Promise<ExampleType>`，请你返回 ExampleType 类型。
*/

// 限制传入参数需要为 Promise<T>
type MyAwaited<T extends Promise<any>> = T extends Promise<infer R> 
                              ? R extends Promise<any>  
                                          ? MyAwaited<R>  // 只有在 R 满足为 Promise<T> 时才递归
                                          : R // 否则直接返回类型
                              : never;

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<Promise<number>>>;
// V 和 W 等价，因为条件类型作用于泛型时，如果传入的是一个联合类型
// 会发生条件分发
type V = Promise<Promise<Promise<string | number>>>;
type W = Promise<Promise<Promise<string> | Promise<number>>>;


type MyAwaited1 = MyAwaited<X>; // string
type MyAwaited2 = MyAwaited<Y>; // { field: number; }
type MyAwaited3 = MyAwaited<Z>; // number

type MyAwaited4 = MyAwaited<W>; // string | number
type MyAwaited5 = MyAwaited<V>; // string | number

// @ts-expect-error
type error = MyAwaited<number>