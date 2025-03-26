---
title: Leetcode 225.用队列实现栈
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-26 21:00:00
copyright: false
description: Leetcode 225.用队列实现栈
cover: ../image/Java/算法Leetcode/Day13_Leetcode225.用队列实现栈/1.JPG
---



# Leetcode 225.用队列实现栈
## 题目要求
* 请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（push、top、pop 和 empty）。

* 实现 MyStack 类：
  * void push(int x) 将元素 x 压入栈顶。
  * int pop() 移除并返回栈顶元素。
  * int top() 返回栈顶元素。
  * boolean empty() 如果栈是空的，返回 true ；否则，返回 false 。

* 注意：
  * 你只能使用队列的标准操作 —— 也就是 push to back、peek/pop from front、size 和 is empty 这些操作。
  * 你所使用的语言也许不支持队列。 你可以使用 list （列表）或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。

**示例 1：**
输入：
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 2, 2, false]

解释：
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // 返回 2
myStack.pop(); // 返回 2
myStack.empty(); // 返回 False

## 提交
### 两个队列实现栈
使用一个辅助队列，因为栈和队列中的元素添加顺序相同时，排列顺序刚好是相反的，所以我们只要保持新入队列的元素处于队列的第一个位置即可
实现方法就是我们将要入栈的元素放到空的辅助队列中，再将主队列中的元素放入辅助队列中，元素的顺序就可以满足出栈的顺序了，这时我们交换两个队列，让辅助队列称为主队列，主队列作为辅助队列即可
出栈操作就直接对主队列进行出队即可


```java
class MyStack {

    Queue<Integer> queue1; // 和栈中保持一样元素的队列
    Queue<Integer> queue2; // 辅助队列

    public MyStack() {
        queue1 = new LinkedList<>();
        queue2 = new LinkedList<>();
    }

    public void push(int x) {
        queue2.offer(x); // 先放在辅助队列中
        while (!queue1.isEmpty()){
            queue2.offer(queue1.poll());
        }
        Queue<Integer> queueTemp;
        queueTemp = queue1;
        queue1 = queue2;
        queue2 = queueTemp; // 最后交换queue1和queue2，将元素都放到queue1中
    }

    public int pop() {
        return queue1.poll(); // 因为queue1中的元素和栈中的保持一致，所以这个和下面两个的操作只看queue1即可
    }
    
    public int top() {
        return queue1.peek();
    }

    public boolean empty() {
        return queue1.isEmpty();
    }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * MyStack obj = new MyStack();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.top();
 * boolean param_4 = obj.empty();
 */
```

### 一个队列实现栈
使用一个队列实现栈只需要记录队列的大小即可
当出栈操作时，我们将要出栈元素前面的所有元素进行一遍出队列和入队列操作即可
此时队首元素即为要出栈的元素

```java
class MyStack {
    Queue<Integer> queue;
    
    public MyStack() {
        queue = new LinkedList<>();
    }
    
    public void push(int x) {
        queue.add(x);
    }
    
    public int pop() {
        rePosition();
        return queue.poll();
    }
    
    public int top() {
        rePosition();
        int result = queue.poll();
        queue.add(result);
        return result;
    }
    
    public boolean empty() {
        return queue.isEmpty();
    }

    public void rePosition(){
        int size = queue.size();
        size--;
        while(size-->0)
            queue.add(queue.poll());
    }
}
```
