//COLORES: 

//BOTONES :
let botonPlayerVSPlayer = document.getElementById("btnPlayer");
let botonCPU = document.getElementById("btnCPU");
let divBtnEmpieza = document.getElementById("divBtnEmpieza");
let btnEmpiezaPlayer = document.getElementById("btnEmpiezaPlayer");
let btnEmpiezaCPU = document.getElementById("btnEmpiezaCPU");


botonPlayerVSPlayer.addEventListener("click", function(evt){
    funcionPrincipalBtn(evt);  
}, false)

botonCPU.addEventListener("click", function(evt){
    funcionPrincipalBtn(evt);
}, false)
 
//FUNCIONES DE LOS CASILLEROS :

let arrayCasilleros = document.getElementsByClassName("divFichas")
let flag1;          //boton Player o CPU
let flag2 = 1;      //primer o segundo movimiento
let flag3 = 1;      //para que no se agregue mas de una vez la funcion a los casilleros(js:43)
let colorCPU = "null";       //el color de las fichas de CPU
let finMovimiento;   //si ya termino de mover player (para saber si mueve CPU al final de cada click del player)
let turno = "Blanco";        //turno (siempre inicia Blanco)

//fichas:
let primerCasillero;
let srcprimerCasillero;
let segundoCasillero;
let srcsegundoCasillero;

//fichas con posibles movimientos para comer:
let arrayPrimerDivComer;
let arraySegundoDivComer;


function funcionPrincipalBtn(evt){
    if(evt.path[0].id == "btnPlayer"){
        //reiniciarTablero();
        flag1 = 1;
        divBtnEmpieza.classList.remove("mostrar");
        divBtnEmpieza.classList.add("hidden");

    }else if(evt.path[0].id == "btnCPU"){
        flag1 = 2;
        divBtnEmpieza.classList.remove("hidden");
        divBtnEmpieza.classList.add("mostrar");
        
        btnEmpiezaPlayer.addEventListener("click", function(){
            //reiniciarTablero();
            colorCPU = "Negro";
        }, false)
        btnEmpiezaCPU.addEventListener("click", function(){
            //reiniciarTablero();
            colorCPU = "Blanco";
            movAutomaticoCPU(colorCPU);

        }, false)
    }
    
    if(flag3 == 1){
        for(i=0; i<arrayCasilleros.length; i++){
            arrayCasilleros[i].addEventListener("click", function(evt){
                funcionPrincipalCasilleros(evt);
            }, false)
        }
        flag3 = 0;
    }
}

