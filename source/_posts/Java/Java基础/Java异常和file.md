---
title: Java异常和file
tags: Java
categories: Java
top_img: transparent
date: 2025-4-18 20:00:00
copyright: false
description: Java异常和file
cover: ../image/Java/Java异常和file/1.JPG
---

**2025.04.18**
# 异常和file

## 一、异常
### 1.1 异常体系介绍
* 异常体系：
  * Java.lang.Throwable
    * Error：代表系统级别错误（属于严重问题）。系统一旦出现问题，sun公司会把这些错误封装成Error对象。Error是给sun公司自己用的，不是给程序员用的，所以我们开发人员不用管它。
    * Exception：叫做异常，代表程序可能出现的问题。我们通常会用Exception以及它的子类来封装程序出现的问题。
      * RuntimeException及其子类：运行时异常，编译阶段不会出现异常提醒，运行时出现的异常（如：数组索引越界异常）
      * 其他异常：编译时异常，编译阶段就会出现异常提醒（如：文件找不到异常）。

![异常体系](/image/Java/Java异常和file/异常体系.png)

### 1.2 运行时异常和编译时异常

![](/image/Java/Java异常和file/运行时异常和编译时异常1.png)

示例：
```java
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ExceptionDemo1 {
    public static void main(String[] args) throws ParseException {
        // 编译时异常(在编译阶段，必须手动处理，否则代码报错)
        String time = "2030年1月1日";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
        Date date = sdf.parse(time);
        System.out.println(date);

        // 运行时异常(在编译阶段是不需要处理的，是代码运行时出现的异常)
        int[] arr = {1, 2, 3, 4, 5};
        System.out.println(arr[10]);  // ArrayIndexOutOfBoundsException
    }
}
```
![](/image/Java/Java异常和file/运行时异常和编译时异常2.png)

* 编译时异常：除了RuntimeException及其子类，其他的异常都是编译时异常。编译阶段需要进行处理，作用在于提醒程序员
* 运行时异常：RuntimeException及其子类，编译阶段不需要处理，运行时出现的异常。


### 1.3 异常的作用

* 作用一：异常是用来查询bug的关键参考信息
* 作用二：异常可以作为方法内部的一种特殊返回值，以便通知调用者底层的执行情况


示例：
```java
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
    // 设置异常
    public void setAge(int age) {
        if (age < 18 || age > 40) {
            throw new RuntimeException();
        }else {
            this.age = age;
        }
    }

    public String toString() {
        return "Student{name = " + name + ", age = " + age + "}";
    }
}
```


```java
public class Main {
    public static void main(String[] args) {

        Student s = new Student();
        s.setAge(50);
    }
}

// 运行结果：Exception in thread "main" java.lang.RuntimeException
//             	at Student.setAge(Student.java:44)
//            	at Main.main(Main.java:5)
```

### 1.4 异常的处理方式
* 异常的处理方式：
  * JVM默认的处理方式
  * 自己处理(捕获异常)
  * 抛出异常

#### 1.4.1 JVM默认的处理方式
* 把异常的名称，异常原因以及异常出现的位置等信息输出在了控制台上
* 程序停止执行，下面的代码不再执行


#### 1.4.2 自己处理(捕获异常)
* 格式：
```java
try {
    // 可能出现异常的代码
} catch (异常类型 变量名) {
    // 异常处理代码
} finally {
    // 无论是否出现异常，都会执行的代码
}
```
* 目的：当代码出现异常时，可以让程序继续执行下去，而不是停止执行

示例：
```java 
public class ExceptionDemo2 {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        try{
            // 可能出现异常的代码
            // 此处出现了异常，程序就会在这里创建一个ArrayIndexOutOfBoundsException对象
            // 拿着这个对象到catch的小括号中对比，看括号中的变量是否可以接收这个对象
            // 如果可以接收，就表示该异常被捕获，就会执行catch中的代码
            // 当catch中的代码执行完毕后，程序就会继续向下执行
            System.out.println(arr[10]);  
        }catch(ArrayIndexOutOfBoundsException e){
            System.out.println("索引越界");
        }
        System.out.println("是否执行了");
    }
}

// 输出：索引越界
//       是否执行了
```

**四个问题：**
1. 如果try中没有遇到问题，怎么执行？
会把try中的所有代码全部执行，不会执行catch里面的代码
注意：只有当出现了异常才会执行catch中的代码

2. 如果try中遇到多个问题，怎么执行？
写多个catch与之对应
注意：
* 如果我们要捕获多个异常，这些异常如果存在父子关系的话，那么父类一定要写在下面(因为多态的关系，子类都满足父类的类型，所以不会往下执行)
* 用多个catch也不能捕获多个异常，会在捕获第一个异常时跳出
* JDK7之后，一个catch中可以写多个异常，使用|分隔开，注意：多个异常的catch中不能有相同的代码

3. 如果try中遇到的问题没有被捕获，怎么执行？
此时相当于try...catch代码白写了，最终还是会交给虚拟机进行处理

4. 如果try中遇到了问题，那么try下面的其它代码还会执行吗？
下面的代码就不会执行了，直接跳转到对应的catch中执行catch中的代码
但是如果没有对应的catch与之匹配，那么还是会交给虚拟机进行处理


### 1.5 Throwable的成员方法
* public String getMessage()：返回此throwable的详细消息字符串
* public String toString()：返回此可抛出的简短描述
* public void printStackTrace()：把异常的错误信息输出在控制台上

