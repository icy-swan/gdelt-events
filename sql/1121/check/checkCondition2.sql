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
  AND NOT (Actor2Code LIKE '%BUS%')
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
  AND NOT (Actor2Code LIKE '%BUS%')

  --- 2706