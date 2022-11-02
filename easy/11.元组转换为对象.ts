/*
  11 - 元组转换为对象
  
  ### 题目
  
  传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。
  
  例如：
  
  ```ts
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
  
  type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  ```
*/

type TupleToObject<T extends readonly any[]> = {
  // 通过 number 索引签名拿到值，这个值是一个联合类型
  [value in T[number]]: value
}

const tuple = ['aaa', 'bbb', 'ccc 3'] as const; // 添加了 as const 后就变为了一个只读的元组

type tupleType = typeof tuple;    // 拿到只读的元组的值类型数组
type menbers = tupleType[number]; // 通过 number 索引签名，访问到所有的值，这是一个联合类型

type TupleToObject1 = TupleToObject<tupleType>;