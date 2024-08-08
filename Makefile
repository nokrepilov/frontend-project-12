install:
	npm ci

build:
	rm -rf frontend/build
	npm run build

develop:
	make start-backend & make start-frontend

start-frontend:
	cd frontend && npm start

start-backend:
	npx start-server

start:
	npx start-server -s ./frontend/build

lint-frontend:
	cd frontend && npx eslint --fix .
