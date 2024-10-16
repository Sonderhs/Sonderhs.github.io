---
title: Diffusion Model原理及代码解析
tags: Diffusion
categories: 深度学习
top_img: ../image/Deep_Learning/Diffusion_Model/cover.png
date: 2024-10-15 00:00:00
copyright: false
description: diffsion model学习
cover: ../image/Deep_Learning/Diffusion_Model/cover.png
---

# Diffusion Model原理及代码解析
扩散模型（Diffusion Model）是一类生成模型，用于学习如何从噪声中生成数据。近年来，它们在图像生成、文本生成等领域取得了显著的进展。扩散模型的基本思想是通过逐步向数据添加噪声（通常是高斯噪声），让数据逐渐变得模糊，直至接近纯噪声的形式。然后，模型通过学习逆向过程，即从噪声逐步恢复出原始数据，从而生成新的样本。
![diffusion model传播过程](/image/Deep_Learning/Diffusion_Model/diffusion_model_process.png)
目前有很多生成模型，比如GAN，VAE，Flow-based models，Diffusion models等等:
![不同生成模型对比图](/image/Deep_Learning/Diffusion_Model/different_models.png)
本文主要介绍基于[Denoising Diffusion Probabilistic Models](http://arxiv.org/abs/2006.11239)的diffusion model。

# 一、基础知识
## 1.1 条件概率的一般形式
$$
\begin{align}
    P(A,B,C)=P(C|B,A)P(B,A)=P(C|B,A)P(B|A)P(A) \tag{1-1} \newline
    P(B,C|A)=P(B|A)P(C|A,B) \tag{1-2}\hspace{4.25cm}
\end{align}
$$
## 1.2 基于马尔科夫链假设的概率
马尔科夫链假设：简单来说就是研究对象在$t$时刻的状态只与$t-1$时刻的状态有关，而与之前的状态无关。
若满足马尔科夫链关系：$A \to B \to C$，则有：
$$
\begin{align*}
    P(A,B,C)=P(C|B,A)P(B,A)=P(C|B)P(B|A)P(A) \tag{1-3}\newline
    P(B,C|A)=P(B|A)P(C|B) \hspace{4.25cm} \tag{1-4}
\end{align*}
$$
## 1.3 贝叶斯公式
$$
P(A|B)=P(B|A)\frac{P(A)}{P(B)} \tag{1-5}
$$
## 1.4 高斯分布的KL散度公式
相对熵（relative entropy），又被称为Kullback-Leibler散度（Kullback-Leibler divergence）或信息散度（information divergence），是两个概率分布（probability distribution）间差异的非对称性度量。在信息理论中，相对熵等价于两个概率分布的信息熵（Shannon entropy）的差值。
对于两个单一变量的高斯分布$p$和$q$而言，他们的KL散度为：
$$
KL(p,q)=log\frac{\sigma_2}{\sigma_1}+\frac{\sigma_1^2+(\mu_1-\mu_2)^2}{2\sigma_2^2}-\frac{1}{2} \tag{1-6}
$$
其中：
$$
p \thicksim \mathcal{N}(\mu_1,\sigma_1^2) \newline
q \thicksim \mathcal{N}(\mu_2,\sigma_2^2)
$$
## 1.5 重参数化技巧（Reparameterization Trick）
重参数化技巧（Reparameterization Trick） 是一种在深度学习中常用的技术，尤其是在变分自动编码器（Variational Autoencoder, VAE）中，用来解决对随机变量进行梯度求导的问题。
### 1.5.1 重参数化的核心思想
重参数化的核心思想是将一个随机变量的采样过程表示为一个确定性函数加上一些外部噪声。通过这种方式，我们能够将梯度传播到随机变量的参数上。
具体来说，假设我们有一个高斯分布$z \sim \mathcal{N}(\mu, \sigma^2)$，传统的采样方法会直接从这个高斯分布中生成样本$z$，但这样做时，$z$的生成过程包含了随机性，不能直接对$\mu$和$\sigma$求梯度，因为采样操作不可导。
重参数化技巧的核心思想是： 将$z$的采样过程重新表示为一个确定性函数形式：
$$
z = \mu + \sigma \cdot \epsilon \tag{1-7}
$$
其中，$\epsilon$是从标准正态分布$\epsilon \sim \mathcal{N}(0,1)$中采样的。通过这种变换，随机性被分离到了$\epsilon$中，而$z$现在是由$\mu$和$\sigma$确定性地生成的。这样，虽然我们在计算$z$时仍然依赖噪声$\epsilon$，但这个公式对$\mu$和$\sigma$是可导的，可以通过反向传播计算出损失函数对$\mu$和$\sigma$的梯度。
**需要注意的是：重参数化只是将采样过程重写为可导的形式，而没有改变分布本身，$z$依然服从于正态分布$\mathcal{N}(\mu, \sigma^2)$**。
### 1.5.2 重参数化的优势
1. **可导性：**
   通过将随机变量表示为确定性变量的函数，重参数化技巧使得我们能够对采样过程进行梯度求解，从而可以使用常规的反向传播算法来优化目标函数。
2. **稳定性：**
   重参数化技巧将采样和参数分离，使模型在优化时更稳定。例如，在VAE中，通过这种技巧可以更有效地学习潜在空间的分布。
3. **高效性：**
   通过重参数化，我们可以避免复杂的蒙特卡罗方法，减少计算量并加快模型的训练速度。
### 1.5.3 示例
假设我们要优化一个由高斯分布$\mathcal{N}(\mu, \sigma^2)$生成的随机变量$z$，我们希望通过最小化某个损失函数$L(z)$来学习$\mu$和$\sigma$。直接对$z$进行优化很难，但通过重参数化：
$$
z = \mu + \sigma \cdot \epsilon, \epsilon \sim \mathcal{N}(0,1)
$$
我们可以将损失函数$L(z)$写成$L(\mu + \sigma \cdot \epsilon)$，然后通过反向传播来计算关于$\mu$和$\sigma$的梯度。

# 二、Diffusion扩散过程
## 2.1 Diffusion正向扩散过程（Forward Process）
Diffsion model的正向传播过程是一个向图片添加噪音的过程。
![forward process](/image/Deep_Learning/Diffusion_Model/forward_process.png)
给定初始数据分布$x_0 \sim q(x)$，可以不断向分布中添加$T$次高斯噪声，得到$x_1,x_2,...,x_T$，如下图的$q$过程。这里需要给定一系列的高斯分布方差的超参数$\{\beta_t \in (0,1)\}_{t=1}^T$。假设每次添加噪声的过程符合马尔科夫链假设，则有：
$$
\begin{align*}
   q(x_t|x_{t-1})=\mathcal{N}(x_t;\sqrt{1-\beta_t}x_{t-1},\beta_t\Iota)\tag{2-1} \newline
   q(x_{1:T}|x_0)=\prod_{t=1}^Tq(x_t|x_{t-1}) \tag{2-2}\hspace{1.55cm} 
\end{align*}
$$
其中，$\beta_t$是随着$t$的增大而逐渐变大的，在原论文中，$\beta_t \in (0.0001,0.02)$。也就是说，在前向扩散过程中，随着$t$的增大，$\beta_t$不断增大，也就是噪声的占比逐渐变多，$x_t$越来越接近纯噪声。当$T \to \infin$时，$x_T$是完全的高斯噪声。
![diffusion process](/image/Deep_Learning/Diffusion_Model/DDPM.png)
利用重参数技巧我们可以将添加噪声的过程用下面的公式表示：
$$
x_t = \sqrt{\alpha_t}x_{t-1}+\sqrt{1-\alpha_t}z_{t-1} \tag{2-3}
$$
其中：$x_t$表示$t$时刻的图像，$x_{t-1}$表示$t-1$时刻的图像，$z_{t-1}$表示$t-1$时刻添加的高斯噪声，其服从于高斯分布$\mathcal{N}(0,1)$。$\alpha_t=1-\beta_t$。
当我们不断带入前一时刻的表达式后可以得到：
$$\begin{align*}
  x_t &= \sqrt{\alpha_t}x_{t-1}+\sqrt{1-\alpha_t}z_{t-1} \\
  &= \sqrt{\alpha_t}(\sqrt{\alpha_{t-1}}x_{t-2}+\sqrt{1-\alpha_{t-1}}z_{t-2})+\sqrt{1-\alpha_t}z_{t-1} \\ 
  &= \sqrt{\alpha_t\alpha_{t-1}}x_{t-2}+\sqrt{1-\alpha_t\alpha_{t-1}}z_{t-2} \\
  &= ... \\
  &= \sqrt{\bar\alpha_t}x_0+\sqrt{1-\bar\alpha_t}\bar{z_t} \tag{2-4}
\end{align*}$$
其中:$\bar \alpha_t=\prod_{i=1}^T\alpha_i$，$\bar{z_t} \sim \mathcal{N}(0,1)$。
注意：在第三行中我们使用了一个技巧：两个正态分布$X \sim \mathcal{N}(\mu_1,\sigma_1^2)$和$Y \sim \mathcal{N}(\mu_2,\sigma_2^2)$叠加后的分布$aX+bY$的均值为$a\mu_1+b\mu_2$，方差为$a^2\sigma_1^2+b^2\sigma_2^2$，所以$\sqrt{\alpha_t(1-\alpha_{t-1})}z_{t-2}+\sqrt{1-\alpha_t}z_{t-1}$可以参数重整化为只含一个随机变量$z$构成的$\sqrt{1-\alpha_t\alpha_{t-1}}z$的形式。
根据上面的公式我们可以发现，想象中我们添加了$T$次噪声，但实际上我们可以只通过对原图添加一次噪声就得到$t$时刻的图像。
![](/image/Deep_Learning/Diffusion_Model/forward_process_real.png)
根据以上推导过程，我们可以得到任意时刻的$x_t$都满足:
$$
q(x_t|x_0)=\mathcal{N}(x_t;\sqrt{\bar\alpha_t}x_0,(1-\bar\alpha_t)\Iota) \tag{2-5}
$$
这为我们后面的预测模型打下了基础。

## 2.2 Diffusion逆向扩散过程（Reverse Process）
前面我们说到前向传播过程是一个向图片添加高斯噪声的过程，那么逆向传播过程就是为图片去噪的过程。
![reverse process](/image/Deep_Learning/Diffusion_Model/reverse_process.png)
如果我们能够逐步得到逆转后的分布$q(x_{t-1}|x_t)$，就可以从完全的标准高斯分布$x_T \sim \mathcal{N}(0,\Iota)$还原出原图分布$x_0$.在已有的文献中已经证明了如果$q(x_t|x_{t-1})$满足高斯分布且$\beta_t$足够小，$q(x_{t-1}|x_t)$仍然是一个高斯分布。然而我们无法简单推断$q(x_{t-1}|x_t)$，因此我们使用深度学习模型（参数为$\theta$，目前主流是U-Net+attention的结构）去预测这样的一个逆向的分布$p_\theta$（类似VAE）：
$$
\begin{align*}
   p_\theta(x_{0:T}) = p(x_T)\prod_{t=1}^Tp_\theta(x_{t-1}|x_t) \tag{2-6}\newline
   p_\theta(x_{t-1}|x_t) = \mathcal{N}(x_{t-1};\mu_\theta(x_t,t),\sum_\theta(x_t,t)) \tag{2-7}\hspace{-1.54cm} 
\end{align*}
$$
我们如何根据$x_t$图像反向得到$x_{t-1}$呢？我们已经知道$q(x_t|x_{t-1})$，那么我们就可以根据贝叶斯公式得到:
$$
q(x_{t-1}|x_t)=q(x_t|x_{t-1})\frac{q(x_{t-1})}{q(x_t)} \tag{2-8}
$$
但是在公式(2-8)中，$q(x_t)$和$q(x_{t-1})$是未知的，由公式(2-4)我们知道可以由$x_0$得到每一时刻的图像，所以我们可以得到：
$$
\begin{align*}
   q(x_{t-1}|x_0) = \sqrt{\bar\alpha_{t-1}}x_0+\sqrt{1-\bar\alpha_{t-1}}z \tag{2-9}\newline
   q(x_t|x_0) = \sqrt{\bar\alpha_t}x_0+\sqrt{1-\bar\alpha_t}z \hspace{1.05cm} \tag{2-10}\newline
   q(x_t|x_{t-1},x_0) = \sqrt{\alpha_t}x_{t-1}+\sqrt{1-\alpha_t}z \tag{2-11}
\end{align*}
$$
那么公式(2-8)就可以化为：
$$
q(x_{t-1}|x_t,x_0) = q(x_t|x_{t-1},x_0)\frac{q(x_{t-1}|x_0)}{q(x_t|x_0)} \tag{2-11}
$$
且：
$$
q(x_{t-1}|x_t,x_0) = \mathcal{N}(x_{t-1};\tilde{\mu_t}(x_t,x_0),\tilde{\beta_t}\Iota) \tag{2-12}
$$
根据高斯分布的概率密度函数：
$$\begin{align*}
f(x) &= \frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(x-\mu)^2}{2\sigma^2}} \\
     &= \frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{1}{2}[\frac{1}{\sigma^2}x^2-\frac{2\mu}{\sigma^2}x+\frac{\mu^2}{\sigma^2}]} \tag{2-13}
