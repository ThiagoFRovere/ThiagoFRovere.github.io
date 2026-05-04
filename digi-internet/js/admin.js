import {
    getExitSettings,
    getFirebaseState,
    getPopupSettings,
    listCoverage,
    loginAdmin,
    logoutAdmin,
    observeAdminSession,
    saveCoverage,
    saveExitSettings,
    savePopupSettings
} from "./firebase-service.js";

function normalizeCep(value) {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function getCepDigits(value) {
    return value.replace(/\D/g, "").slice(0, 8);
}

function updateFeedback(id, message, type = "default") {
    const feedback = document.getElementById(id);
    if (!feedback) return;
    feedback.textContent = message;
    feedback.className = "search-feedback";
    if (type === "success") feedback.classList.add("is-success");
    if (type === "error") feedback.classList.add("is-error");
}

function updateStatusChip(id, isActive, activeLabel, inactiveLabel) {
    const chip = document.getElementById(id);
    if (!chip) return;

    chip.textContent = isActive ? activeLabel : inactiveLabel;
    chip.className = "status-chip";
    chip.classList.add(isActive ? "status-chip-on" : "status-chip-off");
}

function renderCoverageList(items) {
    const list = document.getElementById("adminCoverageList");
    if (!list) return;

    if (!items.length) {
        list.innerHTML = `
            <article class="availability-card">
                <h3>Nenhum CEP cadastrado ainda</h3>
                <p>Adicione o primeiro cadastro para começar as consultas públicas.</p>
            </article>
        `;
        return;
    }

    list.innerHTML = items.map((item) => `
        <article class="availability-card">
            <h3>${item.street}</h3>
            <p><strong>CEP:</strong> ${normalizeCep(item.cep || item.id || "")}</p>
            <p><strong>Localidade:</strong> ${item.neighborhood}${item.city ? ` - ${item.city}` : ""}</p>
            <div class="chip-row">
                ${(item.plans || []).map((plan) => `<span class="chip">${plan}</span>`).join("")}
            </div>
        </article>
    `).join("");
}

async function refreshCoverageList() {
    try {
        const items = await listCoverage();
        renderCoverageList(items);
        updateFeedback("adminListFeedback", `${items.length} cadastro(s) carregado(s) do Firestore.`, "success");
    } catch {
        renderCoverageList([]);
        updateFeedback("adminListFeedback", "Não foi possível carregar os cadastros do Firestore.", "error");
    }
}

function setupMasks() {
    const cepInput = document.getElementById("coverageCep");
    if (!cepInput) return;
    cepInput.addEventListener("input", () => {
        cepInput.value = normalizeCep(cepInput.value);
    });
}

function setupRevealAnimations() {
    const targets = document.querySelectorAll(".reveal");
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

function setupFirebaseNotice() {
    const notice = document.getElementById("adminFirebaseNotice");
    if (!notice) return;
    if (getFirebaseState().configured) {
        notice.classList.add("hidden");
    } else {
        notice.classList.remove("hidden");
        updateFeedback("authFeedback", "Preencha as credenciais do Firebase antes de autenticar.", "error");
    }
}

function setupPopupImageInputs() {
    const imageSelect = document.getElementById("popupImageSelect");
    const imagePath = document.getElementById("popupImagePath");
    if (!imageSelect || !imagePath) return;

    imageSelect.addEventListener("change", () => {
        if (imageSelect.value) {
            imagePath.value = imageSelect.value;
        }
    });
}

function fillPopupForm(data) {
    if (!data) return;
    document.getElementById("popupTitle").value = data.title || "";
    document.getElementById("popupText").value = data.text || "";
    document.getElementById("popupButtonText").value = data.buttonText || "";
    document.getElementById("popupButtonLink").value = data.buttonLink || "https://wa.me/5548999990574";
    document.getElementById("popupImageSelect").value = data.imageUrl || "";
    document.getElementById("popupImagePath").value = data.imageUrl || "";
    document.getElementById("popupActive").checked = Boolean(data.active);

    const previewBox = document.getElementById("popupPreviewBox");
    const previewImage = document.getElementById("popupPreviewImage");
    if (data.imageUrl && previewBox && previewImage) {
        previewImage.src = data.imageUrl;
        previewBox.classList.remove("hidden");
    }

    updateStatusChip("popupStatusChip", Boolean(data.active), "Popup ativo", "Popup desativado");
}

function fillExitForm(data) {
    if (!data) return;
    document.getElementById("exitTitle").value = data.exitTitle || "Nao perca essa oportunidade";
    document.getElementById("exitText").value = data.exitText || "Consulte seu CEP ou fale com a DIGI antes de sair.";
    document.getElementById("exitActive").checked = Boolean(data.exitActive);
    updateStatusChip("exitStatusChip", Boolean(data.exitActive), "Saída ativa", "Saída desativada");
}

async function loadPopupSettings() {
    try {
        const popupData = await getPopupSettings();
        if (!popupData) {
            updateFeedback("popupFeedback", "Nenhuma campanha configurada ainda.", "default");
            updateStatusChip("popupStatusChip", false, "Popup ativo", "Popup desativado");
            return null;
        }
        fillPopupForm(popupData);
        updateFeedback("popupFeedback", "Configuração atual do popup carregada.", "success");
        return popupData;
    } catch {
        updateFeedback("popupFeedback", "Não foi possível carregar a configuração do popup.", "error");
        return null;
    }
}

async function loadExitSettings() {
    try {
        const exitData = await getExitSettings();
        if (!exitData) {
            updateFeedback("exitFeedback", "Nenhuma mensagem de saída configurada ainda.", "default");
            updateStatusChip("exitStatusChip", false, "Saída ativa", "Saída desativada");
            return null;
        }
        fillExitForm(exitData);
        updateFeedback("exitFeedback", "Configuração atual da saída carregada.", "success");
        return exitData;
    } catch {
        updateFeedback("exitFeedback", "Não foi possível carregar a configuração da saída.", "error");
        return null;
    }
}

function updateDashboardVisibility(user) {
    const dashboard = document.getElementById("painel");
    const authCard = document.getElementById("login");
    if (!dashboard || !authCard) return;

    if (!getFirebaseState().configured) {
        authCard.classList.remove("hidden");
        dashboard.classList.add("hidden");
        return;
    }

    if (user) {
        authCard.classList.add("hidden");
        dashboard.classList.remove("hidden");
        updateFeedback("sessionFeedback", `Logado como ${user.email}.`, "success");
        refreshCoverageList();
        loadPopupSettings();
        loadExitSettings();
        return;
    }

    authCard.classList.remove("hidden");
    dashboard.classList.add("hidden");
    renderCoverageList([]);
    updateFeedback("authFeedback", "Faca login para liberar os cadastros.", "default");
    updateFeedback("adminListFeedback", "Faca login para visualizar os cadastros.", "default");
    updateFeedback("adminFeedback", "Faca login para inserir novos cadastros.", "default");
    updateFeedback("popupFeedback", "Faca login para gerenciar o popup do site.", "default");
    updateFeedback("exitFeedback", "Faca login para gerenciar a mensagem de saída.", "default");
}

function setupAuthForm() {
    const loginForm = document.getElementById("adminLoginForm");
    const logoutButton = document.getElementById("logoutBtn");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const email = String(formData.get("adminEmail") || "").trim();
            const password = String(formData.get("adminPassword") || "");

            if (!email || !password) {
                updateFeedback("authFeedback", "Informe email e senha para entrar.", "error");
                return;
            }

            try {
                await loginAdmin(email, password);
                loginForm.reset();
            } catch (error) {
                if (error.message === "firebase-not-configured") {
                    updateFeedback("authFeedback", "Configure o Firebase antes de usar o login.", "error");
                    return;
                }
                updateFeedback("authFeedback", "Login nao realizado. Verifique email, senha e regras do projeto.", "error");
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", async () => {
            try {
                await logoutAdmin();
            } catch (error) {
                if (error.message === "firebase-not-configured") {
                    updateFeedback("authFeedback", "Configure o Firebase antes de usar o login.", "error");
                    return;
                }
                updateFeedback("sessionFeedback", "Nao foi possivel encerrar a sessao agora.", "error");
            }
        });
    }
}

