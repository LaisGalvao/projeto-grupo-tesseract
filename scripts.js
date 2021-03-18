//aqui armazeno o link da api em uma variável
const url = "https://api.github.com/orgs/grupotesseract/public_members";

// instancio uma nova request
let req = new XMLHttpRequest();

/*aqui eu abro essarequisição HTTP 
utilizando dois parêmtros, um do método, e a url
que está na minha variável requestUrl*/
req.open('GET', url);

/*aqui estamos definindo o  responseType como JSON, 
para que o XHR saiba que o servidor retornará o JSON e que 
isso deve ser convertido nos bastidores em um objeto JavaScript. */
req.responseType = 'json';
req.send();

/*aqui ele verifica a readystate e o status e  
retorna o que eu quero pegar dentro da api */
req.addEventListener("readystatechange", function () {
        if(req.readyState =4){  
            if(req.status ==200){
               
                /*vou retornar a lista com nome e foto
                dentro de um loop for*/
                let dados = req.response;
                let main = document.querySelector('main');
                for (let i = 0; i < dados.length; i++) {
                   
                    //criei elementos por aqui mesmo
                    let article = document.createElement('article');
                    let h2 = document.createElement('h2');
                    let img = document.createElement('img');
                    let btnmostra = document.createElement('button');

                    //aqui insiro tudo que criei dentro do meu html
                    h2.textContent = dados[i].login;
                    img.src= dados[i].avatar_url;
                    article.appendChild(h2);
                    article.appendChild(img);
                    article.appendChild(btnmostra);
                    main.appendChild(article);
                    
                    //aqui eu tento fazer um event listener p/ o botao
                    btnmostra.addEventListener("click", mostra);

                   
                    //aqui to puxando da outra lista
                    //repito a mesma coisa, mas apenas para o button
                    function mostra(){
                        //aqui o link dos perfis dos membros (concatenado com o nome do login)
                        const urlUser = 'https://api.github.com/users/'+dados[i].login;
                        let reqUser = new XMLHttpRequest();
                        reqUser.open('GET', urlUser);
                        reqUser.responseType = 'json';
        
                            reqUser.addEventListener("readystatechange", function () {
                                if(reqUser.readyState = 4){
                                    if(reqUser.status ==200){
                                
                                        //criando e inserindo meus elementos
                                        
                                        let section = document.createElement('section');
                                        let p = document.createElement('p');
                                        let p2 = document.createElement('p');
                                        let p3 = document.createElement('p');
                                        let p4 = document.createElement('p');
                                        let p5 = document.createElement('p');

                                        //aqui no meu text content usei direto o response
                                        //sem uma variável mesmo
                                        p.textContent = "Nome: "+reqUser.response['name'];
                                        p2.textContent = "Repositórios: "+reqUser.response['public_repos'];
                                        p3.textContent = "Seguidores: "+reqUser.response['followers'];
                                        p4.textContent = "Entrou no github em: "+reqUser.response['created_at'];
                                        p5.textContent = "Clique para fechar";

                                        section.appendChild(p);
                                        section.appendChild(p2);
                                        section.appendChild(p3);
                                        section.appendChild(p4);
                                        section.appendChild(p5);
                                        article.appendChild(section);

                                        //ao clicar na section, ela dá um
                                        //display none
                                        article.addEventListener("click", function(){
                                            section.style.display = "none";
                                        })

                                    }
                                }
                               
                    
                            });
                            
                            reqUser.send();

                    }//aqui acaba minha function mostra
                   
                }//aqui acaba meu for (dos logins)           
                    
            }//aqui acaba o if status = 200

        }//aqui acaba o if readystate = 4
 
    //aqui faço uma função de busca
    //conforme o que for digitado, aparece o usuario                  
        $("#busca").keyup(function(){
            let digitado = $(this).val();
            $('h2').parent().hide();
            $('h2:contains('+digitado+')').parent().show()
        });
  
});//aqui acaba o event listener req
      



   

    