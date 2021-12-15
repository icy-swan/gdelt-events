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
    // 获取亚洲国家
    const asiaCountry = countryData.region['亚洲'];
    const asiaData = originData['2020'];
    const data = asiaCountry.map(c => {
        const {countryCode, countryName} = c;
        const tempData = asiaData[countryCode] || {RecordCount: 0}
        return {
            name: countryName,
            value: tempData.RecordCount
        }
    }).sort((a, b) => {
        return b.value - a.value;
    }).filter(v=> {
        return v.value !== 0;
    })
    const series = [{
        name: '亚洲各国风险分布',
        type: 'pie',
        radius: [50, 450],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
            borderRadius: 0
        },
        label: {
            show: true,
            // position: 'inner',
        },
        data
    }];



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
                series,
            })
        );

        option && myChart.setOption(option);

    }, [])
    return <div id="main" />
}