---
title: Java学习笔记
tags: Java
categories: Java
top_img: transparent
date: 2025-1-2 00:00:00
copyright: false
description: Java学习笔记
cover: ../image/Java学习笔记/1.JPG
---

**2025.01.02**
# 第一章 Java入门
## 1.1 Java数据类型包括：
* 整数：byte,short,int,long(需要加上L标识)
* 浮点数：float(需要加上F标识),double
* 字符：char
* 布尔：bool

## 1.2 Java键盘输入输出：
```java
import java.util.Scanner;

//键盘录入
Scanner sc = new Scanner(System.in);
int i = sc.nextIn();
//输出
System.out.println(i);
```

## 1.3 隐式转化
Java中的数据类型转换遵循两个原则：
* 取值范围小的和取值范围大的进行运算，小的会先提升为大的再运算
* byte,short,char在运算时都会直接升为int再计算

## 1.4 数组的动态初始化
格式：数据类型[] 数组名 = new 数据类型[数组长度]
例如：
```java
int[] arr = new int[3];
```

## 1.5 随机数
随机数的使用：
```java
import java.util.Random;

Random r = new Random();
int number = r.nextInt(100) + 1;  //生成1~100的随机数
```

# 第二章 方法
## 2.1 方法
```java
//定义格式
public static void 方法名(){
    方法体；
}

//调用
方法名();
```

## 2.2 带参方法
```java
//定义格式
public static void 方法名(参数1, 参数2, ...){
    方法体;
}

//调用
方法名(参数1, 参数2, ...);
```

## 2.3 带返回值的方法
```java
//定义格式
public static 返回值类型 方法名(参数){
    方法体;
    return 返回值;
}

//调用(三种)
方法名(实参);
类型 变量名 = 方法名(实参);
System.out.println(方法名(实参));
```

## 2.4 方法的重载
* 在同一个类中定义了多个同名的方法，这些同名的方法具有同种功能
* 每个方法具有不同的参数类型或参数个数
* 简单来说就是：同一个类中，方法名相同，参数不同的方法

# 第三章 面向对象


# 第四章 字符串
## 4.1 创建string对象的两种方式
1. 直接赋值 
```java
String s1 = "abc";
```
2. new
```java
//1.空参构造
String s2 = new String();

//2.传递一个字符串
String s3 = new String("abc");

//3.传递一个字符数组
char[] chs = {'a', 'b', 'c', 'd'};
String s4 = new String(chs);

//4.传递一个字节数组
byte[] bytes = {97, 98, 99, 100};  //先转换成对应的ASCII码再进行拼接
String s5 = new String(bytes);

//输出为：abcd
```

## 4.2 字符串的常用方法
### 4.2.1 字符串的比较
“==”到底比较的是什么？
* 对于基本数据类型来说，比较的是数据值
* 对于引用数据类型来说，比较的是**地址值** 

字符串的比较：
1. boolen equals(要比较的字符串)：完全一样才是true，不忽略大小写
2. boolen equalIgnoreCase(要比较的字符串)：忽略大小写

### 4.2.2 遍历字符串
public char charAt(int index)：根据索引值返回字符
```java
for (int i = 0; i < str.length(); i++) {
    char c = str.charAt(i);
    System.out.println(c);
}
```

### 4.2.3 截取字符串
String substring(int beginIndex, int endIndex)：根据索引返回字符(包左不包右)
```java
String str = HelloWorld;
String cut = str.substring(0, 5);
System.out.println(cut);
//输出：Hello
```

### 4.2.4 替换字符串
String replace(旧值, 替换值)：将字符串中的旧值替换为替换值
```java
String phoneNumber = 15623838156;
phoneNumber = phoneNumber.replace("2383", "****");
System.out.println(phoneNumber);
//输出：156****8156
```

## 4.3 StringBuilder
StringBuilder是Java已经写好的类，Java在底层对它做了一些特殊处理，打印对象不是地址值而是属性值
### 4.3.1 StringBuilder构造方法
* public StringBuilder()：创建一个空白可变字符串对象，不含有任何内容
* public StringBuilder()：根据字符串的内容来创建可变字符串对象

例如：
```java
StringBuilder sb = new StringBuilder("abc");
```

### 4.3.2 StringBuilder常用方法
* public StringBuilder append(任意类型)：添加数据，并返回对象本身
* public StringBuilder reverse()：反转容器中的内容
* public int length()：返回长度(字符出现的个数)
* public String toString()：通过toString()就可以实现把StringBuilder转换为String

