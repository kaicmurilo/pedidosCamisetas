'use strict';

class calcularValores{

    constructor(){
        this.pedido = [];
    }

    calcular(pedido){
        pedido.s4=(pedido.p*10)+(pedido.m*12)+(pedido.g*15);
    }

}

export default calcularValores;