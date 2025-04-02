---
title: Leetcode 15.三数之和
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-4-1 21:00:00
copyright: false
description: Leetcode 15.三数之和
cover: ../image/Java/算法Leetcode/Day18_Leetcode15.三数之和/1.JPG
---



# Leetcode 15.三数之和
## 题目要求
* 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。

* 注意：答案中不可以包含重复的三元组。

**示例 1：**
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。

**示例 2：**
输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 。

**示例 3：**
输入：nums = [0,0,0]
输出：[[0,0,0]]
解释：唯一可能的三元组和为 0 。

## 提交
### 排序+双指针
首先对数组进行排序
之后指针i从头开始遍历作为a，指针left和right作为b和c
如果sum=a+b+c大于0，说明需要sum变小，所以right往左移，如果小于0则说明sum需要变大，left往右移
需要注意的是去重操作

![](/image/Java/算法Leetcode/Day18_Leetcode15.三数之和/15.三数之和.gif)

#### a的去重
说到去重，其实主要考虑三个数的去重。 a, b ,c, 对应的就是 nums[i]，nums[left]，nums[right]

a 如果重复了怎么办，a是nums里遍历的元素，那么应该直接跳过去。

但这里有一个问题，是判断 nums[i] 与 nums[i + 1]是否相同，还是判断 nums[i] 与 nums[i-1] 是否相同。

有同学可能想，这不都一样吗。

其实不一样！

都是和 nums[i]进行比较，是比较它的前一个，还是比较它的后一个。

如果我们的写法是 这样：
```java
if (nums[i] == nums[i + 1]) { // 去重操作
    continue;
}
```
那我们就把 三元组中出现重复元素的情况直接pass掉了。 例如{-1, -1 ,2} 这组数据，当遍历到第一个-1 的时候，判断 下一个也是-1，那这组数据就pass了。

我们要做的是 不能有重复的三元组，但三元组内的元素是可以重复的！

所以这里是有两个重复的维度。

那么应该这么写：
```java
if (i > 0 && nums[i] == nums[i - 1]) {
    continue;
}
```
这么写就是当前使用 nums[i]，我们判断前一位是不是一样的元素，在看 {-1, -1 ,2} 这组数据，当遍历到 第一个 -1 的时候，只要前一位没有-1，那么 {-1, -1 ,2} 这组数据一样可以收录到 结果集里。

这是一个非常细节的思考过程。

#### b与c的去重
很多同学写本题的时候，去重的逻辑多加了 对right 和left 的去重：（代码中注释部分）
```java
while (right > left) {
    if (nums[i] + nums[left] + nums[right] > 0) {
        right--;
        // 去重 right
        while (left < right && nums[right] == nums[right + 1]) right--;
    } else if (nums[i] + nums[left] + nums[right] < 0) {
        left++;
        // 去重 left
        while (left < right && nums[left] == nums[left - 1]) left++;
    } else {
    }
}
```
但细想一下，这种去重其实对提升程序运行效率是没有帮助的。

拿right去重为例，即使不加这个去重逻辑，依然根据 while (right > left) 和 if (nums[i] + nums[left] + nums[right] > 0) 去完成right-- 的操作。

多加了 while (left < right && nums[right] == nums[right + 1]) right--; 这一行代码，其实就是把 需要执行的逻辑提前执行了，但并没有减少 判断的逻辑。

最直白的思考过程，就是right还是一个数一个数的减下去的，所以在哪里减的都是一样的。

所以这种去重 是可以不加的。 仅仅是 把去重的逻辑提前了而已。

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) return res;
            // 去重a
            // 前面已经得到了所有包含nums[i - 1]的目标集合，所以这里nums[i]应该与nums[i - 1]比来去重
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1;
            int right = nums.length - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum > 0) {
                    right--;
                }else if (sum < 0) {
                    left++;
                }else {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    // 对b和c做去重
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                }
            }
        }
        return res;
    }
}
```
