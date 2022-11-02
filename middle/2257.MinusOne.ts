/*
  2257 - MinusOne
  
  ### 题目
  
  给定一个正整数作为类型的参数，要求返回的类型是该数字减 1。
  
  例如:
  
  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```
*/

type Numbers = {
  '1' : '0',
  '2' : '1',
  '3' : '2',
  '4' : '3',
  '5' : '4',
  '6' : '5',
  '7' : '6',
  '8' : '7',
  '9' : '8',
  '0' : '9'
}

// 利用递归添加数组的长度，最后长度相同时，通过 [infer F, ...infer Rest] 拿到减一后的长度
// 不过当数值过大时，递归栈会过深，不能根本解决
type MinusOneByRecursion1<T extends number,
         Target extends number[] = []> = T extends Target['length'] // Target 数组的长度是否和 T 相同
                                            // 长度相同时，运用 [infer F, ...infer Rest] 格式
                                            ? Target extends [infer F, ...infer Rest] 
                                                    ? Rest['length']  // 拿到 去除一个元素后的长度
                                                    : 0               // 否则长度为 0 
                                            : MinusOneByRecursion1<T, [1, ...Target]>;  // 让长度增一位

                                            

// 下面这种也是利用了递归的思路，不过在原本递归的基础上对生成指定长度的数组进行了优化
// 1. 将原本的数字转为字符串，并且通过 `${infer F}${infer L}`  取到最高位的字符
// 2. 每次递归 L 的部分，并且将传入的数组 T 的长度 * 10，通过 10 个 ...T 实现
// 3. 用 另一个函数创建指定长度的数组，类似于 MinusOneByRecursion1 中的递归，不过由于传入的是字符串，需要将生成的数组长度 T['length'] 转为字符串即 `${T['length']}`

// 8 -> [any * 8]
type ProduceArrayBySingle<T extends string, Result extends any[] = []> = 
    `${Result['length']}` extends T
        ? Result
        : ProduceArrayBySingle<T, [...Result, any]>

// T * 10 + S
type ProduceArray<T extends any[], S extends any[]> = [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...S]

// 创建指定长度的数组
type ProduceLengthArray<T extends string, TmpArray extends any[] = []> = 
                  T extends `${infer First}${infer Rest}`
                            ? ProduceLengthArray<Rest, ProduceArray<TmpArray, ProduceArrayBySingle<First>>>
                            : TmpArray

// 得到 - 1 后的值
type MinusOneByRecursion2<T extends number> = 
                          ProduceLengthArray<`${T}`> extends [infer _, ...infer S] 
                                              ? S['length'] 
                                              : never;

// 字符串转数字
type StringToNumber<T extends string, TmpArray extends any[] = []> = 
        T extends `${infer First}${infer Rest}`
                  ? StringToNumber<Rest, ProduceArray<TmpArray, ProduceArrayBySingle<First>>>
                  : TmpArray['length']

type num8888 = StringToNumber<'8888'>

import type { Equal, Expect } from '@type-challenges/utils'

type MinusOneByRecursion11 = MinusOneByRecursion1<1>;
type MinusOneByRecursion12 = MinusOneByRecursion1<55>; 
type MinusOneByRecursion13 = MinusOneByRecursion1<3>;
type MinusOneByRecursion14 = MinusOneByRecursion1<100>;
// @ts-expect-error
type MinusOneByRecursion15 = MinusOneByRecursion1<1101>;

type MinusOneByRecursion21 = MinusOneByRecursion2<1>;
type MinusOneByRecursion22 = MinusOneByRecursion2<55>; 
type MinusOneByRecursion23 = MinusOneByRecursion2<3>;
type MinusOneByRecursion24 = MinusOneByRecursion2<100>;
type MinusOneByRecursion25 = MinusOneByRecursion2<1101>;
type MinusOneByRecursion26 = MinusOneByRecursion2<8888>;

type cases = [
  Expect<Equal<MinusOneByRecursion1<1>, 0>>,
  Expect<Equal<MinusOneByRecursion1<55>, 54>>,
  Expect<Equal<MinusOneByRecursion1<3>, 2>>,
  Expect<Equal<MinusOneByRecursion1<100>, 99>>,
  // @ts-expect-error
  Expect<Equal<MinusOneByRecursion1<1101>, 1100>>,

  Expect<Equal<MinusOneByRecursion2<1>, 0>>,
  Expect<Equal<MinusOneByRecursion2<55>, 54>>,
  Expect<Equal<MinusOneByRecursion2<3>, 2>>,
  Expect<Equal<MinusOneByRecursion2<100>, 99>>,
  Expect<Equal<MinusOneByRecursion2<1101>, 1100>>,
  Expect<Equal<MinusOneByRecursion2<8888>, 8887>>,
]


