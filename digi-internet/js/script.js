import { findCoverageByCep, getExitSettings, getFirebaseState, getPopupSettings } from "./firebase-service.js";

const popupSeenKey = "digiCampaignPopupSeenVersion";
const exitSeenKey = "digiExitPopupSeenVersion";

function normalizeCep(value) {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function getCepDigits(value) {
    return value.replace(/\D/g, "").slice(0, 8);
}

function setupMasks() {
    const cepInput = document.getElementById("searchCep");
    if (!cepInput) return;
    cepInput.addEventListener("input", () => {
        cepInput.value = normalizeCep(cepInput.value);
    });
}

function setupScrollEffects() {
    const parallaxElements = Array.from(document.querySelectorAll(".hero-image[data-speed]"));
    const updateParallax = () => {
        const scrollY = window.scrollY;
        parallaxElements.forEach((element) => {
            const speed = Number(element.dataset.speed || 0);
            element.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
        });
    };
    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
}

function setupRevealAnimations() {
    const targets = document.querySelectorAll(".reveal");
    targets.forEach((target, index) => {
        target.dataset.revealDelay = String(index % 5);
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16 });
    targets.forEach((target) => observer.observe(target));
}

function setupInteractiveCards() {
    const cards = document.querySelectorAll(".service-card, .plan-card, .feature-item, .gallery-card, .coverage-highlight, .contact-chip, .showcase-card, .signal-card");
    cards.forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
            const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
            card.style.transform = `translateY(-8px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
}

function setupNavigation() {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("nav");
    if (toggle && nav) {
        toggle.addEventListener("click", () => nav.classList.toggle("show"));
    }
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", () => nav?.classList.remove("show"));
    });
}

function setFeedback(message, type = "default") {
    const feedback = document.getElementById("searchFeedback");
    if (!feedback) return;
    feedback.textContent = message;
    feedback.className = "search-feedback";
    if (type === "success") feedback.classList.add("is-success");
    if (type === "error") feedback.classList.add("is-error");
}

function renderCoverageResult(item) {
    const results = document.getElementById("coverageResults");
    if (!results) return;
    if (!item) {
        results.innerHTML = "";
        return;
    }

    results.innerHTML = `
        <article class="availability-card">
            <h3>${item.street}</h3>
            <p><strong>CEP:</strong> ${normalizeCep(item.cep || item.id || "")}</p>
            <p><strong>Localidade:</strong> ${item.neighborhood}${item.city ? ` - ${item.city}` : ""}</p>
            <div class="chip-row">
                ${(item.plans || []).map((plan) => `<span class="chip">${plan}</span>`).join("")}
            </div>
        </article>
    `;
}

function setupCoverageSearch() {
    const form = document.getElementById("coverageSearchForm");
    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const cep = normalizeCep(String(formData.get("searchCep") || ""));
        const cepDigits = getCepDigits(cep);

        if (cepDigits.length !== 8) {
            renderCoverageResult(null);
            setFeedback("Informe um CEP valido no formato 00000-000.", "error");
            return;
        }

        setFeedback("Consultando disponibilidade...", "default");

        try {
            const item = await findCoverageByCep(cepDigits);
            if (!item) {
                renderCoverageResult(null);
                setFeedback("Ainda nao encontramos cobertura cadastrada para esse CEP.", "error");
                return;
            }

            renderCoverageResult(item);
            setFeedback("Cobertura encontrada com sucesso.", "success");
        } catch (error) {
            renderCoverageResult(null);
            if (error.message === "firebase-not-configured") {
                setFeedback("Configure o Firebase para ativar a busca real por CEP.", "error");
                return;
            }
            setFeedback("Nao foi possivel consultar a cobertura agora. Tente novamente.", "error");
        }
    });
}

function setupLeadForm() {
    const form = document.getElementById("leadForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const name = String(formData.get("name") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const message = String(formData.get("message") || "").trim();
        const whatsappNumber = "5548999990574";

        const whatsappMessage = [
            "Ola, DIGI INTERNET!",
            "",
            `Nome: ${name}`,
            `Telefone: ${phone}`,
            `Mensagem: ${message}`
        ].join("\n");

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, "_blank", "noopener");
    });
}

function setupFirebaseNotice() {
    const notice = document.getElementById("firebaseNotice");
    if (!notice) return;
    if (getFirebaseState().configured) notice.classList.add("hidden");
    else notice.classList.remove("hidden");
}

function setupCursorNetwork() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const prefersCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || prefersCoarsePointer) return;

    document.body.classList.add("interactive-cursor");

    const cursor = document.createElement("div");
    cursor.className = "cursor-network";
    cursor.setAttribute("aria-hidden", "true");

    const packets = Array.from({ length: 6 }, () => {
        const packet = document.createElement("div");
        packet.className = "cursor-packet";
        packet.setAttribute("aria-hidden", "true");
        document.body.appendChild(packet);
        return {
            element: packet,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
    });

    document.body.appendChild(cursor);

    const pointer = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };

    let isVisible = false;
    let frameId = 0;

    const render = () => {
        cursor.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;

        packets.forEach((packet, index) => {
            const followStrength = 0.16 - index * 0.018;
            packet.x += (pointer.x - packet.x) * followStrength;
            packet.y += (pointer.y - packet.y) * followStrength;
            packet.element.style.transform = `translate3d(${packet.x}px, ${packet.y}px, 0) scale(${1 - index * 0.08})`;
            packet.element.style.opacity = String(Math.max(0.16, 0.58 - index * 0.08));
        });

        frameId = window.requestAnimationFrame(render);
    };

    const showCursor = () => {
        if (isVisible) return;
        isVisible = true;
        cursor.classList.add("is-visible");
    };

    const hideCursor = () => {
        isVisible = false;
        cursor.classList.remove("is-visible");
        packets.forEach((packet) => {
            packet.element.style.opacity = "0";
        });
    };

    window.addEventListener("pointermove", (event) => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        showCursor();
    }, { passive: true });

    window.addEventListener("pointerdown", () => {
        cursor.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) scale(0.88)`;
    }, { passive: true });

    window.addEventListener("pointerup", () => {
        cursor.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) scale(1)`;
    }, { passive: true });

    window.addEventListener("blur", hideCursor);
    document.addEventListener("mouseleave", hideCursor);

    render();
}

function closePopup(popupId) {
    document.getElementById(popupId)?.classList.add("hidden");
}

function setupPopupCloseButtons() {
    document.getElementById("closeCampaignPopup")?.addEventListener("click", () => closePopup("campaignPopup"));
    document.getElementById("closeExitPopup")?.addEventListener("click", () => closePopup("exitPopup"));

    document.getElementById("campaignPopup")?.addEventListener("click", (event) => {
        if (event.target.id === "campaignPopup") closePopup("campaignPopup");
    });

    document.getElementById("exitPopup")?.addEventListener("click", (event) => {
        if (event.target.id === "exitPopup") closePopup("exitPopup");
    });
}

function getVersion(data) {
    const updatedAt = data?.updatedAt;
    if (updatedAt?.seconds) return String(updatedAt.seconds);
    return data?.imageUrl || data?.title || data?.exitTitle || "default";
}

function showCampaignPopup(popupData) {
    const popup = document.getElementById("campaignPopup");
    const image = document.getElementById("campaignPopupImage");
    const title = document.getElementById("campaignPopupTitle");
    const text = document.getElementById("campaignPopupText");
    const button = document.getElementById("campaignPopupButton");
    if (!popup || !image || !title || !text || !button) return;

    image.src = popupData.imageUrl || "";
    title.textContent = popupData.title || "Novidade DIGI INTERNET";
    text.textContent = popupData.text || "Confira a nova campanha da DIGI INTERNET.";
    button.textContent = popupData.buttonText || "Saiba mais";
    button.href = popupData.buttonLink || "https://wa.me/5548999990574";
    popup.classList.remove("hidden");
}

function setupExitIntent(exitData, version) {
    const exitPopup = document.getElementById("exitPopup");
    const title = document.getElementById("exitPopupTitle");
    const text = document.getElementById("exitPopupText");
    if (!exitPopup || !title || !text) return;

    title.textContent = exitData.exitTitle || "Nao perca essa oportunidade";
    text.textContent = exitData.exitText || "Consulte seu CEP ou fale com a DIGI antes de sair.";

    let hasShownExit = localStorage.getItem(exitSeenKey) === version;

    document.addEventListener("mouseout", (event) => {
        if (hasShownExit) return;
        if (event.relatedTarget || event.clientY > 12) return;
        hasShownExit = true;
        localStorage.setItem(exitSeenKey, version);
        exitPopup.classList.remove("hidden");
    });
}

async function setupCampaignPopup() {
    if (!getFirebaseState().configured) return;
    try {
        const popupData = await getPopupSettings();
        if (!popupData || !popupData.active || !popupData.imageUrl) return;

        const version = getVersion(popupData);
        const seenVersion = localStorage.getItem(popupSeenKey);
        if (seenVersion !== version) {
            showCampaignPopup(popupData);
            localStorage.setItem(popupSeenKey, version);
        }
    } catch (error) {
        console.error("Erro ao carregar popup do site:", error);
    }
}

async function setupExitMessage() {
    if (!getFirebaseState().configured) return;
    try {
        const exitData = await getExitSettings();
        if (!exitData || !exitData.exitActive) return;

        const version = getVersion(exitData);
        setupExitIntent(exitData, version);
    } catch (error) {
        console.error("Erro ao carregar mensagem de saida:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    setupMasks();
    setupNavigation();
    setupScrollEffects();
    setupRevealAnimations();
    setupInteractiveCards();
    setupCoverageSearch();
    setupLeadForm();
    setupFirebaseNotice();
    setupCursorNetwork();
    setupPopupCloseButtons();
    setupCampaignPopup();
    setupExitMessage();
});
