FROM node:lts-alpine

# カレントワーキングディレクトリとして '/usr/src/app' フォルダを指定する
WORKDIR /usr/src/app

# `package.json` と `package-lock.json` （あれば）を両方コピーする
COPY package*.json ./

# プロジェクトの依存ライブラリをインストールする
RUN yarn add global @vue/cli && \
  yarn

# カレントワーキングディレクトリ(つまり 'app' フォルダ)にプロジェクトのファイルやフォルダをコピーする
COPY . .

RUN yarn build