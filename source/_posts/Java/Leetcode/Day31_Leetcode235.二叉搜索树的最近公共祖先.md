---
title: Leetcode 235.二叉搜索树的最近公共祖先
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-17 22:00:00
copyright: false
description: Leetcode 235.二叉搜索树的最近公共祖先
cover: ../image/Java/算法Leetcode/Day31_Leetcode235.二叉搜索树的最近公共祖先/1.JPG
---



# Leetcode 235.二叉搜索树的最近公共祖先
## 题目要求
* 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

* 例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]
![](/image/Java/算法Leetcode/Day31_Leetcode235.二叉搜索树的最近公共祖先/示例1.png)

**示例 1：**
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
输出: 6 
解释: 节点 2 和节点 8 的最近公共祖先是 6。

**示例 2：**
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
输出: 2
解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。

## 层序遍历

因为二叉搜索树的性质是：对于每个节点，左子树的值都小于该节点的值，右子树的值都大于该节点的值。所以对于p和q，他们的公共祖先的值一定在q和p之间。
所以层序遍历遇到的第一个值位于p和q之间的节点就是他们的公共祖先。

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
        if (root == null) return null;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        int max = q.val;
        int min = p.val;
        if (p.val > q.val){
            max = p.val;
            min = q.val;
        }
        while (!queue.isEmpty()) {
            // size用于记录当前层中的元素个数
            int size = queue.size();
            // 弹出当前层的元素，并将当前层元素的孩子入队
            while (size > 0) {
                TreeNode node = queue.poll();
                if (node.val >= min && node.val <= max) return node;
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
                size--;
            }
        }
        return null;
    }
}
```

## 递归法

```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root.val > p.val && root.val > q.val) return lowestCommonAncestor(root.left, p, q);
        if (root.val < p.val && root.val < q.val) return lowestCommonAncestor(root.right, p, q);
        return root;
    }
}
```

## 迭代法

```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while (true) {
            if (root.val > p.val && root.val > q.val) {
                root = root.left;
            } else if (root.val < p.val && root.val < q.val) {
                root = root.right;
            } else {
                break;
            }
        }
        return root;
    }
}
```