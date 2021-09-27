SHELL = bash

run-dev:
	npx nodemon dist/index.js

deploy-commands:
	node dist/deploy-commands.js

build-dist:
	./node_modules/typescript/bin/tsc --watch
