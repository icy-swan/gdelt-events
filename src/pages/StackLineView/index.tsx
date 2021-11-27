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
    let colors = [];
    //处理数据
    const type = getQueryString('type');
    const typeCountryData = Object.assign({}, countryData[type]);
    const years = [];
    for (let year = 2015; year <= 2020; year++) {
        years.push(year + '');
    }
    let countryNames = [];
    let series = [];
    if ('isYDYL' === type) {
        const dataForCheck = originData['2020'];
        typeCountryData.all.forEach(c => {
            const { countryName, countryCode } = c;
            if (dataForCheck[countryCode]) {
                countryNames.push[countryName];
                let data = [];
                for (let year = 2015; year <= 2020; year++) {
                    const yearData = originData[`${year}`];
                    const cData = yearData[countryCode] || {};
                    data.push(cData.RecordCount || 0);
                }
                const serie = {
                    name: countryName,
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data,
                }
                series.push(serie);
            }
        })
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
                        name: '风险量',
                    }
                ],
                series,
            })
        );

        option && myChart.setOption(option);

    }, [])
    return <div id="main" />
}