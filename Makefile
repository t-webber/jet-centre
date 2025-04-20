COMPOSE := docker compose
EXEC := docker exec

dev:
	$(COMPOSE) up --build

build:
	$(COMPOSE) -f docker-compose.yml build

studio:
	$(EXEC) app-dev npm run prisma:studio

seed: reset_db
	$(EXEC) app-dev npm run prisma:seed_raw dev

seed-prod: reset_db
	$(EXEC) app-dev npm run prisma:seed_raw prod

reset_db:
	$(EXEC) app-dev npx prisma db push --force-reset

stop:
	$(COMPOSE) down

build-prod:
	$(COMPOSE) -f docker-compose.prod.yml build

run-prod:
	$(COMPOSE) -f docker-compose.prod.yml up -d

stop-prod:
	$(COMPOSE) -f docker-compose.prod.yml down

.PHONY: build dev studio seed reset_db stop build-prod run-prod stop-prod
