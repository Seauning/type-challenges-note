/*
  6 - 简单的 Vue 类型
  
  ### 题目
  
  实现类似Vue的类型支持的简化版本。
  
  通过提供一个函数`SimpleVue`（类似于`Vue.extend`或`defineComponent`），它应该正确地推断出 computed 和 methods 内部的`this`类型。
  
  在此挑战中，我们假设`SimpleVue`接受只带有`data`，`computed`和`methods`字段的Object作为其唯一的参数，
  
  -`data`是一个简单的函数，它返回一个提供上下文`this`的对象，但是你无法在`data`中获取其他的计算属性或方法。
  
  -`computed`是将`this`作为上下文的函数的对象，进行一些计算并返回结果。在上下文中应暴露计算出的值而不是函数。
  
  -`methods`是函数的对象，其上下文也为`this`。函数中可以访问`data`，
  `computed`以及其他`methods`中的暴露的字段。 `computed`与`methods`的不同之处在于`methods`在上下文中按原样暴露为函数。
  
  `SimpleVue`的返回值类型可以是任意的。
  
  ```ts
  const instance = SimpleVue({
    data() {
      return {
        firstname: 'Type',
        lastname: 'Challenges',
        amount: 10,
      }
    },
    computed: {
      fullname() {
        return this.firstname + ' ' + this.lastname
      }
    },
    methods: {
      hi() {
        alert(this.fullname.toLowerCase())
      }
    }
  })
  ```
  
  > 在 Github 上查看：https://tsch.js.org/6/zh-CN
*/

// 不是很懂。。太难了
// 这里主要是推断出计算属性的类型，并推断出其返回值类型
type Computed<T> = {
  [P in keyof T]: T[P] extends (args: any) => infer V ? V : never
}

type Options<D, C, M> = {
  data: (this: object) => D,
  // ThisType 简单来说就是合并 this 
  // 这里则是拿到 D & Computed<C> & M 的返回值
  // 接着拿到方法中的 this 的类型
  computed: ThisType<D & Computed<C> & M> & C
  methods: ThisType<D & Computed<C> & M> & M
}

declare function SimpleVue<D, C, M>(options: Options<D, C, M>): any


import type { Equal, Expect } from '@type-challenges/utils'

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})




