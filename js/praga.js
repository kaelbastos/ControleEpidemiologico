class Praga {
    código;
    nome;
    doenças_transmitidas;
    tempo_de_vida;
    modos_combate;

    constructor(código, nome, doenças_transmitidas, tempo_de_vida, modos_combate) {
        this.código = código;
        this.nome = nome;
        this.doenças_transmitidas = doenças_transmitidas;
        this.tempo_de_vida = tempo_de_vida;
        this.modos_combate = modos_combate;
    }

    set doenças_transmitidas(novas_doenças_transmitidas) {
        this.doenças_transmitidas = novas_doenças_transmitidas;
    }

    set tempo_de_vida(novo_tempo_de_vida) {
        this.tempo_de_vida = novo_tempo_de_vida;
    }

    set modos_combate(novos_modos_combate) {
        this.modos_combate = novos_modos_combate;
    }

    get codigo() { return this.código }

    get nome() { return this.nome }

    get doenças_transmitidas() { return this.doenças_transmitidas }

    get tempo_de_vida() { return this.tempo_de_vida }

    get modos_combate() { return this.modos_combate }

    toString() {
        return 'codigo: ' + this.codigo +
            '\nnome: ' + this.nome +
            '\ndoenças: ' + this.doenças_transmitidas +
            '\ntempo de vida: ' + this.tempo_de_vida +
            '\nmodo de combate: ' + this.modos_de_combate;
    }
}

// praga page functions

function readData() {
    return JSON.parse(window.localStorage.getItem('pragas')) ?? [];
}

function saveData() {
    window.localStorage.setItem('pragas', JSON.stringify(window.pragas));
}

function setAddPlagueForm() {
    document.querySelector('#contentSection').innerHTML =
        '<form>' +
        '<fieldset>' +
        '<span>' +
        '<label for="codigo">Código:</label>' +
        '<input type="text" id="codigo" name="codigo" placeholder="00000">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="nome">Nome:</label>' +
        '<input type="text" id="nome" name="nome" placeholder="name">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="doenças">Doenças:</label>' +
        '<input type="text" id="doenças" name="doenças" placeholder="xx, yy, zz">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="tempo_de_vida">Tempo de vida(dias):</label>' +
        '<input type="number" id="tempo_de_vida" name="tempo_de_vida" min="0" value="0">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<label for="modo_de_combate">Modo de combate:</label>' +
        '<input type="text" id="modo_de_combate" name="modo_de_combate">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<input type="button" id="adicionar" onclick="addPlague()" value="Adicionar">' +
        '</span>' +
        '</fieldset>' +
        '</form>';
}

function addPlague() {
    var codigo = document.querySelector('#codigo').value;
    var nome = document.querySelector('#nome').value;
    var doenças = document.querySelector('#doenças').value;
    var tempo_de_vida = document.querySelector('#tempo_de_vida').value;
    var modo_de_combate = document.querySelector('#modo_de_combate').value;

    var mensagem = '';
    if (codigo == '') {
        mensagem += 'Codigo está vazio\n';
    }
    console.log(mensagem);
    if (nome == '') {
        mensagem += 'Nome está vazio\n';
    }
    console.log(mensagem);
    if (doenças == '') {
        mensagem += 'Doenças está vazio\n';
    }
    console.log(mensagem);
    if (modo_de_combate == '') {
        mensagem += 'Modos de Combate está vazio\n';
    }
    console.log(mensagem);
    if (codigo != '' && plagueAlreadyExists(codigo)) {
        mensagem += 'Praga já cadastrada\n';
    }
    console.log(mensagem);

    if (mensagem != '') {
        window.alert(mensagem);
        return;
    }


    window.pragas.push(new Praga(codigo, nome, doenças, Number(tempo_de_vida), modo_de_combate));
    window.alert('Praga Cadastrada com sucesso!!');
    document.querySelector('#contentSection').innerHTML = '';
}

function plagueAlreadyExists(codigo) {
    existe = false;
    if (window.pragas.length > 0) {
        window.pragas.forEach(element => {
            if (element.código == codigo) {
                existe = true;
            }
        });
    }
    return existe;
}


function showAllPlagues() {
    document.querySelector('#contentSection').innerHTML = JSON.stringify(window.pragas);
}

function getOnePlagueForm() {
    document.querySelector('#contentSection').innerHTML =
        '<form>' +
        '<fieldset>' +
        '<span>' +
        '<label for="codigo">Código:</label>' +
        '<input type="text" id="codigo" name="codigo" placeholder="00000">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<input type="button" id="adicionar" onclick="showOnePlague()" value="Mostrar">' +
        '</span>' +
        '</fieldset>' +
        '</form>';
}

