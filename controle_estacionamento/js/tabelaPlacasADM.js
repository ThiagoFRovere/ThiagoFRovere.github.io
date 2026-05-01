const firebaseConfig = {
    apiKey: "AIzaSyCB_7o5RPNTzVVBi-EV3miuDAPy_Tssk4Q",
    authDomain: "estacionamento-1ce5f.firebaseapp.com",
    projectId: "estacionamento-1ce5f",
    storageBucket: "estacionamento-1ce5f.firebasestorage.app",
    messagingSenderId: "591387024509",
    appId: "1:591387024509:web:76030e9341aa46698f2514",
    measurementId: "G-WWBBEX5C0X"
};


const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();  
const auth = app.auth();  


const firebaseConfig1 = {
    apiKey: "AIzaSyAIA8H1JjqOq6H6zBFr0JRy7OJ_RckfTXI",
    authDomain: "adm-estacionamento.firebaseapp.com",
    projectId: "adm-estacionamento",
    storageBucket: "adm-estacionamento.firebasestorage.app",
    messagingSenderId: "578692622807",
    appId: "1:578692622807:web:5b60cd782d3a27f3f08392",
    measurementId: "G-RGPMG575ZW"
};


const app1 = firebase.initializeApp(firebaseConfig1, "App1"); 
const db1 = app1.firestore();  
const auth1 = app1.auth();  
const formulario = db.collection('Estacionamento');

db.collection('Estacionamento').get().then((snapshot) => {
    snapshot.forEach(doc => {
        console.log("Veículo:", doc.data());
    });
});


db1.collection('Usuarios').get().then((snapshot) => {
    snapshot.forEach(doc => {
        console.log("Administrador:", doc.data());
    });
});


auth.onAuthStateChanged((user) => {
    if (user) {

        console.log("Usuário logado:", user);
        console.log("Email do usuário:", user.email);  
        console.log("UID do usuário:", user.uid); 
    } else {
        console.log("Nenhum usuário está logado.");
    }
});

const currentUser = auth.currentUser;
if (currentUser) {
    console.log("Usuário logado:", currentUser.email);
} else {
    console.log("Nenhum usuário está logado.");
}


auth1.onAuthStateChanged((user) => {
    if (user) {
        console.log("Administrador logado:", user);
        console.log("Email do administrador:", user.email);  
        console.log("UID do administrador:", user.uid);    
    } else {
        console.log("Nenhum administrador está logado.");
    }
});


function capitalizeFirstLetterName() {
    var input = document.getElementById('swal-input-nome');
    var words = input.value.split(' '); 
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase(); 
    }
    input.value = words.join(' '); 
}
function capitalizeFirstLetterSetor() {
    var input = document.getElementById('swal-input-setor');
    var words = input.value.split(' '); 
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase(); 
    }
    input.value = words.join(' '); 
}

function capitalizeFirstLetterCarro() {
    var input = document.getElementById('swal-input-carro');
    var words = input.value.split(' '); 
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase(); 
    }
    input.value = words.join(' '); 
}

function capitalizeFirstLetterCor() {
    var input = document.getElementById('swal-input-cor');
    var words = input.value.split(' '); 
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase(); 
    }
    input.value = words.join(' '); 
}

function validateRamal() {
    var ramalInput = document.getElementById('swal-input-ramal');
    var value = ramalInput.value;
    ramalInput.value = value.replace(/\D/g, '');
}

function transformToUpperCasePlaca() {
    var input = document.getElementById('swal-input-placa');
    input.value = input.value.toUpperCase();
}


const tableBody = document.getElementById('table-Car');


window.onload = loadTableData;


