# 非凡产品安装手册[v1.0]

## 镜像文件生成: bookworm:12 | bullseye:11
1. 环境镜像
```bash
sudo docker save emqx:5.0.24 postgres:14-alpine tdengine/tdengine:3.3.3.0 redis:alpine mysql:8.0 >feifan-env.tar
sudo docker save emqx:5.0.24 postgres:14-alpine tdengine/tdengine:3.3.3.0 redis:alpine >feifan-env.tar
```

## 目录说明
- /data/feifan
非凡程序主目录
- /data/feifan/admin
后端代码
- /data/feifan/e2t
从emqx读取数据到taos
- /data/feifan/logs
各种程序日志
- /data/feifan/emqx
消息队列
- /data/feifan/nginx
页面代理
/data/feifan/nginx/html/admin:存放后端web程序
/data/feifan/nginx/html/web:存放前端web程序
- /data/feifan/pg
postgresql数据库
- /data/feifan/redis
缓存数据库
- /data/feifan/taos
时序数据库
- /data/feifan/feifan.yaml
docker-compose启动文件
> 如果有别的程序重复加一级feifan,不冲突直接放到data中

## 国内镜像源
```
# 华为镜像源
sudo sed -i "s@http://.*archive.ubuntu.com@http://repo.huaweicloud.com@g" /etc/apt/sources.list && \
sudo sed -i "s@http://.*security.ubuntu.com@http://repo.huaweicloud.com@g" /etc/apt/sources.list
# 163镜像源
deb http://mirrors.163.com/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ jammy-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ jammy-backports main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ jammy main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ jammy-security main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ jammy-updates main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ jammy-backports main restricted universe multiverse
```
> ubuntu22.04 和 ubuntu20.04 镜像源,ubuntu24.04 特殊

## 扩展逻辑卷/调整文件系统大小
```
sudo lvextend -l +100%FREE ubuntu-vg/ubuntu-lv
sudo resize2fs /dev/ubuntu-vg/ubuntu-lv
```

## 挂载/dev/vdb 
- 创建分区
```
lsblk 
fdisk /dev/vdb
```
> 在分别输入n、p、1、2048、1048575999、w
  
- 格式化刚划分的磁盘，格式成ext4格式
```
mkfs.ext4 /dev/vdb
```

- 创建/data 写入fstable 重新加载fstable
```
mkdir /data
echo "/dev/vdb /data ext4 defaults 0 0" >> /etc/fstab
mount -a
df -h
```

## 拷贝文件 
```
scp root@123.57.246.45:/root/qsodoo12.tar /data

apt–get install lrzsz –y  
上传: rz –be  
下载: sz  
```

## 安装步骤 从此开始
- 安装docker环境
```bash
cd /data/docker && \
dpkg -i containerd.io_1.6.32-1_amd64.deb && \
dpkg -i docker-ce-cli_26.1.3-1_ubuntu.22.04_jammy_amd64.deb  && \
dpkg -i docker-ce_26.1.3-1_ubuntu.22.04_jammy_amd64.deb  && \
dpkg -i docker-compose-plugin_2.27.0-1_ubuntu.22.04_jammy_amd64.deb && \
dpkg -i docker-buildx-plugin_0.14.0-1_ubuntu.22.04_jammy_amd64.deb && \
rm docker* && \
rm containerd*
```

- 安装运行环境
```bash
apt install supervisor nginx postgresql-client -y && \
apt --fix-broken install

# docker-compose安装
mv docker-compose-linux-x86_64 /usr/local/bin/docker-compose && \
chmod +x /usr/local/bin/docker-compose && \
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

## 安装镜像
环境安装
```bash
sudo docker load -i feifan-env.tar
```

## 启动所有镜像
```bash
sudo docker-compose -f feifan.yaml
```

## 单独启动其中的一个镜像
```
sudo docker restart feifan_emqx
```

- 加载feifan-env.tar环境镜像
```bash
cd /data && \
sudo docker load -i feifan-env.tar && \
sudo docker-compose -f docker-compose.yaml up -d
```

- 创建目录，拷贝安装包到feifan，解压安装环境
```bash
cd /data && \
unzip feifan-1.0.zip 
```

- 安装taos客户端 
```bash
cd /data && \
tar -xzvf TDengine-client-3.3.2.0-Linux-x64.tar.gz && \
cd TDengine-client-3.3.2.0 && \
./install_client.sh 
```
> /etc/hostname 和 /etc/hosts 的名称要保持一致

- 安装python虚拟环境-主要是为了区别于操作系统自带的python环境
```bash
sudo chmod +x Miniconda3-py39_24.4.0-0-Linux-x86_64.sh && \
sudo bash Miniconda3-py39_24.4.0-0-Linux-x86_64.sh -b -p /opt/miniconda3
# 创建快捷方式
ln -s /opt/miniconda3/bin/conda /usr/bin/conda
/opt/miniconda3/bin/conda create -n py39 python=3.9
source /opt/miniconda3/bin/activate py39
conda activate py39
pip3 install -r requirements.txt --ignore-installed -i https://mirrors.aliyun.com/pypi/simple/
```

- 初始化数据库
```bash
# 创建taos数据库
docker exec -it feifan-taos /bin/bash
taos
create database feifan keep 1095;
use feifan;
create stable base (ts timestamp, `value` float) tags(code nchar(256));
# 建超级表语句  
create stable base_float (`ts` timestamp, `value` float) tags(code nchar(256));
# 建超级表语句  
create stable base_str (`ts` timestamp, `value` nchar(256)) tags(code nchar(256));
# 设备离线记录  
create stable offline_warning_base (`ts` timestamp, `device_id` nchar(256), `point_id` nchar(256), `workplace_id` nchar(256)) tags(code nchar(256));

# 创建pg数据库
docker exec -it feifan-pg /bin/bash
psql -U postgres
create database feifan;
```

- 修改程序配置并初始化
```bash
# 1. env.py
cp /data/admin/backend/conf/env.example.py /data/admin/backend/conf/env.py
# 2. 修改env.py，数据库ip、端口等
# 3. 初始化 conda env list
conda activate py39
cd /data/admin/backend
python manage.py makemigrations
python manage.py migrate
python manage.py init
# 4. 重启服务
supervisorctl restart all
```

- 清理安装包文件
```bash
cd /data && \
rm feifan-1.0.zip && \
rm TDengine-client-3.2.3.0-Linux-x64.tar.gz

```