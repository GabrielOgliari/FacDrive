<?php

namespace Routing\Controller;

use Routing\Core\Database\PostgresDB;

abstract class AbstractController {
    private ?array $data;

    public function __construct(?array $data = [])
    {
        $this->data = $data;
    }

    public function getData(): array
    {
        return $this->data;
    }
}
