import Bot from '../components/Bot';

import PhotoProcessing from './PhotoProcessing';
import StartController from './StartController';
import RegisterController from './RegisterController';
import RequestsRemainController from './RequestsRemainController';

class AppController {
  static #instance = null;

  static create() {
    if (! this.#instance) {
      this.#instance = new AppController();
    }

    return this.#instance;
  }

  init() {
    const bot = Bot.getBot();

    (new PhotoProcessing(bot)).init();
    (new StartController(bot)).init();
    (new RegisterController(bot)).init();
    (new RequestsRemainController(bot)).init();
  }
}

export default AppController.create();