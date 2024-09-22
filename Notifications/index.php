<?php
error_reporting(E_ALL & ~E_DEPRECATED); //remover erros de depracated no terminal


use Notifications\NotificationsWebsocket;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;

require __DIR__ . '/vendor/autoload.php';

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new NotificationsWebsocket()
        )
    ),
    9001
);

$server->run();