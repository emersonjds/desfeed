// QR do slide de prova viva. A URL vive aqui e em nenhum outro lugar: quando o deploy mudar,
// troque esta linha e rode `node gerar-qr.js`.
const URL_DEMO = process.env.MEMFEED_DEMO_URL ?? 'https://memfeed.app';

const qrcode = require('../../../memfeed-web/node_modules/qrcode');

qrcode.toFile('img/qr-demo.png', URL_DEMO, {
  width: 620,
  margin: 1,
  color: { dark: '#0f131d', light: '#ffffff' },
}).then(() => console.log(`qr gerado para ${URL_DEMO}`));
