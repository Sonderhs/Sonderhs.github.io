---
title: Leetcode 209.长度最小的子数组
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-17 20:00:00
copyright: false
description: Leetcode 209.长度最小的子数组
cover: ../image/Java/算法Leetcode/Day5_Leetcode209.长度最小的子数组/1.JPG
---

# Leetcode 209.长度最小的子数组
## 题目要求
* 给定一个含有 n 个正整数的数组和一个正整数 target 。
找出该数组中满足其总和大于等于 target 的长度最小的 **子数组** [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

 
**示例 1：**
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
**示例 2：**
输入：target = 4, nums = [1,4,4]
输出：1
**示例3：**
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0


## 提交
```java
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int i = 0, j = 0;
        int sum = 0;
        int result = Integer.MAX_VALUE;
        //滑动窗口
        //j一直往右滑，直到sum>=target
        //如果=则返回
        //如果>则将左侧i往右滑
        for(j = 0; j < nums.length; j++) {
            sum += nums[j];
            while(sum >= target) {
                result = Math.min(result, j - i + 1);
                sum -= nums[i];
                i++;
            }
        }
        return result == Integer.MAX_VALUE ? 0 : result;
    }
}
```
![滑动窗口](/image/Java/算法Leetcode/Day5_Leetcode209.长度最小的子数组/滑动窗口.gif)

## 官方答案
### 方法一：暴力法
**思路及算法：**
暴力法是最直观的方法。初始化子数组的最小长度为无穷大，枚举数组 nums 中的每个下标作为子数组的开始下标，对于每个开始下标 i，需要找到大于或等于 i 的最小下标 j，使得从 nums[i] 到 nums[j] 的元素和大于或等于 s，并更新子数组的最小长度（此时子数组的长度是 j−i+1）。

**复杂度分析：**
* 时间复杂度：时间复杂度：O(n^2)，其中 n 是数组的长度。需要遍历每个下标作为子数组的开始下标，对于每个开始下标，需要遍历其后面的下标得到长度最小的子数组。
* 空间复杂度：O(1)。

```java
class Solution {
    public int minSubArrayLen(int s, int[] nums) {
        int n = nums.length;
        if (n == 0) {
            return 0;
        }
        int ans = Integer.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = i; j < n; j++) {
                sum += nums[j];
                if (sum >= s) {
                    ans = Math.min(ans, j - i + 1);
                    break;
                }
            }
        }
        return ans == Integer.MAX_VALUE ? 0 : ans;
    }
}
```

### 方法二：前缀和 + 二分查找
**思路与算法：**
方法一的时间复杂度是 O(n^2)，因为在确定每个子数组的开始下标后，找到长度最小的子数组需要 O(n) 的时间。如果使用二分查找，则可以将时间优化到 O(logn)。

为了使用二分查找，需要额外创建一个数组 sums 用于存储数组 nums 的前缀和，其中 sums[i] 表示从 nums[0] 到 nums[i−1] 的元素和。得到前缀和之后，对于每个开始下标 i，可通过二分查找得到大于或等于 i 的最小下标 bound，使得 sums[bound]−sums[i−1]≥s，并更新子数组的最小长度（此时子数组的长度是 bound−(i−1)）。

因为这道题保证了数组中每个元素都为正，所以前缀和一定是递增的，这一点保证了二分的正确性。如果题目没有说明数组中每个元素都为正，这里就不能使用二分来查找这个位置了。

**复杂度分析:**
* 时间复杂度：O(nlogn)，其中 n 是数组的长度。需要遍历每个下标作为子数组的开始下标，遍历的时间复杂度是 O(n)，对于每个开始下标，需要通过二分查找得到长度最小的子数组，二分查找得时间复杂度是 O(logn)，因此总时间复杂度是 O(nlogn)。
* 空间复杂度：O(n)，其中 n 是数组的长度。额外创建数组 sums 存储前缀和。


```java
class Solution {
    public int minSubArrayLen(int s, int[] nums) {
        int n = nums.length;
        if (n == 0) {
            return 0;
        }
        int ans = Integer.MAX_VALUE;
        int[] sums = new int[n + 1]; 
        // 为了方便计算，令 size = n + 1 
        // sums[0] = 0 意味着前 0 个元素的前缀和为 0
        // sums[1] = A[0] 前 1 个元素的前缀和为 A[0]
        // 以此类推
        for (int i = 1; i <= n; i++) {
            sums[i] = sums[i - 1] + nums[i - 1];
        }
        for (int i = 1; i <= n; i++) {
            int target = s + sums[i - 1];
            int bound = Arrays.binarySearch(sums, target);
            if (bound < 0) {
                bound = -bound - 1;
            }
            if (bound <= n) {
                ans = Math.min(ans, bound - (i - 1));
            }
        }
        return ans == Integer.MAX_VALUE ? 0 : ans;
    }
}
```
### 方法三：滑动窗口
**思路与算法：**
在方法一和方法二中，都是每次确定子数组的开始下标，然后得到长度最小的子数组，因此时间复杂度较高。为了降低时间复杂度，可以使用滑动窗口的方法。
定义两个指针 start 和 end 分别表示子数组（滑动窗口窗口）的开始位置和结束位置，维护变量 sum 存储子数组中的元素和（即从 nums[start] 到 nums[end] 的元素和）。
初始状态下，start 和 end 都指向下标 0，sum 的值为 0。
每一轮迭代，将 nums[end] 加到 sum，如果 sum≥s，则更新子数组的最小长度（此时子数组的长度是 end−start+1），然后将 nums[start] 从 sum 中减去并将 start 右移，直到 sum<s，在此过程中同样更新子数组的最小长度。在每一轮迭代的最后，将 end 右移。

**复杂度分析:**
* 时间复杂度：O(n)，其中 n 是数组的长度。指针 start 和 end 最多各移动 n 次。
* 空间复杂度：O(1)。


```java
class Solution {
    public int minSubArrayLen(int s, int[] nums) {
        int n = nums.length;
        if (n == 0) {
            return 0;
        }
        int ans = Integer.MAX_VALUE;
        int start = 0, end = 0;
        int sum = 0;
        while (end < n) {
            sum += nums[end];
            while (sum >= s) {
                ans = Math.min(ans, end - start + 1);
                sum -= nums[start];
                start++;
            }
            end++;
        }
        return ans == Integer.MAX_VALUE ? 0 : ans;
    }
}
```