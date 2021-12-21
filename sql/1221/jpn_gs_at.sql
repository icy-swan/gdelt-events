SELECT
    GLOBALEVENTID,
    MonthYear,
    Actor1CountryCode,
    Actor2CountryCode,
    EventCode,
    AvgTone,
    GoldsteinScale,
    1 AS SubEventType,
    YEAR
FROM
    `gdelt-bq.gdeltv2.events`
WHERE
    -- YEAR >= 2016
    -- AND YEAR = 2021
YEAR = 2021
    AND (
        Actor1CountryCode = 'CHN'
        AND Actor2CountryCode = 'JPN'
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
    -- AND GoldsteinScale < 0
UNION
ALL
SELECT
    GLOBALEVENTID,
    MonthYear,
    Actor2CountryCode AS Actor1CountryCode,
    Actor1CountryCode AS Actor2CountryCode,
    EventCode,
    AvgTone,
    GoldsteinScale,
    1 AS SubEventType,
    YEAR
FROM
    `gdelt-bq.gdeltv2.events`
WHERE
    -- YEAR >= 2016
    -- AND YEAR = 2021
YEAR = 2021
    AND (
        Actor2CountryCode = 'CHN'
        AND Actor1CountryCode = 'JPN'
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
    -- AND GoldsteinScale < 0
UNION
ALL
SELECT
    GLOBALEVENTID,
    MonthYear,
    Actor1CountryCode,
    Actor2CountryCode,
    EventCode,
    AvgTone,
    GoldsteinScale,
    2 AS SubEventType,
    YEAR
FROM
    `gdelt-bq.gdeltv2.events`
WHERE
    -- YEAR >= 2016
    -- AND YEAR = 2021
YEAR = 2021
    AND (
        Actor1CountryCode = 'CHN'
        AND Actor2CountryCode = 'JPN'
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
    -- AND GoldsteinScale < 0
UNION
ALL
SELECT
    GLOBALEVENTID,
    MonthYear,
    Actor2CountryCode AS Actor1CountryCode,
    Actor1CountryCode AS Actor2CountryCode,
    EventCode,
    AvgTone,
    GoldsteinScale,
    2 AS SubEventType,
    YEAR
FROM
    `gdelt-bq.gdeltv2.events`
WHERE
    -- YEAR >= 2016
    -- AND YEAR = 2021
YEAR = 2021
    AND (
        Actor2CountryCode = 'CHN'
        AND Actor1CountryCode = 'JPN'
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
    -- AND GoldsteinScale < 0
UNION
ALL
SELECT
    GLOBALEVENTID,
    MonthYear,
    Actor1CountryCode,
    Actor2CountryCode,
    EventCode,
    AvgTone,
    GoldsteinScale,
    3 AS SubEventType,
    YEAR
FROM
    `gdelt-bq.gdeltv2.events`
WHERE
    -- YEAR >= 2016
    -- AND YEAR = 2021
YEAR = 2021
    AND (
        Actor1CountryCode = 'CHN'
        AND Actor2CountryCode = 'JPN'
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
    -- AND GoldsteinScale < 0
UNION
ALL
SELECT
    GLOBALEVENTID,
    MonthYear,
    Actor2CountryCode AS Actor1CountryCode,
    Actor1CountryCode AS Actor2CountryCode,
    EventCode,
    AvgTone,
    GoldsteinScale,
    3 AS SubEventType,
    YEAR
FROM
    `gdelt-bq.gdeltv2.events`
WHERE
    -- YEAR >= 2016
    -- AND YEAR = 2021
YEAR = 2021
    AND (
        Actor2CountryCode = 'CHN'
        AND Actor1CountryCode = 'JPN'
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
    -- AND GoldsteinScale < 0
UNION
ALL
SELECT
    GLOBALEVENTID,
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
        AND Actor2CountryCode = 'JPN'
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
    -- AND GoldsteinScale < 0
UNION
ALL
SELECT
    GLOBALEVENTID,
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
        AND Actor1CountryCode = 'JPN'
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
    -- AND GoldsteinScale < 0
UNION
ALL
SELECT
    GLOBALEVENTID,
    MonthYear,
    Actor1CountryCode,
    Actor2CountryCode,
    EventCode,
    AvgTone,
    GoldsteinScale,
    5 AS SubEventType,
    YEAR
FROM
    `gdelt-bq.gdeltv2.events`
WHERE
    -- YEAR >= 2016
    -- AND YEAR = 2021
YEAR = 2021
    AND (
        Actor1CountryCode = 'CHN'
        AND Actor2CountryCode = 'JPN'
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
    -- AND GoldsteinScale < 0
UNION
ALL
SELECT
    GLOBALEVENTID,
    MonthYear,
    Actor2CountryCode AS Actor1CountryCode,
    Actor1CountryCode AS Actor2CountryCode,
    EventCode,
    AvgTone,
    GoldsteinScale,
    5 AS SubEventType,
    YEAR
FROM
    `gdelt-bq.gdeltv2.events`
WHERE
    -- YEAR >= 2016
    -- AND YEAR = 2021
YEAR = 2021
    AND (
        Actor2CountryCode = 'CHN'
        AND Actor1CountryCode = 'JPN'
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
    -- AND GoldsteinScale < 0
UNION
ALL
SELECT
    GLOBALEVENTID,
    MonthYear,
    Actor1CountryCode,
    Actor2CountryCode,
    EventCode,
    AvgTone,
    GoldsteinScale,
    6 AS SubEventType,
    YEAR
FROM
    `gdelt-bq.gdeltv2.events`
WHERE
    -- YEAR >= 2016
    -- AND YEAR = 2021
YEAR = 2021
    AND (
        Actor1CountryCode = 'CHN'
        AND Actor2CountryCode = 'JPN'
    )
    AND EventCode IN (
        '010',
        '011',
        '012',
        '013',
        '014',
        '015',
        '016',
        '017',
        '018',
        '019',
        '020',
        '021',
        '0212',
        '0213',
        '0214',
        '022',
        '023',
        '0232',
        '0233',
        '0234',
        '0243',
        '025',
        '026',
        '027',
        '028',
        '03',
        '030',
        '031',
        '0312',
        '0313',
        '0314',
        '032',
        '033',
        '0332',
        '0333',
        '0334',
        '034',
        '0341',
        '0342',
        '0343',
        '0344',
        '035',
        '0351',
        '0352',
        '0353',
        '0355',
        '0356',
        '036',
        '037',
        '038',
        '039',
        '04',
        '040',
        '041',
        '042',
        '043',
        '044',
        '045',
        '046',
        '05',
        '050',
        '051',
        '052',
        '053',
        '054',
        '055',
        '056',
        '057',
        '06',
        '060',
        '062',
        '063',
        '064',
        '07',
        '070',
        '072',
        '073',
        '074',
        '075',
        '08',
        '080',
        '081',
        '0811',
        '0812',
        '0813',
        '0814',
        '082',
        '083',
        '0831',
        '0832',
        '0833',
        '0834',
        '084',
        '0841',
        '0842',
        '086',
        '0861',
        '0862',
        '0863',
        '087',
        '0871',
        '0872',
        '0873',
        '0874',
        '090',
        '092',
        '100',
        '101',
        '1013',
        '1014',
        '103',
        '1033',
        '1043',
        '105',
        '110',
        '111',
        '112',
        '1122',
        '120',
        '122',
        '1223',
        '1233',
        '129',
        '130',
        '131',
        '1413',
        '162',
        '1623',
        '170'
    )
    -- AND GoldsteinScale < 0
UNION
ALL
SELECT
    GLOBALEVENTID,
    MonthYear,
    Actor2CountryCode AS Actor1CountryCode,
    Actor1CountryCode AS Actor2CountryCode,
    EventCode,
    AvgTone,
    GoldsteinScale,
    6 AS SubEventType,
    YEAR
FROM
    `gdelt-bq.gdeltv2.events`
WHERE
    -- YEAR >= 2016
    -- AND YEAR = 2021
YEAR = 2021
    AND (
        Actor2CountryCode = 'CHN'
        AND Actor1CountryCode = 'JPN'
    )
    AND EventCode IN (
        '010',
        '011',
        '012',
        '013',
        '014',
        '015',
        '016',
        '017',
        '018',
        '019',
        '020',
        '021',
        '0212',
        '0213',
        '0214',
        '022',
        '023',
        '0232',
        '0233',
        '0234',
        '0243',
        '025',
        '026',
        '027',
        '028',
        '03',
        '030',
        '031',
        '0312',
        '0313',
        '0314',
        '032',
        '033',
        '0332',
        '0333',
        '0334',
        '034',
        '0341',
        '0342',
        '0343',
        '0344',
        '035',
        '0351',
        '0352',
        '0353',
        '0355',
        '0356',
        '036',
        '037',
        '038',
        '039',
        '04',
        '040',
        '041',
        '042',
        '043',
        '044',
        '045',
        '046',
        '05',
        '050',
        '051',
        '052',
        '053',
        '054',
        '055',
        '056',
        '057',
        '06',
        '060',
        '062',
        '063',
        '064',
        '07',
        '070',
        '072',
        '073',
        '074',
        '075',
        '08',
        '080',
        '081',
        '0811',
        '0812',
        '0813',
        '0814',
        '082',
        '083',
        '0831',
        '0832',
        '0833',
        '0834',
        '084',
        '0841',
        '0842',
        '086',
        '0861',
        '0862',
        '0863',
        '087',
        '0871',
        '0872',
        '0873',
        '0874',
        '090',
        '092',
        '100',
        '101',
        '1013',
        '1014',
        '103',
        '1033',
        '1043',
        '105',
        '110',
        '111',
        '112',
        '1122',
        '120',
        '122',
        '1223',
        '1233',
        '129',
        '130',
        '131',
        '1413',
        '162',
        '1623',
        '170'
    )
    -- AND GoldsteinScale < 0