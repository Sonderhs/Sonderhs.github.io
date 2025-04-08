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

```

