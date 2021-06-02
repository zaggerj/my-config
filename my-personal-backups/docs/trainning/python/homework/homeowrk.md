# 作业问题汇总
- 代码规范
- 解题思路

## E225 Missing whitespace around operator
```python
# 原代码
s=len(result)-2
# 改写为
s = len(result) - 2
```

## 不等式连写
```python
# 原代码
c >= '0' and c <= '9'
# 改写后
'0' <= c <= '9'
```

## range默认参数
```python
# 原代码
for i in range(0, n):
# 改写后
for i in range(n):
```

## 寻找素数
- 算法：
	遍历法：对每个数字`m`，从2开始到`m - 1`做除数，能整除就不是素数
	筛法：对每个数字`m`，筛掉后面所有它的倍数
	![prime sieve](https://images.ctfassets.net/vtn4rfaw6n2j/72PCtdlUdYkgYXpN7AFUHA/7841a5ac41b23f221a2f092ceb54b9b4/https___blog.codeship.com_wp-content_uploads_2016_05_primesieve.gif "prime sieve")
- 优化：
	0、1、2、3不用放到循环里
