# 如何进行数据分析

1. 进入google https://lookerstudio.google.com/navigation/datasources
2. 按照sql添加自定义查询（月维度）
3. 查出的数据除GoldsteinScale和RecordCount外，其他字段都以字符串存储。此二者数字
4. 创建报表自定义布局table
5. table按照MonthYear,Actor2CountryCode,QuadClass,SubEventType作为维度，GoldsteinScale和RecordCount作为指标
6. 添加按MonthYear和Actor2CountryCode排序
7. 导出数据