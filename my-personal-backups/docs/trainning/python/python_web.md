# Python Web开发进阶（大纲）

## 一、Django

1.预备知识
- 环境搭建（⏳一小时）   @贾志浩
- virtualenv 讲解虚拟环境在开发工作中的重要性（之前的课程是否有讲解？后续高阶？）
* virtualenv
* virtualenvwrapper
* pyenv
- 数据库
简单介绍MySQL、客户端、命令行，需要有数据库基础知识，通过自学扩充。
- HTTP基础（⏳一小时）
- JSON（⏳一小时）

2.View               @章传胜
- HttpRequest（⏳一小时）
- HTTP请求
- RESTful
- JsonResponse（⏳一小时）
- MiddleWare（⏳半小时）
- 登录，User（⏳半小时）

3.Model    @章传胜
- 各种field（⏳一小时）
- migrate（⏳一小时）
- filter、exclude（⏳半小时）
- 多表
- aggregate（⏳半小时）
- 索引、查询优化             -------------     ** @朱晓琨    **
- 索引与联合索引（⏳半小时）
```python
db_index = True
```
```python
class Meta:
unique_together = ('username', 'age')
```
- 过滤条件（⏳半小时）
- 分页（⏳半小时）
- 关联查询（⏳半小时）
- 树形结构的优化-mptt（⏳一小时）

4.logging（⏳一小时） @朱
http://172.16.92.2:8888/notebooks/Python%E8%BF%9B%E9%98%B6/django%20logging.ipynb

5.management command（⏳两小时）   @朱晓琨
http://172.16.92.2:8888/notebooks/Python%E8%BF%9B%E9%98%B6/django%20management%20command.ipynb
- manage.py shell
- 其他常用command
- 自己编写command

## 二、Djangorestframework（📅一天）     @贾

## 三、Tornado                             @贾
1. 同步与异步（⏳一小时）
2. coroutine（⏳半小时）
3. yield（⏳半小时）
4. raise（⏳半小时）

## 四、requests（⏳两小时）           @朱晓琨

## 五、openpyxl（⏳一小时）         @朱晓琨

## 六、pycryptodome（⏳一小时）       @朱晓琨

## 七、pillow（⏳一小时）         @朱晓琨

## 八、websocket           @朱晓琨