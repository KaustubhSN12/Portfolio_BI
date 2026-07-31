/* ===========================================================
   CHATBOT WIDGET ENGINE
   Pure client-side keyword matcher — no API calls, no backend.
   Reads from CHATBOT_KB / CHATBOT_FALLBACK / CHATBOT_GREETING
   (defined in chatbot-data.js, which must load before this file).

   AVATAR: the chat header tries to load a real photo from
   images/chatbot-avatar.png (resolved relative to wherever this
   script itself is loaded from, so it works from both the
   homepage and the /projects/ pages). Until that file exists,
   it falls back to the same custom bot icon used on the launcher
   — never a broken image icon.
=========================================================== */

(function () {

    // Resolve images/chatbot-avatar.png relative to this script's own location,
    // so the same file works whether loaded as "chatbot.js" or "../chatbot.js".
    const scriptSrc = document.currentScript ? document.currentScript.src : "chatbot.js";
    const baseDir = scriptSrc.substring(0, scriptSrc.lastIndexOf("/") + 1);
    const avatarUrl = baseDir + "images/chatbot-avatar.png";

    /* Custom bot glyph — a small drawn robot face, not a stock icon */
    const BOT_SVG = `
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="4.6" r="1.3" fill="currentColor"/>
            <line x1="12" y1="5.9" x2="12" y2="7.8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            <rect x="5" y="7.8" width="14" height="11.4" rx="4.2" stroke="currentColor" stroke-width="1.6"/>
            <circle cx="9.3" cy="13.4" r="1.3" fill="currentColor"/>
            <circle cx="14.7" cy="13.4" r="1.3" fill="currentColor"/>
            <path d="M9.4 16.6c0.9 0.8 3.3 0.8 4.2 0" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            <line x1="3" y1="11.8" x2="3" y2="14.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            <line x1="21" y1="11.8" x2="21" y2="14.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>`;

    const CLOSE_SVG = `
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
        </svg>`;

    /* ---------- Inject widget markup ---------- */
    const widgetHTML = `
        <div id="chatbotLauncher" aria-label="Open chat assistant" role="button" tabindex="0">
            <span class="chatbot-launcher-icon icon-bot">${BOT_SVG}</span>
            <span class="chatbot-launcher-icon icon-close">${CLOSE_SVG}</span>
            <span class="chatbot-launcher-badge">Ask me</span>
        </div>

        <div id="chatbotPanel" class="chatbot-panel" role="dialog" aria-label="Portfolio chat assistant">
            <div class="chatbot-header">
                <div class="chatbot-header-info">
                    <div class="chatbot-avatar">
                        <img src="${avatarUrl}" alt="Portfolio Assistant"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <span class="chatbot-avatar-fallback">${BOT_SVG}</span>
                    </div>
                    <div>
                        <span class="chatbot-title">Portfolio Assistant</span>
                        <span class="chatbot-subtitle">Ask about Kaustubh, or Power BI / Tableau</span>
                    </div>
                </div>
                <button id="chatbotClose" aria-label="Close chat">✕</button>
            </div>

            <div class="chatbot-messages" id="chatbotMessages"></div>

            <form class="chatbot-input-row" id="chatbotForm">
                <input type="text" id="chatbotInput" placeholder="Type a question..." autocomplete="off" maxlength="200">
                <button type="submit" aria-label="Send"><i class="fa-solid fa-paper-plane"></i></button>
            </form>
        </div>
    `;

    document.addEventListener("DOMContentLoaded", () => {
        document.body.insertAdjacentHTML("beforeend", widgetHTML);

        const launcher = document.getElementById("chatbotLauncher");
        const panel = document.getElementById("chatbotPanel");
        const closeBtn = document.getElementById("chatbotClose");
        const messages = document.getElementById("chatbotMessages");
        const form = document.getElementById("chatbotForm");
        const input = document.getElementById("chatbotInput");

        let opened = false;

        /* ---------- Open / close ---------- */
        function openChat() {
            panel.classList.add("open");
            launcher.classList.add("chat-open");
            if (!opened) {
                opened = true;
                addBotMessage(CHATBOT_GREETING.answer, CHATBOT_GREETING.followUps);
            }
            input.focus();
        }

        function closeChat() {
            panel.classList.remove("open");
            launcher.classList.remove("chat-open");
        }

        launcher.addEventListener("click", () => {
            panel.classList.contains("open") ? closeChat() : openChat();
        });
        launcher.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openChat(); }
        });
        closeBtn.addEventListener("click", closeChat);

        /* ---------- Message rendering ---------- */
        function scrollToBottom() {
            messages.scrollTop = messages.scrollHeight;
        }

        function addUserMessage(text) {
            const el = document.createElement("div");
            el.className = "chatbot-msg chatbot-msg-user";
            el.textContent = text;
            messages.appendChild(el);
            scrollToBottom();
        }

        function addBotMessage(text, followUps) {
            const el = document.createElement("div");
            el.className = "chatbot-msg chatbot-msg-bot";
            el.textContent = text;
            messages.appendChild(el);

            if (followUps && followUps.length) {
                const chipRow = document.createElement("div");
                chipRow.className = "chatbot-chip-row";
                followUps.forEach(chipText => {
                    const chip = document.createElement("button");
                    chip.type = "button";
                    chip.className = "chatbot-chip";
                    chip.textContent = chipText;
                    chip.addEventListener("click", () => handleUserInput(chipText));
                    chipRow.appendChild(chip);
                });
                messages.appendChild(chipRow);
            }
            scrollToBottom();
        }

        function showTyping() {
            const el = document.createElement("div");
            el.className = "chatbot-msg chatbot-msg-bot chatbot-typing";
            el.id = "chatbotTyping";
            el.innerHTML = "<span></span><span></span><span></span>";
            messages.appendChild(el);
            scrollToBottom();
        }

        function hideTyping() {
            const el = document.getElementById("chatbotTyping");
            if (el) el.remove();
        }

        /* ---------- Keyword matching ---------- */
        function findBestMatch(userText) {
            const text = userText.toLowerCase();
            let best = null;
            let bestScore = 0;

            CHATBOT_KB.forEach(entry => {
                let score = 0;
                entry.keywords.forEach(kw => {
                    if (text.includes(kw.toLowerCase())) {
                        // longer keyword phrases count for more (more specific match)
                        score += kw.split(" ").length;
                    }
                });
                if (score > bestScore) {
                    bestScore = score;
                    best = entry;
                }
            });

            return bestScore > 0 ? best : null;
        }

        /* ---------- Handle a message, whether typed or from a chip ---------- */
        function handleUserInput(text) {
            const trimmed = text.trim();
            if (!trimmed) return;

            addUserMessage(trimmed);
            input.value = "";
            showTyping();

            const delay = 420 + Math.random() * 380;
            setTimeout(() => {
                hideTyping();
                const match = findBestMatch(trimmed);
                if (match) {
                    addBotMessage(match.answer, match.followUps);
                } else {
                    addBotMessage(CHATBOT_FALLBACK.answer, CHATBOT_FALLBACK.followUps);
                }
            }, delay);
        }

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            handleUserInput(input.value);
        });

        /* ---------- Close on Escape ---------- */
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && panel.classList.contains("open")) closeChat();
        });
    });

})();
