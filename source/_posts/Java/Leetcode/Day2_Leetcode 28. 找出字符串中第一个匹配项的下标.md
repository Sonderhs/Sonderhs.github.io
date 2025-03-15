---
title: Leetcode 28.找出字符串中第一个匹配项的下标
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-14 00:00:00
copyright: false
description: Leetcode 28.找出字符串中第一个匹配项的下标
cover: ../image/Java/算法Leetcode/Day2_Leetcode28.找出字符串中第一个匹配项的下标/1.JPG
---

# Leetcode 28.找出字符串中第一个匹配项的下标
## 题目要求
* 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。如果 needle 不是 haystack 的一部分，则返回  -1 。

 
**示例 1：**
输入：haystack = "sadbutsad", needle = "sad"
输出：0
解释："sad" 在下标 0 和 6 处匹配。
第一个匹配项的下标是 0 ，所以返回 0 。

**示例 2：**
输入：haystack = "leetcode", needle = "leeto"
输出：-1
解释："leeto" 没有在 "leetcode" 中出现，所以返回 -1 。


## 提交
```java
class Solution {
    public int strStr(String haystack, String needle) {
        if (needle.isEmpty() || haystack.isEmpty()) {
            return -1;
        }
        int m = haystack.length();
        int n = needle.length();
        int i = 0;
        //外层循环控制从haystack中开始比对的位置
        for (i = 0; i <= m - n; i++) {
            int j;
            //内层循环控制整个needle字符串的比对
            for (j = 0; j < n; j++) {
                if (haystack.charAt(i + j) != needle.charAt(j)) {
                    break;
                }
            }
            //如果全部比对完成则j==n，i即为所求位置
            if (j == n) {
                return i;
            }
        }
        return -1;
    }
}
```

## 官方答案
### 方法一：暴力匹配
**思路及算法：**
我们可以让字符串 needle 与字符串 haystack 的所有长度为 m 的子串均匹配一次。
为了减少不必要的匹配，我们每次匹配失败即立刻停止当前子串的匹配，对下一个子串继续匹配。如果当前子串匹配成功，我们返回当前子串的开始位置即可。如果所有子串都匹配失败，则返回 −1。
**复杂度分析：**
* 时间复杂度：O(n×m)，其中 n 是字符串 haystack 的长度，m 是字符串 needle 的长度。最坏情况下我们需要将字符串 needle 与字符串 haystack 的所有长度为 m 的子串均匹配一次。
* 空间复杂度：O(1)。我们只需要常数的空间保存若干变量。

```java
class Solution {
    public int strStr(String haystack, String needle) {
        int n = haystack.length(), m = needle.length();
        for (int i = 0; i + m <= n; i++) {
            boolean flag = true;
            for (int j = 0; j < m; j++) {
                if (haystack.charAt(i + j) != needle.charAt(j)) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                return i;
            }
        }
        return -1;
    }
}
```

### 方法二：Knuth-Morris-Pratt 算法
**思路及算法：**
Knuth-Morris-Pratt 算法，简称 KMP 算法，由 Donald Knuth、James H. Morris 和 Vaughan Pratt 三人于 1977 年联合发表。
记字符串 haystack 的长度为 n，字符串 needle 的长度为 m。
我们记字符串 str=needle+#+haystack，即将字符串 needle 和 haystack 进行拼接，并用不存在于两串中的特殊字符 # 将两串隔开，然后我们对字符串 str 求前缀函数。
因为特殊字符 # 的存在，字符串 str 中 haystack 部分的前缀函数所对应的真前缀必定落在字符串 needle 部分，真后缀必定落在字符串 haystack 部分。当 haystack 部分的前缀函数值为 m 时，我们就找到了一次字符串 needle 在字符串 haystack 中的出现（因为此时真前缀恰为字符串 needle）。
实现时，我们可以进行一定的优化，包括：
我们无需显式地创建字符串 str。
为了节约空间，我们只需要顺次遍历字符串 needle、特殊字符 # 和字符串 haystack 即可。
也无需显式地保存所有前缀函数的结果，而只需要保存字符串 needle 部分的前缀函数即可。
特殊字符 # 的前缀函数必定为 0，且易知 π(i)≤m（真前缀不可能包含特殊字符 #）。
这样我们计算 π(i) 时，j=π(π(π(…)−1)−1) 的所有的取值中仅有 π(i−1) 的下标可能大于等于 m。我们只需要保存前一个位置的前缀函数，其它的 j 的取值将全部为字符串 needle 部分的前缀函数。
我们也无需特别处理特殊字符 #，只需要注意处理字符串 haystack 的第一个位置对应的前缀函数时，直接设定 j 的初值为 0 即可。
这样我们可以将代码实现分为两部分：

第一部分是求 needle 部分的前缀函数，我们需要保留这部分的前缀函数值。
第二部分是求 haystack 部分的前缀函数，我们无需保留这部分的前缀函数值，只需要用一个变量记录上一个位置的前缀函数值即可。当某个位置的前缀函数值等于 m 时，说明我们就找到了一次字符串 needle 在字符串 haystack 中的出现（因为此时真前缀恰为字符串 needle，真后缀为以当前位置为结束位置的字符串 haystack 的子串），我们计算出起始位置，将其返回即可。

**复杂度分析:**
* 时间复杂度：O(n+m)，其中 n 是字符串 haystack 的长度，m 是字符串 needle 的长度。我们至多需要遍历两字符串一次。
* 空间复杂度：O(m)，其中 m 是字符串 needle 的长度。我们只需要保存字符串 needle 的前缀函数。

```java
class Solution {
    public int strStr(String haystack, String needle) {
        int n = haystack.length(), m = needle.length();
        if (m == 0) {
            return 0;
        }
        int[] pi = new int[m];
        for (int i = 1, j = 0; i < m; i++) {
            while (j > 0 && needle.charAt(i) != needle.charAt(j)) {
                j = pi[j - 1];
            }
            if (needle.charAt(i) == needle.charAt(j)) {
                j++;
            }
            pi[i] = j;
        }
        for (int i = 0, j = 0; i < n; i++) {
            while (j > 0 && haystack.charAt(i) != needle.charAt(j)) {
                j = pi[j - 1];
            }
            if (haystack.charAt(i) == needle.charAt(j)) {
                j++;
            }
            if (j == m) {
                return i - m + 1;
            }
        }
        return -1;
    }
}
```