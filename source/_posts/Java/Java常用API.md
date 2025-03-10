---
title: Java常用API
tags: Java
categories: Java
top_img: transparent
date: 2025-3-3 00:00:00
copyright: false
description: Java常用API
cover: ../image/Java/Java常用API/1.JPG
---

# 第一章 Math
## 1.1 Math介绍
Math类包含用于执行基本数学运算的方法，如初等指数、对数、平方根和三角函数。
Math私有化构造方法，所有方法都是静态的。
Math类所在包为java.lang包，因此在使用的时候不需要进行导包。并且Math类被final修饰了，因此该类是不能被继承的。
## 1.2 Math常用方法
### 1.2.1 abs():获取参数绝对值
* public static int abs(int a): 获取参数绝对值

示例：
```java
public static void main(String[] args){
    int a = -11;
    b = Math.abs(a);
    System.out.println(b);
}

//输出结果：11
```
### 1.2.2 ceil():向上取整
* public static double ceil(double a): 向上取整
  
示例：
```java
public static void main(String[] args){
    System.out.println(Math.ceil(13.2));
    System.out.println(Math.ceil(-13.2));
}

//输出结果：14
//        -13
```
### 1.2.3 floor(double a):向下取整
* public static double floor(double a): 向下取整

示例：
```java
public static void main(String[] args){
    System.out.println(Math.ceil(13.2));
    System.out.println(Math.ceil(-13.2));
}

//输出结果：13
//        -14
```
### 1.2.4 round():四舍五入
* public static int round(float a): 四舍五入

示例：
```java
public static void main(String[] args){
    System.out.println(Math.floor(13.2));
    System.out.println(Math.floor(-13.2));
}

//输出结果：13
//        -13
```
### 1.2.5 max():获取两个值中的最大值
* public static int max(int a,int b): 获取两个int中的较大值

示例：
```java
public static void main(String[] args){
    System.out.println(Math.max(12,16));
}

//输出结果：16
```
### 1.2.6 pow():幂计算
* public static double pow(double a,double b): 返回a的b次幂
* public static double sqrt(double a): 返回a的平方根
* public static double cbrt(double a): 返回a的立方根

示例：
```java
public static void main(String[] args){
    System.out.println(Math.pow(2,3));
}

//输出结果：8
```
### 1.2.7 random():随机数
* public static double random(): 返回值为double的随机数，范围为[0.0,1.0)

示例：
```java
public static void main(String[] args){
    System.out.println(Math.random());
}

//输出结果：0.5
```
# 第二章 System
## 2.1 System介绍
System也是一个工具类，提供了一些与系统相关的方法。
System类所在包为java.lang包，因此在使用的时候不需要进行导包。并且System类被final修饰了，因此该类是不能被继承的。
## 2.2 System常用方法
### 2.2.1 exit():终止当前运行的Java虚拟机
* public static void exit(int status): 终止当前运行的Java虚拟机
* status: 状态码
  * 0：表示当前虚拟机是正常停止
  * 非0：表示当前虚拟机异常停止

示例：
```java
public static void main(String[] args){
    System.exit(0);
    System.out.println("Hello World!");
}

//输出结果:
```
### 2.2.2 currentTimeMillis():返回当前系统的时间毫秒值形式
* public static long currentTimeMillis(): 返回当前系统的时间距离时间原点的毫秒值
* 计算机中的时间原点：1970年1月1日00:00:00(我国处于东八区，所以在我们的操作系统中使用的时间原点为1970年1月1日08:00:00)

示例：
```java
public static void main(String[] args){
    //用于计算程序运行花费多久
    long start = System.currentTimeMillis();

    for (int i = 1; i <= 10000; i++){
        boolean flag = isPrime();
        if(flag){
            System.out.println(i);
        }
    }

    long end = System.currentTimeMillis();

    System.out.println(start - end);
}

//输出结果：88(输出的质数此处省略)
```
### 2.2.3 arraycopy():数组拷贝
* public static void arraycopy(数据源数组,起始索引,目的地数组,起始索引,拷贝个数)
* 注意：
  * 如果数据源数组和目的地数组都是基本数据类型，那么两者的类型必须保持一致，否则会报错
  * 在拷贝数组时需要考虑数组的长度，如果超出范围也会报错
  * 如果数据源数组和目的地数组都是引用数据类型，那么子类类型可以赋值给父类类型

