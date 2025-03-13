---
title: Leetcode 1768.交替合并字符串
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-13 00:00:00
copyright: false
description: Leetcode 1768.交替合并字符串
cover: ../image/Java/算法Leetcode/Day1_Leetcode1768.交替合并字符串/1.JPG
---

# Leetcode 1768.交替合并字符串
## 题目要求
* 给你两个字符串 word1 和 word2 。请你从 word1 开始，通过交替添加字母来合并字符串。如果一个字符串比另一个字符串长，就将多出来的字母追加到合并后字符串的末尾。
* 返回 合并后的字符串 。

 
**示例 1：**
输入：word1 = "abc", word2 = "pqr"
输出："apbqcr"
解释：字符串合并情况如下所示：
word1：  a   b   c
word2：    p   q   r
合并后：  a p b q c r

**示例 2：**
输入：word1 = "ab", word2 = "pqrs"
输出："apbqrs"
解释：注意，word2 比 word1 长，"rs" 需要追加到合并后字符串的末尾。
word1：  a   b 
word2：    p   q   r   s
合并后：  a p b q   r   s

**示例 3：**
输入：word1 = "abcd", word2 = "pq"
输出："apbqcd"
解释：注意，word1 比 word2 长，"cd" 需要追加到合并后字符串的末尾。
word1：  a   b   c   d
word2：    p   q 
合并后：  a p b q c   d


## 提交
```java
class Solution {
    public String mergeAlternately(String word1, String word2) {
        //使用StringBuilder存储字符串
        StringBuilder s = new StringBuilder();
        int i = 0;
        //先将共同长度的部分存入s
        while(i<word1.length()&&i<word2.length()) {
            s.append(word1.charAt(i));
            s.append(word2.charAt(i));
            i++;
        }
        //再将长的字符串的剩余部分存入s
        if(word1.length() < word2.length()) {
            for(int j=i; j<word2.length(); j++) {
                s.append(word2.charAt(j));
            }
        }else {
            for(int j=i; j<word1.length(); j++) {
                s.append(word1.charAt(j));
            }
        }
        return s.toString();
    }
}
```

## 官方答案
### 方法一：双指针
思路与算法：
我们直接按照题目的要求模拟即可。我们使用两个指针i和j，初始时分别指向两个字符串的首个位置。随后的每次循环中，依次进行如下的两步操作：
如果i没有超出word1的范围，就将word1[i]加入答案，并且将i移动一个位置；如果j没有超出word2的范围，就将word2[j]加入答案，并且将j移动一个位置。
当i和j都超出对应的范围后，结束循环并返回答案即可。

复杂度分析：
时间复杂度：O(m+n)，其中m和n分别是字符串word1和word2的长度。
空间复杂度：O(1) 或 O(m+n)。如果使用的语言支持可修改的字符串，那么空间复杂度为 O(1)，否则为 O(m+n)。注意这里不计入返回值需要的空间。


```java
class Solution {
    public String mergeAlternately(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int i = 0, j = 0;

        StringBuilder ans = new StringBuilder();
        while (i < m || j < n) {
            if (i < m) {
                ans.append(word1.charAt(i));
                ++i;
            }
            if (j < n) {
                ans.append(word2.charAt(j));
                ++j;
            }
        }
        return ans.toString();
    }
}
```