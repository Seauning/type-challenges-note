/*
  645 - Diff
  
  ### 题目
  
  获取两个接口类型中的差值属性。
  
  ```ts
  type Foo = {
    a: string;
    b: number;
  }
  type Bar = {
    a: string;
    c: boolean
  }
  
  type Result1 = Diff<Foo,Bar> // { b: number, c: boolean }
  type Result2 = Diff<Bar,Foo> // { b: number, c: boolean }
  
  ```
*/

// 递归合并（常用于交叉类型的合并）
type Merge<O> = {
  [key in keyof O] : O[key] extends object
                      ? Merge<O[key]> // 如果是对象则递归合并
                      : O[key]
}

// 从 T 中排除 U 中有的， T 和 U 都是联合类型
type MyExclude<T, U> = T extends U ? never : T;

// 排除联合类型 U 的剩余键
type MyOmit<O, U> = {
  [key in MyExclude<keyof O, U>] : O[key]
}

// 挑选出 O 中有的 O1 中没有的，以及 O1 中有的 O 中没有的 键值对对象
// 再通过 & 交叉类型
// 最后通过 Merge 遍历所有键合并交叉类型到一个对象
type Diff<O, O1> = Merge<MyOmit<O, keyof O1> & MyOmit<O1, keyof O>>


// 本质上可以转为下面的代码
type _Diff<O, O1> = {
  // 挑选出 O 中有的 O1 中没有的，以及 O1 中有的 O 中没有的 键，再判断键属于谁拿到相应的值，never 实际上是走不到的，因为这个键要么在 O 要么在  O1
  [P in Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O>] : P extends keyof O ? O[P] : P extends keyof O1 ? O1[P] : never
}


import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type Diff1 = Diff<Foo, Bar>
type Diff2 = Diff<Bar, Foo>
type Diff3 = Diff<Foo, Coo>
type Diff4 = Diff<Coo, Foo>

type _Diff1 = _Diff<Foo, Bar>
type _Diff2 = _Diff<Bar, Foo>
type _Diff3 = _Diff<Foo, Coo>
type _Diff4 = _Diff<Coo, Foo>

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]