示例：
```java
public static void main(String[] args){
    int[] arr1 = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int[] arr2 = new int[10];
    
    System.arraycopy(arr1, 3, arr2, 4, 5);

    for (int i = 0; i < arr2.length; i++){
        System.out.print(arr2[i] + " ");
    }
}

//输出结果：0 0 0 0 4 5 6 7 8 0
```
注：System.out逻辑：
* System:类名,out:静态变量
* System.out:获取打印的对象
* println():方法
* 参数：表示打印的内容
* 核心逻辑：当我们打印一个对象时，底层会调用对象的toString方法，把对象变成字符，然后再打印在控制台上

# 第三章 Runtime
## 3.1 Runtime介绍
Runtime表示当前虚拟机的运行环境
## 3.2 Runtime常用方法
### 3.2.1 getRuntime():当前系统的运行环境对象
* public static Runtime getRuntime(): 当前系统的运行环境对象

示例：
```java
public static void main(String[] args){
    Runtime r1 = Runtime.getRuntime();
    Runtime r2 = Runtime.getRuntime();
    System.out.println(r1 == r2);
}

//输出：true
```
### 3.2.2 exit():停止虚拟机
* public void exit(int status): 停止虚拟机
* Runtime.getRuntime.exit()实际上是System.exit()的底层源码

示例：
```java
public static void main(String[] args){
    Runtime.getRuntime().exit(0);
    System.out.println("Hello World");
}

//输出：
```
### 3.2.3 availableProcessors():获得CPU线程数
* public int availableProcessors(): 获得CPU线程数

示例：
```java
public static void main(String[] args){
    System.out.println(Runtime.getRuntime().availableProcessors());
}

//输出：16
```
### 3.2.4 maxMemory():JVM能从系统中获取总内存大小
* public long maxMemory(): JVM能从系统中获取总内存大小(单位:byte)

示例：
```java
public static void main(String[] args){
    System.out.println(Runtime.getRuntime().maxMemory() / 1024 / 1024); //单位MB
}

//输出：3548
```
### 3.2.5 totalMemory():JVM已经从系统中获取总内存大小
* public long totalMemory(): JVM已经从系统中获取总内存大小(单位:byte)

```java
public static void main(String[] args){
    System.out.println(Runtime.getRuntime().totalMemory() / 1024 / 1024); //单位MB
}

//输出：222
```
### 3.2.6 freeMemory():JVM剩余内存大小
* public long freeMemory(): JVM剩余内存大小(单位:byte)

```java
public static void main(String[] args){
    System.out.println(Runtime.getRuntime().freeMemory() / 1024 / 1024); //单位MB
}

//输出：219
```
### 3.2.7 exec():运行cmd命令
* public Process exec(String command): 运行cmd命令

```java
public static void main(String[] args) throws IOException {
        Runtime.getRuntime().exec("notepad");
}

//打开记事本
```
# 第四章 Object，Objects
## 4.1 Object介绍
Object是Java中的顶级父类，所有类都直接或间接的继承于Object类。
Object类中的方法可以被所有子类访问。
## 4.2 Object常用方法
### 4.2.1 Object构造方法
Object中只有一个空参构造方法
* public Object(): 空参构造
### 4.2.2 toString():返回对象的字符串表示
* public String toString(): 返回对象的字符串表示
* toString默认取得的是地址值，如果想让其得到参数值，就需要再子类中进行重写

示例：
```java
public static void main(String[] args){
        Object obj = new Object();
        String str1 = obj.toString();
        System.out.println(str1);
}

//输出：java.lang.Object@4eec7777（输出的是str1的地址值） 
```
### 4.2.3 equals():比较两个对象是否相等
* public boolean equals(Object obj): 比较两个对象是否相等 
* equal默认比较的是地址值，如果相比较两个对象的的属性值，就需要进行重写

示例：
```java
public static void main(String[] args){
        Student s1 = new Student("zhangsan", 23);
        Student s2 = new Student("zhangsan", 23);
        
        boolean result = s1.equals(s2);
        System.out.println(result);
}

//输出：重写equals前:false;重写equals后：true

//Student类中重写equals：比较的是内部属性值
public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return age == student.age && Objects.equals(name, student.name);
    }
```
### 4.2.4 clone():对象克隆
* protected Object clone(int a): 对象克隆
* 把A对象的属性值完全拷贝给B对象，也叫对象拷贝，对象复制
* clone是protected，只能被本包中的类和其他包中的子类使用
* Cloneable：如果一个接口里面没有抽象方法，表示当前接口是一个标记性接口
* 现在Cloneable表示一旦实现了，那么当前类的对象就可以被克隆
* clone也需要在子类中进行重写

