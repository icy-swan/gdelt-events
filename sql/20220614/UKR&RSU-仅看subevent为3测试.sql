-- 子查询测试
SELECT
  GLOBALEVENTID,
  MonthYear,
  QuadClass,
  CASE
    WHEN Actor1CountryCode = 'RUS' THEN Actor1CountryCode
  ELSE
  Actor2CountryCode
END
  AS Actor1CountryCode,
  CASE
    WHEN Actor2CountryCode = 'RUS' THEN Actor1CountryCode
  ELSE
  Actor2CountryCode
END
  AS Actor2CountryCode,
  3 AS SubEventType,
  GoldsteinScale,
  SOURCEURL,
FROM
  `gdelt-bq.full.events`
WHERE
  MonthYear = 202204
  AND GoldsteinScale < 0 -- AND AvgTone < 0
  AND ( ( Actor1CountryCode = 'RUS'
      AND Actor2CountryCode = 'UKR' )
    OR ( Actor2CountryCode = 'RUS'
      AND Actor1CountryCode = 'UKR' ) )
  AND EventCode IN ( '0256',
    '093',
    '094',
    '1012',
    '1032',
    '1034',
    '1056',
    '1123',
    '1124',
    '1125',
    '1212',
    '1222',
    '1224',
    '1246',
    '137',
    '138',
    '1381',
    '1382',
    '1383',
    '1384',
    '1385',
    '139',
    '150',
    '152',
    '1622',
    '175',
    '180',
    '190',
    '191',
    '192',
    '193',
    '194',
    '195',
    '1951',
    '1952',
    '196',
    '200',
    '201',
    '202',
    '203',
    '204',
    '2041',
    '2042' )



-- 全内容测试
WITH query AS (
    SELECT
        GLOBALEVENTID,
        MonthYear,
        QuadClass,
        CASE
            WHEN Actor1CountryCode = 'RUS' THEN Actor1CountryCode
            ELSE Actor2CountryCode
        END AS Actor1CountryCode,
        CASE
            WHEN Actor2CountryCode = 'RUS' THEN Actor1CountryCode
            ELSE Actor2CountryCode
        END AS Actor2CountryCode,
        3 AS SubEventType,
        GoldsteinScale,
        SOURCEURL,
    FROM
        `gdelt-bq.full.events`
    WHERE
        MonthYear = 202204
        AND GoldsteinScale < 0 -- AND AvgTone < 0
        AND (
            (
                Actor1CountryCode = 'RUS'
                AND Actor2CountryCode = 'UKR'
            )
            OR (
                Actor2CountryCode = 'RUS'
                AND Actor1CountryCode = 'UKR'
            )
        )
        AND EventCode IN (
            '0256',
            '093',
            '094',
            '1012',
            '1032',
            '1034',
            '1056',
            '1123',
            '1124',
            '1125',
            '1212',
            '1222',
            '1224',
            '1246',
            '137',
            '138',
            '1381',
            '1382',
            '1383',
            '1384',
            '1385',
            '139',
            '150',
            '152',
            '1622',
            '175',
            '180',
            '190',
            '191',
            '192',
            '193',
            '194',
            '195',
            '1951',
            '1952',
            '196',
            '200',
            '201',
            '202',
            '203',
            '204',
            '2041',
            '2042'
        )
)
SELECT
    *
FROM
    query AS A
WHERE
    EXISTS(
        SELECT
            1
        FROM
            (
                SELECT
                    ARRAY_AGG(
                        DISTINCT (
                            CASE
                                WHEN AC IN ('TWN', 'HKG', 'MAC')
                                OR AC IS NULL THEN 'CHN'
                                ELSE AC
                            END
                        )
                    ) AS AC_agg,
                    SOURCEURL
                FROM
                    `gdelt-bq.full.events` UNPIVOT(
                        AC FOR type IN(Actor1CountryCode, Actor2CountryCode)
                    )
                WHERE
                    MonthYear = 202204
                GROUP BY
                    SOURCEURL
            ) AS T
        WHERE
            A.Actor1CountryCode IN UNNEST(T.AC_agg)
            AND A.Actor2CountryCode IN UNNEST(T.AC_agg)
            AND ARRAY_LENGTH(AC_agg) <= 2
            AND A.SOURCEURL = T.SOURCEURL
    )