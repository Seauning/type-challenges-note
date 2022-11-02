/*
  5317 - LastIndexOf
  
  ### Question
  
  Implement the type version of ```Array.lastIndexOf```, ```LastIndexOf<T, U>```  takes an Array ```T```, any ```U``` and returns the index of the last ```U``` in Array ```T```
  
  For example:
  
  ```typescript
  type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
  type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
  ```
  
  > View on GitHub: https://tsch.js.org/5317
*/

import type { Equal, Expect } from '@type-challenges/utils'

type MockArray<T extends string | number, Res extends any[] = []>
  = `${Res['length']}` extends `${T}`
      ? Res
      : MockArray<T, [any, ...Res]>

type SubN<T extends number, N extends number>
  = [...MockArray<T>] extends [...MockArray<`${N}`>, ...infer R]
      ? R['length']
      : never


// 1. 翻转后 IndexOf ，再用总长度减去 IndexOf 的下标(比较麻烦，就不写了)

// 2. 用减法倒序查找
// Cur 直接用 number 表示也可以，只是每次递归都得重新生成指定长度的元组
// 用数组表示的话就不用每次都重新生成
type LastIndexOf<T extends any[], U, Cur extends number = SubN<T['length'], 1>>
  = Equal<T[Cur], U> extends true
    ? Cur
    : Cur extends 0
      ? -1
      : LastIndexOf<T, U, SubN<Cur, 1>>


// 3. [...infer F, infer R] 倒序递归，这样就无须用数组模拟下标
type LastIndexOfByReverseRecursion<T extends any[], U>
  = T extends [...infer F, infer R]
      ? Equal<R, U> extends true
        ? F['length']
        : LastIndexOfByReverseRecursion<F, U>
      : -1 // 由递归到最后一层来决定是否退出，无需再多一次 Cur extends 0 的判断


type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,

  Expect<Equal<LastIndexOfByReverseRecursion<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOfByReverseRecursion<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOfByReverseRecursion<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOfByReverseRecursion<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOfByReverseRecursion<[string, any, 1, number, 'a', any, 1], any>, 5>>,
]

