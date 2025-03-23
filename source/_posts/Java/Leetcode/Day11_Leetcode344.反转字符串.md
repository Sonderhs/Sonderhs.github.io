---
title: Leetcode 344.反转字符串
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-23 19:00:00
copyright: false
description: Leetcode 344.反转字符串
cover: ../image/Java/算法Leetcode/Day11_Leetcode344.反转字符串/1.JPG
---



# Leetcode 344.反转字符串
## 题目要求
* 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。
* 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。


**示例 1：**
输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]
**示例2：**
输入：s = ["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]

## 提交
### 双指针遍历字符串
两个指针一前一后往中间靠拢，并交换字符
终止条件为i<j


```java
class Solution {
    public void reverseString(char[] s) {
        int i = 0;
        int j = s.length - 1;
        while (i < j) {
            char temp = s[i];
            s[i] = s[j];
            s[j] = temp;
            i++;
            j--;
        }
    }
}
```

