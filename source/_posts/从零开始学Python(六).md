---
title: 从零开始学Python(六)
tags: Python
categories: Python
top_img: ../image/从零开始学Python/从零开始学Python（六）/1.JPG
date: 2024-4-14 00:00:00
copyright: false
description: 从零开始学Python(六)
cover: ../image/从零开始学Python/从零开始学Python（六）/1.JPG
---

# 第六章 Python函数进阶

## 6.1 函数的多返回值
语法：
return 返回值1, 返回值2, ...
按照返回值的顺序，写对应多个变量进行接收即可，变量之间用逗号隔开，支持不同类型的数据return

示例：
```python
# 多返回值
def test_return():
    return 1, True


a, b = test_return()
print(f"a的值为：{a},b的值为：{b}")
```

打印结果为：
```output
a的值为：1,b的值为：True
```

## 6.2 多种传参方式
函数参数种类：
根据使用方式上的不同，函数常见的参数使用方式可分为4种：
* 位置参数
* 关键字参数
* 缺省参数
* 不定长参数

### 6.2.1 位置参数
位置参数：调用函数时根据函数定义的参数位置来传递参数
注意：传递的参数和定义的参数顺序及个数必须一致

示例：
```python
# 位置参数
def user_info(name, age ,gender):
    print(f"您的名字是{name}, 年龄是：{age}, 性别是：{gender}")
    
    
user_info('Tom', 20, '男')
```

打印结果为：
```output
您的名字是Tom, 年龄是：20, 性别是：男
```

### 6.2.2 关键字参数
关键字参数：函数调用时通过“键=值”形式传递参数
注意：函数调用时，如果有位置参数时，位置参数必须在关键字参数前面，但关键字参数之间不存在先后顺序

示例：
```python
# 关键字参数
def user_info(name, age ,gender):
    print(f"您的名字是{name}, 年龄是：{age}, 性别是：{gender}")


# 关键字传参
user_info(name="小明", age=20, gender='男')
# 可以不按照固定顺序
user_info(age=20, gender='男', name="小明")
# 可以和位置参数混用，位置参数必须在前，且匹配参数顺序
user_info("小明", age=20,gender='男')
```

打印结果为：
```output
您的名字是Tom, 年龄是：20, 性别是：男
您的名字是Tom, 年龄是：20, 性别是：男
您的名字是Tom, 年龄是：20, 性别是：男 
```

### 6.2.3 缺省参数
缺省参数：缺省参数也叫默认参数，用于定义函数，为参数提供默认值，调用函数时可不传该默认参数的值，当调用函数没有传递参数时，就会默认使用缺省参数对应的值
注意：所有位置参数必须出现在默认参数之前，包括函数定义和调用

示例：
```python
# 缺省参数
def user_info(name, age ,gender='男'):
    print(f"您的名字是{name}, 年龄是：{age}, 性别是：{gender}")


user_info('Tom', 20)
user_info('Rose', 18, '女')
```

打印结果为：
```output
您的名字是Tom, 年龄是：20, 性别是：男
您的名字是Rose, 年龄是：18, 性别是：女
```

### 6.2.4 不定长参数
不定长参数：不定长参数也叫做可变参数，用于不确定调用的时候会传递多少个参数（不传参也可以）的场景
作用：当调用函数时不确定参数个数时，可以使用不定长参数
不定长参数的类型：
* 位置传递
* 关键字传递


#### 6.2.4.1 位置传递不定长参数
示例：
```python
# 位置传递不定长参数
def user_info(*args):
    print(f"args参数的类型为：{type(args)}，内容是：{args}")


# ('Tom',)
user_info('TOM')
# ('Tom', 18)
user_info('Tom', 18)
```

打印结果为：
```output
args参数的类型为：<class 'tuple'>，内容是：('TOM',)
args参数的类型为：<class 'tuple'>，内容是：('Tom', 18)
```
**注：传进的所有参数都会被args变量收集，它会根据传进参数的位置合并为一个元组（tuple），args是元组类型，这就是位置传递**

#### 6.2.4.2 关键字传递不定长参数
示例：
```python
# 关键字传递不定长参数
def user_info(**kwargs):
    print(f"kwargs参数的类型为：{type(kwargs)}，内容是：{kwargs}")
```

打印结果为：
```output
kwargs参数的类型为：<class 'dict'>，内容是：{'name': 'TOM', 'age': 18, 'id': 110}
```

**注：参数是“键=值”形式的情况下，所有的“键=值”都会被kwargs接受，同时会根据“键=值”组成字典**

## 6.3 函数作为参数传递
函数也可以作为参数传入另一个函数，如下代码：
```python
def test_func(compute):
    result = compute(1, 2)
    print(f"compute的类型为：{type(compute)}")
    print(f"计算的结果为：{result}")


def compute(x, y):
    return x + y


test_func(compute)
```
其中，函数compute作为参数传入了test_func函数中使用：
* test_func需要一个函数作为参数传入，这个函数需要接收2个数字进行计算，计算逻辑由这个被传入的函数决定
* compute函数接收这2个数字对其进行计算，compute函数作为参数，传递给了test_func函数使用
* 最终，在test_func函数内部，由传入的compute函数完成了对数字的计算操作

其实，这是一种计算逻辑的传递，而非数据的传递，任何逻辑都可以自行定义并作为函数传入

上述示例打印结果为：
```output
compute的类型为：<class 'function'>
计算的结果为：3
```
**注：将函数传入的作用在于：传入计算逻辑，而非传入数据**

## 6.4 lambda匿名函数
函数的定义中：
* def关键字，可以定义带有名称的函数
* lambda关键字，可以定义匿名函数（无名称）

有名称的函数，可以基于名称重复使用
无名称的函数，只可临时使用一次

匿名函数定义语法：
lambda 传入参数: 函数体(一行代码)
* lambda是关键字，表示定义匿名函数
* 传入参数表示匿名函数的形式参数，如：x,y表示接收2个形式参数
* 函数体，就是函数的执行逻辑，要注意：只能写一行，无法写多行代码

示例：
```python
def test_func(compute):
    result = compute(1, 2)
    print(f"计算结果是：{result}")


test_func(lambda x, y: x + y)
```

打印结果为：
```output
计算结果是：3
```
