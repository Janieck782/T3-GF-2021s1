
//Declaracion de automata AFD
class automataAFD {
    constructor(k, s, g, f) {
        this.k = []; //estados
        this.s = []; //alfabeto
        this.g = []; //caminos inputs
        this.f = []; //finales
    }
}

//Declaracion de automata AP
class automataAP {
    constructor(k, s, g, f) {
        this.k = []; //estados
        this.s = []; //alfabeto
        this.g = []; //caminos inputs
        this.f = []; //finales
    }
}

//Se crean los automatas 
automata1 = new automataAFD;

automataP1 = new automataAP;
automataP2 = new automataAP;

//variable
tipoA = 0;
alfabeto = [];

//Constantes HTML
const content = document.querySelector("#Automatas");

const contentAlf = document.querySelector("#alfZone");
const content1 = document.querySelector("#contenedor--p1");
const content2 = document.querySelector("#contenedor--p2");


//Logs
var storage = new plog.storages.LocalStorage({
    maxSize: 200
})
plog.useStorage(storage);
var events = storage.getEvents();
console.log(events);//NO borrar

//Función para descargar archivo
const DescargarLogs = () => {
    var aux = "";
    events = storage.getEvents();
    for (var i = 0; i < events.length - 1; i++) {
        aux = aux + JSON.stringify(events[i]) + "\n";
    }
    var element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:events/plain;charset=utf-8," + encodeURIComponent(aux)
    );
    element.setAttribute("download", "log.txt");
    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

//Desactivar boton
function desactiva_enlace(enlace) {
    enlace.disabled = 'disabled';
}

//Funciones 
function iniciarALF(enlace){
    enlace.disabled = 'disabled';
    generarALF(contentAlf);

}

function iniciarAFD(zone){
automata1.s = alfabeto;
var contenedor1 = document.createElement("div");
contenedor1.setAttribute("class","contenedor");
zone.appendChild(contenedor1);
generarEstados(contenedor1,1);
}

function iniciarAP(zone){
    automataP1.s = alfabeto;
    automataP2.s = alfabeto;
    zone.setAttribute("class","AutomatasAP");    
    var contenedor1 = document.createElement("div");
    var contenedor2 = document.createElement("div");
    contenedor1.setAttribute("class","contenedor");
    contenedor2.setAttribute("class","contenedor");
    contenedor1.setAttribute("id","contenedor-p1");
    contenedor2.setAttribute("id","contenedor-p2");
    zone.appendChild(contenedor1);
    zone.appendChild(contenedor2);
    generarEstados(contenedor1,1);
    generarEstados(contenedor2,2);
}

function iniciarAutomata(enlace){
    enlace.disabled = 'disabled';
    guardarALF();
    tipo = tipoAutomata();
    tipoA = tipo;
    if(tipo == 1){

        iniciarAFD(content);
    }
    if(tipo == 2){
        iniciarAP(content);
    }
}

function iniciarFormulario(enlace,id){
    enlace.disabled = 'disabled';
    guardarEstados(id);
    if(tipoA == 1){
        const content = document.querySelector("#Automatas");
    }
    if(tipoA == 2){
        
    }
    if(tipoA == 1){
        generarFormularioAFD(content,1);
    }
    if(tipoA == 2){
        if(id==1){
            generarFormularioAP(content1,1);
        }
        if(id==2){
            generarFormularioAP(content2,2);
        }
    }
}

function iniciarFinal(enlace){
    guardarFormularioAFD(1);
    if(guardarFormularioAFD(1) == true){
        enlace.disabled = 'disabled';
        generarFinales();
    }

}

function tipoAutomata(){
    let tipo = document.getElementById("tipo").value;
    if(tipo == 1){
        plog.info("Se inicio un AFD");
        return 1;
    }
    if(tipo == 2){
        plog.info("Se iniciaron dos AP");
        return 2;
    }
}

