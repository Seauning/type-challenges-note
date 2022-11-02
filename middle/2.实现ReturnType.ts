/*
  2 - 获取函数返回类型
  
  ### 题目
  
  不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 泛型。
  
  例如：
  
  ```ts
  const fn = (v: boolean) => {
    if (v)
      return 1
    else
      return 2
  }
  
  type a = MyReturnType<typeof fn> // 应推导出 "1 | 2"
  ```
*/

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never

import type { Equal, Expect } from '@type-challenges/utils'


type ComplexObject = {
  a: [12, 'foo']
  bar: 'hello'
  prev(): number
}

const fn = (v: boolean) => v ? 1 : 2
const fn1 = (v: boolean, w: any) => v ? 1 : 2

type MyReturnType1 = MyReturnType<() => string>;
type MyReturnType2 = MyReturnType<() => 123>;
type MyReturnType3 = MyReturnType<() => ComplexObject>;
type MyReturnType4 = MyReturnType<() => Promise<boolean>>;
type MyReturnType5 = MyReturnType<() => () => 'foo'>;
type MyReturnType6 = MyReturnType<typeof fn>;
type MyReturnType7 = MyReturnType<typeof fn1>;

type cases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => 'foo', MyReturnType<() => () => 'foo'>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>,
]


