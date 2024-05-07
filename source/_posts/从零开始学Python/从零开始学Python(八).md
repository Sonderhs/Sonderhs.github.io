---
title: 从零开始学Python(八)
tags: Python
categories: Python
top_img: ../image/从零开始学Python/从零开始学Python（八）/1.JPG
date: 2024-4-16 00:00:00
copyright: false
description: 从零开始学Python(八)
cover: ../image/从零开始学Python/从零开始学Python（八）/1.JPG
---

# 第八章 Python异常、模块与包
## 8.1 Python异常
异常：当检测到一个错误时，Python解释器就无法继续执行了，反而出现了一些错误提示，这就是所谓的“异常”，也就是我们常说的BUG

## 8.2 异常的捕获
捕获异常的作用在于：提前假设某处会出现异常，做好提前准备，当真的出现异常的时候，可以有后续手段
### 8.2.1 捕获异常
基本语法：
try：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可能发生错误的代码
except：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果出现异常执行的代码

示例：
尝试用'r'模式打开文件，如果文件不存在，则以'w'模式打开
```python
try:
    f = open('D:/Python/test/linux.txt', 'r', encoding='UTF-8')
except:
    print("出现异常，因为文件不存在，正在创建该文件")
    f = open('D:/Python/test/linux.txt', 'w', encoding='UTF-8')
```

### 8.2.2 捕获指定异常
```python
try:
    print(name)
except NameError as e:  #e用来记录异常的具体内容
    print("出现了变量未定义的异常")
    print(f"e的类型是：{type(e)}")
    print(f"e的内容是：{e}")
```

打印结果为：
```output
出现了变量未定义的异常
e的类型是：<class 'NameError'>
e的内容是：name 'name' is not defined
```

### 8.2.3 捕获多个异常：
```python
try:
    print(1/0)
except (NameError, ZeroDivisionError) as e:  #e用来记录异常的具体内容
    print("出现了变量未定义  或 除以0 的异常")
```

打印结果为：
```output
出现了变量未定义  或 除以0 的异常
```

### 8.2.4 捕获全部异常：
```python
try:
    1 / 0
except Exception as e:  #e用来记录异常的具体内容
    print("出现异常了")
```

### 8.2.5 异常else
else表示的是如果没有异常要执行的代码
示例：
```python
try:
    1 / 0
except Exception as e:
    print("出现异常了")
else:
    print("没有出现异常")
```

### 8.2.6 异常的finally
finally表示无论是否异常都要执行的代码，如关闭文件
示例：
```python
try:
    f = open('D:/test.txt', 'r', encoding='UTF-8')
except Exception as e:
    print("出现异常了")
    f = open('D:/test.txt', 'w', encoding='UTF-8')
else:
    print("没有出现异常")
finally:
    f.close()
```


## 8.3 异常的传递性
异常是具有传递性的，有如下代码：
```python
# 异常的传递
# 异常在func01中没有被捕获
def func01():
    print("这是func01开始")
    num = 1 / 0
    print("这是func01结束")


# 异常在func02中没有被捕获
def func02():
    print("这是func02开始")
    func01()
    print("这是func02结束")


# 异常在main中被捕获
def main():
    try:
        func02()
    except Exception as e:
        print(e)


main()
```
当函数func01中发生异常，并且没有捕获处理这个异常时，异常会传递到func02，当func02也没有捕获处理这个异常时，main函数会捕获这个异常，这就是异常的传递性
当所有函数都没有捕获异常时，程序就会出错

上面代码执行结果为：
```output
这是func02开始
这是func01开始
division by zero
```

## 8.4 模块的概念和导入
Python模块（Module），是一个Python文件，以.py结尾。模块能定义函数、类和变量，也能包含可执行的代码
模块的作用：模块封装了函数、类或变量，可以帮助我们快速实现一些功能

模块的导入方式：
模块在使用前需要先导入，导入的语法如下：

**[from 模块名] import [模块 | 类 | 变量 | 函数 | \*] [as 别名]**

常用的组合形式如：
* import 模块名
* from 模块名 import 类、变量、方法等
* from 模块名 import *
* import 模块名 as 别名
* from 模块名 import 功能名 as 别名

示例：
```python
# 模块的导入
# 通过import导入time模块并使用sleep函数
import time
print("hello")
time.sleep(5)
print("world")

# 通过from导入time模块并使用sleep函数
from time import sleep
print("hello")
sleep(5)
print("world")

# 通过from导入time模块全部功能并使用sleep函数
# *表示全部的意思
from time import *
print("hello")
sleep(5)
print("world")

# as定义别名
import time as t
print("hello")
t.sleep(5)
print("world")
# 或
from time import sleep as sl
print("hello")
sl(5)
print("world")
```

## 8.5 自定义模块并导入
### 8.5.1 自定义模块并导入使用
使用方法：
创建一个 模块名.py 文件，并在其中写入需要使用的类、变量或函数
调用时先import导入模块，之后就可以使用模块中的功能了

![](/image/从零开始学Python/从零开始学Python（八）/制作并使用自定义模块.png)

注：当导入多个模块，且模块内有同名功能，当调用这个同名功能时，调用的是后面模块的功能

