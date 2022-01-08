import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import allData from '../../config/countryMonthYearRecordCount';
import countryData from '../../config/countryKV';

function getQueryString(name: string) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    };
    return null;
}

function toTwo(n) {
    return n < 10 ? `0${n}` : n;
}

export default () => {
    const type = getQueryString('type').toUpperCase();
    const targetData = allData[type];
    const cd = countryData[type];
    if (!targetData || !cd) {
        return console.error('错误的国家输入');
    }
    const title = cd.countryName;
    let colors = ['#3498DB', '#E67E22', '#27AE60', '#9B59B6', '#F1C40F', '#dd2727', '#34495E', '#E74C3C', '#8E44AD', '#7F8C8D'];
    const categoryData = [];
    const series = [
        {
            name: '合作沟通摩擦',
            type: 'bar',
            stack: 'total',
            data: [],
        },
        {
            name: '政局变更摩擦',
            type: 'bar',
            stack: 'total',
            data: [],
        },
        {
            name: '战争武装摩擦',
            type: 'bar',
            stack: 'total',
            data: [],
        },
        {
            name: '司法治安摩擦',
            type: 'bar',
            stack: 'total',
            data: [],
        },
        {
            name: '经济财产摩擦',
            type: 'bar',
            stack: 'total',
            data: [],
        },
    ]
    for (let i = 2016; i <= 2021; i++) {
        for (let j = 1; j <= 4; j++) {
            categoryData.push(`${i}季${j}`);
            let quarTerSubEventData = [0, 0, 0, 0, 0];
            // 季度内的月份数据累加
            for (let k = 1; k <= 3; k++) {
                const monthYear = `${i}${toTwo((j - 1) * 3 + k)}`;
                const myData = targetData[monthYear] || {};
                quarTerSubEventData = quarTerSubEventData.map((v, index) => {
                    const subEvent = index + 1;
                    const y = parseInt(myData[subEvent]) || 0;
                    return v + y;
                })
            }
            // 写入series
            series.forEach((s, idx) => {
                s.data.push(quarTerSubEventData[idx])
            })
        }
    }
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
                    }
                },
                series,
            })
        );

        option && myChart.setOption(option);

    }, [])
    return <div id="main" />
}