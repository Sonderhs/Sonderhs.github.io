---
title: Leetcode 700.二叉搜索树中的搜索
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-10 20:00:00
copyright: false
description: Leetcode 700.二叉搜索树中的搜索
cover: ../image/Java/算法Leetcode/Day26_Leetcode700.二叉搜索树中的搜索/1.JPG
---



# Leetcode 700.二叉搜索树中的搜索
## 题目要求
* 给定二叉搜索树（BST）的根节点 root 和一个整数值 val。

* 你需要在 BST 中找到节点值等于 val 的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 null 。

**示例 1：**
![](/image/Java/算法Leetcode/Day26_Leetcode700.二叉搜索树中的搜索/示例1.jpg)
输入：root = [4,2,7,1,3], val = 2
输出：[2,1,3]

**示例 2：**
![](/image/Java/算法Leetcode/Day26_Leetcode700.二叉搜索树中的搜索/示例2.jpg)
输入：root = [4,2,7,1,3], val = 5
输出：[]


## 二叉搜索树性质
创建一个TreeNode进行遍历，如果当前节点val比target小则向右子树遍历，比target大则向左子树遍历
向子结点遍历时需要注意判断子结点是否为null

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
    public TreeNode searchBST(TreeNode root, int val) {
        TreeNode cur = root;
        while (cur != null) {
            if (cur.val == val) {
                return cur;
            }else if (cur.val > val) {
                if (cur.left != null) {
                    cur = cur.left;
                }else {
                    return null;
                }
            }else if (cur.val < val) {
                if (cur.right != null) {
                    cur = cur.right;
                }else {
                    return null;
                }
            }
        }
        return null;
    }
}
```

## 递归

```java
class Solution {
    // 递归，利用二叉搜索树特点，优化
    public TreeNode searchBST(TreeNode root, int val) {
        if (root == null || root.val == val) {
            return root;
        }
        if (val < root.val) {
            return searchBST(root.left, val);
        } else {
            return searchBST(root.right, val);
        }
    }
}
```

