import FormData from 'form-data';
import axios from 'axios';
import Controller from './Controller';
import { messages } from '../lang/ua';

export default class PhotoProcessing extends Controller {
  message = null;
  chatId = null;
  userId = null;

  init() {
    this.bot.on('photo', (message) => {
      this.message = message;
      this.chatId = message.chat.id;
      this.userId = message.from.id;

      this.getUserToken({ chatId: this.chatId, userId: this.userId }, async (userApiToken) => {
        const file = await this.bot.getFile(message.photo[message.photo.length - 1].file_id);

        const imageUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_API_TOKEN}/${file.file_path}`;

        const data = new FormData();

        data.append('size', 'auto');
        data.append('image_url', imageUrl);

        try {
          const removeBgResponse = await axios({
            method: 'post',
            url: 'https://api.remove.bg/v1.0/removebg',
            data,
            responseType: 'arraybuffer',
            headers: {
              ...data.getHeaders(),
              'X-Api-Key': userApiToken,
            },
            encoding: null,
          });

          await this.bot.sendPhoto(this.chatId, removeBgResponse.data);
        } catch (e) {
          if (e.response.status === 403) {
            await this.bot.sendMessage(this.chatId, messages.invalidToken);

            return;
          }

          const errorsArray = e.response.data.errors.map(error => `${error.title}: ${error.code}`);

          await this.bot.sendMessage(this.chatId, messages.requestError.replace(':error', errorsArray.join('. ')));
        }
      });
    });
  }
}