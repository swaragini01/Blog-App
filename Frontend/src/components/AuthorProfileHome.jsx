import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../stores/authStore";
import { bodyText, errorClass, loadingClass, pageTitleClass, panelClass } from "../styles/common.js";

const API_BASE_URL = "https://blog-app-new-9bp9.onrender.com";

function AuthorProfileHome() {
  const user = useAuth((state) => state.currentUser);
  const authorId = user?._id || user?.userId;
  const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "Author";

  const [articleCount, setArticleCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authorId) return;

    const getArticleCount = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/author-api/articles/${authorId}`, { withCredentials: true });
        const activeArticles = res.data.payload.filter((article) => article.isArticleActive !== false);
        setArticleCount(activeArticles.length);
      } catch (err) {
        setError(err.response?.data?.error || err.response?.data?.message || "Failed to load article count");
      } finally {
        setLoading(false);
      }
    };

    getArticleCount();
  }, [authorId]);

  return (
    <section className={`${panelClass} p-6 shadow-sm sm:p-8`}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f6b68]">Profile</p>
      <h1 className={pageTitleClass}>Hi, {displayName}</h1>
      <p className={`${bodyText} mt-2`}>Your author account details are shown below.</p>

      {loading && <p className={loadingClass}>Loading profile...</p>}
      {error && <p className={errorClass}>{error}</p>}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-md bg-[#f7f8fb] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6f7a8e]">Role</p>
          <p className="mt-1 text-lg font-semibold text-[#172033]">{user?.role || "AUTHOR"}</p>
        </div>

        <div className="rounded-md bg-[#f7f8fb] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6f7a8e]">Email</p>
          <p className="mt-1 break-words text-lg font-semibold text-[#172033]">{user?.email || "Not available"}</p>
        </div>

        <div className="rounded-md bg-[#f7f8fb] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6f7a8e]">Articles Published</p>
          <p className="mt-1 text-lg font-semibold text-[#172033]">{articleCount}</p>
        </div>
      </div>
    </section>
  );
}

export default AuthorProfileHome;
