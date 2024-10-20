---
title: 从零开始学Python(四)
tags: Python
categories: Python
top_img: transparent
date: 2024-4-11 00:00:00
copyright: false
description: 第四章 Python函数
cover: ../image/从零开始学Python/从零开始学Python（四）/1.JPG
---

# 第四章 Python函数

## 4.1 函数初体验
函数：是指组织好的，可重复使用的，用来实现特定功能的代码段。
函数的好处：
* 将功能封装在函数内部，可供随时随地重复利用
* 提高代码的复用性，减少重复代码，提高开发效率

示例：定义一个可以计算字符串长度的函数
```python
def my_len(data):
    count = 0
    for i in data:
        count += 1
    print(f"字符串{data}的长度为{count}")

str1 = "whut"
my_len(str1)
```
打印结果为：
```output
字符串whut的长度为4
```

## 4.2 函数的定义
### 4.2.1 函数的定义：
def&nbsp;&nbsp;&nbsp;函数名(传入参数):

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;函数体
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;&nbsp;&nbsp;返回值

### 4.2.2 函数的调用
函数名(参数)

案例：定义一个函数，函数名任意，要求调用后输出以下语句：
欢迎来到黑马程序员！
请出示您的健康码以及72小时核酸证明！

```python
# 定义函数
def welcome():
    print("欢迎来到黑马程序员！")
    print("请出示您的健康码以及72小时核酸证明！")

# 调用函数
welcome()
```

## 4.3 函数的参数
函数传入参数的功能：在函数进行计算时，接受外部（调用时）提供的数据

示例：定义一个函数用于计算两个数相加
```python
# 定义函数
def add(x, y):
    result = x + y
    print(f"{x} + {y}的结果是：{result}")

# 调用函数
add(1, 2)
```

注：
* 函数定义中，提供的x和y称之为：形式参数（形参），表示函数声明将要使用2个参数
    * 参数之间使用逗号进行分隔
* 函数调用中，传入的1和2称之为：实际参数（实参），表示函数执行时真正使用的参数值
    * 传入的时候，按照顺序传入数据，使用逗号分隔
* 传入参数的数量是不受限制的
    * 可以不使用参数
    * 也可以仅使用任意n个参数
 
案例：升级版自动查核酸
定义一个函数，名称任意，并接受一个参数传入（数字类型，表示体温）
在函数内进行提问判断（正常范围：小于等于37.5度），并输出如下内容：

欢迎来到黑马程序员！请出示您的健康码以及72小时核酸证明，并配合测量体温！
体温测量中，您的体温是：37.3度，体温正常请进！

欢迎来到黑马程序员！请出示您的健康码以及72小时核酸证明，并配合测量体温！
体温测量中，您的体温是：39.3度，需要隔离！

```python
# 定义函数
def check(tem):
    print("欢迎来到黑马程序员！请出示您的健康码以及72小时核酸证明，并配合测量体温！")
    if tem <= 37.5:
        print(f"体温测量中，您的体温是：{tem}度，体温正常请进！")
    else:
        print(f"体温测量中，您的体温是：{tem}度，需要隔离！")

# 调用函数，传入参数
tem = float(input("请输入您的体温："))
check(tem)
```

## 4.4 函数的返回值
### 4.4.1 函数返回值的定义语法
返回值语法：

def&nbsp;&nbsp;&nbsp;函数名(传入参数):

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;函数体
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;&nbsp;&nbsp;返回值

变量 = 函数(参数)

示例：
定义一个函数，完成两数相加的功能，并返回结果
```python
# 定义函数
def add(x, y):
    result = x + y
    return result


# 调用
r = add(1, 2)
print(r)
```

**注：函数体在遇到return后就结束了，所以写在return后的代码不会执行**

### 4.4.2 None类型
Python中有一个特殊的字面量：None，其类型是<class 'NoneType'>
无返回值的函数，实际就是返回了None这个字面量

None作为一个特殊的字面量，用于表示：空、无意义，其有非常多的应用场景。
* 用在函数无返回值上
* 用在if判断上
  * 在if判断中，None等同于False
  * 一般用于在函数中主动返回None，配合if判断做相关处理 
* 用于声明无内容的变量上
  * 定义变量，但暂时不需要变量有具体的值，可以用None代替
  * name = None

## 4.5 函数的说明文档
函数是纯代码语言，我们可以给函数添加说明文档，辅助理解函数的作用。
语法如下：

def&nbsp;&nbsp;&nbsp;func(x, y):

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"""
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;函数说明
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:param x: 形参x的说明
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:param y: 形参y的说明
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:return: 返回值的说明
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"""

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;函数体
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;&nbsp;&nbsp;返回值

