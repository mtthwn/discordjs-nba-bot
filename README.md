# NBA-bot

A bot for querying for NBA stats

## Features

- `/nba-player-stats game-stats` - search for a player's stats for a specific game
- `/nba-player-stats season-stats` - search for a player's regular season averages

## Tech stack

- NodeJS v16

## Getting started

Installing dependencies and proper Node version:

```sh
nvm install && nvm use
npm ci
```

## Running the project

Please ensure that you have populated the environment variables as exemplified in the `.env.example` file prior to running the bot.

```sh
make run-dev // build dist and runs the bot
```
