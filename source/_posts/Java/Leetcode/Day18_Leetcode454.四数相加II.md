---
title: Leetcode 454.四数相加II
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-1 20:00:00
copyright: false
description: Leetcode 454.四数相加II
cover: ../image/Java/算法Leetcode/Day18_Leetcode454.四数相加II/1.JPG
---



# Leetcode 454.四数相加II
## 题目要求
* 给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足：

* 0 <= i, j, k, l < n
* nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0

**示例 1：**
输入：nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
输出：2
解释：
两个元组如下：
1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0

**示例 2：**
输入：nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
输出：1

## 提交
### HashMap
利用一个Map存储数组1和数组2的和作为key，value为该和出现的次数
然后两个for循环遍历数组3和4，统计和为0出现的次数即可

```java
class Solution {
    public int fourSumCount(int[] A, int[] B, int[] C, int[] D) {
        Map<Integer, Integer> map = new HashMap<>();

        int res = 0;
        for(int i = 0;i<A.length;i++){
            for(int j= 0;j<B.length;j++){
                int sumAB = A[i]+B[j];
                if(map.containsKey(sumAB)) map.put(sumAB,map.get(sumAB)+1);
                else map.put(sumAB,1);
            }
        }

        for(int i = 0;i<C.length;i++){
            for(int j = 0;j<D.length;j++){
                int sumCD = -(C[i]+D[j]);
                if(map.containsKey(sumCD)) res += map.get(sumCD);
            }
        }
        return res;
    }
}
```
