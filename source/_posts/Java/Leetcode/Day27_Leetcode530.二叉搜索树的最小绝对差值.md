---
title: Leetcode 530.二叉搜索树的最小绝对差值
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-11 20:00:00
copyright: false
description: Leetcode 530.二叉搜索树的最小绝对差值
cover: ../image/Java/算法Leetcode/Day27_Leetcode530.二叉搜索树的最小绝对差值/1.JPG
---



# Leetcode 530.二叉搜索树的最小绝对差值
## 题目要求
* 给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。

* 差值是一个正数，其数值等于两值之差的绝对值。

**示例 1：**
![](/image/Java/算法Leetcode/Day27_Leetcode530.二叉搜索树的最小绝对差值/示例1.jpg)
输入：root = [4,2,6,1,3]
输出：1

**示例 2：**
![](/image/Java/算法Leetcode/Day27_Leetcode530.二叉搜索树的最小绝对差值/示例2.jpg)
输入：root = [1,0,48,null,null,12,49]
输出：1


## 双指针

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    private TreeNode pre = null;
    private int result = Integer.MAX_VALUE;

    public int getMinimumDifference(TreeNode root) {
        if(root == null) return 0;
        traversal(root);
        return result;
    }
    
    public void traversal(TreeNode cur) {
        if(cur == null) return;
        traversal(cur.left);
        if(pre != null) {
            result = Math.min(result, cur.val - pre.val);
        }
        pre = cur;
        traversal(cur.right);
    }
}
```