例：
```java
public class SB {
    public static void main(String[] args) {
        //创建对象
        StringBuilder sb = new StringBuilder("abc");
        
        //添加元素
        sb.append(1);
        
        //反转
        sb.reverse();
        
        //获取长度
        int len = sb.length();
        System.out.println(len);

        //转换为String
        String str = sb.toString();
        System.out.println(str);
    }
}
//输出为: 4
//       1cba
```

## 4.4 StringJoiner
* StringJoiner跟StringBuilder一样，也可以看成是一个容器，创建之后里面的内容是可变的
* 作用：提高字符串的操作效率，而且代码编写特别简洁，但是目前市场上很少有人用
* JDK8时出现
### 4.4.1 StringJoiner的构造方法
* public StringJoiner(间隔符号)：创建一个StringJoiner对象，指定拼接时间的间隔符号
* public StringJoiner(间隔符号, 开始符号, 结束符号)：创建一个StringJoiner对象，指定拼接时的间隔符号、开始符号和结束符号

例如：
```java
public class sj {
    public static void main(String[] args) {
        //创建对象
        StringJoiner sj = new StringJoiner("---");
        
        //添加元素
        sj.add("aaa").add("bbb").add("ccc");
        
        //打印结果
        System.out.println(sj);
    }
}
//输出为：aaa---bbb---ccc
```

### 4.4.2 StringJoiner成员方法
* public StringJoiner add(添加的内容)：添加数据并返回对象本身
* public int length()：返回长度(字符串出现的个数)
* public String toString()：返回一个字符串(该字符串就是拼接之后的结果)

例：
```java
public class sj {
    public static void main(String[] args) {
        //创建对象
        StringJoiner sj = new StringJoiner(",", "[", "]");
        
        //添加元素
        sj.add("aaa").add("bbb").add("ccc");
        
        //长度
        int len = sj.length();
        System.out.println(len);  //15
        
        //toString
        String str = sj.toString();
        
        //打印结果
        System.out.println(str);
    }
}
//输出为: 15
//       aaa---bbb---ccc
```

---------------------------------------------------- 
**2025.01.03**

# 第五章 集合

## 5.1 集合
集合和数组的区别：
* 长度：数组长度不可变，集合长度可变
* 存储类型：数组可以存储基本数据类型和引用数据类型，但集合只能存储引用数据类型，如果要存储基本数据类型，则需要将其进行包装后在存储
  
## 5.2 ArrayList
### 5.2.1 ArrayList构造方法
* ArrayList<E> list = new ArrayList<>()
* E代表泛型，用于限定集合中存储数据的类型
* ArrayList是java中已经写好的一个类，这个类在打印时打印的不是地址值而是集合中存储的数据内容，在展示时会拿[]把所有的数据进行包裹
  
### 5.2.2 ArrayList成员方法
* boolean add(E e)：添加元素，返回值表示是否添加成功
* boolean remove(E e)：删除指定元素，返回值表示是否删除成功
* E remove(int index)：删除指定索引的元素，返回被删除元素
* E set(int index,E e)：修改指定索引下的元素，返回原来的元素
* E get(int index)：获取指定索引的元素
* int size()：集合的长度，也就是集合中元素的个数

例：
```java
public class list {
    public static void main(String[] args) {
        //创建一个对象
        ArrayList<String> list = new ArrayList<>();

        //添加元素
        list.add("aaa");
        list.add("bbb");
        list.add("ccc");
        list.add("ddd");
        System.out.println("增：" + list);

        //删除元素
        //根据元素内容删除元素
        list.remove("abc");
        //根据索引删除元素,返回被删除元素
        String str1 = list.remove(1);
        System.out.println("删：" + str1);
        System.out.println("删：" + list);

        //修改元素,返回被修改的元素
        String str2 = list.set(1, "eee");
        System.out.println("改：" + str2);
        System.out.println("改：" + list);

        //查询元素
        String str3 = list.get(0);
        System.out.println("查：" + str3);

        //集合长度
        int size = list.size();
        System.out.println("长度：" + size);
    }
}
//运行结果：
//增：[aaa, bbb, ccc, ddd]
//删：bbb
//删：[aaa, ccc, ddd]
//改：ccc
//改：[aaa, eee, ddd]
//查：aaa
//长度：3
```

