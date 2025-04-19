---
title: Leetcode 77.组合
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-19 20:00:00
copyright: false
description: Leetcode 77.组合
cover: ../image/Java/算法Leetcode/Day32_Leetcode77.组合/1.JPG
---



# Leetcode 77.组合
## 题目要求
* 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。

* 你可以按 任何顺序 返回答案。


**示例 1：**
输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]

**示例 2：**
输入：n = 1, k = 1
输出：[[1]]


## 回溯法

回溯法模板
```java
void backtracking(参数) {
    if (终止条件) {
        存放结果;
        return;
    }

    for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
        处理节点;
        backtracking(路径，选择列表); // 递归
        回溯，撤销处理结果
    }
}
```

```java
class Solution {
    private List<List<Integer>> res = new ArrayList<List<Integer>>();
    private List<Integer> list = new ArrayList<>();

    public List<List<Integer>> combine(int n, int k) {
        backtracking(n, k, 1);
        return res;
    }

    public void backtracking(int n, int k, int first) {
        if (list.size() == k) {
            res.add(new ArrayList<>(list));
            return;
        }

        for (int i = first; i <= n; i++) {
            list.add(i);
            backtracking(n, k, i + 1); // 递归
            list.removeLast();
        }
    }
}
```

## 剪枝

假如n=4,k=4
![](/image/Java/算法Leetcode/Day32_Leetcode77.组合/剪枝.png)

优化过程如下：
1. 已经选择的元素个数：path.size();
2. 所需需要的元素个数为: k - path.size();
3. 列表中剩余元素（n-i） >= 所需需要的元素个数（k - path.size()）
4. 在集合n中至多要从该起始位置 : i <= n - (k - path.size()) + 1，开始遍历

为什么有个+1呢，因为包括起始位置，我们要是一个左闭的集合。
举个例子，n = 4，k = 3， 目前已经选取的元素为0（path.size为0），n - (k - 0) + 1 即 4 - ( 3 - 0) + 1 = 2。
从2开始搜索都是合理的，可以是组合[2, 3, 4]。
所以优化之后的for循环是：
```java
for (int i = startIndex; i <= n - (k - path.size()) + 1; i++) // i为本次搜索的起始位置
```


```java
class Solution {
    List<List<Integer>> result = new ArrayList<>();
    LinkedList<Integer> path = new LinkedList<>();
    public List<List<Integer>> combine(int n, int k) {
        combineHelper(n, k, 1);
        return result;
    }

    /**
     * 每次从集合中选取元素，可选择的范围随着选择的进行而收缩，调整可选择的范围，就是要靠startIndex
     * @param startIndex 用来记录本层递归的中，集合从哪里开始遍历（集合就是[1,...,n] ）。
     */
    private void combineHelper(int n, int k, int startIndex){
        //终止条件
        if (path.size() == k){
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = startIndex; i <= n - (k - path.size()) + 1; i++){
            path.add(i);
            combineHelper(n, k, i + 1);
            path.removeLast();
        }
    }
}
```