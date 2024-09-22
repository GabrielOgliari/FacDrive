FROM php:8.2-fpm-alpine

RUN apk add --no-cache curl git unzip postgresql-dev

RUN docker-php-ext-install pdo pdo_pgsql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

COPY ../composer.json /var/www/html/composer.json
COPY ../composer.lock /var/www/html/composer.lock
RUN composer install --no-dev --prefer-dist --no-scripts

COPY ../src/PHP /var/www/html/src/PHP

RUN composer dump-autoload --optimize

CMD ["php-fpm"]