### 5.2.3 基本数据类型对应的包装类
ArrayList在进行数据存储时，不能直接存储基本数据类型，而是要使用基本数据类型的包装类，常见基本数据类型所对应的包装类如下：
| 基本数据类型 | 包装类    |
| ------------ | --------- |
| byte         | Byte      |
| short        | Short     |
| char         | Character |
| int          | Integer   |
| long         | Long      |
| float        | Float     |
| double       | Double    |
| boolean      | Boolean   |

例：
```java
public class test2 {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();

        //添加元素
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);

        System.out.println(list);
    }
}
```

## 5.3 学生管理系统
**案例需求：**
针对目前我们的所学内容，完成一个综合案例：学生管理系统。该系统主要功能如下：
* 1.添加学生：通过键盘录入学生信息，添加到集合中
* 2.删除学生：通过键盘录入要删除学生的学号，将该学生对象从集合中删除
* 3.修改学生：通过键盘录入要修改学生的学号，将该学生对象其他信息进行修改
* 4.查看学生：将集合中的学生对象信息进行展示
* 5.退出系统：结束程序

实现如下：
### 5.3.1 总菜单的实现
```java
//总菜单
public static void menu(ArrayList<Student> list){
        System.out.println("----------欢迎来到黑马学生管理系统----------");
        System.out.println("1：添加学生");
        System.out.println("2：删除学生");
        System.out.println("3：修改学生");
        System.out.println("4：查询学生");
        System.out.println("5：退出");
        System.out.println("请输入您的选择:");

        Scanner sc = new Scanner(System.in);
        int i = sc.nextInt();


        if(i == 1){
            System.out.println("请输入您要录入学生的个数：");
            int n = sc.nextInt();
            addStudent(list, n);
        }else if(i == 2){
            System.out.println("请输入您要删除的学生id：");
            String id = sc.next();;
            deleteStudent(list, id);
        }else if(i == 3){
            System.out.println("请输入您要修改的学生id：");
            String id = sc.next();
            changeStudent(list, id);
        }else if(i == 4){
            System.out.println("请输入您要查询的学生id：");
            String id = sc.next();
            searchStudent(list, id);
        }else if(i == 5){
            System.out.println("退出成功，感谢您的使用！");
        }else {
            System.out.println("输入无效，再见。");
        }
    }
```

### 5.3.2 添加功能的实现
```java
public static void addStudent(ArrayList<Student> list, int n){
        Scanner sc1 = new Scanner(System.in);
        for (int i = 0; i < n; i++) {
            Student stu = new Student();
            System.out.println("请输入您需要添加的学生的id:");
            String id = sc1.next();
            if(isIdExist(list, id)){
                System.out.println("您输入的学生id已存在，请重新输入：");
                id = sc1.next();
            }
            stu.setId(id);
            System.out.println("请输入学生的姓名：");
            String name = sc1.next();
            stu.setName(name);
            System.out.println("请输入学生的年龄：");
            int age = sc1.nextInt();
            stu.setAge(age);
            System.out.println("请输入学生的家庭住址：");
            String home = sc1.next();
            stu.setHome(home);
            list.add(stu);
        }
        System.out.println("添加完成，已返回主菜单，请继续操作：");
        System.out.println("目前的学生信息有：");
        cover(list);
        menu(list);
    }
```

### 5.3.3 删除功能的实现
```java
public static void deleteStudent(ArrayList<Student> list,String id){
        if(isIdExist(list, id)){
            for (int i = 0; i < list.size(); i++) {
                Student stu = list.get(i);
                if(stu.getId().equals(id)){
                    list.remove(stu);
                }
            }
            System.out.println("删除完成，已返回主菜单，请继续操作：");
            System.out.println("目前的学生信息有：");
            cover(list);
            menu(list);
        }else {
            System.out.println("输入id不存在,请重新选择功能：");
            menu(list);
        }
    }
```

