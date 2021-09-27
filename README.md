# NBA-bot

A bot for querying for NBA stats

## Commands

### Player game stats

`/nba-player-stats game-stats`

Required fields

- `player_name`: The full name of the player you are searching for
- `date`: The date of the game in YYYY-MM-DD format

### Player season averages

`/nba-player-stats season-stats`

Requred fields:

- `player_name`: The full name of the player you are searching for
- `season`: The year that the season started in

## Running the bot

### Tech stack

- NodeJS v16

### Getting started

Installing dependencies and proper Node version:

```sh
nvm install && nvm use
npm ci
```

### Starting the bot

Please ensure that you have populated the environment variables as exemplified in the `.env.example` file prior to running the bot.

Build the JS library:

```sh
make build-dist
```

Run the bot:

```sh
make run-dev
```
