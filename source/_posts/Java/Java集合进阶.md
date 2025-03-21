---
title: Java集合进阶
tags: Java
categories: Java
top_img: transparent
date: 2025-3-16 20:00:00
copyright: false
description: Java集合进阶
cover: ../image/Java/Java集合进阶/1.JPG
---

**2025.03.16**
# 集合进阶
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

## 第一章 Collection
* Collection是单列集合的祖宗接口，它的功能是全部单列集合都可以继承使用的
* Collection是一个接口，我们不能直接创建它的对象，只能创建它实现类的对象
![Collection体系结构](/image/Java/Java集合进阶/Collection体系结构.png)

### 1.1 Collection常用方法
#### 1.1.1 add(E e): 把给定的对象添加到当前集合中
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
#### 1.1.2 clear(): 清空集合中的所有元素
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
#### 1.1.3 remove(E e): 把给定的对象在当前集合中删除
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
#### 1.1.4 contains(Object obj): 判断当前集合中是否包含给定的对象
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
#### 1.1.5 isEmpty(): 判断当前集合是否为空
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
#### 1.1.6 size(): 返回集合中元素的个数/集合的长度
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

### 1.2 Collection遍历方式
Collection实现的是通用的遍历方式，由于Set中没有索引，所以不能使用索引进行遍历
Collection实现的遍历方式一共有三种：
* 迭代器遍历
* 增强for遍历
* Lambda表达式遍历

#### 1.2.1 迭代器遍历
* 迭代器遍历不依赖于索引
* 迭代器在Java中的类是Iterator，迭代器是集合专用的遍历方式
* Collection集合获取迭代器：Iterator\<E> iterator:返回迭代器对象，默认指向当前集合的0索引
* Iterator中的常用方法:
  * boolean hasNext():判断当前位置是否有元素，有元素返回true，没有元素返回false
  * E next():获取当前位置的元素，并将迭代器对象移向下一个位置
  * remove():删除元素

![迭代器遍历](/image/Java/Java集合进阶/迭代器遍历.png)
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

#### 1.2.2 增强for遍历
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

#### 1.2.3 Lambda表达式遍历
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

## 第二章 List
List集合的特点：
* 有序：存和取的元素顺序一致
* 有索引：可以通过索引操作元素
* 可重复：存储的元素可以重复

### 2.1 List常用方法
List集合的特有方法：
* Collection的方法List都继承了
* List集合因为有索引，所以多了很多索引操作的方法

#### 2.1.1 add(int index,E element):在此集合中的指定位置插入指定的元素
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
#### 2.1.2 remove(int index):删除指定索引处的元素，返回被删除的元素
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
#### 2.1.3 set(int index,E element):修改指定索引处的元素，返回被修改的元素
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
#### 2.1.4 get(int index):返回指定索引处的元素
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
### 2.2 List遍历方式
List遍历方式一共有五种，其中三种是继承于Collection的：
* 迭代器遍历: 在遍历过程中需要删除元素，使用迭代器遍历
* 列表迭代器遍历：在遍历过程中需要添加元素，使用列表迭代器遍历
* 增强for遍历：仅仅想遍历，使用增强for或Lambda表达式遍历
* Lambda表达式遍历：仅仅想遍历，使用增强for或Lambda表达式遍历
* 普通for循环：如果遍历的时候想操作索引，可以使用普通for

#### 2.2.1 列表迭代器遍历
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
#### 2.2.2 普通for遍历
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

## 第三章 数据结构
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

### 3.1 栈
* 栈的特点：后进先出，先进后出
* 数据进入栈的过程：压/进栈
* 数据离开栈的过程：弹/出栈

![](/image/Java/Java集合进阶/栈.png)

### 3.2 队列
* 队列的特点：先进先出，后进后出
* 数据从后端进入队列的过程：入队列
* 数据从前端离开队列的过程：出队列

![](/image/Java/Java集合进阶/队列.png)

### 3.3 数组
* 数组是一种查询快，增删慢的模型
* 查询速度快：查询数据通过地址值和索引定位，查询任意数据耗时相同(元素在内存中是连续存储的)
* 删除效率低：要将原始数据删除，同时后面每个数据前移
* 添加效率极低：添加位置后的每个数据都要后移再添加元素

![](/image/Java/Java集合进阶/数组.png)

