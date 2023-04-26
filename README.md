# 技术栈文档 Docker Node MongoDB Nginx React

## 环境配置工具

### Docker

#### 功能

- 快速配置环境
- 创建虚拟容器
- 方便全栈式开发

#### 常用指令

- docker run -it <容器ID> /bin/bash
- docker ps [-a]
- docker rm -f <容器ID>
- docker logs <容器ID>
- docker images
- docker rmi <镜像名>

#### 参考文档

- https://www.runoob.com/docker/docker-tutorial.html
- https://docs.docker.com/

### Dockerfile

用于在现有镜像基础上改进，如安装包、复制本地代码、运行脚本

```Dockerfile
FROM node
WORKDIR /app
COPY ./app .
RUN npm install express mongodb
EXPOSE 3000
CMD ["node", "index.js"]
```

- 基于 node 镜像
- 创建工作区，为容器的 /app
- 将当前文件夹下的 app 文件加挂载到工作区
- 执行 npm 下载必要的包 express 和 mongodb
- 暴露容器的端口 3000
- 执行脚本命令 "node index.js" 表示激活服务器

### docker-compose

用于运行并维护多个容器

```yml
version: '2.2.2'
services:
  node:
    build: .
    depends_on:
      - mongo
    ports:
      - 3000:3000
  mongo:
    image: mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    volumes:
      - ./data/db:/data/db
    ports:
      - 27017:27017
  nginx:
    image: nginx
    volumes:
      - ./config:/etc/nginx/conf.d
      - ./web:/usr/share/nginx/html
    ports:
      - 80:80
  mongoku:
    image: huggingface/mongoku
    depends_on:
      - mongo
    environment:
      MONGOKU_DEFAULT_HOST: mongodb://root:example@mongo:27017
    ports:
      - 3100:3100
```

共创建了 4 个容器，称为”服务(service)“:

- **node** 由 Dockerfile 构建，开放端口 3000
- **mongo** 基于 mongo 镜像，设置数据库的根用户及其密码，数据挂载到本地的 ./data，开放端口 27017
- **nginx** 基于 nginx 镜像，挂载配置文件，挂载网页文件，开放端口 80
- **mongoku** 基于 mongoku 镜像，与 mongo 服务连接，设置默认连接 url，开放端口 3100

准备好配置文件之后，直接 docker-compose up -d 即可

### 配置流程

- 下载 Docker 和 docker-compose，windows 用户请参考 https://docs.docker.com/desktop/install/windows-install/
- 下载 git，用于获取和跟踪代码仓库，仓库里有配置环境所需要的文件，下载地址 https://git-scm.com/
- 克隆项目仓库，git clone http://github.com/lazypool/luxund.git
- 进入代码文件夹并开始配置环境，cd luxund && docker-compose up -d
- 查看容器是否正常运行 docker ps，如在运行还可以看各个容器的输出日志，如果没有问题证明已经成功
- 由于会有 npm 下载，因此网络不好的话可能会失败，只需要反复执行 docker-compose up -d 即可

## 后端 / 服务端

### Nodejs

#### 功能

- 接收前端发起的 URL
- 解析 URL 为查询请求
- 连接数据库
- 执行查询请求
- 返回查询结果

#### 实现细节

- 基于 express 框架
- 基于 mongodb 包
- 只接受 GET 请求

#### 参考文档

- https://nodejs.org/en/docs/guides
- https://www.runoob.com/nodejs/nodejs-tutorial.html

### Mongodb

#### 功能

- 存储数据
- 执行查询任务

#### 实现细节

- 与 Nodejs 搭配使用
- 通过第三方 GUI 进行管理，访问 http://localhost:3100/ 即可

#### 参考文档

- https://www.mongodb.com/docs/
- https://www.runoob.com/mongodb/mongodb-tutorial.html
- https://github.com/huggingface/Mongoku

## 前端 / 客户端

### Nginx

#### 功能

- 用于访问客户端站点
- 可以挂载静态资源

#### 实现细节

- 挂载站点网页的文件
- 手动添加配置文件

#### 参考文档

- https://nginx.org/en/docs/
- https://wiki.archlinux.org/title/Nginx
- https://www.runoob.com/w3cnote/nginx-setup-intro.html

### React

#### 功能

- 用于构建用户界面
- 可向服务端发送请求
- 处理服务端返回的结果
- 渲染结果

#### 实现细节

- 在 html 文件的头部声明即可
- 使用 AJAX 发送请求
- 规定只发送 GET 请求

#### 参考文档

- https://www.runoob.com/react/react-tutorial.html
- https://react.dev/learn

## 项目架构

```bash
luxun
├── app
├── config
├── data
│   ├── db
│   └── doc
├── docker-compose.yml
├── Dockerfile
├── README.md
└── web
```

- **app** 存放 nodejs 的服务器代码，用于截获请求，处理请求，返回结果
- **config** 存放 nginx 所需的配置文件
- **data/db** 实现数据库的本地持久化
- **data/doc** 用于导入数据库的数据
- **docker-compose.yml** 配置文件
- **Dockerfile** 配置文件
- **web** 存放客户端的 html 文件以及 css 文件、图片等等
