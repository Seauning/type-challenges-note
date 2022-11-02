/*
  1978 - Percentage Parser
  
  ### 题目
  
  实现类型 PercentageParser<T extends string>。
  根据规则 `/^(\+|\-)?(\d*)?(\%)?$/` 匹配类型 T。
  
  匹配的结果由三部分组成，分别是：[`正负号`, `数字`, `单位`]，
  如果没有匹配，则默认是空字符串。
  
  例如：
  
  ```ts
  type PString1 = ''
  type PString2 = '+85%'
  type PString3 = '-85%'
  type PString4 = '85%'
  type PString5 = '85'
  
  type R1 = PercentageParser<PString1> // expected ['', '', '']
  type R2 = PercentageParser<PString2> // expected ["+", "85", "%"]
  type R3 = PercentageParser<PString3> // expected ["-", "85", "%"]
  type R4 = PercentageParser<PString4> // expected ["", "85", "%"]
  type R5 = PercentageParser<PString5> // expected ["", "85", ""]
  ```
*/

type GetPrefix<A extends string> = A extends `+${string}`
                                      ? '+'
                                      : A extends `-${string}`
                                          ? '-'
                                          : '';

type GetSuffix<A extends string> = A extends `${string}%`
                                      ? '%'
                                      : '';

type GetNumber<A extends string> = A extends `${GetPrefix<A>}${infer M}${GetSuffix<A>}`
                                    ? M
                                    :'';

type PercentageParser<A extends string> = [GetPrefix<A>, GetNumber<A>, GetSuffix<A>];


import type { Equal, Expect } from '@type-challenges/utils'

type Case0 = ['', '', '']
type Case1 = ['+', '', '']
type Case2 = ['+', '1', '']
type Case3 = ['+', '100', '']
type Case4 = ['+', '100', '%']
type Case5 = ['', '100', '%']
type Case6 = ['-', '100', '%']
type Case7 = ['-', '100', '']
type Case8 = ['-', '1', '']
type Case9 = ['', '', '%']
type Case10 = ['', '1', '']
type Case11 = ['', '100', '']

type PercentageParser1 = PercentageParser<''>;
type PercentageParser2 = PercentageParser<'+'>;
type PercentageParser3 = PercentageParser<'+1'>;
type PercentageParser4 = PercentageParser<'+100'>;
type PercentageParser5 = PercentageParser<'+100%'>;
type PercentageParser6 = PercentageParser<'100%'>;
type PercentageParser7 = PercentageParser<'-100%'>;
type PercentageParser8 = PercentageParser<'-100'>;
type PercentageParser9 = PercentageParser<'-1'>;
type PercentageParser10 = PercentageParser<'%'>;
type PercentageParser11 = PercentageParser<'1'>;
type PercentageParser12 = PercentageParser<'100'>; 

type cases = [
  Expect<Equal<PercentageParser<''>, Case0>>,
  Expect<Equal<PercentageParser<'+'>, Case1>>,
  Expect<Equal<PercentageParser<'+1'>, Case2>>,
  Expect<Equal<PercentageParser<'+100'>, Case3>>,
  Expect<Equal<PercentageParser<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser<'100%'>, Case5>>,
  Expect<Equal<PercentageParser<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser<'-100'>, Case7>>,
  Expect<Equal<PercentageParser<'-1'>, Case8>>,
  Expect<Equal<PercentageParser<'%'>, Case9>>,
  Expect<Equal<PercentageParser<'1'>, Case10>>,
  Expect<Equal<PercentageParser<'100'>, Case11>>,
]
