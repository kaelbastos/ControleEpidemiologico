export default class Local {
    _CEP_ponto_central;
    _raio;
    _população;
    _características;

    constructor(CEP_ponto_central, raio, população, características){
        this._CEP_ponto_central = CEP_ponto_central;
        this._raio = raio;
        this._população = população;
        this._características = características;
    }

    set raio(novo_raio){
        this._raio = novo_raio;
    }

    set população(nova_população){
        this._população = nova_população;
    }

    set características(novas_características){
        this._características = novas_características;
    }

    get CEP_ponto_central() {return this._CEP_ponto_central;}

    get raio() {return this._raio;}

    get população() {return this._população;}

    get características() {return this._características;}
}