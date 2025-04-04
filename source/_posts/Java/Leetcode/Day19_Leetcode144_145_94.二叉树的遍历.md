---
title: Leetcode 144_145_94.二叉树的遍历
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-2 21:00:00
copyright: false
description: Leetcode 144_145_94.二叉树的遍历
cover: ../image/Java/算法Leetcode/Day19_Leetcode144_145_94.二叉树的遍历/1.JPG
---



# Leetcode 144_145_94.二叉树的遍历
## 题目要求
* 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。
* 给你二叉树的根节点 root ，返回它节点值的 中序 遍历。
* 给你二叉树的根节点 root ，返回它节点值的 后序 遍历。



**示例 1：**
前序遍历：
输入：root = [1,null,2,3]
输出：[1,2,3]
![](/image/Java/算法Leetcode/Day19_Leetcode144_145_94.二叉树的遍历/前序遍历.png)

**示例 2：**
中序遍历：
输入：root = [1,null,2,3]
输出：[1,3,2]

**示例3：**
后序遍历：
输入：root = [1,null,2,3]
输出：[3,2,1]


## 递归遍历
### 前序遍历

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
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        preorder(root, result);
        return result;
    }

    public void preorder(TreeNode root, List<Integer> result) {
        if(root == null) return;
        result.add(root.val);
        preorder(root.left, result);
        preorder(root.right, result);
    }
}
```

### 中序遍历

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
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        inOrder(root, result);
        return result;
    }

    public void inOrder(TreeNode root, List<Integer> result){
        if(root == null) return;
        inOrder(root.left, result);
        result.add(root.val);
        inOrder(root.right, result);
    }
}
```


### 后序遍历

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
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        postOrder(root, result);
        return result;
    }

    public void postOrder(TreeNode root, List<Integer> result){
        if(root == null) return;
        postOrder(root.left, result);
        postOrder(root.right, result);
        result.add(root.val);
    }
}
```

## 非递归遍历
使用栈进行非递归遍历

### 前序遍历

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
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        if (root == null) {
            return result;
        }
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            result.add(node.val);
            if (node.right != null) {
                stack.push(node.right);
            }
            if (node.left != null) {
                stack.push(node.left);
            }
        }
        return result;
    }
}
```

### 中序遍历
因为中序遍历顺序为左中右，所以我们需要先处理最左边的节点
所以我们首先让指针一直往左走并入栈，直到指针为空，说明该节点就是我们目前要处理的节点
然后出栈并将该元素加入result，之后看该出栈节点是否有右孩子，有的话就入栈继续往左走，否则出栈
![](/image/Java/算法Leetcode/Day19_Leetcode144_145_94.二叉树的遍历/二叉树中序遍历（迭代法）.gif)

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
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null){
            return result;
        }
        Stack<TreeNode> stack = new Stack<>();
        TreeNode cur = root;
        while(cur != null || !stack.isEmpty()){
            if(cur != null){
                stack.push(cur);
                cur = cur.left;
            }else{
                cur = stack.pop();
                result.add(cur.val);
                cur = cur.right;
            }
        }
        return result;
    }
}
```

### 后序遍历
后序遍历只需要将前序遍历的左右子节点入栈顺序颠倒后最后翻转一次即可
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
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        if (root == null) {
            return result;
        }
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            result.add(node.val);
            
            if (node.left != null) {
                stack.push(node.left);
            }
            if (node.right != null) {
                stack.push(node.right);
            }
        }
        Collections.reverse(result);
        return result;
    }
}
```
