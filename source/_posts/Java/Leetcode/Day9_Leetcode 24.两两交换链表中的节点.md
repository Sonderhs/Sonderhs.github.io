---
title: Leetcode 24.两两交换链表中的节点
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-21 19:00:00
copyright: false
description: Leetcode 24.两两交换链表中的节点
cover: ../image/Java/算法Leetcode/Day9_Leetcode24.两两交换链表中的节点/1.JPG
---



# Leetcode 24.两两交换链表中的节点
## 题目要求
* 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
 
**示例 1：**
![](/image/Java/算法Leetcode/Day9_Leetcode24.两两交换链表中的节点/swap_ex1.jpg)
输入：head = [1,2,3,4]
输出：[2,1,4,3]
**示例2：**
输入：head = []
输出：[]
**示例3：**
输入：head = [1]
输出：[1]


## 提交
### 双temp实现交换
之所以要设置虚拟头结点，一是为了方便操作链表，而是为了最后的返回值
如果不设置dumyhead，而是直接让cur.next = head，那么最后会无法返回链表的头

关键步骤如下图所示：
![步骤1](/image/Java/算法Leetcode/Day9_Leetcode24.两两交换链表中的节点/步骤1.jpg)
![步骤2](/image/Java/算法Leetcode/Day9_Leetcode24.两两交换链表中的节点/步骤2.jpg)
![步骤3](/image/Java/算法Leetcode/Day9_Leetcode24.两两交换链表中的节点/步骤3.jpg)
![步骤4](/image/Java/算法Leetcode/Day9_Leetcode24.两两交换链表中的节点/步骤4.jpg)

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
    public ListNode swapPairs(ListNode head) {
        //设置虚拟头结点是为了最后的返回值
        ListNode dumyhead = new ListNode(-1);
        dumyhead.next = head;
        //cur可以操作其后面两个结点的交换
        ListNode cur = dumyhead;
        ListNode temp1 = null;
        ListNode temp2 = null;
        while(cur.next != null && cur.next.next != null){
            temp1 = cur.next;
            temp2 = cur.next.next.next;  //步骤1
            cur.next = cur.next.next;  //步骤2
            cur.next.next = temp1;  //步骤3
            temp1.next = temp2;  //步骤4
            cur = cur.next.next;
        }
        return dumyhead.next;
    }
}
```

