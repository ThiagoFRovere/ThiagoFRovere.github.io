var kgFilamento, frete, material, custoMaterial;
var watts, valorEnergia, tempoImp, custoEnergia;
var despesa, dias, horas, lucro, custoDespesas;
var lucroPorcentagem, somaTotal, resultadoFinal;

function calcular(event){
    event.preventDefault(); //Não deixa apagar os campos preenchidos quando atualizar a pagina

    kgFilamento = document.getElementById('kgFilamento').value;
    frete = document.getElementById('frete').value;
    material = document.getElementById('material').value;

    custoMaterial =  (parseFloat(kgFilamento) + parseFloat(frete)) * parseFloat(material);

    //----------------------------------------------------------
    
    watts = document.getElementById('watts').value;
    valorEnergia = document.getElementById('valorEnergia').value;
    tempoImp = document.getElementById('tempoImp').value;
    
    custoEnergia = (parseFloat(watts) *(parseFloat(valorEnergia) / 1000)) * parseFloat(tempoImp);

    //-----------------------------------------------------------

    despesa = document.getElementById('despesa').value;
    dias = document.getElementById('dias').value;
    horas = document.getElementById('horas').value;

    custoDespesas = ((parseFloat(despesa) / parseFloat(dias)) / parseFloat(horas)) * parseFloat(tempoImp);

    //-----------------------------------------------------------

    somaTotal = parseFloat(custoMaterial) + parseFloat(custoEnergia) + parseFloat(custoDespesas);
    lucro = document.getElementById('lucro').value;
    lucroPorcentagem = ((parseFloat(somaTotal)) * (parseFloat(lucro))/100);

    resultadoFinal = parseFloat(lucroPorcentagem) + parseFloat(somaTotal);
    
    //-----------------------------------------------------------

    resultado1 = document.getElementById('resultado1');
    resultado1.innerHTML = '<ion-icon name="help-buoy-outline"></ion-icon> Valor Material: ' + custoMaterial.toFixed(2);
    resultado2 = document.getElementById('resultado2');
    resultado2.innerHTML = '<ion-icon name="flash-outline"></ion-icon> Custo Energia: ' + custoEnergia.toFixed(2); 
    resultado3 = document.getElementById('resultado3');
    resultado3.innerHTML = '<ion-icon name="storefront-outline"></ion-icon> Despesas: ' + custoDespesas.toFixed(2); 
    resultado4 = document.getElementById('resultado4');
    resultado4.innerHTML = '<ion-icon name="calculator-outline"></ion-icon> Valor Bruto: ' + somaTotal.toFixed(2);
    resultado5 = document.getElementById('resultado5');
    resultado5.innerHTML = '<ion-icon name="bar-chart-outline"></ion-icon> Valor Ganho: ' + lucroPorcentagem.toFixed(2);
    resultado6 = document.getElementById('resultado6');
    resultado6.innerHTML = '<ion-icon name="cash-outline"></ion-icon> Valor de Venda: ' + resultadoFinal.toFixed(2);
    
    
    document.getElementById('kgFilamento').value = '' ;
    document.getElementById('frete').value = '' ;
    document.getElementById('material').value = '' ;
    document.getElementById('watts').value = '' ;
    document.getElementById('valorEnergia').value = '' ;
    document.getElementById('tempoImp').value = '' ;
    document.getElementById('despesa').value = '' ;
    document.getElementById('dias').value = '' ;
    document.getElementById('horas').value = '' ;
    document.getElementById('lucro').value = '' ;
}