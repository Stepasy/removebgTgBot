import Controller from './Controller';
import StorageController from './StorageController';

export default class RegisterController extends Controller {
  init() {
    this.bot.onText(/\/register/, (message) => {
      const chatId = message.chat.id;

      this.bot.sendMessage(chatId, 'Вставь API-ключ');
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
          this.bot.sendMessage(chatId, 'Успех. Можешь пользоваться ботом. Для проверки, сколько у тебя осталось запросов, напиши /remains');
        });
      });
    });
  }
}