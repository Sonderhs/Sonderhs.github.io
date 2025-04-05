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

---------------------------------------------------- 
**2025.03.24**
### 3.7 树
* 树的结构：
![树的结构](/image/Java/Java集合进阶/tree1.png)

* 树的每个节点包含四个值：
  * 父节点地址
  * 值
  * 左子节点地址
  * 右子节点地址
* 度：每一个节点的子结点数量
* 树高：树的总层数
* 根节点：最顶层的节点
* 左子结点：左下方的节点
* 右子节点：右下方的节点

#### 3.7.1 二叉查找树
* 二叉查找树，又称二叉排序树或者二叉搜索树
* 特点：
  * 每一个节点上最多有两个子结点
  * 任意节点左子树上的值都小于当前节点
  * 任意节点右子树上的值都大于当前节点
![二叉查找树](/image/Java/Java集合进阶/tree2.png)
* 二叉查找树添加节点规则：
  * 小的存左边
  * 大的存右边
  * 一样的不存

#### 3.7.2 二叉树遍历方式
* 前序遍历：根->左->右
* 中序遍历：左->根->右
* 后序遍历：左->右->根
* 层序遍历：一层一层遍历

#### 3.7.3 平衡二叉树
* 由于二叉查找树可能会因数据分布造成两边不平衡的问题，所以才有平衡二叉树
* 规则：任意节点左右子树高度差不超过1

| <img src="/image/Java/Java集合进阶/tree3.png" width="350"/> | <img src="/image/Java/Java集合进阶/tree4.png" width="250"/> |
| ----------------------------------------------------------- | ----------------------------------------------------------- |

* 平衡二叉树的旋转机制：由于平衡二叉树要保持平衡，所以在添加节点时需要使用旋转机制
* 左旋步骤：
  * 确定支点：从添加的节点开始，不断地往父节点找不平衡的节点
  * 将根节点的右侧往左拉
  * 原先的右子节点变成新的父节点，并把多余的左子结点出让，给已降级的根节点当右子节点

| <img src="/image/Java/Java集合进阶/tree5.png" alt="确定支点" width="350"/> | <img src="/image/Java/Java集合进阶/tree6.png" alt="根节点的右侧往左拉" width="350"/> | <img src="/image/Java/Java集合进阶/tree7.png" alt="让出左子结点" width="350"/> |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |

* 右旋步骤：
  * 确定支点：从添加的节点开始，不断地往父节点找不平衡的节点
  * 将根节点的左侧往右拉
  * 原先的左子节点变成新的父节点，并把多余的右子结点出让，给已降级的根节点当左子节点

| <img src="/image/Java/Java集合进阶/tree8.png" alt="确定支点" width="350"/> | <img src="/image/Java/Java集合进阶/tree9.png" alt="根节点的左侧往右拉" width="350"/> | <img src="/image/Java/Java集合进阶/tree10.png" alt="让出右子结点" width="350"/> |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |

* 平衡二叉树需要旋转的四种情况
  * 左左：当根节点左子树的左子树有节点插入，导致二叉树不平衡
    * 一次右旋
  * 左右：当根节点左子树的右子树有节点插入，导致二叉树不平衡
    * 先局部左旋，再整体右旋
  * 右右：当根节点右子树的右子树有节点插入，导致二叉树不平衡
    * 一次左旋
  * 右左：当根节点右子树的左子树有节点插入，导致二叉树不平衡
    * 先局部右旋，再整体左旋

