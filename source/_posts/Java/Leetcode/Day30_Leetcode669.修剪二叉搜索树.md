---
title: Leetcode 669.修剪二叉搜索树
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-16 20:00:00
copyright: false
description: Leetcode 669.修剪二叉搜索树
cover: ../image/Java/算法Leetcode/Day30_Leetcode669.修剪二叉搜索树/1.JPG
---



# Leetcode 669.修剪二叉搜索树
## 题目要求
* 给你二叉搜索树的根节点 root ，同时给定最小边界low 和最大边界 high。通过修剪二叉搜索树，使得所有节点的值在[low, high]中。修剪树 不应该 改变保留在树中的元素的相对结构 (即，如果没有被移除，原有的父代子代关系都应当保留)。 可以证明，存在 唯一的答案 。

* 所以结果应当返回修剪好的二叉搜索树的新的根节点。注意，根节点可能会根据给定的边界发生改变。


**示例 1：**
![](/image/Java/算法Leetcode/Day30_Leetcode669.修剪二叉搜索树/示例1.jpg)
输入：root = [1,0,2], low = 1, high = 2
输出：[1,null,2]

**示例 2：**
![](/image/Java/算法Leetcode/Day30_Leetcode669.修剪二叉搜索树/示例2.jpg)
输入：root = [3,0,4,null,2,null,null,1], low = 1, high = 3
输出：[3,2,null,1]


## 递归法

当root的值小于low时，root的左子树一定不满足条件，但右子树可能有满足条件的值，所以返回右子树的结果；
当root的值大于high时，root的右子树一定不满足条件，但左子树可能有满足条件的值，所以返回左子树的结果；
当root的值在区间内时，递归处理左右子树，最后返回root。

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
    public TreeNode trimBST(TreeNode root, int low, int high) {
        if (root == null) return root;
        
        if (root.val < low) return trimBST(root.right, low, high);
        if (root.val > high) return trimBST(root.left, low, high);

        root.left = trimBST(root.left, low, high);
        root.right = trimBST(root.right, low, high);
        
        return root;
    }
}
```

## 迭代法(代码随想录)

```java
class Solution {
    //iteration
    public TreeNode trimBST(TreeNode root, int low, int high) {
        if(root == null)
            return null;
        while(root != null && (root.val < low || root.val > high)){
            if(root.val < low)
                root = root.right;
            else
                root = root.left;
        }

        TreeNode curr = root;
        
        //deal with root's left sub-tree, and deal with the value smaller than low.
        while(curr != null){
            while(curr.left != null && curr.left.val < low){
                curr.left = curr.left.right;
            }
            curr = curr.left;
        }
        //go back to root;
        curr = root;

        //deal with root's righg sub-tree, and deal with the value bigger than high.
        while(curr != null){
            while(curr.right != null && curr.right.val > high){
                curr.right = curr.right.left;
            }
            curr = curr.right;
        }
        return root;
    }
}
```