---
title: 从零开始学Python(十)
tags: Python
categories: Python
top_img: ../image/从零开始学Python/从零开始学Python（十）/1.JPG
date: 2024-4-19 00:00:00
copyright: false
description: 从零开始学Python(十)
cover: ../image/从零开始学Python/从零开始学Python（十）/1.JPG
---

# 第十章 Python面向对象
与Java中类似，在Python中我们也可以使用对象进行组织数据：
1. 设计类（class）
2. 创建对象
3. 对象属性赋值

## 10.1 类的成员方法
类的使用语法：
class 类名称：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类的属性

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类的方法

* class是关键字，表示要定义类了
* 类的属性，即定义在类中的变量（成员变量）
* 类的行为，即定义在类中的函数（成员方法）

创建类对象的语法：
对象 = 类名称()

在类中：
* 不仅可以定义属性来记录数据
* 也可以定义函数用来记录行为
* 类中定义的属性（变量）我们称为：成员变量
* 类中定义的行为（函数）我们称为：成员方法

成员方法定义语法：
def 方法名(self, 形参1, ......, 形参N)：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方法体

其中，self关键字是必须填写的：
* 它用来表示类对象自身的意思
* 当我们使用类对象调用方法时，self会自动被python传入
* 在方法内部，想要访问类的成员变量，必须使用self
* 传参时可以忽略它

示例：
```python
# 定义一个带有成员方法的类
class Student:
    name = None

    def say_hi(self):
        print(f"大家好，我是{self.name}，希望大家多多关照")


stu = Student()
stu.name = "张三"
stu.say_hi()
```

打印结果为：
```output
大家好，我是张三，希望大家多多关照
```

## 10.2 构造方法
在Python类中可以使用：\_\_init__()方法，称之为构造方法，可以实现：
* 在创建对象（构造类）时，会自动执行
* 在创建对象（构造类）时，将传入参数自动传递给\_\_init__方法使用

示例：
```python
# 构造方法__init__()
class Student:
    # 属性的定义可以省略
    name = None
    age = None
    tel = None

    def __init__(self, name, age, tel):
        self.name = name
        self.age = age
        self.tel = tel
        print("Student类创建了一个对象")


student = Student("张三", 18, "123456789")
print(f"这个学生是：{student.name}，他的年龄是：{student.age}，他的电话号码是：{student.tel}")
```

打印结果为：
```output
Student类创建了一个对象
这个学生是：张三，他的年龄是：18，他的电话号码是：123456789
```

## 10.3 魔术方法
Python类内置的方法称之为魔术方法
### 10.3.1 \_\_init__()构造方法
具体见10.2

### 10.3.2 \_\_str__()字符串方法
功能：当类对象需要被转换为字符串时，会输出其内存地址，我们可以利用\_\_str__()方法，控制类转换为字符串的行为

示例：
```python
# __str__方法
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age


stu = Student("张三", 18)
print(stu)
print(str(stu))
```

打印结果为：
```output
<__main__.Student object at 0x00000258D1D85670>
<__main__.Student object at 0x00000258D1D85670>
```

使用\_\_str__()方法后：
示例：
```python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # str魔术方法
    def __str__(self):
        return f"Student类对象，name:{self.name},age:{self.age}"


stu = Student("张三", 18)
print(stu)
print(str(stu))
```

打印结果为：
```output
Student类对象，name:张三,age:18
Student类对象，name:张三,age:18
```

### 10.3.3 \_\_lt__()小于、大于符号比较方法
功能：直接对2个对象进行比较是不可以的，但是在类中实现\_\_lt__方法，即可同时完成：小于符号和大于符号两种比较。传入参数other（另一个对象），返回值为True或False；实际就是规定了两个对象比较时使用哪个属性进行比较

示例：
```python
# __lt__方法
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # le魔术方法
    def __lt__(self, other):
        return self.age < other.age


stu1 = Student("张三", 18)
stu2 = Student("李四", 20)
print(stu1 < stu2)
print(stu1 > stu2)
```

打印结果为：
```output
True
False
```

### 10.3.4 \_\_le__()小于等于、大于等于符号比较方法
功能：\_\_le__方法可以实现：小于等于符号和大于等于符号两种比较。传入参数other（另一个对象），返回值为True或False；实际就是规定了两个对象比较时使用哪个属性进行比较

示例：
```python
# __le__方法
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # le魔术方法
    def __le__(self, other):
        return self.age <= other.age


stu1 = Student("张三", 18)
stu2 = Student("李四", 20)
print(stu1 <= stu2)
print(stu1 >= stu2)
```

打印结果为：
```output
True
False
```

### 10.3.5 \_\_eq__()==符号比较方法
功能：\_\_eq__方法可以实现：等于符号的比较。传入参数other（另一个对象），返回值为True或False；实际就是规定了两个对象比较时使用哪个属性进行比较