function guardarALF(){
    let largo = document.getElementById("alfabeto").value;
    if(largo > 10){
        largo = 10;
    }
    if(largo < 1){
        largo = 1;
    }

    let letra = String.fromCharCode(97);
    var texto = document.createElement("h4")
    texto.innerHTML = "El alfabeto es:"
    for(let i = 0; i < largo; i++){
        letra = String.fromCharCode(97+i);
        alfabeto.push(letra);
        texto.innerHTML += `, ${letra}`;
    }
    contentAlf.appendChild(texto);
}

function guardarEstados(id){
    var texto = document.createElement("h4");
    texto.innerHTML = "Los estados son:"
    let Qs = [];
    let cantidad = document.getElementById(`contQ-${id}`).value;
        for(let i = 0; i < cantidad ; i++){
            Qs.push(`q${i}`)
            texto.innerHTML += `,q${i} ` 
        }
        if(tipoA == 1){
            automata1.k = Qs;
        }
        if(tipoA == 2){
            if(id == 1){
                automataP1.k = Qs;
            }
            if(id == 2){
                automataP2.k = Qs;
            }
        }
}

function guardarFinales(){
    let finales = [];
    for(let i = 0 ; i < automata1.k.length; i++){
        let aux = document.getElementById(`q-${i}`).checked;
        if (aux == true) {
            finales.push(`q${i}`);
    }
}
if(finales.length == 0){
    alert("Debe haber ingresado al menos un valor");

    return false;
}else{
    automata1.f = finales;
    return true;
}
}

function guardarFormularioAFD(id){
    let caminos = [];
    cont= 1;
    for(let i = 0; i < automata1.k.length; i++){
        for(let j = 0; j < automata1.s.length; j++){
            let valor = document.getElementById(`g-${id}-${i}-${j}`).value;
            if(verificarFormularioAFD(valor)==true){
                caminos.push(valor);
            }
            if(verificarFormularioAFD(valor)==false){
                caminos=[];
                alert(`El campo N°${cont} contiene un valor no valido`);
                return false;
            }
            cont++;
        }
    }
    automata1.g = caminos;
    return true;
}

function generarALF(zone){
    var contenedor1 = document.createElement("div");
    contentAlf.setAttribute("class","contenedor");
    var texto = document.createElement("h4");
    texto.innerHTML = `2.Ingrese largo del alfabeto:`; //formato linea
    var inputAlf = document.createElement("input");
    var btnAlf = document.createElement("button");
    btnAlf.setAttribute("onclick","iniciarAutomata(this)")
    inputAlf.setAttribute("id","alfabeto");
    inputAlf.setAttribute("type","number");
    inputAlf.setAttribute("min","1");
    inputAlf.setAttribute("max","10");
    inputAlf.setAttribute("value","2");
    btnAlf.innerHTML = "Continuar";
    contenedor1.appendChild(texto);
    contenedor1.appendChild(inputAlf);
    contenedor1.appendChild(btnAlf);
    zone.appendChild(contenedor1)
}

function generarEstados(zone,id){
    var texto = document.createElement("h4");
    texto.innerHTML = "3.Ingrese cantidad de estados:"
    var inputQ = document.createElement("input");
    inputQ.setAttribute("id",`contQ-${id}`);
    inputQ.setAttribute("type","number");
    inputQ.setAttribute("min","1");
    inputQ.setAttribute("max","10");
    inputQ.setAttribute("value","2");
    var btn = document.createElement("button");
    btn.setAttribute("onclick",`iniciarFormulario(this,${id})`)
    btn.innerHTML= "Continuar"
    zone.appendChild(texto);
    zone.appendChild(inputQ);
    zone.appendChild(btn);
    

}

function generarFormularioAP(zone,id) {
    var content = document.createElement("div");
    content.setAttribute("class","contenedor")
    var texto = document.createElement("h4");
    texto.innerHTML = "4.Ingrese el estado a recorrer de llegada por cada camino: ";
    content.appendChild(texto);




    zone.appendChild(content);
}

