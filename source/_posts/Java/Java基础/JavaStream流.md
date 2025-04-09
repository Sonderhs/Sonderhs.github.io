---
title: Java Stream流
tags: Java
categories: Java
top_img: transparent
date: 2025-4-9 20:00:00
copyright: false
description: Java集合进阶
cover: ../image/Java/JavaStream流/1.JPG
---

**2025.04.09**
# Stream流

## 第一章 Stream流思想及获取Stream流
### 1.1 Stream流思想
* Stream流的思想是像流水线一样对数据进行一步一步的处理
* Stream流的作用：结合了Lambda表达式，简化集合、数组的操作
* Stream流使用步骤：
  * 先得到一条Stream流（流水线），并把数据放上去
  * 利用Stream流中的API进行各种操作
    * 使用中间方法对流水线上的数据进行操作
    * 使用终结方法对流水线线上的数据进行操作
* Stream流中的方法：
  * 中间方法：方法调用完毕之后，还可以调用其他方法
  * 终结方法：最后一步，调用完毕之后，不能调用其他方法

### 1.2 Stream流使用方法
* Stream流使用步骤：
  * 先得到一条Stream流（流水线），并把数据放上去
  * 使用中间方法对流水线上的数据进行操作
  * 使用终结方法对流水线线上的数据进行操作

#### 1.2.1 获取Stream流
| 获取方式     | 方法名                                       | 说明                     |
| ------------ | -------------------------------------------- | ------------------------ |
| 单列集合     | default Stream\<E> stream()                   | Collection中的默认方法   |
| 双列集合     | 无                                           | 无法直接使用Stream流     |
| 数组         | public static\<T> Stream\<T> stream(T[] array) | Arrays工具类中的静态方法 |
| 一堆零散数据 | public static\<T> Stream\<T> of(T...values)    | Stream接口中的静态方法   |

**注意：**
* Stream接口中静态方法of的细节：
  * 方法的形参是一个可变参数，可以传递一堆零散的数据，也可以传递数组
  * 但是数组必须是引用数据类型的，如果传递基本数据类型，是会把整个数组当做一个元素放到Stream流中
示例：
```java
import java.util.*;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {

        // 1.单列集合获取Stream流
        ArrayList<String> list = new ArrayList<String>();
        Collections.addAll(list, "A", "B", "C", "D");
        // 获取到一条流水线，并将集合中的数据放到流水线上
        Stream<String> stream1 =  list.stream();
        // 使用终结方法打印
        stream1.forEach(s -> System.out.println(s));

        // 2.双列集合使用Stream流
        HashMap<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);
        map.put("D", 4);

        // 先转换为单列集合再使用Stream流
        // 第一种方法
        map.keySet().stream().forEach(s -> System.out.println(s));

        // 第二种方法
        map.entrySet().stream().forEach(e -> System.out.println(e));

        // 3.数组
        int[] arr = {1, 2, 3, 4, 5};
        Arrays.stream(arr).forEach(e -> System.out.println(e));

        // 4.零散数据（同种类型）
        Stream.of(1, 2, 3, 4, 5).forEach(e -> System.out.println(e));
    }
}

/*
输出：
A
B
C
D
A
B
C
D
A=1
B=2
C=3
D=4
1
2
3
4
5
1
2
3
4
5
*/
```

## 第二章 Stream流中间方法
| 名称                                             | 说明                                 |
| ------------------------------------------------ | ------------------------------------ |
| Stream\<T> filter(Predicate<? super T> predicate) | 过滤                                 |
| Stream\<T> limit(long maxSize)                    | 获取前几个元素                       |
| Stream\<T> skip(long n)                           | 跳过前几个元素                       |
| Stream\<T> distinct()                             | 元素去重，依赖(hashCode和equals方法) |
| static\<T> Stream\<T> concat(Stream a,Stream b)    | 合并a和b两个流为一个流               |
| Stream\<R> map(Function<T,R> mapper)              | 转换流中的数据类型                   |

**注意：**
1. 中间方法，返回新的Stream流，原来的Stream流只能使用一次，建议使用链式编程
2. 修改Stream流中的数据，不会影响原来集合或数组中的数据

### 2.1 filter(Predicate<? super T> predicate):过滤
* Stream\<T> filter(Predicate<? super T> predicate): 过滤

示例：
```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.function.Predicate;

public class FilterDemo {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<String>();
        Collections.addAll(list, "张无忌", "周芷若", "张三丰", "赵敏", "张亮");

//        // 过滤：把以“张”开头的留下，其余过滤
//        list.stream().filter(new Predicate<String>() {
//            @Override
//            public boolean test(String s) {
//                // 如果返回值为true表示当前数据留下
//                // 返回值为false表示当前数据不要
//                return s.startsWith("张");
//            }
//        }).forEach(s -> System.out.println(s));
        
        list.stream().filter(s -> s.startsWith("张")).forEach(s -> System.out.println(s));
    }
}


// 输出：张无忌
//       张三丰
//       张亮
```