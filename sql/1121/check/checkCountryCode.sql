-- 所有国家
SELECT
  Actor1CountryCode
FROM
  `gdelt-bq.full.events`
WHERE
  Actor1CountryCode is not null
group by Actor1CountryCode
LIMIT
  1000


SELECT
  Actor1CountryCode
FROM
  `gdelt-bq.gdeltv2.events`
WHERE
  Actor1CountryCode is not null
group by Actor1CountryCode
LIMIT
  1000