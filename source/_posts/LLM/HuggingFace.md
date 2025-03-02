---
title: HuggingFace Transformers基础入门篇
tags: 
- transformer
- LLM
categories: LLM
top_img: transparent
date: 2025-3-1 00:00:00
copyright: false
description: HuggingFace Transformers基础入门篇
cover: ../image/LLM/1.JPG
---

**2025.01.02**
# 第一章 Pipeline
## 1.1 Pipeline介绍
Pipeline指的是将数据预处理、模型调用、结果后处理三部分组装成的流水线，使我们可以通过直接输入文本便获得最终的答案
Pipeline支持非常多的任务类型：
![pipeline支持的任务类型](/image/LLM/HuggingFace Transformers基础入门篇/pipeline1.png)
## 1.2 Pipeline的创建与使用
Pipeline有多种创建方法：
```python
from transformers import pipeline, QuestionAnsweringPipeline
# 方法一：根据任务类型直接创建Pipeline
pipe = pipeline("text-classification")

# 方法二：指定任务类型，在指定模型，创建基于制定模型的Pipeline
pipe = pipeline("text-classification", model="uer/roberta-base-finetuned-dianping-chinese")

# 方法三：预先加载模型，再创建Pipeline
# 这种方式必须同时指定model和tokenizer
model = AutoModelForSequenceClassification.from_pretrained("uer/roberta-base-finetuned-dianping-chinese")
tokenizer = AutoTokenizer.from_pretrained("uer/roberta-base-finetuned-dianping-chinese")
pipe = pipeline("text-classification", model=model, tokenizer=tokenizer)

# 方法四：使用GPU进行推理加速
pipe = pipeline("text-classification", model="uer/roberta-base-finetuned-dianping-chinese", device=0)
```
## 1.3 Pipeline的背后实现
Pipeline的背后实现主要包括以下几步：数据预处理->模型调用->结果后处理
![pipeline背后实现原理](/image/LLM/HuggingFace Transformers基础入门篇/pipeline2.png)
```python
# Step1：初始化Tokenizer
# Tokenizer主要完成的任务是对句子进行分词和编码
tokenizer = AutoTokenizer.from_pretrained("uer/roberta-base-finetuned-dianping-chinese")
# Step2：初始化Model
# 根据任务选择合适的预训练模型，模型可以从huggingface上寻找
model = AutoModelForSequenceClassification.from_pretrained("uer/roberta-base-finetuned-dianping-chinese")
# Step3：数据预处理
# 对输入的句子进行分词和编码
input_text = "我觉得不行！"
inputs = tokenizer(input_text, return_tensor="pt")
# Step4：模型预测
res = model(**inputs).logits
# Step5：结果后处理
# 根据模型的输出来确定模型预测的类别
pred = torch.argmax(torch.softmax(logits, dim=-1).item())
result = model.config.id2label.get(pred)
```

