---
title: Anaconda安装tensorflow
tags: 问题汇总
categories: 问题汇总
top_img: ../image/问题/Anaconda安装tensorflow/cover.png
date: 2024-7-27 00:00:00
copyright: false
description: Anaconda安装tensorflow中遇到的问题
cover: ../image/问题/Anaconda安装tensorflow/cover.png
---



# 一、tensorflow的安装
安装参考视频：[使用Anaconda快速搭建tensorflow-gpu环境教学](https://www.bilibili.com/video/BV1Lx4y1s7UK/?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click&vd_source=2fdc486181b2991ef85aa5040ec81a32)
感谢大佬的指导！
1. 登录anaconda官网下载anaconda
官网地址：https://www.anaconda.com/download/success
2. 打开anaconda prompt
![](/image/问题/Anaconda安装tensorflow/tf1.png)
创建虚拟环境，输入
```python
conda create -n tf_gpu python=3.9
```
需要确认的地方直接写‘y’
3. 虚拟环境创建成功后，可以使用
```python
conda env list
```
进行查看
4. 创建完成后，需要激活虚拟环境，输入
```python
conda activate tf_gpu
```
激活完成后如下所示：
![](/image/问题/Anaconda安装tensorflow/tf2.png)
5. 激活完成后，开始安装tensorflow，输入：
```python
conda install tensorflow-gpu=2.6
```
6. 由于numpy版本不匹配，所以需要更新numpy版本：
```python
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple numpy==1.23.4
```
为了保证正常运行，建议依次输入以下指令：
```python
conda install cudatoolkit=11.3

conda install cudnn=8.2
```
7. numpy更新完成后输入python打开Python编译器，输入：
```python
import tensorflow as tf
print("TensorFlow Version:", tf.__version__)
print("Available devices: ", tf.config.experimental.list_physical_devices())
print("Num GPUs Available: ", len(tf.config.experimental.list_physical_devices('GPU')))
```
输出结果如下图所示说明安装成功：
![](/image/问题/Anaconda安装tensorflow/tf3.png)
8. 输入
```python
conda list
```
即可查看已安装的包

之后在Pycharm中切换为该虚拟环境即可成功导入tensorflow包


# 二、Anaconda配置tensorflow过程中的问题
今天在Anaconda环境下安装tensorflow时，由于之前我的Anaconda安装在C盘中，后面移动到D盘了，所以在配置虚拟环境时出现了问题：
1. 在创建虚拟环境时系统会默认创建在C盘中，之后在激活虚拟路径时会出现系统找不到之指定路径的情况：
![之前没有截图，大概就是这种情况](/image/问题/Anaconda安装tensorflow/1.png)
2. 在安装tensorflow时，出现以下字样：
```
EnvironmentLocationNotFound: Not a conda environment: C:\Users\鏉庣€氱敓\.c
```
经过在网上查找之后，原因应该是由于C盘路径中有中文所以产生错误，但是修改用户名称需要涉及注册表登一系列操作，很危险，并且存在需要重装系统的风险，所以采取了改变虚拟环境默认安装路径的方法，具体操作方法为：
找到C:\Users\XXX\.condarc配置文件，在内部添加以下字段即可：
```
envs_dirs:
  - D:\Python\Anaconda\envs # 此处为你创建虚拟环境时的默认路径
```
![](/image/问题/Anaconda安装tensorflow/2.png)
之后按照一般的步骤安装tensorflow即可。
