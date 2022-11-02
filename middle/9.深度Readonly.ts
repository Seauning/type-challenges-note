/*
  9 - 深度 Readonly
  
  ### 题目
  
  实现一个通用的`DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。
  
  您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。
  但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。
  
  例如
  
  ```ts
  type X = { 
    x: { 
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }
  
  type Expected = { 
    readonly x: { 
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey' 
  }
  
  type Todo = DeepReadonly<X> // should be same as `Expected`
  ```
*/

// 1. 排除原始类型，对象类型则递归
// 函数不会被 readonly
type Primitive = number | string | boolean | Function;
type DeepReadonly1<T> = T extends Primitive ? T : {
  readonly [key in keyof T] : DeepReadonly1<T[key]>
}

// 2. 函数会被 readonly
type functionIsObject = () => void extends { [key: string | number]: any } ? true : false;
type DeepReadonly2<T> = {
	readonly [K in keyof T]: T[K] extends { [key: string | number]: any }
                            ? DeepReadonly2<T[K]>
                            : T[K]
}

// 3. 产生的效果与 1 相同 ，但返回值的形式不大一致
type DeepReadonly3<T> = {
   readonly [K in keyof T]: T[K] extends Primitive 
                            ? T[K] : DeepReadonly2<T[K]> 
}

import type { Equal, Expect } from '@type-challenges/utils'

type DeepReadonly11 = DeepReadonly1<X>;
type DeepReadonly21 = DeepReadonly2<X>;
type DeepReadonly31 = DeepReadonly3<X>;

type cases = [
  Expect<Equal<DeepReadonly1<X>, Expected>>,
  Expect<Equal<DeepReadonly2<X>, Expected2>>,
  Expect<Equal<DeepReadonly3<X>, Expected>>,
] 

type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type Expected = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Expected2 = {
  readonly a: Readonly<() => 22>
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}