---
title: 从零开始学Python(二)
tags: Python
categories: Python
top_img: transparent
date: 2024-4-9 00:00:00
copyright: false
description: 第二章 Python判断语句
cover: ../image/从零开始学Python/从零开始学Python（二）/1.JPG
---

# 第二章 Python判断语句

## 2.1 布尔类型和比较运算符
### 2.1.1 布尔类型
布尔（bool）表达现实生活中的逻辑，即真和假
* True表示真
* False表示假

Bool类型被划分为数字类型，是因为True和False本质上是一个数字，True记作1，False记作0
### 2.1.2 布尔类型的定义
定义变量存储布尔类型数据：变量名称 = 布尔类型字面量

### 2.1.3 比较运算符
布尔类型的数据，不仅可以通过定义得到，也可以通过比较运算符进行内容比较得到
如下代码：
```c
result = 10 > 5
print(f"10 > 5 的结果是{result}，类型是{type(result)}")
```
打印结果：
```output
10 > 5 的结果是True，类型是<class 'bool'>
```

常用的比较运算符：
| 运算符 |                               描述                               |
| :----: | :--------------------------------------------------------------: |
|   ==   |            判断内容是否相等，满足为True,不满足为False            |
|   !=   |           判断内容是否不相等，满足为True,不满足为False           |
|   >    |   判断运算符左侧内容是否大于右侧内容，满足为True,不满足为False   |
|   <    |   判断运算符左侧内容是否小于右侧内容，满足为True,不满足为False   |
|   >=   | 判断运算符左侧内容是否大于等于右侧内容，满足为True,不满足为False |
|   <=   | 判断运算符左侧内容是否小于等于右侧内容，满足为True,不满足为False |


## 2.2 if语句的基本格式
if语句格式如下：

if&nbsp;&nbsp;&nbsp;要判断的条件：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    条件成立时，要做的事情

示例：
```python
age = 23

if age >= 18:
    print("我已经成年了")

print("时间过得真快啊")
```

打印结果：
```output
我已经成年了
时间过得真快啊
```

## 2.3 if else语句
if else语句格式：

if&nbsp;&nbsp;&nbsp;条件:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件时要做的事情1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件时要做的事情2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件时要做的事情3
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...（省略）...

else:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不满足条件时要做的事情1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不满足条件时要做的事情2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不满足条件时要做的事情3
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...（省略）...

示例：
```python
print("欢迎来到黑马儿童游乐场，儿童免费，成人收费")
age = int(input("请输入你的年龄："))

if age >= 18:
    print("您已成年，游玩需要补票10元")
else:
    print("您未成年，可以免费游玩")

print("祝您游玩愉快")
```

输入结果为20（>18）时，打印结果为：
```output
欢迎来到黑马儿童游乐场，儿童免费，成人收费
请输入你的年龄：20
您已成年，游玩需要补票10元
祝您游玩愉快
```

输入结果为16（<18）时，打印结果为：
```output
欢迎来到黑马儿童游乐场，儿童免费，成人收费
请输入你的年龄：16
您未成年，可以免费游玩
祝您游玩愉快
```

## 2.4 if elif else语句
if elif else语句格式：

if&nbsp;&nbsp;&nbsp;条件1:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件1时要做的事情1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件1时要做的事情2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件1时要做的事情3
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...（省略）...

elif&nbsp;&nbsp;条件2

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件2时要做的事情1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件2时要做的事情2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件2时要做的事情3
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...（省略）...

elif&nbsp;&nbsp;条件3

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件3时要做的事情1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件3时要做的事情2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件3时要做的事情3
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...（省略）...

else:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所有条件都不满足时要做的事情1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所有条件都不满足时要做的事情2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所有条件都不满足时要做的事情3
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...（省略）...

示例：
```python
print("欢迎来到黑马动物园。")
height = int(input("请输入你的身高（cm）："))
vip_level = int(input("请输入你的VIP级别（1~5）:"))

if height < 120:
    print("您的身高小于120cm，可以免费游玩。")
elif vip_level > 3:
    print("您的VIP等级大于3，可以免费游玩。")
else:
    print("不好意思，您所有条件都不满足，需要购票10元。")
    
print("祝您游玩愉快。")
```

