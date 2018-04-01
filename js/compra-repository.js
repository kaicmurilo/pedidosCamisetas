'use strict';

class CompraRepository{
    constructor(){
        this.pedido = [];
        this.sequenceId=1;
    }

    salvar(pedido){
        if(pedido.id!=undefined && pedido.id!=""){
            //edição
            let arrPed = this.pedido.filter(function(obg){if (obg.id==pedido.id) return true});
            arrPed[0].p= pedido.p;
            arrPed[0].m= pedido.m;
            arrPed[0].g= pedido.g;
            
        }else{

            pedido.id = this.sequenceId++;
            this.pedido.push(pedido);
            }
        }

        excluir(pId){
            let index = this.pedido.findIndex( (obg) => obg.id===pId);
            this.pedido.splice(index,1);
        }

        buscarPorId(pId){
            let arr= this.pedido.filter( (obj) => obj.id===pId);
            return arr[0];
        }
        
        buscarTodos(){
            return this.pedido;
        }
    
}

export default CompraRepository;