### 5.3.4 修改功能的实现
```java
public static void changeStudent(ArrayList<Student> list, String id){
        if(isIdExist(list, id)){
            for (int i = 0; i < list.size(); i++) {
                Student stu = list.get(i);
                if(stu.getId().equals(id)){
                    System.out.println("请选择要修改的学生信息：");
                    System.out.println("1：学生id");
                    System.out.println("2：学生姓名：");
                    System.out.println("3：学生年龄：");
                    System.out.println("4：学生家庭住址：");
                    Scanner sc = new Scanner(System.in);
                    int choice = sc.nextInt();
                    if(choice == 1){
                        System.out.println("请输入修改后的id：");
                        String new_id = sc.next();
                        stu.setId(new_id);
                    }else if(choice == 2){
                        System.out.println("请输入修改后的姓名：");
                        String new_name = sc.next();
                        stu.setName(new_name);
                    }else if(choice == 3){
                        System.out.println("请输入修改后的年龄：");
                        int new_age = sc.nextInt();
                        stu.setAge(new_age);
                    }else if(choice == 4){
                        System.out.println("请输入修改后的家庭住址：");
                        String new_home = sc.next();
                        stu.setHome(new_home);
                    }else {
                        System.out.println("输入有误，已返回主菜单：");
                        menu(list);
                    }
                }
            }
            System.out.println("修改完成，已返回主菜单，请继续操作：");
            System.out.println("目前的学生信息有：");
            cover(list);
            menu(list);
        }else {
            System.out.println("要修改的id不存在,请重新选择功能：");
            menu(list);
        }
    }
```

### 5.3.5 查询功能的实现
```java
public static void searchStudent(ArrayList<Student> list, String id){
        if(isIdExist(list, id)){
            for (int i = 0; i < list.size(); i++) {
                Student stu = list.get(i);
                if(stu.getId().equals(id)){
                    System.out.println("请选择要查询的学生信息：");
                    System.out.println("1：学生姓名：");
                    System.out.println("2：学生年龄：");
                    System.out.println("3：学生家庭住址：");
                    Scanner sc = new Scanner(System.in);
                    int choice = sc.nextInt();
                    if(choice == 1){
                        String searchName = stu.getName();
                        System.out.println("要查询的学生的姓名是：" + searchName);
                    }else if(choice == 2){
                        int searchAge = stu.getAge();
                        System.out.println("要查询的学生的年龄是：" + searchAge);
                    }else if(choice == 3){
                        String searchHome = stu.getHome();
                        System.out.println("要查询的学生的家庭住址是：" + searchHome);
                    }else {
                        System.out.println("输入有误，已返回主菜单：");
                        menu(list);
                    }
                }
            }
            System.out.println("查询完成，已返回主菜单，请继续操作：");
            menu(list);
        }else {
            System.out.println("输入id不存在,请重新选择功能：");
            menu(list);
        }
    }
```

