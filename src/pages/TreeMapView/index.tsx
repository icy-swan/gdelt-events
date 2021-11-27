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

function getLevelOption() {
  return [
    {
      itemStyle: {
        borderWidth: 0,
        gapWidth: 5
      }
    },
    {
      itemStyle: {
        gapWidth: 1
      }
    },
    {
      colorSaturation: [0.35, 0.5],
      itemStyle: {
        gapWidth: 1,
        borderColorSaturation: 0.6
      }
    }
  ];
}

export default () => {
  //处理数据
  let colors = ['#3498DB', '#E67E22', '#27AE60', '#9B59B6', '#F1C40F', '#dd2727', '#34495E', '#E74C3C', '#8E44AD', '#7F8C8D'];
  let targetData;
  const type = getQueryString('type');
  const typeCountryData = Object.assign({}, countryData[type]);

  const measureData = originData['2020'];

  if ('isYDYL' === type) {
    // 保持颜色对应
    colors = ['#E67E22', '#27AE60', '#F1C40F', '#3498DB', '#9B59B6', '#34495E', '#E74C3C', '#8E44AD', '#7F8C8D'];
    delete typeCountryData.all;
    const regionNames = Object.keys(typeCountryData);
    targetData = regionNames.map((name) => {
      let value = 0;
      const children = typeCountryData[name].map(cData => {
        const { countryCode, countryName } = cData;
        const cMeasureData = measureData[countryCode] || { RecordCount: 0 };
        if (!measureData[countryCode]) {
          console.log(countryCode, countryName);
        }
        const cValue = cMeasureData.RecordCount;
        value += cValue;
        return {
          value: cValue,
          name: countryName,
          path: name,
        }
      })
      return {
        value,
        name,
        path: name,
        children,
      }
    });
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
        series: [
          {
            name: '2020',
            type: 'treemap',
            visibleMin: 300,
            label: {
              show: true,
              formatter: '{b}',
              fontSize: 20,
            },
            levels: getLevelOption(),
            data: targetData,
            breadcrumb: {
              show: false
            }
          }
        ]
      })
    );

    option && myChart.setOption(option);

  }, [])
  return <div id="main" />
}