\end{align*}
$$
我们就将公式(2-11)化为：
$$\begin{align*}
q(x_{t-1}|x_t,x_0) &= q(x_t|x_{t-1},x_0)\frac{q(x_{t-1}|x_0)}{q(x_t|x_0)} \\
&\propto exp(-\frac{1}{2}(\frac{(x_t-\sqrt{\alpha_t}x_{t-1})^2}{\beta_t}+\frac{(x_{t-1}-\sqrt{\bar\alpha_{t-1}x_0})^2}{1-\bar\alpha_{t-1}}-\frac{(x_t-\sqrt{\bar\alpha_t}x_0)^2}{1-\bar\alpha_t})) \\
&= exp(-\frac{1}{2}((\frac{\alpha_t}{\beta_t}+\frac{1}{1-\bar\alpha_{t-1}})x_{t-1}^2-(\frac{2\sqrt{\alpha_t}}{\beta_t}x_t+\frac{2\sqrt{\bar\alpha_{t-1}}}{1-\bar\alpha_{t-1}}x_0)x_{t-1}+C(x_t,x_0))) \tag{2-14}
\end{align*}$$
再根据公式(2-13)的形式我们可以得到公式(2-12)中的$\tilde{\mu}(x_t,x_0)$和$\tilde{\beta_t}$
$$
\begin{align*}
   \tilde{\beta_t} = 1/(\frac{\alpha_t}{\beta_t}+\frac{1}{1-\bar\alpha_{t-1}})=\frac{1-\bar\alpha_{t-1}}{1-\bar\alpha_t}\beta_t \hspace{6.97cm}\tag{2-15}\newline
   \tilde{\mu_t}(x_t,x_0) = (\frac{\sqrt{\alpha_t}}{\beta_t}x_t+\frac{\sqrt{\bar\alpha_t}}{1-\bar\alpha_t}x_0)/(\frac{\alpha_t}{\beta_t}+\frac{1}{1-\bar\alpha_{t-1}}) = \frac{\sqrt{\alpha_t}(1-\bar\alpha_{t-1})}{1-\bar\alpha_t}x_t+\frac{\sqrt{\bar\alpha_{t-1}}\beta_t}{1-\bar\alpha_t}x_0 \tag{2-16}
