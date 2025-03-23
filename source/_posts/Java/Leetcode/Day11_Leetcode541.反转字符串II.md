---
title: Leetcode 541.反转字符串II
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-23 20:00:00
copyright: false
description: Leetcode 541.反转字符串II
cover: ../image/Java/算法Leetcode/Day11_Leetcode541.反转字符串II/1.JPG
---



# Leetcode 541.反转字符串II
## 题目要求
* 给定一个字符串 s 和一个整数 k，从字符串开头算起，每计数至 2k 个字符，就反转这 2k 字符中的前 k 个字符。

* 如果剩余字符少于 k 个，则将剩余字符全部反转。
* 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。


**示例 1：**
输入：s = "abcdefg", k = 2
输出："bacdfeg"
**示例2：**
输入：s = "abcd", k = 2
输出："bacd"

## 提交
### 每次处理2k个字符
根据不同情况反转指定位置的字符串即可

```java
class Solution {
    public String reverseStr(String s, int k) {
        int n = s.length();
        char[] arr = s.toCharArray();
        for (int i = 0; i < n; ) {
            //计算剩余字符
            int leave = n - i;

            //剩余字符大于或等于2k个，反转前k个
            if(leave >= 2*k){
                reverseStr2(arr, i, i + k - 1);
            }else if(leave < k) {  // 剩余字符小于k个，反转剩余所有字符
                reverseStr2(arr, i, n - 1);
            }else {  //剩余字符大于等于k个，小于2k个，反转前k个
                reverseStr2(arr, i, i + k - 1);
            }
            //i向前移动k位
            i += 2*k;
        }
        return new String(arr);
    }

    //用于反转指定起始位置和结束位置的字符串
    public static void reverseStr2(char[] arr, int start, int end) {
        for (int i = start, j = end; i < j; i++, j--) {
            char temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}
```

### 优化
反转每个下标从 2k 的倍数开始的，长度为 k 的子串。若该子串长度不足 k，则反转整个子串。

**复杂度分析：**
* 时间复杂度：O(n)，其中 n 是字符串 s 的长度。
* 空间复杂度：O(1) 或 O(n)，取决于使用的语言中字符串类型的性质。如果字符串是可修改的，那么我们可以直接在原字符串上修改，空间复杂度为 O(1)，否则需要使用 O(n) 的空间将字符串临时转换为可以修改的数据结构（例如数组），空间复杂度为 O(n)。

```java
class Solution {
    public String reverseStr(String s, int k) {
        int n = s.length();
        char[] arr = s.toCharArray();
        for (int i = 0; i < n; i += 2 * k) {
            reverse(arr, i, Math.min(i + k, n) - 1);
        }
        return new String(arr);
    }

    public void reverse(char[] arr, int left, int right) {
        while (left < right) {
            char temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }
}
```
