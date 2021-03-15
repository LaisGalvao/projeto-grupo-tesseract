//aqui armazeno o link da api em uma variável
let requestUrl = "https://api.github.com/orgs/grupotesseract/public_members";
// instancio uma nova request
let req = new XMLHttpRequest();
// aqui eu abro essarequisição HTTP 
//utilizando dois parêmtros, um do método, e a url
//que está na minha variável requestUrl
req.open('GET', requestUrl);
//aqui estamos definindo o  responseType como JSON, 
//para que o XHR saiba que o servidor retornará o JSON e que 
//isso deve ser convertido nos bastidores em um objeto JavaScript. 
req.responseType = 'json';
req.send();
