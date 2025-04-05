---
title: Leetcode 111.二叉树的最小深度
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-5 20:00:00
copyright: false
description: Leetcode 111.二叉树的最小深度
cover: ../image/Java/算法Leetcode/Day22_Leetcode111.二叉树的最小深度/1.JPG
---



# Leetcode 111.二叉树的最小深度
## 题目要求
* 给定一个二叉树，找出其最小深度。

* 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

* 说明：叶子节点是指没有子节点的节点。


**示例 1：**
输入：root = [3,9,20,null,null,15,7]
输出：2
![](/image/Java/算法Leetcode/Day22_Leetcode111.二叉树的最小深度/示例1.jpg)

**示例 2：**
输入：root = [2,null,3,null,4,null,5,null,6]
输出：5

## 层序遍历求二叉树最小深度
层序遍历所有节点并记录当前深度，遇见的第一个叶子结点（左右孩子均为null）所在的深度即为最小深度

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
    public int minDepth(TreeNode root) {
        int depth = 0;
        if (root == null) return depth;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            int size = queue.size();
            List<TreeNode> list = new ArrayList<>();
            while (size > 0) {
                TreeNode node = queue.poll();
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
                list.add(node);
                size--;
            }
            depth++;
            for (int i = 0; i < list.size(); i++) {
                if (list.get(i).left == null && list.get(i).right == null) {
                    return depth;
                }
            }
        }
        return depth;
    }
}
```

## 后序遍历求二叉树最小深度

```java
class Solution {
    /**
     * 递归法，相比求MaxDepth要复杂点
     * 因为最小深度是从根节点到最近**叶子节点**的最短路径上的节点数量
     */
    public int minDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int leftDepth = minDepth(root.left);
        int rightDepth = minDepth(root.right);

        // 与求最大深度不同的地方
        // 因为要求的是到叶子结点深度，所以如果该节点的一侧子树为null
        // 则说明该侧没有叶子结点，也就不存在最小深度
        // 如果左子树为null，右子树不为null，说明最小深度是右子树深度+1
        // 反之同理
        if (root.left == null) {
            return rightDepth + 1;
        }
        if (root.right == null) {
            return leftDepth + 1;
        }
        // 左右结点都不为null
        return Math.min(leftDepth, rightDepth) + 1;
    }
}
```