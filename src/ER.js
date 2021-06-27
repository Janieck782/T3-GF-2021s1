//Se crea la clase autómata
class automata {
    constructor(k, s, g, label, f, afd) {
        this.k = ["q0","q1","q2","q3"]; //estados
        this.s = ["a","b"]; //alfabeto
        this.g = ["q1","q1","q2","q3","q2","q1","q3","q3"]; //caminos inputs
        this.label = ["a","b","a","b","a","b","a","b"]
        this.f = ["q2","q3"]; //finales
        this.afd = true; //tipo afd
    }
}

let automata1 = new automata; //Se crea una variable autómata

console.log("Automata inicial");
console.table(automata1); //Se comprueba que todo funcione correctamente

//Función que retorna una matriz con caminos
function tabla_caminos(automatas) {
    var aux = [];
    var sum = 0;

    for (let i = 0; i < automatas.k.length; i++) { //Se genera la tabla
        aux[i] = [];
        for (let j = 0; j < automatas.s.length; j++) {
            aux[i][j] = automatas.g[sum];
            sum++;
        }
    }

    return aux;
}

function ver_final(estado, finales) {
    for(let i = 0; i < finales.length; i++) {
        if(estado == finales[i]) {
            return true;
        }
    }
    return false;
}


function fin(automatas, tabla) {
    automatas.k.push("f");
    var newCamino = [];

    //Verifica que el estado sea final y lo dirige al nuevo estado "f"
    for(let i = 0; i < automatas.k.length; i++) {
        var aux = ver_final(automatas.k[i], automatas.f)

        if(aux == true) {
            var cont = 0;

            for(let a = 0; a < automatas.s.length; a++) {
                if(cont == 0) {
                    tabla[i][a] = "f";
                    cont++;
                } else {
                    tabla[i][a] = null;
                }
            }
        }
    }
    console.table(tabla);

    //La tabla se transforma en array
    for(let c = 0; c < tabla.length; c++) {
        for(let d = 0; d < tabla[c].length; d++) {
            newCamino.push(tabla[c][d]);
        }
    }

    automatas.g = [];
    automatas.g = JSON.parse( JSON.stringify( newCamino ) );

    for(let i = 0; i < automatas.g.length; i++) {
        if(automatas.g[i] == "f") {
            automatas.label[i] = "ε";
        }
        if(automatas.g[i] == null) {
            automatas.label[i] = null;
        }
    }
}

function ini(automatas) {
    var newEstados = ["i"]; //Se genera un array con el nuevo estado inicial
    var newCaminos = [];
    var newLabel = [];
    let i;
    var cont = 0;

    //Se rellenan los estados
    for(i = 0; i < automatas.k.length; i++) {
        var aux = automatas.k[i];
        newEstados.push(aux);
    }

    //Se crea el label euler
    for(i = 0; i < automatas.s.length; i++) {
        if(cont == 0) {
            newLabel.push("ε");
            cont++;
        } else {
            newLabel.push(null);
        }
    }

    for(i = 0; i < automatas.label.length; i++) {
        var aux = automatas.label[i];
        newLabel.push(aux);
    }
    //Fin de los euler

    cont = 0;

    //Nuevos caminos
    for(i = 0; i < automatas.s.length; i++) {
        if(cont == 0) {
            newCaminos.push("q0");
            cont++;
        } else {
            newCaminos.push(null);
        }
    }

    for(i = 0; i < automatas.g.length; i++) {
        aux = automatas.g[i];
        newCaminos.push(aux);
    }

    automatas.k = [];
    automatas.g = [];

    automatas.k = JSON.parse( JSON.stringify( newEstados ) );
    automatas.label = JSON.parse( JSON.stringify( newLabel ) );
    automatas.g = JSON.parse( JSON.stringify( newCaminos ) );
}


function Iniciar() {
    var tablaCamino = tabla_caminos(automata1);
    console.table(tablaCamino);

    fin(automata1, tablaCamino);
    console.table(automata1);

    ini(automata1);
    console.table(automata1);
}

// function imprimirImagen(automatas, zonaImg) { // Funcion que imprime automatas sus parametros son un automata y un contenedor con direccion HTML

//     var img = document.createElement("img");
//     let salto = "%20";
//     let espacio = "%0A%09"
//     let espacio1 = "%20%5Bshape%3Ddoublecircle%5D%3B"
//     let graph = `digraph{ poi -> q0 [color=red,style=dotted] ${salto}`;
//     let o = 0;
//     let esAfd = automatas.afd;



//     if (esAfd == true) {
//         if (automatas.k.length == 1) {
//             for (let p = 0; p < automatas.s.length; p++) { //alfabeto
//                 graph += `q0 -> q0 [label="${automatas.s[p]}"] ${salto} `;
//             }

//         } else {
//             for (let i = 0; i < automatas.k.length; i++) { //estados
//                 for (let j = 0; j < automatas.s.length; j++) { //alfabeto
//                     graph += `${automatas.k[i]} -> ${automatas.g[o]} [label="${automatas.s[j]}"] ${salto} `;
//                     o++;
//                 }
//             }
//         }
//     }

//     if (esAfd == false) {
//         if (automatas.k.length == 1) {
//             for (let p = 0; p < automatas.s.length; p++) { //alfabeto
//                 if (automatas.g[p] == 0) {
//                     graph += `q0`;
//                 } else {
//                     graph += `q0 -> q0 [label="${automatas.label[p]}"] ${salto} `;
//                 }

//             }

//         } else {
//             for (let i = 0; i < automatas.k.length; i++) { //estados
//                 for (let j = 0; j < automatas.s.length; j++) { //alfabeto

//                     if (automatas.g[o] != 0) {
//                         //k estados, s alfabeto, g caminos, label nombre arista, f final
//                         graph += `${automatas.k[i]} -> ${automatas.g[o]} [label="${automatas.label[o]}"] ${salto} `;

//                     }
//                     o++;
//                 }
//             }
//         }

//     }

//     for (let q = 0; q < automatas.f.length; q++) { //final
//         graph += ` ${espacio} ${automatas.f[q]} ${espacio1}${salto}`
//     }
//     graph += "poi[shape=point]}";




//     img.setAttribute("src", `https://quickchart.io/graphviz?format=png&width=auto&height=auto&graph=${graph}`);
//     zonaImg.appendChild(img);
// }