---
title: Leetcode 39.组合总和
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-20 21:00:00
copyright: false
description: Leetcode 39.组合总和
cover: ../image/Java/算法Leetcode/Day33_Leetcode39.组合总和/1.JPG
---



# Leetcode 39.组合总和
## 题目要求
* 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

* candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 

* 对于给定的输入，保证和为 target 的不同组合数少于 150 个。

**示例 1：**
输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。

**示例 2：**
输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]

**示例 3:**
输入: candidates = [2], target = 1
输出: []


## 回溯法

```java
class Solution {
    public List<List<Integer>> res = new ArrayList<>();
    public List<Integer> path = new ArrayList<>();
    public int sum = 0;

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        backtrack(candidates, target, 0);
        return res;
    }

    public void backtrack(int[] candidates, int target, int start) {
        if (sum > target) return;

        if (sum == target) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = start; i < candidates.length; i++) {
            path.add(candidates[i]);
            sum += candidates[i];
            // 这里是i而不是i+1，因为可以重复使用同一个元素
            // 每一次回溯的起始点都是该元素
            // 例如[2,3,6,7]，当第一个元素是2时，第二个元素可以从2开始选
            // 当第一个元素是3时，第二个元素就要从3开始选
            backtrack(candidates, target, i);
            path.remove(path.size() - 1);
            sum -= candidates[i];
        }
    }
}
```

## 剪枝

本题剪枝需要先进行排序

```java
// 剪枝优化
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(candidates); // 先进行排序
        backtracking(res, new ArrayList<>(), candidates, target, 0, 0);
        return res;
    }

    public void backtracking(List<List<Integer>> res, List<Integer> path, int[] candidates, int target, int sum, int idx) {
        // 找到了数字和为 target 的组合
        if (sum == target) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = idx; i < candidates.length; i++) {
            // 如果 sum + candidates[i] > target 就终止遍历
            if (sum + candidates[i] > target) break;
            path.add(candidates[i]);
            backtracking(res, path, candidates, target, sum + candidates[i], i);
            path.remove(path.size() - 1); // 回溯，移除路径 path 最后一个元素
        }
    }
}
```