#### 3.7.4 红黑树
* 红黑树是一种自平衡的二叉查找树
* 1972年出现，当时被称为平衡二叉B树，后来1978年被修改为红黑树
* 它是一种特殊的二叉查找树，红黑树的每一个节点上都有存储位表示节点的颜色
* 每一个节点可以是红或者黑，红黑树不是高度平衡的，它的平衡是通过“红黑规则”进行实现的
![平衡二叉树与红黑树](/image/Java/Java集合进阶/tree11.png)
* 红黑树规则：
  * 每一个节点或是红色的，或是黑色的
  * 根节点必须是黑色
  * 如果一个节点没有子结点或者父节点，则该节点相应的指针属性为Nil，这些Nil视为叶节点，每个叶节点(Nil)是黑色的
  * 如果某一个节点是红色的，那么它的子结点必须是黑色(不能出现两个红色节点相连的情况)
  * 对每一个节点，从该节点到其所有后代叶节点的简单路径上，均包含相同数目的黑色节点
  * “左根右，根叶黑，不红红，黑路同”
![红黑树](/image/Java/Java集合进阶/tree12.png)
* 红黑树添加节点规则：
  * ![红黑树添加节点规则](/image/Java/Java集合进阶/tree13.png)

---------------------------------------------------- 
**2025.03.23**
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

---------------------------------------------------- 
**2025.03.24**
## 第五章 Set
Set系列集合：
* 无序：存取顺序不一致
* 不重复：可以去除重复
* 无索引：没有带索引的方法，所以不能使用普通for循环遍历，也不能通过索引来获取元素

Set集合的实现类：
* HashSet：无序、不重复、无索引
* LinkedSet：有序、不重复、无索引
* TreeSet：可排序、不重复、无索引

Set接口中的方法基本上与Collection的API一致
![Set继承Collection中的方法](/image/Java/Java集合进阶/set1.png)


示例：
```java
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        //利用Set系列集合添加字符串并用多种方式遍历

        Set<String> s = new HashSet<>();

        //添加元素时，若该元素不存在则添加成功，若存在则添加失败
        s.add("aaa");
        s.add("bbb");
        s.add("ccc");

        //无序
        System.out.println(s);  //[aaa, ccc, bbb]

        //利用迭代器遍历
        Iterator<String> iterator = s.iterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }

        //增强for
        for (String string : s) {
            System.out.println(string);
        }

        //lambda表达式遍历
        s.forEach(str -> System.out.println(str));
    }
}
```

### 5.1 HashSet
* HashSet底层原理：
  * HashSet集合底层采取哈希表存储数据
  * 哈希表是一种对于增删改查数据性能都比较好的结构
* 哈希表组成：
  * JDK8之前：数组+链表
  * JDK8之后：数组+链表+红黑树
* 哈希值：
  * 根据hashCode方法计算出来的int类型的整数
  * 该方法定义在Object类中，所有对象都可以调用，默认使用地址值进行计算
  * 一般情况下，会重写hashCode方法，利用对象内部的属性值计算哈希值
* 对象的哈希值特点：
  * 如果没有重写hashCode方法，不同对象计算出的哈希值是不同的
  * 如果已经重写hashCode方法，不同的对象只要属性值相同，计算出的哈希值就是一样的
  * 在小部分情况下，不同属性值或不同地址值计算出来的哈希值也有可能一样(哈希碰撞)


示例：
```java
//Student类
import java.util.Objects;

public class Student {
    private String name;
    private int age;

    public Student() {
    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return age == student.age && Objects.equals(name, student.name);
    }

    //使用alt+insert重写hashCode方法
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```

```java
public class Main {
    public static void main(String[] args) {

        Student s1 = new Student("zhangsan", 23);
        Student s2 = new Student("zhangsan", 23);

        System.out.println(s1.hashCode());
        System.out.println(s2.hashCode());
    }
}

//输出：-1461067292
//      -1461067292
```

### 5.2 HashSet底层原理
![HashSet底层原理](/image/Java/Java集合进阶/set2.png)

注意：
* JDK8以后，当链表长度超过8，而且数组长度大于等于64时，自动转换为红黑树
* 如果集合中存储的是自定义对象，必须要重写hashCode和equals方法

### 5.3 LinkedHashSet
* 特点：有序、不重复、无索引
* 这里的有序指的是保证存储和取出的元素顺序一致
* 原理：底层数据结构依然是哈希表，只是每个元素又额外多了一个双链表机制存储顺序
![LinkedHashSet存储原理](/image/Java/Java集合进阶/set3.png)