示例：
```java
//Student类中要重写clone方法并且添加接口Cloneable
public class Student implements Cloneable{
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

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

// 测试类
public static void main(String[] args) throws CloneNotSupportedException {
        Student s1 = new Student("张三", 23);

        Object o1 = (Student)s1.clone();

        System.out.println(s1);
        System.out.println(o1);
}

//输出：Student{name='张三', age=23}
//     Student{name='张三', age=23}
```

对象克隆方式：
* 浅克隆、浅拷贝
  * 对于基本数据类型，会直接拷贝变量记录的数据值
  * 对于引用数据类型，会直接拷贝变量记录的地址值，这会使得在修改克隆得到的变量时，原变量的值也会改变
* 深克隆、深拷贝
  * 对于基本数据类型，会直接拷贝变量记录的数据值
  * 字符串还是会复用
  * 对于引用数据类型，它会重新创建一个对象，记录新对象的地址值
  * 深克隆需要使用第三方工具
* Object中的clone是浅克隆

## 4.3 Objects介绍
Objetcs是一个工具类，提供了一些方法去完成一些功能
## 4.4 Objects常用方法
### 4.4.1 equals():先做非空判断，比较两个对象
* public static boolean equals(Object a,Object b): 先做非空判断，比较两个对象

示例：
```java
public static void main(String[] args){
        Student s1 = null;
        Student s2 = new Student("zhangsan", 23);
        
        boolean result = Objects.equals(s1, s2);
        System.out.println(result);
}

//输出：false
//细节：
//方法的底层会判断s1是否为null，如果为null则直接返回false
//如果s1不是null，则会利用s1再次调用equals方法
//此时s1是Student类型，所以最终还是会调用Student中的equals方法
```
### 4.4.2 isNull():判断对象是否为null，是则返回true
* public static boolean isNull(Object obj):判断对象是否为null，是则返回true

示例：
```java
public static void main(String[] args){
        Student s1 = null;
        Student s2 = new Student("zhangsan", 23);
        
        boolean result1 = Objects.isNull(s1);
        boolean result2 = Objects.isNull(s2);
        System.out.println(result1);
        System.out.println(result2);
}

//输出：true
//     false
```
### 4.4.3 nonNull():判断对象是否为null，跟isNull结果相反
* public static boolean nonNull(Object obj):判断对象是否为null，跟isNull结果相反

示例：
```java
public static void main(String[] args){
        Student s1 = null;
        Student s2 = new Student("zhangsan", 23);
        
        boolean result1 = Objects.isNull(s1);
        boolean result2 = Objects.isNull(s2);
        System.out.println(result1);
        System.out.println(result2);
}

//输出：false
//     true
```

# 第五章 BigInteger
## 5.1 BigInteger介绍
Java中默认是int类型，int类型有取值范围：-2147483648 ~ 2147483647。如果数字过大，我们可以使用long类型，但是如果long类型也表示不下，我们就需要用到BigInteger，可以理解为：大的整数。
​BigInteger理论上最大到42亿的21亿次方。
BigInteger所在包是在java.math包下，因此在使用的时候就需要进行导包。
## 5.2 BigIntger构造方法
### 5.2.1 BigInteger(int num, Random rnd):获取随机大的整数，范围[0~2的num次方]
* public BigInteger(int num, Random rnd):获取随机大的整数，范围[0~2的num次方]

示例：
```java
import java.math.BigInteger;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        Random r = new Random();
        BigInteger b1 = new BigInteger(4, r); //[0,2^4-1]

        System.out.println(b1);
    }
}

// 输出：8
```
### 5.2.2 BigInteger(String val):获取指定大的整数
* public BigInteger(String val):获取指定大的整数
* 字符串中必须是整数，否则会报错

示例：
```java
import java.math.BigInteger;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        BigInteger b2 = new BigInteger("9999999999999999999999");
        System.out.println(b2);
    }
}

// 输出：9999999999999999999999
```
### 5.2.3 BigInteger(String val, int radix):获取指定进制大的整数
* public BigInteger(String val, int radix):获取指定进制大的整数
* 字符串中的数字必须是整数
* 字符串中的数字必须要跟进制吻合

