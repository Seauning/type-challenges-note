/*
  3376 - InorderTraversal
  
  ### Question
  
  Implement the type version of binary tree inorder traversal.
  
  For example:
  
  ```typescript
  const tree1 = {
    val: 1,
    left: null,
    right: {
      val: 2,
      left: {
        val: 3,
        left: null,
        right: null,
      },
      right: null,
    },
  } as const
  
  type A = InorderTraversal<typeof tree1> // [1, 3, 2]
  ```
*/


interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

/*
type InorderTraversalByDistribute<T extends TreeNode | null> = 
    T extends TreeNode
      ? [...InorderTraversalByDistribute<T['left']>, T['val'], ...InorderTraversalByDistribute<T['right']>]
      : []
*/

// 统一处理 null 的情况
type InorderTraversalNoDistribute<T extends TreeNode | null> = 
    [T] extends [TreeNode]
      ? [...InorderTraversalNoDistribute<T['left']>, T['val'], ...InorderTraversalNoDistribute<T['right']>]
      : []

// 分别处理 null 的情况
type InorderTraversalRecursion<T extends TreeNode> = 
      T extends TreeNode
        ? T['left'] extends TreeNode
          ? T['right'] extends TreeNode
            ? [...InorderTraversalRecursion<T['left']>, T['val'], ...InorderTraversalRecursion<T['right']>]
            : [...InorderTraversalRecursion<T['left']>, T['val']]
          : T['right'] extends TreeNode
              ? [T['val'], ...InorderTraversalRecursion<T['right']>]
              : [T['val']]
        : []

type InorderTraversalExcludeNull<T extends TreeNode | null> = T extends TreeNode
                                                      ? InorderTraversalRecursion<T>
                                                      : []
// 栈解法：https://github.com/type-challenges/type-challenges/issues/5820

import type { Equal, Expect } from '@type-challenges/utils'

const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

const tree2 = {
  val: 1,
  left: null,
  right: null,
} as const

const tree3 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
} as const

const tree4 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null,
  },
} as const

type InorderTraversalExcludeNull1 = InorderTraversalExcludeNull<null>;
type InorderTraversalExcludeNull2 = InorderTraversalExcludeNull<typeof tree1>;
type InorderTraversalExcludeNull3 = InorderTraversalExcludeNull<typeof tree2>;
type InorderTraversalExcludeNull4 = InorderTraversalExcludeNull<typeof tree3>;
type InorderTraversalExcludeNull5 = InorderTraversalExcludeNull<typeof tree4>;

type InorderTraversalNoDistribute1 = InorderTraversalNoDistribute<null>;
type InorderTraversalNoDistribute2 = InorderTraversalNoDistribute<typeof tree1>;
type InorderTraversalNoDistribute3 = InorderTraversalNoDistribute<typeof tree2>;
type InorderTraversalNoDistribute4 = InorderTraversalNoDistribute<typeof tree3>;
type InorderTraversalNoDistribute5 = InorderTraversalNoDistribute<typeof tree4>;

type cases = [
  Expect<Equal<InorderTraversalExcludeNull<null>, []>>,
  Expect<Equal<InorderTraversalExcludeNull<typeof tree1>, [1, 3, 2]>>,
  Expect<Equal<InorderTraversalExcludeNull<typeof tree2>, [1]>>,
  Expect<Equal<InorderTraversalExcludeNull<typeof tree3>, [2, 1]>>,
  Expect<Equal<InorderTraversalExcludeNull<typeof tree4>, [1, 2]>>,

  Expect<Equal<InorderTraversalNoDistribute<null>, []>>,
  Expect<Equal<InorderTraversalNoDistribute<typeof tree1>, [1, 3, 2]>>,
  Expect<Equal<InorderTraversalNoDistribute<typeof tree2>, [1]>>,
  Expect<Equal<InorderTraversalNoDistribute<typeof tree3>, [2, 1]>>,
  Expect<Equal<InorderTraversalNoDistribute<typeof tree4>, [1, 2]>>,
]