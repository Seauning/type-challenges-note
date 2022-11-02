/*
  3326 - BEM style string
  
  ### Question
  
  The Block, Element, Modifier methodology (BEM) is a popular naming convention for classes in CSS. 
  
  For example, the block component would be represented as `btn`, 
  element that depends upon the block would be represented as `btn__price`,
  modifier that changes the style of the block would be represented 
  as `btn--big` or `btn__price--warning`.
  
  Implement `BEM<B, E, M>` which generate string union from these three parameters.
   Where `B` is a string literal, `E` and `M` are string arrays (can be empty).
  
*/

// 拿到 E 的联合
// 通过索引签名拿到数组中的所有元素
type GetE<E extends string[]> = E extends []
                                  ? ''
                                  : `__${E[number]}`

type GetE1 =GetE <['small', 'medium', 'large']>;

// 拿到 M 的联合
// 通过索引签名拿到数组中的所有元素                      
type GetM<M extends string[]> = M extends []
                                  ? ''
                                  : `--${M[number]}`

type GetM1 =GetM<['small', 'medium', 'large']>;

// 运用模板字符串用在联合上时的性质
type BEM<B extends string,
         E extends string[],
         M extends string[]> = `${B}${GetE<E>}${GetM<M>}`

import type { Equal, Expect } from '@type-challenges/utils'

type BEM1 = BEM<'btn', ['price'], []>;
type BEM2 = BEM<'btn', ['price'], ['warning', 'success']>;
type BEM3 = BEM<'btn', [], ['small', 'medium', 'large']>;

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]
