import React, { useEffect } from 'react'
import * as echarts from 'echarts'

// 俄罗斯乌克兰
// const data = [3879, 3599, 6399, 149822, 61965, 44058, 35324, 46286, 32378, 11441, 25570];
// 乌克兰自身
// const data = [
//     3412,
//     3060,
//     3151,
//     26992,
//     12842,
//     9483,
//     8636,
//     7819,
//     11542,
//     5164,
//     3534
// ]
// 美俄
const data = [
    16012,
    24608,
    52239,
    75448,
    51850,
    78290,
    119429,
    102870,
    69690,
    36644,
    32624,
]
const tbData = [];
data.reduce((pre, next) => {
    tbData.push((next - pre) / pre * 100);
    return next;
})
data.shift();

export default () => {
    const colors = ['#27AE60', '#9B59B6', '#F1C40F', '#dd2727', '#34495E', '#E74C3C', '#8E44AD', '#7F8C8D'];
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
                            name: '乌克兰风险量同比',
                        }
                    }
                },
                legend: {
                    show: false,
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                yAxis: [
                    // {
                    //     type: 'value',
                    //     name: '风险量',
                    //     // nameLocation: 'center',
                    //     nameTextStyle: {
                    //         fontFamily: 'serif',
                    //         color: '#333',
                    //         fontSize: 16,
                    //     },
                    //     // min: -30000,
                    //     axisLabel: {
                    //         fontFamily: 'Times New Roman, Times, serif',
                    //         color: '#333',
                    //         fontSize: 16,
                    //     }
                    // },
                    {
                        type: 'value',
                        name: '风险量同比',
                        // nameLocation: 'center',
                        min: -100,
                        nameTextStyle: {
                            fontFamily: 'serif',
                            color: '#333',
                            fontSize: 16,
                        },
                        axisLabel: {
                            fontFamily: 'Times New Roman, Times, serif',
                            color: '#333',
                            fontSize: 16,
                            formatter: '{value}%'
                        }
                    }
                ],
                xAxis: {
                    type: 'category',
                    // data: categoryData,
                    axisLabel: {
                        fontFamily: 'Times New Roman, Times, serif',
                        color: '#333',
                    },
                    data: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
                },
                series: [
                    // {
                    //     name: '俄乌风险总量',
                    //     data,
                    //     type: 'bar',
                    // },
                    {
                        name: '俄乌风险量同比',
                        data: tbData,
                        type: 'line',
                    },
                ]
            })
        );

        option && myChart.setOption(option);

    }, [])
    return <div id="main" />
}