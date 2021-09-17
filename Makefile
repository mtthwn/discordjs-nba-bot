SHELL = bash

node_version := $(shell sh -c "cat .nvmrc | awk '{\$$1=\$$1};1'")

run-dev:
	node index.js

run-deploy-commands:
	node deploy-commands.js