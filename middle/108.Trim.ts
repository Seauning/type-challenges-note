/*
  108 - Trim
  
  ### 题目
  
  实现`Trim<T>`，它是一个字符串类型，并返回一个新字符串，其中两端的空白符都已被删除。
  
  例如
  
  ```ts
  type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
  ```
*/

type trim = ' ' | '\t' | '\n'
type Trim<S extends string> = S extends `${trim}${infer R}` 
                                            ? Trim<R> 
                                            : S extends `${infer R}${trim}`
                                                  ? Trim<R>
                                                  : S

import type { Equal, Expect } from '@type-challenges/utils'

type Trim1 = Trim<'str'>;
type Trim2 = Trim<' str'>;
type Trim3 = Trim<'     str'>;
type Trim4 = Trim<'     str     '>;
type Trim5 = Trim<'   \n\t foo bar '>;
type Trim6 = Trim<''>;
type Trim7 = Trim<' \n\t'>;

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]


