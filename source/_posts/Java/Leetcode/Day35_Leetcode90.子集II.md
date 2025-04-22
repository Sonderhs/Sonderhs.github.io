---
title: Leetcode 90.子集II
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-22 21:00:00
copyright: false
description: Leetcode 90.子集II
cover: ../image/Java/算法Leetcode/Day35_Leetcode90.子集II/1.JPG
---


# Leetcode 90.子集II
## 题目要求
* 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的 子集（幂集）。

* 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。

**示例 1：**
输入：nums = [1,2,2]
输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]

**示例 2：**
输入：nums = [0]
输出：[[],[0]]


## 回溯法

![](/image/Java/算法Leetcode/Day35_Leetcode90.子集II/分割.png)
树层去重在for循环内设置终止条件

```java
class Solution {
    private List<List<Integer>> res = new ArrayList<List<Integer>>();
    private List<Integer> path = new ArrayList<>();

    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        backtracking(nums, 0);
        return res;
    }

    public void backtracking(int[] nums, int startIndex) {

        res.add(new ArrayList<>(path));

        if (startIndex >= nums.length) return;
        for (int i = startIndex; i < nums.length; i++) {
            if (i > startIndex && nums[i] == nums[i -1]) continue;
            path.add(nums[i]);
            backtracking(nums, i + 1);
            path.remove(path.size() - 1);
        }
    }
}
```

## 代码随想录

![](/image/Java/算法Leetcode/Day35_Leetcode90.子集II/分割.png)
使用used数组记录当前元素在树枝和树层上是否使用过
* used[i - 1] == true，说明同一树枝candidates[i - 1]使用过
* used[i - 1] == false，说明同一树层candidates[i - 1]使用过

```java
class Solution {
   List<List<Integer>> result = new ArrayList<>();// 存放符合条件结果的集合
   LinkedList<Integer> path = new LinkedList<>();// 用来存放符合条件结果
   boolean[] used;
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        if (nums.length == 0){
            result.add(path);
            return result;
        }
        Arrays.sort(nums);
        used = new boolean[nums.length];
        subsetsWithDupHelper(nums, 0);
        return result;
    }
    
    private void subsetsWithDupHelper(int[] nums, int startIndex){
        result.add(new ArrayList<>(path));
        if (startIndex >= nums.length){
            return;
        }
        for (int i = startIndex; i < nums.length; i++){
            // used[i - 1] == false说明同一树层candidates[i - 1]使用过
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]){
                continue;
            }
            path.add(nums[i]);
            used[i] = true;
            // 回溯完成之前都是在同一树枝中操作
            subsetsWithDupHelper(nums, i + 1);
            // 回溯完成之后就是在同一层中操作了
            path.removeLast();
            used[i] = false;
        }
    }
}
```