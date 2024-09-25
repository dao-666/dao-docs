# 数据备份[v1.0]

## 创建备份目录
```sh
mkdir -p /data/backup
```
> 可以不单独创建目录

## 安装pg14客户端
```sh
/etc/apt/sources.list.d/pgdg.list -> deb http://apt.postgresql.org/pub/repos/apt focal-pgdg main
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
sudo apt install postgresql-client-14
```
> 在ubuntu 20.04上，安装postgresql-client-14

## 备份脚本-7天
```sh
#!/bin/bash
weekday=$(date +"%w")
taos=/data/backup/${weekday}/taos
pg=/data/backup/${weekday}/pg

rm -rf ${taos}
rm -rf ${pg}
mkdir -p ${taos}
mkdir -p ${pg}
# 备份taos
taosdump -h localhost -P 6030 -D feifan -o ${taos}
# 备份pg
export PGPASSWORD='123456'
pg_dump -U postgres -h localhost -p 5432 -Fc feifan > ${pg}/data.dump
```

## 脚本格式转换
```sh
dos2unix /data/bf.sh
```
> 如果遇到从windows中复制的脚本到ubuntu下需要进行脚本格式转换

## 定时任务脚本
```sh
crontab -e  ->  30 3 * * * /data/bf.sh
```