---
title: Java进阶
tags: Java
categories: Java
top_img: transparent
date: 2025-3-16 20:00:00
copyright: false
description: Java进阶
cover: ../image/Java/Java进阶/1.JPG
---

**2025.03.16**
# 第一章 集合进阶
## 1.1 集合体系结构
集合有很多种，可以大致分为两大类：Collection和Map
* Collection:单列集合，添加数据时每次添加一个元素
  * List:添加的元素是有序(存和取的顺序一致)、可重复、有索引
    * ArrayList
    * LinkedList
    * Vector
  * Set:添加的元素是无序、不重复、无索引
    * HashSet
      * LinkedHashSet
    * TreeSet
* Map:双列集合，添加数据时每次添加一对数据

## 1.2 Collection
* Collection是单列集合的祖宗接口，它的功能是全部单列集合都可以继承使用的
* Collection是一个接口，我们不能直接创建它的对象，只能创建它实现类的对象
![Collection体系结构](/image/Java/Java进阶/Collection体系结构.png)

## 1.3 Collection常用方法
### 1.3.1 add(E e): 把给定的对象添加到当前集合中
* public boolean add(E e): 把给定的对象添加到当前集合中
* 如果往List系列集合中添加数据，那么返回值永远为true，因为List系列允许元素重复
* 如果往Set系列集合中添加数据，那么如果要添加的元素不存在，则返回值为true，如果要添加的元素已存在，则返回false

示例：
```java
import java.util.ArrayList;
import java.util.Collection;

public class Main {
    public static void main(String[] args) {
        Collection<String> coll = new ArrayList<>();

        coll.add("aa");
        coll.add("bb");
        coll.add("cc");
        System.out.println(coll);
    }
}

//输出：[aa, bb, cc]
```
### 1.3.2 clear(): 清空集合中的所有元素
* public void clear(): 清空集合中的所有元素

示例：
```java
import java.util.ArrayList;
import java.util.Collection;

public class Main {
    public static void main(String[] args) {
        Collection<String> coll = new ArrayList<>();

        coll.add("aa");
        coll.add("bb");
        coll.add("cc");
        System.out.println(coll);

        coll.clear();
        System.out.println(coll);
    }
}

//输出：[]
```
### 1.3.3 remove(E e): 把给定的对象在当前集合中删除
* public boolean remove(E e): 把给定的对象在当前集合中删除
* 因为Collection定义的是共性的方法，所以不能通过索引进行删除，只能通过元素的对象进行删除
* 删除成功返回true，删除失败返回false

示例：
```java
import java.util.ArrayList;
import java.util.Collection;

public class Main {
    public static void main(String[] args) {
        Collection<String> coll = new ArrayList<>();

        coll.add("aa");
        coll.add("bb");
        coll.add("cc");
        System.out.println(coll);

        coll.remove("bb");
        System.out.println(coll);
    }
}

//输出：[aa, cc]
```
### 1.3.4 contains(Object obj): 判断当前集合中是否包含给定的对象
* public boolean contains(Object obj): 判断当前集合中是否包含给定的对象
* 底层是依赖equals方法进行判断是否存在的
* 如果集合中存储的是自定义对象，也想通过contains方法来判断是否包含，那么在javabean类中必须重写equals方法

示例：
```java
import java.util.ArrayList;
import java.util.Collection;

public class Main {
    public static void main(String[] args) {
        Collection<String> coll = new ArrayList<>();

        coll.add("aa");
        coll.add("bb");
        coll.add("cc");
        System.out.println(coll);

        boolean result1 = coll.contains("cc");
        System.out.println(result1);
    }
}

//输出：true
```
### 1.3.5 isEmpty(): 判断当前集合是否为空
* public boolean isEmpty(): 判断当前集合是否为空

示例：
```java
import java.util.ArrayList;
import java.util.Collection;

public class Main {
    public static void main(String[] args) {
        Collection<String> coll = new ArrayList<>();

        coll.add("aa");
        coll.add("bb");
        coll.add("cc");
        System.out.println(coll);

        boolean result2 = coll.isEmpty();
        System.out.println(result2);
    }
}

//输出：false
```
### 1.3.6 size(): 返回集合中元素的个数/集合的长度
* public int size(): 返回集合中元素的个数/集合的长度

示例：
```java
import java.util.ArrayList;
import java.util.Collection;

public class Main {
    public static void main(String[] args) {
        Collection<String> coll = new ArrayList<>();

        coll.add("aa");
        coll.add("bb");
        coll.add("cc");
        System.out.println(coll);

        int size = coll.size();
        System.out.println(size);
    }
}

//输出：3
```

