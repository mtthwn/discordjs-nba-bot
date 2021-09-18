SHELL = bash

run-dev:
	node dist/index.js

deploy-commands:
	node dist/deploy-commands.js

build-dist:
	./node_modules/typescript/bin/tsc
