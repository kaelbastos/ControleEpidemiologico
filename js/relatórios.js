// relatórios page functions
function readData() {
    var data;
    var locais = JSON.parse(window.localStorage.getItem('locais')) ?? [];
    var pragas = JSON.parse(window.localStorage.getItem('pragas')) ?? [];
    var contaminações = JSON.parse(window.localStorage.getItem('contaminações')) ?? [];
    return [locais, pragas, contaminações];
}

function showByNumberOfDeaseasesForm() {
    $('#contentSection').get()[0].innerHTML =
        '<form>' +
        '<fieldset>' +
        '<span>' +
        '<label for="quantidadeDeDoenças">Quantidade de Doenças:</label>' +
        '<input type="text" id="quantidadeDeDoenças" name="quantidadeDeDoenças" placeholder="00000">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<input type="button" id="adicionar" onclick="showByNumberOfDeaseases()" value="Mostrar">' +
        '</span>' +
        '</fieldset>' +
        '</form>';
}

function showByNumberOfDeaseases() {
    var quantidadeDeDoenças = Number($('#quantidadeDeDoenças').val());

    if (quantidadeDeDoenças <= 0) {
        window.alert('Quantidade de doenças é inválida\n');
        return;
    }

    var pragas = window.pragas || [];    
    $('#contentSection').get()[0].innerHTML = JSON.stringify(pragas.filter(function(praga){
        return praga.doenças.split(',').length >= quantidadeDeDoenças;
    }));
}

function showByDeaseaseNameForm() {
    $('#contentSection').get()[0].innerHTML =
        '<form>' +
        '<fieldset>' +
        '<span>' +
        '<label for="nome">Nome da Doença:</label><br>' +
        '<input type="text" id="nome" name="nome">' +
        '</span>' +
        '<br>' +
        '<span>' +
        '<input type="button" id="adicionar" onclick="showByDeaseaseName()" value="Mostrar">' +
        '</span>' +
        '</fieldset>' +
        '</form>';
}

function showByDeaseaseName() {
    var nome = $('#nome').val();

    if (nome == '') {
        window.alert('Nome está vazio\n');
        return;
    }

    var pragas = window.pragas || [];    
    $('#contentSection').get()[0].innerHTML = JSON.stringify(pragas.filter(function(praga){
        return praga.nome.contains(nome);
    }));
}

function showByDate() {
    var pragas = window.pragas || [];    
    $('#contentSection').get()[0].innerHTML = JSON.stringify(pragas.filter(function(praga){
        return praga.data.contains('1/2019') || praga.data.contains('2/2019') || praga.data.contains('3/2019');
    }));
}