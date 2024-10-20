---
title: 从零开始学Python(五)
tags: Python
categories: Python
top_img: transparent
date: 2024-4-12 00:00:00
copyright: false
description: 第五章 Python数据容器
cover: ../image/从零开始学Python/从零开始学Python（五）/1.JPG
---

# 第五章 Python数据容器

## 5.1 Python数据容器入门
Python中的数据容器：
一种可以容纳多份数据的数据类型，容纳的每一份数据称之为一个元素，每一个元素可以使任意类型的数据，如字符串、数字、布尔等。
数据容器根据特点的不同，如：
* 是否支持重复元素
* 是否可以修改
* 是否有序，等

分为5类，分别是：
列表（list）、元组（tuple）、字符串（str）、集合（set）、字典（dict）

## 5.2 数据容器：list（列表）
列表（list）类型是数据容器的一类，它可以一次性存储多个数据。

基本语法：

\# 字面量
[元素1, 元素2, 元素3, 元素4, ...]

\# 定义变量
变量名称 = [元素1, 元素2, 元素3, 元素4, ...]

\# 定义空列表
变量名称 = []
变量名称 = list()

列表内的每一个数据，称之为元素：
* 以[]作为标识
* 列表内每一个元素之间用, 逗号隔开

案例演示：
```python
# 列表内的元素类型相同
name_list = ['itheima', 'itcast', 'python']
print(name_list)
print(type(name_list))

# 列表内的元素类型不同
my_list = ['itheima', 666, True]
print(my_list)
print(type(my_list))

# 列表的嵌套
nest_list = [[1, 2, 3], [4, 5, 6]]
print(nest_list)
print(type(nest_list))
```

打印结果为：
```output
['itheima', 'itcast', 'python']
<class 'list'>
['itheima', 666, True]
<class 'list'>
[[1, 2, 3], [4, 5, 6]]
<class 'list'>
```

## 5.3 列表的遍历
列表的遍历可以使用下标索引
![](/image/从零开始学Python/从零开始学Python（五）/list1.png)

如图，列表中的每一个元素都有其位置下标索引，从前往后的方向，从0开始依次递增

语法：
```python
# 语法： 列表[下标索引]
name_list = ['Tom', 'Lily', 'Rose']
print(name_list[0])
print(name_list[1])
print(name_list[2])
```

打印结果为：
```output
Tom
Lily
Rose
```

或者，列表也可以进行反向索引，也就是从后往前：从-1开始，依次递减（-1, -2, -3, ...）
![](/image/从零开始学Python/从零开始学Python（五）/list2.png)

语法：
```python
# 语法： 列表[下标索引]
name_list = ['Tom', 'Lily', 'Rose']
print(name_list[-1])
print(name_list[-2])
print(name_list[-3])
```

打印结果为：
```output
Rose
Lily
Tom
```

嵌套列表的下标（索引）
如果列表是嵌套的列表，同样支持下标索引,类似C语言中的二维数组
![](/image/从零开始学Python/从零开始学Python（五）/list3.png)

语法：
```python
# 语法： 列表[下标索引]
my_list = [[1, 2], [9, 8]]
print(my_list[0][0])
print(my_list[0][1])
print(my_list[1][0])
print(my_list[1][1])
```

打印结果为：
```output
1
2
9
8
```
## 5.4 列表的常用操作
列表除了可以：
* 定义
* 使用下标索引获取值

此外，列表也提供了一系列功能：
* 插入元素
* 删除元素
* 清空列表
* 修改元素
* 统计元素个数

等等功能，这些功能我们都称之为：列表的方法

在Python中，如果将函数定义为class（类）的成员，那么函数会称之为：方法，如：
```python
# 函数
def add(self, x, y):
        return x + y

# 方法
class Student:

    def add(self, x, y):
        return x + y
```
方法和函数功能一样，有传入参数，有返回值，只是方法的使用格式不同：
* 函数的使用：num = add(1, 2)
* 方法的使用：student = Student()
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;num = student.add(1, 2)

![**列表常用方法**](/image/从零开始学Python/从零开始学Python（五）/列表常用方法.png)

### 5.4.1 index查询方法
* 查询某元素的下标
  功能：查找指定元素在列表中的下标，如果找不到，报错ValueError
  语法：列表.index(元素)
  index就是列表对象（变量）内置的方法（函数）

示例：
```python
# 列表的查询功能
my_list = ['itheima', 'itcast', 'python']
index = my_list.index('itcast')
print(f"'itcast'在列表中的下标索引值是：{index}")
```

打印结果为：
```output
'itcast'在列表中的下标索引值是：1
```

