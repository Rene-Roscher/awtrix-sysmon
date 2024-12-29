const AwtrixAPI = require('./api/awtrix.js');
const Service = require('./services/index.js');

const api = new AwtrixAPI('http://192.168.0.73')

Service.init(api);
