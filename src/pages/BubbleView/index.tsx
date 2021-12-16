import './style.less'
import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import originData2021 from '../../config/originData2021'
import originData from '../../config/originData'
import countryData from '../../config/countryData';

export default () => {
    useEffect(()=> {
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom, null, {
            renderer: 'svg'
        });
        var option;
        const lastData = originData[2020];
        const targetData = originData2021[2021];
        // const lastData = originData[2019];
        // const targetData = originData[2020];
        var series = [];
        var regionsList = ['北美洲', '亚洲', '欧洲', '大洋洲', '非洲', '南美洲'];

        const regionCountrys = Object.assign({}, countryData['region']);
        regionsList.forEach(k => {
            const countryNames = regionCountrys[k];

            // const countryData = targetData[k];
            // const countryNames = Object.keys(countryData);
            const data = [];
            countryNames.forEach(c => {
                const {countryName, countryCode} = c;
                const countryObj = targetData[countryCode];
                if(countryObj) {
                    const curC = countryObj.RecordCount;
                    const lastC = lastData[countryCode].RecordCount;
                    const risk1 = (curC - lastC) / lastC;
                    data.push([countryObj.RecordCount, risk1, countryName]);
                }
            })
            series.push({
                name: k,
                type: 'scatter',
                itemStyle: {
                    opacity: 0.8,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowColor: 'rgba(0,0,0,0.3)'
                },
                data,
                symbolSize: 30,
                label: {
                    show: true,
                    formatter: (params)=> {
                        // debugger
                        return params.data[2]
                    },
                    position: 'top',
                    // width: 50,
                    // overflow: 'truncate',
                    // fontSize: 16
                },
                // markPoint: {
                //     data: [
                //         // { type: 'max', name: 'Max', valueIndex: 0 },
                //         // { type: 'min', name: 'Min', valueIndex: 0 },
                //         { type: 'max', name: 'Max', valueIndex: 1 },
                //         { type: 'min', name: 'Min', valueIndex: 1 }
                //     ]
                // }
            });
        })
        myChart.hideLoading();
        myChart.setOption(
            (option = {
                color: ['#3498DB', '#E67E22', '#27AE60', '#9B59B6', '#F1C40F', '#dd2727', '#34495E', '#E74C3C', '#8E44AD', '#7F8C8D'],
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar', 'stack'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    top: 10,
                    data: regionsList,
                    textStyle: {
                        fontSize: 16
                    }
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    top: '18%',
                    bottom: '10%'
                },
                xAxis: {
                    type: 'log',
                    name: '风险量',
                    nameGap: 16,
                    nameTextStyle: {
                        fontSize: 16
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '变化率',
                    nameLocation: 'end',
                    nameGap: 20,
                    splitNumber: 10,
                    nameTextStyle: {
                        fontSize: 16
                    },
                    axisLabel: {
                        formatter: function (value, index) {
                            return value * 100 + '%';
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                tooltip: {
                    formatter: function (param) {
                        var value = param.value;
                        return value[2] + ' : 数量' + value[0] + ' 同比' + (parseFloat(value[1] * 100)).toFixed(2) + '%';
                    }
                },
                series,
            })
        );

        option && myChart.setOption(option);

    }, [])
    return <div id="main" />
}