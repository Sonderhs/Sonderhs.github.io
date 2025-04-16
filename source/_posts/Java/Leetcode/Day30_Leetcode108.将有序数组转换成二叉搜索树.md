---
title: Leetcode 108.将有序数组转换成二叉搜索树
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-16 21:00:00
copyright: false
description: Leetcode 108.将有序数组转换成二叉搜索树
cover: ../image/Java/算法Leetcode/Day30_Leetcode108.将有序数组转换为二叉搜索树/1.JPG
---



# Leetcode 108.将有序数组转换成二叉搜索树
## 题目要求
* 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 平衡 二叉搜索树。

**示例 1：**
![](/image/Java/算法Leetcode/Day30_Leetcode108.将有序数组转换为二叉搜索树/示例1.jpg)
输入：nums = [-10,-3,0,5,9]
输出：[0,-3,9,-10,null,5]
解释：[0,-10,5,null,-3,null,9] 也将被视为正确答案：
![](/image/Java/算法Leetcode/Day30_Leetcode108.将有序数组转换为二叉搜索树/示例2.jpg)

**示例 2：**
![](/image/Java/算法Leetcode/Day30_Leetcode108.将有序数组转换为二叉搜索树/示例3.jpg)
输入：nums = [1,3]
输出：[3,1]
解释：[1,null,3] 和 [3,1] 都是高度平衡二叉搜索树。


## 递归法

因为原数组已经按升序排列了，所以只要每次将中间位置节点作为每个子树的根节点，就能保持平衡

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
    public TreeNode sortedArrayToBST(int[] nums) {
        if (nums.length == 0) return null;
        return traversal(nums, 0, nums.length - 1);
    }
    
    public TreeNode traversal(int[] nums, int start, int end) {
        if (start > end) return null;
        int mid = (start + end) / 2;
        TreeNode root = new TreeNode(nums[mid]);
        root.left = traversal(nums, start, mid - 1);
        root.right = traversal(nums, mid + 1, end);
        return root;
    }
}
```

