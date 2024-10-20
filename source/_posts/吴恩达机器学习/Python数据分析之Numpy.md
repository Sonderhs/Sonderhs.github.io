---
title: Python数据分析之Numpy
tags: Python数据分析
categories: Python数据分析
top_img: transparent
date: 2023-12-28 00:00:00
copyright: false
description: Python数据分析之Numpy
cover: ../image/markdown%E8%AF%AD%E6%B3%95%E5%9F%BA%E7%A1%80/1.PNG
---

# Python数据分析之Numpy

NumPy(Numerical Python) 是 Python 语言的一个扩展程序库，支持大量的维度数组与矩阵运算，此外也针对数组运算提供大量的数学函数库。

## 一、Numpy Ndarray对象
NumPy最重要的一个特点是其N维数组对象ndarray，它是一系列同类型数据的集合，以0下标为开始进行集合中元素的索引
ndarray对象是用于存放同类型元素的多维数组
ndarray中的每个元素在内存中都有相同存储大小的区域。、

我们可以通过array函数创造一个ndarray对象，我们可以将列表、元组或任何类似数组的对象传递给array()函数，然后它将被转换为ndarray

array()函数的具体参数：
numpy.array(
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;object,
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dtype = None, 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;copy = True, 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order = None, 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subok = False, 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ndmin = 0
)

参数说明：
| 参数名称 | 描述                                                      |
| -------- | --------------------------------------------------------- |
| object   | 数组或嵌套的数列                                          |
| dtype    | 数组元素的数据类型，可选                                  |
| copy     | 对象是否需要复制，可选                                    |
| order    | 创建数组的样式，C为行方向，F为列方向，A为任意方向（默认） |
| subok    | 默认返回一个与基类类型一致的数组                          |
| ndmin    | 指定生成数组的最小维度                                    |

示例：
```python
import numpy as np
a = np.array([1, 2, 3])
print(f"a的类型是：{type(a)}")
print(f"a的内容是：{a}")
```

打印结果为：
```output
a的类型是：<class 'numpy.ndarray'>
a的内容是：[1 2 3]
```

## Numpy数组属性