输入结果为110 4（两个条件都满足）时，打印结果为：
```output
欢迎来到黑马动物园。
请输入你的身高（cm）：110
请输入你的VIP级别（1~5）:4
您的身高小于120cm，可以免费游玩。
祝您游玩愉快。
```

输入结果为110 2（身高满足，VIP等级不满足）时，打印结果为：
```output
欢迎来到黑马动物园。
请输入你的身高（cm）：110
请输入你的VIP级别（1~5）:2
您的身高小于120cm，可以免费游玩。
祝您游玩愉快。
```

输入结果为130 4（身高不满足，VIP等级满足）时，打印结果为：
```output
欢迎来到黑马动物园。
请输入你的身高（cm）：130
请输入你的VIP级别（1~5）:4
您的VIP等级大于3，可以免费游玩。
祝您游玩愉快。
```

输入结果为130 2（身高不满足，VIP等级也不满足）时，打印结果为：
```output
欢迎来到黑马动物园。
请输入你的身高（cm）：130
请输入你的VIP级别（1~5）:2
不好意思，您所有条件都不满足，需要购票10元。
祝您游玩愉快。
```
**注：还有一种简洁式写法，即将输入直接放入条件判断中，如下：**
```python
print("欢迎来到黑马动物园。")

if int(input("请输入你的身高（cm）：")) < 120:
    print("您的身高小于120cm，可以免费游玩。")
elif int(input("请输入你的VIP级别（1~5）:")) > 3:
    print("您的VIP等级大于3，可以免费游玩。")
else:
    print("不好意思，您所有条件都不满足，需要购票10元。")

print("祝您游玩愉快。")
```
这样做不仅可以使代码更加简洁，还可以减少输入


## 2.5 判断语句的嵌套
对于需要多层次的判断，我们可以自由组合if elif else，从而完成特定需求的要求
多层次嵌套的格式为：
if&nbsp;&nbsp;&nbsp;条件1:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件1时要做的事情1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件1时要做的事情2

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;&nbsp;条件2

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件2时要做的事情1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件2时要做的事情2

只有第一个if满足条件，才会执行第二个if

**注：嵌套的关键点在于：空格缩进；通过空格缩进来决定语句之间的层次关系**

示例：
```python
print("欢迎来到黑马动物园")
if int(input("请输入你的身高")) > 120:
    print("你的身高大于120cm，不可以免费")
    print("不过如果你的VIP等级大于3，可以免费游玩")
    
    if int(input("请输入你的VIP等级")) > 3:
        print("恭喜你，你的VIP等级大于3，可以免费游玩")
    else:
        print("对不起，你的VIP等级小于3，不可以免费游玩，需要补票10元")
else:
    print("欢迎你小朋友，可以免费游玩")
```
如图：判断一共有两层，当外层if满足时继续执行内层判断；当外层if不满足时，直接执行外层的else
如输入130 3时，打印结果为：
```output
欢迎来到黑马动物园
请输入你的身高130
你的身高大于120cm，不可以免费
不过如果你的VIP等级大于3，可以免费游玩
请输入你的VIP等级3
对不起，你的VIP等级小于3，不可以免费游玩，需要补票10元
```
当输入110时，打印结果为：
```output
欢迎来到黑马动物园
请输入你的身高110
欢迎你小朋友，可以免费游玩
```

## 2.6 判断语句综合案例
案例要求：
1.数字随机产生，范围1-10
2.有三次机会，通过三层嵌套判断实现
3.每次猜不中时，提示大了还是小了

具体实现代码：
```python
import random
num = random.randint(1, 10)

guess_num = int(input("请输入第一次猜测的数字："))

if guess_num == num:
    print("恭喜你第一次就猜中了")
else:
    if guess_num > num:
        print("你猜测的数字大了")
    else:
        print("你猜测的数字小了")

    guess_num = int(input("请输入你第二次猜测的数字："))

    if guess_num == num:
        print("恭喜你第二次猜中了")
    else:
        if guess_num > num:
            print("你猜测的数字大了")
        else:
            print("你猜测的数字小了")

        guess_num = int(input("请输入你第三次猜测的数字："))
        
        if guess_num == num:
            print("恭喜你终于猜中了")
        else:
            print(f"对不起你没猜中，正确答案是{num}")
```