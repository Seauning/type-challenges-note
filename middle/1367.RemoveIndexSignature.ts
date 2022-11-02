/*
  1367 - Remove Index Signature
  
  ### Question
  
  Implement `RemoveIndexSignature<T>` ,
  exclude the index signature from object types.
  
  For example:
  
  ```
  
  type Foo = {
    [key: string]: any;
    foo(): void;
  }
  
  type A = RemoveIndexSignature<Foo>  // expected { foo(): void }
  
  ```
*/

// 本题考查了，mapped type 中的一个重映射 as，通过重映射来排除键（返回never，即可排除）
type RemoveIndexSignature<T> = {
  [key in keyof T as string extends key 
  // 下面这个写法和上面是不同的
  // 对象中任何键都是 string 类型 ，所以下面永远返回 never
  // 而 string extends key 只是排除了 key值 为 string 的情况
  // [key in keyof T as key extends string  
                            ? never
                            : number extends key
                                    ? never
                                    : symbol extends key
                                            ? never
                                            : key] : T[key]
};

type RemoveIndexSignatureByTemplateLiteral<T> = {
  // 如果是索引签名，string extends 'string' 这为 false
  // 如果是普通的属性，foo extends 'foo' 这为 true
  // 对象的属性本身就是字符串，所以，等价于 'foo' extends 'foo'
  [key in keyof T as key extends `${infer keyString}` ? keyString : never] : T[key]
};

import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  [key: string]: any
  foo: () => void
}

type Bar = {
  [key: number]: any
  bar(): void // ts 中函数的简写形式，: 右边是函数返回值
}

type FooBar = {
  [key: symbol]: any
  foobar(): void
}

type Baz = {
  bar(): void
  baz: string
}

type RemoveIndexSignature1 = RemoveIndexSignature<Foo>;
type RemoveIndexSignature2 = RemoveIndexSignature<Bar>;
type RemoveIndexSignature3 = RemoveIndexSignature<FooBar>;
type RemoveIndexSignature4 = RemoveIndexSignature<Baz>;

type RemoveIndexSignatureByTemplateLiteral1 = RemoveIndexSignatureByTemplateLiteral<Foo>;
type RemoveIndexSignatureByTemplateLiteral2 = RemoveIndexSignatureByTemplateLiteral<Bar>;
type RemoveIndexSignatureByTemplateLiteral3 = RemoveIndexSignatureByTemplateLiteral<FooBar>;
type RemoveIndexSignatureByTemplateLiteral4 = RemoveIndexSignatureByTemplateLiteral<Baz>;

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { foobar(): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,

  Expect<Equal<RemoveIndexSignatureByTemplateLiteral<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignatureByTemplateLiteral<Bar>, { bar(): void }>>,
  Expect<Equal<RemoveIndexSignatureByTemplateLiteral<FooBar>, { foobar(): void }>>,
  Expect<Equal<RemoveIndexSignatureByTemplateLiteral<Baz>, { bar(): void; baz: string }>>,
]

