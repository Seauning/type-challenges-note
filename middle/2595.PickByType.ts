/*
  2595 - PickByType
  
  ### Question
  
  From `T`, pick a set of properties whose type are assignable to `U`.
  
  For Example
  
  ```typescript
  type OnlyBoolean = PickByType<{
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  }, boolean> // { isReadonly: boolean; isEnable: boolean; }
  ```
*/

// 类似于 1367.RemoveIndexSignature 只要掌握了 as remap 以及，返回 never 就能解决
// 这里的泛型变量 T 通过 extends 限制为一个具有 string 类型的键的对象
// 关于 Record 可以看这里 https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
type PickByType<T extends Record<string, any>, U> = {
  [key in keyof T as T[key] extends U ? key : never] : T[key]
}


import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<PickByType<Model, boolean>, { isReadonly: boolean; isEnable: boolean }>>,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>,
]