### 5.4.2 列表修改方法
#### 5.4.2.1 修改特定位置（索引）的元素值：
语法：列表[下标] = 值
可以使用如上语法，直接对指定下标（正向、反向下标均可）的值进行重新赋值（修改）

示例：
```python
# 列表的修改功能
my_list = ['itheima', 'itcast', 'python']
my_list[2] = 'java'
print(f"列表修改元素后为：{my_list}")
```

打印结果为：
```output
列表修改元素后为：['itheima', 'itcast', 'java']
```

#### 5.4.2.2 insert插入方法：
语法：列表.insert(下标, 元素)，在指定的下标位置插入指定的元素

示例：
```python
# 列表的插入功能
my_list = ['itheima', 'itcast', 'python']
my_list.insert(1, 'java')
print(f"列表插入元素后为：{my_list}")
```

打印结果为：
```output
列表插入元素后为：['itheima', 'java', 'itcast', 'python']
```

#### 5.4.2.3 append追加元素方法：
语法：列表.append(元素)，将指定元素追加到列表的尾部

示例：
```python
# 列表的追加功能1
my_list = ['itheima', 'itcast', 'python']
my_list.append('java')
print(f"列表追加元素后为：{my_list}")
```

打印结果为：
```output
列表追加元素后为：['itheima', 'itcast', 'python', 'java']
```

#### 5.4.2.4 extend追加元素方法：
语法：列表.extend(其他数据容器)，将其他数据容器的内容取出，依次追加到列表的尾部

示例：
```python
# 列表的追加功能2
my_list = [1, 2, 3]
my_list.extend([4, 5, 6])
print(f"列表在追加了一个新的列表后为：{my_list}")
```

打印结果为：
```output
列表在追加了一个新的列表后为：[1, 2, 3, 4, 5, 6]
```

#### 5.4.2.5 del删除方法
语法1：del 列表[下标]
语法2：列表.pop(下标)

示例：
```python
# 删除元素
my_list = [1, 2, 3]

# 方式1
del my_list[0]
print(f"列表删除元素后为:{my_list}")

# 方式2
my_list.pop(0)
print(f"列表删除元素后为:{my_list}")
```

打印结果为：
```output
列表删除元素后为:[2, 3]
列表删除元素后为:[3]
```

#### 5.4.2.6 remove删除某元素在列表中的第一个匹配项
语法：列表.remove(元素)

示例：
```python
# 列表删除第一个匹配项
my_list = [1, 2, 3, 2, 3]
my_list.remove(2)
print(f"列表删除第一个匹配项后为：{my_list}")
```

打印结果为：
```output
列表删除第一个匹配项后为：[1, 3, 2, 3]
```

#### 5.4.2.7 clear清空列表方法
语法：列表.clear()

示例：
```python
# 清空列表
my_list = [1, 2, 3,]
my_list.clear()
print(f"清空列表后为：{my_list}")
```

打印结果为：
```output
清空列表后为：[]
```

#### 5.4.2.8 count统计数量方法
语法：列表.count(元素)

示例：
```python
# 统计某个元素数量
my_list = [1, 2, 3, 2, 3, 2]
num = my_list.count(2)
print(f"列表中'2'的数量为：{num}")
```

打印结果为：
```output
列表中'2'的数量为：3
```

#### 5.4.2.9 len统计长度方法
语法：len(列表)

示例：
```python
# 统计列表所有元素数量
my_list = [1, 2, 3, 2, 3, 2]
num = len(my_list)
print(f"列表中所有元素的数量为：{num}")
```

打印结果为：
```output
列表中所有元素的数量为：6
```

## 5.5 列表的常用操作练习
有一个列表，内容是：[21, 25, 21, 23, 22, 20]，记录的是一批学生的年龄

请通过列表的功能（方法），对其进行：
1. 定义这个列表，并用变量接收它
2. 追加一个数字31，到列表的尾部
3. 追加一个新列表[29, 33, 30]，到列表的尾部
4. 取出第一个元素（应是：21）
5. 取出最后一个元素（应是：30）
6. 查找元素31，在列表中的下标位置


具体代码实现：
```python
# 定义列表
age_list = [21, 25, 21, 23, 22, 20]

# 追加31
age_list.append(31)

# 追加新列表[29, 33, 30]
age_list.extend([29, 33, 30])

# 取出第一个元素
num1 = age_list[0]
print(f"列表中的第一个元素是：{num1}")

# 取出最后一个元素
num2 = age_list[-1]
print(f"列表中最后一个元素是：{num2}")

# 查找31在列表中的下标
index = age_list.index(31)
print(f"元素31在列表中的下标是：{index}")
```

打印结果为：
```output
列表中的第一个元素是：21
列表中最后一个元素是：30
元素31在列表中的下标是：6
```

