---
title: Leetcode 112.路径总和
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-8 20:00:00
copyright: false
description: Leetcode 112.路径总和
cover: ../image/Java/算法Leetcode/Day25_Leetcode112.路径总和/1.JPG
---



# Leetcode 112.路径总和
## 题目要求
* 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false 。

* 叶子节点 是指没有子节点的节点。

**示例 1：**
![](/image/Java/算法Leetcode/Day25_Leetcode112.路径总和/示例1.jpg)
输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
输出：true
解释：等于目标和的根节点到叶节点路径如上图所示。

**示例 2：**
![](/image/Java/算法Leetcode/Day25_Leetcode112.路径总和/示例2.jpg)
输入：root = [1,2,3], targetSum = 5
输出：false
解释：树中存在两条根节点到叶子节点的路径：
(1 --> 2): 和为 3
(1 --> 3): 和为 4
不存在 sum = 5 的根节点到叶子节点的路径。

**示例 3：**
输入：root = [], targetSum = 0
输出：false
解释：由于树是空的，所以不存在根节点到叶子节点的路径。


## 前序遍历

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
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        return traversal(root, targetSum - root.val);
    }

    public boolean traversal(TreeNode root, int count) {
        // 递归终止条件
        // 当遍历到叶子结点时，如果和为targetSum则返回True，否则返回False
        if (root.left == null && root.right == null && count == 0) return true;
        if (root.left == null && root.right == null) return false;
        
        // 向左遍历
        if (root.left != null) {
            // 计算该节点参与计算后的值
            count -= root.left.val;
            // 递归
            if(traversal(root.left, count)) return true;
            // 回溯
            count += root.left.val;
        }
        if (root.right != null) {
            count -= root.right.val;
            if(traversal(root.right, count)) return true;
            count += root.right.val;
        }
        return false;
    }
}
```

## 简洁方法

```java
class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {

        if (root == null) return false; // 为空退出

        // 叶子节点判断是否符合
        if (root.left == null && root.right == null) return root.val == targetSum;

        // 求两侧分支的路径和
        return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
    }
}
```

