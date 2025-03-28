---
title: Leetcode 1047.删除字符串中的所有相邻重复项
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-28 21:00:00
copyright: false
description: Leetcode 1047.删除字符串中的所有相邻重复项
cover: ../image/Java/算法Leetcode/Day14_Leetcode1047.删除字符串中的所有相邻重复项/1.JPG
---


# 1047.删除字符串中的所有相邻重复项
## 题目要求
* 给出由小写字母组成的字符串 s，重复项删除操作会选择两个相邻且相同的字母，并删除它们。
* 在 s 上反复执行重复项删除操作，直到无法继续删除。
* 在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。

 
**示例 1：**
输入："abbaca"
输出："ca"
解释：
例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。

## 提交
### 利用栈实现
遍历字符串，如果当前字母与栈顶字母不同则入栈，相同则弹出栈顶元素，最后剩余的就是所求字符串
需要注意的是最后剩余的字目出栈后组成的字符串与所求字符串相反，需要reverse

![](/image/Java/算法Leetcode/Day14_Leetcode1047.删除字符串中的所有相邻重复项/1047.删除字符串中的所有相邻重复项.gif)

```java
class Solution {
    public String removeDuplicates(String s) {
        Stack<Character> stack = new Stack<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if(!stack.isEmpty() && stack.peek() == c) {
                stack.pop();
            }else {
                stack.push(c);
            }
        }
        StringBuilder sb = new StringBuilder();
        while (!stack.isEmpty()) {
            sb.append(stack.pop());
        }
        sb.reverse();
        return sb.toString();
    }
}
```

### 拓展：双指针
利用双指针确定重复的字符串
```java
class Solution {
    public String removeDuplicates(String s) {
        char[] ch = s.toCharArray();
        int fast = 0;
        int slow = 0;
        while(fast < s.length()){
            // 直接用fast指针覆盖slow指针的值
            ch[slow] = ch[fast];
            // 遇到前后相同值的，就跳过，即slow指针后退一步，下次循环就可以直接被覆盖掉了
            if(slow > 0 && ch[slow] == ch[slow - 1]){
                slow--;
            }else{
                slow++;
            }
            fast++;
        }
        return new String(ch,0,slow);
    }
}
```
