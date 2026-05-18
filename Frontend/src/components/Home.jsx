import { Link } from "react-router";
import { useAuth } from "../stores/authStore";
import { pageWrapper, pageTitleClass, bodyText, primaryBtn, secondaryBtn, cardClass } from "../styles/common";

function Home() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const isAuthor = user?.role === "AUTHOR";
  const isReader = user?.role === "USER";
  const writeArticlePath = isAuthor ? "/author-profile/write-article" : "/login";
  const articlesPath = isAuthor ? "/author-profile/articles" : isReader ? "/articles" : "/login";
  const workflowCards = [
    {
      title: "Write articles",
      text: "Create clean posts with title, category, and content fields that stay easy to scan.",
      to: isAuthor ? "/author-profile/write-article" : "/login",
      action: isAuthor ? "Start writing" : "Sign in as author",
    },
    {
      title: "Browse posts",
      text: "Read active articles in a neat card layout with clear dates and categories.",
      to: articlesPath,
      action: isAuthenticated ? "Browse articles" : "Sign in to browse",
    },
    {
      title: "Comments",
      text: "Add comments from the article page without leaving the reading flow.",
      to: isReader ? "/articles" : "/login",
      action: isReader ? "Open articles" : "Sign in to comment",
    },
  ];

  return (
    <div className={pageWrapper}>
      <section className="grid items-center gap-8 rounded-lg border border-[#dfe5ee] bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f6b68]">Capstone Blog</p>
          <h1 className={pageTitleClass}>A cleaner place to publish and read articles.</h1>
          <p className={`${bodyText} mt-4 max-w-2xl text-base`}>
            Manage articles, read posts, and join the discussion with a simple interface that keeps the writing first.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={writeArticlePath} className={primaryBtn}>
              Write Article
            </Link>

            {isAuthenticated ? (
              <Link to="/profile" className={primaryBtn}>
                Go to profile
              </Link>
            ) : (
              <>
                <Link to="/login" className={secondaryBtn}>
                  Sign in
                </Link>
                <Link to="/register" className={secondaryBtn}>
                  Create account
                </Link>
              </>
            )}
          </div>
          <div className="mt-8 grid gap-3 text-sm text-[#5b667a] sm:grid-cols-3">
            <div className="rounded-md bg-[#f7f8fb] p-3">
              <span className="block font-semibold text-[#172033]">Authors</span>
              Publish and manage
            </div>
            <div className="rounded-md bg-[#f7f8fb] p-3">
              <span className="block font-semibold text-[#172033]">Readers</span>
              Browse active posts
            </div>
            <div className="rounded-md bg-[#f7f8fb] p-3">
              <span className="block font-semibold text-[#172033]">Comments</span>
              Join discussions
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {workflowCards.map((item) => (
            <Link key={item.title} to={item.to} className={`${cardClass} group`}>
              <h2 className="text-base font-semibold text-[#172033]">{item.title}</h2>
              <p className={`${bodyText} mt-2`}>{item.text}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-[#0f6b68] transition group-hover:text-[#0a4b49]">
                {item.action}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
