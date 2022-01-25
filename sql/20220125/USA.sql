SELECT
    count(*) AS TotalCount,
    YEAR
FROM
    `gdelt-bq.full.events`
WHERE
    YEAR >= 2016
    AND YEAR < 2022
    AND GoldsteinScale < 0
    AND AvgTone < 0
    AND (
        (
            Actor1CountryCode = 'RUS'
            AND Actor2CountryCode = 'USA'
        )
        or (
            Actor2CountryCode = 'RUS'
            AND Actor1CountryCode = 'USA'
        )
    )
GROUP BY
    YEAR
ORDER BY
    YEAR ASC