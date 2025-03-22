---
title: Leetcode 142.环形链表II
tags: Leetcode
categories: Leetcode
top_img: transparent
date: 2025-3-22 20:00:00
copyright: false
description: Leetcode 142.环形链表II
cover: ../image/Java/算法Leetcode/Day10_Leetcode142.环形链表II/1.JPG
---



# Leetcode 142.环形链表II
## 题目要求
* 给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
* 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。
* 不允许修改 链表。


**示例 1：**
![](/image/Java/算法Leetcode/Day10_Leetcode142.环形链表II/circularlinkedlist.png)
输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。
**示例2：**
![](/image/Java/算法Leetcode/Day10_Leetcode142.环形链表II/circularlinkedlist_test2.png)
输入：head = [1,2], pos = 0
输出：返回索引为 0 的链表节点
解释：链表中有一个环，其尾部连接到第一个节点。
**示例3：**
![](/image/Java/算法Leetcode/Day10_Leetcode142.环形链表II/circularlinkedlist_test3.png)
输入：head = [1], pos = -1
输出：返回 null
解释：链表中没有环。


## 提交
### 双temp实现交换
设置快慢两个指针$fast$和$slow$，$fast$走2步，$slow$每次走一步，如果$fast$和$slow$没有相遇，则说明该链表中无环，如果能够相遇，则说明有环
![](/image/Java/算法Leetcode/Day10_Leetcode142.环形链表II/环形链表.gif)
相遇时如下图所示：
![](/image/Java/算法Leetcode/Day10_Leetcode142.环形链表II/示意图.JPG)
假设如示意图所示：当$fast$和$slow$相遇时，从链表头到环入口处距离为$x$，环入口处到相遇处距离为$y$，相遇处到环入口处距离为$z$，$fast$指针在环中走了$n$圈后与$slow$相遇
则可得$slow$和$fast$所走距离为：
$slow = x + y$
$fast = x + y + n * (y + z)$ 
由于fast速度是slow两倍，则可得：
$2(x + y) = x + y + n * (y + z)$ 
即：$x = n * (y + z) - y$
由于我们想知道x和z的关系，所以我们可以将原式化为:
$x = (n - 1) * (y + z) + z$
这样可以发现当$n=1$(n为其他值同理，只是相当于$fast$比$slow$多走了$n$个完整的环)时：
$x = z$
这说明当fast和slow相遇时，$x = z$
这样我们就可以设置两个指针，一个从链表头出发，一个从相遇处出发，当它们相遇时即为环的入口

为什么$n=1$呢？
我们可以把环展开来看：
![](/image/Java/算法Leetcode/Day10_Leetcode142.环形链表II/展开.png)
因为$fast$速度是$slow$的两倍，所以当$slow$走一圈时，$fast$一定走了两圈，它们一定会在其中相遇，也就是一定在$slow$在环内的第一圈中相遇，所以$n=1$


```java
public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode fast = head;
        ListNode slow = head;
        while(fast != null && fast.next != null){
            fast = fast.next.next;
            slow = slow.next ;
            if(fast == slow){
                ListNode temp1 = head;
                ListNode temp2 = slow;
                while(temp1 != temp2){
                    temp1 = temp1.next;
                    temp2 = temp2.next;
                }
                return temp1;
            }
        }
        return null;
    }
}
```

