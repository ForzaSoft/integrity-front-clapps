.PHONY: build start stop restart logs clean dev

dev:
	pnpm install
	pnpm dev

build:
	docker-compose build --no-cache

start:
	docker-compose up -d

stop:
	docker-compose down

restart: stop start

logs:
	docker-compose logs -f

clean:
	docker-compose down -v --remove-orphans