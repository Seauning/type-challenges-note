/*
  599 - Merge
  
  ### 题目
  
  将两个类型合并成一个类型，第二个类型的键会覆盖第一个类型的键。
  
  例如
  
  ```ts
  type foo = {
    name: string;
    age: string;
  }
  
  type coo = {
    age: number;
    sex: string
  }
  
  type Result = Merge<foo,coo>; // expected to be {name: string, age: number, sex: string}
  ```
*/

type Merge<F, S> = {
  [key in keyof F | keyof S] : key extends keyof S 
                                    ? S[key] 
                                    : key extends keyof F 
                                            ? F[key] 
                                            : never
}

// 上述的多重条件类型判断也可以解决题目的问题
// 但是需要注意的是 keyof (F | S) 和 keyof F | keyof S 的区别

type a = keyof (Foo | Bar)  // 'b'
type b = keyof Foo | keyof Bar  // a' | 'b' | 'c'
type c = keyof (Foo & Bar)  // 'a' | 'b' | 'c'
type d = keyof Foo & keyof Bar  // 'b'

// 也可以通过 Omit 将 F 与 S 中重复的键先去除，再通过 & 交叉类型

type MyExclude<F, U> = F extends U ? never : F

type MyOmit<F, U> = {
  [key in MyExclude<keyof F, U>] :  F[key]
}

// 最后递归并合并一下交叉后的类型
type Merge2<F, S> = _Merge<MyOmit<F, keyof S> & S>;
type _Merge<F> = {
  [key in keyof F] : F[key] extends object
                      ? _Merge<F[key]>  // 递归合并
                      : F[key]
}

import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type Merge1 = Merge<Foo, Bar>;
type Merge21 = Merge2<Foo, Bar>;

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
  Expect<Equal<Merge2<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]


