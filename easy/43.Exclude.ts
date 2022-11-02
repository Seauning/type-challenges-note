/*
  43 - Exclude
  
  ### 题目
  
  实现内置的Exclude <T, U>类型，但不能直接使用它本身。
  >从联合类型T中排除U的类型成员，来构造一个新的类型。

*/


type a = 1 | '1'
type b = '1'

// 由 c 和 d 对比可以看出，当条件类型作用域泛型时，如果传入参数是联合类型
// 那么会发生类型分发，按照分配律传入
// 因此 T extends K 中的 T 只是单个类型
type c = a extends b ? never : a  // 1 | '1'

type MyExclude<T, U> = T extends U ? never : T;

type d = MyExclude<a, b>    // 1


type MyExclude1 = MyExclude<'a' | 'b' | 'c', 'a'>;
type MyExclude2 = MyExclude<'a' | 'b' | 'c', 'a' | 'b'>;
type MyExclude3 = MyExclude<string | number | (() => void), Function>;