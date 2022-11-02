/*
  527 - Append to object

  ### 题目
  
  实现一个为接口添加一个新字段的类型。
  该类型接收三个参数，返回带有新字段的接口类型。
  
  例如:
  
  ```ts
  type Test = { id: '1' }
  type Result = AppendToObject<Test, 'value', 4> 
  // expected to be { id: '1', value: 4 }
  ```
*/

// 注意，如果 U 没有 extends string ，ts 不能预先知道它传入的类型
// 此时的 U 并不能代表传进来的字符串，而是作为一个泛型变量
// 并且直接使用 U : V 的话，U 会被当做字符串而不是泛型变量的值
// 所以需要 U extends string ，这样 ts 就能知道它是字符串字面量类型

// 这里使用交叉类型其实不大正确，但是 Equal 的检测机制检测不到 T 里的属性
// 1. 需要使用一个 Merge 函数来合并两对象上的键
type Merge<T>= {
  [key in keyof T]: T[key]  // 这里不能使用条件类型来判断 key 属于谁
}

type AppendToObjectIntersection<T, U extends string, V> = Merge<{
  [key in U] : V;
} & T>

// 1 虽然能解决这个问题，但是存在一些边缘情况，
// https://github.com/type-challenges/type-challenges/issues/9115
// 比如：
type TestAppendToObject = { id: '1' }
type ResultAppendToObject = AppendToObjectIntersection<TestAppendToObject, 'id', '2'>;
// 这是因为 '1' 和 '2' 是没有交集的，因此 id: never ，所以使用交集类型并不是很对

// 2.可以通过联合类型来
type AppendToObjectUnion<T, U extends string, V> = {
  [key in keyof T | U] : key extends keyof T ? T[key] : V;
}

import type { Equal, Expect } from '@type-challenges/utils'

type test1 = {
  key: 'cat'
  value: 'green'
}

type testExpect1 = {
  key: 'cat'
  value: 'green'
  home: boolean
}

type test2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
}

type testExpect2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
}

type test3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
}

type testExpect3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
  isMotherRussia: false | undefined
}

type AppendToObjectIntersection1 = AppendToObjectIntersection<test1, 'home', boolean>;
type AppendToObjectIntersection2 = AppendToObjectIntersection<test2, 'home', 1>;
type AppendToObjectIntersection3 = AppendToObjectIntersection<test3, 'isMotherRussia', false | undefined>;

type AppendToObjectUnion1 = AppendToObjectUnion<test1, 'home', boolean>;
type AppendToObjectUnion2 = AppendToObjectUnion<test2, 'home', 1>;
type AppendToObjectUnion3 = AppendToObjectUnion<test3, 'isMotherRussia', false | undefined>;

type cases = [
  Expect<Equal<AppendToObjectIntersection<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObjectIntersection<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObjectIntersection<test3, 'isMotherRussia', false | undefined>, testExpect3>>,

  Expect<Equal<AppendToObjectUnion<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObjectUnion<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObjectUnion<test3, 'isMotherRussia', false | undefined>, testExpect3>>,
]
