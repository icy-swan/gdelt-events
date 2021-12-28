SELECT
    -- GLOBALEVENTID,
    MonthYear,
    Actor1CountryCode,
    Actor2CountryCode,
    EventCode,
    AvgTone,
    GoldsteinScale,
    4 AS SubEventType,
    YEAR
FROM
    `gdelt-bq.gdeltv2.events`
WHERE
    -- YEAR >= 2016
    -- AND YEAR = 2021
YEAR = 2021
    AND (
        Actor1CountryCode = 'CHN'
        AND Actor2CountryCode IN ('RUS', 'JPN')
    AND EventCode IN (
        '113',
        '114',
        '115',
        '116',
        '128',
        '1323',
        '1324',
        '151',
        '153',
        '154',
        '155',
        '1723',
        '1724',
        '173',
        '176',
        '181',
        '182',
        '1821',
        '1822',
        '1823',
        '183',
        '1831',
        '1832',
        '1833',
        '1834',
        '184',
        '185',
        '186'
    )
    AND GoldsteinScale < 0
AND AvgTone < 0
UNION
ALL
SELECT
    -- GLOBALEVENTID,
    MonthYear,
    Actor2CountryCode AS Actor1CountryCode,
    Actor1CountryCode AS Actor2CountryCode,
    EventCode,
    AvgTone,
    GoldsteinScale,
    4 AS SubEventType,
    YEAR
FROM
    `gdelt-bq.gdeltv2.events`
WHERE
    -- YEAR >= 2016
    -- AND YEAR = 2021
YEAR = 2021
    AND (
        Actor2CountryCode = 'CHN'
        AND Actor1CountryCode IN ('RUS', 'JPN')
    )
    AND EventCode IN (
        '113',
        '114',
        '115',
        '116',
        '128',
        '1323',
        '1324',
        '151',
        '153',
        '154',
        '155',
        '1723',
        '1724',
        '173',
        '176',
        '181',
        '182',
        '1821',
        '1822',
        '1823',
        '183',
        '1831',
        '1832',
        '1833',
        '1834',
        '184',
        '185',
        '186'
    )
    AND GoldsteinScale < 0
AND AvgTone < 0