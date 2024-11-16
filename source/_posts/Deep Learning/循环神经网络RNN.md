---
title: 循环神经网络RNN原理及代码实现
tags: 
- 深度学习
- RNN
categories: 深度学习
top_img: transparent
date: 2024-11-15 00:00:00
copyright: false
description: 本文介绍了循环神经网络RNN，以及其变体GRU和LSTM
cover: ../image/Deep_Learning/RNN/cover.png
---


# 循环神经网络RNN原理及代码实现

# 一、循环神经网络（RNN）
循环神经网络（RNN）是用来处理和生成数据序列的模型，广泛应用于自然语言处理、语音识别、时间序列分析等领域。序列模型的关键特性是它能够处理输入和输出之间的依赖关系，使模型能够理解数据在时间或序列上的顺序。
为了建模序列问题，RNN引入了隐状态h(hidden state)的概念，隐状态可以对序列的数据提取特征，接着再转换为输出。通过使用隐藏状态，我们就可以实现对序列数据的处理。
与传统神经网络不同的是，RNN可以支持不定长的输入。传统的神经网络的输入和输出通常都是固定长度的。例如输入图像大小固定，输出是分类结果，没有顺序相关的要求。但RNN可以支持不同长度的输入和输出，适应多种序列任务。
* 一对一（例如图像分类）：一个输入对应一个输出。
* 一对多（例如图像描述生成）：一个输入对应多个输出。
* 多对一（例如情感分析）：多个输入对应一个输出。
* 多对多（例如机器翻译）：多个输入对应多个输出。

## 1.1 单向循环神经网络
### 1.1.1 单向RNN结构
单向RNN的结构如图所示：
![单向RNN结构](/image/Deep_Learning/RNN/RNN.png)
RNN的计算过程如下：
1. 我们初始化一个隐藏状态矩阵$h_0$，然后输入$x_1$。
2. 首先，$h_0$和$x_1$分别经过一个线性层得到$h_1$，然后我们就可以根据$h_1$得到第一个输出$y_1$。
3. 之后我们将$h_1$和$x_2$再分别经过一个线性层计算得到$h_2$，然后我们就可以再根据$h_2$计算得到$y_2$。
4. 以此类推

### 1.1.2 单向循环网络在Pytorch中的实现
在torch.nn中，RNN的实现原理如下：
$$
h_t = tanh(W_{ih}x_t+b_{ih}+W_{hh}h_{t-1}+b_{hh})
$$
其中：
* $h_t$是时间t时刻的隐藏状态。
* $x_t$是时间t时刻的输入。
* $h_{t-1}$是时间t-1时刻的隐藏状态。
* $W_{ih}$和$W_{hh}$分别是输入$x_t$和隐藏状态$h_{t-1}$的权重矩阵。
* $b_{ih}$和$b_{hh}$分别是输入$x_t$和隐藏状态$h_{t-1}$的偏置值。
* $tanh()$是非线性激活函数，可以用$ReLu$代替。
  
RNN的参数有:
* input_size：输入$x$的特征数量。
* hidden_size：隐藏层$h$的特征数量。
* num_layers：RNN层的数量，num_layers=2表示用两个RNN层形成一个多层RNN，第二个RNN层的输入是第一个RNN层的输出。默认为1。
* nonlinearity：非线性函数，可以是“tanh”或“ReLu”。默认为“tanh”。
* bias：是否使用偏置值。默认为True。
* batch_first：决定输入和输出的格式。如果为True，那么我们的输入和输出张量的格式就是(batch,seq,feature)，如果为False，那么我们的输入和输出张量的格式就是(seq,batch,feature)。默认为False。
* dropout：dropout参数。默认为0。
* bidirectional：是否为双向RNN。如果为True则表示使用双向RNN。如果是双向RNN，那么输出就是两倍的hidden_size。默认为False。

RNN的输入：
* input：当batch_first=False时输入形状为($L$,$N$,$H_{in}$)，当batch_first=True时输入形状为($N$,$L$,$H_{in}$)。
* h_0：形状为($D*num_layers$,$N$,$H_{out}$)。
其中：
* $N$ = batch size
* $L$ = sequence length
* $D$ = 单向RNN时为1，双向RNN时为2
* $H_{in}$ = input_size
* $H_{out}$ = hidden_size