### 3.4 链表
* 链表中的单位是结点，其中存储具体的数据以及下一个结点的地址值
* 链表中的结点是独立的对象，在内存中是不连续的，每个结点包含数据值和下一个结点的地址
* 链表查询慢，无论查询哪个数据都要从头开始找
* 链表增删快

![链表结点结构](/image/Java/Java集合进阶/链表1.png)
![链表](/image/Java/Java集合进阶/链表2.png)
![单向链表与双向链表](/image/Java/Java集合进阶/链表3.png)

---------------------------------------------------- 
**2025.03.21**

### 3.5 ArrayList集合底层原理
* 利用空参创建的集合，在底层创建一个默认长度为0的数组
* 添加第一个元素时，底层会创建一个新的长度为10的数组
* 存满时，会扩容1.5倍(创建一个新数组并将原数组中的元素全部拷贝到新数组中)
* 如果一次添加多个元素，1.5倍放不下，则新创建数组的长度以实际为准
* ArrayList的size不仅表示其大小，还表示添加下个元素时的位置

创建ArrayList并第一次向里面添加数据时的原理：
![创建ArrayList](/image/Java/Java集合进阶/ArrayList底层原理1.png)

当ArrayList已满需要扩容时的原理：
![ArrayList扩容过程](/image/Java/Java集合进阶/ArrayList底层原理2.png)

### 3.6 LinkedList集合、迭代器底层原理
* LinkedList底层数据结构是双链表，查询慢，增删快，但是如果操作的是首尾元素，速度也是极快的(首尾相连)
* 有很多首尾操作的特有API
    * public void addFirst(E e): 在该列表开头插入指定的元素
    * public void addLast(E e): 在该列表末尾插入指定的元素
    * public E getFirst(): 返回此列表中的第一个元素
    * public E getLast(): 返回此列表中的最后一个元素
    * public E removeFirst(): 从此列表中删除并返回第一个元素
    * public E removeLast(): 从此列表中删除并返回最后一个元素
* 迭代器对象的三个参数
  * cursor: 当前指向的元素
  * lastRet: 当前元素的上一个元素
  * expectedModCount: 表示集合变化的次数，每add或remove一次，这个变量就会自增

创建LinkedList并向里面添加数据时的原理：
![LinkedList底层原理](/image/Java/Java集合进阶/LinkedList底层原理.png)

创建迭代器时的底层原理：
![迭代器底层原理](/image/Java/Java集合进阶/迭代器底层原理.png)


## 第四章 泛型
* 泛型：是JDK5中引入的特性，可以在编译阶段约束操作的数据类型，并进行检查
* 泛型的格式：<数据类型>
* 泛型只能支持引用数据类型，如果想存储int这种基本数据类型，就需要使用它们的包装类Integer
* 如果集合不指定类型，默认所有数据类型均为Object类型，这会使我们在获取数据时无法使用该数据的特有行为(方法)
* 泛型的好处：
  * 统一数据类型
  * 把运行时期的问题提前到了编译期间，避免了强制类型转换可能出现的异常，因为在编译阶段类型就能确定下来
* Java中的泛型是伪泛型，在转换为字节码文件时数据还是Object类型，只不过在输出时又会强转为泛型
* 泛型的细节：
  * 泛型中不能写基本数据类型
  * 指定泛型的具体类型后，传递数据时，可传入该类型或者其子类类型
  * 如果不写泛型，类型默认是Object
* 泛型可以在很多地方定义：
  * 类后面：泛型类
  * 方法上面：泛型方法
  * 接口上面：泛型接口

### 4.1 泛型类
* 当一个类中，某个变量的数据类型不确定时，就可以定义带有泛型的类
* 格式：
> 修饰符 class 类名<类型>{ 
>  }
> //举例：
> public class ArrayList\<E>{
> }
* 此处的E可以理解为变量，但不是用来记录数据的，而是记录数据的类型，可以写成T、E、K、V等
  
