import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import originData from '../../config/originData';
import countryData from '../../config/countryData';

function getQueryString(name: string) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    };
    return null;
}

export default () => {
    let colors = ['#3498DB', '#E67E22', '#27AE60', '#9B59B6', '#F1C40F', '#dd2727', '#34495E', '#E74C3C', '#8E44AD', '#7F8C8D'];
    let yName = '风险量';
    //处理数据
    const type = getQueryString('type');
    const typeCountryData = Object.assign({}, countryData[type]);
    const years = [];
    for (let year = 2014; year <= 2020; year++) {
        years.push(year + '');
    }
    let countryNames = [];
    let series = [];
    if ('isYDYL' === type) {
        // code-name结构
        let ydylCountryNames = {};
        countryData.isYDYL.all.forEach(c => {
            const {countryCode, countryName} = c;
            ydylCountryNames[countryCode] = countryNames;
        })
        countryNames = ['一带一路', '非一带一路'];
        const s1 = {
            name: countryNames[0],
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            data: []
        }
        const s2 = {
            name: countryNames[1],
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            data: []
        }
        for (let year = 2014; year <= 2020; year++) {
            const yearData = originData[`${year}`];
            let data1 = 0;
            let data2 = 0;
            for (const [cc, value] of Object.entries(yearData)) {
                const { RecordCount } = value;
                // 如果是一带一路
                if(ydylCountryNames[cc]) {
                    data1 += parseInt(RecordCount);
                } else {
                    data2 += parseInt(RecordCount);
                }
            }
            s1.data.push(data1);
            s2.data.push(data2);
        }
        series.push(s1);
        series.push(s2);
        let tmpData3 = Array.from(series[0].data);
        let pre = null;
        const data3 = tmpData3.map(v => {
            if(pre === null) {
                pre = v;
                return null;
            } else {
                let tmpData =(v - pre) / pre * 100;
                pre = v;
                return tmpData;
            }
        })
        data3.shift();

        let tmpData4 = Array.from(series[1].data);
        pre = null;
        const data4 = tmpData4.map(v => {
            if(pre === null) {
                pre = v;
                return null;
            } else {
                let tmpData =(v - pre) / pre * 100;
                pre = v;
                return tmpData;
            }
        })
        data4.shift();

        series[0].data.shift();
        series[1].data.shift();
        series.push({
            name: countryNames[0] + '同比',
            type: 'bar',
            // stack: 'Total',
            areaStyle: {},
            // emphasis: {
            //     focus: 'series'
            // },
            yAxisIndex: 1,
            data: data3,
        }),
        series.push({
            name: countryNames[1] + '同比',
            type: 'bar',
            // stack: 'Total',
            areaStyle: {},
            // emphasis: {
            //     focus: 'series'
            // },
            yAxisIndex: 1,
            data: data4,
        })
        years.shift();
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
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        saveAsImage: { show: true }
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: countryNames,
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: { show: false },
                        data: years,
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: yName,
                    },
                    {
                        type: 'value',
                        name: `${yName}年同比%`,
                    }
                ],
                series,
            })
        );

        option && myChart.setOption(option);

    }, [])
    return <div id="main" />
}