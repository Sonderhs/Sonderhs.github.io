---
title: 从零开始学Python(七)
tags: Python
categories: Python
top_img: transparent
date: 2024-4-15 00:00:00
copyright: false
description: 第七章 Python文件操作
cover: ../image/从零开始学Python/从零开始学Python（七）/1.JPG
---

# 第七章 Python文件操作

## 7.1 文件编码概念
编码技术：即翻译的规则，记录了如何将内容翻译成二进制，以及如何将二进制翻译回可识别内容
计算机中有许多可用编码：
* UTF-8
* GBK
* Big5
* 等

不同的编码方式翻译结果是不同的，只有使用正确的编码才能对文件进行正确的读写
UTF-8是目前全球通用的编码格式，除非有特殊需求，否则一律以UTF-8格式进行文件编码即可


## 7.2 文件的读取操作
![](/image/从零开始学Python/从零开始学Python（七）/文件读取操作汇总.png)

### 7.2.1 open()打开函数方法
语法：
open(name, mode, encoding)
其中：
* name：是要打开的目标文件名的字符串（可以包含文件所在的具体路径）
* mode：设置打开文件的模式（访问模式）：只读、写入、追加等
* encoding：编码格式（推荐使用UTF-8）

![](/image/从零开始学Python/从零开始学Python（七）/mode常用的三种基础访问模式.png)

示例：
```python
"""
文件test.txt内容：
hello1 world1
hello2 world2
hello3 world3
"""

f = open("D:/test.txt", 'r', encoding='Utf-8')
# encoding的顺序不是第三位，所以不能用位置参数，用关键字参数直接指定
# 文件对象f的类型是：<class '_io.TextIOWrapper'>
```

**注：此时的'f'是'open'函数的文件对象，对象是Python中的一种特殊的数据类型，拥有属性和方法，可以使用对象.属性或对象.方法对其进行访问**

### 7.2.2 read()、readlines()、readline()读文件方法
#### 7.2.2.1 read()读文件方法
语法：
文件对象.read(num)

num表示要从文件中读取的数据长度（单位是字节），如果没有传入num，那么就表示读取文件中的所有数据

示例：
```python
# read()读取文件
print(f"读取5个字节的结果为：{f.read(5)}")
print(f"read()方法读取文件全部内容：{f.read()}")
```

打印结果为：
```output
读取5个字节的结果为：hello
read()方法读取文件全部内容：1 world1
hello2 world2
hello3 world3
```

**注：在同一文件中多次调用read()方法是，下一次read调用会从上一次read调用结束处开始**

#### 7.2.2.2 readlines()读文件方法
语法：
文件对象.readlines()

readlines可以按照整行的方式把整个文件的内容一次性读取，并且返回的是一个列表，其中每一行的数据为一个元素

示例：
```python
# readlines()读取文件
lines = f.readlines()
print(f"lines对象的类型是：{type(lines)}")
print(f"lines对象的内容是：{lines}")
```

打印结果为：
```output
lines对象的类型是：<class 'list'>
lines对象的内容是：['hello1 world1\n', 'hello2 world2\n', 'hello3 world3']
```

#### 7.2.2.3 readline()读文件方法
语法：
文件对象.readline()

readline一次读取一行内容

示例：
```python
# readline()读取文件
line1 = f.readline()
line2 = f.readline()

print(f"文件的第一行内容为：{line1}")
print(f"文件的第二行内容为：{line2}")
```

打印结果为：
```output
文件的第一行内容为：hello1 world1

文件的第二行内容为：hello2 world2
```

### 7.2.3 for循环读文件方法
语法：
for line in open("D:/test.txt", 'r'):
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(line)
其中，每一个line临时变量都记录了文件的一行内容

示例：
```python
# for循环读取文件
for line in open("D:/test.txt", 'r'):
    print(f"每一行的数据是：{line}")
```

打印结果为：
```output
每一行的数据是：hello1 world1

每一行的数据是：hello2 world2

每一行的数据是：hello3 world3
```

### 7.2.3 close()关闭文件方法
语法：
文件对象.close()

通过close关闭文件对象也就是关闭对文件的占用
如果不调用close，同时程序没有停止运行，那么这个文件就会一直被Python程序占用

### 7.2.4 with open()读取并关闭文件方法
语法：
with open("D:/test.txt", 'r') as f:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f.readlines()

通过在with open的语句块中对文件进行操作，可以在操作完成后自动关闭close文件，避免遗忘掉close方法

示例：
```python
# with open()读取并关闭文件
with open("D:/test.txt", 'r') as f:
    for line in f:
        print(f"每一行的数据是：{line}")
```

打印结果为：
```output
每一行的数据是：hello1 world1

每一行的数据是：hello2 world2

每一行的数据是：hello3 world3
```

## 7.3 文件读取操作练习案例
单词计数：
通过Windows的文件编辑软件，将如下内容复制并保存到：word.txt，文件可以存储到任意位置，通过文件读取操作，读取此文件，统计itheima单词出现的次数
itheima itcast python
itheima python itcast
beijing shanghai itheima
shenzhen guangzhou itheima
wuhan hangzhou itheima
zhengzhou bigdata itheima 