示例：
```java
import java.util.LinkedHashSet;

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("zhangsan", 23);
        Student s2 = new Student("lisi", 24);
        Student s3 = new Student("wangwu", 25);
        Student s4 = new Student("zhangsan", 23);

        LinkedHashSet<Student> set = new LinkedHashSet<>();

        System.out.println(set.add(s1));
        System.out.println(set.add(s2));
        System.out.println(set.add(s3));
        System.out.println(set.add(s4));

        System.out.println(set);
    }
}

//输出：true
//      true
//      true
//      false
//      [Student{name = zhangsan, age = 23}, Student{name = lisi, age = 24}, Student{name = wangwu, age = 25}]
```

---------------------------------------------------- 
**2025.03.24**
### 5.4 TreeSet
* TreeSet特点：
  * 不重复、无索引、可排序
  * 可排序：按照元素的默认规则(由小到大)排序
  * TreeSet集合底层是基于红黑树的数据结构实现排序的，增删改查性能都好
* TreeSet集合默认的规则：
  * 对于数值类型：Integer，Double，默认按照从小到大的顺序进行排序
  * 对于字符、字符串类型：按照字符在ASCII码表中的数字升序进行排序
* TreeSet底层是红黑树，所以不需要重写hashCode和equals方法
* 使用TreeSet需要在类中使用Comparable接口并重写compareTo方法指定排序规则


示例:
```java
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        
        TreeSet<Integer> treeSet = new TreeSet<>();
        treeSet.add(5);
        treeSet.add(1);
        treeSet.add(3);
        treeSet.add(2);
        treeSet.add(4);

        for (Integer i : treeSet) {
            System.out.print(i + " ");
        }
    }
}

//输出：1 2 3 4 5 
```
  
### 5.5 TreeSet的两种比较方式
#### 5.5.1 默认排序/自然排序
* 默认排序/自然排序：Javabean类实现Comparable接口指定比较规则

![](/image/Java/Java集合进阶/TreeSet1.png)

示例：
在Student类中实现按年龄大小排序
```java
public class Student implements Comparable<Student> {
    private String name;
    private int age;


    public Student() {
    }

    public Student(String name, int age) {
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
        return "Student{name = " + name + ", age = " + age + "}";
    }


    @Override
    public int compareTo(Student o) {
        //指定排序类型
        //按年龄升序进行排序
        return this.getAge() - o.getAge();
    }
}
```
测试类：
```java
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {

        Student s1 = new Student("zhangsan", 23);
        Student s2 = new Student("lisi", 24);
        Student s3 = new Student("wangwu", 25);

        TreeSet<Student> treeSet = new TreeSet<>();
        treeSet.add(s1);
        treeSet.add(s2);
        treeSet.add(s3);

        for (Student s : treeSet) {
            System.out.println(s);
        }
    }
}

//输出：Student{name = zhangsan, age = 23}
//      Student{name = lisi, age = 24}
//      Student{name = wangwu, age = 25}
```

#### 5.5.2 比较器排序
* 比较器排序：创建TreeSet对象时，传递比较器Comparator指定规则
* 默认使用第一种，如果第一中不能满足要求再使用第二种

```java
import java.util.Comparator;
import java.util.TreeSet;

public class ComparatorDemo {
    public static void main(String[] args) {
        //需求：存入四个字符串："c","ab","df","qwer"
        //按照长度排序，如果一样长则按照首字母排序

        //o1:表示当前要添加的元素
        //o2:表示已经在红黑树中存在的元素
        //返回值规则与之前一样：负值存左边，正值存右边
        TreeSet<String> ts = new TreeSet<>(new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                int i = o1.length() - o2.length();
                //如果长度相等使用默认的排序方法
                i = i == 0 ? o1.compareTo(o2) : i;
                return i;
            }
        });

        ts.add("c");
        ts.add("ab");
        ts.add("df");
        ts.add("qwer");

        for (String s : ts) {
            System.out.println(s);
        }
    }
}

//输出：c
//      ab
//      df
//      qwer
```

