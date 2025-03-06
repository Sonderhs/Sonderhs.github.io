---
title: 参数高效微调PEFT
tags: 
- transformer
- LLM
categories: LLM
top_img: transparent
date: 2025-3-5 00:00:00
copyright: false
description: 本文介绍了参数高效微调PEFT的几种方法：BitFit,Prompt-Tuning,P-Tuning,Prefix-Tuning,Lora,IA3.PEFT进阶操作
cover: ../image/LLM/参数高效微调PEFT/cover.jpg
---

随着预训练语言模型的不断发展，模型的参数越来越多，更大的模型带来了更好的性能，但是也带来了一些问题，比如以传统微调的方式对模型进行全量参数更新会消耗巨大的计算与存储资源。
参数高效微调(Parameter-efficient fine-tuning, PEFT)的方法仅对模型的一小部分参数进行训练，这一小部分参数可能是模型自身的，也可能是外部引入的，通过这种训练方式，不仅能够极大地减少需要训练的参数量，一些场景下效果甚至不输于全量微调。
常见的参数高效微调方法见下图：(图片来源：[Scaling Down to Scale Up:
A Guide to Parameter-Efficient Fine-Tuning](https://arxiv.org/pdf/2303.15647))
![常见的参数高效微调方法](/image/LLM/参数高效微调PEFT/参数微调方法.png)

# 第一章 BitFit