function loadTableData() {
    tableBody.innerHTML = ''; 

    formulario.get()
        .then((querySnapshot) => {
            let count = 0; 
            querySnapshot.forEach((doc) => {
                count++; 
                const data = doc.data();
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${data.nome || ''}</td>
                    <td>${data.setor || ''}</td>
                    <td>${data.ramal || ''}</td>
                    <td>${data.veiculo || ''}</td>
                    <td>${data.carro || ''}</td>
                    <td>${data.cor || ''}</td>
                    <td>${data.placa || ''}</td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Erro ao carregar os dados: ", error);
            alert('Erro ao carregar os dados, confira sua conexão ou permissões.');
        });
}


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                     CADASTRO DE VEICULOS
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.getElementById('btn-novo-cadastro').addEventListener('click', () => {
    Swal.fire({
        title: 'Cadastrar Novo Carro',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Cadastrar',
        cancelButtonText: 'Cancelar',
        width: 400,
        customClass: {
            title: 'custom-swal-title-cadastro',
            confirmButton: 'custom-confirm-btn-cadastro-carro', 
            cancelButton: 'custom-cancel-btn-cadastro' 
        },
        html: `
            <div style="font-size: 14px; display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <label for="swal-input-nome" style="margin-bottom: 0; width: 20%; text-align: right;  color: black; font-size: 12px; font-weight: bold;">Nome:</label>
                    <input id="swal-input-nome" class="swal2-input" placeholder="Digite o nome" style="width: 80%; margin: 0; height: 30px; margin-right: 10px" oninput="capitalizeFirstLetterName()">
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <label for="swal-input-setor" style="margin-bottom: 0; width: 20%; text-align: right;  color: black; font-size: 12px; font-weight: bold;">Setor:</label>
                    <input id="swal-input-setor" class="swal2-input" placeholder="Digite o setor" style="width: 80%;  margin: 0; height: 30px; margin-right: 10px" oninput="capitalizeFirstLetterSetor()">
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <label for="swal-input-ramal" style="margin-bottom: 0; width: 20%; text-align: right;  color: black; font-size: 12px; font-weight: bold;">Ramal:</label>
                    <input id="swal-input-ramal" class="swal2-input" placeholder="Digite o ramal" type="tel" inputmode="numeric" style="width: 80%;  margin: 0; height: 30px; margin-right: 10px" oninput="validateRamal()">
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <label for="swal-select-veiculo" style="margin-bottom: 0; width: 20%; text-align: right; color: black; font-size: 12px; font-weight: bold;">Tipo:</label>
                    <select id="swal-select-veiculo" class="swal2-input" style="width: 80%; margin: 0; height: 30px; margin-right: 10px; font-size: 12px">
                        <option value="Select">Selecione...</option>    
                        <option value="Carro">Carro</option>
                        <option value="Moto">Moto</option>
                        <option value="Caminhão">Caminhão</option>
                    </select>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <label for="swal-input-carro" style="margin-bottom: 0; width: 20%; text-align: right;  color: black; font-size: 12px; font-weight: bold;">Modelo:</label>
                    <input id="swal-input-carro" class="swal2-input" placeholder="Digite o modelo" style="width: 80%;  margin: 0; height: 30px; margin-right: 10px" oninput="capitalizeFirstLetterCarro()">
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <label for="swal-input-cor" style="margin-bottom: 0; width: 20%; text-align: right;  color: black; font-size: 12px; font-weight: bold;">Cor:</label>
                     <select id="swal-select-cor" class="swal2-input" style="width: 80%; margin: 0; height: 30px; margin-right: 10px; font-size: 12px">
                        <option value="Select">Selecione...</option>
                        <option value="Preto">Preto</option>
                        <option value="Branco">Branco</option>
                        <option value="Cinza">Cinza</option>
                        <option value="Vermelho">Vermelho</option>
                        <option value="Amarelo">Amarelo</option>
                        <option value="Laranja">Laranja</option>
                        <option value="Azul">Azul</option>
                        <option value="Bege">Bege</option>
                        <option value="Verde">Verde</option>
                        <option value="Outras">Outras...</option>
                    </select>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <label for="swal-input-placa" style="margin-bottom: 0; width: 20%; text-align: right;  color: black; font-size: 12px; font-weight: bold;">Placa:</label>
                    <input id="swal-input-placa" class="swal2-input" placeholder="Digite a placa" style="width: 80%;  margin: 0; height: 30px; margin-right: 10px" oninput="transformToUpperCasePlaca()">
                </div>
            </div>
        `,

        didOpen: () => {
            document.querySelector('.swal2-popup').style.height = '500px'; 
            document.querySelector('.swal2-html-container').style.padding = '10px'; 
            const placaInput = document.getElementById('swal-input-placa');
            
            // Impede mais de 7 caracteres
            placaInput.addEventListener('input', () => {
                if (placaInput.value.length > 7) {
                    placaInput.value = placaInput.value.slice(0, 7);
                }
            });
        },
        preConfirm: () => {
            const nome = document.getElementById('swal-input-nome').value.trim();
            const setor = document.getElementById('swal-input-setor').value.trim();
            const ramal = document.getElementById('swal-input-ramal').value.trim();
            const veiculo = document.getElementById('swal-select-veiculo').value.trim();
            const carro = document.getElementById('swal-input-carro').value.trim();
            const cor = document.getElementById('swal-select-cor').value.trim();
            const placa = document.getElementById('swal-input-placa').value.trim();

            if (!nome || !setor || !ramal || !veiculo || !carro || !cor || !placa) {
                Swal.showValidationMessage('Por favor, preencha todos os campos!');
                return false;
            }

            return { nome, setor, ramal, veiculo, carro, cor, placa };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { nome, setor, ramal, veiculo, carro, cor, placa } = result.value;


            formulario.where("placa", "==", placa).get()
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Essa placa já está cadastrada.',
                            icon: 'error',
                            confirmButtonText: 'Entendido'
                        });
                        return;
                    }

                    formulario.add({
                        nome,
                        setor,
                        ramal,
                        veiculo,
                        carro,
                        cor,
                        placa,
                    })
                        .then(() => {
                            Swal.fire({
                                title: 'Sucesso!',
                                text: 'Cadastro realizado com sucesso.',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
                            loadTableData();
                        })
                        .catch((error) => {
                            Swal.fire({
                                title: 'Erro!',
                                text: `Erro ao cadastrar: ${error.message}`,
                                icon: 'error',
                                confirmButtonText: 'Entendido'
                            });
                        });
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Erro!',
                        text: `Erro ao verificar a placa: ${error.message}`,
                        icon: 'error',
                        confirmButtonText: 'Entendido'
                    });
                });
        }
    });
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                      ALTERAR CADASTRO DOS VEICULOS
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.getElementById('btn-alterar-cadastro').addEventListener('click', () => {
    Swal.fire({
        title: 'Digite a placa que deseja alterar:',
        input: 'text',
        width: 400,
        inputPlaceholder: 'Ex: ABC1234',
        showCancelButton: true,
        confirmButtonText: 'Buscar',
        cancelButtonText: 'Cancelar',

        customClass: {
            title: 'custom-swal-title-alterar',
            confirmButton: 'custom-confirm-btn-alterar',
            cancelButton: 'custom-cancel-btn-alterar', 
            input: 'custom-swal-input-alterar',
        },
        
        inputValidator: (value) => {
            if (!value) {
                return 'Por favor, insira uma placa válida!';
            }
        }

    }).then((result) => {
        if (result.isConfirmed) {
            // 
            let placa = result.value.trim().toUpperCase();

            // Busca no Firestore pela placa
            formulario.where("placa", "==", placa).get()
                .then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        Swal.fire({
                            title: 'Não encontrado!',
                            text: `Nenhum cadastro foi encontrado com a placa "${placa}".`,
                            icon: 'warning',
                            confirmButtonText: 'Entendido'
                        });
                        return;
                    }

                    let docId, data;
                    querySnapshot.forEach((doc) => {
                        docId = doc.id; 
                        data = doc.data(); 
                    });

                    Swal.fire({
                        title: 'Alterar Cadastro',
                        html: `
                        <div style="font-size: 14px; display: flex; flex-direction: column; gap: 10px;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <label for="swal-input-nome"  style="margin-bottom: 0; width: 20%; text-align: right;  color: black; font-size: 12px; font-weight: bold;">Nome:</label>
                                <input id="swal-input-nome" class="swal2-input" style="width: 80%; margin: 0; height: 30px; margin-right: 10px;" oninput="capitalizeFirstLetterName()" value="${data.nome || ''}">
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <label for="swal-input-setor" style="margin-bottom: 0; width: 20%; text-align: right;  color: black; font-size: 12px; font-weight: bold;">Setor:</label>
                                <input id="swal-input-setor" class="swal2-input" style="width: 80%; margin: 0; height: 30px; margin-right: 10px;" oninput="capitalizeFirstLetterSetor()" value="${data.setor || ''}">
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <label for="swal-input-ramal" style="margin-bottom: 0; width: 20%; text-align: right;  color: black; font-size: 12px; font-weight: bold;">Ramal:</label>
                                <input id="swal-input-ramal" class="swal2-input" style="width: 80%; margin: 0; height: 30px; margin-right: 10px;" oninput="validateRamal()" value="${data.ramal || ''}">
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <label for="swal-select-veiculo" style="margin-bottom: 0; width: 20%; text-align: right; color: black; font-size: 12px; font-weight: bold;">Tipo:</label>
                                <select id="swal-select-veiculo" class="swal2-input" style="width: 80%; margin: 0; height: 30px; margin-right: 10px; font-size: 12px">
                                    <option value="Select">Selecione...</option>    
                                    <option value="Carro">Carro</option>
                                    <option value="Moto">Moto</option>
                                    <option value="Caminhão">Caminhão</option>
                                </select>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <label for="swal-input-carro" style="margin-bottom: 0; width: 20%; text-align: right;  color: black; font-size: 12px; font-weight: bold;">Carro:</label>
                                <input id="swal-input-carro" class="swal2-input" style="width: 80%; margin: 0; height: 30px; margin-right: 10px;" oninput="capitalizeFirstLetterCarro()" value="${data.carro || ''}">
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <label for="swal-input-cor" style="margin-bottom: 0; width: 20%; text-align: right;  color: black; font-size: 12px; font-weight: bold;">Cor:</label>
                                <select id="swal-select-cor" class="swal2-input" style="width: 80%; margin: 0; height: 30px; margin-right: 10px; font-size: 12px">
                                    <option value="Select">Selecione...</option>
                                    <option value="Preto">Preto</option>
                                    <option value="Branco">Branco</option>
                                    <option value="Cinza">Cinza</option>
                                    <option value="Vermelho">Vermelho</option>
                                    <option value="Amarelo">Amarelo</option>
                                    <option value="Laranja">Laranja</option>
                                    <option value="Azul">Azul</option>
                                    <option value="Bege">Bege</option>
                                    <option value="Verde">Verde</option>
                                    <option value="Outras">Outras...</option>
                                </select>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <label for="swal-input-placa" style="margin-bottom: 0; width: 20%; text-align: right; color: black; font-size: 12px; font-weight: bold;">Placa:</label>
                                <input id="swal-input-placa" class="swal2-input" style="width: 80%; margin: 0; height: 30px; margin-right: 10px; color: red;" oninput="transformToUpperCasePlaca()" readonly value="${data.placa || ''}">
                            </div>
                        </div>
                        `,
                        margin: 0,
                        focusConfirm: false,
                        showCancelButton: true,
                        confirmButtonText: 'Salvar Alterações',
                        cancelButtonText: 'Cancelar',

                        customClass: {
                            title: 'custom-swal-title-alterar',
                        },

                        didOpen: () => {
                            document.querySelector('.swal2-popup').style.height = '450px'; 
                            document.querySelector('.swal2-html-container').style.padding = '10px'; 
                            const placaInput = document.getElementById('swal-input-placa');
                        },



                        preConfirm: () => {
                            const nome = document.getElementById('swal-input-nome').value.trim();
                            const setor = document.getElementById('swal-input-setor').value.trim();
                            const ramal = document.getElementById('swal-input-ramal').value.trim();
                            const veiculo = document.getElementById('swal-select-veiculo').value.trim();
                            const carro = document.getElementById('swal-input-carro').value.trim();
                            const cor = document.getElementById('swal-select-cor').value.trim();

                            if (!nome || !setor || !ramal || !veiculo || !carro || !cor) {
                                Swal.showValidationMessage('Por favor, preencha todos os campos!');
                                return false;
                            }

                            return { nome, setor, ramal, veiculo, carro, cor };
                        }
                    }).then((editResult) => {
                        if (editResult.isConfirmed) {
                            const { nome, setor, ramal, veiculo, carro, cor } = editResult.value;

                            formulario.doc(docId).update({
                                nome,
                                setor,
                                ramal,
                                veiculo,
                                carro,
                                cor
                            })
                                .then(() => {
                                    Swal.fire({
                                        title: 'Sucesso!',
                                        text: 'Os dados foram atualizados com sucesso.',
                                        icon: 'success',
                                        confirmButtonText: 'OK'
                                    });
                                    loadTableData();
                                })
                                .catch((error) => {
                                    Swal.fire({
                                        title: 'Erro!',
                                        text: `Erro ao atualizar os dados: ${error.message}`,
                                        icon: 'error',
                                        confirmButtonText: 'Entendido'
                                    });
                                });
                        }
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Erro!',
                        text: `Erro ao buscar a placa: ${error.message}`,
                        icon: 'error',
                        confirmButtonText: 'Entendido'
                    });
                });
        }
    });
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                      PESQUISAR POR PLACA
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.getElementById('btn-pesquisar').addEventListener('click', () => {
    Swal.fire({
        title: 'Digite a placa:',
        input: 'text',
        inputPlaceholder: 'Ex: ABC1234',
        showCancelButton: true,
        confirmButtonText: 'Buscar',
        cancelButtonText: 'Cancelar',
        width: 350,

        customClass: {
            title: 'custom-swal-title-pesquisar',
            confirmButton: 'custom-confirm-btn-pesquisar', 
            cancelButton: 'custom-cancel-btn-pesquisar', 
            input: 'custom-swal-input-pesquisar',
        },
        

        inputValidator: (value) => {
            if (!value) {
                return 'Por favor, insira uma placa válida!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let placa = result.value.trim().toUpperCase();

            formulario.where("placa", "==", placa).get()
                .then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        Swal.fire({
                            title: 'Não encontrado!',
                            text: `Nenhum cadastro foi encontrado com a placa "${placa}".`,
                            icon: 'warning',
                            confirmButtonText: 'Entendido'
                        });
                        return;
                    }

                    let tableHtml = `
                        <table border="1" style="width:100%; text-align:left; border-collapse: collapse; padding: 0 0 0 0; ">
                            <thead>
                                <tr>
                                    <th class="custom-table-infor-pesquisa">Nome</th>
                                    <th class="custom-table-infor-pesquisa">Setor</th>
                                    <th class="custom-table-infor-pesquisa">Ramal</th>
                                    <th class="custom-table-infor-pesquisa">Veículo</th>
                                    <th class="custom-table-infor-pesquisa">Modelo</th>
                                    <th class="custom-table-infor-pesquisa">Cor</th>
                                    <th class="custom-table-infor-pesquisa">Placa</th>
                                </tr>
                            </thead>
                            <tbody>
                    `;

                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        tableHtml += `
                            <tr>
                                <td class="custom-table-resul-pesquisa">${data.nome || ''}</td>
                                <td class="custom-table-resul-pesquisa">${data.setor || ''}</td>
                                <td class="custom-table-resul-pesquisa">${data.ramal || ''}</td>
                                <td class="custom-table-resul-pesquisa">${data.veiculo || ''}</td>
                                <td class="custom-table-resul-pesquisa">${data.carro || ''}</td>
                                <td class="custom-table-resul-pesquisa">${data.cor || ''}</td>
                                <td class="custom-table-resul-pesquisa">${data.placa || ''}</td>
                            </tr>
                        `;
                    });

                    tableHtml += '</tbody></table>';

                    Swal.fire({
                        title: 'Resultado da Pesquisa',
                        html: tableHtml,
                        confirmButtonText: 'Fechar',
                        width: 600,
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Erro!',
                        text: `Erro ao buscar o cadastro: ${error.message}`,
                        icon: 'error',
                        confirmButtonText: 'Entendido'
                    });
                });
        }
    });
});



