<?php

namespace Routing\Core\Router;

class Router
{
    private string $url;
    private string $method;
    private string $app;
    private string $controller;
    private string $action;
    private array $data = [];
    private array $routes;

    public function __construct()
    {
        $this->url = $_SERVER['REQUEST_URI'] ?? '/';
        $this->method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $this->routes = require __DIR__ . '/routes.php';
        $this->setVariables();
    }

    private function setVariables(): void
    {
        $parsedUrl = $this->parseUrl($this->url);

        $this->setApp($parsedUrl[0] ?? '');
        $this->setController($parsedUrl[1] ?? '');
        $this->setAction($parsedUrl[2] ?? '');
        $this->setData();
    }

    private function setApp(string $app): void
    {
        $this->app = $app;
    }

    private function setAction(string $action): void
    {
        $this->action = $this->convertToCamelCase($action) . 'Action';
    }

    private function setController(string $controller): void
    {
        $this->controller = 'Routing\\Controller\\' . ucfirst($this->convertToCamelCase($controller)) . 'Controller';
    }

    private function setData(): void
    {
        if ($this->method === 'GET') {
            $this->data = $this->getQueryParams();
        } else {
            $this->data = $this->getBody();
        }
    }

    public function start(): void
    {
        if ($this->isValidRoute()) {
            if (class_exists($this->controller) && method_exists($this->controller, $this->action)) {
                $controllerInstance = new $this->controller($this->data);
                $response = $controllerInstance->{$this->action}();
                echo json_encode($response);
            } else {
                throw new \Exception('O endpoint não existe');
            }
        } else {
            throw new \Exception('Rota não encontrada');
        }
    }

    private function isValidRoute(): bool
    {
        return isset($this->routes[$this->app][$this->controller][$this->method])
            && in_array($this->action, $this->routes[$this->app][$this->controller][$this->method]);
    }

    private function getQueryParams(): array
    {
        return $_GET ?? [];
    }

    private function getBody(): array
    {
        $body = file_get_contents('php://input');
        return json_decode($body, true) ?? [];
    }

    private function convertToCamelCase(string $string): string
    {
        $parts = explode('-', $string);
        $camelCaseString = array_shift($parts);

        foreach ($parts as $part) {
            $camelCaseString .= ucfirst($part);
        }

        return $camelCaseString;
    }

    private function parseUrl(string $url): array
    {
        $url = parse_url($url, PHP_URL_PATH);
        return explode('/', trim($url, '/'));
    }
}
