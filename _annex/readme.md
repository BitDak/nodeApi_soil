## Node.js实现restful API

时间：201908

作者：BitDak

### 1. 规范化-使用名词

##### 1.1 API：


| 序号 | URL                          | Http方法 | 发送JSON | 方法实现的功能   |
| :--- | :--------------------------- | :------- | :------- | :--------------- |
| 1    | /api/users?page=n&pageSize=m | GET      | 否       | 显示所有用户记录 |
| 2    | /api/users/id                | GET      | 否       | 显示某一用户记录 |
| 3    | /api/users                   | POST     | 是       | 添加新用户       |
| 4    | /api/users/id                | DELETE   | 否       | 删除用户记录     |
| 5    | /api/users/id                | PUT      | 是       | 更新用户记录     |
| 6    | /api/users/id                | PATCH    | 是       | 更新用户记录     |



##### 1.2 程序检验

​		说明：分页处理见下述内容，本节仅检验分页处理以外的接口返回。

##### 1.3.1 GET /api/users/id

​		Request:

``````css
http://localhost:3000/api/users/50
``````

​		Response:

``````json
{"GET":"No record with ID 50"}
``````

​		&

``````
{"id":44,"username":"Dengh","password":"389F35EC68A11D59B11658AE742AF7AF"}
``````

##### 1.3.2 POST /api/users

​		Request

``````css
http://localhost:3000/api/users
``````

​		and

``````
{"username":"Dengh","password":"389F35EC68A11D59B11658AE742AF7AF"}
``````

​		Response:

``````json
{"POST":true}
``````

##### 1.3.3 DELETE /api/users/id

​		Request

```css
http://localhost:3000/api/users/52
```

​		Response:

```
{"DELETE":true}
```

```json
{"DELETE":false}
```

##### 1.3.4 PUT /api/users/id

​		Request:

```css
http://localhost:3000/api/users/52
```

​		and

```
{"username":"Dengh","password":"389F35EC68A11D59B11658AE742AF7AF"}
```

​		Response:

```json
{"PUT":false}
```

​		&

``````json
{"PUT":true}
``````

##### 1.3.5 PATCH /api/users/id

​		Request:

```css
http://localhost:3000/api/users/52
```

​		and

```
{"username":"Dengh","password":"389F35EC68A11D59B11658AE742AF7AF"}
```

​		Response:

```json
{"PATH":true}
```

### 2. 分页

##### 2.1 Response设计:

``````json
{
  "page":n,
  "pageSize":m,
  "totalRecord":z,
  "totalPage":y,
  "data":[{},{},{}...],
}
``````

##### 2.2 程序检验

​		Request：

``````css
http://localhost:3000/api/users?page=8&pageSize=50
``````

​		Response:

``````json
{"page":8,"pageSize":50,"totalRecord":354,"totalPage":8,"data":[{"id":472,"username":"cbaoxrc","password":"c4D7F06DF8AD6F383761CB7D9E1E3A048c"},{"id":512,"username":"liuyazi","password":"283E4D0AD84DA17BCA4AD0968700895B"},{"id":513,"username":"liuyazi","password":"283E4D0AD84DA17BCA4AD0968700895B"},{"id":514,"username":"liuyazi","password":"283E4D0AD84DA17BCA4AD0968700895B"}]}
``````

​		如果page超出最大范围，则返回：

``````
{"page":10,"pageSize":50,"totalRecord":355,"totalPage":8,"data":[]}
``````
