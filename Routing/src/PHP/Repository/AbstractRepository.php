<?php

namespace Routing\Repository;

use Routing\Core\Database\PostgresDB;

abstract class AbstractRepository {
    private PostgresDB $db;

    /**
     * @throws \Exception
     */
    public function __construct(string $tableName)
    {
        $this->db = new PostgresDB($tableName);
        $this->db->connect();
    }

    /**
     * @return PostgresDB
     */
    public function getDb(): PostgresDB
    {
        return $this->db;
    }
}
