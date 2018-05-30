https://github.com/acdlite/react-fiber-architecture

https://github.com/koba04/react-fiber-resources

https://github.com/koba04/react-fiber-resources/blob/master/toy-renderers/ReactConsole.js

https://github.com/michalochman/react-pixi-fiber

http://makersden.io/blog/look-inside-fiber/#side-effect-tags-types-of-side-effects   A look inside React Fiber

https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D mdn


https://konvajs.github.io/api/   Konva 文档

createChild

### Fiber data structure

```javascript
type Fiber = {
  // 这些字段在概念上属于组件的一个实例。

  // Tag标识fiber的类型
  /**
   * HostComponent
   * REACT_FRAGMENT_TYPE
   * REACT_ASYNC_MODE_TYPE
   * REACT_STRICT_MODE_TYPE
   * REACT_PROFILER_TYPE
   * REACT_TIMEOUT_TYPE
   * REACT_PROVIDER_TYPE
   * REACT_CONTEXT_TYPE
   * REACT_FORWARD_REF_TYPE
   */
  tag: TypeOfWork, // jsx type

  // child的唯一标识
  key: null | string,

  // function/class/module fiber关联的类型
  type: any,

  // 用于记录Fiber对应真实dom节点，或当前虚拟组件实例。为了实现Ref和dom跟踪
  stateNode: any,

  // 剩余的字段属于Fiber

  // Fiber完成处理后返回这个
  // 这实际上是parentFiber,但它可以有多个parents(两个)
  // 它在概念上与堆栈帧的返回地址相同
  return: Fiber | null,

  // 单链表树结构
  child: Fiber | null,
  sibling: Fiber | null,
  index: number,

  // 最后用来连接这个节点的ref
  // 我将避免为prod和model添加一个owner字段作为函数
  ref: null | (((handle: mixed) => void) & {_stringRef: ?string}),

  // 输入的数据是fiber即将要处理的数据，Arguments Props
  pendingProps: any, // 一旦我们重载标签，这种类型将更具体.
  memoizedProps: any, // 用于创建输出的Props

  // 状态更新和回调队列
  updateQueue: UpdateQueue | null,

  // 用于创建输出的state
  memoizedState: any,

  // 用来描述fiber和其subtree的 bit field 比如：
  // AsyncUpdates flag 表示subtree是否是默认的异步
  // 当一个fiber被创建，它继承其父项的internalContextTag。其他标志可以在创建时设置
  // parent. Additional flags can be set at creation time, but after than the
  // 但之后的value应该保持整个fiber的使用寿命，特别是在它的fibers child被创造之前。
  internalContextTag: TypeOfInternalContext,

  /**
   * NoEffect: 0, //           0b0000000
   * Placement: 1, //          0b0000001
   * Update: 2, //             0b0000010
   * PlacementAndUpdate: 3, // 0b0000011
   * Deletion: 4, //           0b0000100
   * ContentReset: 8, //       0b0001000
   * Callback: 16, //          0b0010000
   * Err: 32, //               0b0100000
   * Ref: 64, //               0b1000000
   * 这样定义方便使用二进制操作
   * effectTag |= Placement添加一个新标签，effectTag ＆= 〜Placement删除一个标签
   */
  effectTag: TypeOfSideEffect,

  // 单向链接列表fast path到具有side-effects的下一个fiber
  nextEffect: Fiber | null,

  // 在这个subtree内的第一个也和后一个带有side-effect
  // 允许我们重用部分链表列表，当我们重复使用这种fiber完成的工作时。
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,

  // 这将用于快速确定subtree是否没有等待的更改。
  pendingWorkPriority: PriorityLevel,

  // 该值表示上次用于处理此组件的优先级，这表明继续进行工作还是继续现状更好
  progressedPriority: PriorityLevel,

  // 如果工作在已经有一些工作开始的fiber上以较低的优先级开始工作，
  // 那么我们需要将进展的工作存储在某个地方，这会保留已启动的子集(child set)，直到我们需要重新开始工作
  // 它可能会也可能不会和"current"相同
  progressedChild: Fiber | null,

  // 当我们将children reconcile到progressedChild时，我们可能需要删除一些child fibers.
  // 我们需要跟踪这些side-effects，如果我们稍后继续，我们需要包含这些effects。
  // 从同级指针的相反顺序添加删除
  progressedFirstDeletion: Fiber | null,
  progressedLastDeletion: Fiber | null,

  // 这是Fiber的合并版本，每一个被更新最终将有一对fiber。
  // 有些情况下，如果我们需要的话，我们可以清理这对fiber以节省内存。
  // ReactDOM.render和setState之后，会生成一颗树叫做：work-in-progress tree，
  // 这一颗树就是我们所谓的新树用来与我们的旧树进行对比，
  // 新的树和旧的树的 Fiber 是完全不一样的，此时，我们就需要 alternate 属性去链接新树和旧树
  alternate: Fiber | null,
};
```

### Reconciler实例对象方法

* batchedUpdates    批量更新
* computeUniqueAsyncExpiration    计算唯一异步到期时间
* createContainer   创建容器fiber
* deferredUpdates   延期更新 ?
* findHostInstance  查找Host实例 ?
* findHostInstanceWithNoPortals   查找Host实例没有Portals ?
* flushControlled   刷新Controlled ?
* flushInteractiveUpdates   刷新内部更新 ？
* flushRoot   刷新Root
* flushSync   刷新同步
* getPublicRootInstance   获取公开的Root实例
* injectIntoDevTools    注入调试
* interactiveUpdates    交互更新
* requestWork   请求工作 ？ 
* syncUpdates   同步更新
* updateContainer   更新容器fiber，一般和createContainer一起调用
* updateContainerAtExpirationTime   在过期时间更新容器
