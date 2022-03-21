# Configuração do ambiente
## Clone repo
git clone <REPO_NAME>

## Install packages
yarn

## Run application
yarn start

## Production Bundle
yarn build


### Git info
name: Node - SSH deploy

Controls when the action will run.
on:
    # Triggers the workflow on push or pull request events but only for the master branch
    push:
        branches: [main]
    pull_request:
        branches: [main]

jobs:
    SFTP-deploy:
        name: 🎉 Deploy
        runs-on: ubuntu-latest

        steps:
            - name: 🚚 Get latest code
              uses: actions/checkout@v2

            - name: Use Node.js 16
              uses: actions/setup-node@v2-beta
              with:
                  node-version: '16'

            - name: 🔨 Build Project
              run: |
                  yarn
                  yarn build

            - name: 📂 Deploy to Server
              uses: easingthemes/ssh-deploy@v2.1.5
              env:
                  SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}
                  # ARGS: "-rltgoDzvO --delete"
                  SOURCE: 'build/'
                  REMOTE_HOST: 192.34.62.123
                  REMOTE_USER: berry
                  TARGET: public_html/free
                  EXCLUDE: '/dist/, /node_modules/'
