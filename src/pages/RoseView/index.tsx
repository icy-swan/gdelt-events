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
    if(!coutryList) {
        console.error('参数不对');
    }
    const data = [];
    const targetData = originData['2021'];
    coutryList.forEach(c => {
        const {countryCode:cc, countryName} = c;
        const td = targetData[cc];
        if(td) {
            data.push({ value: td.RecordCount, name:  countryName})
        }
    })
    data.sort((a, b)=> {
        return b.value - a.value;
    })


    let colors = ['#3498DB', '#E67E22', '#27AE60', '#9B59B6', '#F1C40F', '#dd2727', '#34495E', '#E74C3C', '#8E44AD', '#7F8C8D'];
    useEffect(() => {
        const chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom, null, {
            renderer: 'svg'
        });
        let option;
        myChart.setOption(
            (option = option = {
                color: colors,
                legend: {
                    orient: 'vertical',
                    icon: 'rect',
                    textStyle: {
                        fontFamily: 'serif'
                    },
                    show: false
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: type,
                        type: 'pie',
                        radius: [100, 400],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 0
                        },
                        label: {
                            position: 'inside',
                            textStyle: {
                                fontFamily: 'serif',
                            },
                            // color: '#fff',
                            // textBorderColor: '#333',
                            // textBorderWidth: 1
                        },
                        markPoint: {
                            symbol: 'none',
                        },
                        data,
                    }
                ]
            })
        );

        option && myChart.setOption(option);

    }, [])
    return <div id="main" />
}