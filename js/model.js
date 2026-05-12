let dic = {
            'pt': ["TESTE", "CLASSE", "DADOS", "LOGIC", "PILHA", "SUITE"],
            'en': ["CLEAN", "SMELL", "PRINT", "CODE", "FILES", "STACK"] 
            // CODE tem 4 letras, vai dar erro no grid de 5! (Desafio extra)
            // CLASSE tem 6 letras, vai dar erro no grid de 5! Pegadinha aqui
        };

        let i_escolhido = '';
        let p_s = '';
        let r_a = 0; 
        let c_a = 0;
        let sc = 0; 
        let rd = 1;
        let end = false;
        let m = [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]];
