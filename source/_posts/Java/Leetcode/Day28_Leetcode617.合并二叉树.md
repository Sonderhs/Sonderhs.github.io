---
title: Leetcode 617.合并二叉树
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-14 21:00:00
copyright: false
description: Leetcode 617.合并二叉树
cover: ../image/Java/算法Leetcode/Day28_Leetcode617.合并二叉树/1.JPG
---



# Leetcode 617.合并二叉树
## 题目要求
* 给你两棵二叉树： root1 和 root2 。

* 想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。合并的规则是：如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，不为 null 的节点将直接作为新二叉树的节点。

* 返回合并后的二叉树。

* 注意: 合并过程必须从两个树的根节点开始。

**示例 1：**
![](/image/Java/算法Leetcode/Day28_Leetcode617.合并二叉树/示例1.jpg)
输入：root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
输出：[3,4,5,5,4,null,7]

**示例 2：**
输入：root1 = [1], root2 = [1,2]
输出：[2,2]
 


## 递归，前序遍历合并二叉树

两个二叉树一起遍历，构造新节点

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
    public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {
        if (root1 == null) return root2;
        if (root2 == null) return root1;

        TreeNode root = new TreeNode(root1.val + root2.val);
        root.left = mergeTrees(root1.left, root2.left);
        root.right = mergeTrees(root1.right, root2.right);
        return root;
    }
}
```

