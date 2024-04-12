---
title: 从零开始学Python(三)
tags: Python
categories: Python
top_img: ../image/从零开始学Python/从零开始学Python（三）/1.JPG
date: 2024-4-10 00:00:00
copyright: false
description: 从零开始学Python(三)
cover: ../image/从零开始学Python/从零开始学Python（三）/1.JPG
---

# 第三章 Python循环语句

## 3.1 while循环的基础语法
### 3.1.1 while循环语句
while循环格式：

while&nbsp;&nbsp;&nbsp;条件:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件时要做的事情1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件时要做的事情2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件时要做的事情3
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...（省略）...

示例：
```python
i = 0
while i < 5:
    print("黑马程序员")
    i += 1
```
打印结果为：
```output
黑马程序员
黑马程序员
黑马程序员
黑马程序员
黑马程序员
```
**注：
1.while循环的条件需要得到布尔类型，True表示继续循环，False表示终止循环
2.需要设置循环条件，如i+=1配合i<5，就能确保循环的有限次
3.空格缩进和if判断一样，都需要设置**

## 3.2 while循环的基础案例
案例：
设置一个范围1-100的随机整数变量，通过while循环，配合input语句，判断输入的数字是否等于随机数，要求如下：
* 无限次机会
* 每次一猜不中，会提示大了或小了
* 猜完数字后，提示猜了几次

```python
# 猜数字
import random
# num为生成的随机数，count用于记录猜了几次
num = random.randint(1,100)
count = 0
guess_num = int(input("请输入你的猜测结果"))

while guess_num != num:
    if guess_num > num:
        guess_num = int(input("你猜的数字大了,请再猜一次"))
        count += 1
    else:
        guess_num = int(input("你猜的数字小了,请再猜一次"))
        count += 1
print(f"恭喜你猜对了，你一共猜了{count}次")
```

## 3.3 while循环的嵌套
while嵌套循环的语法格式：

while&nbsp;&nbsp;&nbsp;条件:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件时要做的事情1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件时要做的事情2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件时要做的事情3
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...（省略）...

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while&nbsp;&nbsp;&nbsp;条件:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件时要做的事情1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件时要做的事情2
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;满足条件时要做的事情3
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...（省略）...

示例：表白100天，每天都会送10朵玫瑰花
```python
# 表白100天，每天送10朵玫瑰花
i = 1
while i <= 100:
    print(f"今天是第{i}天，准备表白...")
    j = 1
    while j <= 10:
        print(f"这是今天送的第{j}朵玫瑰花")
        j += 1
    print("小美我喜欢你")
    i += 1

print(f"坚持到第{i - 1}天，表白成功")
```

## 3.4 while嵌套循环案例
案例：
使用while循环打印九九乘法表
```python
i = 1
while i <= 9:
    j = 1
    while j <= i:
        print(f"{j}×{i}={i * j}\t", end='')
        j += 1
    print()  # print空内容就是换行
    i += 1
```

打印结果为：
```output
1×1=1	
1×2=2	2×2=4	
1×3=3	2×3=6	3×3=9	
1×4=4	2×4=8	3×4=12	4×4=16	
1×5=5	2×5=10	3×5=15	4×5=20	5×5=25	
1×6=6	2×6=12	3×6=18	4×6=24	5×6=30	6×6=36	
1×7=7	2×7=14	3×7=21	4×7=28	5×7=35	6×7=42	7×7=49	
1×8=8	2×8=16	3×8=24	4×8=32	5×8=40	6×8=48	7×8=56	8×8=64	
1×9=9	2×9=18	3×9=27	4×9=36	5×9=45	6×9=54	7×9=63	8×9=72	9×9=81
```

## 3.5 for循环语法
### 3.5.1 for循环的基础语法

while循环与for循环的区别：
* while循环的循环条件是自定义的，自行控制循环条件
* for循环是一种“轮询”机制，是对一批内容进行“逐个处理”
* for循环无法定义循环条件，只能从被处理的数据集中依次取出内容进行处理，所以理论上Python中的for循环无法构建无限循环

![](/image/从零开始学Python/从零开始学Python（三）/while循环.png)

![](/image/从零开始学Python/从零开始学Python（三）/for循环.png)

for循环语法：
for&nbsp;&nbsp;&nbsp;临时变量&nbsp;&nbsp;&nbsp;in&nbsp;&nbsp;&nbsp;待处理数据集:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;循环满足条件时执行的代码

**注：与C语言或Java语言中的for循环不同，Python中的for循环需要提前设置好循环范围，循环的推动由程序自动进行，所以for循环也被叫做遍历循环**

示例：
```python
# 遍历字符串
# 定义字符串name
name = "itheima"
# for循环处理字符串
for x in name:
    print(x)
```

打印结果为：
```output
i
t
h
e
i
m
a
```

### 3.5.2 for循环的基础案例
for循环基础案例：
数一数有几个a：定义字符串name，内容为itheima is a brand of itcast，通过for循环遍历此字符串，统计有几个字母a

```python
name = "itheima is a brand of itcast"
count = 0
for x in name:
    if x == 'a':
        count += 1
print(f"该字符串中一共有{count}个a")
```
打印结果为：
```output
该字符串中一共有4个a
```

### 3.5.3 range语句
for循环语法：
for&nbsp;&nbsp;&nbsp;临时变量&nbsp;&nbsp;&nbsp;in&nbsp;&nbsp;&nbsp;待处理数据集:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;循环满足条件时执行的代码

