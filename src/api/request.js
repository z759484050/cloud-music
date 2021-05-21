import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get ('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get ('/personalized');
}


export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest= (category,area,alpha,count) => {
  return axiosInstance.get(`/artist/list?type=${category}&area=${area}&initial=${alpha.toLowerCase()}&offset=${count}`)
}


export const getRankListRequest=()=>{
  return axiosInstance.get(`/toplist/detail`)
}


export const getPlayListRequest = id => {
  return axiosInstance.get (`/playlist/detail?id=${id}`);
};

export const getSingerInfoRequest = id => {
  return axiosInstance.get (`/artists?id=${id}`);
};



export const getLyricRequest = id => {
  return axiosInstance.get (`/lyric?id=${id}`);
};




//search组件
export const getHotKeyWordsRequest = () => {
  return axiosInstance.get (`/search/hot`);
};

export const getSuggestListRequest = query => {
  return axiosInstance.get (`/search/suggest?keywords=${query}`);
};

export const getResultSongsListRequest = query => {
  return axiosInstance.get (`/search?keywords=${query}`);
};



export const getSongDetailRequest = id => {
  return axiosInstance.get (`/song/detail?ids=${id}`);
};


export const getSongStatus=id=>{
  return axiosInstance.get(`/check/music?id=${id}`)
}