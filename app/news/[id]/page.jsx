"use client";

import { useNewsArticleFetchMutation } from "@slices/usersApiSlice";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";

const NewsArticle = ({ params }) => {
  const [NewsArticle, setNewsArticle] = useState(null);

  const [fetchNewsArticle] = useNewsArticleFetchMutation();

  const handleDataFetch = async () => {
    try {
      const res = await fetchNewsArticle(params.id).unwrap();

      if (res.status == "Success") setNewsArticle(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleDataFetch();
  }, []);
  return (
    <div>
      <div className="py-8">
        <div className="border-b-[1.9px] border-light">
          <div className="m-auto w-4/5">
            <div className="py-4 relative lg:h-[250px] h-[200px]">
              <img
                src={
                  NewsArticle
                    ? NewsArticle?.image
                      ? NewsArticle?.image
                      : ""
                    : "/assets/images/img2.png"
                }
                alt="newsblog image"
                className="h-full w-auto object-cover"
              />
            </div>

            <div className="py-2">
              <h2 className="text-3xl">
                {NewsArticle
                  ? NewsArticle?.title
                    ? NewsArticle?.title
                    : ""
                  : ""}
              </h2>
            </div>

            <div>
              <div className="flex">
                <div>
                  <p className="text-base font-bold">
                    {NewsArticle
                      ? NewsArticle?.createdAt
                        ? moment(NewsArticle?.createdAt).fromNow()
                        : ""
                      : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="py-8">
              <div
                className="__blog-content"
                dangerouslySetInnerHTML={{
                  __html: NewsArticle
                    ? NewsArticle?.article
                      ? NewsArticle?.article
                      : ""
                    : "",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
