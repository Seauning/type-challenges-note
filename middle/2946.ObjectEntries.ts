/*
  2946 - ObjectEntries
  
  ### Question
  
  Implement the type version of ```Object.entries```
  
  For example 
  
  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
  ```
*/

type GetObjectKeys<T> = keyof T;

type ObjectEntries<T, Keys = GetObjectKeys<T>> =  
              Keys extends keyof T
                    ? [Keys, T[Keys] extends infer R | undefined ? R : T[Keys]]
                    : never

import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type ObjectEntries1 = ObjectEntries<Model>;
type ObjectEntries2 = ObjectEntries<Partial<Model>>;
type ObjectEntries3 = ObjectEntries<{ key?: undefined }>;
type ObjectEntries4 = ObjectEntries<{ key: undefined }>;

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
]
