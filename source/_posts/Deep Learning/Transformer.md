---
title: Transformer原理及代码实现
tags: 
- transformer
- 深度学习
categories: 深度学习
top_img: transparent
date: 2024-11-01 00:00:00
copyright: false
description: Transformer原理及代码实现
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

# 二、注意力机制（Attention）
## 2.1 注意力机制(attention)
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
## 2.2 自注意力机制（self-attention）
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

## 2.3 多头注意力机制(multi-head attention)
多头注意力机制是在自注意力机制的基础上，通过增加多个注意力头来并行地对输入信息进行不同维度的注意力分配，从而捕获更丰富的特征和上下文。
多头注意力机制的实现主要有以下步骤：
1. **输入嵌入**：给定一个输入$X$，我们先得到每个输入的嵌入表示。

2. **线性变换**：我们将输入分别经过三个不同的线性层，即进行线性变换，得到查询（Query）、键（Key）和值（Value）矩阵：
$$
Q = XW_Q, K = XW_K, V = XW_V 
$$
其中：$W_Q、W_K、W_V$均为可学习的权重矩阵。

3. **多头分割**：将$Q、K、V$分割成$h$个头，没个头的维度比原来小。这样做的目的是让每个头关注不同的特征。

4. **计算每个头的注意力**：对于每个头$i$，计算注意力权重和加权的值向量：
$$
head_i = Attention_i(Q_i,K_i,V_i) = softmax(\frac{Q_iK_i^T}{\sqrt{d_k}})V_i
$$

5. **拼接头部**：将所有头的注意力输出拼接起来形成一个新的矩阵：
$$
MultiHead(Q,K,V) = Concat(head_1,head_2,...,head_n)W_O
$$
其中：$W_O$是可学习的输出变换矩阵矩阵。

6. **输出**：最终的多注意力输出回座位后续层的输入。
过程可以表示为下面的图像：
![multihead attention](/image/Deep_Learning/Transformer/multihead_attention.png)

还有一种多头的实现方法不是将矩阵拆分，而是进行多次线性变换从而实现多头，过程如下图所示：
![multihead attention](/image/Deep_Learning/Transformer/multihead_attention1.png)

## 2.4 多头注意力机制的代码实现
多头注意力机制的代码实现如下：
```python
import torch
from torch import nn
import math
import torch.nn.functional as F


class MultiheadAttention(nn.Module):
    def __init__(self, model_dim, num_head) -> None:
        super(MultiheadAttention, self).__init__()
        
        self.model_dim = model_dim  # 初始化模型维数
        self.num_head = num_head  # 初始化头个数
        # 初始化w_q,W_k,w_v矩阵
        self.w_q = nn.Linear(model_dim, model_dim)
        self.w_k = nn.Linear(model_dim, model_dim)
        self.w_v = nn.Linear(model_dim, model_dim)
        # 初始化输出矩阵
        self.o = nn.Linear(model_dim, model_dim)
        # 定义softmax层
        self.softmax = nn.Softmax(dim=-1)

    def forward(self, q, k, v, mask=None):
        # q的形状为[batch_size,seq_len,dimension]
        # batch_size：批量大小
        # seq_len：序列长度
        # dimension：每个序列元素的嵌入维度
        batch, seq_len, dimension = q.shape
        head_dim = self.model_dim // self.num_head  # 计算头的dimension

        # 首先让q,k,v经过线性层投影
        Q = self.w_q(q)
        K = self.w_k(k)
        V = self.w_v(v)

        # 分割q,k,v为多头
        # permute:交换维度
        Q = Q.view(batch, seq_len, self.num_head, head_dim).permute(0, 2, 1, 3)
        K = K.view(batch, seq_len, self.num_head, head_dim).permute(0, 2, 1, 3)
        V = V.view(batch, seq_len, self.num_head, head_dim).permute(0, 2, 1, 3)

        # 计算注意力得分score=Q@K^T/sqrt(head_d)
        scores = Q @ K.transpose(2, 3) / math.sqrt(head_dim)
        if mask is not None:
            # mask = torch.tril(torch.ones(seq_len, seq_len, dtype=bool))
            scores = scores.masked_fill(mask == 0, -1e9)
        # 再通过softmax
        scores = self.softmax(scores) @ V

        # 拼接所有的头
        # scores形状：[batch_size, num_head, seq_len, seq_len]
        scores = scores.permute(0, 2, 1, 3).contiguous().view(batch, seq_len, dimension)

        # 通过最后的线性层得到输出
        output = self.o(scores)
        return output

if __name__ == '__main__':
    model_dim = 512
    num_head = 8
    attention = MultiheadAttention(model_dim, num_head)
    x = torch.rand(128, 64, 512)  # batch, seq_len, dimension
    output = attention(x, x, x)
    print(output, output.shape)
```

