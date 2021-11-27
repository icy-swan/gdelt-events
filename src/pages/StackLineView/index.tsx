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
    } else if ('compareYDYL' === type) {
        // code-name结构
        colors = ['#c8102e', '#3B3B6D'];
        let ydylCountryNames = {};
        countryData.isYDYL.all.forEach(c => {
            const { countryCode, countryName } = c;
            ydylCountryNames[countryCode] = countryNames;
        })
        countryNames = ['一带一路', '非一带一路'];
        const s1 = {
            name: countryNames[0],
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: []
        }
        const s2 = {
            name: countryNames[1],
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: []
        }
        for (let year = 2015; year <= 2020; year++) {
            const yearData = originData[`${year}`];
            let data1 = 0;
            let data2 = 0;
            for (const [cc, value] of Object.entries(yearData)) {
                const { RecordCount } = value;
                // 如果是一带一路
                if (ydylCountryNames[cc]) {
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
    } else if ('compareYDYLGYH' === type) {
        // code-name结构
        let ydylCountryNames = {};
        countryData.isYDYL.all.forEach(c => {
            const { countryCode, countryName } = c;
            ydylCountryNames[countryCode] = countryNames;
        })
        countryNames = ['一带一路', '非一带一路'];
        const s1 = {
            name: countryNames[0],
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: []
        }
        const s2 = {
            name: countryNames[1],
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: []
        }
        for (let year = 2015; year <= 2020; year++) {
            const yearData = originData[`${year}`];
            let data1 = 0;
            let data2 = 0;
            for (const [cc, value] of Object.entries(yearData)) {
                const { RecordCount } = value;
                // 如果是一带一路
                if (ydylCountryNames[cc]) {
                    data1 += parseInt(RecordCount);
                } else {
                    data2 += parseInt(RecordCount);
                }
            }
            s1.data.push(data1);
            s2.data.push(data2);
        }
        const t1 = s1.data.map((v, i) => {
            let v2 = s2.data[i];
            return v / (v + v2) * 100;
        })
        const t2 = s2.data.map((v, i) => {
            let v2 = s1.data[i];
            return v / (v + v2) * 100;
        })
        s1.data = t1;
        s2.data = t2;
        series.push(s1);
        series.push(s2);
        yName = '风险量%';
    } else if ('isSXD' === type) {
        countryNames = ['北美自贸区', '东盟', '欧盟'];
        const s1 = {
            name: countryNames[0],
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: []
        }
        const s2 = {
            name: countryNames[1],
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: []
        }
        const s3 = {
            name: countryNames[2],
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: []
        }
        function countryArrToObj(or) {
            let ct = {};
            or.forEach(c => {
                const { countryCode, countryName } = c;
                ct[countryCode] = countryNames;
            })
            return ct;
        }
        const isDM = countryArrToObj(countryData.isDM.all);
        const isOM = countryArrToObj(countryData.isOM.all);
        const isBMZM = countryArrToObj(countryData.isBMZM.all);
        for (let year = 2015; year <= 2020; year++) {
            const yearData = originData[`${year}`];
            let data1 = 0;
            let data2 = 0;
            let data3 = 0;
            for (const [cc, value] of Object.entries(yearData)) {
                const { RecordCount } = value;
                // 如果是一带一路
                if (isBMZM[cc]) {
                    data1 += parseInt(RecordCount);
                } else if (isDM[cc]) {
                    data2 += parseInt(RecordCount);
                } else if (isOM[cc]) {
                    data3 += parseInt(RecordCount);
                }
            }
            s1.data.push(data1);
            s2.data.push(data2);
            s3.data.push(data3);
        }
        series.push(s1);
        series.push(s2);
        series.push(s3);
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
                        nameTextStyle: {
                            color: '#333',
                            fontSize: 16,
                        },
                        axisLabel: {
                            color: '#333',
                            fontSize: 16,
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: yName,
                        nameTextStyle: {
                            color: '#333',
                            fontSize: 16,
                        },
                        axisLabel: {
                            color: '#333',
                            fontSize: 16,
                        }
                    }
                ],
                series,
            })
        );

        option && myChart.setOption(option);

    }, [])
    return <div id="main" />
}