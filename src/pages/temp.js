// https://codesandbox.io/s/oo0m4?file=/index.ts
import { WordCloud } from '@antv/g2plot';

const data = [
  {
      name: '美国（霸权）',
      value: 20,
  },
  {
      name: '澳大利亚（贸易战与中美博弈）',
      value: 7,
  },
  {
      name: '加拿大（孟晚舟与中美博弈）',
      value: 7,
  },
  {
      name: '英国（脱欧与中美博弈）',
      value: 7,
  },
  {
      name: '菲律宾（南海主权）',
      value: 6,
  },
  {
      name: '巴基斯坦（恐怖主义）',
      value: 6,
  },
  {
      name: '日本（历史遗留问题）',
      value: 6,
  },
  {
      name: '印度（边境流血冲突）',
      value: 6,
  },
  {
      name: '俄罗斯联邦（乌克兰问题）',
      value: 5,
  },
  {
      name: '缅甸（内战）',
      value: 5,
  },
  {
      name: '朝鲜（核问题）',
      value: 5,
  },
  {
      name: '立陶宛（台湾问题）',
      value: 5,
  },
  {
      name: '马来西亚（南海经济开发争议）',
      value: 4,
  },
  {
      name: '阿富汗（塔利班）',
      value: 4,
  },
  {
      name: '越南（大国南海地缘博弈）',
      value: 4,
  },
  {
      name: '斯里兰卡（经济援助VS经济依赖）',
      value: 4,
  },
  {
      name: '德国（中美欧博弈）',
      value: 3,
  },
  {
      name: '尼日利亚（绑架）',
      value: 3,
  },
  {
      name: '巴西（少量经济博弈）',
      value: 3,
  },
  {
      name: '尼泊尔（边境领土争议）',
      value: 3,
  },
  {
      name: '文莱（大国南海地缘博弈）',
      value: 2,
  },
  {
      name: '韩国（萨德与中美博弈）',
      value: 2,
  },
  {
      name: '泰国（境内安全问题）',
      value: 2,
  },
  {
      name: '匈牙利（中美博弈）',
      value: 2,
  },
  {
      name: '伊拉克（多国联军与恐怖主义混乱）',
      value: 2,
  },
  {
      name: '印度尼西亚（南海经济开发争议）',
      value: 2,
  },
  {
      name: '法国（干涉中国内政）',
      value: 2,
  },
  {
      name: '伊朗（核问题）',
      value: 1,
  },
  {
      name: '意大利（少量经济博弈）',
      value: 1,
  }
];
    const wordCloud = new WordCloud('container', {
      data,
      wordField: 'name',
      weightField: 'value',
      colorField: 'name',
      color:['#3C3B6E', '#00843D', '#d42a24', '#03237c', '#002c77', '#043e17', '#c1282f', '#FBAB60', '#180d1b'],
      wordStyle: {
        fontFamily: 'Verdana',
        fontSize: [10, 40],
        rotation: 0,
      },
      width: 1200,
      height: 600,
      // 返回值设置成一个 [0, 1) 区间内的值，
      // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
      random: () => 0.5,
    });

    wordCloud.render();
