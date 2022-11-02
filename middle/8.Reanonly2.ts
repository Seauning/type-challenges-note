/*
  8 - Readonly 2
  
  ### 题目
  
  实现一个通用`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。
  
  `K`指定应设置为Readonly的`T`的属性集。如果未提供`K`，则应使所有属性都变为只读，
  就像普通的`Readonly<T>`一样。
  
  例如
  
  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }
  
  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```
*/

type MyExclude<T, K> = T extends K ? never : T;

// 因为传入的第二个参数可能为空，所有需要通过 = 给予默认值
// 一个映射类型中不允许有两个 []:[] ，所以需要通过交叉类型来实现
// 一个筛选出公共的用于设置只读，一个筛选出非公共保持原来的类型不变
type MyReadonly2<T, K extends keyof T = keyof T> = {
  [key in MyExclude<keyof T, K>] : T[key]
} & {
  readonly [key in K] : T[key];
}

import type { Alike, Expect } from '@type-challenges/utils'

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}

type MyReadonly21 =  MyReadonly2<Todo1>;
type MyReadonly22 =  MyReadonly2<Todo1, 'title' | 'description'>;
type MyReadonly23 =  MyReadonly2<Todo2, 'title' | 'description'>;

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]