## 5.6 列表的遍历
### 5.6.1 while循环遍历列表

语法：
index = 0
while index < len(列表):

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;元素 = 列表[index]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对元素进行处理
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index += 1

示例：
```python
# while循环遍历列表
my_list = ['itheima', 'itcast', 'python']

index = 0
while index < len(my_list):
    s = my_list[index]
    print(s)
    index += 1
```

打印结果为：
```output
itheima
itcast
python
```

### 5.6.2 for循环遍历列表

语法：
for 临时变量 in 变量容器：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对临时变量进行处理


示例：
```python
# for循环遍历列表
my_list = [1, 2, 3, 4, 5]

for element in my_list:
    print(element)
```

打印结果为：
```output
1
2
3
4
5
```

## 5.6.3 while循环与for循环的区别
* 在循环控制上：
  * while循环可以自定循环条件，并自行控制
  * for循环不可以自定循环条件，只可以一个个从容器内取出数据
* 在无限循环上：
  * while循环可以通过条件控制做到无限循环
  * for循环理论上不可以，因为被遍历的容器容量不是无限的
* 在使用场景上：
  * while循环适用于任何可以想要循环的场景
  * for循环适用于遍历数据容器的场景或简单的固定次数循环场景

## 5.7 数据容器：tuple（元组）
元组同列表一样，都是可以封装多个、不同类型的元素在内。
但最大的不同点在于：**元组一旦定义完成就不可以修改，相当于一个只读的列表**

基本语法：
元组定义：定义元组使用小括号，且使用逗号隔开各个数据，数据可以是不同的数据类型

\# 定义元组字面量
(元素, 元素, ......, 元素)

\# 定义元组变量
变量名称 = (元素, 元素, ......, 元素)

\# 定义空元组
变量名称 = ()
变量名称 = tuple()

示例：
```python
# 定义元组
t1 = (1, "python", True)

# 定义空元组
t2 = ()
t3 = tuple()

# 定义单个元素的元组
t4 = ('python',)

print(f"t1的类型是{type(t1)}，内容是{t1}")
print(f"t2的类型是{type(t2)}，内容是{t2}")
print(f"t3的类型是{type(t3)}，内容是{t3}")
```

打印结果为：
```output
t1的类型是<class 'tuple'>，内容是(1, 'python', True)
t2的类型是<class 'tuple'>，内容是()
t3的类型是<class 'tuple'>，内容是()
```

注意：元组只有一个数据时，这个数据后面要添加逗号
```python
# 定义1个元素的元组
t4 = ('python',)

print(f"t1的类型是{type(t4)}，内容是{t4}")
```

打印结果为：
```output
t4的类型是<class 'tuple'>，内容是('python',)
```

元组也支持嵌套：
```python
# 元组的嵌套
t5 = ((1, 2, 3), (4, 5, 6))

print(f"t5的类型是{type(t5)}，内容是{t5}")
print(t5[0][0])
```

打印结果为：
```output
t5的类型是<class 'tuple'>，内容是((1, 2, 3), (4, 5, 6))
1
```

## 5.8 元组的常用操作
元组常用方法：
![**元组常用方法**](/image/从零开始学Python/从零开始学Python（五）/元组常用方法.png)

### 5.8.1 index查询方法
语法：
变量 = 元组.index(元素)

示例：
```python
# index查找方法
t1 = (1, "python", True)
index = t1.index(1)
print(f"在元组t1中查找1的下标是：{index}")
```

打印结果为：
```output
在元组t1中查找1的下标是：0
```

### 5.8.2 count统计数量方法
语法：
变量 = 元组.count(元素)

示例：
```python
# count统计方法
t1 = (1, "python", "python", "python", True)
num = t1.count("python")
print(f"元组t1中共有元素'python'{num}个")
```

打印结果为：
```output
元组t1中共有元素'python'3个
```

### 5.8.3 len统计长度方法
语法：
变量 = len(元组)

示例：
```python
# len统计元组元素数量方法
t1 = (1, "python", "python", "python", True)
num = len(t1)
print(f"元组t1中共有元素{num}个")
```

打印结果为：
```output
元组t1中共有元素5个
```

## 5.9 元组的遍历

### 5.9.1 while循环遍历元组
语法：
index = 0
while index < len(元组):

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;元素 = 元组[index]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对元素进行处理
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index += 1

示例：
```python
# while循环遍历列元组
t1 = (1, "python", True)

index = 0
while index < len(t1):
    print(f"元组t1中有元素：{t1[index]}")
    index += 1
```

打印结果为：
```output
元组t1中有元素：1
元组t1中有元素：python
元组t1中有元素：True
```

### 5.9.2 for循环遍历元组

语法：
for 临时变量 in 变量容器：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对临时变量进行处理


