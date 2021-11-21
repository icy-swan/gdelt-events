SELECT
  GLOBALEVENTID,
  MonthYear,
  Actor1CountryCode,
  Actor2CountryCode,
  QuadClass,
  EventCode,
  Actor1Code,
  Actor2Code,
  GoldsteinScale,
  YEAR
FROM
  `gdelt-bq.full.events`
WHERE
  YEAR = 2003
  AND (Actor1CountryCode = 'CHN'AND Actor2CountryCode = 'USA')
  AND GoldsteinScale < 0
  AND EventCode not in ('0211', '0231', '0254', '0311', '0331', '0354', '061', '071', '085', '1011', '1031', '1054', '1211', '1221', '1244', '1621')
UNION ALL
SELECT
  GLOBALEVENTID,
  MonthYear,
  Actor2CountryCode AS Actor1CountryCode,
  Actor1CountryCode AS Actor2CountryCode,
  QuadClass,
  EventCode,
  Actor1Code,
  Actor2Code,
  GoldsteinScale,
  YEAR
FROM
  `gdelt-bq.full.events`
WHERE
  YEAR = 2003
  AND (Actor2CountryCode = 'CHN'AND Actor1CountryCode = 'USA')
  AND GoldsteinScale < 0
  AND EventCode not in ('0211', '0231', '0254', '0311', '0331', '0354', '061', '071', '085', '1011', '1031', '1054', '1211', '1221', '1244', '1621')


-- 2729