function reiniciarTablero(){
    for(i=0; i<arrayCasilleros.length; i++){
        let nroCasilla = arrayCasilleros[i].id.split("d")[1];
        let fichaOrigenCasilla = arrayCasilleros[i].classList[0];
            if(nroCasilla <=15){
                arrayCasilleros[i].classList.replace(fichaOrigenCasilla, "divNegro")

            }else if(nroCasilla >15 && nroCasilla <=35){
                arrayCasilleros[i].classList.replace(fichaOrigenCasilla, "divTransparente")

            }else if(nroCasilla > 36){
                arrayCasilleros[i].classList.replace(fichaOrigenCasilla, "divBlanco")
            }
    }
    turno = "Blanco";
}
function funcionPrincipalCasilleros(evt){ //para ambos botones (contra player y contra CPU)
        finMovimiento = false;
        let casilleroClick = evt.path[1];
        let casillerosDelTurno = divsDelTurno(turno); //VALIDADO
        let poderComer = posibilidadComer(casillerosDelTurno);
            if(poderComer.length > 0){  
                if(flag2 == 1){
                    primerCasillero = casilleroClick;
                        if(primerCasillero.classList[0] == "div" + turno || primerCasillero.classList[0] == "divDama" + turno)
                            for(i=0; i<poderComer.length; i++){
                                if(primerCasillero == poderComer[i]){
                                    cambiarBordesNegroRosa(primerCasillero);
                                    cambiarOpacidad(primerCasillero);
                                    flag2 = 2;
                                }
                            }
                }else if(flag2 == 2){
                    segundoCasillero = casilleroClick;
                    if(primerCasillero == segundoCasillero){
                        cambiarBordesRosaNegro(primerCasillero);
                        resetearOpacidad();
                        flag2 = 1;
                    }else{
                        let comprobar;
                            if(turno == "Negro"){
                                enemigo = "Blanco";    
                            }else if(turno == "Blanco"){
                                enemigo = "Negro";
                            }
                            comprobar = segundoCasilleroTransparente(segundoCasillero, primerCasillero, enemigo);

                        if(comprobar == true){
                            cambiarBordesRosaNegro(primerCasillero)
                            moverFichaComer(primerCasillero, segundoCasillero);
                            resetearOpacidad();
                            cambiarDamas();
                            flag2 = 1;
                            let casillerosDelTurno2 = divsDelTurno(turno)
                            let poderComer2 = posibilidadComer(casillerosDelTurno2);
                                if(poderComer2 == false){
                                    cambiarTurno();
                                    finMovimiento = true;
                                }
                        }
                    }
                }
            }else if(poderComer == false){
                if(flag2 == 1){
                    primerCasillero = casilleroClick;
                    if(primerCasillero.classList[0] == "div" + turno || primerCasillero.classList[0] == "divDama" + turno){//VALIDADO
                        validacionComun = validarPosibilidadDeMoverComun(primerCasillero, turno);
                        if(validacionComun.length>0){
                            cambiarBordesNegroRosa(primerCasillero);
                            cambiarOpacidad(primerCasillero);
                            flag2 = 2;
                        }  
                    }
                }else if(flag2 == 2){
                    segundoCasillero = casilleroClick;
                        if(primerCasillero == segundoCasillero){
                            cambiarBordesRosaNegro(primerCasillero);
                            resetearOpacidad();

                            flag2 = 1;
                        }else if(segundoCasillero.classList[0] == "divTransparente"){
                        let validacionFinalComun = validarPosibilidadDeMoverComun(primerCasillero, turno);
                        flag6 = 0;
                        console.log(validacionFinalComun)
                            for(e=0; e<validacionFinalComun.length; e++){
                                if(segundoCasillero == validacionFinalComun[e]){
                                    flag6 = 1;
                                }
                            }
                            if(flag6 == 1){
                                moverFichaComun(primerCasillero, segundoCasillero); 
                                cambiarDamas();
                                cambiarBordesNegroRosa(segundoCasillero)
                                resetearOpacidad();
                                cambiarTurno();
                                flag2 = 1;
                                finMovimiento = true;
                            }
                        }
                }
            }
    if(finMovimiento == true && flag1 == 2){
        movAutomaticoCPU(colorCPU);
    }
}

//funciones para COMER
function posibilidadComer(casillerosValidar){
    let arrayCasillerosQuePuedenComer = [];
        for(i=0; i<casillerosValidar.length; i++){
            validacionFinal = validarCasillero(casillerosValidar[i]);
            if(validacionFinal != "vacio"){
                arrayCasillerosQuePuedenComer.push(casillerosValidar[i]);
            }
        }
        if(arrayCasillerosQuePuedenComer.length > 0){
            return arrayCasillerosQuePuedenComer;
        }else if(arrayCasillerosQuePuedenComer == 0){
            return false;
        }
}

function validarCasillero(casilleroValidar){
    fichaValidar = casilleroValidar.classList[0].split("v")[1];
    let validacion;
    
        if(turno == "Blanco"){
            if(fichaValidar == "Blanco"){
                validacion = buscarCasilleroSegundoYMedio(casilleroValidar, -1, -1, +1, -1, "Negro");
            }else if(fichaValidar == "DamaBlanco"){
                validacion = buscarCasilleroSegundoYMedio(casilleroValidar, +1, -1, +1, -1, "Negro");
            }
        }else if(turno == "Negro"){
            }if(fichaValidar == "Negro"){
                validacion = buscarCasilleroSegundoYMedio(casilleroValidar, +1, +1, +1, -1, "Blanco");
            }else if(fichaValidar == "DamaNegro"){
                validacion = buscarCasilleroSegundoYMedio(casilleroValidar, +1, -1, +1, -1, "Blanco");
            }
    return validacion;
}

