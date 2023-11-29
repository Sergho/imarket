# imarket

### _Backend_ приложение интернет-магазина на NodeJS

## Структура проекта
+ config
  + databaseConfig.js
  + jwtSecret.js
+ controllers
  + adminController.js
  + authorizationController.js
  + customerController.js
+ middleware
  + adminMiddleware.js
  + authMiddleware.js
+ models
  + User.js
+ routers
  + adminRouter.js
  + authRouter.js
  + customerRouter.js
+ util
  + Database.js
+ index.js
+ package-lock.json
+ package.json
+ README.md

## Перед тем как запускать

Перед запуском в директории с проектом необходимо выполнить команду
```bash
$ npm i
```

Это установит зависимости для __imarket__

Более того необходимо установить дамп БД на сервере. Дамп содержится в файле `imarket.sql`. Для установки необходимо:
### Windows
1. Перейти в директорию, куда был установлен PostgreSQL. По умолчанию это `C:\Program Files\PostgreSQL\версия\bin`
2. Выполнить следующий скрипт:
   ```bash
   $ psql -U имя_пользователя -d имя_базы_данных -f путь_к_файлу.sql
   ```
   Где:
   + имя_пользователя - имя пользователя, имеющего права доступа к базе данных
   + имя_базы_данных - имя базы данных, на которую вы хотите применить дамп
   + путь_к_файлу.sql - путь к файлу `imarket.sql`
3. После этого потребуется ввести пароль администратора, и дамп будет успешно установлен

## Использование приложения

```bash
$ npm run prod
```

Это запустит сервер и позволит ему принимать и обрабатывать запросы

## Сущности и их поля

+ `User` - __пользователь__
  + `user_id*` - идентификатор __пользователя__
  + `first_name` - основное имя
  + `last_name` - фамилия
  + `mid_name` - отчество
  + `email*` - адрес электронной почты (уникальный для каждого)
  + `password_hash*` - хэш пароля
  + `role*` - __роль пользователя__ (по умолчанию `Покупатель`)

+ `Role` - __роль__ __пользователя__
  + `role_id*` - идентификатор __роли__
  + `name*` - название __роли__

+ `Product` - __товар__
  + `product_id*` - идентификатор __товара__
  + `name*` - название __товара__
  + `supplier` - __поставщик__ __товара__
  + `type` - __тип товара__
  + `price*` - цена __товара__
  + `description` - описание __товара__

+ `Supplier` - __поставщик__ __товара__
  + `supplier_id*` - идентификатор __поставщика__
  + `name*` - название __поставщика__

+ `ProductType` - __тип товара__
  + `type_id*` - идентификатор __типа товара__
  + `name*` - название __типа товара__

+ `Item` - позиция (используется в корзине и заказе)
  + `product*` - __товар__ соответствующий __позиции__
  + `amount*` - количество единиц __товара__ в позиции

+ `ShoppingCart` - __корзина__ __пользователя__
  + `owner*` - __пользователь__, которому принадлежит корзина
  + `items*` - список __позиций__ в __корзине__

## Возможные запросы

Ниже приведён список запросов для взаимодействия с __imarket__

### Для неавторизованного пользователя

+ `POST /auth/register` - регистрация (создание) __пользователя__.
  + Передача данных запроса по `POST body`
  + Данные запроса
    + `email*` - адрес электронной почты __пользователя__
    + `password*` - пароль __пользователя__
    + `firstName` - имя __пользователя__
    + `lastName` - фамилия __пользователя__
    + `midName` - отчество __пользователя__
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `user` - созданный __пользователь__

+ `POST /auth/login` - авторизация
  + Передача данных запроса по `POST body`
  + Данные запроса
    + `email*` - адрес электронной почты __пользователя__
    + `password*` - пароль __пользователя__
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `token` - __JWT__ токен для __Bearer__ авторизации

### Для покупателя (и администратора как частного его вида)

Для авторизованного покупателя токен для авторизации передается в __HTTP__ заголовке `Authorization` в формате `Bearer токен`

+ `GET /users/self` - получение данных о себе
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `user` - текущий авторизованный __пользователь__

+ `GET /products` - получение данных о всех __товарах__
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `products` - список всех __товаров__

+ `GET /products/:id` - получение данных об одном __товаре__ с идентификатором `:id`
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `product` - найденный __товар__

+ `GET /cart` - получение данных своей __корзины__
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `shopping_cart` - __корзина__ текущего авторизованного __пользователя__

+ `POST /cart` - добавление __позиции__ в свою __корзину__
  + Передача данных запроса по `POST body`
  + Данные запроса
    + `productId*` - идентификатор __товара__, который нужно добавить в __корзину__
    + `amount*` - количество единиц __товара__ в новой __позиции__
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `item` - добавленная __позиция__

+ `DELETE /cart/:id` - удаление __позиции__, который соответствует __товару__ с идентификатором `:id`, из своей __корзины__
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `item` - удалённая __позиция__

