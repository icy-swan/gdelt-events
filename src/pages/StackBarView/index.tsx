import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import originData from '../../config/originData';
import countryData from '../../config/countryData';

const {region} = countryData;


function getQueryString(name: string) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    };
    return null;
}

export default () => {
    const type = getQueryString('type');
    const coutryList = region[type];
    let colors = ['#3498DB', '#E67E22', '#27AE60', '#9B59B6', '#F1C40F', '#dd2727', '#34495E', '#E74C3C', '#8E44AD', '#7F8C8D'];
    const categoryData = [];
    const series = [
        {
            name: '合作沟通摩擦',
            type: 'bar',
            stack: 'total',
        },
        {
            name: '政局变更摩擦',
            type: 'bar',
            stack: 'total',
        },
        {
            name: '战争武装摩擦',
            type: 'bar',
            stack: 'total',
        },
        {
            name: '司法治安摩擦',
            type: 'bar',
            stack: 'total',
        },
        {
            name: '经济财产摩擦',
            type: 'bar',
            stack: 'total',
        },
    ]
    for(let i = 2016; i<= 2021; i++) {
        for(let j = 1; j<= 4; j++) {
            categoryData.push(`${i}季${j}`)
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
                            name: type,
                        }
                    }
                },
                legend: {},
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                yAxis: {
                  type: 'value'
                },
                xAxis: {
                  type: 'category',
                  data: categoryData
                },
                series,
              })
        );

        option && myChart.setOption(option);

    }, [])
    return <div id="main" />
}