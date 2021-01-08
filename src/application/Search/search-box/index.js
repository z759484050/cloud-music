import React, {useRef, useState, useEffect, useMemo} from 'react';
import { debounce } from '../../../api/until';
import {SearchBoxWrapper} from './style'
const SearchBox=(props)=>{
  const queryRef = useRef ();
  const [query, setQuery] = useState ('');
  // 从父组件热门搜索中拿到的新关键词
  const { newQuery } = props;
  // 父组件针对搜索关键字发请求相关的处理
  const { handleQuery } = props;
  // 根据关键字是否存在决定清空按钮的显示 / 隐藏 
  const displayStyle = query ? {display: 'block'}: {display: 'none'};

  const handleChange = (e) => {
    // 搜索框内容改变时的逻辑
    setQuery (e.currentTarget.value);
  };
  const clearQuery = () => {
    setQuery ('');
    queryRef.current.focus ();
  }
  let handleQueryDebounce = useMemo(() => {
    return debounce (handleQuery, 500);
  }, [handleQuery]);

  useEffect (() => {
    // 注意防抖
    handleQueryDebounce (query);
    // eslint-disable-next-line
  }, [query]);
  

  useEffect (() => {
    queryRef.current.focus ();
    // eslint-disable-next-line
  }, []);


  useEffect (() => {
    if (newQuery !== query){
      setQuery (newQuery);
    }
    // eslint-disable-next-line
  }, [newQuery]);



 


  return(
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => props.back ()}>&#xe655;</i>
      <input ref={queryRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleChange}/>
      <i className="iconfont icon-delete" onClick={clearQuery} style={displayStyle}>&#xe600;</i>
    </SearchBoxWrapper>
  )
}

export default React.memo(SearchBox)