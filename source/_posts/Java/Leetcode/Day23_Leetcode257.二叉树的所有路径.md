---
title: Leetcode 257.二叉树的所有路径
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-6 21:00:00
copyright: false
description: Leetcode 257.二叉树的所有路径
cover: ../image/Java/算法Leetcode/Day23_Leetcode257.二叉树的所有路径/1.JPG
---



# Leetcode 257.二叉树的所有路径
## 题目要求
* 给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径。

* 叶子节点 是指没有子节点的节点。

**示例 1：**
![](/image/Java/算法Leetcode/Day23_Leetcode257.二叉树的所有路径/示例1.jpg)
输入：root = [1,2,3,null,5]
输出：["1->2->5","1->3"]

**示例 2：**
输入：root = [1]
输出：["1"]


## 前序遍历求二叉树路径
注意点：回溯和递归是一一对应的，有一个递归，就要有一个回溯，所以递归和回溯应该在一个大括号内

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
    public List<String> binaryTreePaths(TreeNode root) {
        // res用于存放最终的结果
        List<String> res = new ArrayList<String>();
        if (root == null) {
            return res;
        }

        // paths用于存放单条路径
        List<Integer> paths = new ArrayList<>();
        travelsal(root, paths, res);
        return res;
    }

    public void travelsal(TreeNode root, List<Integer> paths, List<String> res) {
        // 前序遍历：中
        // 将当前节点加到paths中
        paths.add(root.val);

        // 终止条件，当当前节点为叶子结点时
        // 依次取出paths中存储的路径并拼接成字符串
        if (root.left == null && root.right == null) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < paths.size() - 1; i++) {
                sb.append(paths.get(i)).append("->");
            }
            // 最后一个节点（叶子结点）需要单独拼接
            // 因为最后一个节点后面没有"->"
            sb.append(root.val);
            // 将当前路径存储到结果中
            res.add(sb.toString());
            return;
        }

        // 递归左子树
        if (root.left != null) {
            travelsal(root.left, paths, res);
            // 回溯
            paths.remove(paths.size() - 1);
        }
        // 递归右子树
        if (root.right != null) {
            travelsal(root.right, paths, res);
            // 回溯
            paths.remove(paths.size() - 1);
        }
    }
}
```


## 精简版

```java
class Solution {

    List<String> result = new ArrayList<>();

    public List<String> binaryTreePaths(TreeNode root) {
        deal(root, "");
        return result;
    }

    public void deal(TreeNode node, String s) {
        if (node == null)
            return;
        if (node.left == null && node.right == null) {
            result.add(new StringBuilder(s).append(node.val).toString());
            return;
        }
        String tmp = new StringBuilder(s).append(node.val).append("->").toString();
        deal(node.left, tmp);
        deal(node.right, tmp);
    }
}
```