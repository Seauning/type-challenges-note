/*
  4 - 实现 Pick
  
  ### 题目
  
  实现 TS 内置的 `Pick<T, K>`，但不可以使用它。
  
  **从类型 `T` 中选择出属性 `K`，构造成一个新的类型**。
  
  例如：
  
  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  type TodoPreview = MyPick<Todo, 'title' | 'completed'>
  
  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```
*/

// 注意这里 K 是联合类型，T 是接口
// 我们需要通过 keyof 拿到 T 所有的键，再通过 extends 限制，确保 K 上所有的键 T 中都有
type MyPick<T, K extends keyof T> = {
  // 注意，这里 K 是联合类型，直接通过 in 遍历，再通过 [] 实现通过索引访问
  [key in K]: T[key]  
}

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

type Pick1 = MyPick<Todo, 'title'>;

type Pick2 =  MyPick<Todo, 'title' | 'completed'>;

// @ts-expect-error
type Pick3 =  MyPick<Todo, 'title' | 'completed' | 'invalid'>;

