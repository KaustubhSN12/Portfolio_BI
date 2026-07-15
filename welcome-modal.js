/* ===========================================================
   WELCOME MODAL
   Shows once per visitor (localStorage-gated), greets them,
   and offers a button to dismiss and start exploring.

   To re-test during development: clear localStorage key
   "kn_portfolio_visited" in your browser devtools console:
   localStorage.removeItem("kn_portfolio_visited")
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const STORAGE_KEY = "kn_portfolio_visited";
    if (localStorage.getItem(STORAGE_KEY)) return; // already greeted this visitor

    const modalHTML = `
        <div id="welcomeOverlay">
            <div class="welcome-card" role="dialog" aria-modal="true" aria-label="Welcome">
                <button class="welcome-close" id="welcomeClose" aria-label="Close">✕</button>
                <span class="welcome-wave">👋</span>
                <h2>Hey, I'm <span>Kaustubh.</span></h2>
                <p>
                    Welcome to my portfolio! I turn raw data into dashboards people actually use —
                    take a look around at the projects, skills, and story behind them.
                </p>
                <div class="welcome-tags">
                    <span>Power BI</span><span>SQL</span><span>Data Storytelling</span>
                </div>
                <button class="btn btn-primary" id="welcomeExplore">
                    Explore the Portfolio <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const overlay = document.getElementById("welcomeOverlay");
    const closeBtn = document.getElementById("welcomeClose");
    const exploreBtn = document.getElementById("welcomeExplore");

    function dismiss() {
        overlay.classList.remove("open");
        localStorage.setItem(STORAGE_KEY, "true");
        setTimeout(() => overlay.remove(), 400);
    }

    // small delay so the modal animates in gracefully after page paint
    setTimeout(() => overlay.classList.add("open"), 500);

    closeBtn.addEventListener("click", dismiss);
    exploreBtn.addEventListener("click", dismiss);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) dismiss();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("open")) dismiss();
    });
});