function buscarCasilleroSegundoYMedio(fichaValidar, sumaFila1, sumaFila2, sumaCol1, sumaCol2, enemigo){
//paso 1: conseguir la fila y columa del primer casillero (fichaValidar)
    let filaValidar = parseInt(fichaValidar.classList[3].split("a")[1]);
    let colValidar = parseInt(fichaValidar.classList[2].split("l")[1]);
    colPrueba = fichaValidar.classList[2]

//paso 2: conseguir coleccion de casilleros en la fila de filaValidar + sumaFila1, y +sumaFila2
    let filaEnemigo1 = document.getElementsByClassName("fila" + (filaValidar + sumaFila1));
    let filaEnemigo2 = document.getElementsByClassName("fila" + (filaValidar + sumaFila2));
    let arrayFilasEnemigo = [];
        for(e=0; e<filaEnemigo1.length;e++){
            arrayFilasEnemigo.push(filaEnemigo1[e]);
        }
        if(filaEnemigo1 !=filaEnemigo2){
            for(e=0; e<filaEnemigo2.length;e++){
                arrayFilasEnemigo.push(filaEnemigo2[e]);
            }
        }//VALIDADO :D
//paso 3 : buscar columnas de cada ficha del arrayFilasEnemigo y guardar casilleros del array con colFilasEnemigo == colValidar + sumaCol1 || colFilasEnemigo == colValidar + sumaCol2
    let casillerosEnemigos = [];
    let validacionSegundoCasillero = "vacio";
    for(e=0; e<arrayFilasEnemigo.length; e++){
        let colFilasEnemigo = arrayFilasEnemigo[e].classList[2].split("l")[1];
        
        if(colFilasEnemigo == colValidar + sumaCol1 || colFilasEnemigo == colValidar + sumaCol2){
            if(arrayFilasEnemigo[e].classList[0].split("v")[1] == enemigo || arrayFilasEnemigo[e].classList[0].split("v")[1] == "Dama" + enemigo){
                casillerosEnemigos.push(arrayFilasEnemigo[e]);
                
            }
        }
        
    }//VALIDADO :D
    
        if(casillerosEnemigos.length > 0){
            validacionSegundoCasillero = validarSegundoCasillero(fichaValidar, filaValidar, colValidar, casillerosEnemigos, enemigo);
}
return validacionSegundoCasillero;
}

function validarSegundoCasillero(fichaValidar, filaPrimer, colPrimer, casillerosEnemigos, enemigo){
    let flag4 = 0;
    let segundosCaslleros = [];
    for(e=0; e<casillerosEnemigos.length; e++){ //un gran for para conseguir el segundo casillero (que tiene que ser transparente) a partir de cada enemigo
        let filaDelMedio = parseInt(casillerosEnemigos[e].classList[3].split("a")[1]);
        let colDelMedio = parseInt(casillerosEnemigos[e].classList[2].split("l")[1]);
        let avanceEnFilas = filaDelMedio - filaPrimer;
        let avanceEnCol = colDelMedio - colPrimer;
    //sumarle el avance en filas y col a la fila y col del casillero enemigo para conseguir el segundo casillero:
        let colSegundo = colDelMedio + avanceEnCol;
        let filaSegundo = filaDelMedio + avanceEnFilas; //VALIDADO :D

        let casillerosConFilaSegundo = document.getElementsByClassName("fila" + filaSegundo);
            for(a=0; a<casillerosConFilaSegundo.length; a++){
                colDeFilaSegundo = casillerosConFilaSegundo[a].classList[2].split("l")[1];
                    if(colDeFilaSegundo == colSegundo){
                        if(casillerosConFilaSegundo[a].classList[0] == "divTransparente"){
                            flag4 = 1;
                            segundosCaslleros.push(casillerosConFilaSegundo[a]);
                        }
                    }
            }
    }
    if(flag4 == 1){
        
        return segundosCaslleros;

    }else if(flag4 == 0){
        
        return "vacio";
    }
}

function segundoCasilleroTransparente(segundoCasillero, primerCasillero, enemigo){
    if(segundoCasillero.classList[0] == "divTransparente"){
        let filaSegundo = parseInt(segundoCasillero.classList[3].split("a")[1]);
        let colSegundo = parseInt(segundoCasillero.classList[2].split("l")[1]);
        let filaPrimer = parseInt(primerCasillero.classList[3].split("a")[1]);
        let colPrimer = parseInt(primerCasillero.classList[2].split("l")[1]); //VALIDADO

        distanciaColMedioYSegundo = (colSegundo - colPrimer)/2;
        distanciaFilaMedioYSegundo = (filaSegundo - filaPrimer)/2;//VALIDADO
       
        return validarCasilleroDelMedio(distanciaColMedioYSegundo, distanciaFilaMedioYSegundo, filaPrimer, colPrimer, enemigo)

    }else{
        return false;
    }
}

