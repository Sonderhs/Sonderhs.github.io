---
title: Leetcode 19.删除链表的倒数第N个结点
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-22 19:00:00
copyright: false
description: Leetcode 19.删除链表的倒数第N个结点
cover: ../image/Java/算法Leetcode/Day10_Leetcode19.删除链表的倒数第N个结点/1.JPG
---



# Leetcode 19.删除链表的倒数第N个结点
## 题目要求
* 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。


**示例 1：**
![](/image/Java/算法Leetcode/Day10_Leetcode19.删除链表的倒数第N个结点/remove_ex1.jpg)
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
**示例2：**
输入：head = [1], n = 1
输出：[]
**示例3：**
输入：head = [1,2], n = 1
输出：[1]


## 提交
### 双temp实现交换
设置快慢两个指针fast和slow，先让fast走n步，使得fast和slow相差n个结点，当fast走到最后一个结点时，slow指向的即是倒数第n个结点的前一个节点

如下图所示：
![](/image/Java/算法Leetcode/Day10_Leetcode19.删除链表的倒数第N个结点/步骤1.JPG)


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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dumyhead = new ListNode(0);
        dumyhead.next = head;

        ListNode fast = dumyhead;
        ListNode slow = dumyhead;

        //先让快指针走n次
        for(int i = 0; i < n; i++){
            fast = fast.next;
        }

        //快慢指针一起走
        while(fast.next != null){
            fast = fast.next;
            slow = slow.next;
        }

        //slow所在位置即为要删除结点的前一个结点
        slow.next = slow.next.next;

        return dumyhead.next;
    }
}
```

