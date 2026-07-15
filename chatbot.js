/* ===========================================================
   CHATBOT WIDGET ENGINE
   Pure client-side keyword matcher — no API calls, no backend.
   Reads from CHATBOT_KB / CHATBOT_FALLBACK / CHATBOT_GREETING
   (defined in chatbot-data.js, which must load before this file).
=========================================================== */

(function () {

    /* ---------- Inject widget markup ---------- */
    const widgetHTML = `
        <div id="chatbotLauncher" aria-label="Open chat assistant" role="button" tabindex="0">
            <i class="fa-solid fa-comment-dots" id="chatbotLauncherIcon"></i>
            <span class="chatbot-launcher-badge">Ask me</span>
        </div>

        <div id="chatbotPanel" class="chatbot-panel" role="dialog" aria-label="Portfolio chat assistant">
            <div class="chatbot-header">
                <div class="chatbot-header-info">
                    <div class="chatbot-avatar"><i class="fa-solid fa-robot"></i></div>
                    <div>
                        <span class="chatbot-title">ReportRaja</span>
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
            document.getElementById("chatbotLauncherIcon").className = "fa-solid fa-xmark";
            if (!opened) {
                opened = true;
                addBotMessage(CHATBOT_GREETING.answer, CHATBOT_GREETING.followUps);
            }
            input.focus();
        }

        function closeChat() {
            panel.classList.remove("open");
            launcher.classList.remove("chat-open");
            document.getElementById("chatbotLauncherIcon").className = "fa-solid fa-comment-dots";
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