示例：
```java
import java.math.BigInteger;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        BigInteger b3 = new BigInteger("100", 2);
        System.out.println(b3);
    }
}

// 输出：4
```
### 5.2.4 BigInteger(long val):静态方法获取BigInteger的对象
* public staticBigInteger(long val):静态方法获取BigInteger的对象，内部有优化
* 对象一旦创建，内部记录的值不能发生改变
* 能表示的范围比较小，在long的取值范围之内，如果超出long的范围就不行了
* 在内部对常用的数字：-16~16进行了优化：提前把-16~16先创建好BigInteger的对象，如果多次获取不会重新创建新的

示例：
```java
import java.math.BigInteger;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        BigInteger b4 = BigInteger.valueOf(16);
        BigInteger b5 = BigInteger.valueOf(16);
        System.out.println(b4 == b5);

        BigInteger b6 = BigInteger.valueOf(1);
        BigInteger b7 = BigInteger.valueOf(2);
        // 此时，不会修改参与计算的BigInteger对象中的值，而是产生了一个新的BigInteger对象用于记录3
        BigInteger result = b6.add(b7);
        System.out.println(result);

        System.out.println(result == b6);
        System.out.println(result == b7);
    }
}

// 输出：3
//      false
//      false
```
## 5.3 BigInteger常用方法
### 5.3.1 add():加法
* public BigInteger add(BigInteger val): 加法

```java
import java.math.BigInteger;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        BigInteger b1 = BigInteger.valueOf(10);
        BigInteger b2 = BigInteger.valueOf(5);

        BigInteger b3 = bd1.add(b2);
        System.out.println(b3);
    }
}

// 输出：15
```
### 5.3.2 subtract():减法
* public BigInteger subtract(BigInteger val): 减法

```java
import java.math.BigInteger;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        BigInteger b1 = BigInteger.valueOf(10);
        BigInteger b2 = BigInteger.valueOf(5);

        BigInteger b3 = b1.subtract(b2);
        System.out.println(b3);
    }
}

// 输出：5
```
### 5.3.3 multiply():乘法
* public BigInteger multiply(BigInteger val): 乘法

```java
import java.math.BigInteger;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        BigInteger b1 = BigInteger.valueOf(10);
        BigInteger b2 = BigInteger.valueOf(5);

        BigInteger b3 = bd1.multiply(b2);
        System.out.println(b3);
    }
}

// 输出：50
```
### 5.3.4 divide():除法
* public BigInteger divide(BigInteger val): 除法

```java
import java.math.BigInteger;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        BigInteger b1 = BigInteger.valueOf(10);
        BigInteger b2 = BigInteger.valueOf(5);

        BigInteger b3 = bd1.divide(b2);
        System.out.println(b3);
    }
}

// 输出：2
```
### 5.3.5 divideAndRemainder():除法，获取商和余数
* public BigInteger[] divideAndRemainder(BigInteger val): 除法，获取商和余数

```java
import java.math.BigInteger;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        BigInteger b1 = BigInteger.valueOf(10);
        BigInteger b2 = BigInteger.valueOf(5);

        BigInteger[] arr = b1.divideAndRemainder(b2);
        System.out.println(arr[0]);
        System.out.println(arr[1]);
    }
}

// 输出：2
//      0
```
### 5.3.6 equals():比较是否相同
* public boolean equals(Object x): 比较是否相同

```java
import java.math.BigInteger;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        BigInteger b1 = BigInteger.valueOf(10);
        BigInteger b2 = BigInteger.valueOf(5);

        boolean result = b1.equals(b2);
        System.out.println(result);
    }
}

// 输出：false
```
### 5.3.7 pow():次幂
* public BigInteger pow(int exponent): 次幂

```java
import java.math.BigInteger;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        BigInteger b1 = BigInteger.valueOf(10);
        BigInteger b2 = BigInteger.valueOf(5);

        BigInteger b3 = bd1.pow(2);
        System.out.println(b3);
    }
}

// 输出：100
```
### 5.3.8 max/min():返回最大值/最小值
* public BigInteger max/min(BigInteger val): 返回最大值/最小值

