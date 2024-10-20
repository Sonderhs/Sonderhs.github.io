---
title: Markdown数学公式语法
tags: markdown
categories: markdown
top_img: transparent
date: 2023-12-29 00:00:00
copyright: false
description: markdown数学公式语法
cover: ../image/markdown数学公式语法/0.JPG
---

# Markdown数学公式语法

将数学公式写在两个$之间。写在两个\$\$之间是把公式居中。 
更多符号表示见：https://katex.org/docs/supported



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
公式累加\displaystyle\sum_{i=1}^n, 累乘\prod_{i=0}^n


例： 
~~~
累加  $\displaystyle\sum_{i=1}^n$
累乘  $\prod_{i=0}^n$
~~~
累加  $\displaystyle\sum_{i=1}^n$  
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
| 符号             | 代码           | 描述     |
| ---------------- | -------------- | -------- |
| $\not=$          | \not=          | 不等于   |
| $\approx$        | \approx        | 约等于   |
| $\leq$           | \leq           | 小于等于 |
| $\geq$           | \geq           | 大于等于 |
| $\times$         | \times         | 乘号     |
| $\pm$            | \pm            | 正负号   |
| $\div$           | \div           | 除号     |
| $\sum$           | \sum           | 累加     |
| $\prod$          | \prod          | 累乘     |
| $\coprod$        | \coprod        | 累除     |
| $\overline{a+b}$ | \overline{a+b} | 平均值   |


### 10.2 三角函数 
| 符号       | 代码     | 描述 |
| ---------- | -------- | ---- |
| $\bot$     | \bot     | 垂直 |
| \angle$    | \angle   | 角   |
| $30^\circ$ | 30^\circ | 30度 |
| $\sin$     | \sin     | 正弦 |
| $\cos$     | \cos     | 余弦 |
| $\tan$     | \tan     | 正切 |
| $\cot$     | \cot     | 余切 |
| $\sec$     | \sec     | 正割 |
| $\csc$     | \csc     | 余割 |


### 10.3 定积分 
| 符号      | 代码    | 描述     |
| --------- | ------- | -------- |
| $\infty$  | \infty  | 无穷     |
| $\int$    | \int    | 定积分   |
| $\iint$   | \iint   | 双重积分 |
| $\iiint$  | \iiint  | 三重积分 |
| $\oint$   | \oint   | 曲线积分 |
| $y\prime$ | y\prime | 求导     |
| $\lim$    | \lim    | 极限     |

### 10.4 对数符号 
| 符号   | 代码 | 符号  | 代码 | 符号  | 代码 |
| ------ | ---- | ----- | ---- | ----- | ---- |
| $\log$ | \log | $\ln$ | \ln  | $\lg$ | \lg  |


### 10.5 希腊字母
| 符号 | 代码     | 符号 | 代码   |
| ---- | -------- | ---- | ------ |
| α    | \alpha   | β    | \beta  |
| γ    | \gamma   | δ    | \delta |
| ϵ    | \epsilon | ζ    | \zeta  |
| η    | \eta     | θ    | \theta |
| ι    | \iota    | κ    | \kappa |
| λ    | \lambda  | μ    | \mu    |
| ν    | \nu      | ξ    | \xi    |
| π    | \pi      | ρ    | \rho   |
| σ    | \sigma   | τ    | \tau   |
| υ    | \upsilon | ϕ    | \phi   |
| χ    | \chi     | ψ    | \psi   |
| ω    | \omega   |



## 十一、逻辑符号
| 符号         | 代码       | 符号          | 代码        | 符号              | 代码            | 符号          | 代码        |
| ------------ | ---------- | ------------- | ----------- | ----------------- | --------------- | ------------- | ----------- |
| $\forall$   | \forall    | $\complement$ | \complement | $\therefore$      | \therefore      | $\emptyset$   | \emptyset   |
| $\uparrow$   | \uparrow   | $\subset$     | \subset     | $\because$        | \because        | $\neg$        | \neg        |
| $\exists$    | \exists    | $\supset$     | \supset     | $\mapsto$         | \mapsto         | $\varnothing$ | \varnothing |
| $\nexists$   | \nexists   | $\mid$        | \mid        | $\to$             | \to             | $\implies$    | \implies    |
| $\in$        | \in        | $\land$       | \land       | $\gets$           | \gets           | $\impliedby$  | \impliedby  |
| $\downarrow$ | \downarrow | $\lor$        | \lor        | $\leftrightarrow$ | \leftrightarrow | $\iff$        | \iff        |
| $\notin$     | \notin     | $\ni$         | \ni         |                   |                 |               |             |

