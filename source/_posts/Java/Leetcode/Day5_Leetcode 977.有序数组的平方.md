---
title: Leetcode 977.有序数组的平方
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-17 19:00:00
copyright: false
description: Leetcode 977.有序数组的平方
cover: ../image/Java/算法Leetcode/Day5_Leetcode977.有序数组的平方/1.JPG
---

# Leetcode 977.有序数组的平方
## 题目要求
* 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

 
**示例 1：**
输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]
**示例 2：**
输入：nums = [-7,-3,2,3,11]
输出：[4,9,9,49,121]


## 提交
```java
class Solution {
    public int[] sortedSquares(int[] nums) {
        int[] res = new int[nums.length];
        int i = 0, j = nums.length - 1;
        int k = res.length - 1;
        //双指针法，两边哪个值大就存在新数组的右边
        while (i <= j) {
            if (nums[i] * nums[i] < nums[j] * nums[j]) {
                res[k] = nums[j] * nums[j];
                j--;
            }else {
                res[k] = nums[i] * nums[i];
                i++;
            }
            k--;
        }
        return res;
    }
}
```

## 官方答案
### 方法一：直接排序
**思路及算法：**
最简单的方法就是将数组 nums 中的数平方后直接排序。

**复杂度分析：**
* 时间复杂度：O(nlogn)，其中 n 是数组 nums 的长度。
* 空间复杂度：O(logn)。除了存储答案的数组以外，我们需要 O(logn) 的栈空间进行排序。

```java
class Solution {
    public int[] sortedSquares(int[] nums) {
        int[] ans = new int[nums.length];
        for (int i = 0; i < nums.length; ++i) {
            ans[i] = nums[i] * nums[i];
        }
        Arrays.sort(ans);
        return ans;
    }
}
```

### 方法二：双指针
**思路与算法：**
同样地，我们可以使用两个指针分别指向位置 0 和 n−1，每次比较两个指针对应的数，选择较大的那个逆序放入答案并移动指针。这种方法无需处理某一指针移动至边界的情况，读者可以仔细思考其精髓所在。

**复杂度分析:**
* 时间复杂度：O(n)，其中 n 是数组 nums 的长度。
* 空间复杂度：O(1)。除了存储答案的数组以外，我们只需要维护常量空间。

```java
cclass Solution {
    public int[] sortedSquares(int[] nums) {
        int n = nums.length;
        int[] ans = new int[n];
        for (int i = 0, j = n - 1, pos = n - 1; i <= j;) {
            if (nums[i] * nums[i] > nums[j] * nums[j]) {
                ans[pos] = nums[i] * nums[i];
                ++i;
            } else {
                ans[pos] = nums[j] * nums[j];
                --j;
            }
            --pos;
        }
        return ans;
    }
}
```