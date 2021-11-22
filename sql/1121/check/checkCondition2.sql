-- old dataset
SELECT
  count(GLOBALEVENTID),
  sum(GoldsteinScale),
  YEAR
FROM
  `gdelt-bq.full.events`
WHERE
  YEAR = 2003
  AND (Actor1CountryCode = 'CHN'AND Actor2CountryCode = 'USA')
  AND GoldsteinScale < 0
  AND NOT (Actor2Code LIKE '%BUS%')
GROUP BY
  YEAR
UNION ALL
SELECT
  count(GLOBALEVENTID),
  sum(GoldsteinScale),
  YEAR
FROM
  `gdelt-bq.full.events`
WHERE
  YEAR = 2003
  AND (Actor2CountryCode = 'CHN'AND Actor1CountryCode = 'USA')
  AND GoldsteinScale < 0
  AND NOT (Actor2Code LIKE '%BUS%')
GROUP BY
  YEAR
  --- 2706(1267+1439), -10841.9

--new dataset

SELECT
  count(GLOBALEVENTID),
  sum(GoldsteinScale),
  YEAR
FROM
  `gdelt-bq.gdeltv2.events`
WHERE
  YEAR = 2018
  AND (Actor1CountryCode = 'CHN'AND Actor2CountryCode = 'USA')
  AND GoldsteinScale < 0
  AND NOT (Actor2Code LIKE '%BUS%')
GROUP BY
  YEAR
UNION ALL
SELECT
  count(GLOBALEVENTID),
  sum(GoldsteinScale),
  YEAR
FROM
  `gdelt-bq.gdeltv2.events`
WHERE
  YEAR = 2018
  AND (Actor2CountryCode = 'CHN'AND Actor1CountryCode = 'USA')
  AND GoldsteinScale < 0
  AND NOT (Actor2Code LIKE '%BUS%')
GROUP BY
  YEAR
-- 88930(48272+40658), -346722.3