### Для администратора

Для администратора токен для авторизации передается аналогично предыдущему случаю

+ `GET /roles` - получение данных о всех __ролях__ __пользователей__
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `roles` - список всех __ролей__

+ `GET /users` - получение данных о всех __пользователях__
  + Передача данных запроса по `query string`
  + Данные запроса
    + `limit` - максимальное количество полученных __пользователей__
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `users` - список всех __пользователей__, ограниченных количеством `limit`

+ `GET /users/:id` - получение данных о об одном __пользователе__ с идентификатором `:id`
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `user` - найденный __пользователь__

+ `PUT /users/:id` - изменение данных одного __пользователя__ с идентификатором `:id`
  + Передача данных запроса по `PUT body`
  + Данные запроса
    + `firstName` - новое имя
    + `lastName` - новая фамилия
    + `midName` - новое отчество
    + `email` - новый адрес электронной почты
    + `password` - новый пароль
    + `roleId` - новый идентификатор __роли__
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `user` - изменённый __пользователь__

+ `DELETE /users/:id` - удаление __пользователя__ с идентификатором `:id`
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `user` - удалённый __пользователь__

+ `POST /products` - добавление нового __товара__
  + Передача данных запроса по `POST body`
  + Данные запроса
    + `name*` - название
    + `price*` - цена
    + `supplierId` - идентификатор __поставщика__
    + `typeId` - идентификатор __типа__ __товара__
    + `description` - описание
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `product` - созданный __товар__
  
+ `PUT /products/:id` - изменение данных одного __товара__ с идентификатором `:id`
  + Передача данных запроса по `PUT body`
  + Данные запроса
    + `name` - новое название
    + `price` - новая цена
    + `supplierId` - новый идентификатор __поставщика__
    + `typeId` - новый идентификатор __типа__ __товара__
    + `description` - новое описание
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `product` - изменённый __товар__

+ `DELETE /products/:id` - удаление __товара__ с идентификатором `:id`
  + Данные ответа
    + `message` - краткий ответ на запрос
    + `product` - удалённый __товар__

## Используемые технологии
+ [NodeJS](https://nodejs.org/en)
  + [express](https://www.npmjs.com/package/express) - библиотека для создания __HTTP__ сервера
  + [bcrypt](https://www.npmjs.com/package/bcrypt) - библиотека шифрования паролей
  + [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - библиотека для работы с __JWT__ токенами
  + [pg](https://www.npmjs.com/package/pg) - библиотека для отправки запросов к БД __PostgreSQL__
  + [nodemon](https://www.npmjs.com/package/nodemon) - библиотека для автоматического перезапуска сервера (используется при разработке)
+ [PostgreSQL](https://www.postgresql.org/) - реляционная СУБД
+ [JSON](https://ru.wikipedia.org/wiki/JSON) - формат передачи данных

## Директория `config`

+ ### `config/databaseConfig.js`
Содержит данные для корректного подключения к базе данных PostgreSQL
+ ### `config/jwtSecret.js`
Содержит в поле `secret` значение секретного ключа для формирования __JWT__ токена

## __MVC__ в __imarket__
__imarket__ реализует паттерн __MVC__, однако передача данных клиенту осуществляется в формате __JSON__, поэтому __imarket__ не имеет _представлений_ как таковых. Доказательством разработки по паттерну __MVC__ служат директории `controllers`, `models`

## Директория `controllers`

Содержит контроллеры (__MVC__)

+ ### `controllers/authorizationController.js`
Представляет контроллер для обработки запросов неавторизованных пользователей
+ ### `controllers/customerController.js`
Представляет контроллер для обработки запросов покупателей (в том числе и администраторов)
+ ### `controllers/adminController.js`
Представляет контроллер для обработки запросов администраторов

## Директория `models`

Содержит модели (__MVC__)

+ ### `models/User.js`
Представляет модель с методами для получения, изменения и удаления данных, связанных с __пользователем__

+ ### `models/Product.js`
Представляет модель с методами для получения, изменения и удаления данных, связанных с __товаром__

## Директория `routers`

Содержит роутеры с роутами для отдельных случаев авторизации

+ ### `router/authRouter.js`
Представляет роуты для неавторизованного пользователя
+ ### `routers/customerRouter.js`
Представляет роуты для авторизованного покупателя (в том числе и администраторов)
+ ### `routers/adminRouter.js`
Представляет роуты для администратора

## Директория `middleware`

Содержит ПО промежуточного уровня для отслеживания роли текущего авторизированного (или нет) пользователя

+ ### `middleware/authMiddleware.js`
Осуществляет проверку запроса на авторизацию
+ ### `routers/adminMiddleware.js`
Осуществляет проверку роли авторизованного пользователя на соответствие роли `Администратор`

## Незаконченный функционал

В скором времени планируется добавить обработку запросов связанных с:

+ Корзиной покупателя
+ Заказами