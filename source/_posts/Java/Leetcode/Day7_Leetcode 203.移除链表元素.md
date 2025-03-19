---
title: Leetcode 203.移除链表元素
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-19 19:00:00
copyright: false
description: Leetcode 203.移除链表元素
cover: ../image/Java/算法Leetcode/Day7_Leetcode203.移除链表元素/1.JPG
---



# Leetcode 203.移除链表元素
## 题目要求
* 给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。

 
**示例 1：**
![](/image/Java/算法Leetcode/Day7_Leetcode203.移除链表元素/list.jpg)
输入：head = [1,2,6,3,4,5,6], val = 6
输出：[1,2,3,4,5]
**示例 2：**
输入：head = [], val = 1
输出：[]
**示例 3：**
输入：head = [7,7,7,7], val = 7
输出：[]


## 提交
```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeElements(ListNode head, int val) {
        while(head != null&&head.val == val){
            head = head.next;
        }
        if (head == null) {
            return head;
        }
        ListNode pre = head;
        ListNode cur = head.next;        
        while(cur!=null){
            if(cur.val == val){
                pre.next = cur.next;
            }else{
                pre = cur;
            }
            cur = pre.next;
        }
        return head;
    }
}
```

## 官方答案
### 方法一：递归
**思路及算法：**
链表的定义具有递归的性质，因此链表题目常可以用递归的方法求解。这道题要求删除链表中所有节点值等于特定值的节点，可以用递归实现。

对于给定的链表，首先对除了头节点 head 以外的节点进行删除操作，然后判断 head 的节点值是否等于给定的 val。如果 head 的节点值等于 val，则 head 需要被删除，因此删除操作后的头节点为 head.next；如果 head 的节点值不等于 val，则 head 保留，因此删除操作后的头节点还是 head。上述过程是一个递归的过程。

递归的终止条件是 head 为空，此时直接返回 head。当 head 不为空时，递归地进行删除操作，然后判断 head 的节点值是否等于 val 并决定是否要删除 head。

**复杂度分析：**
* 时间复杂度：O(n)，其中 n 是链表的长度。递归过程中需要遍历链表一次。
* 空间复杂度：O(n)，其中 n 是链表的长度。空间复杂度主要取决于递归调用栈，最多不会超过 n 层。
```java
class Solution {
    public ListNode removeElements(ListNode head, int val) {
        if (head == null) {
            return head;
        }
        head.next = removeElements(head.next, val);
        return head.val == val ? head.next : head;
    }
}
```

### 方法二：迭代
**思路及算法：**
也可以用迭代的方法删除链表中所有节点值等于特定值的节点。

用 temp 表示当前节点。如果 temp 的下一个节点不为空且下一个节点的节点值等于给定的 val，则需要删除下一个节点。删除下一个节点可以通过以下做法实现：

temp.next=temp.next.next
如果 temp 的下一个节点的节点值不等于给定的 val，则保留下一个节点，将 temp 移动到下一个节点即可。

当 temp 的下一个节点为空时，链表遍历结束，此时所有节点值等于 val 的节点都被删除。

具体实现方面，由于链表的头节点 head 有可能需要被删除，因此创建哑节点 dummyHead，令 dummyHead.next=head，初始化 temp=dummyHead，然后遍历链表进行删除操作。最终返回 dummyHead.next 即为删除操作后的头节点。

**复杂度分析：**
* 时间复杂度：O(n)，其中 n 是链表的长度。需要遍历链表一次。
* 空间复杂度：O(1)。

```java
class Solution {
    public ListNode removeElements(ListNode head, int val) {
        ListNode dummyHead = new ListNode(0);
        dummyHead.next = head;
        ListNode temp = dummyHead;
        while (temp.next != null) {
            if (temp.next.val == val) {
                temp.next = temp.next.next;
            } else {
                temp = temp.next;
            }
        }
        return dummyHead.next;
    }
}
```

### 方法三：代码随想录
方法1：直接在原来的链表上进行操作
```java
/**
 * 方法1
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 * @param head
 * @param val
 * @return
 */
public ListNode removeElements(ListNode head, int val) {
    while(head!=null && head.val==val) {
        head = head.next;
    }
    ListNode curr = head;
    while(curr!=null && curr.next !=null) {
        if(curr.next.val == val){
            curr.next = curr.next.next;
        } else {
            curr = curr.next;
        }
    }
    return head;
}

/**
 * 方法1
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 * @param head
 * @param val
 * @return
 */
public ListNode removeElements(ListNode head, int val) {
    while (head != null && head.val == val) {
        head = head.next;
    }
    // 已经为null，提前退出
    if (head == null) {
        return head;
    }
    // 已确定当前head.val != val
    ListNode pre = head;
    ListNode cur = head.next;
    while (cur != null) {
        if (cur.val == val) {
            pre.next = cur.next;
        } else {
            pre = cur;
        }
        cur = cur.next;
    }
    return head;
}
```
方法2：设置一个虚拟头结点
```java
/**
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 * @param head
 * @param val
 * @return
 */
public ListNode removeElements(ListNode head, int val) {
    // 设置一个虚拟的头结点
    ListNode dummy = new ListNode();
    dummy.next = head;

    ListNode cur = dummy;
    while (cur.next != null) {
        if (cur.next.val == val) {
            cur.next = cur.next.next;
        } else {
            cur = cur.next;        
        }
    }
    return dummy.next;
}
```