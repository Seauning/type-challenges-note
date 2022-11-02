/*
  2757 - PartialByKeys
  
  ### Question
  
  Implement a generic `PartialByKeys<T, K>` which takes two type argument `T` and `K`.
  
  `K` specify the set of properties of `T` that should set to be optional. When `K` is not provided, it should make all properties optional just like the normal `Partial<T>`.
  
  For example
  
  ```typescript
  interface User {
    name: string
    age: number
    address: string
  }
  
  type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
  ```
  
  > View on GitHub: https://tsch.js.org/2757
*/

import type { Equal, Expect, MergeInsertions } from '@type-challenges/utils'


type PartialByKeys<T, K = keyof T> = MergeInsertions<
  {
    [key in Exclude<keyof T, K>] : T[key]
  } & Partial<
  {
    [key in Exclude<keyof T, Exclude<keyof T, K>>] : T[key]
  }>
>



interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2757/answer
  > View solutions: https://tsch.js.org/2757/solutions
  > More Challenges: https://tsch.js.org
*/