# 三、位置编码（Positional Encoding）
## 3.1 位置编码原理
位置编码也是transformer的特色之一。在Transformer以前，NLP任务中有一个很大的问题，那就是模型没有办法知道每个token在句子中的绝对和相对位置信息，比如对于这两个句子：“Tom chase Jerry”和"Jerry chase Tom"，它们的token完全一样，但是含义完全相反。
位置编码技术就可以很好的解决这个问题。Transformer将token的循序信号加到词向量上帮助模型学习这些信息，这就是位置编码（Positional Encoding）。
Transformer中使用的是正弦-余弦位置编码，对于位置$pos$和嵌入维度中的第$i$个维度，位置编码的定义如下：
$$
PE_{(pos,2i)} = sin(\frac{pos}{10000^{\frac{2i}{d_{model}}}})  \newline
PE_{(pos,2i+1)} = cos(\frac{pos}{10000^{\frac{2i}{d_{model}}}})
$$
其中：$pos$是序列中的位置，如第几个词；$i$是嵌入维度中的索引；$d_{model}$是词嵌入的维度大小。
比如我们对于一个简单的句子“Are you OK ？”，这个句子一共包含了四个词，我们假设每个词嵌入的维度为4，那么就会产生一个词嵌入矩阵：
![](/image/Deep_Learning/Transformer/PE1.png)
然后我们需要对每个词的每一个维度都做一次位置编码的计算，比如对于单词“Are”我们就可以计算其位置编码$(pos=0,d=4)$：
$$
PE_{(0,0)} = sin(\frac{0}{10000^{\frac{0}{4}}}) \\
PE_{(0,1)} = cos(\frac{0}{10000^{\frac{0}{4}}}) \\
PE_{(0,2)} = sin(\frac{0}{10000^{\frac{2}{4}}}) \\
PE_{(0,3)} = cos(\frac{0}{10000^{\frac{2}{4}}}) \\
$$
最终我们会将得到的位置编码矩阵与词向量矩阵相加，从而得到嵌入位置编码的词向量矩阵：
![](/image/Deep_Learning/Transformer/PE2.png)
之所以使用正弦和余弦函数，是因为正弦和余弦函数的不同周期性是的每个位置$pos$的编码都是唯一的，且不同位置之间的编码在高维空间中有足够的差异。
## 3.2 位置原理的代码实现
位置编码的代码实现如下：
```python
# Embedding
# Token Embedding
class TokenEmbedding(nn.Embedding):
    def __init__(self, vocab_size, model_dim):
        super(TokenEmbedding, self).__init__(vocab_size, model_dim, padding_idx=1)


# Position Embedding
class PositionEmbedding(nn.Module):
    def __init__(self, model_dim, maxlen, device):
        super(PositionEmbedding, self).__init__()
        # 首先定义一个空的位置编码矩阵
        self.encodeing = torch.zeros(maxlen, model_dim, device=device)
        self.encodeing.requires_grad_(False)

        pos = torch.arange(0, maxlen, device=device)
        pos = pos.float().unsqueeze(1)
        _2i = torch.arange(0, model_dim, 2, device=device)

        # 偶数位置
        self.encodeing[:, 0::2] = torch.sin(pos / (10000 ** (_2i / model_dim)))
        # 奇数位置
        self.encodeing[:, 1::2] = torch.cos(pos / (10000 ** (_2i / model_dim)))

    def forward(self, x):
        seq_len = x.shape[1]
        return self.encodeing[:seq_len, :]


# TransformerEmbedding
class TransformerEmbedding(nn.Module):
    def __init__(self, model_dim, vocab_size, maxlen, drop_prob, device):
        super(TransformerEmbedding, self).__init__()
        # 首先进行Token编码
        self.tok_emb = TokenEmbedding(vocab_size, model_dim)
        # 然后进行位置编码
        self.pos_emb = PositionEmbedding(model_dim, maxlen, device=device)
        self.drop_out = nn.Dropout(p=drop_prob)

    def forward(self, x):
        tok_emb = self.tok_emb(x)
        pos_emb = self.pos_emb(x)
        # Token编码与位置编码相加并通过dropout层，作为Transformer encoder的输入
        out = self.drop_out(tok_emb + pos_emb)
        return out
```

