WITH query AS (
    SELECT
        GLOBALEVENTID,
        MonthYear,
        CASE
            WHEN Actor1CountryCode = 'RUS' THEN Actor1CountryCode
            ELSE Actor2CountryCode
        END AS Actor1CountryCode,
        CASE
            WHEN Actor2CountryCode = 'RUS' THEN Actor1CountryCode
            ELSE Actor2CountryCode
        END AS Actor2CountryCode,
        1 AS SubEventType,
        GoldsteinScale,
        SOURCEURL,
        YEAR
    FROM
        `gdelt-bq.full.events`
    WHERE
        YEAR >= 2010
        AND GoldsteinScale < 0
        -- AND AvgTone < 0
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
            '0255',
            '102',
            '1055',
            '106',
            '107',
            '108',
            '121',
            '1245',
            '125',
            '126',
            '127',
            '1311',
            '1312',
            '1313',
            '133',
            '134',
            '135',
            '136',
            '160',
            '161',
            '163',
            '164',
            '165',
            '166',
            '1661',
            '1662',
            '1663',
            '174'
        )
    UNION
    ALL
    SELECT
        GLOBALEVENTID,
        MonthYear,
        CASE
            WHEN Actor1CountryCode = 'RUS' THEN Actor1CountryCode
            ELSE Actor2CountryCode
        END AS Actor1CountryCode,
        CASE
            WHEN Actor2CountryCode = 'RUS' THEN Actor1CountryCode
            ELSE Actor2CountryCode
        END AS Actor2CountryCode,
        2 AS SubEventType,
        GoldsteinScale,
        SOURCEURL,
        YEAR
    FROM
        `gdelt-bq.full.events`
    WHERE
        YEAR >= 2010
        AND GoldsteinScale < 0
        -- AND AvgTone < 0
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
            '024',
            '0241',
            '0242',
            '0244',
            '0252',
            '104',
            '1041',
            '1042',
            '1044',
            '1052',
            '123',
            '1231',
            '1232',
            '1234',
            '124',
            '1242',
            '1321',
            '1322',
            '140',
            '141',
            '1411',
            '1412',
            '1414',
            '142',
            '1421',
            '1422',
            '1423',
            '1424',
            '143',
            '1431',
            '1432',
            '1433',
            '1434',
            '144',
            '1441',
            '1442',
            '1443',
            '1444',
            '145',
            '1451',
            '1452',
            '1453',
            '1454',
            '1721',
            '1722'
        )
    UNION
    ALL
    SELECT
        GLOBALEVENTID,
        MonthYear,
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
        YEAR
    FROM
        `gdelt-bq.full.events`
    WHERE
        YEAR >= 2010
        AND GoldsteinScale < 0
        -- AND AvgTone < 0
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
    UNION
    ALL
    SELECT
        GLOBALEVENTID,
        MonthYear,
        CASE
            WHEN Actor1CountryCode = 'RUS' THEN Actor1CountryCode
            ELSE Actor2CountryCode
        END AS Actor1CountryCode,
        CASE
            WHEN Actor2CountryCode = 'RUS' THEN Actor1CountryCode
            ELSE Actor2CountryCode
        END AS Actor2CountryCode,
        4 AS SubEventType,
        GoldsteinScale,
        SOURCEURL,
        YEAR
    FROM
        `gdelt-bq.full.events`
    WHERE
        YEAR >= 2010
        AND GoldsteinScale < 0
        -- AND AvgTone < 0
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
    UNION
    ALL
    SELECT
        GLOBALEVENTID,
        MonthYear,
        CASE
            WHEN Actor1CountryCode = 'RUS' THEN Actor1CountryCode
            ELSE Actor2CountryCode
        END AS Actor1CountryCode,
        CASE
            WHEN Actor2CountryCode = 'RUS' THEN Actor1CountryCode
            ELSE Actor2CountryCode
        END AS Actor2CountryCode,
        5 AS SubEventType,
        GoldsteinScale,
        SOURCEURL,
        YEAR
    FROM
        `gdelt-bq.full.events`
    WHERE
        YEAR >= 2010
        AND GoldsteinScale < 0
        -- AND AvgTone < 0
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
            '0211',
            '0231',
            '0251',
            '0253',
            '0254',
            '0311',
            '0331',
            '0354',
            '061',
            '071',
            '085',
            '091',
            '1011',
            '1031',
            '1051',
            '1053',
            '1054',
            '1121',
            '1211',
            '1221',
            '1241',
            '1243',
            '1244',
            '132',
            '1621',
            '171',
            '1711',
            '1712',
            '172'
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
                                OR AC IS NULL THEN 'RUS'
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
                    YEAR >= 2015
                    AND YEAR <= 2021
                GROUP BY
                    SOURCEURL
            ) AS T
        WHERE
            A.Actor1CountryCode IN UNNEST(T.AC_agg)
            AND A.Actor2CountryCode IN UNNEST(T.AC_agg)
            AND ARRAY_LENGTH(AC_agg) <= 2
            AND A.SOURCEURL = T.SOURCEURL
    )