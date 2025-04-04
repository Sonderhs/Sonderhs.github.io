---
title: Leetcode 101.对称二叉树
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-4 20:00:00
copyright: false
description: Leetcode 101.对称二叉树
cover: ../image/Java/算法Leetcode/Day21_Leetcode101.对称二叉树/1.JPG
---



# Leetcode 101.对称二叉树
## 题目要求
* 给你一个二叉树的根节点 root ， 检查它是否轴对称。

**示例 1：**
输入：root = [1,2,2,3,4,4,3]
输出：true
![](/image/Java/算法Leetcode/Day21_Leetcode101.对称二叉树/示例1.png)

**示例 2：**
输入：root = [1,2,2,null,3,null,3]
输出：false
![](/image/Java/算法Leetcode/Day21_Leetcode101.对称二叉树/示例2.png)

**示例3：**
输入：root = []
输出：[]


## 判断对称二叉树
判断二叉树是否对称，要比较的是根节点的左子树与右子树是不是相互翻转的
在遍历过程中，我们比较的是两个子树的里侧和外侧的元素是否相等
![](/image/Java/算法Leetcode/Day21_Leetcode101.对称二叉树/判断.png)

### 递归三部曲

1. 确定递归函数的参数和返回值
因为我们要比较的是根节点的两个子树是否是相互翻转的，进而判断这个树是不是对称树，所以要比较的是两个树，参数自然也是左子树节点和右子树节点。

返回值自然是bool类型。

代码如下：
```java
public boolean comparable(TreeNode leftNode, TreeNode rightNode)
```

2. 确定终止条件
要比较两个节点数值相不相同，首先要把两个节点为空的情况弄清楚！否则后面比较数值的时候就会操作空指针了。

节点为空的情况有：（注意我们比较的其实不是左孩子和右孩子，所以如下我称之为左节点右节点）

左节点为空，右节点不为空，不对称，return false
左不为空，右为空，不对称 return false
左右都为空，对称，返回true
此时已经排除掉了节点为空的情况，那么剩下的就是左右节点不为空：

左右都不为空，比较节点数值，不相同就return false
此时左右节点不为空，且数值也不相同的情况我们也处理了。

代码如下：
```java
if (leftNode == null && rightNode != null) return false;
else if (leftNode != null && rightNode == null) return false;
else if (leftNode == null && rightNode == null) return true;
else if (leftNode.val != rightNode.val) return false;
```
注意上面最后一种情况，我没有使用else，而是else if， 因为我们把以上情况都排除之后，剩下的就是 左右节点都不为空，且数值相同的情况。

3. 确定单层递归的逻辑
此时才进入单层递归的逻辑，单层递归的逻辑就是处理 左右节点都不为空，且数值相同的情况。

比较二叉树外侧是否对称：传入的是左节点的左孩子，右节点的右孩子。
比较内侧是否对称，传入左节点的右孩子，右节点的左孩子。
如果左右都对称就返回true ，有一侧不对称就返回false 。
代码如下：

```java
boolean isLeft = comparable(leftNode.left, rightNode.right);  // 左子树：左、 右子树：右
boolean isRight = comparable(leftNode.right, rightNode.left);  // 左子树：右、 右子树：左
boolean isSame = isLeft && isRight;  // 左子树：中、 右子树：中（逻辑处理）
return isSame;
```
如上代码中，我们可以看出使用的遍历方式，左子树左右中，右子树右左中，所以我把这个遍历顺序也称之为“后序遍历”（尽管不是严格的后序遍历）。

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
    public boolean isSymmetric(TreeNode root) {
        return comparable(root.left, root.right);
    }

    public boolean comparable(TreeNode leftNode, TreeNode rightNode) {
        if (leftNode == null && rightNode != null) return false;
        else if (leftNode != null && rightNode == null) return false;
        else if (leftNode == null && rightNode == null) return true;
        else if (leftNode.val != rightNode.val) return false;
        
        boolean isLeft = comparable(leftNode.left, rightNode.right);
        boolean isRight = comparable(leftNode.right, rightNode.left);
        return isLeft && isRight;
    }
}
```