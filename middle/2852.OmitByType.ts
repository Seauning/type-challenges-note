/*
  2852 - OmitByType
  
  ### Question
  
  From ```T```, pick a set of properties 
  whose type are not assignable to ```U```.
  
  For Example
  
  ```typescript
  type OmitBoolean = OmitByType<{
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  }, boolean> // { name: string; count: number }
  ```
*/


type OmitByType<T, U> = {
  // as 重映射，返回 never，index 索引
  [Key in keyof T as T[Key] extends U ? never : Key] : T[Key]
}


import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<OmitByType<Model, boolean>, { name: string; count: number }>>,
  Expect<Equal<OmitByType<Model, string>, { count: number; isReadonly: boolean; isEnable: boolean }>>,
  Expect<Equal<OmitByType<Model, number>, { name: string; isReadonly: boolean; isEnable: boolean }>>,
]