**总结**
* 如果想要集合中的元素可重复：用ArrayList集合，基于数组的。
* 如果想要集合中的元素可重复，而且当前的增删操作明显多余查询：用LinkedList，基于链表的
* 如果想对集合中的元素去重：用HashSet集合，基于哈希表的
* 如果想对集合中的元素去重，而且保证存取顺序：用LinedHashSet集合，基于哈希表和双链表，效率低于HashSet
* 如果想对集合中的元素进行排序：用TreeSet集合，基于红黑树。后续也可以用List集合实现排序


---------------------------------------------------- 
**2025.03.28**
## 第六章 Map
* 单列集合每次添加一个元素
* 双列集合每次添加一对元素：分别为键和值
  * 键：不能重复
  * 值：可以重复
* 键和值一一对应，每一个键只能找到自己对应的值
* 键+值这个整体我们称之为键值对或键值对对象，在Java中叫做Entry对象

### 6.1 Map常见API
Map是双列集合的顶层接口，它的功能是全部双列集合都可以继承使用的
![](/image/Java/Java集合进阶/map1.png)

#### 6.1.1 put():添加元素
* V put(K key,V value): 添加元素
* 再添加数据时，如果键不存在，那么直接把键值对对象添加到map集合中
* 如果键存在，那么会把原有的键值对对象覆盖，会把被覆盖的值进行返回

示例：
```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String,String> m = new HashMap<>();

        m.put("key1", "value1");
        m.put("key2", "value2");
        m.put("key3", "value3");
        System.out.println(m);
        String s = m.put("key3", "value4");
        System.out.println(s);
        System.out.println(m);
    }
}

//输出：{key1=value1, key2=value2, key3=value3}
//      value3
//      {key1=value1, key2=value2, key3=value4}
```
#### 6.1.2 remove():根据键删除键值对元素
* V remove(Object key): 根据键删除键值对元素

示例：
```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String,String> m = new HashMap<>();

        m.put("key1", "value1");
        m.put("key2", "value2");
        m.put("key3", "value3");
        System.out.println(m);

        String s = m.remove("key1");
        System.out.println(s);
        System.out.println(m);
    }
}

//输出：{key1=value1, key2=value2, key3=value3}
//      value1
//      {key2=value2, key3=value3}
```
#### 6.1.3 clear():移除所有的键值对元素
* void clear():移除所有的键值对元素

示例：
```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String,String> m = new HashMap<>();

        m.put("key1", "value1");
        m.put("key2", "value2");
        m.put("key3", "value3");
        System.out.println(m);
        
        m.clear();
        System.out.println(m);
    }
}

//输出：{key1=value1, key2=value2, key3=value3}
//      {}
```
#### 6.1.4 containsKey():判断集合是否包含指定的键
* boolean containsKey(Object key):判断集合是否包含指定的键

示例：
```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String,String> m = new HashMap<>();

        m.put("key1", "value1");
        m.put("key2", "value2");
        m.put("key3", "value3");
        System.out.println(m);

        boolean keyFound = m.containsKey("key1");
        System.out.println(keyFound);
    }
}

//输出：{key1=value1, key2=value2, key3=value3}
//      true
```
#### 6.1.5 containsValue():判断集合是否包含指定的值
* boolean containsValue(Object value):判断集合是否包含指定的值

示例：
```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String,String> m = new HashMap<>();

        m.put("key1", "value1");
        m.put("key2", "value2");
        m.put("key3", "value3");
        System.out.println(m);

        boolean valueFound = m.containsValue("value2");
        System.out.println(valueFound);
    }
}

//输出：{key1=value1, key2=value2, key3=value3}
//      true
```
#### 6.1.6 isEmpty():判断集合是否为空
* boolean isEmpty():判断集合是否为空

