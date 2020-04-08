# news-exploter-api

## Бэкенд для сервиса новостей

### Описание проекта

Проект по созданию сервера для новостного сервиса на основе фреймворка Express.js. На сервере хранятся данные зарегистрированных пользователей, а так же сохранненные ими статьи
Сервер доступен по адреcам: https://api.igrek-news.tk/ || http://api.igrek-news.tk/
Установлен SSL-сертификат, выданный Let's Encrypt

### Примеры запросов в JSON-формате:

- запрос POST /singup создает нового пользователя. Обязательные поля: name, email, password

```
{
  "name": "Иван",
  "email": "ivan.ivanov@yandex.ru",
  "12345678"
}
```

- запрос POST /singin авторизация пользователя. Обязательные поля: email, password

```
{
  "email": "ivan.ivanov@yandex.ru",
  "12345678"
}
```

- запрос GET /users/me возвращает информацию об авторизованном пользователе (name, email, id)

- запрос POST /articles создаёт статью. Обязательные поля: keyword, title, text, date, source, link и image

```
{
  "keyword": "новости",
  "title": "новость",
  "text": "что то о чем то",
  "date": "08.04.2020",
  "source": "ИгрекНьюс",
  "link": "https://igrek-news.tk/",
  "image": "https://avatarko.ru/img/kartinka/14/igra_Diablo_13268.jpg",
}
```

- запрос GET /articles возвращает статьи, сохраненные авторизированным пользователем

- запрос DELETE /articles/:articleId удаляет сохранённую статью по _id;



### Локальный запуск

- `git clone https://github.com/igrek83/news-exploter-api.git` - клонируем репозиторий
- `npm install` - устанавливаем все необходимые пакеты
- Установить MongoDB
- `mongod` - запускаем базу данных
- `npm run dev` - режим разработки с поддержкой Hot reload
- `npm run start` - 'боевой' режим
оба режима работают на 3000 порте
