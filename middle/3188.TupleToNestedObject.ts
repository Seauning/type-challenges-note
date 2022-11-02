/*
  3188 - Tuple to Nested Object
  
  ### Question
  
  Given a tuple type ```T``` that only contains string type,
   and a type ```U```, build an object recursively.
  
  ```typescript
  type a = TupleToNestedObject<['a'], string> // {a: string}
  type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
  // boolean. if the tuple is empty, just return the U type
  type c = TupleToNestedObject<[], boolean> 
  ```
  
*/


type TupleToNestedObject<T extends any[], U> = 
    T extends [infer First, ...infer Rest]
      // 由于 First 必须为联合类型时才能使用 in ，我们可以用条件类型限制一下
      // 这样 ts 会把 First 当做只有一个元素的联合类型
      ? First extends string | number
          ? {
              [key in First] : TupleToNestedObject<Rest, U>
            }
          : never
      // 也可以使用 as 断言 key 为 T[0] 这个元素
      // ? {
      //     [key in First as T[0]] : TupleToNestedObject<Rest, U>
      //   }
      : U


import type { Equal, Expect } from '@type-challenges/utils'

type TupleToNestedObject1 = TupleToNestedObject<['a'], string>;
type TupleToNestedObject2 = TupleToNestedObject<['a', 'b'], number>;
type TupleToNestedObject3 = TupleToNestedObject<['a', 'b', 'c'], boolean>;
type TupleToNestedObject4 = TupleToNestedObject<[], boolean>;

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]
