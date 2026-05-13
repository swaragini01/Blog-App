// Shared Tailwind class names for the blog UI.

export const pageBackground = "min-h-screen bg-[#f7f8fb] text-[#172033]";
export const pageShell = "min-h-screen bg-[#f7f8fb] text-[#172033]";
export const pageWrapper = "mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8";
export const section = "mb-10";

export const panelClass = "rounded-lg border border-[#dfe5ee] bg-white";
export const cardClass =
  "rounded-lg border border-[#dfe5ee] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#aebbd0] hover:shadow-[0_14px_36px_rgba(23,32,51,0.08)]";

export const pageTitleClass = "text-3xl font-semibold leading-tight text-[#172033] sm:text-4xl";
export const headingClass = "text-xl font-semibold text-[#172033]";
export const subHeadingClass = "text-base font-semibold text-[#172033]";
export const bodyText = "text-sm leading-6 text-[#5b667a]";
export const mutedText = "text-sm text-[#6f7a8e]";
export const linkClass = "font-medium text-[#0f6b68] transition hover:text-[#0a4b49]";

export const primaryBtn =
  "inline-flex items-center justify-center rounded-md bg-[#0f6b68] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0a4b49] disabled:cursor-not-allowed disabled:opacity-60";
export const secondaryBtn =
  "inline-flex items-center justify-center rounded-md border border-[#cbd5e1] bg-white px-4 py-2 text-sm font-semibold text-[#172033] transition hover:border-[#98a7bc] hover:bg-[#f8fafc]";
export const dangerBtn =
  "inline-flex items-center justify-center rounded-md bg-[#b42318] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8f1d15] disabled:cursor-not-allowed disabled:opacity-60";
export const ghostBtn =
  "inline-flex items-center justify-center rounded-md px-0 py-1 text-sm font-semibold text-[#0f6b68] transition hover:text-[#0a4b49]";

export const formCard = "mx-auto w-full max-w-3xl rounded-lg border border-[#dfe5ee] bg-white p-6 shadow-sm sm:p-8";
export const formTitle = "mb-6 text-center text-2xl font-semibold text-[#172033]";
export const labelClass = "mb-1.5 block text-sm font-semibold text-[#354056]";
export const inputClass =
  "w-full rounded-md border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-sm text-[#172033] outline-none transition placeholder:text-[#8b95a7] focus:border-[#0f6b68] focus:ring-4 focus:ring-[#0f6b68]/10";
export const formGroup = "mb-4";
export const submitBtn =
  "mt-2 inline-flex w-full items-center justify-center rounded-md bg-[#0f6b68] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a4b49] disabled:cursor-not-allowed disabled:opacity-60";

export const navbarClass =
  "sticky top-0 z-50 border-b border-[#dfe5ee] bg-white/95 px-4 backdrop-blur";
export const navContainerClass = "mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4";
export const navBrandClass = "text-lg font-bold tracking-tight text-[#172033]";
export const navLinksClass = "flex items-center gap-2 sm:gap-3";
export const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-semibold text-[#5b667a] transition hover:bg-[#edf3f3] hover:text-[#0f6b68]";
export const navLinkActiveClass = "rounded-md bg-[#edf3f3] px-3 py-2 text-sm font-semibold text-[#0f6b68]";

export const articleGrid = "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3";
export const articleCardClass =
  "flex h-full min-h-[220px] flex-col rounded-lg border border-[#dfe5ee] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#aebbd0] hover:shadow-[0_14px_36px_rgba(23,32,51,0.08)]";
export const articleTitle = "text-lg font-semibold leading-snug text-[#172033]";
export const articleExcerpt = "text-sm leading-6 text-[#5b667a]";
export const articleMeta = "text-xs font-semibold uppercase tracking-[0.12em] text-[#0f6b68]";
export const articleBody = "text-sm leading-6 text-[#5b667a]";
export const timestampClass = "text-xs text-[#6f7a8e]";
export const tagClass =
  "inline-flex w-fit items-center rounded-md bg-[#edf3f3] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f6b68]";

export const articlePageWrapper = "mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8";
export const articleHeader = "mb-8 flex flex-col gap-4";
export const articleCategory = tagClass;
export const articleMainTitle = "text-3xl font-semibold leading-tight text-[#172033] sm:text-4xl";
export const articleAuthorRow =
  "flex flex-col gap-2 border-y border-[#dfe5ee] py-4 text-sm text-[#6f7a8e] sm:flex-row sm:items-center sm:justify-between";
export const authorInfo = "font-semibold text-[#172033]";
export const articleContent =
  "rounded-lg border border-[#dfe5ee] bg-white p-5 text-base leading-8 text-[#263247] whitespace-pre-line";
export const articleFooter = "mt-8 border-t border-[#dfe5ee] pt-4 text-sm text-[#6f7a8e]";
export const articleActions = "mt-5 flex flex-wrap gap-3";
export const editBtn = primaryBtn;
export const deleteBtn = dangerBtn;

export const errorClass =
  "my-2 rounded-md border border-[#fecaca] bg-[#fff1f1] px-3 py-2 text-sm font-medium text-[#b42318]";
export const successClass =
  "my-2 rounded-md border border-[#b7e4d2] bg-[#eefaf5] px-3 py-2 text-sm font-medium text-[#176b46]";
export const loadingClass = "py-10 text-center text-sm font-medium text-[#0f6b68]";
export const emptyStateClass =
  "rounded-lg border border-dashed border-[#cbd5e1] bg-white px-5 py-12 text-center text-sm text-[#6f7a8e]";

export const divider = "my-6 border-t border-[#dfe5ee]";
