function readData (){
    var pragas;
    fetch('../JSONs/Pragas.JSON').then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(json => {
        pragas = json;
        console.log('Pragas:' + JSON.stringify(pragas));
    });

    var locais;
    fetch('../JSONs/Locais.JSON').then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(json => {
        locais = json;
        console.log('Locais:' + JSON.stringify(locais));
    });

    var contaminações;
    fetch('../JSONs/Contaminações.JSON').then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(json => {
        contaminações = json;
        console.log('Contaminação:' + JSON.stringify(contaminações));
    });
}

function savePlague (praga){
    pragas.push(praga);
    console.log('saved: ' + praga);
}

function saveLocal (local){
    locais.push(local);
    console.log('saved: ' + local);
}

function saveContamination (contaminação){
    locais.push(contaminação);
    console.log('saved: ' + contaminação);
}

export { readData, savePlague, saveLocal, saveContamination };