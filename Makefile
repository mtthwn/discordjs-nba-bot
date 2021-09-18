SHELL = bash

run-dev:
	./node_modules/typescript/bin/tsc && node dist/index.js

deploy-commands:
	node dist/deploy-commands.js

build-dist:
	./node_modules/typescript/bin/tsc