# 第二章 Tokenizer
## 2.1 Tokenizer介绍
文字是一个抽象的概念，而计算机擅长处理的是数字运算，Tokenizer就是用于对数据做预处理，它一般包含四个步骤：
* step1：分词：使用分词器对文本数据进行分词(字、字词)
* step2：构建词典：根据数据集分词的结果，构建词典映射(这一步并不绝对，如果采用预训练词向量，词典映射要根据词向量文件进行处理)
* step3：数据转换：根据构建好的词典，将分词处理后的数据做映射，将文本序列转换为数字序列
* step4: 数据填充与截断：在以batch输入到模型的方式中，需要对过短的数据进行填充，过长的数据进行截断，保证数据长度符合模型能够接受的范围，同时batch内的数据维度大小一致
## 2.2 Tokenizer的基本使用
### 2.2.1 tokenizer的加载与保存
```python
from transformers import AutoTokenizer

# step1: tokenizer的加载与保存
# 从HuggingFace加载，输入模型名称，即可加载对应的分词器
tokenizer = AutoTokenizer.from_pretrained("uer/roberta-base-finetuned-dianping-chinese")

# tokenizer保存到本地
tokenizer.save_pretrained("./roberta_tokenizer")

# 从本地加载tokenizer
tokenizer = AutoTokenizer.from_pretrained("./roberta_tokenizer/")
```
### 2.2.2 句子分词
```python
# step2: 句子分词
sen = "弱小的我也有大梦想!"
tokens = tokenizer.tokenize(sen)
# 分词结果：['弱', '小', '的', '我', '也', '有', '大', '梦', '想', '!']
```
### 2.2.3 查看词典
```python
# step3: 查看词典
print(tokenizer.vocab)
print(tokenizer.vocab_size)
```
### 2.2.4 索引转换
```python
# step4: 索引转换
ids = tokenizer.convert_tokens_to_ids(tokens)
# ids:[2483, 2207, 4638, 2769, 738, 3300, 1920, 3457, 2682, 106]
# 将id序列转换为token序列
tokens = tokenizer.convert_ids_to_tokens(ids)
# tokens:['弱', '小', '的', '我', '也', '有', '大', '梦', '想', '!']
# 将token序列转换为string
str_sen = tokenizer.convert_tokens_to_string(tokens)
# str_sen:'弱 小 的 我 也 有 大 梦 想!'

# 更便捷的实现方式
# 将字符串转换为id序列，又称之为编码
# 但是在编码过程中会自动为句子加上[CLS]和[SEP]标识符，分别表示句子的开始和结束
ids = tokenizer.encode(sen, add_special_tokens=True)
# ids:[101, 2483, 2207, 4638, 2769, 738, 3300, 1920, 3457, 2682, 106, 102]
# 将id序列转换为字符串，又称之为解码
str_sen = tokenizer.decode(ids, skip_special_tokens=False)
# str_sen:'[CLS] 弱 小 的 我 也 有 大 梦 想! [SEP]'
```
### 2.2.5 填充与截断
```python
# 填充
ids = tokenizer.encode(sen, padding="max_length", max_length=15)
# ids:[101, 2483, 2207, 4638, 2769, 738, 3300, 1920, 3457, 2682, 106, 102, 0, 0, 0]

# 截断
ids = tokenizer.encode(sen, max_length=5, truncation=True)
# ids:[101, 2483, 2207, 4638, 102]
```

### 2.2.6 其他输入部分
```python
ids = tokenizer.encode(sen, padding="max_length", max_length=15)

# attention_mask用于告诉模型需要关注哪些输入
attention_mask = [1 if idx != 0 else 0 for idx in ids]
# token_type_ids用于区分每个词所属的句子或段落。
token_type_ids = [0] * len(ids)
# ids:[101, 2483, 2207, 4638, 2769, 738, 3300, 1920, 3457, 2682, 106, 102, 0, 0, 0],
# attention_mask:[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
# token_type_ids:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```
### 2.2.7 快速调用方式
使用tokenizer.encode_plus()或直接使用tokenizer都可以直接得到token_type_ids和attention_mask
```python
inputs = tokenizer.encode_plus(sen, padding="max_length", max_length=15)
# input_ids: [101, 2483, 2207, 4638, 2769, 738, 3300, 1920, 3457, 2682, 106, 102, 0, 0, 0], 'token_type_ids': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'attention_mask': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
```
### 2.2.8 处理batch数据
输入的文本内容可以包含多个句子，对于多个句子的处理，我们可以使用逐条循环处理的方式，也可以使用批次处理。二者相比，使用batch处理方式速度会更快一些
```python
%%time
# 单条循环处理
for i in range(1000):
    tokenizer(sen)

# CPU times: total: 62.5 ms
# Wall time: 62 ms
```
```python
%%time
# 处理batch数据
res = tokenizer([sen] * 1000)

# CPU times: total: 15.6 ms
# Wall time: 12 ms
```

### 2.2.9 Fast/Slow Tokenizer
除了使用batch方式处理数据来加速训练外，我们还可以使用Fast Tokenizer来进行训练的加速。我们可以使用use_fast参数来决定是否使用Fast Tokenizer
```python
fast_tokenizer = AutoTokenizer.from_pretrained("uer/roberta-base-finetuned-dianping-chinese")
slow_tokenizer = AutoTokenizer.from_pretrained("uer/roberta-base-finetuned-dianping-chinese", use_fast=False)

%%time
# 处理batch数据
res = fast_tokenizer([sen] * 10000)
# CPU times: total: 656 ms
# Wall time: 243 ms

%%time
# 处理batch数据
res = slow_tokenizer([sen] * 10000)
# CPU times: total: 1.36 s
# Wall time: 1.36 s
```
可以看到加速效果还是很明显的
Fast/Slow Tokenizer原理：
* Fast Tokenizer
  * 基于Rust实现，速度快
  * offsets_mapping、word_ids
