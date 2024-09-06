<?php

namespace Routing\Repository;

use Routing\Repository\AbstractRepository;

class RouteRepository extends AbstractRepository
{
    const TABLE =  'route';
    public function __construct()
    {
        parent::__construct(self::TABLE);
    }

    public function saveNewRoute($values): array
    {
        return $this->getDb()->insert($values);
    }
}
