<?php
require __DIR__ . '/../../vendor/autoload.php';

$routes = require __DIR__ . '/../PHP/Core/Router/Routes.php';

$url = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];
$data = $_REQUEST;

$rawInput = file_get_contents('php://input');
$bodyData = json_decode($rawInput, true);

$explodeUrl = explode('/', $url);
array_shift($explodeUrl);

$app = $explodeUrl[0];
$controller = $explodeUrl[1];
$controllerMethod = $explodeUrl[2];

function convertToCamelCase($string) {
    $parts = explode('-', $string);
    $camelCaseString = $parts[0];

    for ($i = 1; $i < count($parts); $i++) {
        $camelCaseString .= ucfirst($parts[$i]);
    }

    return $camelCaseString;
}

try {
    if (isset($routes[$app][$controller][$method]) && in_array($controllerMethod, $routes[$app][$controller][$method])) {
        $controller = 'Routing\\Controller\\' . ucfirst(convertToCamelCase($controller)) . 'Controller';
        $controllerMethod = convertToCamelCase($controllerMethod) . 'Action';

        if (class_exists($controller) && method_exists($controller, $controllerMethod)) {
            $controllerInstance = new $controller($bodyData);
            $response = $controllerInstance->$controllerMethod();
            echo json_encode($response);
        } else {
            throw new Error('O endpoint não existe');
        }
    } else {
        throw new Error('O endpoint não existe');
    }
} catch (Exception $exception) {
    echo json_encode(['status' => false, 'message' => $exception->getMessage()]);
}




