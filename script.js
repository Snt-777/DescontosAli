let valorglobalquantia = 0

function QuantPro() {
let quant_produtos = document.getElementById("Quant_Pro").value
let sec_altera = document.getElementById("Flex_Sec")
let aviso = document.getElementById("aviso")
let cont = 0

if(quant_produtos === "" || quant_produtos <= 0){
    aviso.innerHTML = "Coloque um Valor!"
}else{
    aviso.innerHTML = ""
    sec_altera.innerHTML = ""
    valorglobalquantia = quant_produtos

    while(cont < quant_produtos){
        sec_altera.innerHTML += `<div><p id="resultado">Qual a quantia e valor do produto ${cont + 1}?</p> <div>Quant:<input type="number" name="quant_prod${cont + 1}" id="quant_prod${cont + 1}"></div> <div>Valor:<input type="number" name="valor_prod${cont + 1}" id="valor_prod${cont + 1}"></div></div>`
        cont++
    }
    let botaoact = document.getElementById("Botaoaction")
    botaoact.innerHTML = '<div id="botaocall"><button onclick="desc_ali()" id="botcall">Calcular</button></div>'
}
}

function desc_ali(){
    let aviso = document.getElementById("aviso")

    let Quant_Valores = []

    let Quant_Total = 0
    let Valor_Total = 0
    
    let cont2 = 0
    while(cont2 < valorglobalquantia){
        let Quant_provisoria = document.getElementById(`quant_prod${cont2 + 1}`).value

        let Valor_provisorio = document.getElementById(`valor_prod${cont2 + 1}`).value
        if((Quant_provisoria === "" || Quant_provisoria <= 0) || (Valor_provisorio === "" || Valor_provisorio <= 0)){
            aviso.innerHTML = "Coloque a quantia/valor aonde falta!"
            Quant_Valores = []
            break
        }else{
            Quant_Valores.push([Quant_provisoria, Valor_provisorio])
        }
        
        cont2++
    }

    cont2 = 0
    while(cont2 < Quant_Valores.length){
        Quant_Total += parseFloat(Quant_Valores[cont2][0])
        Valor_Total += parseFloat(Quant_Valores[cont2][0] * Quant_Valores[cont2][1])

        cont2++
    }

    let desconto = 0
    let sacos_extras = 0
    if(Quant_Total < 7){
        aviso.innerHTML = "Quantia insuficiente para bonificar ou dar desconto"
    }else if(Quant_Total >= 7 && Quant_Total < 14){
        desconto = 0
        sacos_extras = 1
    }else if(Quant_Total >= 14 && Quant_Total < 20){
        desconto = 6
        sacos_extras = 2
    }else if(Quant_Total >= 20 && Quant_Total < 30){
        desconto = 6
        sacos_extras = 3
    }else if(Quant_Total >= 30 && Quant_Total < 40){
        desconto = 12
        sacos_extras = 4
    }else if(Quant_Total >= 40){
        desconto = 12
        sacos_extras = 7
    }

    let Valor_a_ser_pago = 0

    Valor_a_ser_pago = ((Valor_Total * (1 - (desconto / 100))) - (((Valor_Total * (1 - (desconto / 100))) / Quant_Total) * sacos_extras)).toFixed(2)
    Desconto_total = ((1 - (Valor_a_ser_pago / Valor_Total)) * 100).toFixed(2)

    let desconto_unidade = []

    cont2 = 0
    while(cont2 < Quant_Valores.length){
        let valor = parseFloat(Quant_Valores[cont2][1])
        desconto_unidade.push([(valor * (1 - (Desconto_total / 100))).toFixed(2)])
        console.log(Desconto_total)
        cont2++
    }

    let = local_descontoTxt = document.getElementById("resultado_desconto")
    local_descontoTxt.innerHTML += '<h3>Desconto:</h3>'
    local_descontoTxt.innerHTML += `<div><p id="resultado">O Valor total a ser pago saiu de: R$ ${Valor_Total.toFixed(2)} para: R$ ${Valor_a_ser_pago}</p><p id="resultado">O Desconto total foi de: ${Desconto_total}%</p></div>`
    cont2 = 0
    while(cont2 < Quant_Valores.length){
        local_descontoTxt.innerHTML += `<div><p id="resultado">O Valor por unidade do produto ${cont2 + 1} sai a: R$ ${desconto_unidade[cont2]}</p></div>`
        cont2++
    }
   
}