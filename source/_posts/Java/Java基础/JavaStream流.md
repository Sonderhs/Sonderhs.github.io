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
| 获取方式     | 方法名                                         | 说明                     |
| ------------ | ---------------------------------------------- | ------------------------ |
| 单列集合     | default Stream\<E> stream()                    | Collection中的默认方法   |
| 双列集合     | 无                                             | 无法直接使用Stream流     |
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
| 名称                                              | 说明                                 |
| ------------------------------------------------- | ------------------------------------ |
| Stream\<T> filter(Predicate<? super T> predicate) | 过滤                                 |
| Stream\<T> limit(long maxSize)                    | 获取前几个元素                       |
| Stream\<T> skip(long n)                           | 跳过前几个元素                       |
| Stream\<T> distinct()                             | 元素去重，依赖(hashCode和equals方法) |
| static\<T> Stream\<T> concat(Stream a,Stream b)   | 合并a和b两个流为一个流               |
| Stream\<R> map(Function<T,R> mapper)              | 转换流中的数据类型                   |

**注意：**
1. 中间方法，返回新的Stream流，原来的Stream流只能使用一次，建议使用链式编程
2. 修改Stream流中的数据，不会影响原来集合或数组中的数据

### 2.1 filter():过滤
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

### 2.2 limit():获取前几个元素
* Stream\<T> limit(long maxSize): 获取前几个元素

示例：
```java
import java.util.ArrayList;
import java.util.Collections;


public class FilterDemo {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<String>();
        Collections.addAll(list, "张无忌", "周芷若", "张三丰", "赵敏", "张亮");

        list.stream().limit(3).forEach(s -> System.out.println(s));
    }
}


// 输出：张无忌
//       周芷若
//       张三丰
```

### 2.3 skip():跳过前几个元素
* Stream\<T> skip(long n): 跳过前几个元素

示例：
```java
import java.util.ArrayList;
import java.util.Collections;


public class FilterDemo {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<String>();
        Collections.addAll(list, "张无忌", "周芷若", "张三丰", "赵敏", "张亮");

        list.stream().skip(3).forEach(s -> System.out.println(s));
    }
}


// 输出：赵敏
//       张亮
```

### 2.4  distinct():元素去重
* Stream\<T> distinct(): 元素去重，依赖(hashCode和equals方法)

示例：
```java
import java.util.ArrayList;
import java.util.Collections;

public class StreamDemo1 {
    public static void main(String[] args) {
        ArrayList<String> list1 = new ArrayList<String>();
        Collections.addAll(list1, "A", "A", "A", "B", "C", "C", "D");

        list1.stream().distinct().forEach(s -> System.out.println(s));
    }
}

// 输出：A
//       B
//       C
//       D
```

### 2.5 concat():合并两个流
* static\<T> Stream\<T> concat(Stream a,Stream b): 合并a和b两个流为一个流

示例：
```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.stream.Stream;

public class StreamDemo1 {
    public static void main(String[] args) {
        ArrayList<String> list1 = new ArrayList<String>();
        Collections.addAll(list1, "A", "A", "A", "B", "C", "C", "D");

        ArrayList<String> list2 = new ArrayList<>();
        Collections.addAll(list2, "E", "F", "G");

        Stream.concat(list1.stream(), list2.stream()).forEach(s -> System.out.println(s));
    }
}


// 输出：A
//       A
//       A
//       B
//       C
//       C
//       D
//       E
//       F
//       G
```

### 2.6 map:转换流中的数据类型
* Stream\<R> map(Function<T,R> mapper): 转换流中的数据类型

示例：
```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.function.Function;

public class MapDemo {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        Collections.addAll(list, "张无忌-15", "周芷若-14", "赵敏-13", "张强-20", "张三丰-100");

        // 需求：只获取里面的年龄并打印
        // 第一个类型：流中原本的数据类型
        // 第二个类型：要转成之后的类型

        // apply形参s：依次表示流里面的每一个数据
        // list.stream().map(new Function<String, Integer>() {
        //     @Override
        //     public Integer apply(String s) {
        //         String[] arr = s.split("-");
        //         String ageString = arr[1];
        //         int age = Integer.parseInt(ageString);
        //         return age;
        //     }
        // }).forEach(s->System.out.println(s));

        list.stream().map(s -> Integer.parseInt(s.split("-")[1])).forEach(s->System.out.println(s));

    }
}


// 输出：15
//       14
//       13
//       20
//       100
```

