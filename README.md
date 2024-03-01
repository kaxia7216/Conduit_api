Laravel Sailを使用して、"Conduit"を作成しました。
前回とは違い、一部の機能をAPIバージョンにしました。

前回のリポジトリ：https://github.com/kaxia7216/Conduit

## 使用環境

- WSL2(Ubuntu)
- Docker

> [!IMPORTANT]  
> 環境構築に 'Laravel Sail' を使用していますので、起動する環境にDockerがインストールされている必要があります。  

## 起動方法

本リポジトリを任意のディレクトリにクローンします。
```
git clone https://github.com/kaxia7216/Conduit_api.git
```
conduitディレクトリに移動します。
```
cd Conduit_api/conduit_app
```

cloneした時点では、起動するためのvenderフォルダと.envファイルがないため、それぞれ作成します。

.envファイルは .env.exampleファイルをコピーして.envファイルにリネームして使用してください。
```
cp .env.example .env
```

.envファイルは、以下の設定を変更する必要があります
```
APP_DEBUG=false
APP_URL=http://localhost
DB_HOST=mysql
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=password
MEMCACHED_HOST=memcached
REDIS_HOST=redis
```

dockerコマンドでvenderフォルダを作成します
```
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs
```

sail コマンドを入力します。
```
./vender/bin/sail up -d
```

[localhost](http://localhost) でブラウザに表示することができます。