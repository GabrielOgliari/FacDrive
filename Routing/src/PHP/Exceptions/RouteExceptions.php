<?php
namespace Routing\Exceptions;

use Exception;

class RouteExceptions extends Exception {
    private static array $errorMessages = [
        1 => 'Ocorreu uma erro ao tentar salvar os dados!',
    ];

    public function __construct($code) {
        $message = self::$errorMessages[$code] ?? 'Erro desconhecido.';
        parent::__construct($message, $code);
    }
}
