use koa2_webbo_db;

-- select * from users;
--  尽量不用* 来查数据 比较慢，一般给出指定的列
-- select * from blogs;

-- select username,nickname from users;

-- insert into users (username, `password`, nickname) values ("haha", "123123", "haha");

-- select username, nickname from users where username='haha' and `password`='123123';

-- insert into blogs (title, content, userid) values ('标题1', '内容1',  1);
-- insert into blogs (title, content, userid) values ('标题2', '内容2',  2);
-- insert into blogs (title, content, userid) values ('标题4', '内容4',  1);

-- select * from blogs order by id desc;

-- update blogs set content='内容1内容1' where id='1';

-- delete from blogs where id=4;

-- 分页
-- select count(*) as `count` from blogs;
-- select * from blogs order by id desc limit 2 offset 0;
-- select * from blogs order by id desc limit 2 offset 2;
-- select * from blogs order by id desc limit 2 offset 4;

-- foreign key
--  更新和删除级联


-- 更新一个级联中不存在的id会报错
-- insert into blogs (title, content, userid) values ('标题5', '内容5', 8)

-- 验证 删除用户id 然后会联动删除相关的微博
-- delete from users where id=4;

-- 连表查询
-- select * from blogs inner join users on users.id=blogs.userid;

-- 修改多个属性
-- update users set username='hzj4', nickname='hz4'  where id='4';

-- 连表查询并且指定显示或者需要的字段
select blogs.*,users.username,users.nickname 
from blogs inner join users on users.id=blogs.userid
where users.username='hzj';

-- select * from users;



    