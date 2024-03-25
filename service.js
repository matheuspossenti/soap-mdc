const http = require('http');
const soap = require('soap');
const fs = require('fs');

const service = {
  MDC_Service: {
    MDC_Port: {
      calculateMDC: function(args) {
        console.log('Recebendo solicitação calculateMDC:', args);
        const x = args.x;
        const y = args.y;
        const result = mdc(x, y);
        console.log('MDC calculado:', result);
        return {
          result: result
        };
      }
    }
  }
};

const xml = fs.readFileSync('mdc.wsdl', 'utf8');

const server = http.createServer(function(req, res) {
  res.end('404: Not Found: ' + req.url);
});

server.listen(8000);
soap.listen(server, '/mdc', service, xml);

console.log('SOAP server running at http://localhost:8000/mdc?wsdl');

function mdc(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
