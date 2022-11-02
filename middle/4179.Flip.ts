/*
  4179 - Flip
  
  ### Question
  
  Implement the type of `just-flip-object`. Examples:
  
  ```typescript
  Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
  Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
  flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}
  ```
  不需要支持 嵌套对象 和不能作为 对象键 的值，例如数组
  No need to support nested objects and values 
  which cannot be object keys such as arrays
  
*/


// 用 Record<string, any> 限制一下对象就好了，也可以 {[key:string]:any} 索引签名来限制
// 这是为了防止因为键的类型而导致出错，实际上我们都知道 js 中的 object key 只能是字符串
// 用 as 重映射来拿到值 因为我们不能 T[key] in keyof T
type Flip<T extends Record<string, any>> = {
  [key in keyof T as `${T[key]}`]  : key
}

import type { Equal, Expect, NotEqual } from '@type-challenges/utils'

type Flip1 = Flip<{ pi: 'a' }>
type Flip2 = Flip<{ pi: 'a' }>
type Flip3 = Flip<{ pi: 3.14; bool: true }>
type Flip4 = Flip<{ prop: 'val'; prop2: 'val2' }>

type cases = [
  Expect<Equal<{ a: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<NotEqual<{ b: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<Equal<{ 3.14: 'pi'; true: 'bool' }, Flip<{ pi: 3.14; bool: true }>>>,
  Expect<Equal<{ val2: 'prop2'; val: 'prop' }, Flip<{ prop: 'val'; prop2: 'val2' }>>>,
]

