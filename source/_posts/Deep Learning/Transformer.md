---
title: Transformer
tags: transformer
categories: 深度学习
top_img: transparent
date: 2024-11-01 00:00:00
copyright: false
description: Transformer原理及代码讲解
cover: ../image/Deep_Learning/Transformer/cover.png
---

# Tansformer
# 一、Transformer简介
## 1.1 什么是Transformer
Transformer 是一种深度学习模型架构，主要用于处理序列数据，比如自然语言处理（NLP）中的文本序列任务。它由 Google 研究团队在 2017 年提出，并在论文《Attention Is All You Need》中正式发布。Transformer 的关键创新在于**自注意力机制**，通过它，模型能够捕捉序列中每个位置之间的依赖关系，而不需要传统的递归（RNN）或卷积（CNN）结构。

## 1.2 Transformer的核心组成
Transformer 主要由 **Encoder** 和 **Decoder** 两个模块组成：

1. **Encoder**：用于处理输入序列，比如输入文本。一个 Transformer 通常包含多个 Encoder 层堆叠，每层的 Encoder 会计算序列中每个词与其他词的关系，提取特征并捕捉依赖关系。Encoder 的输出可以作为 Decoder 的输入。
  
2. **Decoder**：用于生成目标序列，比如翻译任务中的输出文本。Decoder 也由多个层堆叠而成，负责在给定输入编码的情况下生成输出，同时自我监督生成的内容，确保输出的每个词不会看到未来的词。

## 1.3 Transformer的主要特点
1. **自注意力机制**（Self-Attention Mechanism）：  
   Transformer 使用自注意力机制，允许模型直接关注序列中任意位置的单词或符号，生成包含上下文信息的向量表示。通过自注意力，模型可以计算序列中任意两个位置之间的关系权重，捕捉长距离依赖关系。

2. **多头注意力**（Multi-Head Attention）：  
   为了让模型可以从多个不同的“视角”关注输入，Transformer 引入多头注意力机制。每个注意力头会独立地学习一组权重，然后将结果拼接在一起。多头注意力可以让模型在不同的头中学习到不同的特征或上下文信息。

3. **位置编码**（Positional Encoding）：  
   因为 Transformer 没有顺序处理输入，因此需要位置编码来向模型提供序列顺序信息。位置编码通常是加到输入嵌入上的一组向量，表示每个位置的相对或绝对位置。

4. **并行化计算**：  
   Transformer 没有依赖递归结构，可以在计算时并行处理整个序列。这使得训练速度相比 RNN 快得多，也更容易扩展到大规模数据上。

## 1.4 Transformer的应用
由于其强大的序列建模能力和并行化特性，Transformer 已经广泛应用于 NLP 和其他领域，包括：
- **机器翻译**：将一个语言的句子翻译成另一种语言。
- **文本生成**：如自动写作、摘要生成和对话系统。
- **图像处理**：ViT（Vision Transformer）应用 Transformer 架构进行图像分类和生成。
- **推荐系统**：利用用户的行为序列进行兴趣预测和推荐内容。

## 1.5 Transformer结构
Transformer结构如下图所示：
![Model architecture](/image/Deep_Learning/Transformer/transformer.png)