function setupCoverageForm() {
    const form = document.getElementById("coverageAdminForm");
    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const cep = getCepDigits(String(formData.get("coverageCep") || ""));
        const street = String(formData.get("coverageStreet") || "").trim();
        const neighborhood = String(formData.get("coverageNeighborhood") || "").trim();
        const city = String(formData.get("coverageCity") || "").trim();
        const plans = String(formData.get("coveragePlans") || "").split(",").map((item) => item.trim()).filter(Boolean);

        if (cep.length !== 8 || !street || !neighborhood || !city || !plans.length) {
            updateFeedback("adminFeedback", "Preencha CEP, rua, localidade, cidade e pelo menos um plano.", "error");
            return;
        }

        try {
            await saveCoverage({ cep, street, neighborhood, city, plans });
            updateFeedback("adminFeedback", "Cadastro salvo com sucesso.", "success");
            form.reset();
            refreshCoverageList();
        } catch (error) {
            if (error.message === "firebase-not-configured") {
                updateFeedback("adminFeedback", "Configure o Firebase antes de salvar cadastros.", "error");
                return;
            }
            updateFeedback("adminFeedback", "Nao foi possivel salvar o cadastro agora.", "error");
        }
    });
}

function setupPopupForm() {
    const form = document.getElementById("popupSettingsForm");
    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Salvando...";
        }

        updateFeedback("popupFeedback", "Salvando configuracao do popup...", "default");

        try {
            const currentSettings = await getPopupSettings();
            const selectedImage = String(formData.get("popupImageSelect") || "").trim();
            const manualImagePath = String(formData.get("popupImagePath") || "").trim();
            const imageUrl = selectedImage || manualImagePath || currentSettings?.imageUrl || "";

            if (!imageUrl) {
                updateFeedback("popupFeedback", "Selecione uma imagem da pasta img ou informe um caminho manual.", "error");
                return;
            }

            await savePopupSettings({
                active: Boolean(formData.get("popupActive")),
                title: String(formData.get("popupTitle") || "").trim(),
                text: String(formData.get("popupText") || "").trim(),
                buttonText: String(formData.get("popupButtonText") || "").trim(),
                buttonLink: String(formData.get("popupButtonLink") || "").trim(),
                imageUrl
            });

            updateFeedback("popupFeedback", "Popup central salvo com sucesso.", "success");
            loadPopupSettings();
        } catch (error) {
            if (error.message === "firebase-not-configured") {
                updateFeedback("popupFeedback", "Configure o Firebase antes de salvar o popup.", "error");
                return;
            }
            updateFeedback("popupFeedback", "Nao foi possivel salvar o popup agora.", "error");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Salvar popup central";
            }
        }
    });
}

function setupExitForm() {
    const form = document.getElementById("exitSettingsForm");
    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Salvando...";
        }

        updateFeedback("exitFeedback", "Salvando mensagem de saida...", "default");

        try {
            await saveExitSettings({
                exitActive: Boolean(formData.get("exitActive")),
                exitTitle: String(formData.get("exitTitle") || "").trim(),
                exitText: String(formData.get("exitText") || "").trim()
            });

            updateFeedback("exitFeedback", "Mensagem de saida salva com sucesso.", "success");
            loadExitSettings();
        } catch (error) {
            if (error.message === "firebase-not-configured") {
                updateFeedback("exitFeedback", "Configure o Firebase antes de salvar a mensagem de saída.", "error");
                return;
            }
            updateFeedback("exitFeedback", "Nao foi possivel salvar a mensagem de saída agora.", "error");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Salvar mensagem de saída";
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupMasks();
    setupRevealAnimations();
    setupFirebaseNotice();
    setupPopupImageInputs();
    setupAuthForm();
    setupCoverageForm();
    setupPopupForm();
    setupExitForm();
    observeAdminSession(updateDashboardVisibility);
});