示例：
```python
# __eq__方法
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # le魔术方法
    def __eq__(self, other):
        return self.age == other.age


stu1 = Student("张三", 18)
stu2 = Student("李四", 20)
print(stu1 == stu2)
```

打印结果为：
```output
False
```

## 10.4 封装
封装表示的是，将现实世界事物的属性、行为封装到类中，描述为：
* 成员变量
* 成员方法

从而实现程序对现实世界事物的描述

类中提供了私有成员的形式来实现对现实事物中不公开属性和行为的映射：
* 私有成员变量
* 私有成员方法

定义私有成员的方式很简单，只需要：
* 私有成员变量：变量名以__（两个下划线）开头
* 私有成员方法：方法名以__（两个下划线）开头

即可完成私有成员的设置

私有变量无法赋值，也无法获取值；私有方法无法直接被类对象使用

示例：
```python
# 含有私有变量和私有方法的类
class Phone:

    __current_voltage = None

    def __keep_single_core(self):
        print("让CPU以单核模式运行")
        

phone = Phone()
phone.__keep_single_core
```

打印结果为：
```output
# 发生报错，原因是'Phone' object has no attribute '__keep_single_core'，即'Phone'对象没有'__keep_single_core'这个方法
AttributeError: 'Phone' object has no attribute '__keep_single_core'. Did you mean: '_Phone__keep_single_core'?
```

私有成员无法被类对象使用，但是可以被其他成员使用：
示例：
```python
# 含有私有变量和私有方法的类
class Phone:
    __current_voltage = 0.5

    def __keep_single_core(self):
        print("让CPU以单核模式运行")

    def call_by_5G(self):
        if self.__current_voltage >= 1:
            print("电量充足，5G通话已开启")
        else:
            self.__keep_single_core()
            print("电量不足，已开启CPU单核模式")


phone = Phone()
phone.call_by_5G()
```

打印结果为：
```output
让CPU以单核模式运行
电量不足，已开启CPU单核模式
```

## 10.5 继承
继承：从父类那里继承（复制）来成员变量和成员方法（不含私有）
继承分为单继承和多继承

单继承：
语法：
class 类名（父类名）：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类内容体

示例：
```python
# 单继承演示
class Phone:
    IMEI = None       # 序列号
    producer = 'HM'   # 制造商

    def call_by_4g(self):
        print("4g通话")


class Phone2022(Phone):
    Face_Id = False

    def call_by_5g(self):
        print("2022年新功能：5g通话")


phone = Phone2022()
print(phone.producer)
phone.call_by_4g()
phone.call_by_5g()
```

打印结果为：
```output
HM
4g通话
2022年新功能：5g通话
```

多继承：
语法：
class 类名（父类1, 父类2, ......, 父类N）：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类内容体

示例：
```python
# 多继承演示
class Phone:
    IMEI = None  # 序列号
    producer = 'HM'  # 制造商

    def call_by_4g(self):
        print("4g通话")


class Phone2022():
    Face_Id = False

    def call_by_5g(self):
        print("2022年新功能：5g通话")


class Phone2024(Phone, Phone2022):
    Fingerprint_Id = True

    def call_by_6g(self):
        print("2024年新功能：6g通话")


phone = Phone2024()
print(phone.producer)
phone.call_by_4g()
phone.call_by_5g()
phone.call_by_6g()
```

打印结果为：
```output
HM
4g通话
2022年新功能：5g通话
2024年新功能：6g通话
```

pass关键字：
pass是站位语句，用来保证函数（方法）或类定义的完整性，表示无内容，空的意思 
当新的类不需要添加新功能时，可以直接使用：
class 类名（父类1, 父类2, ......, 父类N）：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pass

## 10.6 复写父类成员和调用父类成员
复写：
子类继承父类的成员变量和成员方法后，如果对其“不满意”，那么可以进行复写，即在子类中重新定义同名的属性或方法即可

示例：
```python
# 复写
class Phone:
    IMEI = None       # 序列号
    producer = 'ITCAST'   # 制造商

    def call_by_5g(self):
        print("5g通话")


class MyPhone(Phone):
    producer = 'ITHEIMA'

    def call_by_5g(self):
        print("CPU单核模式使用5g通话")


phone = MyPhone()
print(phone.producer)
phone.call_by_5g()
```

打印结果为：
```output
ITHEIMA
CPU单核模式使用5g通话
```

调用父类的同名成员
一旦复写父类成员，那么类对象调用成员时，就会调用复写后的新成员，如果需要使用被复写的父类成员，需要特殊的调用方式：
* 方式1：
  使用成员变量：父类名.成员变量
  使用成员方法：父类名.成员方法(self)