//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                      PESQUISA TIPO DE CARRO
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.getElementById('btn-pesquisarCarro').addEventListener('click', () => {
    Swal.fire({
        title: 'Digite o modelo do carro:',
        input: 'text',
        inputPlaceholder: 'Ex: Fusion',
        showCancelButton: true,
        confirmButtonText: 'Buscar',
        cancelButtonText: 'Cancelar',
        width: 350,

        customClass: {
            title: 'custom-swal-title-pesquisar',
            confirmButton: 'custom-confirm-btn-pesquisar', 
            cancelButton: 'custom-cancel-btn-pesquisar',  
            input: 'custom-swal-input-pesquisar',
        },
        

        inputValidator: (value) => {
            if (!value) {
                return 'Por favor, insira uma placa válida!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const capitalize = (str) => {
                return str
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            };
            const carro = capitalize(result.value.trim());

            formulario.where("carro", "==", carro).get()
                .then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        Swal.fire({
                            title: 'Não encontrado!',
                            text: `Nenhum cadastro foi encontrado com a placa "${carro}".`,
                            icon: 'warning',
                            confirmButtonText: 'Entendido'
                        });
                        return;
                    }
                    let tableHtml = `
                        <table border="1" style="width:100%; text-align:left; border-collapse: collapse; padding: 1em .1em .3em; ">
                            <thead>
                                <tr>
                                    <th class="custom-table-infor-pesquisa">Nome</th>
                                    <th class="custom-table-infor-pesquisa">Setor</th>
                                    <th class="custom-table-infor-pesquisa">Ramal</th>
                                    <th class="custom-table-infor-pesquisa">Veículo</th>
                                    <th class="custom-table-infor-pesquisa">Modelo</th>
                                    <th class="custom-table-infor-pesquisa">Cor</th>
                                    <th class="custom-table-infor-pesquisa">Placa</th>
                                </tr>
                            </thead>
                            <tbody>
                    `;

                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        tableHtml += `
                            <tr>
                                <td class="custom-table-resul-pesquisa">${data.nome || ''}</td>
                                <td class="custom-table-resul-pesquisa">${data.setor || ''}</td>
                                <td class="custom-table-resul-pesquisa">${data.ramal || ''}</td>
                                <td class="custom-table-resul-pesquisa">${data.veiculo || ''}</td>
                                <td class="custom-table-resul-pesquisa">${data.carro || ''}</td>
                                <td class="custom-table-resul-pesquisa">${data.cor || ''}</td>
                                <td class="custom-table-resul-pesquisa">${data.placa || ''}</td>
                            </tr>
                        `;
                    });

                    tableHtml += '</tbody></table>';

                    Swal.fire({
                        title: 'Resultado da Pesquisa',
                        html: tableHtml,
                        confirmButtonText: 'Fechar',
                        width: 600,
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Erro!',
                        text: `Erro ao buscar o cadastro: ${error.message}`,
                        icon: 'error',
                        confirmButtonText: 'Entendido'
                    });
                });
        }
    });
});


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                      EXCLUIR CADASTRO
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.getElementById('btn-excluir').addEventListener('click', () => {
    Swal.fire({
        title: 'Digite a placa que deseja excluir:',
        input: 'text',
        inputPlaceholder: 'Ex: ABC1234',
        showCancelButton: true,
        confirmButtonText: 'Buscar',
        cancelButtonText: 'Cancelar',
        width: 350,

        customClass: {
            title: 'custom-swal-title-excluir',
            confirmButton: 'custom-confirm-btn-excluir',
            cancelButton: 'custom-cancel-btn-excluir', 
            input: 'custom-swal-input-excluir',
        },

        inputValidator: (value) => {
            if (!value) {
                return 'Por favor, insira uma placa válida!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let placa = result.value.trim().toUpperCase();

            formulario.where("placa", "==", placa).get()
                .then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        Swal.fire({
                            title: 'Erro!',
                            text: `Nenhum cadastro encontrado com a placa "${placa}".`,
                            icon: 'error',
                            confirmButtonText: 'Entendido'
                        });
                        return;
                    }
                    Swal.fire({
                        title: `Deseja excluir o cadastro com a placa "${placa}"?`,
                        text: "Essa ação não poderá ser desfeita!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Sim, excluir',
                        cancelButtonText: 'Não, cancelar',

                        customClass: {
                            title: 'custom-swal-title-excluir-ok',
                            confirmButtonText: 'custom-swal-title-excluir-bnt'
                        },

                    }).then((confirmResult) => {
                        if (confirmResult.isConfirmed) {
                            querySnapshot.forEach((doc) => {
                                doc.ref.delete()
                                    .then(() => {
                                        Swal.fire({
                                            title: 'Excluído!',
                                            text: `O cadastro com a placa "${placa}" foi excluído com sucesso.`,
                                            icon: 'success',
                                            confirmButtonText: 'OK'
                                        });
                                        loadTableData();
                                    })
                                    .catch((error) => {
                                        Swal.fire({
                                            title: 'Erro!',
                                            text: `Erro ao excluir o cadastro: ${error.message}`,
                                            icon: 'error',
                                            confirmButtonText: 'Entendido'
                                        });
                                    });
                            });
                        } else {
                            Swal.fire({
                                title: 'Cancelado',
                                text: 'A exclusão foi cancelada.',
                                icon: 'info',
                                confirmButtonText: 'Entendido'
                            });
                        }
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Erro!',
                        text: `Erro ao buscar o cadastro: ${error.message}`,
                        icon: 'error',
                        confirmButtonText: 'Entendido'
                    });
                });
        }
    });
});











