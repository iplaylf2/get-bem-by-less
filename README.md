# 用less实践BEM

## less是css的“方言”
能为css编程环境提供上下文，超级方便。  
详情情见[less官方](http://lesscss.org/)

## bem是一种编写css时的命名规范
使用得当，能有效避免css的className命名污染。以及在采用less等方言时，容易出现类名选择器层级过深的问题，也能通过bem来解决。  
详情请见[bem官方](https://bem.info)

## bem.less
其实只需要一个bem.less就能在项目中实践bem。  

### 原理
less能通过两个符号组合 **\&** + **\{\}** 来开辟一个上下文环境，使其中的less变量不会污染到外部的环境。  
在这种前提下，我就能通过 **开辟上下文** + **拼接className** 的方式去实践BEM。

### api
bem.less提供了3个函数:
- .b  
    ```.b(name);```定义当前上下文的Block，并提供3个变量。
  - @b  
    ``` less
    @{b}{
        //some css
    }
    ```
    指向当前Block的选择器。
  - @te  
    ``` less
    @{te}name{
        //some css
    }
    ```
    使用时需要拼接一个名字，指向某个Element的选择器。
  - @tm  
    ``` less
    @{tm}name{
        //some css
    }
    ```
    使用时需要拼接一个名字，指向当前Block某个Modifier的选择器。
- .e  
    ```.e(name);```定义当前上下文的Element，并提供2个变量。
  - @e  
    ``` less
    @{e}{
        //some css
    }
    ```
    指向当前Element的选择器。
  - @tm  
    ``` less
    @{tm}name{
        //some css
    }
    ```
    使用时需要拼接一个名字，指向当前Element某个Modifier的选择器。
- .m  
    ```.m(name);```定义当前上下文的Modifier,并提供2个变量。
  - @m  
    ``` less
    @{e}{
        //some css
    }
    ```
    指向当前Modifier的选择器。
  - @tv
    ``` less
    @{tv}value{
        //some css
    }
    ```
    使用时需要拼接一个名字，指向当前Modifier某个Value的选择器。  

(b、e、m、t、v分别是block、element、modifier、take、value单词的缩写)

### 用法
使用bem.less的函数时，函数所提供的变量会污染当前上下文，因此需要开辟新的上下文。
``` less
& {
  .b(demo);

  @{b} {
    background: blue;
  }

  @{te}title {
    font-size: 48px;
  }

  @{tm}invert {
    filter: invert(100%);
  }

  & {
    .e(banner);

    @{e} {
      background: red;
    }

    @{tm}foo {
      color: blue;
    }

    @{tm}bar {
      color: red;
    }
  }
}
```
将会编译为
``` css
.demo {
  background: blue;
}
.demo__title {
  font-size: 48px;
}
.demo_invert {
  filter: invert(100%);
}
.demo__banner {
  background: red;
}
.demo__banner_foo {
  color: blue;
}
.demo__banner_bar {
  color: red;
}
```
此外bem.less并不会影响原本less的使用，依然能用嵌套的方式表示后代选择器。

## bem.ts
bem.ts用来辅助生成className，非常适合在具备html模板引擎的框架下使用。如React,Vue,Angular等。  
由于编译会得到.d.ts的类型说明文件，api就不再赘述。

## 其他
- ```npm install```安装依赖。  
- ```npm run build```编译bem.ts为bem.js。  
- ```npm run demo```执行demo。
