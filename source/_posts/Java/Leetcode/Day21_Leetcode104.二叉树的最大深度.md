---
title: Leetcode 104.二叉树的最大深度
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-4 21:00:00
copyright: false
description: Leetcode 104.二叉树的最大深度
cover: ../image/Java/算法Leetcode/Day21_Leetcode104.二叉树的最大深度/1.JPG
---



# Leetcode 104.二叉树的最大深度
## 题目要求
* 给定一个二叉树 root ，返回其最大深度。

* 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。

**示例 1：**
输入：root = [3,9,20,null,null,15,7]
输出：3
![](/image/Java/算法Leetcode/Day21_Leetcode104.二叉树的最大深度/示例1.jpg)

**示例 2：**
输入：root = [1,null,2]
输出：2


## 递归求二叉树最大深度
在递归时多一个参数depth用于记录最大深度
比较每个节点的左子树和右子树的深度从而确定整棵树的最大深度

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
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        int result = curDeep(root, 0);
        return result;
    }
    
    public int curDeep(TreeNode root, int depth) {
        if (root == null) return depth;
        int left = curDeep(root.left, depth);
        int right = curDeep(root.right, depth);
        return Math.max(left, right) + 1;
    }
}
```