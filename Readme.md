<h1>ЛИЧНЫЙ КАБИНЕТ СТАЖЕРА</h1>
<h2>Сервис, разработанный для ООО НПЦ "РИЦ"</h2>
<p>Сервис предоставляет функционал для контроля за проектами и проведения планирования по задачам</p>
<h3>Стек разработки:</h3>
<ul>
    <li>Django - Серверная часть приложения;</li>
    <li>React.js - Клиентская часть приложения;</li>
    <li>PostgreSQL - База данных;</li>
    <li>Docker - контейнеризация всего сервиса.</li>
</ul>
<h3>Запуск приложения:</h3>
<ul>
    <li><b>git clone</b> https://github.com/sxkxixx/uralintern-deploy.git</li>
    <li>cd uralintern-deploy/</li>
    <li>Создайте файл .env в корневой директории и укажите необходимые параметры *</li>
    <li>В директории Uralintern_2023_front-end/ создайте файл .env **</li>
    <li>Запустите в терминале команду <b>docker-compose up --build</b></li>
    <li>После запуска контейнеров зайдите в контейнер с Django с помощью команды <b>docker exec -it "ID контейнера" sh</b></li>
    <li>Выполните команды python manage.py makemigrations, python manage.py migrate, python manage.py createsuperuser</li>
    <li>В админке приложения создайте неободимые поля для моделей "Группы", "Роли", "Статусы задач"</li>
</ul>

<h3>* - Параметры ./.env</h3>
<p>SECRET_KEY,<br/> DEBUG,<br/> ALLOWED_HOSTS,<br/> SQL_NAME,<br/> SQL_USER,<br/> SQL_PASSWORD,<br/> SQL_HOST,<br/> SQL_PORT,<br/> EMAIL_HOST_USER,<br/> EMAIL_HOST_PASSWORD,<br/> PRIMARY_HOST</p>
<h3>** - Параметры ./Uralintern_2023_front-end/.env</h3>
<p>REACT_APP_API_URL</p>