function showOnePlague() {
    var codigo = document.querySelector('#codigo').value;

    if (codigo == '') {
        window.alert('Codigo está vazio');
        return;
    }
    var praga;
    window.pragas.forEach(element => {
        if (element.código == codigo) {
            praga = element;
        }
    })

    if (praga) {
        document.querySelector('#contentSection').innerHTML = JSON.stringify(praga);
    } else {
        window.alert('Praga não cadastrada');
    }
}

function alterPlagueForm() {
    document.querySelector('#contentSection').innerHTML =
        '<form>' +
        '<fieldset>' +
        '<span>' +
        '<label for="codigo">Código:</label>' +
        '<input type="text" id="codigo" name="codigo" placeholder="00000">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<input type="button" id="adicionar" onclick="checkPlagueCode()" value="Alterar">' +
        '</span>' +
        '</fieldset>' +
        '</form>';
}

function checkPlagueCode() {
    var codigo = document.querySelector('#codigo').value;

    if (plagueAlreadyExists(codigo)) {
        var praga = window.pragas.filter(element => { return element.código == codigo })[0];

        document.querySelector('#contentSection').innerHTML =
            '<form>' +
            '<fieldset>' +
            '<span>' +
            '<label for="codigo">Código:</label>' +
            '<input type="text" id="codigo" name="codigo" placeholder="00000" disabled=true>' +
            '</span>' +
            '<br>' +
            '<span>' +
            '<label for="nome">Nome:</label>' +
            '<input type="text" id="nome" name="nome" placeholder="name">' +
            '</span>' +
            '<br>' +
            '<span>' +
            '<label for="doenças">Doenças:</label>' +
            '<input type="text" id="doenças" name="doenças" placeholder="xx, yy, zz">' +
            '</span>' +
            '<br>' +
            '<span>' +
            '<label for="tempo_de_vida">Tempo de vida(dias):</label>' +
            '<input type="number" id="tempo_de_vida" name="tempo_de_vida" min="0" value="0">' +
            '</span>' +
            '<br>' +
            '<span>' +
            '<label for="modo_de_combate">Modo de combate:</label>' +
            '<input type="text" id="modo_de_combate" name="modo_de_combate">' +
            '</span>' +
            '<br>' +
            '<span>' +
            '<input type="button" id="adicionar" onclick="alterPlague()" value="Alterar">' +
            '</span>' +
            '</fieldset>' +
            '</form>';
        document.querySelector('#codigo').value = praga.código;
        document.querySelector('#nome').value = praga.nome;
        document.querySelector('#doenças').value = praga.doenças_transmitidas;
        document.querySelector('#tempo_de_vida').value = praga.tempo_de_vida;
        document.querySelector('#modo_de_combate').value = praga.modos_combate;
    } else {
        window.alert('Praga não cadastrada!!');
    }
}


function alterPlague() {
    var codigo = document.querySelector('#codigo').value;
    var nome = document.querySelector('#nome').value;
    var doenças = document.querySelector('#doenças').value;
    var tempo_de_vida = document.querySelector('#tempo_de_vida').value;
    var modo_de_combate = document.querySelector('#modo_de_combate').value;

    var praga = window.pragas.filter(element => { return element.código == codigo })[0];

    praga.nome = nome;
    praga.doenças_transmitidas = doenças;
    praga.tempo_de_vida = tempo_de_vida;
    praga.modos_combate = modo_de_combate;

    window.alert('Praga alterada com sucesso!!');
    document.querySelector('#contentSection').innerHTML = '';
}

function deletePlagueForm() {
    document.querySelector('#contentSection').innerHTML =
        '<form>' +
        '<fieldset>' +
        '<span>' +
        '<label for="codigo">Código:</label>' +
        '<input type="text" id="codigo" name="codigo" placeholder="00000">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<input type="button" id="adicionar" onclick="deletePlague()" value="Deletar">' +
        '</span>' +
        '</fieldset>' +
        '</form>';
}

function deletePlague(){
    var codigo = document.querySelector('#codigo').value;

    if (plagueAlreadyExists(codigo)) {
        window.pragas = window.pragas.filter(element => { return element.código != codigo });

        window.alert('Praga deletada com sucesso!!');
        document.querySelector('#contentSection').innerHTML = '';
    } else {
        window.alert('Praga não cadastrada');
    }
}