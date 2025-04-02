---
title: Leetcode 18.四数之和
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-2 20:00:00
copyright: false
description: Leetcode 18.四数之和
cover: ../image/Java/算法Leetcode/Day19_Leetcode18.四数之和/1.JPG
---



# Leetcode 18.四数之和
## 题目要求
* 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：

* 0 <= a, b, c, d < n
* a、b、c 和 d 互不相同
* nums[a] + nums[b] + nums[c] + nums[d] == target
* 你可以按 任意顺序 返回答案 。

**示例 1：**
输入：nums = [1,0,-1,0,-2,2], target = 0
输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

**示例 2：**
输入：nums = [2,2,2,2,2], target = 8
输出：[[2,2,2,2]]


## 提交
### 排序+双指针
与三数之和的解决思路类似
在最外层再套一层循环作为第一个数

```java
class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        // k控制第一个数
        for(int k = 0; k < nums.length; k++){
            // 首先对第一个数做剪枝
            // 由于这里target可能为负值，所以不能像三数之和中一样直接nums[k]>0
            // 比如当target为负值时，第一个数加第二个数，两个负数相加结果反而会变小
            // 所以我们这里需要使得nums[k] >= 0时剪枝(这时说明数组中均为正数，第一个数加第二个数会变大而不是变小)
            if(nums[k] > target && target >= 0) break;
            // 对第一个数做去重
            if(k > 0 && nums[k] == nums[k - 1]) continue;
            // i控制第二个数
            for(int i = k + 1; i < nums.length; i++){
                // 将i和k看做一个整体进行剪枝
                if(nums[i] + nums[k] > target && nums[i] + nums[k] >= 0) break;
                // 对i进行去重，因为i是从k+1开始的，所以需要满足i > k + 1
                if(i > k + 1&& nums[i] == nums[i - 1]) continue;
                // 剩余部分与三数之和思想相同
                int left = i + 1;
                int right = nums.length - 1;
                while(left < right){// 用long存储sum防止超出int范围
                    long sum = (long)nums[k] + nums[i] + nums[left] + nums[right];
                    if(sum > target){
                        right--;
                    }else if(sum < target){
                        left++;
                    }else{
                        res.add(Arrays.asList(nums[k], nums[i], nums[left], nums[right]));
                        // 对left和right进行去重
                        while(left < right && nums[left] == nums[left + 1]) left++;
                        while(left < right && nums[right] == nums[right - 1]) right--;
                        left++;
                        right--;
                    }
                    
                }
            }
        }
        return res;
    }
}
```