# 四、前馈神经网络层(Feed-Forward Network)
## 4.1 前馈神经网络(Feed-Forward Network)原理
在Transformer中，每次经过attention层后，都会再经过一个前馈神经网络层(FFN)，其作用是对每个位置的注意力输出进一步进行的特征转换和非线性映射，以增强模型的表达能力。
FFN层包含了两层linear层和一层ReLu层，其公式是：
$$
FFN(x) = max(0,xW_1+b_1)W_2+b_2
$$
其中：$W_1$和$W_2$是可学习的权重矩阵，$b_1$和$b_2$是偏置项。
在Transformer中，FFN层对每个位置单独操作，即逐位置地进行前馈计算。这使得模型可以在不考虑位置间依赖的情况下增强每个位置的特征表示，从而避免不同位置的特征相互干扰，有助于模型在不同层次上学习不同的特征。
## 4.2 前馈神经网络的代码实现
前馈神经网络层的代码实现如下：
```python
# FFN:Position-Wise Fully Connected Feed-Forward Network
class PositionwiseFeedForward(nn.Module):
    def __init__(self, model_dim, hidden, dropout=0.1):
        super(PositionwiseFeedForward, self).__init__()
        self.fc1 = nn.Linear(model_dim, hidden)
        self.fc2 = nn.Linear(hidden, model_dim)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        x = self.fc1(x)
        x = F.relu(x)
        x = self.dropout(x)
        x = self.fc2(x)
        return x
```

# 五、Mask机制（Mask）
在Transformer模型中，Encoder和Decoder的mask矩阵用于不同的目的，它们限制了模型在自注意力（self-attention）计算时可以看到哪些信息。
## 5.1 Encoder中的Mask
在模型训练过程中，我们每次会输入多个句子，但这些句子的长度很可能不一致，所以为了使每个句子的长度都保持一致，我们会对句子编码进行填充padding，从而使得所有句子长度一致。
一般我们会使用0来填充位置，但是在训练过程中，这些用0填充的位置对于训练是没有意义的，所以为了避免这些填充影响模型的训练结果，我们会使用mask来把这些位置遮挡住，从而使模型的注意力集中到有意义的位置上，这种做法称为padding mask。
具体的实现是：在Multi-Head Attention中的Softmax之前，我们会生成一个与嵌入矩阵形状相同的全1矩阵，并将想要mask的位置都为0，之后将我们就可以根据mask=0的位置将嵌入矩阵中的对应位置设置为$-\infty$，这样在经过softmax之后所有mask的位置都会被置为0，也就不会影响模型的训练了。
## 5.2 Decoder中的Mask
在Decoder中，需要两种mask：Look-ahead Mask和Padding Mask。
Padding Mask与之前一样都是为了避免填充位置的影响。
在计算自注意力分数时，一个词可以与其所在句子中的所有词进行相关性计算，但是在预测过程中，词是从前往后逐渐生成的，所以我们就需要让Decoder看不到预测词之后的信息。而Look-ahead Mask就是为了避免当前预测位置看见未来的词，防止信息泄露（即不允许某个词看到自己后面的词）。
Look-ahead Mask的实现原理就是生成一个下三角矩阵，然后将下三角矩阵作为mask矩阵对嵌入矩阵进行mask操作。
![Decoder mask](/image/Deep_Learning/Transformer/Decoder_mask.png)
## 5.3 生成Mask矩阵的代码实现
```python
   def make_pad_mask(self, q, k, pad_idx_q, pad_idx_k):
        len_q, len_k = q.size(1), k.size(1)
        
        # (batch, time, len_q, len_k)
        q = q.ne(pad_idx_q).unsqueeze(1).unsqueeze(3)
        q = q.repeat(1, 1, 1 ,len_k)

        k = k.ne(pad_idx_k).unsqueeze(1).unsqueeze(2)
        k = k.repeat(1, 1, len_q, 1)

        mask = q & k
        return mask
    
   def make_casual_mask(self, q, k):
        len_q, len_k = q.size(1), k.size(1)
        mask = torch.tril(torch.ones(len_q, len_k)).type(torch.BoolTensor).to(self.device)
        return mask
```

