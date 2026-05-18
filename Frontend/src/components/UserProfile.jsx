import { useAuth } from "../stores/authStore";
import { Link } from "react-router";
import { bodyText, pageTitleClass, pageWrapper, panelClass, primaryBtn, secondaryBtn } from "../styles/common.js";

function UserProfile() {
  const user = useAuth((state) => state.currentUser);
  const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "User";
  const isAuthor = user?.role === "AUTHOR";
  const isReader = user?.role === "USER";

  return (
    <div className={pageWrapper}>
      <section className={`${panelClass} p-6 shadow-sm sm:p-8`}>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f6b68]">Profile</p>
        <h1 className={pageTitleClass}>Welcome, {displayName}</h1>
        <p className={`${bodyText} mt-2`}>Your account details are shown below.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-[#f7f8fb] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6f7a8e]">Role</p>
            <p className="mt-1 text-lg font-semibold text-[#172033]">{user?.role || "USER"}</p>
          </div>

          <div className="rounded-md bg-[#f7f8fb] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6f7a8e]">Email</p>
            <p className="mt-1 break-words text-lg font-semibold text-[#172033]">{user?.email || "Not available"}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {isAuthor && (
            <>
              <Link to="/author-profile/write-article" className={primaryBtn}>
                Write Article
              </Link>
              <Link to="/author-profile/articles" className={secondaryBtn}>
                My Articles
              </Link>
            </>
          )}

          {isReader && (
            <Link to="/articles" className={primaryBtn}>
              Browse Articles
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
