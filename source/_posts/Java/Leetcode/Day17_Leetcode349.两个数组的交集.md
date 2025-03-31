---
title: Leetcode 349.两个数组的交集
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-31 20:00:00
copyright: false
description: Leetcode 349.两个数组的交集
cover: ../image/Java/算法Leetcode/Day17_Leetcode349.两个数组的交集/1.JPG
---



# Leetcode 349.两个数组的交集
## 题目要求
* 给定两个数组 nums1 和 nums2 ，返回 它们的 交集 。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。

**示例 1：**
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]

**示例 2：**
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]
解释：[4,9] 也是可通过的

## 提交
### HashSet
因为我们只需要判断某元素是否存在，而不用统计次数，
所以利用HashSet存储num1中的元素，再遍历nums2，看nums2中的元素在HashSet中是否存在，存在即为交集

```java
class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        HashSet<Integer> set = new HashSet<Integer>();
        HashSet<Integer> result = new HashSet<>();
        for (int i = 0; i < nums1.length; i++) {
            set.add(nums1[i]);
        }

        for (int i = 0; i < nums2.length; i++) {
            if (set.contains(nums2[i])) {
                result.add(nums2[i]);
            }
        }
        int[] res = new int[result.size()];
        int i = 0;
        for (Integer integer : result) {
            res[i++] = integer;
        }
        return res;
    }
}
```
