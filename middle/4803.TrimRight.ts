/*
  4803 - Trim Right
  
  ### 题目
  
  实现 `TrimRight<T>` ，它接收确定的字符串类型并返回一个新的字符串，
  其中新返回的字符串删除了原字符串结尾的空白字符串。
  
  例如
  
  ```ts
  type Trimed = TrimLeft<'  Hello World  '> // 应推导出 '  Hello World'
  ```
  
  > 在 Github 上查看：https://tsch.js.org/4803/zh-CN
*/

// 1. 反转字符串后 TrimLeft 再反转
type ReverseS<S extends string> = S extends `${infer F}${infer R}`
                                      ? `${ReverseS<R>}${F}`
                                      : ''

// 尾递归版 reverse
type ReverseSByTail<S extends string, newS extends string = ''>
  = S extends `${infer F}${infer R}`
      ? ReverseSByTail<R, `${F}${newS}`>
      : newS

// 应该删除的字符
type DeletedC = ' ' | '\t' | '\n'

type TrimLeft<S extends string> = S extends `${infer F}${infer R}`
                                      ? F extends DeletedC
                                          ? TrimLeft<R>
                                          : S
                                       : S

type TrimRight<S extends string> = ReverseS<TrimLeft<ReverseS<S>>>

// 2. 直接 TrimRight ，利用好模板字符串中 infer 从左到右会匹配第一个满足要求的模式
type TrimRightImediate<S extends string> = S extends `${infer F}${DeletedC}`
                                            ? TrimRightImediate<F>
                                            : S

import type { Equal, Expect } from '@type-challenges/utils'

type TrimRight1 = TrimRight<'str'>;
type TrimRight2 = TrimRight<'str '>;
type TrimRight3 = TrimRight<'str     '>;
type TrimRight4 = TrimRight<'     str     '>;
type TrimRight5 = TrimRight<'   foo bar  \n\t '>;
type TrimRight6 = TrimRight<''>;
type TrimRight7 = TrimRight<'\n\t '>;

type cases = [
  Expect<Equal<TrimRight<'str'>, 'str'>>,
  Expect<Equal<TrimRight<'str '>, 'str'>>,
  Expect<Equal<TrimRight<'str     '>, 'str'>>,
  Expect<Equal<TrimRight<'     str     '>, '     str'>>,
  Expect<Equal<TrimRight<'   foo bar  \n\t '>, '   foo bar'>>,
  Expect<Equal<TrimRight<''>, ''>>,
  Expect<Equal<TrimRight<'\n\t '>, ''>>,
  Expect<Equal<TrimRight<'str'>, 'str'>>,

  Expect<Equal<TrimRightImediate<'str '>, 'str'>>,
  Expect<Equal<TrimRightImediate<'str     '>, 'str'>>,
  Expect<Equal<TrimRightImediate<'     str     '>, '     str'>>,
  Expect<Equal<TrimRightImediate<'   foo bar  \n\t '>, '   foo bar'>>,
  Expect<Equal<TrimRightImediate<''>, ''>>,
  Expect<Equal<TrimRightImediate<'\n\t '>, ''>>,
]