示例：
```python
# for循环遍历元组
t1 = (1, "python", True)

for element in t1:
    print(f"元组t1中有元素：{element}")
```

打印结果为：
```output
元组t1中有元素：1
元组t1中有元素：python
元组t1中有元素：True
```

**注：不可修改元组的内容，但可以修改元组内的list的内容（增删改查等），如t1 = (1, 2, ['itheima', 'itcast'])**

## 5.10 数据容器：字符串（string）
字符串是字符的容器，和其他容器一样，字符串也可以通过下标进行访问：
* 从前往后，下标从0开始
* 从后往前，下标从-1开始

示例：
```python
# 通过下标索引取值
my_str = "itheima and itcast"

value1 = my_str[2]
value2 = my_str[-16]

print(f"从字符串{my_str}取下标为2的元素是：{value1}，从字符串{my_str}取下标为-16的元素是：{value2}")
```

打印结果为：
```output
从字符串itheima and itcast取下标为2的元素是：h，从字符串itheima and itcast取下标为-16的元素是：h
```

**注：同元组一样，字符串是一个不可修改的数据容器**

## 5.11 字符串的常用操作
字符串常用方法：
![**字符串常用方法**](/image/从零开始学Python/从零开始学Python（五）/字符串常用方法.png)

### 5.11.1 index查询方法
语法：
变量 = 字符串.index(元素)

示例：
```python
# index查询方法
my_str = "itheima and itcast"

index = my_str.index("and")
print(f"在字符串{my_str}中查找'and'，其下标为：{index}")
```

打印结果为：
```output
在字符串itheima and itcast中查找'and'，其下标为：8
```

### 5.11.2 replace替换方法
语法：
新字符串 = 字符串.replace(字符串1, 字符串2)
功能：将字符串内的全部字符串1，替换为字符串2
注意：不是修改字符串本身，而是得到了一个新的字符串

示例：
```python
# replace替换方法
my_str = "itheima and itcast"
my_new_str = my_str.replace("it", "程序")
print(f"替换后的新字符串为：{my_new_str}")
```

打印结果为：
```output
替换后的新字符串为：程序heima and 程序cast
```

### 5.11.3 split分割方法
语法：
字符串.split(分隔符字符串)
功能：按照指定的分隔符字符串，将字符串划分为多个字符串，并存入列表对象中
注意：字符串本身不变，而是得到了一个列表对象

示例：
```python
# split分割方法
my_str = "hello itheima and itcast"
my_str_list = my_str.split(" ")
print(f"将字符串{my_str}进行split分割后得到：{my_str_list}，其类型为：{type(my_str_list)}")
```

打印结果为：
```output
将字符串hello itheima and itcast进行split分割后得到：['hello', 'itheima', 'and', 'itcast']，其类型为：<class 'list'>
```

### 5.11.4 strip规整方法
#### 5.11.4.1 字符串的规整操作（去前后空格）
语法：
字符串.strip()

示例：
```python
# strip规整操作 （去前后空格）
my_str = "   itheima and itcast   "
print(f"字符串{my_str}规整后为：{my_str.strip()}")
```

打印结果为：
```output
字符串   itheima and itcast   规整后为：itheima and itcast
```

#### 5.11.4.2 字符串的规整操作（去前后指定字符串）
语法：
字符串.strip(字符串)

示例：
```python
# strip规整操作2（去前后指定字符串）
my_str = "12itheima and itcast21"
print(f"字符串{my_str}规整后为：{my_str.strip("12")}")
```

打印结果为：
```output
字符串12itheima and itcast21规整后为：itheima and itcast
```
**注：传入的是"12"其实就是："1"和"2"都会移除，是按照单个字符**

### 5.11.5 count统计数量方法
语法：
变量 = 字符串.count(元素)

示例：
```python
# count统计数量方法
my_str = "itheima and itcast"
num = my_str.count("i")
print(f"字符串{my_str}中共有元素'i'{num}个")
```

打印结果为：
```output
字符串itheima and itcast中共有元素'i'3个
```

### 5.11.6 len统计长度方法
语法：
变量 = len(字符串)

示例：
```python
# len统计元组元素数量方法
my_str = "itheima and itcast"
num = len(my_str)
print(f"字符串{my_str}中共有元素{num}个")
```

打印结果为：
```output
字符串itheima and itcast中共有元素18个
```

## 5.12 字符串的遍历

### 5.12.1 while循环遍历字符串
语法：
index = 0
while index < len(字符串):

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;元素 = 字符串[index]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对元素进行处理
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index += 1

示例：
```python
# while循环遍历列字符串
my_str = "itheima"

index = 0
while index < len(my_str):
    print(f"元组t1中有元素：{my_str[index]}")
    index += 1
```

