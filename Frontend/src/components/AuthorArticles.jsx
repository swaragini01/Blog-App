import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";

import {
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  ghostBtn,
  loadingClass,
  errorClass,
  emptyStateClass,
  pageTitleClass,
  bodyText,
} from "../styles/common";

// Grab the base URL dynamically from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function AuthorArticles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);
  const authorId = user?._id || user?.userId;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authorId) return;

    const getAuthorArticles = async () => {
      setLoading(true);

      try {
        // Dynamic URL update using the base environment variable
        const res = await axios.get(`${API_BASE_URL}/author-api/articles/${authorId}`, { withCredentials: true });

        setArticles(res.data.payload.filter((article) => article.isArticleActive !== false));
      } catch (err) {
        setError(err.response?.data?.error || err.response?.data?.message || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    getAuthorArticles();
  }, [authorId]);

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
    });
  };

  if (loading) return <p className={loadingClass}>Loading articles...</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  if (articles.length === 0) {
    return <div className={emptyStateClass}>You haven't published any active articles yet.</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className={pageTitleClass}>Your Articles</h1>
        <p className={`${bodyText} mt-2`}>Review, edit, and manage your published articles.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <div key={article._id} className={articleCardClass}>
            <div className="flex flex-col gap-3">
              <p className={articleMeta}>{article.category}</p>
              <p className={articleTitle}>{article.title}</p>
              <p className={articleExcerpt}>{article.content.slice(0, 120)}...</p>
              <p className="text-xs text-[#6f7a8e]">{formatDate(article.createdAt)}</p>
            </div>

            <button className={`${ghostBtn} mt-auto pt-4`} onClick={() => openArticle(article)}>
              Read Article
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthorArticles;