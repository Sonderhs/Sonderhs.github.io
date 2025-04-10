---
title: Leetcode 98.验证二叉搜索树
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-10 21:00:00
copyright: false
description: Leetcode 98.验证二叉搜索树
cover: ../image/Java/算法Leetcode/Day26_Leetcode98.验证二叉搜索树/1.JPG
---



# Leetcode 98.验证二叉搜索树
## 题目要求
* 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。

* 有效 二叉搜索树定义如下：
  * 节点的左子树只包含 小于 当前节点的数。
  * 节点的右子树只包含 大于 当前节点的数。
  * 所有左子树和右子树自身必须也是二叉搜索树。


**示例 1：**
![](/image/Java/算法Leetcode/Day26_Leetcode98.验证二叉搜索树/示例1.jpg)
输入：root = [2,1,3]
输出：true

**示例 2：**
![](/image/Java/算法Leetcode/Day26_Leetcode98.验证二叉搜索树/示例2.jpg)
输入：root = [5,1,4,null,null,3,6]
输出：false
解释：根节点的值是 5 ，但是右子节点的值是 4 。


## 中序遍历
中序遍历二叉树并存入到list中，判断list中元素是否升序排列
是的话返回true，否则返回false

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
    public boolean isValidBST(TreeNode root) {
        ArrayList<Integer> list = new ArrayList<>();
        inOrder(root, list);
        for (int i = 0; i < list.size() - 1; i++) {
            if (list.get(i) >= list.get(i + 1)) {
                return false;
            }
        }  
        return true;
    }
    
    public void inOrder(TreeNode root, ArrayList<Integer> inorder) {
        if (root == null) return;
        inOrder(root.left, inorder);
        inorder.add(root.val);
        inOrder(root.right, inorder);
    }
}
```

## 简洁实现

```java
// 简洁实现·递归解法
class Solution {
    public boolean isValidBST(TreeNode root) {
        return validBST(Long.MIN_VALUE, Long.MAX_VALUE, root);
    }
    boolean validBST(long lower, long upper, TreeNode root) {
        if (root == null) return true;
        if (root.val <= lower || root.val >= upper) return false;
        return validBST(lower, root.val, root.left) && validBST(root.val, upper, root.right);
    }
}
// 简洁实现·中序遍历
class Solution {
    private long prev = Long.MIN_VALUE;
    public boolean isValidBST(TreeNode root) {
        if (root == null) {
            return true;
        }
        if (!isValidBST(root.left)) {
            return false;
        }
        // 直接在遍历过程中比较相邻的两个节点即可，类似于双指针
        if (root.val <= prev) { // 不满足二叉搜索树条件
            return false;
        }
        prev = root.val;
        return isValidBST(root.right);
    }
}
```

