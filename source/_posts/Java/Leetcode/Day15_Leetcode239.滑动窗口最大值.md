---
title: Leetcode 239.滑动窗口最大值
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-29 21:00:00
copyright: false
description: Leetcode 239.滑动窗口最大值
cover: ../image/Java/算法Leetcode/Day15_Leetcode239.滑动窗口最大值/1.JPG
---



# Leetcode 239.滑动窗口最大值
## 题目要求
* 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
* 返回 滑动窗口中的最大值 。

**示例 1：**
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
![](/image/Java/算法Leetcode/Day15_Leetcode239.滑动窗口最大值/解释.png)

**示例 2：**
输入：nums = [1], k = 1
输出：[1]


## 提交
### 单调队列
对于一个窗口内的数据，事实上我们只需要维护其最大值即可，但是使用一般的队列会改变顺序，所以我们设计一个单调队列来存储数据
我们要做到的是队首的元素就是该窗口内最大的元素
要做到这一点我们需要满足：
1. 队列的长度不超过k，这样才能保持队列中的所有元素在同一个窗口内
2. 队首元素是当前队列中的最大值，要做到这一点，我们可以：
   1. 当要入队的元素大于当前队首的元素时，我们就需要将前面的元素全部出队，只剩下当前要入队的元素
   2. 当要入队的元素小于当前队首的元素时，由于不影响我们对最大值的判断，所以可以正常入队

![](/image/Java/算法Leetcode/Day15_Leetcode239.滑动窗口最大值/239.滑动窗口最大值-2.gif)
思路：对于前k个元素（第一个窗口内），我们只需要将最大值放入最后的数组中即可，剩余元素，每添加一次元素，就要将最大值存入result数组中一次



```java
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        Deque<Integer> deque = new LinkedList<Integer>();
        // 入队第一个窗口内的元素
        for (int i = 0; i < k; ++i) {
            // 当队列不为空时进行比较
            // 若当前元素是最大值，则出队所有元素
            // 由于队首的一定是最大值，所以当要入队的元素大于最大值时，
            // 其余元素就都满足nums[i] >= nums[deque.peekLast()]了
            while (!deque.isEmpty() && nums[i] >= nums[deque.peekLast()]) {
                deque.pollLast();
            }
            deque.offerLast(i);
        }

        int[] result = new int[n - k + 1];
        // 将第一个窗口内的最大值放到result中
        result[0] = nums[deque.peekFirst()];

        // 剩下的元素每入队一次都要将最大值放入result中
        for (int i = k; i < n; ++i) {
            while (!deque.isEmpty() && nums[i] >= nums[deque.peekLast()]) {
                deque.pollLast();
            }
            deque.offerLast(i);
            // 用于保证队列中元素都是在窗口内
            while (deque.peekFirst() <= i - k) {
                deque.pollFirst();
            }
            result[i - k + 1] = nums[deque.peekFirst()];
        }
        return result;
    }
}
```

## 关于while (deque.peekFirst() <= i - k)的说明
### 示例输入
假设：
- 数组 `nums = [1, 3, -1, -3, 5, 3, 6, 7]`
- 滑动窗口大小 `k = 3`

我们需要找到每个窗口的最大值。

---

### 过程分析
#### 初始化第一个窗口
1. **索引 0** (`nums[0] = 1`)：队列为空，直接加入队列，`deque = [0]`。
2. **索引 1** (`nums[1] = 3`)：`nums[1] > nums[deque.peekLast()]`，移除队尾索引 0，加入索引 1，`deque = [1]`。
3. **索引 2** (`nums[2] = -1`)：`nums[2] < nums[deque.peekLast()]`，直接加入索引 2，`deque = [1, 2]`。

此时，第一个窗口 `[1, 3, -1]` 的最大值为 `nums[deque.peekFirst()] = nums[1] = 3`。

---

#### 滑动窗口向右移动
从索引 3 开始，每次滑动窗口向右移动一位，同时更新队列。

1. **索引 3** (`nums[3] = -3`)：
   - 新元素加入队列：`nums[3] < nums[deque.peekLast()]`，直接加入索引 3，`deque = [1, 2, 3]`。
   - 检查队首索引是否超出窗口范围：`deque.peekFirst() = 1`，满足 `1 <= 3 - 3`，移除队首索引 1，`deque = [2, 3]`。
   - 当前窗口 `[3, -1, -3]` 的最大值为 `nums[deque.peekFirst()] = nums[2] = -1`。

2. **索引 4** (`nums[4] = 5`)：
   - 新元素加入队列：`nums[4] > nums[deque.peekLast()]`，移除索引 3 和 2，加入索引 4，`deque = [4]`。
   - 检查队首索引是否超出窗口范围：`deque.peekFirst() = 4`，未超出范围。
   - 当前窗口 `[-1, -3, 5]` 的最大值为 `nums[deque.peekFirst()] = nums[4] = 5`。

3. **索引 5** (`nums[5] = 3`)：
   - 新元素加入队列：`nums[5] < nums[deque.peekLast()]`，直接加入索引 5，`deque = [4, 5]`。
   - 检查队首索引是否超出窗口范围：`deque.peekFirst() = 4`，未超出范围。
   - 当前窗口 `[-3, 5, 3]` 的最大值为 `nums[deque.peekFirst()] = nums[4] = 5`。

4. **索引 6** (`nums[6] = 6`)：
   - 新元素加入队列：`nums[6] > nums[deque.peekLast()]`，移除索引 5 和 4，加入索引 6，`deque = [6]`。
   - 检查队首索引是否超出窗口范围：`deque.peekFirst() = 6`，未超出范围。
   - 当前窗口 `[5, 3, 6]` 的最大值为 `nums[deque.peekFirst()] = nums[6] = 6`。

5. **索引 7** (`nums[7] = 7`)：
   - 新元素加入队列：`nums[7] > nums[deque.peekLast()]`，移除索引 6，加入索引 7，`deque = [7]`。
   - 检查队首索引是否超出窗口范围：`deque.peekFirst() = 7`，未超出范围。
   - 当前窗口 `[3, 6, 7]` 的最大值为 `nums[deque.peekFirst()] = nums[7] = 7`。

---

### 总结
在每一步中，`while (deque.peekFirst() <= i - k)`的作用是移除队首索引，如果它已经超出了当前窗口的左边界（`i - k`）。这样可以确保队列中的索引始终属于当前窗口范围，从而正确维护滑动窗口的最大值。

最终结果为：`[3, 3, 5, 5, 6, 7]`。