---
title: Leetcode 226.翻转二叉树
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-3 21:00:00
copyright: false
description: Leetcode 226.翻转二叉树
cover: ../image/Java/算法Leetcode/Day20_Leetcode226.翻转二叉树/1.JPG
---



# Leetcode 226.翻转二叉树
## 题目要求
* 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。


**示例 1：**
输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
![](/image/Java/算法Leetcode/Day20_Leetcode226.翻转二叉树/invert1-tree.jpg)

**示例 2：**
输入：root = [2,1,3]
输出：[2,3,1]
![](/image/Java/算法Leetcode/Day20_Leetcode226.翻转二叉树/invert2-tree.jpg)

**示例3：**
输入：root = []
输出：[]


## 前序遍历实现二叉树翻转
对于二叉树的翻转相当于交换每个节点的左右子节点即可
使用前序遍历或后序遍历均可

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
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        preOrder(root);
        return root;
    }

    public void preOrder(TreeNode root) {
        if (root == null) return;
        
        // 交换左右子结点
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        
        preOrder(root.left);
        preOrder(root.right);
    }
}
```


## 后序遍历实现二叉树反转

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
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        postOrder(root);
        return root;
    }

    public void postOrder(TreeNode root) {
        if (root == null) return;
        
        postOrder(root.left);
        postOrder(root.right);

        // 交换左右子结点
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
    }
}
```