示例：
```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String,String> m = new HashMap<>();

        m.put("key1", "value1");
        m.put("key2", "value2");
        m.put("key3", "value3");
        System.out.println(m);

        boolean result = m.isEmpty();
        System.out.println(result);
    }
}

//输出：{key1=value1, key2=value2, key3=value3}
//      false
```
#### 6.1.7 size():集合的长度，也就是集合中键值对的个数
* int size():集合的长度，也就是集合中键值对的个数

示例：
```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String,String> m = new HashMap<>();

        m.put("key1", "value1");
        m.put("key2", "value2");
        m.put("key3", "value3");
        System.out.println(m);

        int size = m.size();
        System.out.println(size);
    }
}

//输出：{key1=value1, key2=value2, key3=value3}
//      3
```

### 6.2 Map集合遍历方式
Map集合遍历方式一共有三种：
* 键找值
* 键值对
* Lambda表达式

#### 6.2.1 键找值
* 先获取所有的键放到单列集合中，再使用get方法获取值
![](/image/Java/Java集合进阶/map2.png)

示例：
```java
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class MapDemo2 {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();

        map.put("伊志平", "小龙女");
        map.put("郭靖", "穆念慈");
        map.put("欧阳克", "黄蓉");

        //通过键找值
        Set<String> keys = map.keySet();
        for (String key : keys) {
            System.out.println(key + ":" + map.get(key));
        }
    }
}

//输出：伊志平:小龙女
//      郭靖:穆念慈
//      欧阳克:黄蓉
```

#### 6.2.2 键值对
* 先获取map中的每一对键值对对象，再使用getKay()和getValue()方法获取key和value
![](/image/Java/Java集合进阶/map3.png)

示例：
```java
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class MapDemo3 {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();

        map.put("伊志平", "小龙女");
        map.put("郭靖", "穆念慈");
        map.put("欧阳克", "黄蓉");

        Set<Map.Entry<String, String>> entries = map.entrySet();
        for (Map.Entry<String, String> entry : entries) {
            System.out.println(entry.getKey() + ":" + entry.getValue());
        }
    }
}

//输出：伊志平:小龙女
//      郭靖:穆念慈
//      欧阳克:黄蓉
```

#### 6.2.3 Lambda表达式
* forEach()遍历
* 底层是使用增强for进行遍历的

示例：
```java
import java.util.HashMap;
import java.util.Map;
import java.util.function.BiConsumer;

public class MapDemo4 {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();

        map.put("伊志平", "小龙女");
        map.put("郭靖", "穆念慈");
        map.put("欧阳克", "黄蓉");

//        map.forEach(new BiConsumer<String, String>() {
//            @Override
//            public void accept(String key, String value) {
//                System.out.println(key + ":" + value);
//            }
//        });
        map.forEach((key, value) -> System.out.println(key + ":" + value));
    }
}

//输出：伊志平:小龙女
//      郭靖:穆念慈
//      欧阳克:黄蓉
```

---------------------------------------------------- 
**2025.03.29**
### 6.3 HashMap
* HashMap特点：
  * HashMap是Map里面的一个实现类
  * 没有额外需要学习的特有方法，直接使用Map里面的方法就可以了
  * 特点都是由键决定的：无序、不重复、无索引
  * HashMap跟HashSet底层原理是一模一样的，都是哈希表结构

![HashMap底层原理](/image/Java/Java集合进阶/hashmap1.png)

### 6.4 HashMap练习
#### 6.4.1 练习一
需求：创建一个HashMap集合，键是学生对象(Student)，值是籍贯(String)
存储三个键值对元素并遍历
要求：同姓名，同年龄认为是一个学生


```java
//Student class
import java.util.Objects;

public class Student {
    private String name;
    private int age;


    public Student() {
    }

    public Student(String name, int age) {
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
        return "Student{name = " + name + ", age = " + age + "}";
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return age == student.age && Objects.equals(name, student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```