```java
import java.math.BigInteger;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        BigInteger b1 = BigInteger.valueOf(10);
        BigInteger b2 = BigInteger.valueOf(5);

        BigInteger b3 = bd1.max(b2);
        System.out.println(b3);
    }
}

// 输出：10
```
### 5.3.9 intValue():转为int类型整数，超出范围数据有误
* public int intValue(BigInteger val): 转为int类型整数，超出范围数据有误

```java
import java.math.BigInteger;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        BigInteger b1 = BigInteger.valueOf(10);
        BigInteger b2 = BigInteger.valueOf(5);

        BigInteger b3 = BigInteger.valueOf(200);
        double v = b3.doubleValue();
        System.out.println(v);
    }
}

// 输出：200.0
```
## 5.4 BigInteger底层存储方式
* 对于计算机而言，其实是没有数据类型的概念的，都是0和1
* BigInterger内部的两个参数：
  * final int signum:用于记录正负号
  * final int[] mag:是一个数组，BigInteger会将数据转化为二进制并按照十进制的方式分段存储到该数组中

![BigInteger的存储方式](/image/Java/Java常用API/BigInteger.png)

# 第六章 BigDecimal
## 6.1 BigDecimal介绍
BigDecimal用于小数的精确计算，用来表示很大的小数
## 6.2 BigDecimal构造方法
BigDeimal构造方法与BigInteger类似
细节：
* 如果要表示的数字不大，没有超出double的取值范围，建议使用静态方法
* 如果要表示的数字比较大，超出了double的取值范围，建议使用构造方法
* 如果valueof传递的是0~10之间的整数，包含0和10，那么方法会返回已经创建好的对象，不会重新new
## 6.3 BigDecimal常用方法
* public static BigDecimal valueOf(double val): 获取对象
* public static BigDecimal add(BigDecimal val): 加法
* public static BigDecimal substract(BigDecimal val): 减法
* public static BigDecimal multiply(BigDecimal val): 乘法
* public static BigDecimal divide(BigDecimal val): 除法
* public static BigDecimal divide(BigDecimal val, 精确几位, 舍入模式): 除法
  * 舍入模式：
    * RoundingMode.UP: 远离零的方向舍入
    * RoundingMode.DOWN: 向零方向的舍入
    * RoundingMode.CEILING: 向正无限大方向的舍入
    * RoundingMode.FLOOR: 向负无限大反向的舍入
    * RoundingMode.HALF_UP: 四舍五入
## 6.4 BigDecimal底层存储方式
BigDecimal会对输入的字符串进行遍历，然后把每一个字符对应的ASCII码存储到一个数组中

# 第七章 正则表达式
## 7.1 正则表达式
正则表达式作用：
* 校验字符串是否满足规则
* 在一段文本中查找满足要求的内容
* 使用matches方法进行校验
* 可在Pattern类中查找正则表达式的构造方式

| 字符类        | 只匹配一个字符                       |
| :------------ | :----------------------------------- |
| [abc]         | 只能是a,b或c                         |
| [^abc]        | 除了a,b,c之外的任何字符              |
| [a-zA-Z]      | a到zA到Z，包括(范围)                 |
| [a-d[m-p]]    | a到d，或m到p                         |
| [a-z&&[def]]  | a-z和def的交集，为d,e,f              |
| [a-z&&[^bc]]  | a-z和非bc的交集，等同于[ad-z]        |
| [a-z&&[^m-p]] | a到z和除了m到p的交集，等同于[a-lq-z] |


