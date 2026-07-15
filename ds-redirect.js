/* ===========================================================
   DATA SCIENTIST PORTFOLIO — REDIRECT TAB INJECTION
   Update DS_PORTFOLIO_URL below with your real Data Scientist
   portfolio link. Opens in a new tab so visitors don't lose
   this site.
=========================================================== */

const DS_PORTFOLIO_URL = "https://kaustubhsn12.github.io/Kaustubh_Portfolio/";

document.addEventListener("DOMContentLoaded", () => {
    const tabHTML = `
        <a id="dsRedirectTab" href="${DS_PORTFOLIO_URL}" target="_blank" rel="noopener">
            <span class="ds-tab-icon"><i class="fa-solid fa-brain"></i></span>
            <span class="ds-tab-text">
                <strong>Data Scientist Portfolio</strong>
                <span>ML · Deep Learning · Python →</span>
            </span>
        </a>
    `;
    document.body.insertAdjacentHTML("beforeend", tabHTML);
});
