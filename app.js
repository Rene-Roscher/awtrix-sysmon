// APIs
const AwtrixAPI = require('./api/awtrix.js');
const EffectService = require('./api/effects.js');
const Service = require('./services/index.js');

const api = new AwtrixAPI('http://192.168.0.73')

Service.init(api);

// const effectService = new EffectService(api);

// effectService.applyEffect('LookingEyes', {
//     speed: 3,
//     palette: 'Rainbow',
//     blend: true
// });