### 5.3.6 总体实现代码
```java
import java.util.ArrayList;
import java.util.Scanner;

public class system {
    public static void main(String[] args) {
        ArrayList<Student> list = new ArrayList<>();
        menu(list);
    }
    
    //主菜单
    public static void menu(ArrayList<Student> list){
        System.out.println("----------欢迎来到黑马学生管理系统----------");
        System.out.println("1：添加学生");
        System.out.println("2：删除学生");
        System.out.println("3：修改学生");
        System.out.println("4：查询学生");
        System.out.println("5：退出");
        System.out.println("请输入您的选择:");

        Scanner sc = new Scanner(System.in);
        int i = sc.nextInt();


        if(i == 1){
            System.out.println("请输入您要录入学生的个数：");
            int n = sc.nextInt();
            addStudent(list, n);
        }else if(i == 2){
            System.out.println("请输入您要删除的学生id：");
            String id = sc.next();;
            deleteStudent(list, id);
        }else if(i == 3){
            System.out.println("请输入您要修改的学生id：");
            String id = sc.next();
            changeStudent(list, id);
        }else if(i == 4){
            System.out.println("请输入您要查询的学生id：");
            String id = sc.next();
            searchStudent(list, id);
        }else if(i == 5){
            System.out.println("退出成功，感谢您的使用！");
        }else {
            System.out.println("输入无效，再见。");
        }
    }

    //添加功能
    public static void addStudent(ArrayList<Student> list, int n){
        Scanner sc1 = new Scanner(System.in);
        for (int i = 0; i < n; i++) {
            Student stu = new Student();
            System.out.println("请输入您需要添加的学生的id:");
            String id = sc1.next();
            if(isIdExist(list, id)){
                System.out.println("您输入的学生id已存在，请重新输入：");
                id = sc1.next();
            }
            stu.setId(id);
            System.out.println("请输入学生的姓名：");
            String name = sc1.next();
            stu.setName(name);
            System.out.println("请输入学生的年龄：");
            int age = sc1.nextInt();
            stu.setAge(age);
            System.out.println("请输入学生的家庭住址：");
            String home = sc1.next();
            stu.setHome(home);
            list.add(stu);
        }
        System.out.println("添加完成，已返回主菜单，请继续操作：");
        System.out.println("目前的学生信息有：");
        cover(list);
        menu(list);
    }

    //删除功能
    public static void deleteStudent(ArrayList<Student> list,String id){
        if(isIdExist(list, id)){
            for (int i = 0; i < list.size(); i++) {
                Student stu = list.get(i);
                if(stu.getId().equals(id)){
                    list.remove(stu);
                }
            }
            System.out.println("删除完成，已返回主菜单，请继续操作：");
            System.out.println("目前的学生信息有：");
            cover(list);
            menu(list);
        }else {
            System.out.println("输入id不存在,请重新选择功能：");
            menu(list);
        }
    }

    //修改功能
    public static void changeStudent(ArrayList<Student> list, String id){
        if(isIdExist(list, id)){
            for (int i = 0; i < list.size(); i++) {
                Student stu = list.get(i);
                if(stu.getId().equals(id)){
                    System.out.println("请选择要修改的学生信息：");
                    System.out.println("1：学生id");
                    System.out.println("2：学生姓名：");
                    System.out.println("3：学生年龄：");
                    System.out.println("4：学生家庭住址：");
                    Scanner sc = new Scanner(System.in);
                    int choice = sc.nextInt();
                    if(choice == 1){
                        System.out.println("请输入修改后的id：");
                        String new_id = sc.next();
                        stu.setId(new_id);
                    }else if(choice == 2){
                        System.out.println("请输入修改后的姓名：");
                        String new_name = sc.next();
                        stu.setName(new_name);
                    }else if(choice == 3){
                        System.out.println("请输入修改后的年龄：");
                        int new_age = sc.nextInt();
                        stu.setAge(new_age);
                    }else if(choice == 4){
                        System.out.println("请输入修改后的家庭住址：");
                        String new_home = sc.next();
                        stu.setHome(new_home);
                    }else {
                        System.out.println("输入有误，已返回主菜单：");
                        menu(list);
                    }
                }
            }
            System.out.println("修改完成，已返回主菜单，请继续操作：");
            System.out.println("目前的学生信息有：");
            cover(list);
            menu(list);
        }else {
            System.out.println("要修改的id不存在,请重新选择功能：");
            menu(list);
        }
    }

    //查询功能
    public static void searchStudent(ArrayList<Student> list, String id){
        if(isIdExist(list, id)){
            for (int i = 0; i < list.size(); i++) {
                Student stu = list.get(i);
                if(stu.getId().equals(id)){
                    System.out.println("请选择要查询的学生信息：");
                    System.out.println("1：学生姓名：");
                    System.out.println("2：学生年龄：");
                    System.out.println("3：学生家庭住址：");
                    Scanner sc = new Scanner(System.in);
                    int choice = sc.nextInt();
                    if(choice == 1){
                        String searchName = stu.getName();
                        System.out.println("要查询的学生的姓名是：" + searchName);
                    }else if(choice == 2){
                        int searchAge = stu.getAge();
                        System.out.println("要查询的学生的年龄是：" + searchAge);
                    }else if(choice == 3){
                        String searchHome = stu.getHome();
                        System.out.println("要查询的学生的家庭住址是：" + searchHome);
                    }else {
                        System.out.println("输入有误，已返回主菜单：");
                        menu(list);
                    }
                }
            }
            System.out.println("查询完成，已返回主菜单，请继续操作：");
            menu(list);
        }else {
            System.out.println("输入id不存在,请重新选择功能：");
            menu(list);
        }
    }
    
    //判断id是否存在
    public static boolean isIdExist(ArrayList<Student> list, String id){
        for (int i = 0; i < list.size(); i++) {
            Student s = list.get(i);
            if(s.getId().equals(id)){
                return true;  //已存在返回true
            }
        }
        return false;  //不存在返回false
    }
    
    //遍历列表
    public static void cover(ArrayList<Student> list){
        System.out.println("当前学生个数为：" + list.size());
        for (int n = 0; n < list.size(); n++) {
            Student stu = list.get(n);
            System.out.println(stu.getId() + ", " + stu.getName() + "," + stu.getAge() + "," + stu.getHome());
        }
    }
}
```

