<?php

namespace Routing\Repository;

use Routing\Core\Database\PostgresDB;

class RoutePointsRepository extends AbstractRepository
{
    const TABLE = 'routepoints';
    private PostgresDB $db;

    public function __construct()
    {
        parent::__construct(self::TABLE);
        $this->db = $this->getDb();
    }

    public function saveRoutePoints($data): array
    {
        return $this->db->insert($data);
    }

    public function getRoutePoints(string $columns, array $where, array $join = [], string $having = '', string $orderBy = '', string $limit = ''): array
    {
        return $this->db->select($columns, $where, $join, $having, $orderBy, $limit);
    }
}