示例：
```java
public class ExceptionDemo3 {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};

        // 快捷键ctrl + alt + t
        try {
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
//            String str1 = e.getMessage();
//            System.out.println(str1);  // Index 10 out of bounds for length 5

//            String str2 = e.toString();
//            System.out.println(str2);  // java.lang.ArrayIndexOutOfBoundsException: Index 10 out of bounds for length 5


            // 细节：仅仅是打印信息，不会停止程序运行
            e.printStackTrace();
            // java.lang.ArrayIndexOutOfBoundsException: Index 10 out of bounds for length 5
            //	at ExceptionDemo3.main(ExceptionDemo3.java:7)
        }

        System.out.println("看看我执行了吗");
    }
}
```

### 1.6 抛出处理
* throws：写在方法定义处，表示声明一个异常。告诉调用者使用本方法可能会有哪些异常
  * 格式：
    ```java
    public void method() throws 异常类型1, 异常类型2, ... {
        // 可能出现异常的代码
    }
    ``` 
  * 编译时异常：必须要写
  * 运行时异常：可以不写
* throw：写在方法内，结束方法。手动抛出异常对象交给调用者。方法中下面的代码不再执行
  * 格式：
    ```java
    public void method() {
        // 可能出现异常的代码
        throw new NullPointerException();
    }
    ```

示例：
```java
public class Exception4 {
    public static void main(String[] args) {
        int[] arr = {};
        int max = 0;
        try {
            max = getMx(arr);
        } catch (NullPointerException e) {
            System.out.println("空指针异常");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("索引越界异常");
        }
        System.out.println(max);
    }


    public static int getMx(int[] arr) /*throws NullPointerException, ArrayIndexOutOfBoundsException*/ {
        if (arr == null) {
            // 手动创建一个异常对象，并把这个异常交给方法的调用者处理
            // 此时方法就会结束，下面的代码不会再执行
            throw new NullPointerException();
        }

        if (arr.length == 0) {
            throw new ArrayIndexOutOfBoundsException();
        }
        System.out.println("看看我执行了吗");

        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (max < arr[i]) {
                max = arr[i];
            }
        }
        return max;
    }
}
```

### 1.7 练习
需求：
* 键盘录入自己心仪的女朋友的姓名和年龄
* 姓名的长度在3~10之间
* 年龄的范围在18~40岁
* 超出这个范围是异常数据不能赋值，需重新录入，一直录到正确为止
提示：
* 需要考虑用户在键盘录入时的所有情况
* 比如：录入年龄超出范围，录入姓名时录入了abc等情况

```java
// GirlFriend类
public class GirlFriend {
    private String name;
    private int age;


    public GirlFriend() {
    }

    public GirlFriend(String name, int age) {
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
        int len = name.length();
        if (len < 3 || len > 10) {
            throw new RuntimeException();
        }
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
        if (age < 18 || age > 40) {
            throw new RuntimeException();
        }
        this.age = age;
    }

    public String toString() {
        return "GirlFriend{name = " + name + ", age = " + age + "}";
    }
}
```

```java
import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        GirlFriend girlFriend = new GirlFriend();

        while (true) {
            try {
                System.out.println("请输入女朋友的名字：");
                String name = sc.nextLine();
                girlFriend.setName(name);

                System.out.println("请输入女朋友的年龄：");
                String ageStr = sc.nextLine();
                int age = Integer.parseInt(ageStr);
                girlFriend.setAge(age);

                // 如果所有数据都正确则跳出循环
                break;
            } catch (NumberFormatException e) {
                System.out.println("年龄的格式有误，请输入数字");
            } catch (RuntimeException e) {
                System.out.println("姓名的长度或年龄的范围有误");
            }
        }

        System.out.println(girlFriend);
    }
}
```

### 1.8 自定义异常
* 步骤： 
  1. 定义异常类
  2. 写继承关系
  3. 空参构造
  4. 带参构造

示例：
```java
// NameFormatException类
public class NameFormatException extends RuntimeException {
    // 技巧：
    // NameFormat: 当前异常的名字，表示姓名格式化问题
    // Exception: 表示当前是一个异常

    // 运行时: RuntimeException 核心 就表示由于参数错误而导致的问题
    // 编译时: Exception 核心 提醒程序员检查本地信息


    public NameFormatException() {
    }

    public NameFormatException(String message) {
        super(message);
    }
}
```

```java
// AgeOutOfBoundException类
public class AgeOutOfBoundException extends RuntimeException{
    public AgeOutOfBoundException() {
    }

    public AgeOutOfBoundException(String message) {
        super(message);
    }
}
```

```java
// GirlFriend类
public class GirlFriend {
    private String name;
    private int age;


    public GirlFriend() {
    }

    public GirlFriend(String name, int age) {
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
        int len = name.length();
        if (len < 3 || len > 10) {
            throw new NameFormatException(name + "格式有误，长度应该为 3~10");
        }
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
        if (age < 18 || age > 40) {
            throw new AgeOutOfBoundException(age + "不在 18~40");
        }
        this.age = age;
    }

    public String toString() {
        return "GirlFriend{name = " + name + ", age = " + age + "}";
    }
}
```

```java
import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        GirlFriend girlFriend = new GirlFriend();

        while (true) {
            try {
                System.out.println("请输入女朋友的名字：");
                String name = sc.nextLine();
                girlFriend.setName(name);

                System.out.println("请输入女朋友的年龄：");
                String ageStr = sc.nextLine();
                int age = Integer.parseInt(ageStr);
                girlFriend.setAge(age);

                // 如果所有数据都正确则跳出循环
                break;
            } catch (NumberFormatException e) {
                e.printStackTrace();
            } catch (NameFormatException e) {
                e.printStackTrace();
            } catch (AgeOutOfBoundException e) {
                e.printStackTrace();
            }
        }

        System.out.println(girlFriend);
    }
}
```