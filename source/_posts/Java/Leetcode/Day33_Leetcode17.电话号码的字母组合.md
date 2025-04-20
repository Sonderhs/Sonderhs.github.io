---
title: Leetcode 17.电话号码的字母组合
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-20 20:00:00
copyright: false
description: Leetcode 17.电话号码的字母组合
cover: ../image/Java/算法Leetcode/Day33_Leetcode17.电话号码的字母组合/1.JPG
---



# Leetcode 17.电话号码的字母组合
## 题目要求
* 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

* 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![](/image/Java/算法Leetcode/Day33_Leetcode17.电话号码的字母组合/示例1.png)


**示例 1：**
输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]

**示例 2：**
输入：digits = ""
输出：[]

**示例 3:**
输入：digits = "2"
输出：["a","b","c"]


## 回溯法

使用j来控制当前循环中要遍历的字符串

```java
class Solution {
    public List<String> result = new ArrayList<>();
    public StringBuilder path = new StringBuilder();

    public List<String> letterCombinations(String digits) {
        if (digits.length() == 0) return result;
        Map<Character, String> map = new HashMap<>();
        map.put('2', "abc");
        map.put('3', "def");
        map.put('4', "ghi");
        map.put('5', "jkl");
        map.put('6', "mno");
        map.put('7', "pqrs");
        map.put('8', "tuv");
        map.put('9', "wxyz");

        backtrack(digits, map, 0);
        return result;
    }

    public void backtrack(String digits, Map<Character, String> map, int j) {
        if (path.length() == digits.length()) {
            result.add(path.toString());
            return;
        }
        String curStr = map.get(digits.charAt(j));
        for (int i = 0; i < curStr.length(); i++) {
            path.append(curStr.charAt(i));
            backtrack(digits, map, j + 1);
            path.deleteCharAt(path.length() - 1);
        }
    }
}
```