'''
Description: 
Author: zagger
Date: 2021-01-25 15:50:16
LastEditors: zagger
LastEditTime: 2021-01-25 15:52:38
'''
for num in range(100, 1000):
    low = num % 10
    mid = num // 10 % 10
    high = num // 100
    if num == low ** 3 + mid ** 3 + high ** 3:
        print(num)