具体实现代码如下：
```python
f = open("D:/word.txt", 'r', encoding='Utf-8')
# 方式1：读取全部内容，通过count统计
content = f.read()
count = content.count('itheima')
print(f"该文件中有{count}个'itheima'")

# 方式2：读取内容，一行一行统计
count = 0
for line in f:
    # 通过strip方法去除每一行结尾处的空格
    line = line.strip()
    # 通过split方法按照空格进行分隔
    words = line.split(" ")
    for word in words:
        if word == 'itheima':
            count += 1
            
print(f"该文件中有{count}个'itheima'")
f.close()
```

## 7.4 文件的写出操作
将文件写入需要使用write方法，之后使用flush刷新内容
语法：
1. 打开文件
f = open("D:/test.txt", 'w', encoding='Utf-8')

2. 文件写入
f.write('hello4 world4')

3. 内容刷新
f.flush()

注：
* 直接调用write，内容并为真正写入文件，而是会积攒在程序的内存中，称之为缓冲区
* 当调用flush时，内容会真正写入文件
* 这样做是避免频繁地操作硬盘，导致效率下降（攒一堆，一次性写入磁盘）

示例：
```python
# 文件写入演示
# 1.打开文件
f = open("D:/test.txt", 'r', encoding='Utf-8')
print(f"文件写入前内容为：{f.read()}")
# 2.文件写入
f = open("D:/test.txt", 'w', encoding='Utf-8')
f.write("hello4 world4")
# 3.内容刷新
f.flush()
f = open("D:/test.txt", 'r', encoding='Utf-8')
print(f"文件写入后内容为：{f.read()}")
f.close()
```

打印结果为：
```output
文件写入前内容为：hello world
hello world
hello world
文件写入后内容为：hello4 world4
```
注：
* w模式，文件不存在时会自动创建文件
* w模式，文件存在时会清空原有内容
* close()方法，带有flush()方法的功能

## 7.5 文件的追加写入操作
文件追加与文件写入类似，只需要将w模式改为a模式即可
语法：
1. 打开文件
f = open("D:/test.txt", 'a', encoding='Utf-8')

2. 文件写入
f.write('hello4 world4')

3. 内容刷新
f.flush()

示例：
```python
# 文件追加写入演示
# 1.打开文件
f = open("D:/test.txt", 'r', encoding='Utf-8')
print(f"文件写入前内容为：{f.read()}")
# 2.文件写入
f = open("D:/test.txt", 'a', encoding='Utf-8')
f.write("\mhello4 world4")
# 3.内容刷新
f.flush()
f = open("D:/test.txt", 'r', encoding='Utf-8')
print(f"文件写入后内容为：{f.read()}")
f.close()
```

打印结果为：
```output
文件写入前内容为：hello world
hello world
hello world
文件写入后内容为：hello world
hello world
hello world
hello4 world4
```

注：
* a模式，文件不存在时会自动创建文件
* a模式，文件存在时会在原有内容后继续写入
* 可以使用"\n"来写出换行符

## 7.6 文件操作综合案例
需求：有一份账单文件，记录了消费收入的具体记录，内容如下:
name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;money&nbsp;&nbsp;&nbsp;type&nbsp;&nbsp;remarks
周杰轮,2022-01-01,100000,消费,正式
周杰轮,2022-01-02,300000,收入,正式
周杰轮,2022-01-03,100000,消费,测试
林俊节,2022-01-01,300000,收入,正式
林俊节,2022-01-02,100000,消费,测试
林俊节,2022-01-03,100000,消费,正式
林俊节,2022-01-04,100000,消费,测试
林俊节,2022-01-05,500000,收入,正式
张学油,2022-01-01,100000,消费,正式
张学油,2022-01-02,500000,收入,正式
张学油,2022-01-03,900000,收入,测试
王力鸿,2022-01-01,500000,消费,正式
王力鸿,2022-01-02,300000,消费,测试
王力鸿,2022-01-03,950000,收入,正式
刘德滑,2022-01-01,300000,消费,测试
刘德滑,2022-01-02,100000,消费,正式
刘德滑,2022-01-03,300000,消费,正式
先将其复制保存为bili.txt

需求：
* 读取文件
* 将文件写出到bili.txt.bak文件作为备份
* 同时，将文件内标记为测试的数据行丢弃

实现思路：
* open和r模式打开一个文件对象并读取文件
* open和w模式打开另一个文件对象，用于文件写出
* for循环内容，判断是否是测试不是测试就用write写出，是测试就continue跳过
* 将2个文件对象均close


具体实现代码如下：
```python
# f1用于读取文件
f1 = open("D:/bili.txt", "r", encoding="UTF-8")
# f2用于写入文件
f2 = open("D:/bili.txt.bak", "w", encoding="UTF-8")

# for循环读取文件（黑马）
for line in f1:
    # 处理每行末尾的换行符
    line = line.strip()
    # 判断是否满足条件
    if line.split(",")[4] == "测试":
        continue
    else:
        f2.write(line)
        # 由于前面删除了换行，所以这里应该再输出换行
        f2.write("\n")

# 我自己的方法
for line in f1:
    # 不需要处理最后的换行符，直接判断倒数第二个字符是否为"试"
    if line[-2] == "试":
        continue
    else:
        f2.write(line)

# close两个文件，close已经包含了flush操作
f1.close()
f2.close()
```