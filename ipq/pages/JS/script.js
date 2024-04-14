
const firebaseConfig = {
    apiKey: "AIzaSyBCVCOnsjyH0JdL9AKBoGHQa4KAWWkzO1c",
    authDomain: "prontuario-4ce95.firebaseapp.com",
    projectId: "prontuario-4ce95",
    storageBucket: "prontuario-4ce95.appspot.com",
    messagingSenderId: "276317492035",
    appId: "1:276317492035:web:c350879118105a204ad5f6",
    measurementId: "G-6TNEBPZ8YD"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const formulario = db.collection('Revisão-Prontúario-IPQ')

function enviarFormulario(){
        date1 = form.dateRevisaoProntuario.value;
        date2 = form.dateRevisaoProntuario.value;
        input1 = form.numeroProntuario.value;
        input2 = form.nomePaciente.value;
        input3 = form.siglaNome.value;
        select1 = form.selectGenero.value;
        select2 = form.dateNascimento.value; 
        select3 = form.selectUnidade.value; 
        select4 = form.selectMedicoAssistente.value; 
        select5 = form.selectEnfermeiro.value; 
        select6 = form.selectMedicoPlantinista.value; 
        select7 = form.selectMedicoresidente.value; 
        date3 = form.dateInterAtual.value;
        date4 = form.dateAltaMedica.value;
        date5 = form.dateSaidaHospital.value;
        select8 = form.selectPrimeiraInternacao.value; 
        input4 = form.nInternacao.value;
        select9 = form.selectIntSubJudice.value;
        date6 = form.dataPrimInternacao.value;
        date7 = form.dataAltaInterAnterior.value;
        input5 = form.nPresMedTotal.value;
        input6 = form.nEvolMedTotal.value;
        input7 = form.nEvolPsicolTotal.value;
        input8 = form.nEvolEnferTotal.value;
        input9 = form.nEvolTOTotal.value;
        input10 = form.nEvolServSociTotal.value;
        
        selectQuali1 = form.regAnamneseInternacao.value;
        selectQuali2 = form.qualidadeDosRegistrosMedicos.value;
        selectQuali3 = form.assinaturaCarimboProfNivelSuperior.value;
        selectQuali4 = form.qualidadeRegistrosEnfermagem.value;
        selectQuali5 = form.checagemPrescricaoMedica.value;
        selectQuali6 = form.qualidadeRegistrosServicoSocial.value;
        selectQuali7 = form.anotacoesTecnicoEnfermagem.value;
        selectQuali8 = form.qualidadeRegistrosTerapiaOcupacional.value;
        selectQuali9 = form.legibilidade.value;
        selectQuali10 = form.qualidadeRegistrosPsicologia.value;
        selectQuali11 = form.adequacaoMedicacaoPsiquiatrica.value;
        selectQuali12 = form.qualidadeRegistrosEducaçãoFisica.value;
        selectQuali13 = form.organizacao.value;
        selectQuali14 = form.registroProcClinicos.value;
        selectQuali15 = form.resumoAltaMedica.value;
        selectQuali16 = form.cumprimentoProjetoTerapeutico.value;
        selectQuali17 = form.resumoAltaPsicosocial.value;
        selectQuali18 = form.dadosJuridicos.value;

        doencaCampo1 = form.doencaCampo1.value;
        doencaCampo2 = form.doencaCampo2.value;
        doencaCampo3 = form.doencaCampo3.value;
        doencaCampo4 = form.doencaCampo4.value;
        doencaCampo5 = form.doencaCampo5.value;
        doencaCampo6 = form.doencaCampo6.value;

        textarea = form.textarea.value;

        medicoRevisor = form.nomeMedicoRevisor.value;
  }

    form.addEventListener('submit',(event)=>{
        event.preventDefault();
        let novoCadastro = {
            dataRevisaoProntuario: date1,
            nDoProntuario: input1,
            nomePaciente: input2,
            siglaNome: input3,
            genero: select1,
            dataDeNascimento: select2,
            Unidade: select3,
            MedicoAssistente: select4,
            Enfermeiro: select5,
            MedicoPlantinista: select6,
            MedicoResidente: select7,
            dateInterAtual: date3,
            dateAltaMedica: date4,
            dateSaidaHospital: date5,
            PrimeiraInternacao: select8,
            nInternacao: input4,
            IntSubJudice: select9,
            dataPrimInternacao: date6,
            dataAltaInterAnterior: date7,
            nPrescricaoMedicaTotal: input5,
            nEvolucaoMedicaTotal: input6,
            nEvolucaoPsicolTotal: input7,
            nEvolucaoEnfermagemTotal: input8,
            nEvolTOTotal: input9,
            nEvolucaoServicoSocialTotal: input10,

            RegAnamneseInternacao: selectQuali1,
            QualidadeDosRegistrosMedicos: selectQuali2,
            AssinaturaCarimboProfNivelSuperior: selectQuali3,
            QualidadeRegistrosEnfermagem: selectQuali4,
            ChecagemPrescricaoMedica: selectQuali5,
            QualidadeRegistrosServicoSocial: selectQuali6,
            AnotacoesTecnicoEnfermagem: selectQuali7,
            QualidadeRegistrosTerapiaOcupacional: selectQuali8,
            Legibilidade: selectQuali9,
            QualidadeRegistrosPsicologia: selectQuali10,
            AdequacaoMedicacaoPsiquiatrica: selectQuali11,
            QualidadeRegistrosEducaçãoFisica: selectQuali12,
            Organizacao: selectQuali13,
            RegistroProcClinicos: selectQuali14,
            ResumoAltaMedica: selectQuali15,
            CumprimentoProjetoTerapeutico: selectQuali16,
            ResumoAltaPsicosocial: selectQuali17,
            DadosJuridicos: selectQuali18,

            IntercorrenciaClinica1: doencaCampo1,
            IntercorrenciaClinica2: doencaCampo2,
            IntercorrenciaClinica3: doencaCampo3,
            IntercorrenciaClinica4: doencaCampo4,
            IntercorrenciaClinica5: doencaCampo5,
            IntercorrenciaClinica6: doencaCampo6,

            observacoes: textarea,

            nomeMedicoRevisor: medicoRevisor,
        };
        console.log("")

        formulario.add(novoCadastro).then((docRef)=>{
            alert("cadastro do Prontuário realizado Com Sucesso!!!!!!")
        }).catch((erro)=>{
            alert("erro: ", erro)
        })
    })




