# ToDo List App

## Overview / Обзор

A fullstack ToDo list application built for an interview test. Features a clean UI, admin login, task management, sorting, pagination, and Dockerized deployment. 

Полноценное приложение-задачник для тестового задания. Чистый интерфейс, вход для администратора, управление задачами, сортировка, пагинация и деплой через Docker.

---

## Features / Функционал
- Public task creation (username, email, description)
- Task list with sorting (username, email, status)
- Pagination (3 tasks per page)
- Admin login (`admin` / `123`)
- Admin can edit tasks and mark as done
- Badges for completed/edited tasks
- XSS protection, validation, error feedback
- Dockerized for dev and prod

---

## Stack / Стек
- **Backend:** Node.js, Express, TypeORM, PostgreSQL, JWT, class-validator, Docker
- **Frontend:** React, Redux Toolkit, TypeScript, Tailwind CSS, Vite, Docker

---

## Admin Credentials / Данные администратора
- **Username / Логин:** `admin`
- **Password / Пароль:** `123`

---

## Running Locally / Запуск локально

### Development Mode / Режим разработки
- Hot reload, for local development
- Горячая перезагрузка для разработки

```sh
docker compose --profile dev -f docker/docker-compose.yml up --build
```
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

### Production Mode / Продакшн режим
- Optimized static build, for review/testing
- Оптимизированная сборка для проверки

```sh
docker compose --profile prod -f docker/docker-compose.yml up --build
```
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

---

## Troubleshooting / Решение проблем
- If admin login fails, delete the admin user from the DB and restart backend:
  - Если не работает вход администратора, удалите пользователя `admin` из БД и перезапустите backend:

```sh
docker compose -f docker/docker-compose.yml exec db psql -U postgres -d todo -c "DELETE FROM \"user\" WHERE username = 'admin';"
docker compose --profile dev -f docker/docker-compose.yml restart backend-dev
```

---

## Submission Checklist / Чеклист сдачи
- [x] All requirements from the test prompt are met
- [x] Admin login: `admin` / `123`
- [x] All features work in both dev and prod
- [x] Code is clean, no commented/debug code
- [x] README is clear (English & Russian)

---

## Project Structure / Структура проекта
- `frontend/` — React app (Vite, Redux, Tailwind)
- `backend/` — Express API (TypeORM, PostgreSQL)
- `docker/` — Docker Compose configs

---

## Contacts / Контакты
If you have any questions, feel free to contact me!
Если возникнут вопросы — пишите, всегда рад помочь! 