打印结果为：
```output
元组t1中有元素：i
元组t1中有元素：t
元组t1中有元素：h
元组t1中有元素：e
元组t1中有元素：i
元组t1中有元素：m
元组t1中有元素：a
```

### 5.12.2 for循环遍历元组

语法：
for 临时变量 in 变量容器：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对临时变量进行处理


示例：
```python
# for循环遍历字符串
my_str = "itheima"

for element in my_str:
    print(f"字符串{my_str}中有元素：{element}")
```

打印结果为：
```output
字符串itheima中有元素：i
字符串itheima中有元素：t
字符串itheima中有元素：h
字符串itheima中有元素：e
字符串itheima中有元素：i
字符串itheima中有元素：m
字符串itheima中有元素：a
```

## 5.13 字符串基本操作练习案例
给定一个字符串："itheima itcast boxuegu"
* 统计字符串中有多少个"it"字符
* 将字符串内的空格全部替换为字符"|"
* 并按照"|"进行字符串分割，得到列表

具体实现代码如下：
```python
my_str = "itheima itcast boxuegu"

# count方法
num = my_str.count("it")
print(f"该字符串中有{num}个'it'字符")

# replace方法
my_new_str = my_str.replace(" ", "|")
print(f"替换后的字符串为：{my_new_str}")

# split方法
my_str_list = my_new_str.split("|")
print(f"分割后的字符串列表为：{my_str_list}")
```

打印结果如下：
```output
该字符串中有2个'it'字符
替换后的字符串为：itheima|itcast|boxuegu
分割后的字符串列表为：['itheima', 'itcast', 'boxuegu']
```

## 5.14 序列及其切片操作
序列：指内容连续有序，可使用下标索引的一类数据容器
列表、元组、字符串均可视为序列

序列的常用操作：切片
序列支持切片，即：列表、元组、字符串均支持切片操作
切片：从一个序列中取出一个子序列

语法：
序列[起始下标:结束下标:步长]
表示从序列中，从指定位置开始，依次取出元素，到指定位置结束，得到一个新序列：
* 起始下标表示从何处开始，可以留空，留空视作从头开始
* 结束下标（不含）表示何处结束，可以留空，留空视作截取到结尾
* 步长表示依次取元素的间隔：
  * 步长1表示一个个取元素
  * 步长2表示每次跳过1个元素取
  * 步长N表示每次跳过N-1个元素取
  * 步长为负数表示反向取（注意，起始下标和结束下标也要反向标记） 
* 此操作不影响序列本身，而是得到了一个新的序列

示例：
```python
# 对列表list进行切片
my_list = [0, 1, 2, 3, 4, 5, 6]
my_new_list = my_list[1:4]
print(f"切片得到的新列表为：{my_new_list}")

# 对元组tuple切片
my_tuple = (0, 1, 2, 3, 4, 5, 6)
my_new_tuple = my_tuple[2:5:2]
print(f"切片得到的新元组为：{my_new_tuple}")

# 对字符串string切片
my_str = "itheima"
my_new_str = my_str[::-1] # 相当于反转字符串
print(f"切片得到的新字符串为：{my_new_str}")
```

打印结果为:
```output
切片得到的新列表为：[1, 2, 3]
切片得到的新元组为：(2, 4)
切片得到的新字符串为：amiehti
```

## 5.15 数据容器：set（集合）

集合：不支持元素重复，且无法保证元素有序，但集合允许修改

基本语法：

\# 定义集合字面量
{元素, 元素, ......, 元素}

\# 定义集合变量
变量名称 = {元素, 元素, ......, 元素}

\# 定义空变量
变量名称 = set()

示例
```python
# 定义集合
my_set = {'itheima', 'itcast', 'python', 'itheima', 'itcast', 'python', 'itheima'}
# 定义空集合
my_empty_set = set()
print(f"my_set的内容是：{my_set}，它的类型是{type(my_set)}")
print(f"my_empty_set的内容是：{my_empty_set}，它的类型是{type(my_empty_set)}")
```

打印结果为：
```output
my_set的内容是：{'python', 'itcast', 'itheima'}，它的类型是<class 'set'>
my_empty_set的内容是：set()，它的类型是<class 'set'>
```

## 5.16 集合的常用操作
集合常用方法：
![**集合常用方法**](/image/从零开始学Python/从零开始学Python（五）/集合常用方法.png)

### 5.16.1 add添加方法
语法：
集合.add(元素)

示例：
```python
# add添加方法
my_set = {'itheima', 'itcast', 'python'}
my_set.add("java")
print(f"集合my_set添加新元素后为：{my_set}")
```

打印结果为：
```output
集合my_set添加新元素后为：{'itcast', 'itheima', 'python', 'java'}
```

