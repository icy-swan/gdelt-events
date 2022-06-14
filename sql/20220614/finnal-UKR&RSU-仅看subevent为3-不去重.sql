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
    YEAR,
FROM
    `gdelt-bq.full.events`
WHERE
    YEAR >= 2010
    AND MonthYear <= 202205
    AND GoldsteinScale < 0
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