### 5.3.7 黑马官方实现代码
```java
public class StudentSystem {
    public static void main(String[] args) {
        ArrayList<Student> list = new ArrayList<>();
        loop:
        while (true) {
            System.out.println("-----------------欢迎来到黑马学生管理系统-------------------");
            System.out.println("1:添加学生");
            System.out.println("2:删除学生");
            System.out.println("3:修改学生");
            System.out.println("4:查询学生");
            System.out.println("5:退出");
            System.out.println("请输入您的选择：");
            Scanner sc = new Scanner(System.in);
            String choose = sc.next();
            switch (choose) {
                case "1" -> addStudent(list);
                case "2" -> deleteStudent(list);
                case "3" -> updateStudent(list);
                case "4" -> queryStudent(list);
                case "5" -> {
                    System.out.println("退出");
                    //break loop;
                    System.exit(0);//停止虚拟机运行
                }
                default -> System.out.println("没有这个选项");
            }
        }
    }

    //添加学生
    public static void addStudent(ArrayList<Student> list) {
        //利用空参构造先创建学生对象
        Student s = new Student();

        Scanner sc = new Scanner(System.in);
        String id = null;
        while (true) {
            System.out.println("请输入学生的id");
            id = sc.next();
            boolean flag = contains(list, id);
            if(flag){
                //表示id已经存在，需要重新录入
                System.out.println("id已经存在，请重新录入");
            }else{
                //表示id不存在，表示可以使用
                s.setId(id);
                break;
            }
        }

        System.out.println("请输入学生的姓名");
        String name = sc.next();
        s.setName(name);

        System.out.println("请输入学生的年龄");
        int age = sc.nextInt();
        s.setAge(age);

        System.out.println("请输入学生的家庭住址");
        String address = sc.next();
        s.setAddress(address);


        //把学生对象添加到集合当中
        list.add(s);

        //提示一下用户
        System.out.println("学生信息添加成功");
    }

    //删除学生
    public static void deleteStudent(ArrayList<Student> list) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入要删除的id");
        String id = sc.next();
        //查询id在集合中的索引
        int index = getIndex(list, id);
        //对index进行判断
        //如果-1，就表示不存在，结束方法，回到初始菜单
        if(index >= 0){
            //如果大于等于0的，表示存在，直接删除
            list.remove(index);
            System.out.println("id为：" + id + "的学生删除成功");
        }else{
            System.out.println("id不存在，删除失败");
        }
    }

    //修改学生
    public static void updateStudent(ArrayList<Student> list) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入要修改学生的id");
        String id = sc.next();

        int index = getIndex(list, id);

        if(index == -1){
            System.out.println("要修改的id" + id + "不存在，请重新输入");
            return;
        }

        //当代码执行到这里，表示什么？表示当前id是存在的。
        //获取要修改的学生对象
        Student stu = list.get(index);

        //输入其他的信息并修改
        System.out.println("请输入要修改的学生姓名");
        String newName = sc.next();
        stu.setName(newName);

        System.out.println("请输入要修改的学生年龄");
        int newAge = sc.nextInt();
        stu.setAge(newAge);

        System.out.println("请输入要修改的学生家庭住址");
        String newAddress = sc.next();
        stu.setAddress(newAddress);

        System.out.println("学生信息修改成功");


    }


    //查询学生
    public static void queryStudent(ArrayList<Student> list) {
        if (list.size() == 0) {
            System.out.println("当前无学生信息，请添加后再查询");
            //结束方法
            return;
        }

        //打印表头信息
        System.out.println("id\t\t姓名\t年龄\t家庭住址");
        //当代码执行到这里，表示集合中是有数据的
        for (int i = 0; i < list.size(); i++) {
            Student stu = list.get(i);
            System.out.println(stu.getId() + "\t" + stu.getName() + "\t" + stu.getAge() + "\t" + stu.getAddress());
        }
    }


    //判断id在集合中是否存在
    public static boolean contains(ArrayList<Student> list, String id) {
        //循环遍历集合得到里面的每一个学生对象
        /*for (int i = 0; i < list.size(); i++) {
            //拿到学生对象后，获取id并进行判断
            Student stu = list.get(i);
            String sid = stu.getId();
            if(sid.equals(id)){
                //存在，true
                return true;
            }
        }
        // 不存在false
        return false;*/
       return getIndex(list,id) >= 0;
    }

    //通过id获取索引的方法
    public static int getIndex(ArrayList<Student> list, String id){
        //遍历集合
        for (int i = 0; i < list.size(); i++) {
            //得到每一个学生对象
            Student stu = list.get(i);
            //得到每一个学生对象的id
            String sid = stu.getId();
            //拿着集合中的学生id跟要查询的id进行比较
            if(sid.equals(id)){
                //如果一样，那么就返回索引
                return i;
            }
        }
        //当循环结束之后还没有找到，就表示不存在，返回-1.
        return -1;
    }
}
```