function validarCasilleroDelMedio(distCol, distFila, filaPrimer, colPrimer, enemigo){//VALIDADO
    let filaDelMedio = document.getElementsByClassName("fila" + (filaPrimer + distFila));
    let flag5 = false;
    for(u=0; u<filaDelMedio.length; u++){
        colFilaDelMedio = parseInt(filaDelMedio[u].classList[2].split("l")[1]);
        if(colFilaDelMedio == colPrimer + distCol){
            
            if(filaDelMedio[u].classList[0] == "div" + enemigo || filaDelMedio[u].classList[0] == "divDama" + enemigo){
                flag5 = true;
            }
        }
    }
    if(flag5 == true){
        return true;
    }else if(flag5 == false){
        return false;//VALIDADO
    }
}

function moverFichaComer(primerCasillero, segundoCasillero){
    let casilleroDelMedio = conseguirCasilleroDelMedioParaComer(primerCasillero, segundoCasillero)
    let fichaPrimer = primerCasillero.classList[0].split("v")[1];
    let fichaMedio = casilleroDelMedio.classList[0].split("v")[1];



    cambiarClase(primerCasillero, fichaPrimer, "Transparente");
    cambiarClase(casilleroDelMedio, fichaMedio, "Transparente");
    cambiarClase(segundoCasillero, "Transparente", fichaPrimer);


}

function conseguirCasilleroDelMedioParaComer(primerCasillero, segundoCasillero){
    let casilleroDelMedio;
    let filaSegundo = parseInt(segundoCasillero.classList[3].split("a")[1]);
    let filaPrimer = parseInt(primerCasillero.classList[3].split("a")[1]);
    let colSegundo = parseInt(segundoCasillero.classList[2].split("l")[1]);
    let colPrimer = parseInt(primerCasillero.classList[2].split("l")[1]);  //VALIDADO
    
    distanciaFilaPrimerAMedio = (filaSegundo - filaPrimer)/2;
    distanciaColPrimerAMedio = (colSegundo - colPrimer)/2;
    let casillerosFilaDelMedio = document.getElementsByClassName("fila" + (filaPrimer + distanciaFilaPrimerAMedio));
     //VALIDADO
        for(a=0; a<casillerosFilaDelMedio.length; a++){
            colCasillerosFilaDelMedio = parseInt(casillerosFilaDelMedio[a].classList[2].split("l")[1]);
            
                if(colCasillerosFilaDelMedio == (colPrimer + distanciaColPrimerAMedio)){
                    casilleroDelMedio = casillerosFilaDelMedio[a];
                }
        }
    return casilleroDelMedio;
}
//funciones para fichas COMUNES
function validarPosibilidadDeMoverComun(primerCasillero){
    fichaPrimer = primerCasillero.classList[0].split("v")[1];
    let validacion;
        if(turno == "Blanco"){
            if(fichaPrimer == "Blanco"){
                validacion = validarSegundoCasilleroComun(primerCasillero, -1, -1, +1, -1, "Negro")
            }else if(fichaPrimer == "DamaBlanco"){
                validacion = validarSegundoCasilleroComun(primerCasillero, +1, -1, +1, -1, "Negro")
            }
        }else if(turno == "Negro"){
            if(fichaPrimer == "Negro"){
                validacion = validarSegundoCasilleroComun(primerCasillero, +1, +1, +1, -1, "Blanco")
            }else if(fichaPrimer == "DamaNegro"){
                validacion = validarSegundoCasilleroComun(primerCasillero, +1, -1, +1, -1, "Blanco")
            }
        }
    return validacion;
}

function validarSegundoCasilleroComun(primerCasillero, sumaFila1, sumaFila2, sumaCol1, sumaCol2, enemigo){
    //paso 1: conseguir la fila y columa del primer casillero (fichaValidar)
    let filaPrimer = parseInt(primerCasillero.classList[3].split("a")[1]);
    let colPrimer = parseInt(primerCasillero.classList[2].split("l")[1]);

//paso 2: conseguir coleccion de casilleros en la fila de filaValidar + sumaFila1, y +sumaFila2
    let filaVacia1 = document.getElementsByClassName("fila" + (filaPrimer + sumaFila1));
    let filaVacia2 = document.getElementsByClassName("fila" + (filaPrimer + sumaFila2));//VALIDADO

    let arrayFilasVacio = [];
        for(e=0; e<filaVacia1.length;e++){
            arrayFilasVacio.push(filaVacia1[e]);
        }
        if(filaVacia1 !=filaVacia2){
            for(e=0; e<filaVacia2.length;e++){
                arrayFilasVacio.push(filaVacia2[e]);
            }
        }//VALIDADO
        

    //paso 3 : buscar columnas de cada ficha del arrayFilasEnemigo y guardar casilleros del array con colFilasEnemigo == colValidar + sumaCol1 || colFilasEnemigo == colValidar + sumaCol2
    let casillerosVacios = [];
    let validacionSegundoCasillero = false;
    console.log("arrayFilasVacio")
    console.log(arrayFilasVacio)

    for(e=0; e<arrayFilasVacio.length; e++){
        
        let colFilasVacio = arrayFilasVacio[e].classList[2].split("l")[1];
            if(colFilasVacio == colPrimer + sumaCol1 || colFilasVacio == colPrimer + sumaCol2){
                if(arrayFilasVacio[e].classList[0].split("v")[1] == "Transparente"){
                    casillerosVacios.push(arrayFilasVacio[e]);
                    

                }
            }
}
return casillerosVacios;
}

