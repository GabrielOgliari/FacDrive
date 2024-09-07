<?php

namespace Routing\Core\Database;
use PDO;

class PostgresDB
{
    private string $host = 'aws-0-us-west-1.pooler.supabase.com';
    private int $port = 6543;
    private string $dbname = 'postgres';
    private string $user = 'postgres.weiginvoqhdyjibbrjux';
    private string $password = 'GaiteiroGostoso1@';

    private PDO $connection;
    private string $table;

    /**
     * @param string $table
     */
    public function setTable(string $table): void
    {
        $this->table = $table;
    }

    /**
     * @throws \Exception
     */
    public function connect(): void
    {
        $dsn = "pgsql:host={$this->host};port={$this->port};dbname={$this->dbname};user={$this->user};password={$this->password}";
        try {
            $this->connection = new PDO($dsn);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (\PDOException $e) {
            throw new \Exception('Connection failed: ' . $e->getMessage());
        }
    }

    /**
     * @return PDO
     */
    public function getConnection(): PDO
    {
        return $this->connection;
    }

    public function insert(array $values): array
    {
        $fields = array_keys($values);
        $fieldList = implode(', ', $fields);
        $placeholders = implode(', ', array_fill(0, count($values), '?'));
        $valueList = array_values($values);

        $sql = "INSERT INTO " . $this->table . " ($fieldList) VALUES ($placeholders)";
        $stmt = $this->connection->prepare($sql);
        return ['status' => $stmt->execute($valueList)];
    }

    public function getLatsID(): false|string
    {
        return $this->connection->lastInsertId();
    }

    public function update($id, array $fields, array $values): void
    {
        $fieldList = implode(', ', $fields);
        $placeholders = implode(', ', array_fill(0, count($values), '?'));

        $sql = "UPDATE " . $this->table . " SET ($fieldList) = ($placeholders) WHERE id = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute(array_merge($values, [$id]));
    }

    public function delete($id): void
    {
        $sql = "DELETE FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute([$id]);
    }

    public function select(string $fields, array $where, array $joins = []): array
    {
        $query = "SELECT {$fields} FROM {$this->table}";

        if (!empty($where)) {
            $query .= " WHERE ";
            $conditions = [];
            foreach ($where as $item) {
                $conditions[] = "{$item['column']} {$item['operator']} ?";
            }
            $query .= implode(' AND ', $conditions);
        }

        $stmt = $this->connection->prepare($query);
        $values = array_map(fn($item) => $item['value'], $where);
        $stmt->execute($values);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}
