---
title: Leetcode 347.前K个高频元素
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-30 21:00:00
copyright: false
description: Leetcode 347.前K个高频元素
cover: ../image/Java/算法Leetcode/Day16_Leetcode347.前K个高频元素/1.JPG
---



# Leetcode 347.前K个高频元素
## 题目要求
* 给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。

**示例 1：**
输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]

**示例 2：**
输入: nums = [1], k = 1
输出: [1]

## 提交
### 优先级队列



```java
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // 统计频率
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }

        // 使用最小堆按频率排序（堆顶是频率最小的元素）
        PriorityQueue<Integer> heap = new PriorityQueue<>(
                (a, b) -> frequencyMap.get(a) - frequencyMap.get(b)
        );

        // 维护堆的大小为 k
        for (int num : frequencyMap.keySet()) {
            heap.offer(num);
            if (heap.size() > k) {
                heap.poll(); // 移除频率最小的元素
            }
        }

        // 提取结果
        int[] res = new int[k];
        for (int i = k - 1; i >= 0; i--) {
            res[i] = heap.poll(); // 倒序填充，保证降序
        }
        return res;
    }
}
```

### 大顶堆

```java
/*Comparator接口说明:
 * 返回负数，形参中第一个参数排在前面；返回正数，形参中第二个参数排在前面
 * 对于队列：排在前面意味着往队头靠
 * 对于堆（使用PriorityQueue实现）：从队头到队尾按从小到大排就是最小堆（小顶堆），
 *                                从队头到队尾按从大到小排就是最大堆（大顶堆）--->队头元素相当于堆的根节点
 * */
class Solution {
    //解法1：基于大顶堆实现
    public int[] topKFrequent1(int[] nums, int k) {
        Map<Integer,Integer> map = new HashMap<>(); //key为数组元素值,val为对应出现次数
        for (int num : nums) {
            map.put(num, map.getOrDefault(num,0) + 1);
        }
        //在优先队列中存储二元组(num, cnt),cnt表示元素值num在数组中的出现次数
        //出现次数按从队头到队尾的顺序是从大到小排,出现次数最多的在队头(相当于大顶堆)
        PriorityQueue<int[]> pq = new PriorityQueue<>((pair1, pair2) -> pair2[1] - pair1[1]);
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {//大顶堆需要对所有元素进行排序
            pq.add(new int[]{entry.getKey(), entry.getValue()});
        }
        int[] ans = new int[k];
        for (int i = 0; i < k; i++) { //依次从队头弹出k个,就是出现频率前k高的元素
            ans[i] = pq.poll()[0];
        }
        return ans;
    }
    //解法2：基于小顶堆实现
    public int[] topKFrequent2(int[] nums, int k) {
        Map<Integer,Integer> map = new HashMap<>(); //key为数组元素值,val为对应出现次数
        for (int num : nums) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }
        //在优先队列中存储二元组(num, cnt),cnt表示元素值num在数组中的出现次数
        //出现次数按从队头到队尾的顺序是从小到大排,出现次数最低的在队头(相当于小顶堆)
        PriorityQueue<int[]> pq = new PriorityQueue<>((pair1, pair2) -> pair1[1] - pair2[1]);
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) { //小顶堆只需要维持k个元素有序
            if (pq.size() < k) { //小顶堆元素个数小于k个时直接加
                pq.add(new int[]{entry.getKey(), entry.getValue()});
            } else {
                if (entry.getValue() > pq.peek()[1]) { //当前元素出现次数大于小顶堆的根结点(这k个元素中出现次数最少的那个)
                    pq.poll(); //弹出队头(小顶堆的根结点),即把堆里出现次数最少的那个删除,留下的就是出现次数多的了
                    pq.add(new int[]{entry.getKey(), entry.getValue()});
                }
            }
        }
        int[] ans = new int[k];
        for (int i = k - 1; i >= 0; i--) { //依次弹出小顶堆,先弹出的是堆的根,出现次数少,后面弹出的出现次数多
            ans[i] = pq.poll()[0];
        }
        return ans;
    }
}
```