---
title: Leetcode 232.用栈实现队列
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-26 20:00:00
copyright: false
description: Leetcode 232.用栈实现队列
cover: ../image/Java/算法Leetcode/Day13_Leetcode232.用栈实现队列/1.JPG
---



# Leetcode 232.用栈实现队列
## 题目要求
* 请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：

* 实现 MyQueue 类：
  * void push(int x) 将元素 x 推到队列的末尾
  * int pop() 从队列的开头移除并返回元素
  * int peek() 返回队列开头的元素
  * boolean empty() 如果队列为空，返回 true ；否则，返回 false
* 说明：
  * 你只能使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
  * 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。

**示例 1：**
输入：
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 1, 1, false]

解释：
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false

## 提交
### 两个栈实现队列
一个作为入栈stackIn，一个作为出栈stackOut
当往队列中添加元素时，直接往satckIn中添加元素
当队列弹出元素时，由于stackIn是单向的，所以我们需要将stackIn中的元素全部转移到stackOut中才能按正确顺序从队列中弹出元素

![](/image/Java/算法Leetcode/Day13_Leetcode232.用栈实现队列/232.用栈实现队列版本2.gif)

```java
class MyQueue {

    Stack<Integer> stackIn;
    Stack<Integer> stackOut;

    public MyQueue() {
        stackIn = new Stack<>();
        stackOut = new Stack<>();
    }

    public void push(int x) {
        stackIn.push(x);
    }

    public int pop() {
        dumpstackIn();
        return stackOut.pop();
    }

    public int peek() {
        dumpstackIn();
        return stackOut.peek();
    }

    public boolean empty() {
        return stackIn.isEmpty() && stackOut.isEmpty();
    }

    //将In里面的元素全部转移到Out中
    private void dumpstackIn(){
        if (!stackOut.isEmpty()) return;
        while (!stackIn.isEmpty()){
            stackOut.push(stackIn.pop());
        }
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue obj = new MyQueue();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.peek();
 * boolean param_4 = obj.empty();
 */
```