--------------
**2025.04.11**
## 第三章 Stream流终结方法
| 名称                          | 说明                       |
| ----------------------------- | -------------------------- |
| void forEach(Consumer action) | 遍历                       |
| long count()                  | 统计                       |
| toArray()                     | 收集流中的数据，放到数组中 |
| collect(Collector collector)  | 收集流中的数据，放到集合中 |

### 3.1 forEach():遍历
* void forEach(Consumer action): 遍历

示例：
```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.function.Consumer;

public class ZhongjieDemo1 {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        Collections.addAll(list, "张无忌", "周芷若", "张三丰", "赵敏", "张亮");

        // forEach:遍历
        // Consumer的泛型:表示流中的数据类型
        // accept方法的形参s:依次表示流里面的每一个数据
//        list.stream().forEach(new Consumer<String>() {
//            @Override
//            public void accept(String s) {
//                System.out.println(s);
//            }
//        });

        list.stream().forEach(s ->System.out.println(s));
    }
}


// 输出：张无忌
//       周芷若
//       张三丰
//       赵敏
//       张亮
```

### 3.2 count():统计 
* long count(): 统计

示例：
```java
import java.util.ArrayList;
import java.util.Collections;

public class ZhongjieDemo1 {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        Collections.addAll(list, "张无忌", "周芷若", "张三丰", "赵敏", "张亮");

        long count = list.stream().count();
        System.out.println(count);
    }
}

// 输出：5
```

### 3.3 toArray():收集流中的数据，放到数组中
* toArray(): 收集流中的数据，放到数组中

示例：
```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.function.IntFunction;

public class ZhongjieDemo1 {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        Collections.addAll(list, "张无忌", "周芷若", "张三丰", "赵敏", "张亮");

        // IntFunction的泛型:具体类型的数组
        // apply的形参:流中数据的个数，要跟数组的长度保持一致
        // apply的返回值:具体类型的数组
        // 方法体:就是创建数组

        // toArray方法的参数的作用:负责创建一个指定类型的数组
        // toArray方法的底层:会依次得到流里面的每一个数据，并把数据放到数组中
        // toArray方法的返回值:是一个装着流里面数据的数组
//        String[] array = list.stream().toArray(new IntFunction<String[]>() {
//            @Override
//            public String[] apply(int value) {
//                return new String[value];
//            }
//        });

        String[] array = list.stream().toArray(value -> new String[value]);
        
        System.out.println(Arrays.toString(array));
    }
}

// 输出：[张无忌, 周芷若, 张三丰, 赵敏, 张亮]
```

### 3.4 collect():收集流中的数据，放到集合中
* collect(): 收集流中的数据，放到集合中

示例：
```java
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public class collectDemo {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        Collections.addAll(list, "张无忌-男-15", "周芷若-女-14", "赵敏-女-13", "张强-男-20", "张三丰-男-100");

        // 收集List集合当中
        // 收集所有男性
        List<String> newList =  list.stream()
                .filter(s -> "男".equals(s.split("-")[1]))
                .collect(Collectors.toList());

        System.out.println(newList);

        // 收集Set集合中
        // Set可以去重
        Set<String> newSet = list.stream()
                .filter(s -> "男".equals(s.split("-")[1]))
                .collect(Collectors.toSet());

        System.out.println(newSet);

        // 收集Map集合
        // 收集男性，键：姓名，值：年龄

        /*
            toMap: 参数一表示键的生成规则
                   参数二表示值的生成规则

            参数一:
                   Function泛型一表示流中每一个数据的类型
                           泛型二表示Map集合中键的数据类型

                   方法apply形参: 依次表示流里面每一个数据的类型
                           方法体: 生成键的代码
                           返回值: 已经生成的键

            参数二:
                   Function泛型一表示流中每一个数据的类型
                           泛型二表示Map集合中值的数据类型

                   方法apply形参: 依次表示流里面每一个数据的类型
                           方法体: 生成值的代码
                           返回值: 已经生成的值
         */
        Map<String, Integer> newMap = list.stream()
                .filter(s -> "男".equals(s.split("-")[1]))
                .collect(Collectors.toMap(
                        new Function<String, String>() {
                            @Override
                            public String apply(String s) {
                                return s.split("-")[0];
                            }
                        }, new Function<String, Integer>() {
                            @Override
                            public Integer apply(String s) {
                                return Integer.parseInt(s.split("-")[2]);
                            }
                        }));


//        Map<String, String> newMap = list.stream()
//                .filter(s -> "男".equals(s.split("-")[1]))
//                .collect(Collectors.toMap(s -> s.split("-")[0], s -> Integer.parseInt(s.split("-")[2]));

        System.out.println(newMap);
    }
}

// 输出：[张无忌-男-15, 张强-男-20, 张三丰-男-100]
//       [张强-男-20, 张三丰-男-100, 张无忌-男-15]
//       {张强=20, 张三丰=100, 张无忌=15}
```

