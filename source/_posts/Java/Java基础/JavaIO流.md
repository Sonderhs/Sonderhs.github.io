---
title: Java IO流
tags: Java
categories: Java
top_img: transparent
date: 2025-4-20 16:00:00
copyright: false
description: Java IO流
cover: ../image/Java/JavaIO流/1.JPG
---

**2025.04.20**
# Java IO流

## 一、IO流概述
### 1.1 IO流的概念
* File：表示系统中的文件或者文件夹路径，File类只能对文件本身进行操作，不能读写文件里面存储的数据
* IO流：用于读写文件中的数据(可以读写文件，或网络中的数据)

### 1.2 IO流的分类
* IO流的分类
  * 按流的方向
    * 输入流：从外部读取数据到程序中
    * 输出流：将数据从程序中输出到外部
  * 按操作文件类型
    * 字节流：以字节为单位读写数据，适合处理所有类型的文件(图片、音频、视频等)
    * 字符流：以字符为单位读写数据，适合处理文本文件(文本文件、Word文档等)

## 二、字节流
* 字节流分为字节输入流和字节输出流
  * 字节输入流：InputStream
  * 字节输出流：OutputStream
![](/image/Java/JavaIO流/字节流1.png)

### 2.1 字节输出流
* 字节输出流的父类是OutputStream，所有的字节输出流都继承自OutputStream类
* FileOutputStream：操作本地文件的字节输出流，可以把程序中的数据写到本地文件中
* 书写步骤
    1. 创建字节输出流对象
       * 细节1：参数是字符串表示的路径或者是File对象都是可以的
       * 细节2：如果路径不存在，系统会自动创建一个新的文件，但是要保证父级目录存在
       * 细节3：如果文件已经存在，则会清空文件内容，重新写入数据
    2. 写数据
       * write方法的参数是整数，但是实际上写到本地文件中的是整数在ASCII上对应的字符
    3. 释放资源
       * 每次使用完流之后都要释放资源

示例：
```java
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class IOStreamDemo1 {
    public static void main(String[] args) throws IOException {
        // 需求：写出一段文字到本地文件中

        FileOutputStream fos = new FileOutputStream("a.txt");
        fos.write(111);
        fos.close();
    }
}

// 运行后a.txt内容：o
```

* FileOutputStream写数据的3种方式
  * void write(int b)：一次写一个字节数据
  * void write(byte[] b)：一次写一个字节数组数据
  * void write(byte[] b, int off, int len)：一次写一个字节数组数据的一部分，off表示偏移量，len表示长度


示例：
```java
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class IOStreamDemo2 {
    public static void main(String[] args) throws IOException {
        FileOutputStream fos = new FileOutputStream("a.txt");

        // 方法1
        // fos.write(97);  // a

        // 方法2
        byte[] bytes = {97, 98, 99, 100};
        //fos.write(bytes);  // abcd

        // 方法3
        fos.write(bytes, 0, bytes.length - 1);  // abc

        fos.close();
    }
}
```
* FileOutputStream写数据的两个小问题
  * 换行写
    * 再次写出一个换行符就可以了
    * windows系统：\r\n
    * Linux系统：\n
    * Mac系统：\r
  * 续写
    * FileOutputStream的构造方法有一个参数可以设置是否续写，默认是false
    * 如果设置为true，则会在原有文件的基础上进行续写，而不是清空文件内容重新写入

示例：
```java
import java.io.FileOutputStream;
import java.io.IOException;

public class IOStreamDemo3 {
    public static void main(String[] args) throws IOException {
        FileOutputStream fos = new FileOutputStream("a.txt", true);  // 续写

        String str = "HelloWorld";
        byte[] bytes = str.getBytes();
        fos.write(bytes);

        String wrap = "\r\n";
        fos.write(wrap.getBytes());

        String str2 = "666";
        byte[] bytes2 = str2.getBytes();
        fos.write(bytes2);

        fos.close();
    }
}
```

### 2.2 字节输入流
* FileInputStream：操作本地文件的字节输入流，可以把本地文件中的数据读到程序中
* 书写步骤
    1. 创建字节输入流对象
       * 如果文件不存在，系统会报错FileNotFoundException异常
    2. 读数据
       * 细节1：一次读一个字节，读出来的是数据在ASCII上对应的数字
       * 细节2：如果读到文件末尾，返回-1
    3. 释放资源
       * 每次使用完流之后都要释放资源


