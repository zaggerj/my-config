**简要描述：**

- 用户登录接口
- 对应需求：[4389]

**修改历史：**

-  2021年3月

| 日期    | 修改人 | 涉及接口          | 修改内容                                                                         |
| ------- | ------ | ----------------- | -------------------------------------------------------------------------------- |
| 3月17日 | 魏洪   | 用户相关-用户登录 | [新增参数校验 ](http://192.168.0.161:4999/web/#/page/diff/24/75 "新增参数校验 ") |


**请求URL：**

- 172.16.201.91:8081/login

**请求方式：**

- POST 

**请求参数示例：**

```json
  {
    "username": “admin”,
    "password": “admin”，
  }
```

**请求参数说明：**

| 参数名   | 必选 | 类型   | 说明   |
| :------- | :--- | :----- | ------ |
| username | 是   | string | 用户名 |
| password | 是   | string | 密码   |

**正确返回示例：**

``` 
  {
    "error_code": 0,
    "data": {
      "uid": "1",
      "username": "12154545",
      "name": "吴系挂",
      "groupid": 2 ,
      "reg_time": "1436864169",
      "last_login_time": "0",
    }
  }
```

 **正确返回参数说明（有枚举值要枚举出来）：**

| 参数名  | 类型 | 说明                                 |
| :------ | :--- | ------------------------------------ |
| groupid | int  | 用户组id，1：超级管理员；2：普通用户 |

**错误返回示例：**

```
{
    "message": "与认证服务器断开连接",
    "code": 10000
}
```

 **错误返回参数说明：**

| 参数名  | 类型   | 说明     |
| :------ | :----- | -------- |
| code    | int    | 错误码   |
| message | string | 错误描述 |

**接口特有错误码（有就写上）：**

| 错误码 | 错误解释           |
| ------ | ------------------ |
| 13124  | 用户名或密码错误   |
| 13125  | 连接认证服务器失败 |

**接口处理逻辑流程（有时间研发就记录下吧）：**
处理流程示例：
![](http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/3914211916cd14b4ee010c208a6627f7)

**接口日志路径（方便排查错误）：**
/etc/thor/log/thorconsole.log | grep "login" | grep "时间"