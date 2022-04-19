import Controller from './Controller';

export default class StartController extends Controller {
  init() {
    this.bot.onText(/\/start/, async (message) => {
      const chatId = message.chat.id;

      await this.bot.sendMessage(chatId, 'Создай акканут в сервисе removebg - https://accounts.kaleido.ai/users/sign_in#api-key, затем получи API ключ - https://www.remove.bg/dashboard#api-key, скопируй его, напиши мне /register и следуй инструкциям');
    });
  }
}