示例：
```java
/*
    当在创建类时，如果不确定类型，就可以使用泛型类
 */

import java.util.Arrays;

public class MyArrayList <E>{

    Object[] obj = new Object[10];
    int size;

    // E: 表示是不确定的类型，该类型在类名后面已经定义过了
    // e: 形参的名字，变量名
    public boolean add(E e){
        obj[size] = e;
        size++;
        return true;
    }

    public E get(int index){
        // 得到的是object类型的数据，需要强转为E类型
        return (E) obj[index];
    }

    @Override
    public String toString() {
        return Arrays.toString(obj);
    }
}
```
泛型类的使用：
```java
public class Main {
    public static void main(String[] args) {
        MyArrayList<String> list = new MyArrayList<>();
        list.add("Hello");
        list.add("World");

        System.out.println(list);
    }
}

//输出: [Hello, World, null, null, null, null, null, null, null, null]
```

### 4.2 泛型方法
* 方法中形参类型不确定时:
  * 可以用类名后面定义的泛型\<E>(本类中所有方法都能使用)
  * 可以在方法声明上定义自己的泛型(只有本方法可以使用)
* 格式：
> 修饰符 <类型> 返回值类型 方法名(类型 变量名){
> }
> //举例：
> public \<T> void show(T t){
> }
* 此处的T可以理解为变量，但不是用来记录数据的，而是记录类型的，可以写成T、E、K、V等

示例：
```java
//工具类ListUtil
import java.util.ArrayList;
import java.util.List;

public class ListUtil {
    private ListUtil() {}

    public static <E> void addAll(ArrayList<E> list, E e1, E e2, E e3, E e4) {
        list.add(e1);
        list.add(e2);
        list.add(e3);
        list.add(e4);
    }
}
```
泛型方法的使用：
```java
import java.util.ArrayList;

public class TestUtil {
    public static void main(String[] args) {
        ArrayList<String> list1 = new ArrayList<>();
        ListUtil.addAll(list1, "aaa", "bbb", "ccc", "ddd");
        System.out.println(list1);

        ArrayList<Integer> list2 = new ArrayList<>();
        ListUtil.addAll(list2, 111, 222, 333, 444);
        System.out.println(list2);
    }
}

//输出：[aaa, bbb, ccc, ddd]
//      [111, 222, 333, 444]
```

### 4.3 泛型接口
* 格式：
> 修饰符 interface 接口名<类型>{
> }
> //举例：
> public interface List\<E>{
> }

* 泛型接口的使用：
  * 实现类给出具体类型
  * 实现类延续泛型，创建对象时再确定

示例：
```java
//实现方法一：实现类给出具体类型
public class MyArrayList1 implements List<String>{
    ...
}

//实现方法二：实现类延续泛型，创建对象时再确定
//实现类：
public class MyArrayList2 implements List<E>{
    ...
}

//创建对象
MyArrayList2<String> list = new MyArrayList2();
```

### 4.4 泛型的继承和通配符
* 泛型不具备继承性，但是数据具备继承性
* 泛型里面写的是什么类型，那么只能传递什么类型的数据

示例：
```java
import java.util.ArrayList;

public class GenericsDemo1 {
    public static void main(String[] args) {
        ArrayList<Ye> list1 = new ArrayList<>();
        ArrayList<Fu> list2 = new ArrayList<>();
        ArrayList<Zi> list3 = new ArrayList<>();

        method(list1);
        // 泛型不具备继承性，但数据具备继承性
        // method(list2);  // 报错
        // method(list3);  // 报错
        
        list1.add(new Ye());
        list1.add(new Fu());
        list1.add(new Zi());
    }

    public static void method(ArrayList<Ye> list) {

    }
}

class Ye {}
class Fu extends Ye {}
class Zi extends Fu {}
```

* 使用泛型方法的弊端：它可以接受任意的数据类型
* 如果方法虽然不确定类型，但是希望对类型范围做一个约束，那么就可以使用泛型通配符
* 方式：
  * ? extends E: 表示可以传递E或者E所有子类类型
  * ? super E: 表示可以传递E或者E所有父类类型

示例：
```java
import java.util.ArrayList;

public class GenericsDemo2 {
        public static void main(String[] args) {
            ArrayList<Ye> list1 = new ArrayList<>();
            ArrayList<Fu> list2 = new ArrayList<>();
            ArrayList<Zi> list3 = new ArrayList<>();
            
            ArrayList<Student> list4 = new ArrayList<>();

            method(list1);
            method(list2);
            method(list3);
            
            // 报错
            // method(list4);
        }

        public static void method(ArrayList<? extends Ye> list) {

        }
}

class Ye {}
class Fu extends Ye {}
class Zi extends Fu {}
class Student {}
```