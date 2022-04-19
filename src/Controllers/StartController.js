import Controller from './Controller';
import { messages } from '../lang/ua';

export default class StartController extends Controller {
  init() {
    this.bot.onText(/\/start/, async (message) => {
      const chatId = message.chat.id;

      await this.bot.sendMessage(chatId, messages.startMessage);
    });
  }
}