//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                      EXPORTAR BANCO DE DADOS
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.getElementById('btn-Exportar').addEventListener('click', () => {
    formulario.get()
        .then((querySnapshot) => {
            const rows = [["Nome", "Setor", "Ramal", "Veiculo", "Modelo", "Cor", "Placa"]];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                rows.push([
                    data.nome || '',
                    data.setor || '',
                    data.ramal || '',
                    data.veiculo || '',
                    data.carro || '',
                    data.cor || '',
                    data.placa || ''
                ]);
            });

            let csvContent = "data:text/csv;charset=utf-8," + 
                rows.map(e => e.join(",")).join("\n");

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "carros_cadastrados.csv");
            document.body.appendChild(link);
            link.click();
        })
        .catch((error) => {
            console.error("Erro ao exportar dados: ", error);
        });
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                      CADASTRAR NOVO USUARIOS
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const btnNovoUsuario = document.getElementById("btn-novo-usuario");

    if (btnNovoUsuario) {
        btnNovoUsuario.addEventListener('click', () => {
            Swal.fire({
                title: 'Cadastrar Novo Usuário',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Cadastrar',
                cancelButtonText: 'Cancelar',
                width: 400,
                customClass: {
                    title: 'custom-swal-title-cadastro',
                    confirmButton: 'custom-confirm-btn-cadastro-usuario', 
                    cancelButton: 'custom-cancel-btn-cadastro-usuario' 
                },
                html: `
                    <form>
                    <div style="font-size: 14px; display: flex; flex-direction: column; gap: 10px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <label for="swal-input-email" style="margin-bottom: 0; width: 30%; text-align: right; color: black; font-size: 12px; font-weight: bold;">Email:</label>
                            <input id="swal-input-email" class="swal2-input" placeholder="Digite o email" style="width: 70%; margin: 0; height: 25px;" autocomplete="off" name="user-email">
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <label for="swal-input-senha" style="margin-bottom: 0; width: 30%; text-align: right; color: black; font-size: 12px; font-weight: bold;">Senha:</label>
                            <input id="swal-input-senha" class="swal2-input" placeholder="Digite a senha" type="password" style="width: 70%; margin: 0; height: 25px;" autocomplete="new-password" name="user-password">
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <label for="swal-input-confirma-senha" style="margin-bottom: 0; width: 30%; text-align: right; color: black; font-size: 12px; font-weight: bold;">Confirme:</label>
                            <input id="swal-input-confirma-senha" class="swal2-input" placeholder="Confirme a senha" type="password" style="width: 70%; margin: 0; height: 25px;" autocomplete="new-password" name="confirm-password">
                        </div>
                    </div>
                    </form>
                `,
                preConfirm: () => {
                    const email = document.getElementById('swal-input-email').value.trim();
                    const senha = document.getElementById('swal-input-senha').value.trim();
                    const confirmaSenha = document.getElementById('swal-input-confirma-senha').value.trim();

                    if (!email || !senha || !confirmaSenha) {
                        Swal.showValidationMessage('Por favor, preencha todos os campos!');
                        return false;
                    }

                    if (senha !== confirmaSenha) {
                        Swal.showValidationMessage('As senhas não conferem!');
                        return false;
                    }

                    return { email, senha };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const { email, senha } = result.value;
                    if (!auth) {
                        console.error("Erro: auth não foi inicializado corretamente!");
                        return;
                    }
                    auth.createUserWithEmailAndPassword(email, senha)
                        .then(() => {
                            Swal.fire({
                                title: 'Sucesso!',
                                text: 'Usuário cadastrado com sucesso.',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
                        })
                        .catch((error) => {
                            Swal.fire({
                                title: 'Erro!',
                                text: `Erro ao cadastrar usuário: ${error.message}`,
                                icon: 'error',
                                confirmButtonText: 'Entendido'
                            });
                        });
                }
            });
        });
    } else {
        console.error("Erro: Botão 'btn-novo-usuario' não encontrado no DOM.");
    }
});

















