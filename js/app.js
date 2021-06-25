
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
const content = document.querySelector("#Automatas")

const contentAlf = document.querySelector("#alfZone")


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
    let Qs = [];
    let cantidad = document.getElementById(`contQ-${id}`).value;
    console.log(cantidad);
        for(let i = 0; i < cantidad ; i++){
            Qs.push(`q${i}`)
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