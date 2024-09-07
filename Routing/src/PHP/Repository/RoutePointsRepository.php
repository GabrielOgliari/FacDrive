<?php

namespace Routing\Repository;

class RoutePointsRepository extends AbstractRepository
{
    const TABLE = 'routepoints';
    public function __construct()
    {
        parent::__construct(self::TABLE);
    }

    public function saveRoutePoints($data): array
    {
        return $this->getDb()->insert($data);
    }
}
