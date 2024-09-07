<?php

use Routing\Core\Router\Router;

require __DIR__ . '/../../vendor/autoload.php';

$router = new Router();

try {
    $router->start();
} catch (Exception $exception) {
    echo json_encode([
        'status' => false,
        'message' => $exception->getMessage()
    ]);
}
