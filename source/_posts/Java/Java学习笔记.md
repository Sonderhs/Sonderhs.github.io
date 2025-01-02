---
title: Java学习笔记
tags: Java
categories: Java
top_img: transparent
date: 2025-1-2 00:00:00
copyright: false
description: Java学习笔记
cover: ../image/Java学习笔记/1.JPG
---

**2025.01.02**
# 第一章 Java入门
## 1.1 Java数据类型包括：
* 整数：byte,short,int,long(需要加上L标识)
* 浮点数：float(需要加上F标识),double
* 字符：char
* 布尔：bool

## 1.2 Java键盘输入输出：
```java
import java.util.Scanner;

//键盘录入
Scanner sc = new Scanner(System.in);
int i = sc.nextIn();
//输出
System.out.println(i);
```

## 1.3 隐式转化
Java中的数据类型转换遵循两个原则：
* 取值范围小的和取值范围大的进行运算，小的会先提升为大的再运算
* byte,short,char在运算时都会直接升为int再计算

## 1.4 数组的动态初始化
格式：数据类型[] 数组名 = new 数据类型[数组长度]
例如：
```java
int[] arr = new int[3];
```

## 1.5 随机数
随机数的使用：
```java
import java.util.Random;

Random r = new Random();
int number = r.nextInt(100) + 1;  //生成1~100的随机数
```

# 第二章 方法
## 2.1 方法
```java
//定义格式
public static void 方法名(){
    方法体；
}

//调用
方法名();
```

## 2.2 带参方法
```java
//定义格式
public static void 方法名(参数1, 参数2, ...){
    方法体;
}

//调用
方法名(参数1, 参数2, ...);
```

## 2.3 带返回值的方法
```java
//定义格式
public static 返回值类型 方法名(参数){
    方法体;
    return 返回值;
}

//调用(三种)
方法名(实参);
类型 变量名 = 方法名(实参);
System.out.println(方法名(实参));
```

## 2.4 方法的重载
* 在同一个类中定义了多个同名的方法，这些同名的方法具有同种功能
* 每个方法具有不同的参数类型或参数个数
* 简单来说就是：同一个类中，方法名相同，参数不同的方法

# 第三章 面向对象


# 第四章 字符串
## 4.1 创建string对象的两种方式
1. 直接赋值 
```java
String s1 = "abc";
```
2. new
```java
//1.空参构造
String s2 = new String();

//2.传递一个字符串
String s3 = new String("abc");

//3.传递一个字符数组
char[] chs = {'a', 'b', 'c', 'd'};
String s4 = new String(chs);

//4.传递一个字节数组
byte[] bytes = {97, 98, 99, 100};  //先转换成对应的ASCII码再进行拼接
String s5 = new String(bytes);

//输出为：abcd
```

## 4.2 字符串的常用方法
### 4.2.1 字符串的比较
“==”到底比较的是什么？
* 对于基本数据类型来说，比较的是数据值
* 对于引用数据类型来说，比较的是**地址值** 

字符串的比较：
1. boolen equals(要比较的字符串)：完全一样才是true，不忽略大小写
2. boolen equalIgnoreCase(要比较的字符串)：忽略大小写

### 4.2.2 遍历字符串
public char charAt(int index)：根据索引值返回字符
```java
for (int i = 0; i < str.length(); i++) {
    char c = str.charAt(i);
    System.out.println(c);
}
```

### 4.2.3 截取字符串
String substring(int beginIndex, int endIndex)：根据索引返回字符(包左不包右)
```java
String str = HelloWorld;
String cut = str.substring(0, 5);
System.out.println(cut);
//输出：Hello
```

### 4.2.4 替换字符串
String replace(旧值, 替换值)：将字符串中的旧值替换为替换值
```java
String phoneNumber = 15623838156;
phoneNumber = phoneNumber.replace("2383", "****");
System.out.println(phoneNumber);
//输出：156****8156
```

## 4.3 StringBuilder
StringBuilder是Java已经写好的类，Java在底层对它做了一些特殊处理，打印对象不是地址值而是属性值
### 4.3.1 StringBuilder构造方法
* public StringBuilder()：创建一个空白可变字符串对象，不含有任何内容
* public StringBuilder()：根据字符串的内容来创建可变字符串对象

例如：
```java
StringBuilder sb = new StringBuilder("abc");
```

### 4.3.2 StringBuilder常用方法
* public StringBuilder append(任意类型)：添加数据，并返回对象本身
* public StringBuilder reverse()：反转容器中的内容
* public int length()：返回长度(字符出现的个数)
* public String toString()：通过toString()就可以实现把StringBuilder转换为String

例：
```java
public class SB {
    public static void main(String[] args) {
        //创建对象
        StringBuilder sb = new StringBuilder("abc");
        //添加元素
        sb.append(1);
        //反转
        sb.reverse();
        //获取长度
        int len = sb.length();
        System.out.println(len);

        //转换为String
        String str = sb.toString();
        System.out.println(str);
    }
}
//输出为: 4
//       1cba
```

## 4.4 StringJoiner
* StringJoiner跟StringBuilder一样，也可以看成是一个容器，创建之后里面的内容是可变的
* 作用：提高字符串的操作效率，而且代码编写特别简洁，但是目前市场上很少有人用
* JDK8时出现
### 4.4.1 StringJoiner的构造方法
* public StringJoiner(间隔符号)：创建一个StringJoiner对象，指定拼接时间的间隔符号
* public StringJoiner(间隔符号, 开始符号, 结束符号)：创建一个StringJoiner对象，指定拼接时的间隔符号、开始符号和结束符号

例如：
```java
public class sj {
    public static void main(String[] args) {
        //创建对象
        StringJoiner sj = new StringJoiner("---");
        //添加元素
        sj.add("aaa").add("bbb").add("ccc");
        //打印结果
        System.out.println(sj);
    }
}
//输出为：aaa---bbb---ccc
```

### 4.4.2 StringJoiner成员方法
* public StringJoiner add(添加的内容)：添加数据并返回对象本身
* public int length()：返回长度(字符串出现的个数)
* public String toString()：返回一个字符串(该字符串就是拼接之后的结果)

例：
```java
public class sj {
    public static void main(String[] args) {
        //创建对象
        StringJoiner sj = new StringJoiner(",", "[", "]");
        //添加元素
        sj.add("aaa").add("bbb").add("ccc");
        //长度
        int len = sj.length();
        System.out.println(len);  //15
        //toString
        String str = sj.toString();
        //打印结果
        System.out.println(str);
    }
}
//输出为: 15
//       aaa---bbb---ccc
```

---------------------------------------------------- 
**2025.01.02**