function moverFichaComun(primerCasillero, segundoCasillero){
    let fichaPrimerCasillero = primerCasillero.classList[0].split("v")[1];
    let fichaSegundoCasillero = segundoCasillero.classList[0].split("v")[1];

    cambiarClase(primerCasillero, fichaPrimerCasillero, "Transparente");
    cambiarClase(segundoCasillero, "Transparente", fichaPrimerCasillero);
} 


//funciones para fichas CPU

function movAutomaticoCPU(colorCPU){
    casillerosDelColorCPU = divsDelTurno(colorCPU);
    poderComer = posibilidadComer(divsDelTurno(colorCPU));

    if(poderComer.length > 0){
            primerCasillero = buscarCasilleroAleatorio(poderComer);
            validarCasilleroParaComer = validarCasillero(primerCasillero)
            console.log("validarCasilleroParaComer")
            console.log(validarCasilleroParaComer)

            segundoCasillero = buscarCasilleroAleatorio(validarCasilleroParaComer)
            let casilleroDelMedio;
            let fichaDelMedio;
            let fichaPrimero = primerCasillero.classList[0].split("v")[1];
            let colPrimerCasillero = primerCasillero.classList[2].split("l")[1];
            let filaPrimerCasillero = primerCasillero.classList[3].split("a")[1];

            let fichaSegundo = segundoCasillero.classList[0].split("v")[1];
            let colSegundoCasillero = segundoCasillero.classList[2].split("l")[1];
            let filaSegundoCasillero = segundoCasillero.classList[3].split("a")[1];

            let filaDelMedio = parseInt(filaPrimerCasillero) + parseInt(filaSegundoCasillero - filaPrimerCasillero) / 2;
            let colDelMedio = parseInt(colPrimerCasillero) + (colSegundoCasillero - colPrimerCasillero) / 2;

        let casillerosFilaDelMedio = document.getElementsByClassName("fila" + filaDelMedio);
        for(i=0; i<casillerosFilaDelMedio.length; i++){
            colDeCasilleroI = casillerosFilaDelMedio[i].classList[2].split("l")[1];
            if(colDeCasilleroI == colDelMedio){
                casilleroDelMedio = casillerosFilaDelMedio[i];
                fichaDelMedio = casilleroDelMedio.classList[0].split("v")[1];

            }
        }
        const myTimeoutPrimero = setTimeout(function(){cambiarClase(primerCasillero, fichaPrimero, "Transparente")}, 500);
        const myTimeoutSegundo = setTimeout(function(){cambiarClase(segundoCasillero, fichaSegundo, fichaPrimero)}, 700);
        const myTimeoutDelMedio = setTimeout(function(){cambiarClase(casilleroDelMedio, fichaDelMedio, "Transparente")}, 1200);

    }else if(poderComer == false){
        posiblesPrimerosCasilleros = validarMoverComunCPU(casillerosDelColorCPU);
        if(posiblesPrimerosCasilleros.length > 0){
            primerCasillero = buscarCasilleroAleatorio(posiblesPrimerosCasilleros);
            let fichaPrimero = primerCasillero.classList[0].split("v")[1];

            posiblesSegundosCasilleros = validarPosibilidadDeMoverComun(primerCasillero);
            segundoCasillero = buscarCasilleroAleatorio(posiblesSegundosCasilleros);
            let fichaSegundo = segundoCasillero.classList[0].split("v")[1];

            const myTimeoutPrimero = setTimeout(function(){cambiarClase(primerCasillero, fichaPrimero, "Transparente")}, 600);
            const myTimeoutSegundo = setTimeout(function(){cambiarClase(segundoCasillero, fichaSegundo, fichaPrimero)}, 800);


        }else {
            pierde(colorCPU);
        }

    }

    cambiarTurno();
}

