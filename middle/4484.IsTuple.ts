/*
  4484 - IsTuple
  
  ### Question
  
  Implement a type ```IsTuple```, 
  which takes an input type ```T``` 
  and returns whether ```T``` is tuple type.
  
  For example:
  
  ```typescript
  type case1 = IsTuple<[number]> // true
  type case2 = IsTuple<readonly [number]> // true
  type case3 = IsTuple<number[]> // false
  ```
  
  > View on GitHub: https://tsch.js.org/4484
*/

type array = ['2']['length']  // 1
type tuple = '2'['length']  // number

const x = [1, 2] as [number, number];  // Tuple
const y = [1, 2] as number[];          // Array

const lenX = x.length;  // const lenX: 2
const lenY = y.length;  // const lenY: number

type t1 = typeof lenX // 2
type t2 = typeof lenY // number

type t11 = number extends typeof lenX ? true : false;  // type t1 = false
type t22 = number extends typeof lenY ? true : false;  // type t2 = true

type numberIsNum = number extends 1 ? true : false; // false
type numIsNumber = 1 extends number ? true : false; // true

// 1. 排除 never , 因为 never 会被当做一个空的联合
// 2. [] 包括 元组及数组（元组是一种固定长度的数组）
// 3. 元组类型的 ['length'] 精确到数字

type IsTuple<T> = 
  [T] extends [never]
    ? false
    : T extends readonly any[]
      // Not T['length'] extends number
      ? number extends T['length']
        ? false // number extends number
        : true  // number extends 1
      : false


import type { Equal, Expect } from '@type-challenges/utils'

type IsTuple1 = IsTuple<[]>;
type IsTuple2 = IsTuple<[number]>;
type IsTuple3 = IsTuple<readonly [1]>;
type IsTuple4 = IsTuple<{ length: 1 }>;
type IsTuple5 = IsTuple<number[]>;
type IsTuple6 = IsTuple<never>;

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]