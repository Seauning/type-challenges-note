/*
  529 - Absolute
  
  ### 题目
  
  实现一个接收string,number或bigInt类型参数的`Absolute`类型,返回一个正数字符串。
  
  例如
  
  ```ts
  type Test = -100;
  type Result = Absolute<Test>; // expected to be "100"
  ```
*/

// 统一转为字符串，然后去除 _ 
type Remove_<T> = T extends `${infer First}${infer Rest}`
                    ? First extends '_'
                            ? Remove_<Rest>
                            : `${First}${Remove_<Rest>}`
                    : T;

type Absolute_1<T extends number | string | bigint> = `${T}` extends `${infer First}${infer Rest}`
                                                      ? First extends '-'
                                                              ? Remove_<Rest>
                                                              : Remove_<`${T}`>
                                                      : `${T}`;


// emmm ，`${T}` 的转换貌似会将数值变为一个普通的字符串
// -1_000_000n 也是 ES2020 的千分位写法，本质还是一个 number 

type numberToString<N extends number | bigint> = `${N}`;
type n1 = numberToString<-1_000_000>;
type n2 = numberToString<-1_000_000n>;
type n3 = numberToString<10001>;

// 结合上面的性质，可以去除 Remove_
type Absolute_2<T extends number | string | bigint> = `${T}` extends `${infer First}${infer Rest}`
                                                      ? First extends '-'
                                                              ? Rest
                                                              : `${T}`
                                                      : `${T}`;

// 上面的写法还能将第二题条件类型简化为如下格式
type Absolute_3<T extends number | string | bigint> = `${T}` extends `-${infer Rest}` ? Rest : `${T}`;


import type { Equal, Expect } from '@type-challenges/utils'

type Absolute_11 = Absolute_1<0>;
type Absolute_12 = Absolute_1<-0>;
type Absolute_13 = Absolute_1<10>;
type Absolute_14 = Absolute_1<-5>;
type Absolute_15 = Absolute_1<'0'>;
type Absolute_16 = Absolute_1<'-0'>; 
type Absolute_17 = Absolute_1<'10'>; 
type Absolute_18 = Absolute_1<'-5'>;
type Absolute_19 = Absolute_1<-1_000_000n>;
type Absolute_110 = Absolute_1<9_999n>;

type cases = [
  Expect<Equal<Absolute_1<0>, '0'>>,
  Expect<Equal<Absolute_1<-0>, '0'>>,
  Expect<Equal<Absolute_1<10>, '10'>>,
  Expect<Equal<Absolute_1<-5>, '5'>>,
  Expect<Equal<Absolute_1<'0'>, '0'>>,
  Expect<Equal<Absolute_1<'-0'>, '0'>>,
  Expect<Equal<Absolute_1<'10'>, '10'>>,
  Expect<Equal<Absolute_1<'-5'>, '5'>>,
  Expect<Equal<Absolute_1<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute_1<9_999n>, '9999'>>,

  Expect<Equal<Absolute_3<0>, '0'>>,
  Expect<Equal<Absolute_3<-0>, '0'>>,
  Expect<Equal<Absolute_3<10>, '10'>>,
  Expect<Equal<Absolute_3<-5>, '5'>>,
  Expect<Equal<Absolute_3<'0'>, '0'>>,
  Expect<Equal<Absolute_3<'-0'>, '0'>>,
  Expect<Equal<Absolute_3<'10'>, '10'>>,
  Expect<Equal<Absolute_3<'-5'>, '5'>>,
  Expect<Equal<Absolute_3<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute_3<9_999n>, '9999'>>,
]
