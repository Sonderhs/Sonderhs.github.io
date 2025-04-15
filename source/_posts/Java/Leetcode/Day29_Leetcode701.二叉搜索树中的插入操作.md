---
title: Leetcode 701.二叉搜索树中的插入操作
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-15 20:00:00
copyright: false
description: Leetcode 701.二叉搜索树中的插入操作
cover: ../image/Java/算法Leetcode/Day29_Leetcode701.二叉搜索树中的插入操作/1.JPG
---



# Leetcode 701.二叉搜索树中的插入操作
## 题目要求
* 给定二叉搜索树（BST）的根节点 root 和要插入树中的值 value ，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 输入数据 保证 ，新值和原始二叉搜索树中的任意节点值都不同。

* 注意，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回 任意有效的结果 。

**示例 1：**
![](/image/Java/算法Leetcode/Day29_Leetcode701.二叉搜索树中的插入操作/示例1.jpg)
输入：root = [4,2,7,1,3], val = 5
输出：[4,2,7,1,3,5]
解释：另一个满足题目要求可以通过的树是：
![](/image/Java/算法Leetcode/Day29_Leetcode701.二叉搜索树中的插入操作/示例2.jpg)


**示例 2：**
输入：root = [40,20,60,10,30,50,70], val = 25
输出：[40,20,60,10,30,50,70,null,null,25]

**示例 3：**
输入：root = [4,2,7,1,3,null,null,null,null,null,null], val = 5
输出：[4,2,7,1,3,5]


## 递归

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
    public TreeNode insertIntoBST(TreeNode root, int val) {
        // 创建新节点
        TreeNode newNode = new TreeNode(val);
        if (root == null) return newNode;
        // 如果当前节点的值大于要插入的值，则向左子树插入
        if (root.val > val) {
            root.left = insertIntoBST(root.left, val);
        }else {
            // 如果当前节点的值小于要插入的值，则向右子树插入
            root.right = insertIntoBST(root.right, val);
        }
        return root;
    }
}
```

## 迭代法

```java
class Solution {
    public TreeNode insertIntoBST(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        TreeNode newRoot = root;
        TreeNode pre = root;
        // 迭代查找插入位置
        while (root != null) {
            pre = root;
            if (root.val > val) {
                root = root.left;
            } else if (root.val < val) {
                root = root.right;
            } 
        }
        if (pre.val > val) {
            pre.left = new TreeNode(val);
        } else {
            pre.right = new TreeNode(val);
        }

        return newRoot;
    }
}
```