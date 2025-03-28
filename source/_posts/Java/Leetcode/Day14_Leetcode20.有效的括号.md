---
title: Leetcode 20.有效的括号
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-28 20:00:00
copyright: false
description: Leetcode 20.有效的括号
cover: ../image/Java/算法Leetcode/Day14_Leetcode20.有效的括号/1.JPG
---



# Leetcode 20.有效的括号
## 题目要求
* 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

* 有效字符串需满足：
  * 左括号必须用相同类型的右括号闭合。
  * 左括号必须以正确的顺序闭合。
  * 每个右括号都有一个对应的相同类型的左括号。


**示例 1：**
输入：s = "()"
输出：true

**示例 2：**
输入：s = "()[]{}"
输出：true

**示例 3：**
输入：s = "(]"
输出：false

**示例 4：**
输入：s = "([])"
输出：true

## 提交
### 栈实现括号匹配
比较简单的想法是遇见左括号就将左括号入栈，遇见匹配的右括号就将栈顶元素出栈，但是这种方法在判断右括号是否匹配时比较麻烦
所以更简单的方法是遇见左括号时直接入栈对应的右括号，这样在遇到右括号时只需判断是否跟栈顶元素相同即可
![](/image/Java/算法Leetcode/Day14_Leetcode20.有效的括号/20.有效的括号.gif)

```java
class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if(c == '('){
                stack.push(')');
            }else if(c == '['){
                stack.push(']');
            }else if(c == '{'){
                stack.push('}');
            }else if (stack.isEmpty() || stack.peek() != c) {
                return false;
            }else {//如果是右括号判断是否和栈顶元素匹配
                stack.pop();
            }
        }
        return stack.isEmpty();
    }
}
```