function contarVeiculos() {
    const db = firebase.firestore();
    
    db.collection('Estacionamento').get().then((snapshot) => {
        let totalVeiculos = snapshot.size;
        let totalCarros = 0;
        let totalMotos = 0;
        let totalCaminhoes = 0;

        snapshot.forEach((doc) => {
            const veiculo = doc.data();
            switch(veiculo.veiculo) {
                case 'Carro':
                    totalCarros++;
                    break;
                case 'Moto':
                    totalMotos++;
                    break;
                case 'Caminhão':
                    totalCaminhoes++;
                    break;
            }
        });

        document.getElementById('lista-total').textContent = `Total de veículos: ${totalVeiculos}`;
        document.getElementById('lista-carros').textContent = `Total de carros: ${totalCarros}`;
        document.getElementById('lista-moto').textContent = `Total de motos: ${totalMotos}`;
        document.getElementById('lista-caminhao').textContent = `Total de caminhões: ${totalCaminhoes}`;
    });
}

db.collection('Estacionamento').onSnapshot(() => {
    contarVeiculos();
});

document.addEventListener('DOMContentLoaded', contarVeiculos);












function carregarSolicitacoesExclusao() {
    db.collection('SolicitacoesExclusao')
        .where('status', '==', 'pendente')
        .onSnapshot((snapshot) => {
            const listaElement = document.getElementById('lista-exclusao');
            listaElement.innerHTML = '';
            
            snapshot.forEach((doc) => {
                const solicitacao = doc.data();
                const item = `
                    <div class="solicitacao-item" data-doc-id="${doc.id}">
                        <span>Placa: ${solicitacao.placa}</span>
                        <div class="botoes-acao">
                            <button class="btn-aceitar" onclick="aprovarExclusao('${doc.id}', '${solicitacao.placa}')" title="Aprovar">
                                ✓
                            </button>
                            <button class="btn-recusar" onclick="recusarExclusao('${doc.id}')" title="Recusar">
                                ✕
                            </button>
                        </div>
                    </div>
                `;
                listaElement.innerHTML += item;
            });
        });
}

