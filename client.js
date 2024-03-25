const soap = require('soap');
const xml2js = require('xml-js');

const url = 'http://localhost:8000/mdc?wsdl';

soap.createClient(url, function(err, client) {
  if (err) {
    console.error('Erro ao criar cliente SOAP:', err);
    return;
  }

  const x = 1920; // Largura da imagem
  const y = 1080; // Altura da imagem

  client.calculateMDC({x: x, y: y}, function(err, result) {
    if (err) {
      console.error('Erro ao chamar método calculateMDC:', err);
      return;
    }

    console.log('Resultado do método calculateMDC:', result);
    
    const mdc = result.result;

    const aspectRatioX = x / mdc;
    const aspectRatioY = y / mdc;

    console.log("MDC:", mdc);
    console.log("Aspect Ratio:", aspectRatioX + ":" + aspectRatioY);
  });
});