* Slow Tokenizer
  * 基于Python实现，速度慢

# 第三章 Model
## 3.1 Model介绍
Transformer：
* 原始的Transformer为编码器(Encoder)、解码器模型(Decoder)
* Encoder部分接收输入并构建其完整特征表示，Decoder部分使用Encoder的编码结果以及其他的输入生成目标序列
* 无论是编码器还是解码器，均由多个TransformerBlock堆叠而成
* TransformerBlock由注意力机制(Attention)和前馈神经网络层(Feed-Forward Network)z组成
注意力机制:
* 注意力机制的使用是Transformer的一个核心特性，在计算当前词的特征表示时，可以通过注意力机制有选择性的告诉模型要使用哪些上下文
* Transformer介绍详见[Transformer原理及代码实现](https://sonderhs.github.io/2024/11/01/Deep%20Learning/Transformer/)
![TransformerBlock](/image/LLM/HuggingFace Transformers基础入门篇/model2.png)

Model类型：
* 编码器模型：自编码模型，使用Encoder，拥有双向的注意力机制，即计算每一个词的特征时都能看到完整的上下文
* 解码器模型：自回归模型，使用Decoder，拥有单向的注意力机制，即计算每一个词的特征时都只能看到上文，无法看到下文
* 编码器解码器模型：序列到序列模型，使用Encoder+Decoder，Encoder部分使用双向的注意力，Decoder部分使用单向注意力

![Model类型](/image/LLM/HuggingFace Transformers基础入门篇/model3.png)
  
|             模型类型             |         常用预训练模型         |             适用任务             |
| :------------------------------: | :----------------------------: | :------------------------------: |
|      编码器模型，自编码模型      | ALBERT,BERT,DistillBERT,RoBERT | 文本分类，命名实体识别，阅读理解 |
|      解码器模型，自回归模型      |     GPT,GPT-2,Bloom,LLaMA      |             文本生成             |
| 编码器解码器模型，序列到序列模型 |    BART,T5,Marian,mBART,GLM    |        文本摘要，机器翻译        |

Model Head:
* Model Head是连接在模型后的层，通常为1个或多个全连接层
* Model Head将模型的编码的表示结果进行映射，以解决不同类型的任务

![Model Head](/image/LLM/HuggingFace Transformers基础入门篇/model1.png)

## 3.2 Model基本使用方法
### 3.2.1 Model加载与保存
Model的加载有多种方法：
* 在线加载
* 模型下载
* 离线加载
* 模型加载参数
```python
from transformers import AutoConfig, AutoModel, AutoTokenizer

# 在线加载
model = AutoModel.from_pretrained("hfl/rbt3", force_download=True)

# 模型下载
!git clone "https://huggingface.co/hfl/rbt3"
# 下载目标文件
!git lfs clone "https://huggingface.co/hfl/rbt3" --include="*.bin"

# 离线加载：模型先下载到本地后从本地进行加载
model = AutoModel.from_pretrained("hfl/rbt3")

# 模型加载参数
model = AutoModel.from_pretrained("hfl/rbt3")
config = AutoConfig.from_pretrained("hfl/rbt3")
```
### 3.2.2 Model调用
```python
# 不带Model Head的模型调用
model = AutoModel.from_pretrained("hfl/rbt3", output_attentions=True)
output = model(**inputs)
# output.last_hidden_state.size()：torch.Size([1, 12, 768])
# 1: batchsize
# 12: 序列长度(sequence length)
# 768: 隐藏层维度(hidden size)

# 带Model Head的模型调用
from transformers import AutoModelForSequenceClassification, BertForSequenceClassification

clz_model = AutoModelForSequenceClassification.from_pretrained("hfl/rbt3", num_labels=3)
clz_model(**inputs)
# clz_model(**inputs):SequenceClassifierOutput(loss=None, logits=tensor([[-0.3345, -0.0839, -0.7003]], grad_fn=<AddmmBackward0>), hidden_states=None, attentions=None)
# loss: 损失，因为没有输入label所以损失为None
# logits: 预测结果，由于设置的num_labels为3，所以为三分类结果(num_labels默认为2)
```

# 第四章 Datasets
## 4.1 Datasets介绍
Datasets是一个非常简单易用的数据集加载库，可以方便快捷地从本地或HuggingFace Hub加载数据集
公开数据集地址：https://hunggingface.co/datatsets
文档地址：https://huggingface.co/docs/datasets/index

## 4.2 Datasets基本使用
Datasets库的功能有很多，包括：
* 加载在线数据集
* 加载数据集某一项任务
* 按照数据集划分进行加载
* 查看数据集
* 数据集划分
* 数据选取与过滤
* 数据映射
* 保存与加载
  


### 4.2.1 加载数据集
```python
# 加载在线数据集
datasets = load_dataset("madao33/new-title-chinese")

# 加载数据集中的某一项任务
boolq_dataset = load_dataset("super_glue", "boolq")

# 按照数据集划分进行加载
# 只加载训练集
dataset = load_dataset("madao33/new-title-chinese", split="train")
# 加载训练集的第10到第99个数据
dataset = load_dataset("madao33/new-title-chinese", split="train[10:100]")
#加载训练集的前50%
dataset = load_dataset("madao33/new-title-chinese", split="train[:50%]")
# 分开加载数据集的前50%与后50%
dataset = load_dataset("madao33/new-title-chinese", split=["train[:50%]", "train[50%:]"])
```
### 4.2.2 查看数据集
```python
datasets = load_dataset("madao33/new-title-chinese")
# 直接查看数据集
print(datasets["train"][0])
# 查看数据集的前两个
print(datasets["train"][:2])
# 查看数据集的前5个的title
print(datasets["train"]["title"][:5])
# 查看数据集的列名
print(datasets["train"].column_names)  # ['title', 'content']
# 查看数据集的特征
print(datasets["train"].features)  # {'title': Value(dtype='string', id=None), 'content': Value(dtype='string', id=None)}
```
### 4.2.3 数据集划分
```python
dataset = boolq_dataset["train"]
# test_size为测试集比例，stratify_by_column用于指定标签列，让数据集按标签均衡划分
dataset.train_test_split(test_size=0.1, stratify_by_column="label") 
```
### 4.2.4 数据选取与过滤
```python
# 选取数据集的某一部分
print(datasets["train"].select([0, 1]))
# 根据关键词过滤掉某些数据
filter_dataset = datasets["train"].filter(lambda example: "中国" in example["title"])
```
### 4.2.5 数据映射
```python
# 定义一个函数，对每个数据做相同的处理
def add_prefix(example):
    example["title"] = 'Prefix: ' + example["title"]
    return example

prefix_dataset = datasets.map(add_prefix)
print(prefix_dataset["train"][:5]["title"])
# prefix_dataset:['Prefix: 望海楼美国打“台湾牌”是危险的赌博',
#                  'Prefix: 大力推进高校治理能力建设',
#                  'Prefix: 坚持事业为上选贤任能',
#                  'Prefix: “大朋友”的话儿记心头',
#                  'Prefix: 用好可持续发展这把“金钥匙”']

from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-chinese")
def preprocess_function(example, tokenizer=tokenizer):
    # 分词
    model_inputs = tokenizer(example["content"], max_length=512, truncation=True)
    labels = tokenizer(example["title"], max_length=32, truncation=True)
    # label就是title编码的结果
    model_inputs["labels"] = labels["input_ids"]
    return model_inputs

# num_proc:多进程处理，在无法进行batch处理时使用
processed_datasets = datasets.map(preprocess_function, num_proc=4)
# processed_datasets:
# DatasetDict({
#     train: Dataset({
#         features: ['title', 'content', 'input_ids', 'token_type_ids', 'attention_mask', 'labels'],
#         num_rows: 5850
#     })
#     validation: Dataset({
#         features: ['title', 'content', 'input_ids', 'token_type_ids', 'attention_mask', 'labels'],
#         num_rows: 1679
#     })
# })

# 按batch处理数据，remove_columns=datasets["train"].column_names：移除原始字段
processed_datasets = datasets.map(preprocess_function, batched=True, remove_columns=datasets["train"].column_names)
```
### 4.2.6 保存与加载
```python
# 保存数据到本地
processed_datasets.save_to_disk("./processed_data")
# 从本地加载保存好的数据
processed_datasets = load_from_disk("./processed_data")

# 从本地加载数据
dataset = load_dataset("csv", data_files="./ChnSentiCorp_htl_all.csv", split="train")
dataset = Dataset.from_csv("./ChnSentiCorp_htl_all.csv")

# 加载文件夹内的文件作为数据集
# 加载指定文件
dataset = load_dataset("csv", data_files=["./all_data/ChnSentiCorp_htl_all.csv", "./all_data/ChnSentiCorp_htl_all copy.csv"], split='train')
# 加载全部文件
dataset = load_dataset("csv", data_dir="./all_data", split='train')

# 通过预先加载的其他格式转换加载数据集
import pandas as pd

data = pd.read_csv("./ChnSentiCorp_htl_all.csv")
# 使用from_pandas将pandas加载好的数据转换为Dataset格式
dataset = Dataset.from_pandas(data)
# List格式的数据需要内嵌{}，明确数据字段
data = [{"text": "abc"}, {"text": "def"}]
Dataset.from_list(data)

# 通过自定义加载脚本加载数据集
# 首先写好处理数据的脚本load_script.py，直接作为参数传入load_dataset
load_dataset("json", data_files="./cmrc2018_trial.json", field="data")
# 直接加载的结果：
# DatasetDict({
#     train: Dataset({
#         features: ['paragraphs', 'id', 'title'],
#         num_rows: 256
#     })
# })
dataset = load_dataset("./load_script.py", split="train", trust_remote_code=True)
# 处理后的结果：
# Dataset({
#     features: ['id', 'context', 'question', 'answers'],
#     num_rows: 1002
# })
```
### 4.2.7 Datacollator
DataCollator的作用是将一个批次的数据样本整理成一个统一的格式，以便输入到模型中进行训练或评估。在自然语言处理任务中，数据样本通常具有不同的长度和格式，因此需要进行一些预处理操作，使其能够在同一个批次中进行处理。
```python
from transformers import  DataCollatorWithPadding
from torch.utils.data import DataLoader

# 加载数据
dataset = load_dataset("csv", data_files="./ChnSentiCorp_htl_all.csv", split='train')
# 空数据过滤
dataset = dataset.filter(lambda x: x["review"] is not None)

# 数据分词处理了
def process_function(examples):
    tokenized_examples = tokenizer(examples["review"], max_length=128, truncation=True)
    tokenized_examples["labels"] = examples["label"]
    return tokenized_examples
# 数据映射
tokenized_dataset = dataset.map(process_function, batched=True, remove_columns=dataset.column_names)

# 指定collata_fn
collator = DataCollatorWithPadding(tokenizer=tokenizer)
dl = DataLoader(tokenized_dataset, batch_size=4, collate_fn=collator, shuffle=True)
# 注意：DataCollatorWithPadding进行的是动态填充，并不会把所有句子填充到相同长度
```

# 第五章 Evaluate
## 5.1 Evaluate介绍
Evaluate库是一个用于加载任务评估函数的库
函数库地址：https://huggingface.co/evaluate-metric
文档地址：https://huggingface.co/docs/evaluate/index

## 5.2 Evaluate基本使用
* 查看支持的评估函数(list_evaluate_modules)
* 加载评估函数(load)
* 查看评估函数说明(inputs_description)
* 评估指标计算(compute)
  * 全局计算(compute)
  * 迭代计算(add/add_batch)
* 计算多个评估指标(combine)
* 评估结果对比可视化(radar_plot)

## 5.2.1 Evaluate支持的评估函数
```python
# 完成的评估函数可以在 https://huggingface.co/evaluate-metric 中查看
# 参数with_details可以输出评估函数的一些细节
evaluate.list_evaluation_modules(with_details=True)
```
### 5.2.2 加载评估函数
```python
accuracy = evaluate.load("accuracy")
```
### 5.2.3 查看函数说明
```python
print(accuracy.description)
print(accuracy.inputs_description)
```
### 5.2.4 评估指标计算
```python
# 全局计算
accuracy = evaluate.load("accuracy")
results = accuracy.compute(references=[0, 1, 2, 0, 1, 2], predictions=[0, 1, 1, 2, 1, 0])
# result：{'accuracy': 0.5}
# 迭代计算
# 不按batch
accuracy = evaluate.load("accuracy")
for ref, pred in zip([0,1,0,1], [1,0,0,1]):
    accuracy.add(references=ref, predictions=pred)
accuracy.compute()  # {'accuracy': 0.5}
# 按batch
accuracy = evaluate.load("accuracy")
for refs, preds in zip([[0,1],[0,1]], [[1,0],[0,1]]):
    accuracy.add_batch(references=refs, predictions=preds)
accuracy.compute()  # {'accuracy': 0.5}
```
### 5.2.5 计算多个评估指标
```python
clf_metrics = evaluate.combine(["accuracy", "f1", "recall", "precision"])
clf_metrics.compute(predictions=[0, 1, 0], references=[0, 1, 1])
# 输出：
# {'accuracy': 0.6666666666666666,
#  'f1': 0.6666666666666666,
#  'recall': 0.5,
#  'precision': 1.0}
```
### 5.2.6 评估结果对比可视化
可视化目前支持雷达图
```python
from evaluate.visualization import radar_plot

data = [
   {"accuracy": 0.99, "precision": 0.8, "f1": 0.95, "latency_in_seconds": 33.6},
   {"accuracy": 0.98, "precision": 0.87, "f1": 0.91, "latency_in_seconds": 11.2},
   {"accuracy": 0.98, "precision": 0.78, "f1": 0.88, "latency_in_seconds": 87.6}, 
   {"accuracy": 0.88, "precision": 0.78, "f1": 0.81, "latency_in_seconds": 101.6}
   ]
model_names = ["Model 1", "Model 2", "Model 3", "Model 4"]
plot = radar_plot(data=data, model_names=model_names)
```
![评估结果对比可视化](/image/LLM/HuggingFace Transformers基础入门篇/evaluate.png)

# 第六章 Trainer
## 6.1 Trainer介绍
Trainer是transformers库中提供的训练函数，内部封装了完整的训练、评估逻辑，并集成了多重的后端，如DeepSpeed、Pytorch FSDP等，搭配TrainingArguments对训练过程中的各项参数进行配置，可以非常方便快捷地启动模型单机/分布式训练
需要注意的是：
* 使用Trainer进行模型训练对模型的输入输出是有限制的，要求模型返回元组或者ModelOutput中的子类
* 如果输入中提供了labels，模型要能返回loss结果，如果是元组，要求loss为元组中第一个值

文档地址：https://huggingface.co/doc/transformers/main_classes/trainer#trainer
## 6.2 Trainer基本使用
Trainer的使用基本分为三步：
* 构建训练参数TrainingArguments
* 创建Trainer
* 模型训练
  
```python
from transformers import Trainer, TrainingArguments
from transformers import DataCollatorWithPadding

# 构建训练参数
train_args = TrainingArguments(output_dir="./checkpoints",      # 输出文件夹
                               per_device_train_batch_size=64,  # 训练时的batch_size
                               per_device_eval_batch_size=128,  # 验证时的batch_size
                               logging_steps=10,                # log 打印的频率
                               evaluation_strategy="epoch",     # 评估策略
                               save_strategy="epoch",           # 保存策略
                               save_total_limit=3,              # 最大保存数
                               learning_rate=2e-5,              # 学习率
                               weight_decay=0.01,               # weight_decay
                               metric_for_best_model="f1",      # 设定评估指标
                               load_best_model_at_end=True)     # 训练完成后加载最优模型

# 构建模型
trainer = Trainer(model=model, 
                  args=train_args, 
                  train_dataset=tokenized_datasets["train"], 
                  eval_dataset=tokenized_datasets["test"], 
                  data_collator=DataCollatorWithPadding(tokenizer=tokenizer),
                  compute_metrics=eval_metric)

# 模型训练
trainer.train()
```

# 第七章 实战代码：酒店评价分类任务
```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments
import torch
import pandas as pd
from torch.utils.data import random_split
from torch.utils.data import DataLoader
from torch.utils.data import Dataset
from torch.optim import Adam
from datasets import load_dataset
from transformers import DataCollatorWithPadding
import evaluate

# 创建Dataset
dataset = load_dataset("csv", data_files="./ChnSentiCorp_htl_all.csv", split="train")
dataset = dataset.filter(lambda x: x["review"] is not None)
dataset = dataset.train_test_split(test_size=0.1)

tokenizer = AutoTokenizer.from_pretrained("hfl/rbt3")
def process_function(examples):
    tokenizer_example = tokenizer(examples["review"], max_length=128, truncation=True)
    tokenizer_example["labels"] = examples["label"]
    return tokenizer_example

tokenizer_dataset = dataset.map(process_function, batched=True, remove_columns=dataset["train"].column_names)

# 创建模型及优化器
model = AutoModelForSequenceClassification.from_pretrained("hfl/rbt3")

# 创建评估函数
acc_metrics = evaluate.load("accuracy")
f1_metrics = evaluate.load("f1")

def eval_metric(eval_predict):
    # 得到预测值
    predictions, labels = eval_predict
    # 根据预测结果得到预测类别
    predictions = predictions.argmax(axis=-1)
    # 计算acc和f1
    acc = acc_metrics.compute(predictions=predictions, references=labels)
    f1 = f1_metrics.compute(predictions=predictions, references=labels)
    # 更新acc和f1
    acc.update(f1)
    return acc

train_args = TrainingArguments(output_dir="./checkpoints",
                               per_device_train_batch_size=64,
                               per_device_eval_batch_size=128,
                               logging_steps=10,
                               evaluation_strategy="epoch",
                               save_strategy="epoch",
                               save_total_limit=3,
                               learning_rate=2e-5,
                               weight_decay=0.01,
                               metric_for_best_model="f1",
                               load_best_model_at_end=True)

trainer = Trainer(model=model,
                  args=train_args,
                  train_dataset=tokenizer_dataset["train"],
                  eval_dataset=tokenizer_dataset["test"],
                  data_collator=DataCollatorWithPadding(tokenizer=tokenizer),
                  compute_metrics=eval_metric)

# 模型训练
trainer.train()

# 模型评估
trainer.evaluate(tokenizer_dataset["test"])

# 模型预测
sen = "这家酒店真的很差，我再也不会来了"
idx2label = {0: "差评", 1: "好评"}
model.eval()
with torch.inference_mode():
    inputs = tokenizer(sen, return_tensors="pt")
    inputs = {k: v.cuda() for k, v in inputs.items()}
    logits = model(**inputs).logits
    pred = torch.argmax(logits, dim=-1)
    print(f"输入：{sen}, 预测：{idx2label.get(pred.item())}")
trainer.predict(tokenizer_dataset["test"])
```
运行结果：
```python
{'loss': 0.695, 'grad_norm': 2.6663498878479004, 'learning_rate': 1.9393939393939395e-05, 'epoch': 0.09}
{'loss': 0.5331, 'grad_norm': 2.370398759841919, 'learning_rate': 1.8787878787878792e-05, 'epoch': 0.18}
{'loss': 0.4756, 'grad_norm': 3.2594058513641357, 'learning_rate': 1.8181818181818182e-05, 'epoch': 0.27}
{'loss': 0.4075, 'grad_norm': 3.2505533695220947, 'learning_rate': 1.7575757575757576e-05, 'epoch': 0.36}
{'loss': 0.3473, 'grad_norm': 3.513852834701538, 'learning_rate': 1.6969696969696972e-05, 'epoch': 0.45}
{'loss': 0.3788, 'grad_norm': 3.031680107116699, 'learning_rate': 1.6363636363636366e-05, 'epoch': 0.55}                                                                            
{'loss': 0.2907, 'grad_norm': 3.0086677074432373, 'learning_rate': 1.575757575757576e-05, 'epoch': 0.64}
{'loss': 0.3491, 'grad_norm': 3.75600528717041, 'learning_rate': 1.5151515151515153e-05, 'epoch': 0.73}                                                                             
{'loss': 0.319, 'grad_norm': 3.8564631938934326, 'learning_rate': 1.4545454545454546e-05, 'epoch': 0.82}                                                                            
{'loss': 0.2983, 'grad_norm': 5.228195667266846, 'learning_rate': 1.3939393939393942e-05, 'epoch': 0.91}                                                                            
{'loss': 0.3176, 'grad_norm': 5.216794967651367, 'learning_rate': 1.3333333333333333e-05, 'epoch': 1.0}                                                                             
{'eval_loss': 0.2999931573867798, 'eval_accuracy': 0.87001287001287, 'eval_f1': 0.9058713886300093, 'eval_runtime': 1.5604, 'eval_samples_per_second': 497.953, 'eval_steps_per_second': 4.486, 'epoch': 1.0}
{'loss': 0.2817, 'grad_norm': 4.889962673187256, 'learning_rate': 1.2727272727272728e-05, 'epoch': 1.09}                                                                            
{'loss': 0.2696, 'grad_norm': 4.202088356018066, 'learning_rate': 1.2121212121212122e-05, 'epoch': 1.18}
{'loss': 0.2653, 'grad_norm': 4.869167327880859, 'learning_rate': 1.1515151515151517e-05, 'epoch': 1.27}                                                                            
{'loss': 0.2979, 'grad_norm': 2.6885597705841064, 'learning_rate': 1.0909090909090909e-05, 'epoch': 1.36}                                                                           
{'loss': 0.2692, 'grad_norm': 6.478630065917969, 'learning_rate': 1.0303030303030304e-05, 'epoch': 1.45}                                                                            
{'loss': 0.2679, 'grad_norm': 3.963503360748291, 'learning_rate': 9.696969696969698e-06, 'epoch': 1.55}                                                                             
{'loss': 0.232, 'grad_norm': 5.782787799835205, 'learning_rate': 9.090909090909091e-06, 'epoch': 1.64}                                                                              
{'loss': 0.2853, 'grad_norm': 2.8020851612091064, 'learning_rate': 8.484848484848486e-06, 'epoch': 1.73}                                                                            
{'loss': 0.2649, 'grad_norm': 5.869559288024902, 'learning_rate': 7.87878787878788e-06, 'epoch': 1.82}
{'loss': 0.2884, 'grad_norm': 3.7125296592712402, 'learning_rate': 7.272727272727273e-06, 'epoch': 1.91}                                                                            
{'loss': 0.242, 'grad_norm': 8.284714698791504, 'learning_rate': 6.666666666666667e-06, 'epoch': 2.0}                                                                               
{'eval_loss': 0.2777193486690521, 'eval_accuracy': 0.8777348777348777, 'eval_f1': 0.9107981220657277, 'eval_runtime': 1.5624, 'eval_samples_per_second': 497.316, 'eval_steps_per_second': 4.48, 'epoch': 2.0}
{'loss': 0.2479, 'grad_norm': 2.815223455429077, 'learning_rate': 6.060606060606061e-06, 'epoch': 2.09}                                                                             
{'loss': 0.2323, 'grad_norm': 6.272286415100098, 'learning_rate': 5.4545454545454545e-06, 'epoch': 2.18}
{'loss': 0.2148, 'grad_norm': 3.377030372619629, 'learning_rate': 4.848484848484849e-06, 'epoch': 2.27}                                                                             
{'loss': 0.2133, 'grad_norm': 3.9532928466796875, 'learning_rate': 4.242424242424243e-06, 'epoch': 2.36}                                                                            
{'loss': 0.2004, 'grad_norm': 3.3170342445373535, 'learning_rate': 3.6363636363636366e-06, 'epoch': 2.45}                                                                           
{'loss': 0.2276, 'grad_norm': 3.1911683082580566, 'learning_rate': 3.0303030303030305e-06, 'epoch': 2.55}                                                                           
{'loss': 0.2422, 'grad_norm': 6.351240634918213, 'learning_rate': 2.4242424242424244e-06, 'epoch': 2.64}                                                                            
{'loss': 0.2076, 'grad_norm': 2.9479126930236816, 'learning_rate': 1.8181818181818183e-06, 'epoch': 2.73}                                                                           
{'loss': 0.2391, 'grad_norm': 3.8990724086761475, 'learning_rate': 1.2121212121212122e-06, 'epoch': 2.82}                                                                           
{'loss': 0.2649, 'grad_norm': 2.662543535232544, 'learning_rate': 6.060606060606061e-07, 'epoch': 2.91}                                                                             
{'loss': 0.2339, 'grad_norm': 3.9215333461761475, 'learning_rate': 0.0, 'epoch': 3.0}                                                                                               
{'eval_loss': 0.27600279450416565, 'eval_accuracy': 0.8803088803088803, 'eval_f1': 0.9118483412322275, 'eval_runtime': 1.5647, 'eval_samples_per_second': 496.58, 'eval_steps_per_second': 4.474, 'epoch': 3.0}
{'train_runtime': 134.6169, 'train_samples_per_second': 155.731, 'train_steps_per_second': 2.451, 'train_loss': 0.29999446507656213, 'epoch': 3.0}                                  
100%|████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 330/330 [02:14<00:00,  2.45it/s]
100%|████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 7/7 [00:01<00:00,  5.39it/s]
输入：这家酒店真的很差，我再也不会来了, 预测：差评
100%|████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 7/7 [00:01<00:00,  5.44it/s]
```