#  Web Next 教程

## 入门指南
本教程旨在帮助你迅速上手 [Next](https://nextjs.org)，并使用 React 和 Express 制作网站。最后，你将创建一个从 [PokéApi](https://pokeapi.co/) 获取数据并属于自己的宝可梦图鉴网站！

### 什么是 NextJS？
NextJS 是一个框架，它允许你快速开始使用 React 和服务器端代码。它带有内置功能，如路由（路由器从一个接口上收到数据包，根据数据包的目的地址进行定向并转发到另一个接口的过程）、热模块替换（允许在运行时更新各种模块，而无需进行完全刷新）、服务器端渲染（一种在用户自己的服务器上加载网站的 JavaScript 的方法）和代码分割（一种将代码拆分成多个独立文件的技术），可以提高性能，而这些功能如果自己实现可能会是一个**巨大**的痛苦。

### 入门
在本地克隆此存储库并安装依赖项：

```
git clone https://github.com/TreeHacks/hackpack-web-next.git
```

如果想启动，请运行以下命令：

```
npm install
```

你可以通过访问 http://localhost:3000 打开网站。请注意，现在的终端将监视代码的更改并自动重新编译代码。尝试更改 `pages/index.js` 中的一些文本，网站会立即更改。这被称为 [热模块替换 (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)！

![image](https://user-images.githubusercontent.com/1689183/52835583-e0bc1f00-309b-11e9-8c2e-e067bd5290d4.png)
