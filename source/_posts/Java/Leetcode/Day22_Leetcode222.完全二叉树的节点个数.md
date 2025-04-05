---
title: Leetcode 222.完全二叉树的节点个数
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-5 21:00:00
copyright: false
description: Leetcode 222.完全二叉树的节点个数
cover: ../image/Java/算法Leetcode/Day22_Leetcode222.完全二叉树的节点个数/1.JPG
---



# Leetcode 222.完全二叉树的节点个数
## 题目要求
* 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。

* 完全二叉树 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层（从第 0 层开始），则该层包含 1~ 2h 个节点。

**示例 1：**
![](/image/Java/算法Leetcode/Day22_Leetcode222.完全二叉树的节点个数/示例1.jpg)
输入：root = [1,2,3,4,5,6]
输出：6

**示例 2：**
输入：root = []
输出：0

**示例 3：** 
输入：root = [1]
输出：1

## 后序遍历统计个数

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
    public int countNodes(TreeNode root) {
        if (root == null) return 0;
        int count = postOrder(root);
        return count;
    }
    
    
    public int postOrder(TreeNode root ) {
        if (root == null) return 0;
        int left = postOrder(root.left);
        int right = postOrder(root.right);
        return left + right + 1;
    }
}

// 简便写法
class Solution {
    // 通用递归解法
    public int countNodes(TreeNode root) {
        if(root == null) {
            return 0;
        }
        return countNodes(root.left) + countNodes(root.right) + 1;
    }
}
```

## 完全二叉树特性
满二叉树n层节点个数为(假设根节点为第一层)：$2^n-1$

```java
class Solution {
    /**
     * 针对完全二叉树的解法
     *
     * 满二叉树的结点数为：2^depth - 1
     */
    public int countNodes(TreeNode root) {
        if (root == null) return 0;
        TreeNode left = root.left;
        TreeNode right = root.right;
        int leftDepth = 0, rightDepth = 0; // 这里初始为0是有目的的，为了下面求指数方便

        // 下面主要是判断以root为根节点的树是否是满二叉树
        while (left != null) {  // 求左子树深度
            left = left.left;
            leftDepth++;
        }
        while (right != null) { // 求右子树深度
            right = right.right;
            rightDepth++;
        }
        if (leftDepth == rightDepth) {
            return (2 << leftDepth) - 1; // 注意(2<<1) 相当于2^2，所以leftDepth初始为0
        }
        return countNodes(root.left) + countNodes(root.right) + 1;
    }
}
```

