/*
  949 - AnyOf
  
  ### 题目
  
  在类型系统中实现类似于 Python 中 `any` 函数。
  类型接收一个数组，如果数组中任一个元素为真，则返回 `true`，
  否则返回 `fasle`。如果数组为空，返回 `false`。
  
  例如：
  
  ```ts
  type Sample1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
  type Sample2 = AnyOf<[0, '', false, [], {}]> // expected to be false.
  ```
*/

type Record1 = Record<string, never>;

type Null = {a:never} | {} extends Record1 ? true : false

// 判断是否为 false ，不是 false 就是 true
type IsFalse<T> = T extends Record<string,never> | [] | 0 | '' | false | undefined | null ? false : true;

type AnyOf<T extends readonly any[]> = IsFalse<T[number]> extends false ? false : true


import type { Equal, Expect } from '@type-challenges/utils'


type AnyOf1 = AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>;
type AnyOf2 = AnyOf<[1, '', false, [], {}]>;
type AnyOf3 = AnyOf<[0, 'test', false, [], {}]>;
type AnyOf4 = AnyOf<[0, '', true, [], {}]>;
type AnyOf5 = AnyOf<[0, '', false, [1], {}]>;
type AnyOf6 = AnyOf<[0, '', false, [], { name: 'test' }]>;
type AnyOf7 = AnyOf<[0, '', false, [], { 1: 'test' }]>;
type AnyOf8 = AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>;
type AnyOf9 = AnyOf<[0, '', false, [], {}]>;
type AnyOf10 = AnyOf<[]>;

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]
