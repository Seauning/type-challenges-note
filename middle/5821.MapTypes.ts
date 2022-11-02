/*
  5821 - MapTypes
  
  ### Question
  
  Implement `MapTypes<T, R>` which will 
  transform types in object T to different types
  defined by type R which has the following structure
  
  ```ts
  type StringToNumber = {
    mapFrom: string; // value of key which value is string
    mapTo: number; // will be transformed for number
  }
  ```
  
  ## Examples:
  
  ```ts
  type StringToNumber = { mapFrom: string; mapTo: number;}
  MapTypes<{iWillBeANumberOneDay: string}, StringToNumber> // gives { iWillBeANumberOneDay: number; }
  ```
  
  Be aware that user can provide a union of types:
  ```ts
  type StringToNumber = { mapFrom: string; mapTo: number;}
  type StringToDate = { mapFrom: string; mapTo: Date;}
  MapTypes<{iWillBeNumberOrDate: string}, StringToDate | StringToNumber> // gives { iWillBeNumberOrDate: number | Date; }
  ```
  
  If the type doesn't exist in our map, leave it as it was:
  ```ts
  type StringToNumber = { mapFrom: string; mapTo: number;}
  MapTypes<{iWillBeANumberOneDay: string, iWillStayTheSame: Function}, StringToNumber> // // gives { iWillBeANumberOneDay: number, iWillStayTheSame: Function }
  ```
  
  > View on GitHub: https://tsch.js.org/5821
*/


// 难点：R 为联合类型，并且可能存在 T 符合 R 中的一项，但是不符合另一项的情况
// 这时候，一项会返回 R['mapTo'] 而另一项会返回 T[Key] 因此会联合起来
// 这时候就需要在原本 extends 的结果上在限制一下 R 
// 只有 R 满足 {mapFrom:T[Key]}，才允许 R['mapTo']
// 例如最后一个例子
// 因为 string extends string | Date
// 所以会走第一个问号
// 接着 { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string } extends {mapFrom: string} ? R['mapTo'] : never
// 这里条件限制将得到 boolean ，所以把 { mapFrom: Date; mapTo: string } 筛掉了，因此没有 string (保持原键值)
// 也就不会有 { name : string | boolean } 的情况
type MapTypes<T, R extends Record<'mapFrom' | 'mapTo', any>> = {
  [Key in keyof T] : T[Key] extends R['mapFrom']
                        ? R extends Record<'mapFrom', T[Key]>
                          ? R['mapTo']
                          : never
                        : T[Key]
}


import type { Equal, Expect } from '@type-challenges/utils'

type MapTypes1 = MapTypes<{ stringToArray: string }, { mapFrom: string; mapTo: [] }>;
type MapTypes2 = MapTypes<{ stringToNumber: string }, { mapFrom: string; mapTo: number }>;
type MapTypes3 = MapTypes<{ stringToNumber: string; skipParsingMe: boolean }, { mapFrom: string; mapTo: number }>;
type MapTypes4 = MapTypes<{ date: string }, { mapFrom: string; mapTo: Date } | { mapFrom: string; mapTo: null }>;
type MapTypes5 = MapTypes<{ date: string }, { mapFrom: string; mapTo: Date | null }>;
type MapTypes6 = MapTypes<{ fields: Record<string, boolean> }, { mapFrom: Record<string, boolean>; mapTo: string[] }>;
type MapTypes7 = MapTypes<{ name: string }, { mapFrom: boolean; mapTo: never }>;
type MapTypes8 = MapTypes<{ name: string; date: Date }, { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }>;

type cases = [
  Expect<Equal<MapTypes<{ stringToArray: string }, { mapFrom: string; mapTo: [] }>, { stringToArray: [] }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string }, { mapFrom: string; mapTo: number }>, { stringToNumber: number }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string; skipParsingMe: boolean }, { mapFrom: string; mapTo: number }>, { stringToNumber: number; skipParsingMe: boolean }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string; mapTo: Date } | { mapFrom: string; mapTo: null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string; mapTo: Date | null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ fields: Record<string, boolean> }, { mapFrom: Record<string, boolean>; mapTo: string[] }>, { fields: string[] }>>,
  Expect<Equal<MapTypes<{ name: string }, { mapFrom: boolean; mapTo: never }>, { name: string }>>,
  Expect<Equal<MapTypes<{ name: string; date: Date }, { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }>, { name: boolean; date: string }>>,
]

