import React, { useEffect } from 'react'
import * as echarts from 'echarts'

export default () => {
    const colors = ['#3498DB', '#E67E22', '#27AE60', '#9B59B6', '#F1C40F', '#dd2727', '#34495E', '#E74C3C', '#8E44AD', '#7F8C8D'];
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
                            name: '乌克兰俄罗斯',
                        }
                    }
                },
                legend: {
                    show: true,
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
                        padding: [0, 0, 36, 0]
                    },
                    axisLabel: {
                        fontFamily: 'Times New Roman, Times, serif',
                        color: '#333',
                        fontSize: 16,
                    }
                },
                xAxis: {
                    type: 'category',
                    // data: categoryData,
                    axisLabel: {
                        fontFamily: 'Times New Roman, Times, serif',
                        color: '#333',
                    },
                    data: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
                },
                series: [
                    // {
                    //     name: '乌乌',
                    //     data: [8970, 8206, 7372, 10879, 4847, 3272],
                    //     type: 'bar',
                    // },
                    {
                        name: '俄乌',
                        data: [3879, 3599, 6399, 149822, 61965, 44058, 35324, 46286, 32378, 11441, 25570],
                        type: 'bar',
                    },
                    // {
                    //     name: '俄美',
                    //     data: [72795, 110958, 97017, 65365, 34208, 30324],
                    //     type: 'bar',
                    // },
                    // {
                    //     name: '中美',
                    //     data: [50954, 44699, 62201, 62517, 85016, 46016],
                    //     type: 'bar',
                    // }
                ]
            })
        );

        option && myChart.setOption(option);

    }, [])
    return <div id="main" />
}