---
title: Markdown基础语法
tags: markdown
categories: markdown
top_img: ../image/markdown%E8%AF%AD%E6%B3%95%E5%9F%BA%E7%A1%80/1.PNG
date: 2023-12-28 00:00:00
copyright: false
description: markdown基础语法
cover: ../image/markdown%E8%AF%AD%E6%B3%95%E5%9F%BA%E7%A1%80/1.PNG
---

# 一、一级标题

一个#表示一级标题

## 1.二级标题

两个##表示二级标题

### 1.1三级标题

三个###表示三级标题

### 1.2两个空格+换行符：换行  
换行


### 1.3中间空一行：换段

### 1.4强调  
1.加粗 **在字的两端加上两个星号**，或者**ctrl+b**
2.斜体  *在字的两端加一个星号*

### 1.5有序列表  
1.5.1 1.+空格
1.5.2. 回车自动编号
    1.5.2.1. 二级标题


### 1.6插入图片
![](/image/markdown%E8%AF%AD%E6%B3%95%E5%9F%BA%E7%A1%80/1.PNG)
*小樱*（）给图片加入文字说明

插入图片语法  
!+[ ]+( )

### 1.7表格
使用竖线划分  sakura
| 小明 | 小红 | 小强 |
| ---- | ---- | ---- |
| 1.2  | 1.5  | 1.7  |

alt+shift+f格式化表格形式
### 1.8添加链接
这是一个[链接](https://www.bilibili.com/video/BV1si4y1472o/?spm_id_from=333.337.search-card.all.click&vd_source=2fdc486181b2991ef85aa5040ec81a32)  
直接复制粘贴，markdown自动识别URL


### 1.9添加代码块

用三个波浪线~~~括起来，指定语言后有高亮

~~~C

#include<stdio.h>

int main(){
    printf("hello world!");
    return 0;
}

~~~

### 1.10关于基础语法的文章

[链接](https://www.limfx.pro/ReadArticle/57/yi-zhong-xie-zuo-de-xin-fang-fa)

### 1.11禅模式
ctrl+k-->z