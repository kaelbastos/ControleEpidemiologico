class Local {
    CEP_ponto_central;
    raio;
    população;
    características;

    constructor(CEP_ponto_central, raio, população, características){
        this.CEP_ponto_central = CEP_ponto_central;
        this.raio = raio;
        this.população = população;
        this.características = características;
    }

    set raio(novo_raio){
        this.raio = novo_raio;
    }

    set população(nova_população){
        this.população = nova_população;
    }

    set características(novas_características){
        this.características = novas_características;
    }

    get CEP_ponto_central() {return this.CEP_ponto_central;}

    get raio() {return this.raio;}

    get população() {return this.população;}

    get características() {return this.características;}
}

// local page functions

function readData() {
    return JSON.parse(window.localStorage.getItem('locais')) ?? [];
}

function saveData() {
    window.localStorage.setItem('locais', JSON.stringify(window.locais));
}

function setAddLocalForm() {
    document.querySelector('#contentSection').innerHTML =
        '<form>' +
        '<fieldset>' +
        '<span>' +
        '<label for="ponto_central">Cep Ponto Central:</label>' +
        '<input type="text" id="ponto_central" name="ponto_central" placeholder="00000">' +
        '</span>' +
        '<label for="raio">Raio(Km):</label>' +
        '<input type="number" id="raio" name="raio" min="0" value="0">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="população">População(Mil habitantes):</label>' +
        '<input type="number" id="população" name="população" min="0" value="0">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="caracteristicas">Características:</label>' +
        '<input type="text" id="caracteristicas" name="caracteristicas">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<input type="button" id="adicionar" onclick="addLocal()" value="Adicionar">' +
        '</span>' +
        '</fieldset>' +
        '</form>';
}

function addLocal() {
    var cep = document.querySelector('#ponto_central').value;
    var raio = Number(document.querySelector('#raio').value);
    var população = Number(document.querySelector('#população').value);
    var caracteristicas = document.querySelector('#caracteristicas').value;

    var mensagem = '';
    if (codigo == '') {
        mensagem += 'Ponto central está vazio\n';
    }
    console.log(mensagem);
    if (raio == 0) {
        mensagem += 'Raio está inválido\n';
    }
    console.log(mensagem);
    if (população == 0) {
        mensagem += 'População é inválida\n';
    }
    console.log(mensagem);
    if (cep != '' && localAlreadyExists(cep)) {
        mensagem += 'Local já cadastrado\n';
    }
    console.log(mensagem);

    if (mensagem != '') {
        window.alert(mensagem);
        return;
    }


    window.locais.push(new Local(cep, raio, população, caracteristicas));
    window.alert('Local cadastrado com sucesso!!');
    document.querySelector('#contentSection').innerHTML = '';
}

function localAlreadyExists(cep) {
    existe = false;
    if (window.locais.length > 0) {
        window.locais.forEach(element => {
            if (element.CEP_ponto_central == cep) {
                existe = true;
            }
        });
    }
    return existe;
}


function showAllLocals() {
    document.querySelector('#contentSection').innerHTML = JSON.stringify(window.locais);
}

function getOneLocalForm() {
    document.querySelector('#contentSection').innerHTML =
        '<form>' +
        '<fieldset>' +
        '<span>' +
        '<label for="ponto_central">Cep Ponto Central:</label>' +
        '<input type="text" id="ponto_central" name="ponto_central" placeholder="00000">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<input type="button" id="adicionar" onclick="showOneLocal()" value="Mostrar">' +
        '</span>' +
        '</fieldset>' +
        '</form>';
}

function showOneLocal() {
    var cep = document.querySelector('#ponto_central').value;

    if (codigo == '') {
        window.alert('Cep Ponto Central está vazio');
        return;
    }
    var local;
    window.pragas.forEach(element => {
        if (element.CEP_ponto_central == cep) {
            local = element;
        }
    })

    if (local) {
        document.querySelector('#contentSection').innerHTML = JSON.stringify(local);
    } else {
        window.alert('Local não cadastrada');
    }
}

function alterLocalForm() {
    document.querySelector('#contentSection').innerHTML =
        '<form>' +
        '<fieldset>' +
        '<span>' +
        '<label for="ponto_central">Código:</label>' +
        '<input type="text" id="codigo" name="codigo" placeholder="00000">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<input type="button" id="adicionar" onclick="checkLocalCode()" value="Alterar">' +
        '</span>' +
        '</fieldset>' +
        '</form>';
}

function checkLocalCode() {
    var cep = document.querySelector('#ponto_central').value;

    if (localAlreadyExists(cep)) {
        var local = window.locais.filter(element => {return element.CEP_ponto_central == cep})[0];

        document.querySelector('#contentSection').innerHTML =
        '<form>' +
        '<fieldset>' +
        '<span>' +
        '<label for="ponto_central">Cep Ponto Central:</label>' +
        '<input type="text" id="ponto_central" name="ponto_central" placeholder="00000" disebled=true>' +
        '</span>' +
        '<label for="raio">Raio(Km):</label>' +
        '<input type="number" id="raio" name="raio" min="0" value="0">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="população">População(Mil habitantes):</label>' +
        '<input type="number" id="população" name="população" min="0" value="0">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="caracteristicas">Características:</label>' +
        '<input type="text" id="caracteristicas" name="caracteristicas">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<input type="button" id="adicionar" onclick="alterLocal()" value="Alterar">' +
        '</span>' +
        '</fieldset>' +
        '</form>';
        document.querySelector('#ponto_central').value = local.CEP_ponto_central;
        document.querySelector('#raio').value = local.raio;
        document.querySelector('#população').value = local.população;
        document.querySelector('#caracteristicas').value = local.caracteristicas;
    } else {
        window.alert('Local não cadastrado!!');
    }
}


function alterLocal() {
    var cep = document.querySelector('#ponto_central').value;
    var raio = Number(document.querySelector('#raio').value);
    var população = Number(document.querySelector('#população').value);
    var caracteristicas = document.querySelector('#caracteristicas').value;

    var local = window.locais.filter(element => { return element.CEP_ponto_central == cep})[0];

    local.raio = raio;
    local.população = população;
    local.caracteristicas = caracteristicas;

    window.alert('Local alteradl com sucesso!!');
    document.querySelector('#contentSection').innerHTML = '';
}

function deleteLocalForm() {
    document.querySelector('#contentSection').innerHTML =
        '<form>' +
        '<fieldset>' +
        '<span>' +
        '<label for="ponto_central">Cep Ponto Central:</label>' +
        '<input type="text" id="ponto_central" name="ponto_central" placeholder="00000">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<input type="button" id="adicionar" onclick="deleteLocal()" value="Deletar">' +
        '</span>' +
        '</fieldset>' +
        '</form>';
}

function deletePlague(){
    var cep = document.querySelector('#ponto_central').value;

    if (plagueAlreadyExists(cep)) {
        window.locais = window.locais.filter(element => { return element.CEP_ponto_central != cep });

        window.alert('Local deletada com sucesso!!');
        document.querySelector('#contentSection').innerHTML = '';
    } else {
        window.alert('Local não cadastrado');
    }
}