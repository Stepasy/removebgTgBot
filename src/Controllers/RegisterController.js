import Controller from './Controller';
import StorageController from './StorageController';
import { messages } from '../lang/ua';

export default class RegisterController extends Controller {
  init() {
    this.bot.onText(/\/register/, (message) => {
      const chatId = message.chat.id;

      this.bot.sendMessage(chatId, messages.registerStart);
    });

    this.bot.on('message', async (message) => {
      if (message.text?.length !== 24) {
        return;
      }

      const chatId = message.chat.id;

      const userId = message.from.id;
      const apiToken = message.text;

      StorageController.getFileContent((data) => {
        data[userId] = apiToken;

        StorageController.setFileContent(data, () => {
          this.bot.sendMessage(chatId, messages.registerSuccess);
        });
      });
    });
  }
}