\end{align*}
$$
再根据公式(2-4)我们可以得到：
$$
x_0 = \frac{1}{\sqrt{\bar\alpha_t}}(x_t-\sqrt{1-\bar\alpha_t}\bar{z_t}) \tag{2-17}
$$
将公式(2-17)带入到公式(2-16)中可以得到：
$$
\tilde\mu_t = \frac{1}{\sqrt{\alpha_t}}(x_t-\frac{1-\alpha_t}{\sqrt{1-\bar\alpha_t}}\bar{z_t})
$$
**但是在论文中实现的DDPM与我们上面的计算还是有一些小小的不同：**
![sampling](/image/Deep_Learning/Diffusion_Model/sampling.png)
所以按照论文中的伪代码，DDPM的一次降噪过程实际上有如下几步：
![一次denoise过程](/image/Deep_Learning/Diffusion_Model/denoise.png)
1. 将随机采样处的噪声图片$x_t$以及$t$传入Noise Predicter生成预测的噪声结果$\epsilon_\theta(x_t,t)$
2. 使用原图$x_t$减去预测噪声的$\frac{1-\alpha_t}{\sqrt{1-\bar\alpha_t}}$倍后再乘以$\frac{1}{\sqrt{\alpha_t}}$就可以得到比较干净的图了
3. 但是在DDPM中，这里又多了一步，那就是将得到的图再加上了一个$\sigma_t$倍的$z$，其中$z$也是从标准高斯分布中采样得到的噪声，然后得到了最终的图片。
   对于这里为什么要加上$\sigma_tz$，根据李宏毅老师说的就是为了引入随机性，只有引入随机性结果才会好，实验结果也证明了这点。
   ChatGPT也是这样说的：
   ![ChatGPT对于该问题的回答](/image/Deep_Learning/Diffusion_Model/chatgpt.png)




参考资料：
[1] [Denoising Diffusion Probabilistic Models](http://arxiv.org/abs/2006.11239)
[2] [扩散模型 - Diffusion Model【李宏毅2023】](https://www.bilibili.com/video/BV14c411J7f2/)
[3] [Probabilistic Diffusion Model概率扩散模型理论与完整PyTorch代码详细解读](https://www.bilibili.com/video/BV1b541197HX/)
[4] [由浅入深了解Diffusion Model](https://zhuanlan.zhihu.com/p/525106459)
[5] [百度百科](https://www.baidu.com)