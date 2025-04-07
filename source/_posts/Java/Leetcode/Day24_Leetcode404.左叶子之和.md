---
title: Leetcode 404.左叶子之和
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-7 21:00:00
copyright: false
description: Leetcode 404.左叶子之和
cover: ../image/Java/算法Leetcode/Day24_Leetcode404.左叶子之和/1.JPG
---



# Leetcode 404.左叶子之和
## 题目要求
* 给定二叉树的根节点 root ，返回所有左叶子之和。

**示例 1：**
![](/image/Java/算法Leetcode/Day24_Leetcode404.左叶子之和/示例1.jpg)
输入: root = [3,9,20,null,null,15,7] 
输出: 24 
解释: 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24

**示例 2：**
输入: root = [1]
输出: 0


## 后序遍历求左叶子之和

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
    public int sumOfLeftLeaves(TreeNode root) {
        // 如果当前节点为空，返回0
        if (root == null) return 0;
        // 如果当前节点为叶子节点，由于我们无法判断其为左叶子还是右叶子
        // 所以统一返回0
        if (root.left == null && root.right == null) return 0;

        // 递归左右子节点
        int leftSum = sumOfLeftLeaves(root.left);
        int rightSum = sumOfLeftLeaves(root.right);

        // 如果当前节点的左子节点不为空，且该左子节点的左右子节点均为空
        // 说明该左子节点为左叶子结点
        // 则该节点的左叶子之和为该节点的左子节点的val
        if (root.left != null && root.left.left == null && root.left.right == null) {
            leftSum = root.left.val;
        }

        // 总和
        int sum = leftSum + rightSum;
        return sum;
    }
}
```