## 第四章 练习
### 4.1 数据过滤
定义一个集合，并添加一些整数1,2,3,4,5,6,7,8,9,10
过滤奇数，只留下偶数
并将结果保存起来

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class StreamDemo2 {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        Collections.addAll(list,1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        List<Integer> collect = list.stream()
                .filter(s -> s % 2 == 0)
                .collect(Collectors.toList());

        System.out.println(collect);
    }
}


// 输出：[2, 4, 6, 8, 10]
```

### 4.2 数据操作
创建一个ArrayList集合，并添加以下字符串，字符串中前面是姓名，后面是年龄
"zhangsan,23"
"lisi,24"
"wangwu,25"
保留年龄大于等于24岁的人，并将结果收集到Map集合中，姓名为键，年龄为值

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

public class StreamDemo3 {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        Collections.addAll(list,"zhangsan,23","lisi,24","wangwu,25");

        Map<String,Integer> map = list.stream()
                .filter(s -> Integer.parseInt(s.split(",")[1]) >=24)
                .collect(Collectors.toMap(
                        s -> s.split(",")[0],
                        s -> Integer.parseInt(s.split(",")[1])
                ));
        
        System.out.println(map);
    }
}


// 输出：{lisi=24, wangwu=25}
```

### 4.3 数据操作
现在有两个ArrayList集合
第一个集合中：存储6名男演员的名字和年龄
第二个集合中：存储6名女演员的名字和年龄
姓名和年龄中间用逗号隔开，比如：张三,23
要求完成如下操作：
1. 男演员只要名字为3个字的前两人
2. 女演员只要姓林的，并且不要第一个人
3. 把过滤后的男演员和女演员姓名合并在一起
4. 将上一步的演员信息封装成Actor对象
5. 将所有的演员对象都保存早List集合中
   
备注：演员类Actor，属性只有：name,age


```java
// Actor类
public class Actor {
    private String name;
    private int age;


    public Actor() {
    }

    public Actor(String name, int age) {
        this.name = name;
        this.age = age;
    }

    /**
     * 获取
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * 设置
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取
     * @return age
     */
    public int getAge() {
        return age;
    }

    /**
     * 设置
     * @param age
     */
    public void setAge(int age) {
        this.age = age;
    }

    public String toString() {
        return "Actor{name = " + name + ", age = " + age + "}";
    }
}
```


```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StreamDemo4 {
    public static void main(String[] args) {
        /*
            现在有两个ArrayList集合
            第一个集合中：存储6名男演员的名字和年龄
            第二个集合中：存储6名女演员的名字和年龄
            姓名和年龄中间用逗号隔开，比如：张三,23
            要求完成如下操作：
            1. 男演员只要名字为3个字的前两人
            2. 女演员只要姓林的，并且不要第一个人
            3. 把过滤后的男演员和女演员姓名合并在一起
            4. 将上一步的演员信息封装成Actor对象
            5. 将所有的演员对象都保存早List集合中

            备注：演员类Actor，属性只有：name,age
         */

        //创建集合
        ArrayList<String> manList = new ArrayList<>();
        Collections.addAll(manList, "周润发,23", "成龙,24", "刘德华,25", "吴京,26", "周星驰,27", "李连杰,28");

        ArrayList<String> womanList = new ArrayList<>();
        Collections.addAll(womanList, "林心如,18", "张曼玉,18", "林青霞,18", "柳岩,18", "林志玲,18", "王祖贤,18");


        List<Actor> actorList = Stream.concat(
                        manList.stream()
                                .filter(s -> s.split(",")[0].length() == 3)
                                .limit(2),
                        womanList.stream()
                                .filter(s -> s.split(",")[0].startsWith("林"))
                                .skip(1))
                .map(new Function<String, Actor>() {
                    @Override
                    public Actor apply(String s) {
                        String[] split = s.split(",");
                        return new Actor(split[0], Integer.parseInt(split[1]));
                    }
                })
                .collect(Collectors.toList());

        System.out.println(actorList);
    }
}

// 输出：[Actor{name = 周润发, age = 23}, Actor{name = 刘德华, age = 25}, Actor{name = 林青霞, age = 18}, Actor{name = 林志玲, age = 18}]
```