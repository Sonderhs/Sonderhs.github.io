---
title: Markdown基础语法
tags: markdown
categories: markdown
top_img: transparent
date: 2023-12-28 00:00:00
copyright: false
description: markdown基础语法
cover: ../image/Markdown/markdown语法基础/1.PNG
---

# 一、一级标题

一个#表示一级标题

## 1 二级标题

两个##表示二级标题

### 1.1 三级标题

三个###表示三级标题

### 1.2 两个空格+换行符：换行  
换行


### 1.3 间空一行：换段

### 1.4 调  
1.加粗 **在字的两端加上两个星号**，或者**ctrl+b**
2.斜体  *在字的两端加一个星号*

### 1.5 有序列表  
1.5.1 1.+空格
1.5.2. 回车自动编号
    1.5.2.1. 二级标题


### 1.6 插入图片或视频
插入图片语法：
```
!+[图片描述]+(图片相对路径)
```
插入视频语法：
```
<video src="相对路径" autoplay="true" controls="controls" width="800" height="400">
</video>
```

### 1.7 表格
使用竖线划分
第一行为表头
第二行为对齐方式（冒号在左边表示左对齐，冒号在右边表示右对齐，冒号在中间表示居中）
第三行表示内容
| 小明 | 小红 | 小强 |
| ---- | ---- | ---- |
| 1.2  | 1.5  | 1.7  |

alt+shift+f格式化表格形式
### 1.8 添加链接
这是一个[链接](https://www.bilibili.com/video/BV1si4y1472o/?spm_id_from=333.337.search-card.all.click&vd_source=2fdc486181b2991ef85aa5040ec81a32)  
直接复制粘贴，markdown自动识别URL


### 1.9 添加代码块

用三个波浪线~~~括起来，指定语言后有高亮

~~~C

#include<stdio.h>

int main(){
    printf("hello world!");
    return 0;
}

~~~

### 1.10 关于基础语法的文章

[链接](https://www.limfx.pro/ReadArticle/57/yi-zhong-xie-zuo-de-xin-fang-fa)

### 1.11 禅模式
ctrl+k-->z

参考资料：
[Markdown官方教程](https://markdown.com.cn/)