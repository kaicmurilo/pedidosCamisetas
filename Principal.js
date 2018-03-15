class Principal{

    constructor(){
        this.arrPedidos = [];
    }

    leitura(){
        let camp1=document.getElementById("s1");
        let qtd1= camp1.value;

        let camp2=document.getElementById("s2");
        let qtd2=camp2.value;

        let camp3=document.getElementById("s3");
        let qtd3=camp3.value;

        let pedidos = {};

        pedidos.s1=qtd1;
        pedidos.s2=qtd2;
        pedidos.s3=qtd3;
        pedidos.s4='0';
        return pedidos;
    }

    validar(pedidos){
        let errors = [];
        if(pedidos.s1 =="e"){
            errors.push({msg:"error: letra encontrada no primeiro campo."});
        }else if(pedidos.s2 == "e"){
            errors.push({msg:"error: letra encontrada no segundo campo."});
        }else if(pedidos.s3 == "e"){
            errors.push({msg:"error: letra encontrada no terceiro campo."});
        }
        return errors;
    }
    
    salvar(){
        let pedidos = this.leitura();
        let errors = this.validar (pedidos);

        if (errors.length==0){
            this.arrPedidos.push(pedidos);
        }
        this.limparForm();
        this.mensagem(errors);
        this.calcularValores(pedidos);
        this.atualizarTabela();
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
        let camp1=document.getElementById("s1");
        camp1.value="0";
        let camp2=document.getElementById("s2");
        camp2.value="0";
        let camp3=document.getElementById("s3");
        camp3.value="0";
    }

    calcularValores(pedidos){
        pedidos.s4=(pedidos.s1*10)+(pedidos.s2*12)+(pedidos.s3*15);
    }

    editar(index){
        
    }
    atualizarTabela(){
        let table = document.getElementById("tbpedi");
        
        const str=
        `<table>
            <thead>
                <td> P </td>
                <td> M </td>
                <td> G </td>
                <td> TOTAL </td>
            </thead>

            <tbody>
            ${this.arrPedidos.map(function (princ,index){
                return `<tr>
                    <td>${princ.pedidos.s1}<\td>
                    <td>${princ.pedidos.s2}<\td>
                    <td>${princ.pedidos.s3}<\td>
                    <td>${princ.pedidos.s4}<\td>
                    <td>
                        <button onclick='princ.excluir(${index})'>Excluir</button>
                        <button onclick='princ.editar(${index})'>Editar</button>
                    </td>
                </tr>`
            }).join('')
        }

        </tbody>
        </table>`;

        table.innerHTML = str;
        
        
    }

}

var princ = new Principal();