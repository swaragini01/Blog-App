import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  ghostBtn,
  loadingClass,
  errorClass,
  timestampClass,
  pageWrapper,
  pageTitleClass,
  bodyText,
  emptyStateClass,
} from "../styles/common.js";

const API_BASE_URL = "https://your-blog-backend.onrender.com";

function BrowseArticles() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/user-api/articles`, { withCredentials: true });

        setArticles(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, {
      state: articleObj,
    });
  };

  if (loading) {
    return <p className={loadingClass}>Loading articles...</p>;
  }

  return (
    <div className={pageWrapper}>
      <div className="mb-6">
        <h1 className={pageTitleClass}>Browse Articles</h1>
        <p className={`${bodyText} mt-2`}>Read articles from authors and add your comments.</p>
      </div>

      {error && <p className={errorClass}>{error}</p>}

      {articles.length === 0 ? (
        <div className={emptyStateClass}>No articles are available right now.</div>
      ) : (
        <div className={articleGrid}>
          {articles.map((articleObj) => (
            <div className={articleCardClass} key={articleObj._id}>
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0f6b68]">
                  {articleObj.category}
                </p>

                <p className={articleTitle}>{articleObj.title}</p>

                <p className={articleExcerpt}>{articleObj.content.slice(0, 120)}...</p>

                <p className={timestampClass}>{formatDateIST(articleObj.createdAt)}</p>
              </div>

              <button className={`${ghostBtn} mt-auto pt-4`} onClick={() => navigateToArticleByID(articleObj)}>
                Read Article
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseArticles;
