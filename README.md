# Documents-frontend
Система управления документацией информационных систем (клиентская часть).

Приложение позволяет создавать шаблоны для документов (набор полей с ограничениями на заполняемые данные), создавать документы и печатать их в PDF с помощью
добавленных html печатных форм. Аутентификации нет т.к. предполагалось использовать встроенную аутентификацию компании (но информации по ней я не получил).

Серверная часть приложения [здесь](https://github.com/IliaTrofimov/Documents-backend). 

---
## Структура проекта
* **src/** - main.ts, index.html глобальные стили и настройки
    * app/**configurations/** - отдельный сервис для загрузки настроек из файла и выдачи информации приложению;
    * app/**components/** - все контроллеры и модули для работы с ними;
        * **dictionaries/** - вспомогательные таблицы (списки пользователей, должности и т.д.);
        * **documents/** - documents-list и document-view;
        * **shared-items/** - мелкие контроллеры, которые обычно встраиваются в другие;
        * **templates/** - templates-list и template-view;
    * app/**interceptors/** - HTTP перехватчики (перехватчик критических ошибок и перехватчик для установки заголовков запросов);
    * app/**models/** - сущности;
    * app/**pipes/** - pipe'ы;
    * app/**services/** - все сервисы;
        * *alert.service* - вывод окон с уведомлениями (а-ля Snackbar);
        * *documents.service* -
        * *templates.service* -
        * *signatories.service* -
        * *template-types.service* -
        * *users.service* -
        * *positions.service* - все сервисы для работы с сущностями;
        * *validation.service* - сервис для валидации полей в документе;
        * *errors.service* - сервис для хранения последних ошибок, нужен для правильной работы страницы с информацией об ошибках.

## Маршрутизация
* **frontend/** - корень
    * documents/{id} - список документов/просмотр документа
    * templates/{id} - список шаблонов/просмотр шаблона
    * **dictionaries/** - выбор вспомогательный таблицы
        * users/ - список пользователей
        * positions/ - список должностей
        * templatetypes/ - список типов шаблонов
    * homepage/ - домашняя страница текущего пользователя
    * error/ - страница для вывода информации об ошибках
        
## Настройки
**src/config.json** - файл с настройками. Здесь всё очевидно, есть только дополнительное поле с адресом локального сревера, чтобы можно было быстро его находить.

**src/web.config** - настройки для IIS для правильной маршрутизации. В поле `<action type="Rewrite" url="/frontend/" /> ` значение *frontend* должно соотвествовать названию приложения фронтенда в IIS и должно совпадать с `<base href="/frontend/">` в dist/index.html в собранном приложении.

**shared-items/debug.components.ts** - контроллер для выдачи информации о сборке, текущем пользователе, url бекенда. Можно удалить.

## Сборка
`ng build --base-href /frontend/` - для сборки. Здесь `base-href` задаст тот адрес, о котором говорилось выше в **web.config**. 