function recusarExclusao(docId) {
    const item = document.querySelector(`[data-doc-id="${docId}"]`);
    if (item) {
        item.remove();
    }
}

function aprovarExclusao(solicitacaoId, placa) {
    Swal.fire({
        title: 'Confirmar Exclusão',
        text: `Deseja excluir o veículo de placa ${placa}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            db.collection('Estacionamento')
                .where('placa', '==', placa)
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                })
                .then(() => {
                    db.collection('SolicitacoesExclusao')
                        .doc(solicitacaoId)
                        .update({
                            status: 'aprovado',
                            dataAprovacao: new Date()
                        });
                    
                    Swal.fire(
                        'Excluído!',
                        'O veículo foi removido com sucesso.',
                        'success'
                    );
                });
        }
    });
}

carregarSolicitacoesExclusao();




// Swal.fire({
//     title: 'Parabéns!',
//     text: 'Usuário cadastrado com sucesso.',
//     imageUrl: 'https://example.com/success-icon.png', // Ícone customizado
//     imageWidth: 100,
//     imageHeight: 100,
//     imageAlt: 'Ícone de sucesso',
//     showConfirmButton: true,
//     confirmButtonText: 'Fechar',
//     customClass: {
//         popup: 'animate__animated animate__zoomIn', // Animação ao exibir
//     }
// });



// document.querySelector('.form').addEventListener('submit', (e) => {
//     e.preventDefault(); // Previne o comportamento padrão do formulário

//     const email = document.getElementById('enterEmail').value.trim();
//     const password = document.getElementById('enterPassword').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;

//     // Validar campos
//     if (!email || !password || !confirmPassword) {
//         Swal.fire({
//             title: 'Erro!',
//             text: 'Por favor, preencha todos os campos.',
//             icon: 'error',
//             confirmButtonText: 'Corrigir',
//             customClass: {
//                 popup: 'animate__animated animate__shakeX',
//             }
//         });
//         return;
//     }

//     if (password !== confirmPassword) {
//         Swal.fire({
//             title: 'Erro!',
//             text: 'As senhas não conferem.',
//             icon: 'error',
//             confirmButtonText: 'Corrigir',
//             customClass: {
//                 popup: 'animate__animated animate__headShake',
//             }
//         });
//         return;
//     }

//     // Exibir mensagem de sucesso
//     Swal.fire({
//         title: 'Cadastro Realizado!',
//         text: 'Usuário cadastrado com sucesso.',
//         icon: 'success',
//         timer: 2000,
//         timerProgressBar: true,
//         showConfirmButton: false,
//         customClass: {
//             popup: 'animate__animated animate__fadeInDown',
//         }
//     }).then(() => {
//         document.querySelector('.form').reset(); // Limpar campos do formulário
//     });
// });


// // function showSuccessMessage() {
// //     Swal.fire({
// //         title: 'Cadastro Realizado!',
// //         text: 'Usuário cadastrado com sucesso.',
// //         icon: 'success',
// //         timer: 2000,
// //         timerProgressBar: true,
// //         showConfirmButton: false,
// //         customClass: {
// //             popup: 'animate__animated animate__fadeInDown',
// //         }
// //     }).then(() => {
// //         // Limpar campos do formulário após o alerta
// //         document.querySelector('.form').reset(); // Reseta todos os campos do formulário
// //     });
// // }

// // function showErrorMessage(errorText) {
// //     Swal.fire({
// //         title: 'Erro!',
// //         text: errorText,
// //         icon: 'error',
// //         customClass: {
// //             popup: 'animate__animated animate__shakeX',
// //         }
// //     });
// // }

// // // Exemplos de chamada
// // showSuccessMessage();
// // showErrorMessage('As senhas não conferem.');

// // document.querySelector('.form').addEventListener('submit', (e) => {
// //     e.preventDefault(); // Previne o envio do formulário

// //     const password = document.getElementById('enterPassword').value;
// //     const confirmPassword = document.getElementById('confirmPassword').value;

// //     if (password !== confirmPassword) {
// //         showErrorMessage('As senhas não conferem.');
// //     } else {
// //         showSuccessMessage();
// //     }
// // });