# 二、自注意力机制（self-attention）
## 2.1 注意力机制
在讲自注意力机制之前，我们先来看一下什么是注意力机制。
注意力机制简单来说就是抓重点。比如我们要将一句英语“Tom chase Jerry”翻译为中文“汤姆追杰瑞”，那么在翻译过程中，我们会将英文单词通过编码器encoder编码为语义编码c，在通过解码器decoder解码为中文输出。
![](/image/Deep_Learning/Transformer/translate1.png)
当我们没有使用attention时，在生成输出“汤姆”时，单词“Tom”、“chase”、“Jerry”对结果的生成影响程度是一样的，这显然是不合理的，因为只有“Tom”才会被翻译为“汤姆”。所以我们会给每个单词生成一个权重，从而改变翻译时每个单词对输出的影响大小，这就是注意力机制。当我们引入注意力机制后，固定的中间语义表示C换成了根据当前输出单词来调整成加入注意力模型的变化的Ci：
![](/image/Deep_Learning/Transformer/translate1.png)
最终我们在生成每个中文翻译时对应的信息就可能变成了这样:
$$
C_{汤姆} = g(0.6∗f_2(Tom),0.2∗f_2(chase),0.2∗f_2(Jerry)) \\
C_{追逐} = g(0.2∗f_2(Tom),0.7∗f_2(chase),0.1∗f_2(Jerry)) \\
C_{杰瑞} = g(0.3∗f_2(Tom),0.2∗f_2(chase),0.5∗f_2(Jerry))
$$
## 2.2 自注意力机制的实现
在实现注意力机制前，我们一般引入三个参数：query、key、value。
query代表我们想要查询的目标，key和value可以通过一个查找的过程来理解。想象你在找一本书时，会想起一些关于书的信息，例如它的标题或作者，这些信息就是查找的“线索”——对应于注意力机制中的key。一旦找到这本书，就可以查看内容，即从书中获取具体的信息或内容，这相当于value。
在注意力机制中，系统会根据你的Query与每个输入的Key计算相似度分数，找出与问题最相关的输入。然后根据相似度分数加权输出对应的Value信息，即与查询目标最相关的输入的信息。
![](/image/Deep_Learning/Transformer/qkv.png)
假设我们输入为$a^1,a^2,a^3,a^4$，首先我们通过向量$W^q$乘以$a^1$得到$q^1$，也就是我们想得到$a^1$最后翻译得到的结果query，然后再通过向量$W^k$分别乘以$a^1,a^2,a^3,a^4$得到$k^1,k^2,k^3,k^4$，最后我们使用$q^1$分别乘以$k^2,k^3,k^4$得到$\alpha_{1,2},\alpha_{1,3},\alpha_{1,4}$，再将其通过一个softmax层就得到了每个输入的注意力分数$\alpha_{1,i}'$。
![](/image/Deep_Learning/Transformer/self_attention1.png)
最后的输出$b^1 = \sum_i\alpha_{1,i}'v^i$，其中$v^i=W^ia_i$。其余同理。
![](/image/Deep_Learning/Transformer/self_attention2.png)

我们将$q^1q^2q^3q^4$记为矩阵$Q$,$k^1k^2k^3k^4$记为矩阵$K$,$v^1v^2v^3v^4$记为矩阵$V$，那么最终的计算过程就是：首先用矩阵$K^T$和矩阵$Q$x相乘得到矩阵$A$，再将A经过softmax处理得到注意力分数矩阵$A'$，最后将矩阵$A'$与矩阵$V$相乘得到最后的输出$O$。
![](/image/Deep_Learning/Transformer/self_attention3.png)
![](/image/Deep_Learning/Transformer/self_attention4.png)
用公式可以表示为：
$$
O = softmax(QK^T)V
$$
一般情况下，我们为了让梯度更稳定，还会除以key向量的维数的平方根，所以最后的公式表示为：
$$
O = softmax(\frac{QK^T}{\sqrt{d_k}})V
$$






参考资料：
[1] [Attention is all you need](https://user.phil.hhu.de/~cwurm/wp-content/uploads/2020/01/7181-attention-is-all-you-need.pdf)
[2] [注意力机制的本质|Self-Attention|Transformer|QKV矩阵](https://www.bilibili.com/video/BV1dt4y1J7ov)
[3] [【可视化】Transformer中多头注意力的计算过程](https://www.bilibili.com/video/BV1SF4m1K7gk)
[4] [【研1基本功 （真的很简单）注意力机制】手写多头注意力机制](https://www.bilibili.com/video/BV1o2421A7Dr)