```java
import java.util.HashMap;
import java.util.function.BiConsumer;

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("zhangsan", 23);
        Student s2 = new Student("lisi", 24);
        Student s3 = new Student("wangwu", 25);

        HashMap<Student, String> map = new HashMap<>();

        map.put(s1, "beijing");
        map.put(s2, "shanghai");
        map.put(s3, "guangzhou");

        map.forEach((Student student, String s) -> System.out.println(student.getName() + "今年" + student.getAge() + "岁，籍贯是" + s ));
    }
}

//输出：wangwu今年25岁，籍贯是guangzhou
//      lisi今年24岁，籍贯是shanghai
//      zhangsan今年23岁，籍贯是beijing
```

#### 6.4.2 练习二
需求：某个班级80名学生，现在需要组成秋游活动，班长提供了四个景点依次是(A、B、C、D)，每个学生只能选择一个景点，请统计出哪个景点想去的人最多

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {

        String[] arr = {"A", "B", "C", "D"};

        //投票数据
        ArrayList<String> list = new ArrayList<>();
        Random r = new Random();
        for (int i = 0; i < 80; i++) {
            int index = r.nextInt(arr.length);
            list.add(arr[index]);
        }

        //如果统计的东西比较多不方便使用计数器思想
        //就可以使用map集合利用集合进行统计
        HashMap<String, Integer> map = new HashMap<>();

        for (String name : list) {
            if (map.containsKey(name)) {
                //如果当前景点已存在就+1
                map.put(name, map.get(name) + 1);
            }else {
                //不存在则添加到map中
                map.put(name, 1);
            }
        }

        int max = 0;
        map.forEach((k, v) -> System.out.println(k + ": " + v));
        Set<Map.Entry<String, Integer>> entries = map.entrySet();
        for (Map.Entry<String, Integer> entry : entries) {
            int count = entry.getValue();
            if (count > max) {
                max = count;
            }
        }

        for (Map.Entry<String, Integer> entry : entries) {
            int count = entry.getValue();
            if (count == max) {
                System.out.println(entry.getKey());
            }
        }
    }
}

//输出：A: 18
//      B: 23
//      C: 20
//      D: 19
//      B
```

### 6.5 LinkedHashMap
* LinkedHashMap特点：
  * 由键决定：有序、不重复、无索引
  * 这里的有序指的是保证存储和取出的元素顺序一致
  * 原理：底层数据结构依然是哈希表，只是每个键值对元素又额外多了一个双链表的机制记录存储的顺序
![LinkedHashMap底层原理](/image/Java/Java集合进阶/linkedhashmap1.png)

示例：
```java
import java.util.LinkedHashMap;

public class Main {
    public static void main(String[] args) {

        LinkedHashMap<String, Integer> map = new LinkedHashMap<>();

        map.put("a", 1);
        map.put("b", 2);
        map.put("c", 3);

        System.out.println(map);
    }
}

//输出：{a=1, b=2, c=3}
```

### 6.6 TreeMap
* TreeMap特点：
  * TreeMap跟TreeSet底层原理一样，都是红黑树结构的
  * 由键决定：不重复、无索引、可排序
  * 可排序：对键进行排序
  * 注意：默认按照键的从小到大进行排序，也可以自己规定键的排序规则
* 键的排序规则
  * 实现Comparable接口，指定比较规则
  * 创建集合时传递Comparator比较器对象，指定比较规则

### 6.7 TreeMap的基本应用
#### 6.7.1 需求1
需求：
键：整数表示id
值：字符串表示是商品名称
要求：按照id的升序排列，按照id的降序排列

```java
import java.util.Comparator;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        TreeMap<Integer, String> treemap = new TreeMap<>(new Comparator<Integer>() {
            //传递Comparator比较器对象
            @Override
            public int compare(Integer o1, Integer o2) {
                //升序
                return o1 - o2;
                //降序
                //return o2 - o1;
            }
        });

        treemap.put(136, "手机");
        treemap.put(181, "平板");
        treemap.put(166, "电脑");

        System.out.println(treemap);
    }
}

