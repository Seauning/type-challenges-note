/*
  1097 - IsUnion
  
  ### Question
  
  Implement a type `IsUnion`, 
  which takes an input type `T` and returns whether `T` resolves to a union type.
  
  For example:
    
    ```ts
    type case1 = IsUnion<string>  // false
    type case2 = IsUnion<string|number>  // true
    type case3 = IsUnion<[string|number]>  // false
    ```
*/

type Other1 = {} extends {} ? true : false;
type Other2 = [] extends [] ? true : false;
type Other3 = 'a' extends 'a' ? true : false
type Other4 = any extends any ? true : false
type Other5 = unknown extends unknown ? true : false

// 联合类型 T 中每个元素都会 extends T ，其他类型也是如此
// 只有 never 不 extends never
type IsUnion<T, U = T> = T extends T 
                         // 如果从联合类型中排除它本身，得到的会是 never，需要比较 never
                          //  ? [Exclude<U, T>] extends [never] // 这种也可以
                           ? [Exclude<U, T>] extends never[]
                                    ? false 
                                    : true 
                           : never;


import type { Equal, Expect } from '@type-challenges/utils'

type IsUnion1 = IsUnion<string>;
type IsUnion2 = IsUnion<string|number>;
type IsUnion3 = IsUnion<'a'|'b'|'c'|'d'>;
type IsUnion4 = IsUnion<undefined|null|void|''>;
type IsUnion5 = IsUnion<{ a: string }|{ a: number }>;
type IsUnion6 = IsUnion<{ a: string|number }>;
type IsUnion7 = IsUnion<[string|number]>;
// T 被解析为一个非联合类型的情况
type IsUnion8 = IsUnion<string|never>;
type IsUnion9 = IsUnion<string|unknown>;
type IsUnion10 = IsUnion<string|any>;
type IsUnion11 = IsUnion<string|'a'>;
// never，因为 never extends never 将会是 false
type Never1 = IsUnion<never>;  
type Never2 = [never] extends [never] ? true : false;

type cases = [
  Expect<Equal<IsUnion<string>, false >>,
  Expect<Equal<IsUnion<string|number>, true >>,
  Expect<Equal<IsUnion<'a'|'b'|'c'|'d'>, true >>,
  Expect<Equal<IsUnion<undefined|null|void|''>, true >>,
  Expect<Equal<IsUnion<{ a: string }|{ a: number }>, true >>,
  Expect<Equal<IsUnion<{ a: string|number }>, false >>,
  Expect<Equal<IsUnion<[string|number]>, false >>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string|never>, false >>,
  Expect<Equal<IsUnion<string|unknown>, false >>,
  Expect<Equal<IsUnion<string|any>, false >>,
  Expect<Equal<IsUnion<string|'a'>, false >>,
]