function generarFormularioAFD(zone,id) {
    var contentF = document.createElement("div");
    var hue = document.createElement("div");
    hue.setAttribute("class","contenedor")
    
    var texto = document.createElement("h4");
    
    
    texto.innerHTML = "4.Ingrese el estado a recorrer de llegada por cada camino: ";
    contentF.appendChild(texto);
    var btn = document.createElement("button")
    btn.innerHTML = "Continuar"
    btn.setAttribute("onclick","iniciarFinal(this)")
    let contador = 1;

    for(let i = 0; i < automata1.k.length; i++){
        for(let j = 0; j < automata1.s.length; j++){
            var salto = document.createElement("br");
            let letra = (String.fromCharCode(97 + j));
            var texto = document.createElement("p");
            texto.innerHTML = `${contador}.(q${i},${letra}):`;
            let inputG = document.createElement("input")
            inputG.type = "text"
            inputG.setAttribute("id",`g-${id}-${i}-${j}`);
            if (i != automata1.s.length - 1) {
                inputG.setAttribute('value', `q${i+1}`);
            } else {
                inputG.setAttribute('value', `q0`);
            }
            contentF.appendChild(texto);
            contentF.appendChild(inputG);
            contentF.appendChild(salto);
            
            contador++;
        }
    }

    hue.appendChild(contentF);
    hue.appendChild(btn);
    zone.appendChild(hue);
}

function generarFinales(){
    //const content = document.querySelector("#Automatas");
    var texto1 = document.createElement("h4"); //crea linea de texto
    texto1.innerHTML = `5.Seleccione los estados finales.`; //formato linea+
    var btn = document.createElement("button");
    btn.innerHTML = "Continuar";
    btn.setAttribute("onclick","imprimirImagen(this)")
     var contenedor = document.createElement("div");
     contenedor.appendChild(texto1);
     contenedor.setAttribute("class","contenedor");
        for(let i = 0 ; i < automata1.k.length; i++){
            var salto = document.createElement("br");
            var inp = document.createElement("input");
            var p = document.createElement("p");
            p.innerHTML = `Q${i}:`;
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", `q-${i}`);
            contenedor.appendChild(p);
            contenedor.appendChild(inp);
            contenedor.appendChild(salto);
            if (i + 1 == automata1.k.length) {
                inp.setAttribute("checked", "true");
            }
        }
        contenedor.appendChild(btn)
     content.appendChild(contenedor);
    }

function verificarFormularioAFD(aux){
    for(let i = 0; i < automata1.k.length ; i++){
        if(automata1.k[i] == aux ){
            return true;
        }
    }
    return false;
}

function imprimirImagen(enlace){

    if(guardarFinales()==true){
        enlace.disabled = 'disabled';

        var contenedor = document.createElement("div");
        contenedor.setAttribute("class","contenedor")
        content.appendChild(contenedor);
        imprimirAutomataAFD(automata1,contenedor);

    }

}
 
function imprimirAutomataAFD(automatas,zonaImg){


    var img = document.createElement("img");
    let salto = "%20";
    let espacio = "%0A%09"
    let espacio1 = "%20%5Bshape%3Ddoublecircle%5D%3B"
    let graph = `digraph{ poi -> q0 [color=red,style=dotted] ${salto}`;
    let o = 0;
   
        if (automatas.k.length == 1) {
            for (let p = 0; p < automatas.s.length; p++) { //alfabeto
                graph += `q0 -> q0 [label="${automatas.s[p]}"] ${salto} `;
            }

        } else {
            for (let i = 0; i < automatas.k.length; i++) { //estados
                for (let j = 0; j < automatas.s.length; j++) { //alfabeto
                    graph += `${automatas.k[i]} -> ${automatas.g[o]} [label="${automatas.s[j]}"] ${salto} `;
                    o++;
                }
            }
        }
    

    for (let q = 0; q < automatas.f.length; q++) { //final
        graph += ` ${espacio} ${automatas.f[q]} ${espacio1}${salto}`
    }
    graph += "poi[shape=point]}";




    img.setAttribute("src", `https://quickchart.io/graphviz?format=png&width=auto&height=auto&graph=${graph}`);
    zonaImg.appendChild(img);
}
