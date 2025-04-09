---
title: Leetcode 106.从中序与后序遍历序列构造二叉树
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-8 21:00:00
copyright: false
description: Leetcode 106.从中序与后序遍历序列构造二叉树
cover: ../image/Java/算法Leetcode/Day25_Leetcode106.从中序与后序遍历序列构造二叉树/1.JPG
---



# Leetcode 106.从中序与后序遍历序列构造二叉树
## 题目要求
* 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。

**示例 1：**
![](/image/Java/算法Leetcode/Day25_Leetcode106.从中序与后序遍历序列构造二叉树/示例1.jpg)
输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
输出：[3,9,20,null,null,15,7]

**示例 2：**
输入：inorder = [-1], postorder = [-1]
输出：[-1]


## 前序遍历
以 后序数组的最后一个元素为切割点，先切中序数组，根据中序数组，反过来再切后序数组。一层一层切下去，每次后序数组最后一个元素就是节点元素。

![](/image/Java/算法Leetcode/Day25_Leetcode106.从中序与后序遍历序列构造二叉树/切割.png)

**切割步骤：**
* 第一步：如果数组大小为零的话，说明是空节点了。
* 第二步：如果不为空，那么取后序数组最后一个元素作为节点元素。
* 第三步：找到后序数组最后一个元素在中序数组的位置，作为切割点
* 第四步：切割中序数组，切成中序左数组和中序右数组 （顺序别搞反了，一定是先切中序数组）
* 第五步：切割后序数组，切成后序左数组和后序右数组
* 第六步：递归处理左区间和右区间

```java
public TreeNode buildTree(int[] inorder, int[] postorder) {
        if (inorder.length == 0 || postorder.length == 0) return null;
        return buildHelper(inorder, 0, inorder.length, postorder, 0, postorder.length);
    }

    public TreeNode buildHelper(int[] inorder, int inorderStart, int inorderEnd, int[] postorder, int postorderStart, int postorderEnd) {
        // 当postorderStart == postorderEnd时，说明节点已经用完了
        if (postorderStart == postorderEnd) {
            return null;
        }
        // postorder的最后一个节点是根节点
        int rootVal = postorder[postorderEnd - 1];
        TreeNode root = new TreeNode(rootVal);
        int midIndex = 0;
        // 寻找中序数组中的分割点
        for (int i = inorderStart; i <= inorderEnd; i++) {
            if (inorder[i] == rootVal) {
                midIndex = i;
                break;
            }
        }
        
        // 左闭右开
        // 分割中序数组
        // 左中序区间，左闭右开[leftInorderBegin, leftInorderEnd)
        int leftInorderStart = inorderStart;
        int leftInorderEnd = midIndex;
        // 右中序区间，左闭右开[rightInorderBegin, rightInorderEnd)
        int rightInorderStart = midIndex + 1;
        int rightInorderEnd = inorderEnd;

        // 分割后序数组
        // 左后序区间，左闭右开[leftPostorderBegin, leftPostorderEnd)
        int leftPostorderStart = postorderStart;
        int leftPostorderEnd = postorderStart + midIndex - inorderStart;  // 后序数组的左边与中序数组的左边长度相等
        // 右后序区间，左闭右开[rightPostorderBegin, rightPostorderEnd)
        int rightPostorderStart = leftPostorderEnd;
        int rightPostorderEnd = postorderEnd - 1;  // 最后一个元素已经作为根节点了
        
        root.left = buildHelper(inorder, leftInorderStart, leftInorderEnd, postorder, leftPostorderStart, leftPostorderEnd);
        root.right = buildHelper(inorder, rightInorderStart, rightInorderEnd, postorder, rightPostorderStart, rightPostorderEnd);

        return root;
    }
```

