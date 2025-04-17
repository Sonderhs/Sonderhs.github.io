---
title: BiosERC:Integrating Biography Speakers Supported by LLMs for ERC Tasks
tags: 
- paper
- LLM
- ERC
categories: paper
top_img: transparent
date: 2025-3-17 00:00:00
copyright: false
description: paper阅读：BiosERC:Integrating Biography Speakers Supported by LLMs for ERC Tasks
cover: ../image/Deep_Learning/paper/BiosERC/cover.png
---

# BiosERC:Integrating Biography Speakers Supported by LLMs for ERC Tasks

{% pdf /image/Deep_Learning/paper/BiosERC/BiosERC.pdf %}


## **BiosERC 的具体流程**
BiosERC 是一种用于 **对话情绪识别 (ERC)** 的新方法，它的核心思想是 **利用大语言模型 (LLM) 提取说话者的“传记信息”（biographical information），并将其融入情绪识别任务**。该方法的主要流程如下：

---

## **1. 输入建模**
BiosERC 以 **对话 (Conversation) $C$** 作为输入，其中每个对话由一系列话语 (utterances) 组成：
$$
C = \{u_i\}_{0 \leq i < |C|}
$$
其中，每个话语 $u_i$ 由 **说话者 $p(u_i)$ 发表**，即：
$$
p(u_i) \in S, \quad S = \{s_j\}_{0 \leq j < |S|}
$$
表示该对话中涉及的所有说话者。

---

## **2. 生成说话者传记信息 (Biography Extraction)**
### **2.1 通过 LLM 生成说话者的特征描述**
BiosERC 采用 **大语言模型 (LLM, 例如 Llama-2)**，通过**提示工程 (Prompting)** 生成每位说话者的描述信息。  
该过程如下：
$$
d_j = \text{LLMs(prompting}(C, s_j))
$$
- **输入：** 对话 $C$ 和说话者 ID $s_j$。
- **输出：** 说话者 $s_j$ 的个性描述 $d_j$（如“X 说话直率，经常表现出幽默感”）。

**具体的 Prompt 示例**：
> **系统提示：**  
> "Given the conversation: {conversation content C}, what are the characteristics of speaker {s_j}? (Note: provide an answer within 250 words)"

**示例输出**：
- **Speaker A:** "Seems to be a very emotional person, as evidenced by their sadness and regret..."
- **Speaker B:** "Seems to be a supportive and empathetic listener..."
- **Speaker C:** "Appears to be humorous and likes to joke around..."

**结果：** 得到每位说话者的个性描述集合：
$$
B = \{d_j\}_{0 \leq j < |S|}
$$

---

## **3. 话语编码 (Utterance Encoding)**
使用 **RoBERTa 预训练语言模型** 对每个话语进行编码：
$$
h_{\text{cls}}, h_{\text{words}} = \text{RoBERTa}([u_{i-w}, ..., u_i, ..., u_{i+w}])
$$
$$
h_{\text{utt}} = \tanh(\text{average}(h_{\text{words of } u_i}) W_u)
$$
- 这里，$h_{\text{utt}}$ 是话语 $u_i$ 的向量表示。
- 采用 **上下文窗口** $w$（例如前后 2 句话）来增强表示能力。

---

## **4. 传记信息编码 (Biography Encoding)**
将说话者的描述 $d_j$ 通过 RoBERTa 编码为向量：
$$
h_{\text{desc}_j} = \text{RoBERTa}(d_j)[0]
$$
- 这里，$h_{\text{desc}_j}$ 是说话者 $s_j$ 的特征向量。

---

## **5. 说话者信息融合**
BiosERC 采用两种方法将说话者特征 $h_{\text{desc}_j}$ 融入话语向量 $h_{\text{utt}}$：
### **方法 1：MLP 直接融合**
$$
h_{\text{speaker}_i} = h_{\text{desc}_{p(u_i)}} W_{\text{desc}} + b_{\text{desc}}
$$
- 每个话语 $u_i$ 采用其说话者 $p(u_i)$ 的特征向量进行融合。

### **方法 2：自注意力融合**
$$
h_{\text{fusion}_i} = h_{\text{desc}_{p(u_i)}} W_p + h_{\text{utt}_i}
$$
$$
h_{\text{speaker}_i} = \text{Attn}(h_{\text{fusion}_i}, h_{\text{desc}}, h_{\text{desc}}, 0)
$$
- 这里，使用注意力机制让话语自动选择最相关的说话者特征。

---

## **6. 语境建模 (Context Modeling)**
使用 **多头注意力 (Multi-Head Attention)** 计算全局、同一说话者、不同说话者之间的语境关系：
$$
\text{Attn}(q, k, v, M) = \text{softmax} \left( \frac{q \cdot k^T}{\sqrt{d_t}} + M \right) \cdot v
$$
- **关系矩阵 $M$** 控制不同话语间的交互方式：
  - **全局上下文**：所有话语相互影响。
  - **同一说话者**：仅连接相同说话者的话语。
  - **不同说话者**：仅连接不同说话者的话语。

最终得到融合后的特征：
$$
h_{\text{context}} = \text{concat}([h_{\text{global}}, h_{\text{intra}}, h_{\text{inter}}]) W_o
$$

---

## **7. 情绪分类 (Emotion Classification)**
整合所有信息进行情绪分类：
$$
e_i = \text{softmax}(h_{\text{utt}_i} W_u + h_{\text{context}_i} W_g + h_{\text{speaker}_i})
$$
- 使用 **交叉熵损失 (Cross-Entropy Loss)** 训练模型：
$$
L = - \sum_i y_i \log e_i
$$
其中，$y_i$ 是真实情绪标签，$e_i$ 是预测结果。

---

## **8. LLM 微调 (Instruction Fine-Tuning)**
BiosERC 还提供了一种 **基于 LLM 的微调方法**，用 LLM 直接预测情绪标签：

1. **训练时，使用已知情绪标签 $e_i$作为输入**：
   $$
   x = \text{prompting}(u_i, s_j, d_j, C, e_i)
   $$
2. **推理时，让 LLM 生成情绪标签 $e_i$**：
   $$
   I_P(x) = \prod_{z=1}^{|x|} P(x_z | x_0, x_1, ..., x_{z-1})
   $$
   - **训练时：** 计算损失，优化 LLM。
   - **推理时：** 省略 $e_i$，让 LLM 生成最可能的情绪标签。

---

## **总结**
BiosERC 通过以下流程提高对话情绪识别的性能：
1. **输入对话**，提取每个话语及其说话者信息。
2. **利用 LLM 生成说话者的个性描述**。
3. **使用预训练模型编码话语和说话者信息**。
4. **融合说话者特征到话语表示**（MLP 或注意力）。
5. **建模全局、同一说话者、不同说话者之间的关系**。
6. **最终进行情绪分类**。
7. **可以通过 LLM 微调 (instruction fine-tuning) 进一步提升效果**。

**效果：**
- 在 **IEMOCAP、MELD 和 EmoryNLP** 数据集上达到了最先进 (SOTA) 的性能。
- **特别适用于多人对话 (multiparty conversation)**，因为说话者特征对情绪影响更大。