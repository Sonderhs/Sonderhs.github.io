---
title: 从零开始学Python(九)
tags: Python
categories: Python
top_img: ../image/从零开始学Python/从零开始学Python（九）/1.JPG
date: 2024-4-18 00:00:00
copyright: false
description: 从零开始学Python(九)
cover: ../image/从零开始学Python/从零开始学Python（九）/1.JPG
---

# 第九章 Python基础综合案例：图形可视化

## 9.1 json数据格式

JSON是一种轻量级的数据交互格式，其本质上是一个带有特定格式的字符串。我们可以按照JSON指定的格式去组织和封装数据，从而实现不同编程语言中的数据传递和交互

JSON的数据格式：
* JSON数据的格式可以是：
  {"name": "admin", "age": 18}  # 与Python中字典的格式相同
* 也可以是：
  [{"name": "admin", "age": 18}, {"name": "root", "age": 16}, {"name": "张三", "age": 20}]  # 与Python中列表嵌套字典的格式相同
* 其实JSON要求的格式与Python中字典（dict）或列表嵌套字典的格式相同

Python数据和JSON数据的相互转化：
基础语法：
```python
"""
json模块方法演示
"""

# 导入json模块
import json

# 准备符合格式的json格式要求的python数据
data = [{"name": "老王", "age": 16}, {"name": "张三", "age": 20}]
print(f"1-data的类型是：{type(data)}，data的内容是：{data}")

# 通过json.dumps(data)方法把python数据转化为json数据
data = json.dumps(data)
print(f"2-data的类型是：{type(data)}，data的内容是：{data}")

# 通过json.loads(data)方法把json数据转化为python数据
data = json.loads(data)
print(f"3-data的类型是：{type(data)}，data的内容是：{data}")
```

打印结果为：
```output
1-data的类型是：<class 'list'>，data的内容是：[{'name': '老王', 'age': 16}, {'name': '张三', 'age': 20}]
2-data的类型是：<class 'str'>，data的内容是：[{"name": "\u8001\u738b", "age": 16}, {"name": "\u5f20\u4e09", "age": 20}]
3-data的类型是：<class 'list'>，data的内容是：[{'name': '老王', 'age': 16}, {'name': '张三', 'age': 20}]
```
其中第二条输出中中文转变为了代码，这是因为在转换过程中中文的编码问题，如果需要输出为中文，可以将data = json.dumps(data)语句改为data = json.dumps(data, ensure_ascii=False)，即可实现输出为中文的目的

注：如果json数据data为dict格式的字符串，那么转化为python数据后类型为：dict

## 9.2 pyecharts模块
pyecharts是用于python语言的有百度开源的数据可视化模块
pyecharts官网是：https://pyecharts.org
pyecharts官方画廊：https://gallery.pyecharts.org/#/README

pip安装pyecharts:
pip install pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pyecharts

## 9.3 pyecharts入门使用
基础折线图：
示例：
```python
# pyecharts入门：基础折线图
# 导包，导入Line功能构建折线图对象
from pyecharts.charts import Line

# 得到折线图对象
line = Line()
# 添加x轴数据
line.add_xaxis(["中国", "美国", "英国"])
# 添加y轴数据
line.add_yaxis("GDP", [30, 20, 10])
# 使用render方法生成图标
line.render()
```
得到的效果为：
![](/image/从零开始学Python/从零开始学Python（九）/基础折线图1.png)

pyecharts配置选项：
全局配置选项
set_global_opts方法：
在上述案例中添加代码：
```python
# 设置全局配置项
line.set_global_opts(
    # 标题
    title_opts=TitleOpts(title="中美英三国GDP展示", pos_left="center", pos_bottom="1%"),
    # 图例
    legend_opts=LegendOpts(is_show=True),
    # 工具箱
    toolbox_opts=ToolboxOpts(is_show=True),
    # 视觉映射
    visualmap_opts=VisualMapOpts(is_show=True),
)
```

最终得到的效果为：
![](/image/从零开始学Python/从零开始学Python（九）/基础折线图2.png)


