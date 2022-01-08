import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import originData from '../../config/originData';

export default () => {
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
                    }
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
                        name: 'Nightingale Chart',
                        type: 'pie',
                        radius: [50, 250],
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
                        data: [
                            { value: 4136, name: '合作沟通摩擦' },
                            { value: 2632, name: '政局变更摩擦' },
                            { value: 8631, name: '战争武装摩擦' },
                            { value: 6749, name: '司法治安摩擦' },
                            { value: 3209, name: '经济财产摩擦' },
                        ]
                    }
                ]
            })
        );

        option && myChart.setOption(option);

    }, [])
    return <div id="main" />
}