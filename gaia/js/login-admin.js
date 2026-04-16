 document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            try {
                const { data, error } = await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password,
                });

                if (error) throw error;

                // Login bem-sucedido
                window.location.href = 'admin-dashboard.html';
            } catch (error) {
                errorMessage.textContent = 'Erro ao fazer login: ' + error.message;
                errorMessage.style.display = 'block';
            }
        });

        // Verificar se já está logado
        async function checkSession() {
            const { data: { session } } = await supabaseClient.auth.getSession();
            if (session) {
                window.location.href = 'admin-dashboard.html';
            }
        }
        checkSession();