//输出：{136=手机, 166=电脑, 181=平板}
```
#### 6.7.2 需求2
需求：
键：学生对象
值：籍贯
要求：按照学生年龄的升序排列，年龄一样按照姓名的字母排列，同姓名年龄视为同一个人


```java
//Student类-实现Comparable接口
import java.util.Objects;

public class Student implements Comparable<Student> {
    private String name;
    private int age;


    public Student() {
    }

    public Student(String name, int age) {
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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return age == student.age && Objects.equals(name, student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    public String toString() {
        return "Student{name = " + name + ", age = " + age + "}";
    }


    @Override
    public int compareTo(Student o) {
        int result = this.getAge() - o.getAge();
        if (result == 0) {
            result = this.getName().compareTo(o.getName());
        }
        return result;
    }
}
```

```java
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        TreeMap<Student, String> treemap = new TreeMap<>();

        Student s1 = new Student("zhangsan",  23);
        Student s2 = new Student("lisi",  23);
        Student s3 = new Student("wangwu",  22);

        treemap.put(s1, "北京");
        treemap.put(s2, "上海");
        treemap.put(s3, "广州");

        System.out.println(treemap);
    }
}

//输出：{Student{name = wangwu, age = 22}=广州, Student{name = lisi, age = 23}=上海, Student{name = zhangsan, age = 23}=北京}
```

#### 6.7.3 需求3
需求：
字符串"aababcabcdabcde"
请统计字符串中每一个字出现的次数，并按照以下格式输出
输出结果：a(5)b(4)c(3)d(2)e(1)

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        String s = "aaababcabcdabcde";

        TreeMap<Character, Integer> treemap = new TreeMap<>();

        for (int i = 0; i < s.length(); i++) {
            if (treemap.containsKey(s.charAt(i))) {
                int count = treemap.get(s.charAt(i));
                treemap.put(s.charAt(i), ++count);
            }else {
                treemap.put(s.charAt(i), 1);
            }
        }

        //StringBuilder result = new StringBuilder();
        //treemap.forEach((key, value) -> result.append(key).append("(").append(value).append(")"));

        StringJoiner result = new StringJoiner("","","");
        treemap.forEach((key, value) -> result.add(key + "").add("(").add(value + "").add(")"));
        System.out.println(result);
    }
}

//输出：a(6)b(4)c(3)d(2)e(1)
```

## 第七章 HashMap及TreeMap底层原理

### 7.1 HashMap源码分析

1. 看源码之前需要了解的一些内容

```java
Node<K,V>[] table  // 哈希表结构中数组的名字

DEFAULT_INITIAL_CAPACITY  // 数组默认长度16

DEFAULT_LOAD_FACTOR  // 默认加载因子0.75
```

2. HashMap里面每一个对象包含以下内容：
   1. 链表中的键值对对象,包含：
    ```java
    int hash;         //键的哈希值
    final K key;      //键
    V value;          //值
    Node<K,V> next;   //下一个节点的地址值
    ```
    2. 红黑树中的键值对对象,包含：
    ```java
    int hash;         		//键的哈希值
    final K key;      		//键
    V value;         	 	//值
    TreeNode<K,V> parent;  	//父节点的地址值
    TreeNode<K,V> left;		//左子节点的地址值
    TreeNode<K,V> right;	//右子节点的地址值
    boolean red;			//节点的颜色
    ```

3. 添加元素的时候至少考虑三种情况：
   1. 数组位置为null
   2. 数组位置不为null，键不重复，挂在下面形成链表或者红黑树
   3. 数组位置不为null，键重复，元素覆盖


**源码分析：**

