---
title: Leetcode 450.删除二叉搜索树中的节点
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-15 21:00:00
copyright: false
description: Leetcode 450.删除二叉搜索树中的节点
cover: ../image/Java/算法Leetcode/Day29_Leetcode450.删除二叉搜索树中的节点/1.JPG
---



# Leetcode 450.删除二叉搜索树中的节点
## 题目要求
* 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。

* 一般来说，删除节点可分为两个步骤：
  * 首先找到需要删除的节点；
  * 如果找到了，删除它。

**示例 1：**
![](/image/Java/算法Leetcode/Day29_Leetcode450.删除二叉搜索树中的节点/示例1.jpg)
输入：root = [5,3,6,2,4,null,7], key = 3
输出：[5,4,6,2,null,null,7]
解释：给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。
一个正确的答案是 [5,4,6,2,null,null,7], 如下图所示。
另一个正确答案是 [5,2,6,null,4,null,7]。
解释：另一个满足题目要求可以通过的树是：
![](/image/Java/算法Leetcode/Day29_Leetcode450.删除二叉搜索树中的节点/示例2.jpg)


**示例 2：**
输入: root = [5,3,6,2,4,null,7], key = 0
输出: [5,3,6,2,4,null,7]
解释: 二叉树不包含值为 0 的节点

**示例 3：**
输入: root = [], key = 0
输出: []


## 迭代寻找删除位置然后删除

```java
public TreeNode deleteNode(TreeNode root, int key) {
    TreeNode parent = null;
    TreeNode current = root;
    
    // 查找节点并记录父节点
    while (current != null && current.val != key) {
        parent = current;
        if (key < current.val) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    
    if (current == null) return root; // 没找到
    
    // Case 1: 无子节点或只有一个子节点
    if (current.left == null || current.right == null) {
        TreeNode newNode = (current.left != null) ? current.left : current.right;
        
        if (parent == null) {
            return newNode; // 删除的是根节点
        }
        
        if (parent.left == current) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }
    } 
    // Case 2: 有两个子节点
    else {
        TreeNode successorParent = current;
        TreeNode successor = current.right;
        
        while (successor.left != null) {
            successorParent = successor;
            successor = successor.left;
        }
        
        if (successorParent != current) {
            successorParent.left = successor.right;
            successor.right = current.right;
        }
        
        successor.left = current.left;
        
        if (parent == null) {
            root = successor;
        } else if (parent.left == current) {
            parent.left = successor;
        } else {
            parent.right = successor;
        }
    }
    
    return root;
}
```

## 递归法
前序遍历删除节点，返回新的根节点。

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
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return root;
        if (root.val == key) {
            if (root.left == null){
                return root.right;
            } else if (root.right == null) {
                return root.left;
            } else {
                TreeNode temp = root.right;
                while (temp.left != null) {
                    temp = temp.left;
                }
                temp.left = root.left;
                root = root.right;
                return root;
            }
        }
        if (root.val > key) root.left = deleteNode(root.left, key);
        if (root.val < key) root.right = deleteNode(root.right, key);
        return root;
    }
}
```