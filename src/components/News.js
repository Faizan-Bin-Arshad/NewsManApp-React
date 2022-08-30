import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url); //fetch function always takes a url as a parameter
    props.setProgress(30);
    let parsedData = await data.json(); //It will contain the parsed data
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalArticles(parsedData.totalArticles);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `NewsMan - ${capitalizeFirstLetter(props.category)}`;
    updateNews();
  }, [])

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url); //fetch function always takes a url as a parameter
    let parsedData = await data.json(); //It will contain the parsed data
    setArticles(articles.concat(parsedData.articles));//This line will concat the articles
    setTotalArticles(parsedData.totalArticles);
    setLoading(false);
  };



  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '70px' }}>NewsMan - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalArticles}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 70) : " "} description={element.description ? element.description.slice(0, 88) : ""}
                    imageUrl={element.urlToImage ? element.urlToImage : "https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg"}
                    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

//Props functions always come at the end of the function

News.defaultProps = {
  pageSize: 6,
  country: 'us',
  category: "sports"
}

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
}

export default News;
