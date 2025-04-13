---
title: Leetcode 501.二叉搜索树中的众数
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-11 21:00:00
copyright: false
description: Leetcode 501.二叉搜索树中的众数
cover: ../image/Java/算法Leetcode/Day27_Leetcode501.二叉搜索树中的众数/1.JPG
---



# Leetcode 501.二叉搜索树中的众数
## 题目要求
* 给你一个含重复值的二叉搜索树（BST）的根节点 root ，找出并返回 BST 中的所有 众数（即，出现频率最高的元素）。

* 如果树中有不止一个众数，可以按 任意顺序 返回。

* 假定 BST 满足如下定义：
  * 结点左子树中所含节点的值 小于等于 当前节点的值
  * 结点右子树中所含节点的值 大于等于 当前节点的值
  * 左子树和右子树都是二叉搜索树

**示例 1：**
![](/image/Java/算法Leetcode/Day27_Leetcode501.二叉搜索树中的众数/示例1.jpg)
输入：root = [1,null,2,2]
输出：[2]

**示例 2：**
输入：root = [0]
输出：[0]


## 双指针

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
    private List<Integer> list = new ArrayList<>();
    private TreeNode pre = null;
    private int maxCount = 0;
    private int count = 0;
    
    public int[] findMode(TreeNode root) {
        traverse(root);
        return list.stream().mapToInt(i -> i).toArray();
    }
    
    public void traverse(TreeNode root) {
        if (root == null) return;
        traverse(root.left);
        if(pre!=null){
            if (root.val == pre.val) {
                count++;
            }else {
                count = 1;
            }
        }else{
            count++;
        }
        if (count > maxCount) {
            maxCount = count;
            list.clear();
            list.add(root.val);
        }else if(count == maxCount){
            list.add(root.val);
        }
        pre = root;
        traverse(root.right);
    }
}
```

## 暴力

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
    public int[] findMode(TreeNode root) {
        Map<Integer, Integer> map = new HashMap<>();
        List<Integer> list = new ArrayList<>();
        if (root == null) return list.stream().mapToInt(Integer::intValue).toArray();
        
        inorderTraversal(root, map);
        List<Map.Entry<Integer,Integer>> mapList = map.entrySet().stream()
                .sorted((s1,s2) -> s2.getValue().compareTo(s1.getValue()))
                .collect(Collectors.toList());
        list.add(mapList.get(0).getKey());

        for (int i = 1; i < mapList.size(); i++) {
            if (mapList.get(i).getValue() == mapList.get(i-1).getValue()) {
                list.add(mapList.get(i).getKey());
            }else {
                break;
            }
        }
        return list.stream().mapToInt(Integer::intValue).toArray();
    }

    public void inorderTraversal(TreeNode root, Map<Integer, Integer> map) {
        if(root == null) return;
        inorderTraversal(root.left, map);
        map.put(root.val, map.getOrDefault(root.val, 0) + 1);
        inorderTraversal(root.right, map);
    }
}
```