RNN的输出：
* output：当batch_first=False时输入形状为($L$,$N$,$D*H_{out}$)，当batch_first=True时输入形状为($L$,$N$,$D*H_{out}$)。
* h_n：形状为($D*num_layers$,$N$,$H_{out}$)。

RNN的权重和偏置矩阵:
* weight_ih_l[k]：第k层的输入权重矩阵。在K=0时形状为(hidden_size, input_size)，否则形状为(hidden_size,num_directions*hidden_size)。
* weight_hh_l[k]：第k层的隐藏状态权重矩阵。形状为(hidden_size, hidden_size)。
* bias_ih_l[k]：第k层的输入偏置值矩阵。形状为(hidden_size)。
* bias_hh_l[k]：第k层的隐藏状态偏置值矩阵。形状为(hidden_size)。


代码实现如下：
```python
import torch
import torch.nn as nn

# 1.单向单层RNN
single_rnn = nn.RNN(4, 3, 1, batch_first=True)  # input_size, hidden_size, num_layers
input = torch.randn(1, 2, 4)  # batch_size * sequence length * feature_size
output, h_n = single_rnn(input)
print(output)
print(output.shape)  # [1, 2, 3] batch_size * sequence length * D*H_out
print(h_n)
print(h_n.shape)  # [1, 1, 3] D*num_layers * batch_size * H_out

# 2.双向单层RNN
bi_rnn = nn.RNN(4, 3, 1, batch_first=True, bidirectional=True)
input = torch.randn(1, 2, 4)
bi_output, bi_h_n = bi_rnn(input)
print(bi_output)
print(bi_output.shape)  # [1, 2, 6] batch_size * sequence length * D*H_out
print(bi_h_n)
print(bi_h_n.shape)  # [2, 1, 3] D*num_layers * batch_size * H_out
```

### 1.1.3 手写单向RNN
```python
class MyRNN(nn.Module):
    def __init__(self, bs, T, input_size, hidden_size):
        super(MyRNN, self).__init__()

        self.bs = bs  # 批大小
        self.T = T  # 句子长度sequence length
        self.input_size = input_size  # 输入特征数
        self.hidden_size = hidden_size  # 隐藏状态特征数

        # 初始化权重和偏置值矩阵
        self.weight_ih = torch.ones(hidden_size, input_size, requires_grad=True)
        self.weight_hh = torch.ones(hidden_size, hidden_size, requires_grad=True)
        self.bias_ih = torch.zeros(hidden_size, requires_grad=True)
        self.bias_hh = torch.zeros(hidden_size, requires_grad=True)

    def forward(self, x, h_prev):
        h_out = torch.zeros(self.bs, self.T, self.hidden_size)

        for t in range(T):
            x = input[:, t, :]  # batch_size * input_szie
            # 切片之后x会变为2维，所以我们需要对x升维
            x = x.unsqueeze(2)  # batch_size * input_size * 1
            weight_ih_batch = self.weight_ih.unsqueeze(0).tile(bs, 1, 1)  # batch_size * hidden_size * input_size
            weight_hh_batch = self.weight_hh.unsqueeze(0).tile(bs, 1, 1)  # batch_size * hidden_size * hidden_size

            w_ih_times_x = torch.bmm(weight_ih_batch, x).squeeze(-1)  # batch_size * hidden_size
            w_hh_times_h = torch.bmm(weight_hh_batch, h_prev.unsqueeze(2)).squeeze(-1)  # batch_size * hidden_size
            h_prev = torch.tanh(w_ih_times_x + self.bias_ih + w_hh_times_h + self.bias_hh)

            h_out[:, t, :] = h_prev

        return h_out, h_prev.unsqueeze(0)


if __name__ == '__main__':
    bs, T = 2, 3  # 批大小，输入序列长度
    input_size, hidden_size = 2, 3  # 输入特征大小，隐藏状态特征大小
    input = torch.randn(bs, T, input_size)
    h_prev = torch.zeros(bs, hidden_size)  # [2, 3]
    
    myrnn = MyRNN(bs, T, input_size, hidden_size)
    my_rnn_output, my_state_final = myrnn(input, h_prev)

    print(my_rnn_output)
    print(my_state_final)
```


