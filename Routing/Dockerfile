FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql

RUN a2enmod rewrite

# Copiar os arquivos e pastas especificados
COPY src/PHP /var/www/html/src/PHP
COPY vendor /var/www/html/vendor
COPY .htaccess /var/www/html/.htaccess
COPY composer.json /var/www/html/composer.json
COPY composer.lock /var/www/html/composer.lock

EXPOSE 80
