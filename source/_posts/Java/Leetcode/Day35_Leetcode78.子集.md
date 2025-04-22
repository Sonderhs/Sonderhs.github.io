---
title: Leetcode 78.子集
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-22 20:00:00
copyright: false
description: Leetcode 78.子集
cover: ../image/Java/算法Leetcode/Day35_Leetcode78.子集/1.JPG
---



# Leetcode 78.子集
## 题目要求
* 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

* 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

**示例 1：**
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

**示例 2：**
输入：nums = [0]
输出：[[],[0]]


## 回溯法

![](/image/Java/算法Leetcode/Day35_Leetcode78.子集/分割.png)
本题与之前的的区别就是：
* 之前的问题都是在叶子结点收获结果，所以需要设置终止条件
* 而本题是每一个结点都需要收获结果，所以我们在每次递归的时候都要将当前的路径加入到结果集中，所以不需要设置终止条件即可

```java
class Solution {
    private List<List<Integer>> res = new ArrayList<List<Integer>>();
    private List<Integer> path = new ArrayList<>();

    public List<List<Integer>> subsets(int[] nums) {
        backtracking(nums, 0);
        return res;
    }

    public void backtracking(int[] nums, int startIndex) {
        // 收集过程中的所有路径
        res.add(new ArrayList<>(path));

        // 终止条件写不写都可以
        // 当startIndex >= nums.length时不会进入for循环而是直接跳出函数
        // 就相当于reuturn;了
        if (startIndex >= nums.length) return;
        for (int i = startIndex; i < nums.length; i++) {
            path.add(nums[i]);
            backtracking(nums,i + 1);
            path.remove(path.size() - 1);
        }
    }
}
```