## 1.2 双向循环网络
### 1.2.1 双向RNN结构
单向循环网络只能依据之前时刻的时序信息来预测下一时刻的输出，但在有些问题中，当前时刻的输出不仅和之前的状态有关，还可能与未来的状态有关。
比如要预测一句话中缺失的单词时，就需要同时考虑上下文的内容。
双向RNN有两个RNN上下叠加在一起组成，输出由这两个RNN的状态共同决定。
![双向RNN结构](/image/Deep_Learning/RNN/BRNN.png)
双向RNN的计算过程如下：
1. 首先进行前向RNN，输入$x_1$和$h_0^1$，输出$h_1^1$。
2. 再根据$x_2$和$h_2^1$计算得到$h_3^1$，以此类推进行完前向RNN。
3. 当前向RNN完成后计算反向RNN，反向RNN有单独的隐藏层$h_0^2$，且在反向RNN中输入input是反向输入的。
4. 首先输入$x_4$和$h_0^2$计算得到$h_1^2$，然后由$h_4^1$和$h_1^2$拼接得到最终输出的第一个输出$y_4$(可以直接拼接也可以相加得到$y_4$)。
5. 再由$x_3$和$h_1^2$得到$h_2^2$，由$h_3^1$和$h_2^2$拼接得到输出$y_3$。
6. 以此类推进行完反向RNN过程即可。

**输入及输出分析：**
* 输入：[$x_1,x_2,x_3,x_4$]
* forward输出：[$h_1^1,h_2^1,h_3^1,h_4^1$]
* backward输出：[$h_1^2,h_2^2,h_3^2,h_4^2$]
* 最终输出隐藏状态序列h_out：[$h_1^1|h_4^2,h_2^1|h_3^2,h_3^1|h_2^2,h_4^1|h_1^2$]
* 最终隐藏状态h_n：[$h_4^1,h_4^2$]

### 1.2.2 双向循环网络在pytorch中的实现
使用pytorch实现双向RNN只需要改变传入RNN的参数bidirectional=True即可。
```python
import torch
import torch.nn as nn

bs, T = 2, 3  # 批大小，输入序列长度
input_size, hidden_size = 2, 3  # 输入特征大小，隐藏状态特征大小

input = torch.randn(bs, T, input_size)
h_prev = torch.zeros(2, bs, hidden_size)

bi_rnn = nn.RNN(input_size, hidden_size, batch_first=True, bidirectional=True)
bi_rnn_output, bi_state_final = bi_rnn(input, h_prev)

print(bi_rnn_output)
print(bi_state_final)
```

