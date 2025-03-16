---
title: Leetcode 242.有效的字母异位词
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-15 00:00:00
copyright: false
description: Leetcode 242.有效的字母异位词
cover: ../image/Java/算法Leetcode/Day3_Leetcode242.有效的字母异位词/1.JPG
---

# Leetcode 242.有效的字母异位词
## 题目要求
* 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的 字母异位词。

 
**示例 1：**
输入: s = "anagram", t = "nagaram"
输出: true
**示例 2：**
输入: s = "rat", t = "car"
输出: false


## 提交
```java
class Solution {
    public boolean isAnagram(String s, String t) {
        int m = s.length();
        int n = t.length();
        if(m != n){
            return false;
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
        for (int i = 0; i < a1.length; i++) {
            if (!a1[i].equals(a2[i])) {
                return false;
            }
        }
        return true;
    }
}
```

## 官方答案
### 方法一：排序
**思路及算法：**
t 是 s 的异位词等价于「两个字符串排序后相等」。因此我们可以对字符串 s 和 t 分别排序，看排序后的字符串是否相等即可判断。此外，如果 s 和 t 的长度不同，t 必然不是 s 的异位词。

**复杂度分析：**
* 时间复杂度：O(nlogn)，其中 n 为 s 的长度。排序的时间复杂度为 O(nlogn)，比较两个字符串是否相等时间复杂度为 O(n)，因此总体时间复杂度为 O(nlogn+n)=O(nlogn)。
* 空间复杂度：O(1)。空间复杂度：O(logn)。排序需要 O(logn) 的空间复杂度。注意，在某些语言（比如 Java & JavaScript）中字符串是不可变的，因此我们需要额外的 O(n) 的空间来拷贝字符串。但是我们忽略这一复杂度分析，因为：
  * 这依赖于语言的细节；
  * 这取决于函数的设计方式，例如，可以将函数参数类型更改为 char[]。


```java
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }
        char[] str1 = s.toCharArray();
        char[] str2 = t.toCharArray();
        Arrays.sort(str1);
        Arrays.sort(str2);
        return Arrays.equals(str1, str2);
    }
}
```

### 方法二：哈希表
**思路及算法：**
从另一个角度考虑，t 是 s 的异位词等价于「两个字符串中字符出现的种类和次数均相等」。由于字符串只包含 26 个小写字母，因此我们可以维护一个长度为 26 的频次数组 table，先遍历记录字符串 s 中字符出现的频次，然后遍历字符串 t，减去 table 中对应的频次，如果出现 table[i]<0，则说明 t 包含一个不在 s 中的额外字符，返回 false 即可。

**复杂度分析：**
* 时间复杂度：O(n)，其中 n 为 s 的长度。
* 空间复杂度：O(S)，其中 S 为字符集大小，此处 S=26。

```java
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }
        int[] table = new int[26];
        for (int i = 0; i < s.length(); i++) {
            table[s.charAt(i) - 'a']++;
        }
        for (int i = 0; i < t.length(); i++) {
            table[t.charAt(i) - 'a']--;
            if (table[t.charAt(i) - 'a'] < 0) {
                return false;
            }
        }
        return true;
    }
}
```