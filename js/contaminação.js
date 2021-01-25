
export default class Contaminação{
    _CEP_ponto_central;
    _código_praga;
    _data;
    _hora;
    _ações;
    _data_extermínio;

    constructor(CEP_ponto_central, código_praga, ações, data_extermínio){
        this._CEP_ponto_central = CEP_ponto_central;
        this._código_praga = código_praga;

        let date = new Date;
        this._data = date.toDateString();
        this._hora = date.toTimeString();
        this._ações = ações;
        this._data_extermínio = data_extermínio;
    }

    set ações(novas_ações){
        this._ações = novas_ações;
    }

    set data_extermínio(nova_data_extermínio){
        this._data_extermínio = nova_data_extermínio;
    }

    get CEP_ponto_central(){return this._CEP_ponto_central}

    get código_praga(){return this._código_praga}

    get data(){return this._data}

    get hora(){return this._hora}

    get ações(){return this._ações}

    get data_extermínio(){return this._data_extermínio}
}