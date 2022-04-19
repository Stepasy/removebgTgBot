import StorageController from './StorageController';

export default class Controller {
  bot = null;

  constructor(bot) {
    this.bot = bot;
  }

  async getUserToken({ chatId, userId }, callback) {
    StorageController.getFileContent((data) => {
      if (! data[userId]) {
        this.bot.sendMessage(chatId, 'Ключ не обнаружен. Напишите /start и проследуйте инструкциям.');

        return;
      }

      callback(data[userId]);
    });
  }
}