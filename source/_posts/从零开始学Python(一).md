---
title: 从零开始学Python(一)
tags: Python
categories: Python
top_img: ../image/从零开始学Python/从零开始学Python（一）/1.JPG
date: 2024-4-7 00:00:00
copyright: false
description: 从零开始学Python(一)
cover: ../image/从零开始学Python/从零开始学Python（一）/1.JPG
---

# 第一章

## 1.0 常用快捷键
* ctrl+alt+s: 打开软件设置
* ctrl+d: 复制当前行代码
* shift+alt+上\下: 将当前行代码上移或下移
* ctrl+shift+f10: 运行当前代码文件
* shift+f6: 重命名文件
* ctrl+a: 全选
* ctrl+c\v\x: 复制、粘贴、剪切
* ctrl+f: 搜索

## 1.1 字面量
### 1.1.1 字面量：在代码中，被写下来的固定的值，称之为字面量。
### 1.1.2 Python中常用的六种值（数据）的类型：
（1）数字（Number）：支持整数（int），浮点数（float），复数（complex），布尔（bool）；
（2）字符串（String）：描述文本的一种数据类型；
（3）列表（List）：有序地可变序列；
（4）元组（Tuple）：有序地不可变序列；
（5）集合（Set）：无序的不重复集合；
（6）字典（Dictionary）：无序Key-Value集合。

## 1.2 注释
### 1.2.1 单行注释：已#开头，#右边的所有文字作为注释内容
1.2.2 多行注释：以一对三个双引号（"""注释内容"""）来解释说明一段代码的作用及使用方法

## 1.3 变量
### 1.3.1 变量：在程序运行时，能够存储结算结果或能表示值的抽象概念
### 1.3.2 变量的定义格式：变量名称 = 变量的值
例：
```python
money = 50
```
## 1.4 数据类型
### 1.4.1 常见数据类型
（1）string：字符串类型
（2）int：整型（有符号）
（3）float：浮点型（有符号）
### 1.4.2 验证数据类型
可以利用type()语句验证数据类型,type()语句使用方式有三种：
1.在print语句中直接输出类型信息,如：
```python
print(type("黑马程序员"))
print(type(666))
print(type(13.14))
```
打印结果为：
```output
<class 'str'>
<class 'int'>
<class 'float'>
```
2.使用变量存储type()的结果（返回值），如：
```python
string_type = type("黑马程序员")
print(string_type)
```
打印结果为：
```
<class 'str'>
```
3.查看变量中存储的数据类型，如：
```python
name = "黑马程序员"
name_type = type(name)
print(name_type)
```
打印结果为：
```
<class 'str'>
```
**注：type()查看的是变量存储的数据的类型，而不是变量的类型，变量是没有类型的**