---
title: Leetcode 206.反转链表
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-20 20:00:00
copyright: false
description: Leetcode 206.反转链表
cover: ../image/Java/算法Leetcode/Day8_Leetcode206.反转链表/1.JPG
---



# Leetcode 206.反转链表
## 题目要求
* 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

 
**示例 1：**
![](/image/Java/算法Leetcode/Day8_Leetcode206.反转链表/rev1ex1.jpg)
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
**示例 2：**
![](/image/Java/算法Leetcode/Day8_Leetcode206.反转链表/rev1ex2.jpg)
输入：head = [1,2]
输出：[2,1]
**示例 3：**
输入：head = []
输出：[]

## 提交
### 双指针法
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
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
            ListNode cur = head;
            ListNode temp = null;
            while (cur != null) {
                temp = cur.next;// 保存下一个节点
                cur.next = prev;
                prev = cur;
                cur = temp;
            }
            return prev;
    }
}
```

### 递归
```java
class Solution {
    public ListNode reverseList(ListNode head) {
        return reverse(null, head);
    }

    private ListNode reverse(ListNode prev, ListNode cur) {
        if (cur == null) {
            return prev;
        }
        ListNode temp = null;
        temp = cur.next;// 先保存下一个节点
        cur.next = prev;// 反转
        // 更新prev、cur位置
        // prev = cur;
        // cur = temp;
        return reverse(cur, temp);
    }
}
```