## 1.4 Collection遍历方式
Collection实现的是通用的遍历方式，由于Set中没有索引，所以不能使用索引进行遍历
Collection实现的遍历方式一共有三种：
* 迭代器遍历
* 增强for遍历
* Lambda表达式遍历

### 1.4.1 迭代器遍历
* 迭代器遍历不依赖于索引
* 迭代器在Java中的类是Iterator，迭代器是集合专用的遍历方式
* Collection集合获取迭代器：Iterator\<E> iterator:返回迭代器对象，默认指向当前集合的0索引
* Iterator中的常用方法:
  * boolean hasNext():判断当前位置是否有元素，有元素返回true，没有元素返回false
  * E next():获取当前位置的元素，并将迭代器对象移向下一个位置
  * remove():删除元素

![迭代器遍历](/image/Java/Java进阶/迭代器遍历.png)
示例：
```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class IteratorDemo {
    public static void main(String[] args) {
        Collection<String> coll = new ArrayList<>();
        coll.add("aaa");
        coll.add("bbb");
        coll.add("ccc");
        coll.add("ddd");

        Iterator<String> iterator = coll.iterator();
        while (iterator.hasNext()) {
            String str = iterator.next();
            System.out.println(str);
        }

        System.out.println(iterator.next());
    }
}

//输出：aaa
//     bbb
//     ccc
//     ddd
//     Exception in thread "main" java.util.NoSuchElementException
//       at java.base/java.util.ArrayList$Itr.next(ArrayList.java:970)
//	     at IteratorDemo.main(IteratorDemo.java:19)
```
细节注意点：
* 报错NoSuchElementException
* 迭代器遍历完毕，指针不会复位，如果要再次遍历需要使用新的迭代器对象
* 循环中只能使用一次next方法，一次循环中调用两次next会导致移动两次指针，有可能会导致越界 
* 迭代器遍历，不能用集合的方法进行增加或删除，只能使用迭代器中的remove方法进行删除

### 1.4.2 增强for遍历
* 增强for的底层就是迭代器，为了简化迭代器的代码书写的
* 它是JDK5之后出现的，其内部原理就是一个Iterator迭代器
* 所有的单列集合和数组才能用增强for进行遍历
* 格式：for (元素的数据类型 变量名:数组或集合){}
  * 例：for (String s:list){System.out.println(s);}
* 注意点：
  * s其实就是一个第三方变量，在循环过程中依次表示集合中的每一个数据
  * 快速生成方式：集合名字.for 回车
  * 修改s不会改变集合中原本的数据

示例：
```java
import java.util.ArrayList;
import java.util.Collection;

public class ForDemo {
    public static void main(String[] args) {
        Collection<String> coll = new ArrayList<>();
        coll.add("aaa");
        coll.add("bbb");
        coll.add("ccc");
        coll.add("ddd");

        for (String s : coll) {
            System.out.println(s);
        }
    }
}

//输出：aaa
//     bbb
//     ccc
//     ddd
```

### 1.4.3 Lambda表达式遍历
* default void forEach(Consumer<? super T> action):结合lambda遍历集合

示例：
```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.function.Consumer;

public class ForDemo {
    public static void main(String[] args) {
        Collection<String> coll = new ArrayList<>();
        coll.add("aaa");
        coll.add("bbb");
        coll.add("ccc");
        coll.add("ddd");

        //使用匿名内部类实现
        // coll.forEach(new Consumer<String>() {
        //     @Override
        //     public void accept(String s) {
        //         System.out.println(s);
        //     }
        // });

        coll.forEach( s -> System.out.println(s));
    }
}

//输出：aaa
//     bbb
//     ccc
//     ddd
```

---------------------------------------------------- 
**2025.03.17**

## 1.5 List
List集合的特点：
* 有序：存和取的元素顺序一致
* 有索引：可以通过索引操作元素
* 可重复：存储的元素可以重复

## 1.6 List常用方法
List集合的特有方法：
* Collection的方法List都继承了
* List集合因为有索引，所以多了很多索引操作的方法

### 1.6.1 add(int index,E element):在此集合中的指定位置插入指定的元素
* void add(int index,E element): 在此集合中的指定位置插入指定的元素

