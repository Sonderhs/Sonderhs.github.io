---
title: Leetcode 110.平衡二叉树
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-6 20:00:00
copyright: false
description: Leetcode 110.平衡二叉树
cover: ../image/Java/算法Leetcode/Day23_Leetcode110.平衡二叉树/1.JPG
---



# Leetcode 110.平衡二叉树
## 题目要求
* 给定一个二叉树，判断它是否是 平衡二叉树  

**示例 1：**
![](/image/Java/算法Leetcode/Day23_Leetcode110.平衡二叉树/示例1.jpg)
输入：root = [3,9,20,null,null,15,7]
输出：true

**示例 2：**
输入：root = [1,2,2,3,3,null,null,4,4]
输出：false
![](/image/Java/算法Leetcode/Day23_Leetcode110.平衡二叉树/示例2.jpg)

**示例 3：** 
输入：root = []
输出：true

## 后序遍历判断平衡二叉树

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
    public boolean isBalanced(TreeNode root) {
        if(root == null) return true;
        int reesult = height(root);
        if(reesult == -1) return false;
        else return true;
    }

    public int height(TreeNode root){
        // 如果当前节点为空，返回0
        if (root == null) return 0;

        // 计算左子树高度
        int leftdepth = height(root.left);
        // 如果返回-1则说明左子树就已经不是平衡二叉树了
        if (leftdepth == -1) return -1;
        // 计算右子树高度
        int rightdepth = height(root.right);
        if (rightdepth == -1) return -1;

        // 判断以当前节点为根节点的树是否是平衡二叉树
        if (Math.abs(leftdepth - rightdepth) > 1) {
            return -1;
        }else {
            // 如果不是则返回以当前节点为根节点的树的高度
            return Math.max(leftdepth, rightdepth) + 1;
        }
    }
}
```
