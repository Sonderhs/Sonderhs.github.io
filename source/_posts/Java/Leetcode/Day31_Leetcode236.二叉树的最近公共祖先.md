---
title: Leetcode 236.二叉树的最近公共祖先
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-17 21:00:00
copyright: false
description: Leetcode 236.二叉树的最近公共祖先
cover: ../image/Java/算法Leetcode/Day31_Leetcode236.二叉树的最近公共祖先/1.JPG
---



# Leetcode 236.二叉树的最近公共祖先
## 题目要求
* 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

* 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”


**示例 1：**
![](/image/Java/算法Leetcode/Day31_Leetcode236.二叉树的最近公共祖先/示例1.png)
输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出：3
解释：节点 5 和节点 1 的最近公共祖先是节点 3 。

**示例 2：**
![](/image/Java/算法Leetcode/Day31_Leetcode236.二叉树的最近公共祖先/示例2.png)
输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出：5
解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。

**示例 3：**
输入：root = [1,2], p = 1, q = 2
输出：1


## 递归法

整体思路就是往上返回看左右子树是否包含p或q
因为要自底向上返回所以使用后序遍历
left用于记录当前节点左子树是否包含p或q，right用于记录当前节点右子树是否包含p或q
如果当前节点的左子树和右子树都包含p或q，那么当前节点就是最近公共祖先

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return root;
        if (root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if (left != null && right != null) {
            return root;
        }else if (left == null && right != null) {
            return right;
        }else if (left != null && right == null) {
            return left;
        }else {
            return null;
        }
    }
}
```
