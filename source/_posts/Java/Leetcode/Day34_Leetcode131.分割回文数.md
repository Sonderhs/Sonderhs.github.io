---
title: Leetcode 131.分割回文数
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-21 20:00:00
copyright: false
description: Leetcode 131.分割回文数
cover: ../image/Java/算法Leetcode/Day34_Leetcode131.分割回文数/1.JPG
---



# Leetcode 131.分割回文数
## 题目要求
* 给你一个字符串 s，请你将 s 分割成一些 子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。


**示例 1：**
输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]

**示例 2：**
输入：s = "a"
输出：[["a"]]


## 回溯法

![](/image/Java/算法Leetcode/Day34_Leetcode131.分割回文数/分割.jpg)

```java
class Solution {
    private List<List<String>> res = new ArrayList<>();
    private List<String> path = new ArrayList<>();

    public List<List<String>> partition(String s) {
        backtracking(s, 0, new StringBuilder());
        return res;
    }

    public void backtracking(String s, int startIndex, StringBuilder sb) {
        if (startIndex == s.length()) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = startIndex; i < s.length(); i++) {
            // sb用于存储当前的回文子串
            sb.append(s.charAt(i));
            // 如果当前子串是回文串在进行递归
            if (isPalindrome(sb)){
                path.add(sb.toString());
                backtracking(s, i + 1, new StringBuilder());
                path.remove(path.size() - 1);
            }
        }
    }

    public boolean isPalindrome(StringBuilder sb) {
        for (int i = 0; i < sb.length()/ 2; i++){
            if (sb.charAt(i) != sb.charAt(sb.length() - 1 - i)){return false;}
        }
        return true;
    }
}
```
