---
title: Leetcode 538.把二叉搜索树转换为累加树
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-17 20:00:00
copyright: false
description: Leetcode 538.把二叉搜索树转换为累加树
cover: ../image/Java/算法Leetcode/Day31_Leetcode538.把二叉搜索树转换为累加树/1.JPG
---



# Leetcode 538.把二叉搜索树转换为累加树
## 题目要求
* 给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。

* 提醒一下，二叉搜索树满足下列约束条件：
  * 节点的左子树仅包含键 小于 节点键的节点。
  * 节点的右子树仅包含键 大于 节点键的节点。
  * 左右子树也必须是二叉搜索树。


**示例 1：**
![](/image/Java/算法Leetcode/Day31_Leetcode538.把二叉搜索树转换为累加树/示例1.png)
输入：[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
输出：[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]

**示例 2：**
输入：root = [0,null,1]
输出：[1,null,1]

**示例 3：**
输入：root = [1,0,2]
输出：[3,3,2]

**示例 4：**
输入：root = [3,2,4,1]
输出：[7,9,4,10]


## 递归法

因为二叉搜索树的性质，我们可以从右子树开始遍历，先遍历右子树，然后将当前节点的值加到一个累加器中，最后遍历左子树。这样就能保证每个节点的值都被更新为大于等于它的所有节点的值之和。

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
    public int sum = 0;
    public TreeNode convertBST(TreeNode root) {
        if (root == null) return null;
        Sum(root);
        return root;
    }

    public void Sum(TreeNode root) {
        if (root == null) return;
        if (root.right != null) Sum(root.right);
        root.val += sum;
        sum = root.val;
        if (root.left != null) Sum(root.left);
    }
}
```

## 迭代法(代码随想录)

迭代法的思路与递归法类似，只是我们使用栈来模拟递归的过程。我们从右子树开始遍历，先将右子树的节点压入栈中，然后处理当前节点，最后处理左子树。

```java
class Solution {
    //DFS iteraion統一迭代法
    public TreeNode convertBST(TreeNode root) {
        int pre = 0;
        Stack<TreeNode> stack = new Stack<>();
        if(root == null) //edge case check
            return null;

        stack.add(root);

        while(!stack.isEmpty()){
            TreeNode curr = stack.peek();
            //curr != null的狀況，只負責存node到stack中
            if(curr != null){ 
                stack.pop();
                if(curr.left != null)       //左
                    stack.add(curr.left);
                stack.add(curr);            //中
                stack.add(null);
                if(curr.right != null)      //右
                    stack.add(curr.right);
            }else{
            //curr == null的狀況，只負責做單層邏輯
                stack.pop();
                TreeNode temp = stack.pop();
                temp.val += pre;
                pre = temp.val;
            }
        }
        return root;
    }
}
```