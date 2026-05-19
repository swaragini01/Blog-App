import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../stores/authStore";

import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  primaryBtn,
  formGroup,
  inputClass,
  labelClass,
  emptyStateClass,
  loadingClass,
  errorClass,
} from "../styles/common.js";

const API_BASE_URL = "https://blog-app-new-9bp9.onrender.com";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);
  const userId = user?._id || user?.userId;

  const [article, setArticle] = useState(location.state || null);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authorId = article?.author?._id || article?.author;
  const isOwnArticle = user?.role === "AUTHOR" && authorId === userId;

  useEffect(() => {
    if (article) return;

    const getArticle = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `${API_BASE_URL}/common-api/articles/${id}`,
          { withCredentials: true }
        );

        setArticle(res.data.payload);
      } catch (err) {
        setError(
          err.response?.data?.error ||
            err.response?.data?.message ||
            "Failed to load article"
        );
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [article, id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const deleteArticle = async () => {
    const confirmed = window.confirm("Delete this article?");
    if (!confirmed) return;

    setDeleteLoading(true);

    try {
      await axios.patch(
        `${API_BASE_URL}/author-api/articles/${id}/status`,
        { isArticleActive: false },
        { withCredentials: true }
      );

      navigate("/author-profile/articles");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to delete article"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };

  const addComment = async (event) => {
    event.preventDefault();

    const cleanComment = comment.trim();

    if (!cleanComment || !userId) return;

    setCommentLoading(true);

    try {
      const res = await axios.put(
        `${API_BASE_URL}/user-api/articles`,
        {
          user: userId,
          articleId: id,
          comment: cleanComment,
        },
        { withCredentials: true }
      );

      setArticle(res.data.payload);
      setComment("");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to add comment"
      );
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <p className={loadingClass}>Loading article...</p>;

  if (error && !article) return <p className={errorClass}>{error}</p>;

  if (!article) return null;

  return (
    <div className={articlePageWrapper}>
      <div className={articleHeader}>
        <span className={articleCategory}>{article.category}</span>

        <h1 className={articleMainTitle}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className={authorInfo}>
            By {article.author?.firstName || "Author"}
          </div>

          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      {error && <p className={errorClass}>{error}</p>}

      <div className={articleContent}>{article.content}</div>

      {isOwnArticle && (
        <div className={articleActions}>
          <button
            className={editBtn}
            onClick={() => editArticle(article)}
          >
            Edit
          </button>

          <button
            className={deleteBtn}
            onClick={deleteArticle}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}

      <section className="mt-10 rounded-lg border border-[#dfe5ee] bg-white p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-[#172033]">
            Comments
          </h2>

          <span className="text-sm text-[#6f7a8e]">
            {article.comments?.length || 0}
          </span>
        </div>

        {user?.role === "USER" && (
          <form onSubmit={addComment} className="mb-6">
            <div className={formGroup}>
              <label className={labelClass}>Write a comment</label>

              <textarea
                rows="3"
                className={inputClass}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Share your thoughts..."
              />
            </div>

            <button
              className={primaryBtn}
              type="submit"
              disabled={commentLoading || !comment.trim()}
            >
              {commentLoading ? "Posting..." : "Post comment"}
            </button>
          </form>
        )}

        {article.comments?.length ? (
          <div className="space-y-3">
            {article.comments.map((commentObj, index) => (
              <div
                key={commentObj._id || index}
                className="rounded-md bg-[#f7f8fb] p-4"
              >
                <p className="text-sm leading-6 text-[#263247]">
                  {commentObj.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className={emptyStateClass}>No comments yet.</div>
        )}
      </section>

      <div className={articleFooter}>
        Last updated: {formatDate(article.updatedAt)}
      </div>
    </div>
  );
}

export default ArticleByID;