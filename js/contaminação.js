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

// contaminação page functions

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
    $('#contentSection').get()[0].innerHTML =
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
        '<input type="textField" id="ações" name="ações">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="data_de_exterminio">Data de Extermínio:</label>' +
        '<input type="text" id="data_de_exterminio" name="data_de_exterminio" placeholder="00/00/0000">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<input type="button" id="adicionar" onclick="addContamination()" value="Adicionar">' +
        '</span>' +
        '</fieldset>' +
        '</form>';
}

function addContamination() {
    var cep = $('#ponto_central').val();
    var praga = $('#codigo_praga').val();
    var data = $('#data').val();
    var hora = $('#hora').val();
    var açôes = $('#ações').val();
    var dataDeExterminio = $('#data_de_exterminio').val();

    var ceps_locais = window.locais || [];
    var codigos_pragas = window.pragas || [];

    ceps_locais = ceps_locais.map(contaminação => contaminação.CEP_ponto_central);
    codigos_pragas = codigos_pragas.map(praga => praga.código);

    var mensagem = '';
    if (cep == '') {
        mensagem += 'Cep do contaminação está vazio\n';
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


    window.contaminações.push(new Contaminação(cep, praga, data, hora, açôes, dataDeExterminio));
    window.alert('Contaminação cadastrado com sucesso!!');
    $('#contentSection').get()[0].innerHTML = '';
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
    $('#contentSection').get()[0].innerHTML = JSON.stringify(window.contaminações);
}

function getOneContaminationForm() {
    $('#contentSection').get()[0].innerHTML =
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
        '<input type="text" id="data" name="data" placeholder="00/00/0000">' +
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
    var cep = $('#ponto_central').val();
    var praga = $('#codigo_praga').val();
    var data = $('#data').val();
    var hora = $('#hora').val();

    var ceps_locais = window.locais || [];
    var codigos_pragas = window.pragas || [];

    ceps_locais = ceps_locais.map(contaminação => contaminação.CEP_ponto_central);
    codigos_pragas = codigos_pragas.map(praga => praga.código);

    var mensagem = '';
    if (cep == '') {
        mensagem += 'Cep do contaminação está vazio\n';
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

    var contaminaçãoEsperada = new Contaminação(cep, praga, data, hora, undefined, undefined);
    var contaminação;
    window.contaminações.forEach(element => {
        if (element.equals(contaminaçãoEsperada)) {
            contaminação = element;
        }
    })

    if (contaminação) {
        $('#contentSection').get()[0].innerHTML = JSON.stringify(contaminação);
    } else {
        window.alert('Contaminação não cadastrada');
    }
}

function alterContaminationForm() {
    $('#contentSection').get()[0].innerHTML =
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
        '<input type="text" id="data" name="data" placeholder="00/00/0000">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="hora">Hora:</label>' +
        '<input type="text" id="hora" name="hora" placeholder="00:00">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<input type="button" id="adicionar" onclick="checkContamination()" value="Alterar">' +
        '</span>' +
        '</fieldset>' +
        '</form>';
}

function checkContamination() {
    var cep = $('#ponto_central').val();
    var praga = $('#codigo_praga').val();
    var data = $('#data').val();
    var hora = $('#hora').val();

    if (localAlreadyExists(cep, praga, data, hora)) {
        var contaminaçãoEsperada = new Contaminação(cep, praga, data, hora, undefined, undefined);
        var contaminação = window.locais.filter(element => { return element.equals(contaminaçãoEsperada) })[0];

        $('#contentSection').get()[0].innerHTML =
            '<form>' +
            '<fieldset>' +
            '<span>' +
            '<label for="ponto_central">Cep Ponto Central:</label>' +
            '<input type="text" id="ponto_central" name="ponto_central" placeholder="00000" disabled=true>' +
            '</span>' +
            '<br>' +
            '<span>' +
            '<label for="codigo_praga">Código Praga:</label>' +
            '<input type="text" id="codigo_praga" name="codigo_praga" placeholder="00000 disabled=true>' +
            '</span>' +
            '<br>' +
            '<span>' +
            '<label for="data">Data:</label>' +
            '<input type="text" id="data" name="data" placeholder="00/00/0000" disabled=true>' +
            '</span>' +
            '<br>' +
            '<span>' +
            '<label for="hora">Hora:</label>' +
            '<input type="text" id="hora" name="hora" placeholder="00:00" disabled=true>' +
            '</span>' +
            '<br>' +
            '<span>' +
            '<label for="ações">Ações:</label>' +
            '<input type="textField" id="ações" name="ações">' +
            '</span>' +
            '<br>' +
            '<span>' +
            '<label for="data_de_exterminio">Data de Extermínio:</label>' +
            '<input type="text" id="data_de_exterminio" name="data_de_exterminio" placeholder="00/00/00">' +
            '</span>' +
            '<br>' +
            '<span>' +
            '<input type="button" id="adicionar" onclick="alterContamination()" value="Alterar">' +
            '</span>' +
            '</fieldset>' +
            '</form>';
        $('#ponto_central').val() = contaminação.CEP_ponto_central;
        $('#codigo_praga').val() = contaminação.código_praga;
        $('#data').val() = contaminação.data;
        $('#hora').val() = contaminação.hora;
        $('#ações').val() = contaminação.açôes;
        $('#data_de_exterminio').val() = contaminação.data_extermínio;
    } else {
        window.alert('Contaminação não cadastrada!!');
    }
}

function alterContamination() {
    var cep = $('#ponto_central').val();
    var praga = $('#codigo_praga').val();
    var data = $('#data').val();
    var hora = $('#hora').val();
    var açôes = $('#ações').val();
    var dataDeExterminio = $('#data_de_exterminio').val();

    var contaminação = window.locais.filter(element => { return element.equals(contaminaçãoEsperada) })[0];

    contaminação.CEP_ponto_central = cep;
    contaminação.código_praga = praga;
    contaminação.data = data;
    contaminação.hora = hora;
    contaminação.açôes = açôes;
    contaminação.data_extermínio = dataDeExterminio;

    window.alert('Local alteradl com sucesso!!');
    $('#contentSection').get()[0].innerHTML = '';
}

function deleteContaminationForm() {
    $('#contentSection').get()[0].innerHTML =
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
    '<input type="text" id="data" name="data" placeholder="00/00/0000">' +
    '</span>' +
    '<br>' +
    '<span>' +
    '<label for="hora">Hora:</label>' +
    '<input type="text" id="hora" name="hora" placeholder="00:00">' +
    '</span>' +
    '<br>' +
    '<span>' +
    '<input type="button" id="adicionar" onclick="deletePlague()" value="Deletar">' +
    '</span>' +
    '</fieldset>' +
    '</form>';
}

function deletePlague() {
    var cep = $('#ponto_central').val();
    var praga = $('#codigo_praga').val();
    var data = $('#data').val();
    var hora = $('#hora').val();

    if (plagueAlreadyExists(cep)) {
        var contaminaçãoEsperada = new Contaminação(cep, praga, data, hora, undefined, undefined);
        window.contaminações = window.contaminações.filter(element => { return !element.equals(contaminaçãoEsperada) });

        window.alert('Contaminação deletada com sucesso!!');
        $('#contentSection').get()[0].innerHTML = '';
    } else {
        window.alert('Contaminação não cadastrado');
    }
}