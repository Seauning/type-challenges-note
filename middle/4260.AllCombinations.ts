/*
  4260 - AllCombinations
  
  ### Question
  
  Implement type ```AllCombinations<S>``` that return all combinations 
  of strings which use characters from ```S``` at most once.
  
  For example:
  
  ```ts
  type AllCombinations_ABC = AllCombinations<'ABC'>;
  // should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
  ```
  
*/


type String2Union<S extends string> = S extends `${infer F}${infer K}` ? F | String2Union<K> : never;

type Combinations<T extends string, U extends string = T> = 
  [T] extends [never] 
      ? '' 
      : T extends U
          // 模板字符串中的联合类型也具有分布式，`${a}${b}` ，a = 'A'，b = 'B' | 'C' => 'A' | 'AB' | 'AC'
          // | 左边的表示以当前这个为起点的组合，| 右边表示没有当前的组合，如 'A' | 'B' | 'C' => ('A...') | ('...')
          // 从 T 中选出不包含 U 这个元素的剩余联合元素作为下一次分布式联合类型的遍历范围
          ? `${T}${Combinations<Exclude<U,T>>}` | `${Combinations<Exclude<U,T>>}`
          : ''

type CombinationsByObjectIndex<
      STR extends string,
      S extends string = String2Union<STR>,
> = [S] extends [never]
      ? ''
      // 1. 构造对象
      // 2. 通过 S （联合类型的索引）来访问到值
      // 注：这里加个空串，是为了只有当前单个字符没有其他字符的情况，如下面 AB ，联合类型会自动得到所有组合
      //     再加上 K in S ，就可以得到不同字符开头的组合
      : '' | {[K in S]: `${K}${CombinationsByObjectIndex<never, Exclude<S, K>>}`}[S];

type AB = `${'' | 'A'}${'' | 'B'}`  // "" | "A" | "B" | "AB"

// 转为联合类型后再递归，可以利用分布式联合类型
type AllCombinations<S extends string> = Combinations<String2Union<S>>


import type { Equal, Expect } from '@type-challenges/utils'

type AllCombinations1 = AllCombinations<''>;
type AllCombinations2 = AllCombinations<'A'>;
type AllCombinations3 = AllCombinations<'AB'>; 
type AllCombinations4 = AllCombinations<'ABC'>;
type AllCombinations5 = AllCombinations<'ABCD'>;

type CombinationsByObjectIndex1 = CombinationsByObjectIndex<''>;
type CombinationsByObjectIndex2 = CombinationsByObjectIndex<'A'>;
type CombinationsByObjectIndex3 = CombinationsByObjectIndex<'AB'>; 
type CombinationsByObjectIndex4 = CombinationsByObjectIndex<'ABC'>;
type CombinationsByObjectIndex5 = CombinationsByObjectIndex<'ABCD'>;

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<AllCombinations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>,
  Expect<Equal<AllCombinations<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
  
  Expect<Equal<CombinationsByObjectIndex<''>, ''>>,
  Expect<Equal<CombinationsByObjectIndex<'A'>, '' | 'A'>>,
  Expect<Equal<CombinationsByObjectIndex<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<CombinationsByObjectIndex<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>,
  Expect<Equal<CombinationsByObjectIndex<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
]