FROM node:lts-alpine

# カレントワーキングディレクトリとして '/usr/src/app' フォルダを指定する
WORKDIR /usr/src/app

# `package.json` と `yarn.lock` を両方コピーする
COPY package.json .

COPY yarn.lock .

# プロジェクトの依存ライブラリをインストールする
RUN yarn add global @vue/cli && \
  yarn

# カレントワーキングディレクトリ(つまり 'app' フォルダ)にプロジェクトのファイルやフォルダをコピーする
COPY . .

RUN yarn build