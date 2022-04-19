import StorageController from './StorageController';
import { messages } from '../lang/ua';

export default class Controller {
  bot = null;

  constructor(bot) {
    this.bot = bot;
  }

  async getUserToken({ chatId, userId }, callback) {
    StorageController.getFileContent((data) => {
      if (! data[userId]) {
        this.bot.sendMessage(chatId, messages.noToken);

        return;
      }

      callback(data[userId]);
    });
  }
}