* 通过多行注释的形式对函数进行说明解释
* 内容应写在函数体之前

示例：
```python
# 定义函数
def add(x, y):
    """
    add函数可以接收两个参数，进行两数相加的功能
    :param x: 相加的第一个数 
    :param y: 相加的第二个数
    :return: 相加的结果
    """
    result = x + y
    return result

# 调用函数
r = add(1, 2)
print(r)
```

效果如下：![函数说明文档](/image/从零开始学Python/从零开始学Python（四）/函数说明文档.png)

## 4.6 函数的嵌套调用
* 嵌套调用是指：一个函数里又调用了另一个函数
* 调用流程：函数A执行到调用函数B的语句，会将函数B全部执行完成后，继续执行函数A的剩余部分


示例：
```python
# 定义函数func_b
def func_b():
    print("---2---")


# 定义函数func_a
def func_a():
    print("---1---")
    # 调用函数func_b
    func_b()
    print("---3---")

    
# 调用函数func_a
func_a()
```

打印结果为：
```output
---1---
---2---
---3---
```

## 4.7 变量的作用域
变量的作用域指的是变量的作用范围（变量在哪里可用，在哪里不可用）
主要分为两类：
* 局部变量：定义在函数体内部的变量，即只在函数体内部生效
* 全局变量：在函数体内、外都能生效的变量

global关键字：在函数内部声明变量为全局变量

示例：
```python
# global关键字的使用
num = 100


def testA():
    print(num)


def testB():
    # global关键字声明a是全局变量
    global num
    num = 200
    print(num)
    
    
testA()                        # 结果：100
testB()                        # 结果：200
print(f"全局变量num = {num}")   # 结果：全局变量num = 200
```

打印结果为：
```output
100
200
全局变量num = 200
```

## 4.8 综合案例：黑马ATM

* 主菜单效果
* ```
  --------------------主菜单-------------------
  周杰伦，您好，欢迎来到黑马银行ATM，请选择操作：
  查询余额   [输入1]
  存款       [输入2]
  取款       [输入3]
  退出       [输入4]
  请输入您的选择：
* 查询余额效果：
* ```
  --------------------查询余额--------------------
  周杰伦，您好，您的余额剩余：5000000元
* 存、取款效果：
  ```
  --------------------存款--------------------
  周杰伦，您好，您存款50000元成功
  周杰伦，您好，您的余额剩余：5050000元
  ```
  ```
  --------------------取款--------------------
  周杰伦，您好，您取款50000元成功
  周杰伦，您好，您的余额剩余：4950000元
  ```
要求：
* 定义一个全局变量：money，用来记录银行卡余额（默认5000000）
* 定义一个全局变量：name，用来记录客户姓名（启动程序时输入）
* 定义如下的函数：
  * 查询余额函数
  * 存款函数
  * 取款函数
  * 主菜单函数
* 要求：
* 程序启动后要求输入客户姓名
* 查询余额，存款后都会返回主菜单
* 存款、取款后，都应显示一下当前余额
* 客户选择退出或输入错误，程序会退出，否则一直运行

具体实现代码：
```python
# 黑马ATM
money = 5000000
name = input("请输入您的姓名：")


#主菜单
def menu():
    print("--------------------主菜单-------------------")
    print(f"{name}，您好，欢迎来到黑马银行ATM，请选择操作：")
    print("查询余额\t[输入1]")
    print("存款\t\t[输入2]")
    print("取款\t\t[输入3]")
    print("退出\t\t[输入4]")
    return input("请输入您的选择：")


# 查询余额函数
def balance():
    print("--------------------查询余额--------------------")
    print(f"{name}，您好，您的余额剩余：{money}元")


# 存款函数
def save_money(save):
    print("--------------------存款--------------------")
    print(f"{name}，您好，您存款{save}元成功")
    global money  # money在函数内定义为全局变量
    money += save
    print(f"{name}，您好，您的余额剩余：{money}元")


# 取款函数
def withdraw_money(withdraw):
    print("--------------------取款--------------------")
    print(f"{name}，您好，您取款{withdraw}元成功")
    global money  # money在函数内定义为全局变量
    money -= withdraw
    print(f"{name}，您好，您的余额剩余：{money}元")


while True:
    num = menu()
    if num == '1':
        balance()
        continue  # 通过continue继续下一次循环，直接回到主菜单
    elif num == '2':
        save_money(int(input("请输入您要存的金额：")))
        continue
    elif num == '3':
        withdraw_money(int(input("请输入您要取的金额：")))
        continue
    elif num == '4':
        print("退出成功，感谢您的使用")
        break
    else:
        print("输入错误")
        break

```