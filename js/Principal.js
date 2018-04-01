'use strict';

import CompraRepository from '../js/compra-repository.js';
import calcularValores from '../js/calcularValores.js';

class Principal{

    constructor(){
        this.repository  = new CompraRepository();
        this.calculos = new calcularValores();
    }

    leitura(){

        //lendo

        let campId=document.getElementById("id");
        let valorId= campId.value;

        let campP=document.getElementById("p");
        let valorP=campP.value;

        let campM=document.getElementById("m");
        let valorM=campM.value;

        let campG=document.getElementById("g");
        let valorG=campG.value;

        // obg 

        let pedido = {};

        pedido.id=valorId;
        pedido.p=valorP;
        pedido.m=valorM;
        pedido.g=valorG;
        pedido.s4='0';

        return pedido;
    }

    validar(pedido){
        let errors = [];
        if(pedido.p =="e"){
            errors.push({msg:"error: letra encontrada no primeiro campo."});
        }else if(pedido.m == "e"){
            errors.push({msg:"error: letra encontrada no segundo campo."});
        }else if(pedido.g == "e"){
            errors.push({msg:"error: letra encontrada no terceiro campo."});
        }
        return errors;
    }
    
    salvar(){
        //leitura
        let pedido = this.leitura();
        //validar
        let errors = this.validar (pedido);


        if (errors.length==0){
            this.repository.salvar(pedido);
            //calcular valores
            this.calculos.calcular(pedido);
             //gerar tabela
            this.atualizarTabela();
            //limpar form
            this.limparForm();
        }else{
            this.mensagem(errors);
        }
       
        
    }

    mensagem(errors){

        let msg=document.getElementById("mensagem");

        if(errors.length==0){
            msg.innerHTML = "GERANDO RELATORIO";
        }else{
            for(let i=0;i<erros.length;i++){
                msg.innerHTML += erros[i].msg + "<br>";
            }
        }
    }

    limparForm(){
        let campId=document.getElementById("id");
        campId.value="";
        let campP=document.getElementById("p");
        campP.value="0";
        let campM=document.getElementById("m");
        campM.value="0";
        let campG=document.getElementById("g");
        campG.value="0";
    }


    excluir(id){
        if(window.confirm('Confirma Exclusão?')){
            this.repository.excluir(id);
            this.atualizarTabela();
            this.limparForm();
        }
    }

    editar(id){
        let ped = this.repository.buscarPorId(id);
        
        let campoId = document.getElementById("id");
        campoId.value=ped.id;

        let campoP=document.getElementById("p");
        campoP.value=ped.p;

        let campoM=document.getElementById("m");
        campoM.value=ped.m;

        let campoG=document.getElementById("g");
        campoG.value=ped.g;

        this.calculos.calcular(ped);
    }


    atualizarTabela(){
        let table = document.getElementById("tbpedi");
        let arrPedido = this.repository.buscarTodos();
        const str=
        `<table>
            <thead>
                <td> P </td>
                <td> M </td>
                <td> G </td>
                <td> TOTAL </td>
            </thead>

            <tbody>
            ${ arrPedido.map(function (ped,index){
                return `<tr>
                    <td>${ped.p} 
                    <td>${ped.m} 
                    <td>${ped.g}
                    <td>${ped.s4} 
                    <td>
                        <button onclick='princ.excluir(${ped.id})'>Excluir</button>
                        <button onclick='princ.editar(${ped.id})'>Editar</button>
                    </td>
                </tr>`

            }).join('')
        }

         </tbody>
        </table>`;

        table.innerHTML = str;
        
        
    }

}

export default Principal;