## 5.4 学生管理系统升级版
### 5.4.1 案例需求
**​为学生管理系统书写一个登陆、注册、忘记密码的功能。只有用户登录成功之后，才能进入到学生管理系统中进行增删改查操作。**

* **登录界面：**
```java
System.out.println("欢迎来到学生管理系统");
System.out.println("请选择操作1登录 2注册 3忘记密码");
```
* **用户类：**
  * 属性：用户名、密码、身份证号码、手机号码

* **注册功能：**
  * 用户名需要满足以下要求：用户名唯一；用户名长度必须在3~15位之间；只能是字母加数字的组合，但是不能是纯数字
  * 密码键盘输入两次，两次一致才可以进行注册。
  * 身份证号码需要验证：长度为18位；不能以0为开头；前17位，必须都是数字；最为一位可以是数字，也可以是大写X或小写x手机号验证：
  * 验证要求：长度为11位；不能以0为开头；必须都是数字

* **登录功能：**
  * 键盘录入用户名
  * 键盘录入密码
  * 键盘录入验证码
  * 验证要求：用户名如果未注册，直接结束方法，并提示：用户名未注册，请先注册；判断验证码是否正确，如不正确，重新输入；再判断用户名和密码是否正确，有3次机会

* **忘记密码：**
  * 键盘录入用户名，判断当前用户名是否存在，如不存在，直接结束方法，并提示：未注册
  * 键盘录入身份证号码和手机号码
  * 判断当前用户的身份证号码和手机号码是否一致，
  * 如果一致，则提示输入密码，进行修改。
  * 如果不一致，则提示：账号信息不匹配，修改失败。

* **验证码规则：**
  * 长度为5
  * 由4位大写或者小写字母和1位数字组成，同一个字母可重复
  * 数字可以出现在任意位置
  * 比如：aQa1K

### 5.4.2 设计思路
#### 5.4.2.1 用户类
```java
public class Users {
    private String userName;
    private String password;
    private String cardId;
    private String phoneNumber;

    public Users() {
    }

    public Users(String userName, String password, String cardId, String phoneNumber) {
        this.userName = userName;
        this.password = password;
        this.cardId = cardId;
        this.phoneNumber = phoneNumber;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
```

#### 5.4.2.2 注册功能
* 用户名验证：
  * 唯一性：遍历list中的用户名，判断输入的用户名是否存在
  * 3-15位：使用user.getuserName().length()进行判断
  * 字母加数字组合：遍历用户名，记录字母个数Letter和数字Number的个数，要求Number < userName.length(),且Letter + Number = userName.length()
* 密码：
  * 输入两次，并判断第二次输入与第一次是否相等equals()
* 身份证号码验证：
  * 长度：cardId.length() == 18
  * 不能以'0'开头：cardId.chatAt(0) != '0'
  * 前17位都是数字：遍历前17位统计数字个数 == 17
  * 最后一位为数字或大小写X：cardId.charAt(17) == 'x' || cardId.charAt(17) == 'X' || (cardId.charAt(17) >= '0' && cardId.charAt(17) <= '9')
* 手机号验证：
  * 长度：phoneNumber.length() == 11
  * 不能以'0'开头：同上
  * 均为数字：同上

#### 5.4.2.3 登录功能
* 键盘录入用户名、密码、验证码
* 验证要求：equals()

#### 5.4.2.4 忘记密码
* 键盘录入用户名，判断是否存在
* 使用用户名查询身份证号码和手机号码，并使用equals()进行一致性判断

#### 5.4.2.5 验证码规则
* 长度：passwors.length()
* 验证码生成：随机生成4位大小写字母和一位数字，组合为一个String后打乱顺序(每个位置的元素与后面的随机元素交换位置)

---------------------------------------------------- 
**2025.01.04**