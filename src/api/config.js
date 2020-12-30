import axios from 'axios'


export const baseUrl = 'http://localhost:3000/';

//axios 的实例及拦截器配置
const axiosInstance = axios.create ({
  baseURL: baseUrl,
  timeout:1000
});

axiosInstance.interceptors.response.use (
  res => res.data,
  err => {
    console.log (err, "网络错误");
  }
);

export {
  axiosInstance
};



// 歌手首字母
export const alphaTypes = [{
    key: "A",
    name: "A"
  },
  {
    key: "B",
    name: "B"
  },
  {
    key: "C",
    name: "C"
  },
  {
    key: "D",
    name: "D"
  },
  {
    key: "E",
    name: "E"
  },
  {
    key: "F",
    name: "F"
  },
  {
    key: "G",
    name: "G"
  },
  {
    key: "H",
    name: "H"
  },
  {
    key: "I",
    name: "I"
  },
  {
    key: "J",
    name: "J"
  },
  {
    key: "K",
    name: "K"
  },
  {
    key: "L",
    name: "L"
  },
  {
    key: "M",
    name: "M"
  },
  {
    key: "N",
    name: "N"
  },
  {
    key: "O",
    name: "O"
  },
  {
    key: "P",
    name: "P"
  },
  {
    key: "Q",
    name: "Q"
  },
  {
    key: "R",
    name: "R"
  },
  {
    key: "S",
    name: "S"
  },
  {
    key: "T",
    name: "T"
  },
  {
    key: "U",
    name: "U"
  },
  {
    key: "V",
    name: "V"
  },
  {
    key: "W",
    name: "W"
  },
  {
    key: "X",
    name: "X"
  },
  {
    key: "Y",
    name: "Y"
  },
  {
    key: "Z",
    name: "Z"
  }
];

// 'cat'参数已经失效


// type 取值
//     1:男歌手
//     2:女歌手
//     3:乐队
//area 取值
//     -1:全部
//     7华语
//     96欧美
//     8:日本
//     16韩国
//     0:其他

export const categoryTypes=[{
  key:'1',
  name:'男歌手'
 },
 {
  key:'2',
  name:'女歌手'
 },
 {
  key:'3',
  name:'乐队'
 },
]

export const categoryArea=[{
  key:'-1',
  name:'全部',
 },
 {
   key:'7',
   name:'华语'
 },
 {
  key:'96',
  name:'欧美'
 },
 {
  key:'8',
  name:'日本'
 },
 {
  key:'16',
  name:'韩国'
 },
 {
   key:'0',
   name:'其他'
 }
]


export const RankTypes = {
  "0": "云音乐新歌榜",
  "1": "云音乐热歌榜",
  "2": "网易原创歌曲榜",
  "3": "云音乐飙升榜",
  "4": "云音乐国电榜",
  "5": "UK排行榜周榜",
  "6": "美国Billboard周榜",
  "7": "KTV唛榜",
  "8": "iTunes榜",
  "9": "Hit FM Top榜",
  "10": "日本Oricon周榜",
  "11": "韩国Melon排行榜周榜",
  "12": "韩国Mnet排行榜周榜",
  "13": "韩国Melon原声周榜",
  "14": "中国TOP排行榜（港台榜）",
  "15": "中国TOP排行榜（内地榜）",
  "16": "香港电台中文歌曲龙虎榜",
  "17": "华语金曲榜",
  "18": "中国嘻哈榜",
  "19": "法国 NRJ Vos Hits 周榜",
  "20": "台湾Hito排行榜",
  "21": "Beatport全球电子舞曲榜",
  "22": "云音乐ACG音乐榜",
  "23": "江小白YOLO云音乐说唱榜"
};
export const HEADER_HEIGHT = 45;