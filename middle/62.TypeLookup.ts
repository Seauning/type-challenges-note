/*
  62 - Type Lookup
  
  ### 题目
  
  有时，您可能希望根据其属性在并集中查找类型。
  
  在此挑战中，我们想通过在联合`Cat | Dog`中搜索公共`type`字段来获取相应的类型。
  换句话说，在以下示例中，我们期望`LookUp<Dog | Cat, 'dog'>`获得`Dog`，
  `LookUp<Dog | Cat, 'cat'>`获得`Cat`。
  
  ```ts
  interface Cat {
    type: 'cat'
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
  }
  
  interface Dog {
    type: 'dog'
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
    color: 'brown' | 'white' | 'black'
  }
  
  type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
  ```
*/


// 1. 条件类型限制 U ，U 应该为具有 string 类型的 type 属性的对象
// 2. 条件类型限制 V ，泛型作用于条件类型上时会发生分配律，用这个性质判断 T 是否在 U['type'] 上
// 3. U extends {type: T} 也是发生了分配律 ，如果 U 是满足 {type: T} 的对象，就会返回，并且当有多个时，返回的会是联合类型
type LookUp<U extends {type: string}, T extends U['type']> = U extends {type: T} ? U : never

import type { Equal, Expect } from '@type-challenges/utils'

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type Animal = Cat | Dog

type cases = [
  Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
  Expect<Equal<LookUp<Animal, 'cat'>, Cat>>,
]