for循环语法中的待处理数据集，严格来说称之为：序列类型
序列类型是指：其内容可以一个个一次取出的一种类型，包括：
* 字符串
* 列表
* 元组
* 等

range语句：
利用range语句我们可以获得一个简单的数字序列。
* 语法1：
  range(num): 获取一个从0开始，到num结束的数字序列（不含num本身），如range(5)取得的数据是：[0,1,2,3,4]
* 语法2：
  range(num1,num2)：获得一个从num1开始，到num2结束的数字序列（不包含num2本身），如range(5,10)取得的数据是[5,6,7,8,9]
* 语法3:
  range(num1,num2,step)：获得一个从num1开始，到num2结束的数字序列（不包含num2本身），数字之间的步长以step为准（step默认为1），如range(5,10,2)取得的数据是[5,7,9]

### 3.5.4 变量作用域
for循环语法：
for&nbsp;&nbsp;&nbsp;临时变量&nbsp;&nbsp;&nbsp;in&nbsp;&nbsp;&nbsp;待处理数据集:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;循环满足条件时执行的代码

for循环中的临时变量，在编程规范上，其作用范围（作用域）只限定在for循环内部
如果在for循环外部访问临时变量：
* 实际上是可以访问到的
* 但在编程规范上是不允许、不建议这么做的
* 如需访问，可以再for循环上面定义该变量

## 3.6 for循环的嵌套
### 3.6.1 for循环嵌套语法
for&nbsp;&nbsp;&nbsp;临时变量&nbsp;&nbsp;&nbsp;in&nbsp;&nbsp;&nbsp;待处理数据集:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;循环满足条件时执行的代码

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;&nbsp;&nbsp;临时变量&nbsp;&nbsp;&nbsp;in&nbsp;&nbsp;&nbsp;待处理数据集:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;循环满足条件时执行的代码

示例：表白100天，每天都会送10朵玫瑰花
```python
# 表白100天，每天送10朵玫瑰花
i = 1
for i in range(101):
    print(f"今天是第{i}天，准备表白...")
    j = 1
    for j in range(11):
        print(f"这是今天送的第{j}朵玫瑰花")
        j += 1
    print("小美我喜欢你")
    i += 1

print(f"坚持到第{i - 1}天，表白成功")
```
### 3.6.2 for循环嵌套案例
案例：打印九九乘法表
```python
for i in range(1, 10):
    for j in range(1, i + 1):
        print(f"{j}×{i}={i * j}\t", end='')
        j += 1
    print()  # print空内容就是换行
    i += 1
```

## 3.7 循环中断：break和continue
### 3.7.1 continue关键字
* continue关键字用于：中断本次循环，直接进入下一次循环
* continue可以用于：for循环和while循环，效果一致
* continue在嵌套循环时之作用于其所在的循环

语法：
for&nbsp;&nbsp;&nbsp;i&nbsp;&nbsp;&nbsp;in&nbsp;&nbsp;&nbsp;range(1,100):

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;语句1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;continue
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;语句2


示例：
```python
for i in range(1,6):
    print("语句1")
    continue
    print("语句2")
```

打印结果为：
```output
语句1
语句1
语句1
语句1
语句1
```

### 3.7.2 break关键字
* break关键字用于：直接结束循环
* break可用于：for循环和while循环，效果一致
* break在嵌套循环时之作用于其所在的循环

语法：
for&nbsp;&nbsp;&nbsp;i&nbsp;&nbsp;&nbsp;in&nbsp;&nbsp;&nbsp;range(1,100):

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;语句1
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;continue
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;语句2

语句3

示例：
```python
for i in range(1,6):
    print("语句1")
    break
    print("语句2")

print("语句3")
```

打印结果为：
```output
语句1
语句3
```

## 3.8 循环综合案例
练习案例：发工资
某公司，账户余额有1万元，给20名员工发工资。
* 员工编号从1到20，从编号1开始，依次领取工资，每人可领取1000元
* 领工资时，财务判断员工的绩效分（1-10）（随机生成），如果低于5，不发工资，换下一位
* 如果工资发完了，结束发工资

```python
import random
account = 10000
for num in range(1, 21):
    score = random.randint(1, 10)
    # 先判断账户是否有余额，如果没有余额直接结束发工资，不用再继续判断绩效分
    if account == 0:
        print("工资发完了，下个月领取吧")
        break
    # 判断绩效分
    if score < 5:
        print(f"员工{num},绩效分{score},低于5，不发工资，下一位")
        continue
    # 绩效分大于等于5，判断账户余额是否够发工资，够的话发工资，不够的话直接结束发工资
    if account >= 1000:
        print(f"向员工{num}发工资1000元，账户余额还有{account - 1000}元")
        account -= 1000
    else:
        print("工资发完了，下个月领取吧")
        break
```

打印结果为：
```output
向员工1发工资1000元，账户余额还有9000元
向员工2发工资1000元，账户余额还有8000元
员工3,绩效分2,低于5，不发工资，下一位
员工4,绩效分4,低于5，不发工资，下一位
向员工5发工资1000元，账户余额还有7000元
向员工6发工资1000元，账户余额还有6000元
向员工7发工资1000元，账户余额还有5000元
员工8,绩效分2,低于5，不发工资，下一位
员工9,绩效分2,低于5，不发工资，下一位
向员工10发工资1000元，账户余额还有4000元
向员工11发工资1000元，账户余额还有3000元
向员工12发工资1000元，账户余额还有2000元
向员工13发工资1000元，账户余额还有1000元
向员工14发工资1000元，账户余额还有0元
工资发完了，下个月领取吧
```