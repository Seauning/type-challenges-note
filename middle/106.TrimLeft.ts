/*
  106 - Trim Left
  
  ### 题目
  
  实现 `TrimLeft<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串开头的空白字符串。
  
  例如
  
  ```ts
  type trimed = TrimLeft<'  Hello World  '> // 应推导出 'Hello World  '
  ```
*/

type trim = ' ' | '\t' | '\n'
type TrimLeft<S extends string> = S extends `${trim}${infer R}` ? TrimLeft<R> : S;

import type { Equal, Expect } from '@type-challenges/utils'

type TrimLeft1 = TrimLeft<'str'>;
type TrimLeft2 = TrimLeft<' str'>;
type TrimLeft3 = TrimLeft<'     str'>;
type TrimLeft4 = TrimLeft<'     str     '>;
type TrimLeft5 = TrimLeft<'   \n\t foo bar '>;
type TrimLeft6 = TrimLeft<''>;
type TrimLeft7 = TrimLeft<' \n\t'>;

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]