# 六、Transformer编码器（Transformer Encoder）
## 6.1 Encoder的结构
Transformer的编码器结构如下：
![Encoder](/image/Deep_Learning/Transformer/Encoder.png)
1. 我们的输入$x_0$首先经过Token编码与Position编码，然后得到输入$x_1$
2. $x_1$进入Encoder之后首先经过Multi-head Attention层后得到输出$x_2$
3. 之后$x_2$与$x_1$相加之后进入Norm层得到输出$x_3$
4. 接着$x_3$作为新的输入进入FFN层得到$x_4$
5. $x_4$和$x_3$相加后进入Norm层，然后得到的输入$x_5$
6. 之后$x_5$会作为新的输入再次进入到多个Encoder中，最终得到Encoder的输出
## 6.2 Encoder的代码实现
具体代码实现如下：
```python
import torch
from torch import nn
import math
import torch.nn.functional as F
from multi_head_attention import MultiheadAttention

# Embedding
# Token Embedding
class TokenEmbedding(nn.Embedding):
    def __init__(self, vocab_size, model_dim):
        super(TokenEmbedding, self).__init__(vocab_size, model_dim, padding_idx=1)


# Position Embedding
class PositionEmbedding(nn.Module):
    def __init__(self, model_dim, maxlen, device):
        super(PositionEmbedding, self).__init__()
        self.encodeing = torch.zeros(maxlen, model_dim, device=device)
        self.encodeing.requires_grad_(False)

        pos = torch.arange(0, maxlen, device=device)
        pos = pos.float().unsqueeze(1)
        _2i = torch.arange(0, model_dim, 2, device=device)

        # 偶数位置
        self.encodeing[:, 0::2] = torch.sin(pos / (10000 ** (_2i / model_dim)))
        # 奇数位置
        self.encodeing[:, 1::2] = torch.cos(pos / (10000 ** (_2i / model_dim)))

    def forward(self, x):
        seq_len = x.shape[1]
        return self.encodeing[:seq_len, :]


# TransformerEmbedding
class TransformerEmbedding(nn.Module):
    def __init__(self, model_dim, vocab_size, maxlen, drop_prob, device):
        super(TransformerEmbedding, self).__init__()
        self.tok_emb = TokenEmbedding(vocab_size, model_dim)
        self.pos_emb = PositionEmbedding(model_dim, maxlen, device=device)
        self.drop_out = nn.Dropout(p=drop_prob)

    def forward(self, x):
        tok_emb = self.tok_emb(x)
        pos_emb = self.pos_emb(x)
        out = self.drop_out(tok_emb + pos_emb)
        return out


# Layer Norm
# 过程：求出均值mu和方差sigma，
# 然后out=(x-mean)/sqrt(sigma+eps)之后进行偏移y=gamma*x+beta
class LayerNorm(nn.Module):
    def __init__(self, model_dim, eps=1e-10):
        super(LayerNorm, self).__init__()
        self.gamma = nn.Parameter(torch.ones(model_dim))
        self.beta = nn.Parameter(torch.zeros(model_dim))
        self.eps = eps

    def forward(self, x):
        mean = x.mean(-1, keepdim=True)
        var = x.var(-1, unbiased=False, keepdim=True)
        out = (x - mean) / torch.sqrt(var + self.eps)
        out = self.gamma * out + self.beta
        return out


# FFN:Position-Wise Fully Connected Feed-Forward Network
class PositionwiseFeedForward(nn.Module):
    def __init__(self, model_dim, hidden, dropout=0.1):
        super(PositionwiseFeedForward, self).__init__()
        self.fc1 = nn.Linear(model_dim, hidden)
        self.fc2 = nn.Linear(hidden, model_dim)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        x = self.fc1(x)
        x = F.relu(x)
        x = self.dropout(x)
        x = self.fc2(x)
        return x


# EncoderLayer
class EncoderLayer(nn.Module):
    def __init__(self, model_dim, num_head, hidden, drop_prob):
        super(EncoderLayer, self).__init__()
        self.attention = MultiheadAttention(model_dim, num_head)
        self.norm1 = LayerNorm(model_dim)
        self.drop1 = nn.Dropout(drop_prob)

        self.ffn = PositionwiseFeedForward(model_dim, hidden, drop_prob)
        self.norm2 = LayerNorm(model_dim)
        self.drop2 = nn.Dropout(drop_prob)

    def forward(self, x, mask=None):
        _x = x
        x = self.attention(x, x, x, mask)
        
        x = self.drop1(x)
        x = self.norm1(x + _x)

        _x = x
        x = self.ffn(x)
        x = self.drop2(x)
        x = self.norm2(x + _x)
        return x
```