示例：
```java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class IOStreamDemo4 {
    public static void main(String[] args) throws IOException {
        // 需求：读取文件中的数据
        // a.txt：abc

        FileInputStream fis = new FileInputStream("a.txt");

        int b1 = fis.read();
        System.out.println(b1);
        fis.close();
    }
}


// 运行结果：97
```

* FileInputStream循环读取
  * while循环：每次读一个字节，直到读到-1为止

示例：
```java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class IOStreamDemo4 {
    public static void main(String[] args) throws IOException {
        // 需求：循环读取文件中的数据
        // a.txt：abc

        FileInputStream fis = new FileInputStream("a.txt");

        int b;
        while ((b = fis.read()) != -1) {
            System.out.print((char) b);
        }
        fis.close();
    }
}


// 运行结果：abc
```

### 2.3 文件拷贝
* 核心思想：边读边写

示例：
```java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class IOStreamDemo5 {
    public static void main(String[] args) throws IOException {
        // 需求：文件拷贝
        // 把D:\itheima\movie.mp4拷贝到当前模块下

        FileInputStream fis = new FileInputStream("D:\\itheima\\movie.mp4");
        FileOutputStream fos = new FileOutputStream("myio\\copy.mp4");

        // 边读边写
        int b;
        while ((b = fis.read()) != -1){
            fos.write(b);
        }

        fos.close();
        fis.close();
    }
}
```

* FileInputStream读取的问题
  * IO流：如果拷贝的文件过大，那么速度会很慢
  * 原因：每次读一个字节，效率低
* FileInputStream一次读取多个字节
  * public int read()：一次读取一个字节数据
  * public int read(byte[] buffer)：一次读取一个字节数组数据，返回读取到的字节数
  * public int read(byte[] buffer, int off, int len)：一次读取一个字节数组数据的一部分，返回读取到的字节数，off表示偏移量，len表示长度

示例：
```java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class IOStreamDemo5 {
    public static void main(String[] args) throws IOException {
        // 需求：文件拷贝
        // 把D:\itheima\movie.mp4拷贝到当前模块下

        FileInputStream fis = new FileInputStream("D:\\itheima\\movie.mp4");
        FileOutputStream fos = new FileOutputStream("myio\\copy.mp4");

        int len;
        byte[] buffer = new byte[1024 * 1024 * 5];
        while ((len = fis.read(buffer)) != -1) {
            fos.write(buffer, 0, len);
        }

        fos.close();
        fis.close();
    }
}
```

### 2.4 IO流中捕获异常
* IO流中捕获异常的两种方式
  * throws：在方法上抛出异常，调用者处理异常
  * try-catch：在方法中捕获异常，自己处理异常
    * finally：无论是否发生异常，都会执行的代码块，通常用于释放资源
* try-catch-finally的语法格式
```java
try {
    // 可能发生异常的代码
} catch (Exception e) {
    // 异常处理代码
} finally {
    // 无论是否发生异常，都会执行的代码
}
```

示例：
```java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class IOStreamDemo5 {
    public static void main(String[] args) throws IOException {
        // 需求：文件拷贝
        // 把D:\itheima\movie.mp4拷贝到当前模块下

        FileOutputStream fos = null;
        FileInputStream fis = null;

        try {
            fis = new FileInputStream("D:\\itheima\\movie.mp4");
            fos = new FileOutputStream("myio\\copy.mp4");

            int len;
            byte[] buffer = new byte[1024 * 1024 * 5];
            while ((len = fis.read(buffer)) != -1) {
                fos.write(buffer, 0, len);
            }


        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

* 简化方案
  * 接口：AutoCloseable，表示可以自动关闭的资源

![](/image/Java/JavaIO流/异常处理.png)

示例：
**JDK7**
```java
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class IOStreamDemo6 {
    public static void main(String[] args) {

        try(FileInputStream fis = new FileInputStream("D:\\itheima\\movie.mp4");
            FileOutputStream fos = new FileOutputStream("myio\\copy.mp4")){

            int len;
            byte[] buffer = new byte[1024 * 1024 * 5];
            while ((len = fis.read(buffer)) != -1) {
                fos.write(buffer, 0, len);
            }
        }catch (IOException e){
            e.printStackTrace();
        }

    }
}
```

**JDK9**

```java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class IOStreamDemo6 {
    public static void main(String[] args) throws FileNotFoundException {

        FileInputStream fis = new FileInputStream("D:\\itheima\\movie.mp4");
        FileOutputStream fos = new FileOutputStream("myio\\copy.mp4");
        try (fis; fos) {
            int len;
            byte[] buffer = new byte[1024 * 1024 * 5];
            while ((len = fis.read(buffer)) != -1) {
                fos.write(buffer, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```