### 5.16.2 remove移除方法
语法：
集合.remove(元素)

示例：
```python
# remove移除方法
my_set = {'itheima', 'itcast', 'python'}
my_set.remove("python")
print(f"集合my_set移除元素后为：{my_set}")
```

打印结果为：
```output
集合my_set移除元素后为：{'itcast', 'itheima'}
```

### 5.16.3 pop取出方法
语法：
集合.pop()
功能：从集合中随机取出一个元素，同时将该元素从集合中删除

示例：
```python
# pop取出元素方法
my_set = {'itheima', 'itcast', 'python'}
element = my_set.pop()
print(f"从集合my_set中取出的元素为：{element}，取出该元素后集合为：{my_set}")
```

打印结果为：
```output
从集合my_set中取出的元素为：itheima，取出该元素后集合为：{'itcast', 'python'}
```

### 5.16.4 clear清空方法
语法：
集合.clear()

示例：
```python
# clear清空方法
my_set = {'itheima', 'itcast', 'python'}
my_set.clear()
print(f"集合my_set清空后为：{my_set}")
```

打印结果为：
```output
集合my_set清空后为：set()
```

### 5.16.5 difference差集方法
语法：
集合1.difference(集合2)
功能：取出集合1和集合2的差集（集合1有的而集合2没有的），集合1和集合2不变

示例：
```python
# difference差集方法
my_set1 = {'itheima', 'itcast', 'python', 'c'}
my_set2 = {'itheima', 'itcast', 'python', 'java'}
my_new_set = my_set1.difference(my_set2)
print(f"集合my_set1清与集合my_set2的差集为：{my_new_set}")
```

打印结果为：
```output
集合my_set1清与集合my_set2的差集为：{'c'}
```

### 5.16.6 difference_update消除差集方法
语法：
集合1.difference_update(集合2)
功能：对比集合1和集合2，在集合1内，删除和集合2相同的元素

示例：
```python
# difference_update消除差集方法
my_set1 = {'itheima', 'itcast', 'python', 'c'}
my_set2 = {'itheima', 'itcast', 'python', 'java'}
my_set1.difference(my_set2)
print(f"消除集合my_set1与集合my_set2的差集后my_set1变为：{my_set1}")
```

打印结果为：
```output
消除集合my_set1与集合my_set2的差集后my_set1变为：{'c'}
```

### 5.16.7 union合并方法
语法：
集合1.union(集合2)
功能：将集合1和集合2合并后得到一个新集合，集合1和集合2不变

示例：
```python
# union合并方法
my_set1 = {'itheima', 'itcast', 'python', 'c'}
my_set2 = {'itheima', 'itcast', 'python', 'java'}
my_new_set = my_set1.union(my_set2)
print(f"集合my_set1与集合my_set2的合并后为：{my_new_set}")
```

打印结果为：
```output
集合my_set1与集合my_set2的合并后为：{'java', 'itheima', 'c', 'python', 'itcast'}
```

### 5.16.8 len统计长度方法
语法：
len(集合)

示例：
```python
# len统计长度方法
my_set = {'itheima', 'itcast',  'c', 'python', 'itheima',}
num = len(my_set)
print(f"集合my_set的长度为为：{num}")
```

打印结果为：
```output
集合my_set的长度为为：4
```

## 5.17 集合的遍历
由于集合不支持下标索引，所以只能使用for循环进行遍历

语法：
for 临时变量 in 变量容器：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对临时变量进行处理

示例：
```python
# 集合遍历
my_set = {'itheima', 'itcast',  'c', 'python', 'itheima',}
for element in my_set:
    print(f"集合my_set中有元素：{element}")
```

打印结果为：
```output
集合my_set中有元素：c
集合my_set中有元素：itheima
集合my_set中有元素：python
集合my_set中有元素：itcast
```

## 5.18 集合基本操作练习案例
信息去重：
有如下列表对象：
my_list = ['黑马程序员', '传智播客', '黑马程序员', '传智播客', 'itheima', 'itcast', 'itheima', 'itcast', 'best']

请：
* 定义一个空集合
* 通过for循环遍历列表
* 在for循环中将列表的元素添加至集合
* 最终得到的元素去重后的集合对象，并打印输出

具体实现代码如下：
```python
# 练习案例
my_list = ['黑马程序员', '传智播客', '黑马程序员', '传智播客', 'itheima', 'itcast', 'itheima', 'itcast', 'best']
my_set = set()

print("----------列表---------")
for element in my_list:
    print(f"列表my_list中有元素：{element}")
    my_set.add(element)

print("----------集合---------")

for element in my_set:
    print(f"集合my_set中有元素：{element}")
```