function validarMoverComunCPU(arrayCasillerosTurno){
    let validacion;
    let arrayFichasQueSeMueven = [];
    for(b = 0; b<arrayCasillerosTurno.length; b++){
        fichaPrimer = arrayCasillerosTurno[b].classList[0].split("v")[1];
        
            if(turno == "Blanco"){
                if(fichaPrimer == "Blanco"){
                    validacion = validarSegundoCasilleroComun(arrayCasillerosTurno[b], -1, -1, +1, -1, "Negro");
                    if(validacion.length > 0){
                        arrayFichasQueSeMueven.push(arrayCasillerosTurno[b])
                    }
                }else if(fichaPrimer == "DamaBlanco"){
                    validacion = validarSegundoCasilleroComun(arrayCasillerosTurno[b], +1, -1, +1, -1, "Negro");
                    if(validacion.length > 0){
                        arrayFichasQueSeMueven.push(arrayCasillerosTurno[b])
                    }
                }
            }else if(turno == "Negro"){
                if(fichaPrimer == "Negro"){
                    validacion = validarSegundoCasilleroComun(arrayCasillerosTurno[b], +1, +1, +1, -1, "Blanco");
                    
                    if(validacion.length > 0){
                        arrayFichasQueSeMueven.push(arrayCasillerosTurno[b])
                    }
                }else if(fichaPrimer == "DamaNegro"){
                    validacion = validarSegundoCasilleroComun(arrayCasillerosTurno[b], +1, -1, +1, -1, "Blanco");
                    if(validacion.length > 0){
                        arrayFichasQueSeMueven.push(arrayCasillerosTurno[b])
                    }
                }
            }
    
    }


    return arrayFichasQueSeMueven;
}

//perder o ganar

function pierde(colorFichas){

}

//SUB-FUNCIONES
function divsDelTurno(turno){ //VALIDADO
    let casilleros1 = document.getElementsByClassName("div" + turno);
    let casilleros2 = document.getElementsByClassName("divDama" + turno);
    let arrayCasillerosTurno = [];
        for(i=0; i<casilleros1.length; i++){
            arrayCasillerosTurno.push(casilleros1[i])
        }
        for(i=0; i<casilleros2.length; i++){
            arrayCasillerosTurno.push(casilleros2[i])
        }
return arrayCasillerosTurno;
}
function cambiarBordesNegroRosa(casilleroClick){
        
    for(i=0; i<arrayCasilleros.length; i++){
        arrayCasilleros[i].style.borderColor = "black";
    }
    casilleroClick.style.borderColor = "pink";
}
function cambiarBordesRosaNegro(divClick){
    divClick.style.borderColor = "black";
}  
function cambiarTurno(){
    if(turno == "Blanco"){
        turno = "Negro";
    }else if(turno == "Negro"){
        turno = "Blanco";
    }
}
function cambiarDamas(){
    if(turno == "Blanco"){
        let divFila1 = document.getElementsByClassName("fila1");
            for(i=0; i<divFila1.length; i++){
                if(divFila1[i].classList[0] == "divBlanco"){
                    divFila1[i].classList.replace("divBlanco", "divDamaBlanco");
                }
            }
    }else if(turno == "Negro"){
        let divFila10 = document.getElementsByClassName("fila10");
            for(i=0; i<divFila10.length; i++){
                if(divFila10[i].classList[0] == "divNegro"){
                    divFila10[i].classList.replace("divNegro", "divDamaNegro");
                }
            }
    }
}
function cambiarClase(casillero, fichaOrigen, fichaFinal){
    casillero.classList.replace("div" + fichaOrigen, "div" + fichaFinal);
}
function cambiarOpacidad(casillero){
    for(i=0; i<arrayCasilleros.length; i++){
        arrayCasilleros[i].classList.remove("sinOpacidad");
        arrayCasilleros[i].classList.add("conOpacidad");
    }
    casillero.classList.add("sinOpacidad");
}
function resetearOpacidad(){
    for(i=0; i<arrayCasilleros.length; i++){
        arrayCasilleros[i].classList.remove("conOpacidad");
        arrayCasilleros[i].classList.add("sinOpacidad");
    }
}
function buscarCasilleroAleatorio(listaCasilleros){
    let random = Math.random();
    random = Math.trunc((random * parseInt(listaCasilleros.length)));
    console.log("random")
    console.log(random)

    console.log("listaCasilleros.length")
    console.log(listaCasilleros.length)


    return listaCasilleros[random];
}