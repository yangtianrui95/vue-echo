# 在容器中安装nginx
FROM nginx

# 移除docker中的default.conf
#RUN rm /etc/nginx/conf.d/default.conf

# 添加自行配置的conf.d
#ADD default.conf /etc/nginx/conf.d

# 把项目文件拷贝到nginx目录
COPY dist/ /usr/share/nginx/html/

