---
title: Leetcode 513.找树左下角的值
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-7 22:00:00
copyright: false
description: Leetcode 513.找树左下角的值
cover: ../image/Java/算法Leetcode/Day24_Leetcode513.找树左下角的值/1.JPG
---



# Leetcode 513.找树左下角的值
## 题目要求
* 给定一个二叉树的 根节点 root，请找出该二叉树的 最底层 最左边 节点的值。

* 假设二叉树中至少有一个节点。

**示例 1：**
![](/image/Java/算法Leetcode/Day24_Leetcode513.找树左下角的值/示例1.jpg)
输入: root = [2,1,3]
输出: 1

**示例 2：**
![](/image/Java/算法Leetcode/Day24_Leetcode513.找树左下角的值/示例2.jpg)
输入: [1,2,3,4,null,5,6,null,null,7]
输出: 7


## 层序遍历

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
    public int findBottomLeftValue(TreeNode root) {
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        int res = 0;

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

            // 每次更新最新一层的第一个节点作为结果
            res = list.get(0);
        }
        return res;
    }
}
```

## 递归

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
    private int maxDepth = -1;  // 用于记录最大深度
    private int res = 0;  // 用于记录结果

    public int findBottomLeftValue(TreeNode root) {
        res = root.val;
        findLeftValue(root,0);
        return res;
    }
    
    private void findLeftValue(TreeNode root, int depth) {
        if (root == null) return;
        // 如果当前节点为第一次遇到的深度最大的叶子结点时
        if (root.left == null && root.right == null) {
            if (depth > maxDepth) {
                // 更新深度和返回值res
                res = root.val;
                maxDepth = depth;
            }
        }

        // 递归
        if (root.left != null) findLeftValue(root.left, depth + 1);
        if (root.right != null) findLeftValue(root.right,depth + 1);
    }
}
```