```java
//参数一：键
//参数二：值

//返回值：被覆盖元素的值，如果没有覆盖，返回null
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}


//利用键计算出对应的哈希值，再把哈希值进行一些额外的处理
//简单理解：返回值就是返回键的哈希值
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}

//参数一：键的哈希值
//参数二：键
//参数三：值
//参数四：如果键重复了是否保留
//		   true，表示老元素的值保留，不会覆盖
//		   false，表示老元素的值不保留，会进行覆盖
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,boolean evict) {
	    //定义一个局部变量，用来记录哈希表中数组的地址值。
        Node<K,V>[] tab;
		
		//临时的第三方变量，用来记录键值对对象的地址值
        Node<K,V> p;
        
		//表示当前数组的长度
		int n;
		
		//表示索引
        int i;
		
		//把哈希表中数组的地址值，赋值给局部变量tab
		tab = table;

        if (tab == null || (n = tab.length) == 0){
			//1.如果当前是第一次添加数据，底层会创建一个默认长度为16，加载因子为0.75的数组
			//2.如果不是第一次添加数据，会看数组中的元素是否达到了扩容的条件
			//如果没有达到扩容条件，底层不会做任何操作
			//如果达到了扩容条件，底层会把数组扩容为原先的两倍，并把数据全部转移到新的哈希表中
			tab = resize();
			//表示把当前数组的长度赋值给n
            n = tab.length;
        }

		//拿着数组的长度跟键的哈希值进行计算，计算出当前键值对对象，在数组中应存入的位置
		i = (n - 1) & hash;//index
		//获取数组中对应元素的数据
		p = tab[i];
		
		
        if (p == null){
			//底层会创建一个键值对对象，直接放到数组当中
            tab[i] = newNode(hash, key, value, null);
        }else {
            Node<K,V> e;
            K k;
			
			//等号的左边：数组中键值对的哈希值
			//等号的右边：当前要添加键值对的哈希值
			//如果键不一样，此时返回false
			//如果键一样，返回true
			boolean b1 = p.hash == hash;
			
            if (b1 && ((k = p.key) == key || (key != null && key.equals(k)))){
                e = p;
            } else if (p instanceof TreeNode){
				//判断数组中获取出来的键值对是不是红黑树中的节点
				//如果是，则调用方法putTreeVal，把当前的节点按照红黑树的规则添加到树当中。
                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
            } else {
				//如果从数组中获取出来的键值对不是红黑树中的节点
				//表示此时下面挂的是链表
                for (int binCount = 0; ; ++binCount) {
                    if ((e = p.next) == null) {
						//此时就会创建一个新的节点，挂在下面形成链表
                        p.next = newNode(hash, key, value, null);
						//判断当前链表长度是否超过8，如果超过8，就会调用方法treeifyBin
						//treeifyBin方法的底层还会继续判断
						//判断数组的长度是否大于等于64
						//如果同时满足这两个条件，就会把这个链表转成红黑树
                        if (binCount >= TREEIFY_THRESHOLD - 1)
                            treeifyBin(tab, hash);
                        break;
                    }
					//e：			  0x0044  ddd  444
					//要添加的元素： 0x0055   ddd   555
					//如果哈希值一样，就会调用equals方法比较内部的属性值是否相同
                    if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k)))){
						 break;
					}

                    p = e;
                }
            }
			
			//如果e为null，表示当前不需要覆盖任何元素
			//如果e不为null，表示当前的键是一样的，值会被覆盖
			//e:0x0044  ddd  555
			//要添加的元素： 0x0055   ddd   555
            if (e != null) {
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null){
					
					//等号的右边：当前要添加的值
					//等号的左边：0x0044的值
					e.value = value;
				}
                afterNodeAccess(e);
                return oldValue;
            }
        }
		
        //threshold：记录的就是数组的长度 * 0.75，哈希表的扩容时机  16 * 0.75 = 12
        if (++size > threshold){
			 resize();
		}
        
		//表示当前没有覆盖任何元素，返回null
        return null;
    }
```