打印结果为：
```output
----------列表---------
列表my_list中有元素：黑马程序员
列表my_list中有元素：传智播客
列表my_list中有元素：黑马程序员
列表my_list中有元素：传智播客
列表my_list中有元素：itheima
列表my_list中有元素：itcast
列表my_list中有元素：itheima
列表my_list中有元素：itcast
列表my_list中有元素：best
----------集合---------
集合my_set中有元素：黑马程序员
集合my_set中有元素：传智播客
集合my_set中有元素：itheima
集合my_set中有元素：itcast
集合my_set中有元素：best
```

## 5.19 数据容器：dict（字典、映射）

字典：可以按照[Key]找出对应的[Value]，其中[Key]不可以重复，后面的[Key]会覆盖前面的[Key]

基本语法：

\# 定义字典字面量
{key: value, key: value, ......, key:value}

\# 定义字典变量
my_dict = {key: value, key: value, ......, key:value}

\# 定义空字典
my_dict = {}
my_dict = dict()

示例：
```python
# 定义字典
my_dict0 = {
    "小明": 99,
    "小红": 88,
    "小强": 77
}

# 定义空字典
my_dict1 = {}
my_dict2 = dict()

print(f"字典0的内容是：{my_dict0}，字典0的类型是：{type(my_dict0)}")
print(f"字典1的内容是：{my_dict1}，字典1的类型是：{type(my_dict1)}")
print(f"字典2的内容是：{my_dict2}，字典2的类型是：{type(my_dict2)}")
```

打印结果为：
```output
字典0的内容是：{'小明': 99, '小红': 88, '小强': 77}，字典0的类型是：<class 'dict'>
字典1的内容是：{}，字典1的类型是：<class 'dict'>
字典2的内容是：{}，字典2的类型是：<class 'dict'>
```

## 5.20 字典数据的获取
语法：
字典[Key]

示例：
```python
# 字典数据的获取
my_dict = {
    "小明": 99,
    "小红": 88,
    "小强": 77
}

num = my_dict["小明"]
print(f"字典中'小明'对应的值为：{num}")
```

打印结果为：
```output
字典中'小明'对应的值为：99
```

## 5.21 字典的嵌套
字典的Key和Value可以使任意数据类型（Key不可以是字典）

示例：
记录表格：
| 姓名   | 语文 | 数学 | 英语 |
| ------ | ---- | ---- | ---- |
| 小明 | 77   | 66   | 33  |
| 小红 | 88   | 86   | 55  |
| 小强 | 99   | 96   | 66  |
```python
# 字典的嵌套
score_dict = {
    "小明": {
      "语文": 77,
      "数学": 66, 
      "英语": 33},
    "小红": {
      "语文": 88, 
      "数学": 86, 
      "英语": 55},
    "小强": {
      "语文": 99, 
      "数学": 96, 
      "英语": 66}
}

print(f"学生的考试成绩是：{score_dict}")
```

打印结果为：
```output
学生的考试成绩是：{'小明': {'语文': 77, '数学': 66, '英语': 33}, '小红': {'语文': 88, '数学': 86, '英语': 55}, '小强': {'语文': 99, '数学': 96, '英语': 66}}
```

## 5.22 从嵌套字典中获取数据
语法：
字典[Key][Key对应的Value中的Key]

示例：
```python
# 获取嵌套字典的数据
score_dict = {
    "小明": {
      "语文": 77,
      "数学": 66,
      "英语": 33},
    "小红": {
      "语文": 88,
      "数学": 86,
      "英语": 55},
    "小强": {
      "语文": 99,
      "数学": 96,
      "英语": 66}
}

score = score_dict["小明"]["数学"]
print(f"小明的数学成绩为：{score}")
```

打印结果为：
```output
小明的数学成绩为：66
```
## 5.23 字典的常用操作
字典常用方法：
![**字典常用方法**](/image/从零开始学Python/从零开始学Python（五）/字典常用方法.png)

### 5.23.1 新增元素方法
语法：
字典[Key] = Value

示例：
```python
# 字典添加数据
my_dict = {
    "小明": 99,
    "小红": 88,
    "小强": 77
}

my_dict["小绿"] = 66
print(f"字典的内容为：{my_dict}")
```

打印结果为：
```output
字典的内容为：{'小明': 99, '小红': 88, '小强': 77, '小绿': 66}
```

### 5.23.2 更新元素方法
语法：
字典[Key] = Value

示例：
```python
# 字典更新数据
my_dict = {
    "小明": 99,
    "小红": 88,
    "小强": 77
}

my_dict["小明"] = 66
print(f"字典更新后的内容为：{my_dict}")
```

打印结果为：
```output
字典更新后的内容为：{'小明': 66, '小红': 88, '小强': 77}
```