* 方式2：使用super()调用父类成员
  使用成员变量：super.成员变量
  使用成员方法：super.成员方法

示例：
```python
# 调用父类成员
class Phone:
    IMEI = None       # 序列号
    producer = 'ITCAST'   # 制造商

    def call_by_5g(self):
        print("父类使用5g通话")


class MyPhone(Phone):
    producer = 'ITHEIMA'

    def call_by_5g(self):
        print("--------------方式1--------------")
        print(f"父类的制造商是：{Phone.producer}")
        Phone.call_by_5g(self)
        print("--------------方式2--------------")
        print(f"父类的制造商是：{super().producer}")
        super().call_by_5g()
        print("CPU单核模式使用5g通话")


phone = MyPhone()
print(phone.producer)
phone.call_by_5g()
```

打印结果为：
```output
ITHEIMA
--------------方式1--------------
父类的制造商是：ITCAST
父类使用5g通话
--------------方式2--------------
父类的制造商是：ITCAST
父类使用5g通话
CPU单核模式使用5g通话
```

## 10.7 类型注解

### 10.7.1 变量的类型注解
类型注解：在代码中设计数据交互的地方，提供数据类型的注解（显式的说明）
主要功能：
* 帮助第三方IDE工具（如PyCharm）对代码进行类型判断，协助做代码提示
* 帮助开发者自身对变量进行类型注释

支持：
* 变量的类型注解
* 函数（方法）形参列表和返回值的类型注解

语法：
变量: 类型
也可以使用注释进行类型注解
语法：
\# type: 类型

示例：
```python
# 变量类型注解
# 类对象型注解
class Student:
    pass
    
stu: Student = Student()
# 基础数据类型注解
var_1: int = 10
# 基础容器类型注解
my_list: list = [1, 2, 3]
# 容器类型详细注解
my_new_list: list[int] = [1, 2, 3]
my_tuple: tuple[str, int, bool] = ('itheima', 10, True)
my_dict: dict[str, int] = {"itheima": 66}
# 利用注释进行类型注解
var_2 = random.randint(1, 10)  # type: int
var_3 = {"itheima": 66}  # type:dict
```
注：
* 元组类型设置类型详细注解时，需要将每一个元素都标记出来
* 字典类型设置类型详细注解时，需要两个类型，第一个是key，第二个是value
* 类型注解只是提示性的，而非决定性的。数据类型和注解类型无法队形也不会导致错误

### 10.7.2 函数和方法类型注解
语法：
* 对函数（方法）形参进行类型注解
  def 函数方法名(形参名: 类型, 形参名: 类型, ......):
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pass
* 对函数（方法）返回值进行类型注解
  def 函数方法名(形参名: 类型, 形参名: 类型, ......) -> 返回值类型:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pass


示例：
```python
# 函数方法类型注解
# 对形参进行类型注解
def add(x: int, y: int):
    return x + y


# 对返回值进行类型注解
def sub(x: int, y: int) -> int:
    return x - y
```

### 10.7.3 Union联合类型注解
Union适用于多类型变量或函数同时注解
语法：
from typing import Union  # 需要先导包
Union[类型, ......, 类型]

示例：
```python
# Union类型注解
from typing import Union

# 对变量进行注解
my_list: list[Union[str, int]] = [1, 2, 'itheima', 'itcast']
my_dict: dict[str, Union[str, int]] = {"name": "张三", "age": 18}

# 对函数（方法）进行类型注解
def func(data: Union[int, str]) -> Union[int, str]:
    pass
```

## 10.8 多态
多态：指的是多种状态，即完成某个行为时，使用不同的对象会得到不同的状态。即对于同样的函数（行为），传入不同的对象，得到不同的状态

多态常作用在继承关系上，比如：
* 函数（方法）形参声明接收父类对象
* 实际传入父类的子类对象进行工作

即：
* 以父类做定义声明
* 以子类做实际工作
* 用以获得同一行为，不同状态

示例：
```python
# 多态演示
# 定义父类Animal
class Animal:
    def speak(self):
        pass


# 定义子类Dog
class Dog(Animal):
    def speak(self):
        print("汪汪汪")


# 定义子类Cat
class Cat(Animal):
    def speak(self):
        print("喵喵喵")


def make_noise(animal: Animal):
    animal.speak()


dog = Dog()
cat = Cat()

make_noise(dog)
make_noise(cat)
```

打印结果为：
```output
汪汪汪
喵喵喵
```

抽象类（接口）：
父类Animal的speak方法是空实现，这样设计的含义是：
* 父类用来确定有哪些方法
* 具体的方法实现，由子类自行决定

这种写法就叫做抽象类
抽象类：含有抽象方法的类
抽象方法：方法体是空实现的（pass）称之为抽象方法
