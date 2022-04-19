import TelegramBot from 'node-telegram-bot-api';

class Bot {
  #bot;
  static #instance;

  constructor() {
    const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, {
      polling: true,
    });

    this.setBot(bot);
  }

  setBot(bot) {
    this.#bot = bot;
  }

  getBot() {
    return this.#bot;
  }

  static getInstance() {
    return Bot.#instance;
  }

  static setInstance(instance) {
    Bot.#instance = instance;
  }


  static create() {
    if (! Bot.getInstance()) {
      Bot.setInstance(new Bot());
    }

    return Bot.getInstance();
  }
}

export default Bot.create();