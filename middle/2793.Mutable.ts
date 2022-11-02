/*
  2793 - Mutable
  
  ### Question
  
  Implement the generic ```Mutable<T>``` 
  which makes all properties in ```T``` mutable (not readonly).
  
  For example
  
  ```typescript
  interface Todo {
    readonly title: string
    readonly description: string
    readonly completed: boolean
  }
  
  type MutableTodo = Mutable<Todo> 
  // { title: string; description: string; completed: boolean; }
  
  ```
*/


type Mutable<T extends object> = {
  // -readonly 用于删除属性修饰符，类似的还有 -?
  // +readonly 用于添加属性修饰符，类似的还有 +? ，不过一般 + 省略不写
  // 参考：https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers
  -readonly[key in keyof T] : T[key]
}


import type { Equal, Expect } from '@type-challenges/utils'
import { ExpectFalse, NotEqual } from '@type-challenges/utils'

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type List = [1, 2, 3]

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>,
]

type errors = [
  // @ts-expect-error
  Mutable<'string'>,
  // @ts-expect-error
  Mutable<0>,
]
