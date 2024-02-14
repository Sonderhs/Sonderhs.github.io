---
title: Markdown数学公式语法
tags: markdown
categories: markdown
top_img: ../image/markdown数学公式语法/0.JPG
date: 2023-12-29 00:00:00
copyright: false
description: markdown数学公式语法
cover: ../image/markdown数学公式语法/0.JPG
---

# Markdown数学公式语法
~~~
使用$将数学公式写在两个$之间。写在两个$$之间是把公式居中。 
~~~


## 一、上下标
^ 表示上标， _ 表示下标，如果上标或下标内容多于一个字符，则使用 {} 括起来。

例 ： 
~~~
$(x^2 + x^y)^{x^y}+ x_1^2= y_1 - y_2^{x_1-y_1^2}$ 
~~~
$(x^2 + x^y )^{x^y}+ x_1^2= y_1 - y_2^{x_1-y_1^2}$


## 二、分数
公式 \frac{分子}{分母}，或 分子 \over 分母

例 ： 
~~~
$\frac{1-x}{y+1}$ 或 $x \over x+y$ 
~~~

$\frac{1-x}{y+1}$ 或 $x \over x+y$


## 三、开方
公式\sqrt[n]{a}

例 ： 
~~~
$\sqrt[3]{4}$ 或 $\sqrt{9}$ 
~~~
$\sqrt[3]{4}$ 或 $\sqrt{9}$


## 四、括号

### 4.1 () [] 直接写就行，而 {} 则需要转义。
例 ： 
~~~
$f(x, y) = x^2 + y^2, x \epsilon [0, 100], y \epsilon \{1,2,3\}$ 
~~~
$f(x, y) = x^2 + y^2, x \epsilon [0, 100], y \epsilon \{1,2,3\}$

### 4.2 大括号，需要括号前加\left和\right。

例：
~~~
$(\sqrt{1 \over 2})^2$ 加大括号后 $\left(\sqrt{1 \over 2}\right)^2$ 
~~~

 $(\sqrt{1 \over 2})^2$ 加大括号后 $\left(\sqrt{1 \over 2}\right)^2$ 

 ### 4.3 \left 和 \right必须成对出现，对于不显示的一边可以使用 . 代替。

例： 
~~~
$\frac{du}{dx} | _{x=0}$ 加大后 $\left. \frac{du}{dx} \right| _{x=0}$
~~~
$\frac{du}{dx} | _{x=0}$ 加大后 $\left. \frac{du}{dx} \right| _{x=0}$

### 4.4 大括号

例 ： 
~~~
$y :\begin{cases} x+y=1\\ x-y = 0 \end{cases}$
~~~
$y :\begin{cases} x+y=1\\ x-y = 0 \end{cases}$


## 五、向量
公式\vec{a}

例 ： 
~~~
$\vec a \cdot \vec b = 1$ 
~~~

$\vec a \cdot \vec b = 1$


## 六、定积分
公式\int

例： 
~~~
符号：$\int$，示例公式：$\int_0^1x^2dx$
~~~

符号： ∫，示例公式： $\int_0^1x^2dx$


## 七、极限
公式\lim_{n\rightarrow+\infty}

例： 
~~~
符号：$\lim_{n\rightarrow+\infty}$
示例公式：$\lim_{n\rightarrow+\infty}\frac{1}{n}$ 
~~~

符号：$\lim_{n\rightarrow+\infty}$
示例公式：$\lim_{n\rightarrow+\infty}\frac{1}{n}$ 


## 八、累加/累乘
公式累加\sum_1^n, 累乘\prod_{i=0}^n

例： 
~~~
累加  $\sum_1^n$
累乘  $\prod_{i=0}^n$
~~~
累加  $\sum_1^n$  
累乘  $\prod_{i=0}^n$


## 九、省略号
公式\ldots 表示底线对其的省略号，\cdots 表示中线对其的省略号，\cdot点乘号。

例 ： 
~~~
$f(x_1,x_2,\ldots,x_n) = \left({1 \over x_1}\right)^2+\left({1 \over x_2}\right)^2+\cdots+\left({1 \over x_n}\right)^2$ 
~~~

$f(x_1,x_2,\ldots,x_n) = \left({1 \over x_1}\right)^2+\left({1 \over x_2}\right)^2+\cdots+\left({1 \over x_n}\right)^2$


## 十、符号 

### 10.1 数学符号 
![alt text](../image/markdown数学公式语法/数学符号.jpg)

### 10.2 三角函数 
![alt text](../image/markdown数学公式语法/三角函数.jpg)

### 10.3 定积分 
![alt text](../image/markdown数学公式语法/定积分.jpg)

### 10.4 集合
![alt text](../image/markdown数学公式语法/集合.jpg)

### 10.5 对数符号 
![alt text](../image/markdown数学公式语法/对数符号.jpg)

### 10.6 希腊字母
![alt text](../image/markdown数学公式语法/希腊字母.jpg)