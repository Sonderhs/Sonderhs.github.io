---
title: Java常用API
tags: Java
categories: Java
top_img: transparent
date: 2025-3-3 00:00:00
copyright: false
description: Java常用API
cover: ../image/Java/Java常用API/1.JPG
---

# 第一章 Math
## 1.1 Math介绍
Math类包含用于执行基本数学运算的方法，如初等指数、对数、平方根和三角函数。
Math私有化构造方法，所有方法都是静态的。
Math类所在包为java.lang包，因此在使用的时候不需要进行导包。并且Math类被final修饰了，因此该类是不能被继承的。
## 1.2 Math常用方法
### 1.2.1 abs():获取参数绝对值
* public static int abs(int a): 获取参数绝对值

示例：
```java
public static void main(String[] args){
    int a = -11;
    b = Math.abs(a);
    System.out.println(b);
}

//输出结果：11
```
### 1.2.2 ceil():向上取整
* public static double ceil(double a): 向上取整
  
示例：
```java
public static void main(String[] args){
    System.out.println(Math.ceil(13.2));
    System.out.println(Math.ceil(-13.2));
}

//输出结果：14
//        -13
```
### 1.2.3 floor(double a):向下取整
* public static double floor(double a): 向下取整

示例：
```java
public static void main(String[] args){
    System.out.println(Math.ceil(13.2));
    System.out.println(Math.ceil(-13.2));
}

//输出结果：13
//        -14
```
### 1.2.4 round():四舍五入
* public static int round(float a): 四舍五入

示例：
```java
public static void main(String[] args){
    System.out.println(Math.floor(13.2));
    System.out.println(Math.floor(-13.2));
}

//输出结果：13
//        -13
```
### 1.2.5 max():获取两个值中的最大值
* public static int max(int a,int b): 获取两个int中的较大值

示例：
```java
public static void main(String[] args){
    System.out.println(Math.max(12,16));
}

//输出结果：16
```
### 1.2.6 pow():幂计算
* public static double pow(double a,double b): 返回a的b次幂
* public static double sqrt(double a): 返回a的平方根
* public static double cbrt(double a): 返回a的立方根

示例：
```java
public static void main(String[] args){
    System.out.println(Math.pow(2,3));
}

//输出结果：8
```
### 1.2.7 random():随机数
* public static double random(): 返回值为double的随机数，范围为[0.0,1.0)

示例：
```java
public static void main(String[] args){
    System.out.println(Math.random());
}

//输出结果：0.5
```
# 第二章 System
## 2.1 System介绍
System也是一个工具类，提供了一些与系统相关的方法。
System类所在包为java.lang包，因此在使用的时候不需要进行导包。并且System类被final修饰了，因此该类是不能被继承的。
## 2.2 System常用方法
### 2.2.1 exit():终止当前运行的Java虚拟机
* public static void exit(int status): 终止当前运行的Java虚拟机
* status: 状态码
  * 0：表示当前虚拟机是正常停止
  * 非0：表示当前虚拟机异常停止

示例：
```java
public static void main(String[] args){
    System.exit(0);
    System.out.println("Hello World!");
}

//输出结果:
```
### 2.2.2 currentTimeMillis():返回当前系统的时间毫秒值形式
* public static long currentTimeMillis(): 返回当前系统的时间距离时间原点的毫秒值
* 计算机中的时间原点：1970年1月1日00:00:00(我国处于东八区，所以在我们的操作系统中使用的时间原点为1970年1月1日08:00:00)

示例：
```java
public static void main(String[] args){
    //用于计算程序运行花费多久
    long start = System.currentTimeMillis();

    for (int i = 1; i <= 10000; i++){
        boolean flag = isPrime();
        if(flag){
            System.out.println(i);
        }
    }

    long end = System.currentTimeMillis();

    System.out.println(start - end);
}

//输出结果：88(输出的质数此处省略)
```
### 2.2.3 arraycopy():数组拷贝
* public static void arraycopy(数据源数组,起始索引,目的地数组,起始索引,拷贝个数)
* 注意：
  * 如果数据源数组和目的地数组都是基本数据类型，那么两者的类型必须保持一致，否则会报错
  * 在拷贝数组时需要考虑数组的长度，如果超出范围也会报错
  * 如果数据源数组和目的地数组都是引用数据类型，那么子类类型可以赋值给父类类型

示例：
```java
public static void main(String[] args){
    int[] arr1 = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int[] arr2 = new int[10];
    
    System.arraycopy(arr1, 3, arr2, 4, 5);

    for (int i = 0; i < arr2.length; i++){
        System.out.print(arr2[i] + " ");
    }
}

//输出结果：0 0 0 0 4 5 6 7 8 0
```

# 第三章 Runtime
## 3.1 Runtime介绍
Runtime表示当前虚拟机的运行环境
## 3.2 Runtime常用方法
### 3.2.1 getRuntime():当前系统的运行环境对象
* public static Runtime getRuntime(): 当前系统的运行环境对象

示例：
```java
public static void main(String[] args){
    Runtime r1 = Runtime.getRuntime();
    Runtime r2 = Runtime.getRuntime();
    System.out.println(r1 == r2);
}

//输出：true
```
### 3.2.2 exit():停止虚拟机
* public void exit(int status): 停止虚拟机
* Runtime.getRuntime.exit()实际上是System.exit()的底层源码

示例：
```java
public static void main(String[] args){
    Runtime.getRuntime().exit(0);
    System.out.println("Hello World");
}

//输出：
```
### 3.2.3 availableProcessors():获得CPU线程数
* public int availableProcessors(): 获得CPU线程数

示例：
```java
public static void main(String[] args){
    System.out.println(Runtime.getRuntime().availableProcessors());
}

//输出：16
```
### 3.2.4 maxMemory():JVM能从系统中获取总内存大小
* public long maxMemory(): JVM能从系统中获取总内存大小(单位:byte)

示例：
```java
public static void main(String[] args){
    System.out.println(Runtime.getRuntime().maxMemory() / 1024 / 1024); //单位MB
}

//输出：3548
```
### 3.2.5 totalMemory():JVM已经从系统中获取总内存大小
* public long totalMemory(): JVM已经从系统中获取总内存大小(单位:byte)

```java
public static void main(String[] args){
    System.out.println(Runtime.getRuntime().totalMemory() / 1024 / 1024); //单位MB
}

//输出：222
```
### 3.2.6 freeMemory():JVM剩余内存大小
* public long freeMemory(): JVM剩余内存大小(单位:byte)

```java
public static void main(String[] args){
    System.out.println(Runtime.getRuntime().freeMemory() / 1024 / 1024); //单位MB
}

//输出：219
```
### 3.2.7 exec():运行cmd命令
* public Process exec(String command): 运行cmd命令

```java
public static void main(String[] args) throws IOException {
        Runtime.getRuntime().exec("notepad");
}

//打开记事本
```