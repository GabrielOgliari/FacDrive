<?php

namespace Routing\Repository;

use Routing\Core\Database\PostgresDB;
use Routing\Repository\AbstractRepository;

class RouteRepository extends AbstractRepository
{
    const TABLE =  'route';
    private PostgresDB $db;

    public function __construct()
    {
        parent::__construct(self::TABLE);
        $this->db = $this->getDb();
    }

    public function saveNewRoute($values): false|string
    {
        $this->db->insert($values);
        return $this->db->getLatsID();
    }

    public function getRoutes(string $columns, array $where, array $join = [], string $having = '', string $orderBy = '', string $limit = '', string $groupBy = ''): array
    {
        return $this->db->select($columns, $where, $join, $having, $orderBy, $limit, $groupBy);
    }
}
