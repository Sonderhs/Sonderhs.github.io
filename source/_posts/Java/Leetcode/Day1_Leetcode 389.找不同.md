---
title: Leetcode 389.找不同
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-13 00:00:00
copyright: false
description: Leetcode 389.找不同
cover: ../image/Java/算法Leetcode/Day1_Leetcode389.找不同/1.JPG
---

# Leetcode 389.找不同
## 题目要求

* 给定两个字符串 s 和 t ，它们只包含小写字母。
* 字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。
* 请找出在 t 中被添加的字母。

 

**示例 1：**
输入：s = "abcd", t = "abcde"
输出："e"
解释：'e' 是那个被添加的字母。
**示例 2：**
输入：s = "", t = "y"
输出："y"
 
## 提交
```java
import java.util.Arrays;

class Solution {
    public char findTheDifference(String s, String t) {
        //如果s为空则t就是所求的字母
        if(s.isEmpty()){
            return t.charAt(0);
        }
        //将s和t存储到数组中，用sort排序后逐个比对
        Character[] a1 = new Character[s.length()];
        Character[] a2 = new Character[t.length()];
        for (int i = 0; i < s.length(); i++) {
            a1[i] = s.charAt(i);
        }
        for (int i = 0; i < t.length(); i++) {
            a2[i] = t.charAt(i);
        }
        Arrays.sort(a1);
        Arrays.sort(a2);
        //如果遇到不一样的说明t[i]就是所求字母
        for (int i = 0; i < a1.length; i++) {
            if (!a1[i].equals(a2[i])) {
                return a2[i];
            }
        }
        //如果前a1.length个字母都一样，那么a2的最后一个字母就是所求字母
        return a2[a2.length - 1];
    }
}
```

## 官方答案
### 方法一：计数
首先遍历字符串 s，对其中的每个字符都将计数值加 1；然后遍历字符串 t，对其中的每个字符都将计数值减 1。当发现某个字符计数值为负数时，说明该字符在字符串 t 中出现的次数大于在字符串 s 中出现的次数，因此该字符为被添加的字符。

复杂度分析:
时间复杂度：O(N)，其中 N 为字符串的长度。
空间复杂度：O(∣Σ∣)，其中 Σ 是字符集，这道题中字符串只包含小写字母，∣Σ∣=26。需要使用数组对每个字符计数。
```java
class Solution {
    public char findTheDifference(String s, String t) {
        int[] cnt = new int[26];
        for (int i = 0; i < s.length(); ++i) {
            char ch = s.charAt(i);
            cnt[ch - 'a']++;
        }
        for (int i = 0; i < t.length(); ++i) {
            char ch = t.charAt(i);
            cnt[ch - 'a']--;
            if (cnt[ch - 'a'] < 0) {
                return ch;
            }
        }
        return ' ';
    }
}
```
### 方法二：求和
将字符串s中每个字符的ASCII码的值求和,得到As;对字符串t同样的方法得到At。两者的差值At−As即代表了被添加的字符。

复杂度分析:
时间复杂度：O(N)。
空间复杂度：O(1)。
```java
class Solution {
    public char findTheDifference(String s, String t) {
        int as = 0, at = 0;
        for (int i = 0; i < s.length(); ++i) {
            as += s.charAt(i);
        }
        for (int i = 0; i < t.length(); ++i) {
            at += t.charAt(i);
        }
        return (char) (at - as);
    }
}
```

### 方法三：位运算
如果将两个字符串拼接成一个字符串，则问题转换成求字符串中出现奇数次的字符。类似于「136. 只出现一次的数字」，我们使用位运算的技巧解决本题。

复杂度分析:
时间复杂度：O(N)。
空间复杂度：O(1)。
```java
class Solution {
    public char findTheDifference(String s, String t) {
        int ret = 0;
        for (int i = 0; i < s.length(); ++i) {
            ret ^= s.charAt(i);
        }
        for (int i = 0; i < t.length(); ++i) {
            ret ^= t.charAt(i);
        }
        return (char) ret;
    }
}
```