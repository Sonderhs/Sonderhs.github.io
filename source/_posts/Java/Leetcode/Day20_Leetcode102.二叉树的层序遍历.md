---
title: Leetcode 102.二叉树的层序遍历
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-3 20:00:00
copyright: false
description: Leetcode 144_145_94二叉树的遍历
cover: ../image/Java/算法Leetcode/Day20_Leetcode102.二叉树的层序遍历/1.JPG
---



# Leetcode 102.二叉树的层序遍历
## 题目要求
* 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。


**示例 1：**
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]
![](/image/Java/算法Leetcode/Day20_Leetcode102.二叉树的层序遍历/tree1.jpg)

**示例 2：**
输入：root = [1]
输出：[[1]]

**示例3：**
输入：root = []
输出：[]


## 队列实现层序遍历

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
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            // list用于保存当前层中的元素
            List<Integer> list = new ArrayList<>();
            // size用于记录当前层中的元素个数
            int size = queue.size();
            // 弹出当前层的元素，并将当前层元素的孩子入队
            while (size > 0) {
                TreeNode node = queue.poll();
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
                list.add(node.val);
                size--;
            }
            res.add(list);
        }
        return res;
    }
}
```