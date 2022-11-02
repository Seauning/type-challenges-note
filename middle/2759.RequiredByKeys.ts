/*
  2759 - RequiredByKeys
  
  ### Question
  
  Implement a generic `RequiredByKeys<T,  K>` which takes two type argument `T` and `K`.
  
  `K` specify the set of properties of `T` that should set to be required. When `K` is not provided, it should make all properties required just like the normal `Required<T>`.
  
  For example
  
  ```typescript
  interface User {
    name?: string
    age?: number
    address?: string
  }
  
  type UserPartialName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }
  
  ```
  
  > View on GitHub: https://tsch.js.org/2759
*/

import type { Equal, Expect, MergeInsertions } from '@type-challenges/utils'

type Merge<T> = {
  [key in keyof T] : T[key] extends object ? Merge<T[key]> : T[key]
}

type RequiredByKeys<T, K = keyof T> = Merge<Omit<T, keyof K> & {
  [key in keyof T as key extends K ? key : never] -?: T[key]
}>


interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string
}

interface UserRequiredNameAndAge {
  name: string
  age: number
  address?: string
}

interface Res2 {
  age: number;
  name: string;
  address?: string | undefined;
}

type RequiredByKeys1 = RequiredByKeys<User, 'name'>;
type RequiredByKeys2 = RequiredByKeys<User, 'name' | 'unknown'>;
type RequiredByKeys3 = RequiredByKeys<User, 'name' | 'age'>;
type RequiredByKeys4 = RequiredByKeys<User>;
type RequiredByKeys5 = RequiredByKeys<UserRequiredName, 'age'>;

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<UserRequiredName, 'age'>, Res2>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
]