### 5.23.3 pop删除方法
语法：
字典.pop(Key)
功能：获得指定的Key的Value，同时字典被修改，指定的Key的数据被删除

示例：
```python
# 字典删除数据
my_dict = {
    "小明": 99,
    "小红": 88,
    "小强": 77
}

my_dict.pop("小明")
print(f"字典更新后的内容为：{my_dict}")
```

打印结果为：
```output
字典更新后的内容为：{'小红': 88, '小强': 77}
```

### 5.23.4 clear清空方法
语法：
字典.clear()

示例：
```python
# 字典清空方法
my_dict = {
    "小明": 99,
    "小红": 88,
    "小强": 77
}

my_dict.clear()
print(f"字典更新后的内容为：{my_dict}")
```

打印结果为：
```output
字典更新后的内容为：{}
```

### 5.23.5 keys获取全部Key方法
语法：
字典.keys()

示例：
```python
# 获取字典全部key方法
my_dict = {
    "小明": 99,
    "小红": 88,
    "小强": 77
}

keys = my_dict.keys()
print(f"字典中的所有key为：{keys}")
```

打印结果为：
```output
字典中的所有key为：dict_keys(['小明', '小红', '小强'])
```

### 5.23.6 len统计长度方法
语法：
len(字典)

示例：
```python
# len统计字典长度
my_dict = {
    "小明": 99,
    "小红": 88,
    "小强": 77
}

num = len(my_dict)
print(f"字典中共有{num}个元素")
```

打印结果为：
```output
字典中共有3个元素
```


## 5.24 字典的遍历
方法1：通过keys进行遍历
for key in keys:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(f"字典的value是：{my_dict[key]}")

示例：
```python
# 字典的遍历
my_dict = {
    "小明": 99,
    "小红": 88,
    "小强": 77
}

keys = my_dict.keys()
for key in keys:
    print(f"字典的key是：{key}")
    print(f"字典的value是：{my_dict[key]}")
```

打印结果为：
```output
字典的key是：小明
字典的value是：99
字典的key是：小红
字典的value是：88
字典的key是：小强
字典的value是：77
```

方法2：直接对字典进行for循环
语法：
for key in my_dict:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(f"字典的value是：{my_dict[key]}")

示例：
```python
# 字典的遍历
my_dict = {
    "小明": 99,
    "小红": 88,
    "小强": 77
}

for key in my_dict:
    print(f"字典的key是：{key}")
    print(f"字典的value是：{my_dict[key]}")
```

打印结果为：
```output
字典的key是：小明
字典的value是：99
字典的key是：小红
字典的value是：88
字典的key是：小强
字典的value是：77
```

## 5.25 五种数据容器总结
数据容器可以从以下视角进行简单的分类：
* 是否支持下标索引：
  * 支持：列表、元组、字符串 - 序列类型
  * 不支持：集合、字典 - 非序列类型
* 是否支持重复元素：
  * 支持：列表、元组、字符串 - 序列类型
  * 不支持：集合、字典 - 非序列类型
* 是否可以修改：
  * 支持：列表、集合、字典
  * 不支持：元组、字符串

![**数据容器特点对比**](/image/从零开始学Python/从零开始学Python（五）/数据容器特点对比.png)

## 5.26 容器通用操作
![**容器通用操作**](/image/从零开始学Python/从零开始学Python（五）/容器通用操作.png)

sorted通用排序操作：
语法：
sorted(容器, [reverse=True])
功能：对容器内元素进行排序，排序之后全部变为列表对象，reverse=True为正向排序，reverse=False为逆向排序

示例：
```python
# sorted排序方法
my_list = [3, 1, 2, 5, 4]
my_tuple = (3, 1, 2, 5, 4)
my_str = "bdcefga"
my_set = {3, 1, 2, 5, 4}
my_dict = {"key3": 1, "key1": 2, "key2": 3, "key5": 4, "key4": 5}

print(f"列表对象的排序结果为：{sorted(my_list)}")
print(f"元组对象的排序结果为：{sorted(my_tuple)}")
print(f"字符串对象的排序结果为：{sorted(my_str)}")
print(f"集合对象的排序结果为：{sorted(my_set)}")
print(f"字典对象的排序结果为：{sorted(my_dict)}")
```

打印结果为：
```output
列表对象的排序结果为：[1, 2, 3, 4, 5]
元组对象的排序结果为：[1, 2, 3, 4, 5]
字符串对象的排序结果为：['a', 'b', 'c', 'd', 'e', 'f', 'g']
集合对象的排序结果为：[1, 2, 3, 4, 5]
字典对象的排序结果为：['key1', 'key2', 'key3', 'key4', 'key5']
```