示例：
```java
import java.util.ArrayList;
import java.util.List;

public class ListDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<String>();
        list.add("aaa");
        list.add("bbb");
        list.add("ccc");

        list.add(1, "ddd");
        System.out.println(list);
    }
}

//输出：[aaa, ddd, bbb, ccc]
```
### 1.6.2 remove(int index):删除指定索引处的元素，返回被删除的元素
* E remove(int index): 删除指定索引处的元素，返回被删除的元素
* List中有两种remove
  * 一种是删除指定元素
  * 一种是删除指定索引处的元素
  * 在调用方法时，如果方法出现了重载现象，优先调用实参跟形参一致的那个方法

示例：
```java
import java.util.ArrayList;
import java.util.List;

public class ListDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<String>();
        list.add("aaa");
        list.add("bbb");
        list.add("ccc");

        String remove = list.remove(2);
        System.out.println(remove);
        System.out.println(list);
    }
}

//输出：ccc
//     [aaa, bbb]
```
### 1.6.3 set(int index,E element):修改指定索引处的元素，返回被修改的元素
* E set(int index,E element): 修改指定索引处的元素，返回被修改的元素

示例：
```java
import java.util.ArrayList;
import java.util.List;

public class ListDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<String>();
        list.add("aaa");
        list.add("bbb");
        list.add("ccc");

        String set = list.set(2, "eee");
        System.out.println(set);
        System.out.println(list);
    }
}

//输出：ccc
//     [aaa, bbb, eee]
```
### 1.6.4 get(int index):返回指定索引处的元素
* E get(int index): 返回指定索引处的元素

示例：
```java
import java.util.ArrayList;
import java.util.List;

public class ListDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<String>();
        list.add("aaa");
        list.add("bbb");
        list.add("ccc");

        String get = list.get(2);
        System.out.println(get);
    }
}

//输出：ccc
```
## 1.7 List遍历方式
List遍历方式一共有五种，其中三种是继承于Collection的：
* 迭代器遍历: 在遍历过程中需要删除元素，使用迭代器遍历
* 列表迭代器遍历：在遍历过程中需要添加元素，使用列表迭代器遍历
* 增强for遍历：仅仅想遍历，使用增强for或Lambda表达式遍历
* Lambda表达式遍历：仅仅想遍历，使用增强for或Lambda表达式遍历
* 普通for循环：如果遍历的时候想操作索引，可以使用普通for

### 1.7.1 列表迭代器遍历
* 利用ListIterator进行遍历
* 可以在遍历过程中使用迭代器本身的add方法添加元素：iterator.add()

示例：
```java
import java.util.ArrayList;
import java.util.List;

public class ListDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<String>();
        list.add("aaa");
        list.add("bbb");
        list.add("ccc");

        ListIterator<String> iterator = list.listIterator();
        while (iterator.hasNext()) {
            String str = iterator.next();
            System.out.println(str);
        }
    }
}

//输出：aaa
//     bbb
//     ccc
```
### 1.7.2 普通for遍历
* 利用for循环和get方法遍历

示例：
```java
import java.util.ArrayList;
import java.util.List;

public class ListDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<String>();
        list.add("aaa");
        list.add("bbb");
        list.add("ccc");

        for (int i = 0; i < list.size(); i++) {
            String s = list.get(i);
            System.out.println(s);
        }
    }
}

//输出：aaa
//     bbb
//     ccc
```

---------------------------------------------------- 
**2025.03.18**

## 1.8 数据结构
数据结构是计算机底层存储、组织数据的方式，是指数据相互之间是以什么样的方式排列在一起的
常见的数据结构：
* 栈
* 队列
* 数组
* 链表
* 二叉树
* 二叉查找树
* 平衡二叉树
* 红黑树

### 1.8.1 栈
* 栈的特点：后进先出，先进后出
* 数据进入栈的过程：压/进栈
* 数据离开栈的过程：弹/出栈

![](/image/Java/Java进阶/栈.png)

### 1.8.2 队列
* 队列的特点：先进先出，后进后出
* 数据从后端进入队列的过程：入队列
* 数据从前端离开队列的过程：出队列

![](/image/Java/Java进阶/队列.png)

### 1.8.3 数组
* 数组是一种查询快，增删慢的模型
* 查询速度快：查询数据通过地址值和索引定位，查询任意数据耗时相同(元素在内存中是连续存储的)
* 删除效率低：要将原始数据删除，同时后面每个数据前移
* 添加效率极低：添加位置后的每个数据都要后移再添加元素

![](/image/Java/Java进阶/数组.png)

### 1.8.4 链表
* 链表中的单位是结点，其中存储具体的数据以及下一个结点的地址值
* 链表中的结点是独立的对象，在内存中是不连续的，每个结点包含数据值和下一个结点的地址
* 链表查询慢，无论查询哪个数据都要从头开始找
* 链表增删快