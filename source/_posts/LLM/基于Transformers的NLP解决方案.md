---
title: 基于Transformers的NLP解决方案
tags: 
- transformer
- LLM
categories: LLM
top_img: transparent
date: 2025-4-14 00:00:00
copyright: false
description: 本文主要介绍了基于Transformers的NLP解决方案
cover: ../image/LLM/Transformers实战演练/基于Transformers的NLP解决方案/cover.jpg
---


# 基于Transformers的NLP解决方案
## 一、基础组件知识回顾

**截至目前讲过的基础组件：**
* Pipeline：流水线，用于模型推理，封装了完整的推理逻辑，包括数据预处理、模型预测及后处理
* Tokenizer：分词器，用于数据预处理，将原始文本输入转换为模型的输入，包括input_ids、attention_mask等
* Model：模型，用于加载、创建、保存模型，对Pytorch中的模型进行了封装，同时更好地支持预训练模型
* Datasets：数据集，用于数据集加载与预处理，支持加载在线与本地数据集，提供了数据集层面的处理方法
* Evaluate：评估函数，用于对模型的结果进行评估，支持多种任务的评估函数
* Trainer：训练器，用于模型训练、评估，支持丰富的配置选项，快速启动模型训练流程

## 二、基于Transformers的NLP一般流程

基于Transformers的NLP一般流程如下：
![](/image/LLM/Transformers实战演练/基于Transformers的NLP解决方案/一般流程.png)

## 三、Transformers显存优化策略

**显存占用分析：**
* **模型权重**
  * 4Bytes * 模型参数量
* **优化器状态**
  * 8Bytes * 模型参数量，对于常用的AdamW而言
* **梯度**
  * 4Bytes * 模型参数量
* **前向激活值**
  * 取决于序列长度、隐藏层维度、Batchsize等多个因素

**显存优化策略：**
显存优化可以使用多种方法：
### 3.1 梯度累加：Grandient Accumulation
* **Grandient Accumulation**
  * 优化对象 ：前向激活值。累计跑多个step后再计算梯度
  * 参数设置：在 TrainingArguments里设置：per_device_train_batch_size=1 和gradient_accumulation_steps=32

```python
train_args = TrainingArguments(output_dir="./checkpoints",      # 输出文件夹
                               per_device_train_batch_size=1,   # 训练时的batch_size
                               gradient_accumulation_steps=32,  # *** 梯度累加 ***
                               per_device_eval_batch_size=4,    # 验证时的batch_size
                               num_train_epochs=1,              # 训练轮数
                               logging_steps=10,                # log 打印的频率
                               eval_strategy="epoch",           # 评估策略
                               save_strategy="epoch",           # 保存策略
                               save_total_limit=3,              # 最大保存数
                               learning_rate=2e-5,              # 学习率
                               weight_decay=0.001,              # weight_decay
                               metric_for_best_model="f1",      # 设定评估指标
                               load_best_model_at_end=True)     # 训练完成后加载最优模型
```

### 3.2 梯度检查点：Gradient Checkpoints
* **Gradient Checkpoints**
  * 优化对象 ：前向激活值。选择性的保存一些前向激活值，然后在反向传播时，再重新计算。
  * 参数设置：在 TrainingArguments里设置：gradient_checkpointing=True


```python
train_args = TrainingArguments(output_dir="./checkpoints",      # 输出文件夹
                               per_device_train_batch_size=1,   # 训练时的batch_size
                               gradient_accumulation_steps=32,  # *** 梯度累加 ***
                               gradient_checkpointing=True,     # *** 梯度检查点 ***
                               per_device_eval_batch_size=4,    # 验证时的batch_size
                               num_train_epochs=1,              # 训练轮数
                               logging_steps=10,                # log 打印的频率
                               eval_strategy="epoch",           # 评估策略
                               save_strategy="epoch",           # 保存策略
                               save_total_limit=3,              # 最大保存数
                               learning_rate=2e-5,              # 学习率
                               weight_decay=0.001,              # weight_decay
                               metric_for_best_model="f1",      # 设定评估指标
                               load_best_model_at_end=True)     # 训练完成后加载最优模型
```

### 3.3 更换优化器：Adafactor Optiomizer
* **Adafactor Optiomizer**
  * 优化对象 ：优化器状态。理论比AdamW占用显存小
  * 参数设置：在 TrainingArguments里设置：optim="adafactor"

```python
train_args = TrainingArguments(output_dir="./checkpoints",      # 输出文件夹
                               per_device_train_batch_size=2,   # 训练时的batch_size
                               gradient_accumulation_steps=32,  # *** 梯度累加 ***
                               gradient_checkpointing=True,     # *** 梯度检查点 ***
                               optim="adafactor",               # *** adafactor优化器 *** 
                               per_device_eval_batch_size=4,    # 验证时的batch_size
                               num_train_epochs=1,              # 训练轮数
                               logging_steps=10,                # log 打印的频率
                               eval_strategy="epoch",           # 评估策略
                               save_strategy="epoch",           # 保存策略
                               save_total_limit=3,              # 最大保存数
                               learning_rate=2e-5,              # 学习率
                               weight_decay=0.001,              # weight_decay
                               metric_for_best_model="f1",      # 设定评估指标
                               load_best_model_at_end=True)     # 训练完成后加载最优模型
```

### 3.4 冻结模型：Freeze Model
* **Freeze Model** 
  * 优化对象 ：前向激活值和梯度。 通过冻结一些层来减少训练的参数，从而减少显存
  * 参数设置：如将Bert中的参数进行冻结。遍历模型的参数，设置param.requires_grad = False

```python
# *** 参数冻结 *** 
for name, param in model.bert.named_parameters():
    param.requires_grad = False
```

### 3.5 减少最大长度：Data Length
* **Data Length** 
  * 优化对象：前向激活值。会极大影响模型预测的准确率
  * 参数设置：在tokenizer数据集预处理处进行操作，设置max_length=32


```python
import torch

tokenizer = AutoTokenizer.from_pretrained("hfl/chinese-macbert-large")

def process_function(examples):
    # 减少编码的最大长度
    tokenized_examples = tokenizer(examples["review"], max_length=32, truncation=True, padding="max_length")
    tokenized_examples["labels"] = examples["label"]
    return tokenized_examples

tokenized_datasets = datasets.map(process_function, batched=True, remove_columns=datasets["train"].column_names)
```

### 3.6 优化效果
针对模型**hfl/chinese-macbert-large(330M)，batch_size=32，max_length=128**，显存占用情况如下：
![](/image/LLM/Transformers实战演练/基于Transformers的NLP解决方案/优化效果.png)


参考资料：
[1] [【手把手带你实战HuggingFace Transformers-入门篇】基础知识与环境安装](https://www.bilibili.com/video/BV1ma4y1g791)
[2] [【Github项目地址】](https://github.com/zyds/transformers-code)