SELECT
    count(*),
    -- GLOBALEVENTID,
    -- MonthYear,
    -- CASE
    --     WHEN Actor1CountryCode = 'RUS' THEN Actor1CountryCode
    --     ELSE Actor2CountryCode
    -- END AS Actor1CountryCode,
    -- CASE
    --     WHEN Actor2CountryCode = 'RUS' THEN Actor1CountryCode
    --     ELSE Actor2CountryCode
    -- END AS Actor2CountryCode,
    -- GoldsteinScale,
    -- SOURCEURL,
    YEAR
FROM
    `gdelt-bq.full.events`
WHERE
    YEAR >= 2012
    AND GoldsteinScale < 0
    AND AvgTone < 0
    AND (
        (
            Actor1CountryCode = 'RUS'
            AND Actor2CountryCode = 'UKR'
        )
        or (
            Actor2CountryCode = 'RUS'
            AND Actor1CountryCode = 'UKR'
        )
    )
GROUP BY YEAR
ORDER BY YEAR ASC
--     MonthYear DESC