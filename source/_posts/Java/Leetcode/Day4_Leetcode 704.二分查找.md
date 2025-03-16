---
title: Leetcode 704.二分查找
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-16 00:00:00
copyright: false
description: Leetcode 704.二分查找
cover: ../image/Java/算法Leetcode/Day4_Leetcode704.二分查找/1.JPG
---

# Leetcode 704.二分查找
## 题目要求
* 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

 
**示例 1：**
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4
**示例 2：**
输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1


## 提交
```java
class Solution {
    public int search(int[] nums, int target) {
        int high = nums.length - 1; 
        int low = 0;
        while (low <= high) {
            //求出中间位置
            int mid = (low + high) / 2; 
            //如果mid位置元素等于target则直接返回mid
            if (nums[mid] == target) {
                return mid;
            }else if (nums[mid] < target) {
                low = mid + 1;  //如果中间位置小于target，则去数组的右半边找，即把low移动到中间 
            }else {
                high = mid - 1;  //如果中间位置大于target，则去数组的左半边找，即把high移动到中间 
            }
        }
        return -1;
    }
}
```

## 官方答案
### 方法一：二分查找
**思路及算法：**
在升序数组 nums 中寻找目标值 target，对于特定下标 i，比较 nums[i] 和 target 的大小：
* 如果 nums[i]=target，则下标 i 即为要寻找的下标；
* 如果 nums[i]>target，则 target 只可能在下标 i 的左侧；
* 如果 nums[i]<target，则 target 只可能在下标 i 的右侧。
基于上述事实，可以在有序数组中使用二分查找寻找目标值。

二分查找的做法是，定义查找的范围 [left,right]，初始查找范围是整个数组。每次取查找范围的中点 mid，比较 nums[mid] 和 target 的大小，如果相等则 mid 即为要寻找的下标，如果不相等则根据 nums[mid] 和 target 的大小关系将查找范围缩小一半。
由于每次查找都会将查找范围缩小一半，因此二分查找的时间复杂度是 O(logn)，其中 n 是数组的长度。
二分查找的条件是查找范围不为空，即 left≤right。如果 target 在数组中，二分查找可以保证找到 target，返回 target 在数组中的下标。如果 target 不在数组中，则当 left>right 时结束查找，返回 −1。

```java
class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = (right - left) / 2 + left;
            int num = nums[mid];
            if (num == target) {
                return mid;
            } else if (num > target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return -1;
    }
}
```