### 1.2.3 手写双向RNN
```python
import torch
import torch.nn as nn


class MyBiRNN(nn.Module):
    def __init__(self, bs, T, input_size, hidden_size):
        super(MyBiRNN, self).__init__()
        self.bs = bs
        self.T = T
        self.input_size = input_size
        self.hidden_size = hidden_size

        # 初始化前向传播权重及偏置值矩阵
        self.weight_ih = torch.ones(self.hidden_size, self.input_size, requires_grad=True)
        self.weight_hh = torch.ones(self.hidden_size, self.hidden_size, requires_grad=True)

        self.bias_ih = torch.zeros(self.hidden_size, requires_grad=True)
        self.bias_hh = torch.zeros(self.hidden_size, requires_grad=True)
        # 初始化反向传播权重及偏置值矩阵
        self.weight_ih_reverse = torch.ones(self.hidden_size, self.input_size, requires_grad=True)
        self.weight_hh_reverse = torch.ones(self.hidden_size, self.hidden_size, requires_grad=True)

        self.bias_ih_reverse = torch.zeros(self.hidden_size, requires_grad=True)
        self.bias_hh_reverse = torch.zeros(self.hidden_size, requires_grad=True)

    def rnn_forward(self, input, weight_ih, h_prev, weight_hh, bias_ih, bias_hh):
        h_out = torch.zeros(self.bs, self.T, self.hidden_size)

        for t in range(self.T):
            x = input[:, t, :]  # batch_size * input_szie
            # 切片之后x会变为2维，所以我们需要对x升维
            x = x.unsqueeze(2)  # batch_size * input_size * 1
            weight_ih_batch = weight_ih.unsqueeze(0).tile(bs, 1, 1)  # batch_size * hidden_size * input_size
            weight_hh_batch = weight_hh.unsqueeze(0).tile(bs, 1, 1)  # batch_size * hidden_size * hidden_size

            w_ih_times_x = torch.bmm(weight_ih_batch, x).squeeze(-1)  # batch_size * hidden_size
            w_hh_times_h = torch.bmm(weight_hh_batch, h_prev.unsqueeze(2)).squeeze(-1)  # batch_size * hidden_size
            h_prev = torch.tanh(w_ih_times_x + bias_ih + w_hh_times_h + bias_hh)

            h_out[:, t, :] = h_prev

        return h_out, h_prev.unsqueeze(0)

    def forward(self, input, h_prev):
        h_out = torch.zeros(self.bs, self.T, self.hidden_size * 2)  # 双向RNN,所以特征是2倍

        # forward layer
        forward_output = self.rnn_forward(input, self.weight_ih, h_prev[0], self.weight_hh, self.bias_ih, self.bias_hh)[0]
        # backward layer
        # 反向传播时需要将输入反转，因为：
        # 假如输入为[x1,x2,x3,x4]，那么在backward中则是依次输入[x4,x3,x2,x1]
        backward_output = self.rnn_forward(torch.flip(input, [1]), self.weight_ih_reverse,
                                      h_prev[1], self.weight_hh_reverse, self.bias_ih_reverse,
                                      self.bias_hh_reverse)[0]

        # 拼接forward和backward的输出作为最后输出
        # h_out的前半部分是forward输出
        # h_out的后半部分是backward输出，因为backward是反向输出，所以需要翻转一下再拼接
        # 比如forward输出[h1^1,h2^1,h3^1,h4^1]，backward输出[h1^2,h2^2,h3^2,h4^2]
        # 最后拼接得到的是[h1^1|h4^2,h2^1|h3^2,h3^1|h2^2,h4^1|h1^2]
        h_out[:, :, :self.hidden_size] = forward_output
        h_out[:, :, self.hidden_size:] = torch.flip(backward_output, [1])

        # 最终状态应该是forward和backward各自的最终输出拼接在一起，即[h4^1|h4^2]
        h_n = torch.zeros(2, bs, hidden_size)
        h_n[0, :, :] = forward_output[:, -1, :]
        h_n[1, :, :] = backward_output[:, -1, :]

        return h_out, h_n


if __name__ == "__main__":
    bs, T = 2, 3  # 批大小，输入序列长度
    input_size, hidden_size = 2, 3  # 输入特征大小，隐藏状态特征大小

    input = torch.randn(bs, T, input_size)
    h_prev = torch.zeros(2, bs, hidden_size)

    my_bi_rnn = MyBiRNN(bs, T, input_size, hidden_size)
    my_bi_rnn_output, my_bi_state_final = my_bi_rnn(input, h_prev)
    print("my_bi_rnn_output:")
    print(my_bi_rnn_output)
    print("my_bi_state_final:")
    print(my_bi_state_final)
```



参考资料：
[1] [Pytorch官方文档](https://pytorch.org/docs/stable/generated/torch.nn.RNN.html)
[2] [PyTorch RNN的原理及其手写复现](https://www.bilibili.com/video/BV13i4y1R7jB)
[3] [如何从RNN起步，一步一步通俗理解LSTM](https://blog.csdn.net/v_JULY_v/article/details/89894058)
[4] [循环神经网络 RNN【动手学深度学习v2】](https://www.bilibili.com/video/BV1D64y1z7CA)
[5] [深度学习05-RNN循环神经网络](https://blog.csdn.net/liaomin416100569/article/details/131380370)