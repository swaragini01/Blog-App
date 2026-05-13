import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  secondaryBtn,
  errorClass,
  pageWrapper,
} from "../styles/common";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state;
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!article) {
      navigate("/author-profile/articles");
      return;
    }

    setValue("title", article.title);
    setValue("category", article.category);
    setValue("content", article.content);
  }, [article, navigate, setValue]);

  const updateArticle = async (data) => {
    if (!article?._id) return;

    setLoading(true);
    setSubmitError(null);

    try {
      const res = await axios.put(
        "http://localhost:4000/author-api/articles",
        { articleId: article._id, ...data },
        { withCredentials: true },
      );

      toast.success("Article updated successfully");
      navigate(`/article/${article._id}`, { state: res.data.payload });
    } catch (err) {
      setSubmitError(err.response?.data?.error || err.response?.data?.message || "Failed to update article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={pageWrapper}>
      <div className={formCard}>
        <h2 className={formTitle}>Edit Article</h2>

        {submitError && <p className={errorClass}>{submitError}</p>}

        <form onSubmit={handleSubmit(updateArticle)}>
          <div className={formGroup}>
            <label className={labelClass}>Title</label>

            <input
              className={inputClass}
              {...register("title", {
                required: "Title is required",
                minLength: { value: 5, message: "Title must be at least 5 characters" },
              })}
            />

            {errors.title && <p className={errorClass}>{errors.title.message}</p>}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Category</label>

            <select className={inputClass} {...register("category", { required: "Category is required" })}>
              <option value="">Select category</option>
              <option value="technology">Technology</option>
              <option value="programming">Programming</option>
              <option value="ai">AI</option>
              <option value="web-development">Web Development</option>
            </select>

            {errors.category && <p className={errorClass}>{errors.category.message}</p>}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Content</label>

            <textarea
              rows="14"
              className={inputClass}
              {...register("content", {
                required: "Content is required",
                minLength: { value: 50, message: "Content must be at least 50 characters" },
              })}
            />

            {errors.content && <p className={errorClass}>{errors.content.message}</p>}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className={submitBtn} type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Article"}
            </button>
            <button className={secondaryBtn} type="button" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditArticle;
