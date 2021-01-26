class Contaminação {
    CEP_ponto_central;
    código_praga;
    data;
    hora;
    ações;
    data_extermínio;

    constructor(CEP_ponto_central, código_praga, data, hora, ações, data_extermínio) {

        this.CEP_ponto_central = CEP_ponto_central;
        this.código_praga = código_praga;
        this.data = data;
        this.hora = hora;
        this.ações = ações;
        this.data_extermínio = data_extermínio;
    }

    set ações(novas_ações) {
        this.ações = novas_ações;
    }

    set data_extermínio(nova_data_extermínio) {
        this.data_extermínio = nova_data_extermínio;
    }

    get CEP_ponto_central() { return this.CEP_ponto_central }

    get código_praga() { return this.código_praga }

    get data() { return this.data }

    get hora() { return this.hora }

    get ações() { return this.ações }

    get data_extermínio() { return this.data_extermínio }

    equals(contaminação) {
        return this.CEP_ponto_central == contaminação.CEP_ponto_central &&
            this.código_praga == contaminação.códigos_praga &&
            this.data == contaminação.data &&
            this.hora == contaminação.hora;
    }
}

// local page functions

function readData() {
        var data;
        var locais = JSON.parse(window.localStorage.getItem('locais')) ?? [];
        var pragas = JSON.parse(window.localStorage.getItem('pragas')) ?? [];
        var contaminações = JSON.parse(window.localStorage.getItem('contaminações')) ?? [];
    return [locais, pragas, contaminações];
}

function saveData() {
    window.localStorage.setItem('contaminações', JSON.stringify(window.contaminações));
}

function setAddContaminationForm() {
    document.querySelector('#contentSection').innerHTML =
        '<form>' +
        '<fieldset>' +
        '<span>' +
        '<label for="ponto_central">Cep Ponto Central:</label>' +
        '<input type="text" id="ponto_central" name="ponto_central" placeholder="00000">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="codigo_praga">Código Praga:</label>' +
        '<input type="text" id="codigo_praga" name="codigo_praga" placeholder="00000">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="data">Data:</label>' +
        '<input type="text" id="data" name="data" placeholder="00/00/00">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="hora">Hora:</label>' +
        '<input type="text" id="hora" name="hora" placeholder="00:00">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="ações">Ações:</label>' +
        '<input type="text" id="ações" name="ações">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="data_de_exterminio">Data de Extermínio:</label>' +
        '<input type="text" id="data_de_exterminio" name="data_de_exterminio" placeholder="00/00/00">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<input type="button" id="adicionar" onclick="addContaminação()" value="Adicionar">' +
        '</span>' +
        '</fieldset>' +
        '</form>';
}

function addContaminação() {
    var cep = document.querySelector('#ponto_central').value;
    var praga = Number(document.querySelector('#codigo_praga').value);
    var data = Number(document.querySelector('#data').value);
    var hora = document.querySelector('#hora').value;
    //Add Other Atributes

    var ceps_locais = window.locais || [];
    var codigos_pragas = window.pragas || [];

    ceps_locais = ceps_locais.map(local => local.CEP_ponto_central);
    codigos_pragas = codigos_pragas.map(praga => praga.código);

    var mensagem = '';
    if (cep == '') {
        mensagem += 'Cep do local está vazio\n';
    }
    if (cep == '' && !ceps_locais.contains(cep)) {
        mensagem += 'Local não cadastrado\n';
    }
    if (praga == '') {
        mensagem += 'Código da praga está vazio\n';
    }
    if (praga == '' && !codigos_pragas.contains(praga)) {
        mensagem += 'Praga não cadastrada\n';
    }
    if (data == '') {
        mensagem += 'Data é inválida\n';
    }
    if (hora == '') {
        mensagem += 'Hora é inválida\n';
    }
    if (mensagem == '' && contaminationAlreadyExists(cep, praga, data, hora)) {
        mensagem += 'Contaminação já cadastrada\n';
    }

    if (mensagem != '') {
        window.alert(mensagem);
        return;
    }


    window.contaminações.push(new Contaminação(cep, praga, data, hora));
    window.alert('Contaminação cadastrado com sucesso!!');
    document.querySelector('#contentSection').innerHTML = '';
}

function contaminationAlreadyExists(cep, praga, data, hora) {
    var contaminação = new Contaminação(cep, praga, data, hora);
    existe = false;
    if (window.contaminações.length > 0) {
        window.contaminações.forEach(element => {
            if (element.equals(contaminação)) {
                existe = true;
            }
        });
    }
    return existe;
}


function showAllContaminations() {
    document.querySelector('#contentSection').innerHTML = JSON.stringify(window.contaminações);
}

function getOneContaminationForm() {
    document.querySelector('#contentSection').innerHTML =
        '<form>' +
        '<fieldset>' +
        '<span>' +
        '<label for="ponto_central">Cep Ponto Central:</label>' +
        '<input type="text" id="ponto_central" name="ponto_central" placeholder="00000">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="codigo_praga">Código Praga:</label>' +
        '<input type="text" id="codigo_praga" name="codigo_praga" placeholder="00000">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="data">Data:</label>' +
        '<input type="text" id="data" name="data" placeholder="00/00/00">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="hora">Hora:</label>' +
        '<input type="text" id="hora" name="hora" placeholder="00:00">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<input type="button" id="adicionar" onclick="showOneContamination()" value="Mostrar">' +
        '</span>' +
        '</fieldset>' +
        '</form>';
}

function showOneContamination() {
    var cep = document.querySelector('#ponto_central').value;
    var praga = Number(document.querySelector('#codigo_praga').value);
    var data = Number(document.querySelector('#data').value);
    var hora = document.querySelector('#hora').value;

    var ceps_locais = window.locais || [];
    var codigos_pragas = window.pragas || [];

    ceps_locais = ceps_locais.map(local => local.CEP_ponto_central);
    codigos_pragas = codigos_pragas.map(praga => praga.código);

    var mensagem = '';
    if (cep == '') {
        mensagem += 'Cep do local está vazio\n';
    }
    if (cep == '' && !ceps_locais.contains(cep)) {
        mensagem += 'Local não cadastrado\n';
    }
    if (praga == '') {
        mensagem += 'Código da praga está vazio\n';
    }
    if (praga == '' && !codigos_pragas.contains(praga)) {
        mensagem += 'Praga não cadastrada\n';
    }
    if (data == '') {
        mensagem += 'Data é inválida\n';
    }
    if (hora == '') {
        mensagem += 'Hora é inválida\n';
    }

    var contaminaçãoEsperada = new Contaminação(cep, praga, data, hora);
    var contaminação;
    window.contaminações.forEach(element => {
        if (element.equals(contaminaçãoEsperada)) {
            contaminação = element;
        }
    })

    if (contaminação) {
        document.querySelector('#contentSection').innerHTML = JSON.stringify(contaminação);
    } else {
        window.alert('Contaminação não cadastrada');
    }
}

function alterContaminaçõesForm() {
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
        var local = window.locais.filter(element => { return element.CEP_ponto_central == cep })[0];

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

    var local = window.locais.filter(element => { return element.CEP_ponto_central == cep })[0];

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

function deletePlague() {
    var cep = document.querySelector('#ponto_central').value;

    if (plagueAlreadyExists(cep)) {
        window.locais = window.locais.filter(element => { return element.CEP_ponto_central != cep });

        window.alert('Local deletada com sucesso!!');
        document.querySelector('#contentSection').innerHTML = '';
    } else {
        window.alert('Local não cadastrado');
    }
}