// APIs
import AwtrixAPI from "./api/awtrix.js";
import EffectService from "./api/effects.js";
import Service from "./services/index.js";

const api = new AwtrixAPI('http://192.168.0.73')

Service.init(api);

// const effectService = new EffectService(api);

// effectService.applyEffect('LookingEyes', {
//     speed: 3,
//     palette: 'Rainbow',
//     blend: true
// });
