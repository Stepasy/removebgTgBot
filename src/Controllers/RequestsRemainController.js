import Controller from './Controller';
import axios from 'axios';
import { messages } from '../lang/ua';

export default class RequestsRemainController extends Controller {
  init() {
    this.bot.onText(/\/remains/, async (message) => {
      const chatId = message.chat.id;
      const userId = message.from.id;

      this.getUserToken({ chatId, userId }, async (userApiToken) => {
        try {
          const removeBgResponse = await axios({
            method: 'get',
            url: 'https://api.remove.bg/v1.0/account',
            headers: {
              'X-Api-Key': userApiToken,
            },
          });

          const requestsAmount = removeBgResponse.data.data.attributes.api.free_calls;

          await this.bot.sendMessage(chatId, messages.requestRemains.replace(':requestsAmount', requestsAmount));
        } catch (e) {
          if (e.response.status === 403) {
            await this.bot.sendMessage(chatId, messages.invalidToken);

            return;
          }

          const errorsArray = e.response.data.errors.map(error => `${error.title}: ${error.code}`);

          await this.bot.sendMessage(chatId, messages.requestError.replace(':error', errorsArray.join('. ')));
        }
      });
    });
  }
}