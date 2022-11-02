/*
  18 - 获取元组长度
  
  ### 题目
  
  创建一个通用的`Length`，接受一个`readonly`的数组，返回这个数组的长度。
  
  例如：
  
  ```ts
  type tesla = ['tesla', 'model 3', 'model X', 'model Y']
  type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
  
  type teslaLength = Length<tesla> // expected 4
  type spaceXLength = Length<spaceX> // expected 5
  ```
*/

// 用 readonly 限制 T 为一个只读的元组类型，访问元组的 length 属性
type Length<T extends readonly any[]> = T['length'];

const arr = ['aaa','bbb'] as const;
// 元组类型，每个位置上的值必须一一对应
const arrCopy : typeof arr = ['aaa', 'bbb'] as const;
type arrType = typeof arr;

type Length1 = Length<arrType>;

const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const
type Length2 = Length<typeof spaceX>;

// @ts-expect-error
type Length3 = Length<5>;
// @ts-expect-error
type Length4 = Length<'hello world'>;