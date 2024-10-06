FROM php:8.2-fpm-alpine

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www/html

COPY ./composer.json /var/www/html/composer.json
COPY ./composer.lock /var/www/html/composer.lock

RUN composer install --no-dev --prefer-dist --no-scripts

COPY ./index.php /var/www/html/index.php
COPY ./src /var/www/html/src

RUN composer dump-autoload --optimize

CMD ["php", "index.php"]
