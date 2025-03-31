---
title: Leetcode 1.两数之和
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-31 21:00:00
copyright: false
description: Leetcode 1.两数之和
cover: ../image/Java/算法Leetcode/Day17_Leetcode1.两数之和/1.JPG
---



# Leetcode 1.两数之和
## 题目要求
* 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
* 你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。
* 你可以按任意顺序返回答案。

**示例 1：**
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

**示例 2：**
输入：nums = [3,2,4], target = 6
输出：[1,2]

**示例 3：**
输入：nums = [3,3], target = 6
输出：[0,1]


## 提交
### HashMap
这道题中我们不仅需要判断某元素是否存在，而且还需要知道该元素在原数组中的下标
所以利用HashMap存储我们遍历过的nums里的元素作为key，其下标作为value
遍历nums并查询我们想要找的数target - nums[i]是否存在，如果存在就是我们想要找的连个元素，放进result中即可
如果不存在，则把当前元素及其下标放入HashMap中，继续向后遍历nums

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        int[] result = new int[2];

        for (int i = 0; i < nums.length; i++) {
            if (map.containsKey(target - nums[i])) {
                result[0] = i;
                result[1] = map.get(target - nums[i]);
            }else{
                map.put(nums[i], i);
            }
        }
        return result;
    }
}
```