示例：
```java
public class Main {
    public static void main(String[] args) {
        //public boolean matches(String regex):判断是否与正则表达式匹配，匹配返回true
        // 只能是a b c
        System.out.println("-----------1-------------");
        System.out.println("a".matches("[abc]")); // true
        System.out.println("z".matches("[abc]")); // false

        // 不能出现a b c
        System.out.println("-----------2-------------");
        System.out.println("a".matches("[^abc]")); // false
        System.out.println("z".matches("[^abc]")); // true
        System.out.println("zz".matches("[^abc]")); //false
        System.out.println("zz".matches("[^abc][^abc]")); //true

        // a到zA到Z(包括头尾的范围)
        System.out.println("-----------3-------------");
        System.out.println("a".matches("[a-zA-z]")); // true
        System.out.println("z".matches("[a-zA-z]")); // true
        System.out.println("aa".matches("[a-zA-z]"));//false
        System.out.println("zz".matches("[a-zA-Z]")); //false
        System.out.println("zz".matches("[a-zA-Z][a-zA-Z]")); //true
        System.out.println("0".matches("[a-zA-Z]"));//false
        System.out.println("0".matches("[a-zA-Z0-9]"));//true


        // [a-d[m-p]] a到d，或m到p
        System.out.println("-----------4-------------");
        System.out.println("a".matches("[a-d[m-p]]"));//true
        System.out.println("d".matches("[a-d[m-p]]")); //true
        System.out.println("m".matches("[a-d[m-p]]")); //true
        System.out.println("p".matches("[a-d[m-p]]")); //true
        System.out.println("e".matches("[a-d[m-p]]")); //false
        System.out.println("0".matches("[a-d[m-p]]")); //false

        // [a-z&&[def]] a-z和def的交集。为:d，e，f
        System.out.println("----------5------------");
        // 求两个范围的交集用且符号：&&
        // 一个&只表示一个'&'符号
        System.out.println("a".matches("[a-z&[def]]")); //true
        System.out.println("d".matches("[a-z&&[def]]")); //true
        System.out.println("0".matches("[a-z&&[def]]")); //false

        // [a-z&&[^bc]] a-z和非bc的交集。(等同于[ad-z])
        System.out.println("-----------6------------_");
        System.out.println("a".matches("[a-z&&[^bc]]"));//true
        System.out.println("b".matches("[a-z&&[^bc]]")); //false
        System.out.println("0".matches("[a-z&&[^bc]]")); //false

        // [a-z&&[^m-p]] a到z和除了m到p的交集。(等同于[a-1q-z])
        System.out.println("-----------7-------------");
        System.out.println("a".matches("[a-z&&[^m-p]]")); //true
        System.out.println("m".matches("[a-z&&[^m-p]]")); //false
        System.out.println("0".matches("[a-z&&[^m-p]]")); //false
    }
}
```

| 预定义字符 | 只匹配一个字符                 |
| :--------- | :----------------------------- |
| .          | 任何字符                       |
| \d         | 一个数字[0-9]                  |
| \D         | 非数字[^0-9]                   |
| \s         | 一个空白字符[\t\n\x0B\f\r]     |
| \S         | 非空白字符[^\s]                |
| \w         | [a-zA-Z_0-9]英文、数字、下划线 |
| \W         | [^\w]一个非单词字符            |

| 数量词 |                       |
| :----- | :-------------------- |
| X?     | X，零次或一次         |
| X*     | X，零次或多次         |
| X+     | X，一次或多次         |
| X{n}   | X，正好n次            |
| X{n,}  | X，至少n次            |
| X{n,m} | X，至少n次但不超过m次 |

示例：
```java
public class RegexDemo {
    public static void main(String[] args) {
        // \ 转义字符 改变后面那个字符原本的含义
        //.表示任意一个字符
        System.out.println("你".matches("..")); //false
        System.out.println("你".matches(".")); //true
        System.out.println("你a".matches(".."));//true

        // \\d 表示任意的一个数字
        // 简单来记:两个\表示一个\
        System.out.println("a".matches("\\d")); // false
        System.out.println("3".matches("\\d")); // true
        System.out.println("333".matches("\\d")); // false

        //\\w只能是一位单词字符[a-zA-Z_0-9]
        System.out.println("z".matches("\\w")); // true
        System.out.println("2".matches("\\w")); // true
        System.out.println("21".matches("\\w")); // false
        System.out.println("你".matches("\\w"));//false

        // 非单词字符
        System.out.println("你".matches("\\W")); // true
        System.out.println("---------------------------------------------");
        // 以上正则匹配只能校验单个字符。


        // 必须是数字 字母 下划线 至少 6位
        System.out.println("2442fsfsf".matches("\\w{6,}"));//true
        System.out.println("244f".matches("\\w{6,}"));//false

        // 必须是数字和字符 必须是4位
        System.out.println("23dF".matches("[a-zA-Z0-9]{4}"));//true
        System.out.println("23 F".matches("[a-zA-Z0-9]{4}"));//false
        System.out.println("23dF".matches("[\\w&&[^_]]{4}"));//true
        System.out.println("23_F".matches("[\\w&&[^_]]{4}"));//false

    }
}
```