# 七、Transformer解码器（Transformer Decoder）
## 7.1 Deconder的结构
Transformer解码器的结构如下：
![Decoder](/image/Deep_Learning/Transformer/Decoder.png)
Decoder的结构其实与Encoder类似，只不过与Encoder相比，Decoder多了一个Cross Attention模块。
1. 我们由Encoder得到的输出$x_5$首先经过Token编码与Position编码得到Decoder的输入$x_6$
2. $x_6$作为Decoder的输入进入到Masked Multi-Head Attention层得到$x_7$
3. $x_7$与$x_6$相加之后进入Norm层得到$x_8$
4. 之后$x_8$会与$x_5$相加进入到Multi-Head Attention层，也就是Cross Attention层，得到$x_9$
5. $x_9$再与$x_8$相加经过Norm层得到$x_10$
6. $x_10$在经过FFN层得到$x_11$
7. $x_11$与$x_10$相加后进入Norm层得到Decoder的输入$x_12$
8. 之后$x_12$会再次经过多个Decoder从而得到Decoder的输出，Decoder的输出再经过Liner层和Softmax层后得到最后的Transformer输出
## 7.2 Decoder的代码实现
具体实现代码如下：
```python
import torch
from torch import nn
import math
import torch.nn.functional as F
from multi_head_attention import MultiheadAttention
from transformer_encoder import *


# DecoderLayer
class DecoderLayer(nn.Module):
    def __init__(self, model_dim, hidden, num_head, drop_prob):
        super(DecoderLayer, self).__init__()
        self.attention1 = MultiheadAttention(model_dim, num_head)
        self.norm1 = LayerNorm(model_dim)
        self.drop1 = nn.Dropout(drop_prob)

        self.cross_attention = MultiheadAttention(model_dim, num_head)
        self.norm2 = LayerNorm(model_dim)
        self.drop2 = nn.Dropout(drop_prob)

        self.ffn = PositionwiseFeedForward(model_dim, hidden, drop_prob)
        self.norm3 = LayerNorm(model_dim)
        self.drop3 = nn.Dropout(drop_prob)

    def forward(self, dec, enc, t_mask, s_mask):
        _x = dec
        x = self.attention1(dec, dec, dec, t_mask)  # 下三角掩码

        x = self.drop1(x)
        x = self.norm1(x + _x)

        if enc is not None:
            _x = x
            x = self.cross_attention(x, enc, enc, s_mask)

            x = self.drop2(x)
            x = self.norm2(x + _x)
        
        _x = x
        x = self.ffn(x)

        x = self.drop3(x)
        x = self.norm3(x + _x)
        return x


class Decoder(nn.Module):
    def __init__(self, model_dim, dec_voc_size, maxlen, hidden, num_head, n_layer, drop_prob, device):
        super(Decoder, self).__init__()

        self.embedding = TransformerEmbedding(model_dim, dec_voc_size, maxlen, drop_prob, device=device)

        self.layers = nn.ModuleList(
            [DecoderLayer(model_dim, hidden, num_head, drop_prob) for _ in range(n_layer)]
        )

        self.fc = nn.Linear(model_dim, dec_voc_size)

    def forward(self, dec, enc, t_mask, s_mask):
        dec = self.embedding(dec)
        for layer in self.layers:
            dec = layer(dec, enc, t_mask, s_mask)
        
        dec = self.fc(dec)
        return dec
```

# 八、Transformer完整代码实现
## 8.1 Transformer的代码实现
Transformer完整代码实现地址：[Transformer](https://github.com/Sonderhs/My_project/tree/main/transformer)

参考资料：
[1] [Attention is all you need](https://user.phil.hhu.de/~cwurm/wp-content/uploads/2020/01/7181-attention-is-all-you-need.pdf)
[2] [注意力机制的本质|Self-Attention|Transformer|QKV矩阵](https://www.bilibili.com/video/BV1dt4y1J7ov)
[3] [【可视化】Transformer中多头注意力的计算过程](https://www.bilibili.com/video/BV1SF4m1K7gk)
[4] [【研1基本功 （真的很简单）注意力机制】手写多头注意力机制](https://www.bilibili.com/video/BV1o2421A7Dr)
[5] [ 如何理解Transformer的位置编码，PositionalEncoding详解](https://www.bilibili.com/video/BV1AD421g7hs)