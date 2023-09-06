"use client";

import NewsCard from "@components/NewsCard";
import { useNewsArticlesFetchMutation } from "@slices/usersApiSlice";
import { useState, useEffect } from "react";

const News = () => {
  const [NewsArticles, setNewsArticles] = useState([]);

  const [fetchNewsArticles] = useNewsArticlesFetchMutation();

  const handleDataFetch = async () => {
    try {
      const res = await fetchNewsArticles().unwrap();

      console.log({ res });

      if (res.status == "Success") setNewsArticles(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  return (
    <div>
      <div className="py-8">
        <div className="py-2">
          <h3 className="text-center font-bold">news</h3>
          <p className="text-4xl text-center font-light">News Articles</p>

          <div className="flex">
            <div className="h-[0.2rem] w-[8rem] my-2 mx-auto bg-primary"></div>
          </div>
        </div>

        <div>
          <div className="pt-8 pb-20 px-4">
            <div className="flex">
              <div className="m-auto lg:w-4/5 sm:w-[90%] w-[95%]">
                {NewsArticles.length > 0 ? (
                  <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    {NewsArticles.map((article, index) => (
                      <NewsCard key={index} article={article} />
                    ))}
                  </div>
                ) : (
                  <div className="py-8 px-12 h-[150px]">
                    <p className="text-2xl text-center">
                      No news articles currently
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
