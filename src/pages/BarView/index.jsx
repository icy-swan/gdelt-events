import React, { useEffect } from 'react'
import * as echarts from 'echarts'

export default () => {
    useEffect(() => {
        const chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom, null, {
            renderer: 'svg'
        });
        let option;
        myChart.setOption(
            (option = {
                color: colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // Use axis to trigger tooltip
                        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {
                            show: true,
                            name: title,
                        }
                    }
                },
                legend: {
                    show: false
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                yAxis: {
                    type: 'value',
                    name: '风险量',
                    nameLocation: 'center',
                    nameTextStyle: {
                        fontFamily: 'serif',
                        color: '#333',
                        fontSize: 16,
                        padding: [0, 0, 16, 0]
                    },
                    axisLabel: {
                        fontFamily: 'Times New Roman, Times, serif',
                        color: '#333',
                        fontSize: 16,
                    }
                },
                xAxis: {
                    type: 'category',
                    data: categoryData,
                    axisLabel: {
                        fontFamily: 'Times New Roman, Times, serif',
                        color: '#333',
                    },
                    data: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
                },
                series: [
                    {
                        data: [0, 0, 1943, 48706, 41587, 33383, 44279, 30158, 10757, 24432],
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
            })
        );

        option && myChart.setOption(option);

    }, [])
    return <div id="main" />
}