示例：
```python
# 模块1 代码
def my_test(a, b):
    print(a + b)

# 模块2 代码
def my_test(a, b):
    print(a - b)


# 导入模块和调用功能代码
from my_module1 import my_test
from my_module2 import my_test

# 使用同名功能
my_test(1, 1)
```
打印结果为：
```output
2
```

### 8.5.2 main变量
在模块中进行测试时，我们可能会使用模块中的功能，为了不让测试代码影响正常使用，我们可以使用main变量进行控制
语法：
if \_\_name__ == '\_\_main__':
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;测试代码

实现原理：每个文件都内置了一个变量\_\_name__，在该文件内执行时name会被赋值为main，而当在其他文件中执行时，name则不等于main，以此来实现测试代码的效果而不影响正常调用

示例：
```python
# my_module1模块中代码
def test(a, b):
    print(a + b)

# 用于测试模块功能是否能够正常使用
test(1, 2)

# 主文件代码
from my_module1 import test

test(1, 1)
```
打印结果为：
```output
3
2
```
当使用main变量后：
```python
# my_module1模块中代码
def test(a, b):
    print(a + b)

# 用于测试模块功能是否能够正常使用
if __name__ == '__main__':
    test(1, 2)

# 主文件代码
from my_module1 import test

test(1, 1)
```
打印结果为：
```output
2
```

### 8.5.3 \_\_all__变量
如果一个模块文件中有'\_\_all__'变量，当使用'from xxx import *'导入时，只能导入这个列表中的元素

示例：
```python
# my_module1模块中代码
__all__ = ['test_a']

def test_a():
    print('test_a')

def test_b():
    print('test_b')

# 主文件代码
from my_module1 import *

# 这里只能使用test_a而不能使用test_b
test_a()

# 若要使用test_b可以直接导入test_b，all只作用于*
from my_module1 import test_b

test_b()
```

## 8.6 自定义Python包
Python包：
从物理上看，包就是一个文件夹，在该文件夹下包含了一个__init__.py文件，该文件夹可用于包含多个模块文件
从逻辑上看，包的本质依然是模块
包的作用：当我们的模块文件越来越多时，包可以帮助我们管理这些模块，包的作用就是包含多个模块，但包的本质依然是模块

![](/image/从零开始学Python/从零开始学Python（八）/Python包.png)

新建包步骤如下：
1. 新建包'my_package'
2. 新建包内模块：'my_module1'和'my_module2'
3. 模块内代码如下：
![](/image/从零开始学Python/从零开始学Python（八）/Python包代码.png)

使用方式：导入包：
* 方式一：
import 包名.模块名
包名.模块名.功能

示例：
```python
# 演示自定义模块1

def info_print1():
    print("模块1代码")


# 演示自定义模块2

def info_print2():
    print("模块2代码")


# 主文件代码
import my_package.my_module1
import my_package.my_module2

my_package.my_module1.info_print1()
my_package.my_module2.info_print2()
```

打印结果为：
```output
模块1代码
模块2代码
```

* 方式二：
  from 包名 import 模块名
  模块名.功能

示例：
```python
# 演示自定义模块1

def info_print1():
    print("模块1代码")


# 演示自定义模块2

def info_print2():
    print("模块2代码")


# 主文件代码
from my_package import my_module1
from my_package import my_module2
my_module1.info_print1()
my_module2.info_print2()

"""
# 也可以直接导入功能
from my_package.my_module1 import info_print1
from my_package.my_module2 import info_print2
info_print1()
info_print2()
"""
```

打印结果为：
```output
模块1代码
模块2代码
```

**注：必须在'\_\_init__.py'文件中添加'\_\_all__ = []'，控制允许导入的模块列表（all只针对'from ... import \*'这种方式）**

## 8.7 安装第三方包
使用第三方包可以极大地帮助我们提高开发效率，如：
* 科学计算中常用的：numpy包
* 数据分析中常用的：pandas包
* 大数据计算中常用的：pyspark、apache-flink包
* 图形可视化中常用的：matplotlib、pyecharts包
* 人工智能中常用的：tensorflow包
* 等

第三方包的安装方法：
在命令提示程序中输入：
pip install 包名称
即可通过网络安装第三方包

pip的网络优化
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple 包名称
https://pypi.tuna.tsinghua.edu.cn/simple 是清华大学提供的一个可使用pip下载第三方包的网站

我在使用pycharm安装第三方包时出现了无法搜索到第三方包的问题，具体原因应该是因为网络原因，解决办法如下，视频可参考：https://www.bilibili.com/video/BV1SM4y1H71G/?spm_id_from=333.1007.top_right_bar_window_history.content.click

第一步：首先点击左下方Python Packages，之后点击设置（Manage repositories）
![](/image/从零开始学Python/从零开始学Python（八）/Python第三方包安装1.png)

第二步：添加库
![](/image/从零开始学Python/从零开始学Python（八）/Python第三方包安装2.png)

第三步：打开设置，找到Tools中的Server Certificates，选择勾选Accept non-trusted certificates automatically，即自动接收没有信任的证书
![](/image/从零开始学Python/从零开始学Python（八）/Python第三方包安装3.png)

第四步：在设置中的Project->Python interpreter中点击加号添加第三方包即可
![](/image/从零开始学Python/从零开始学Python（八）/Python第三方包安装4.png)

