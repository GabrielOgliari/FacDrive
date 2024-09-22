<?php

namespace Notifications;

use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class NotificationsWebsocket implements MessageComponentInterface {
    protected array $userConnections;

    public function __construct() {
        $this->userConnections = [];
    }

    public function onOpen(ConnectionInterface $conn) {
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);

        if (isset($data['type']) && $data['type'] === 'register') {
            if (isset($this->userConnections[$data['userId']])) {
                echo "User {$data['userId']} is already connected. Disconnecting previous connection.\n";
                $this->userConnections[$data['userId']]->close();
            }
            $this->associateUserWithConnection($data['userId'], $from);
            echo "User registered: {$data['userId']}\n";
        } else {
            $recipientId = $data['recipientId'] ?? null;
            $message = $data['data'] ?? null;

            if ($recipientId && $message && isset($this->userConnections[$recipientId])) {
                $this->userConnections[$recipientId]->send(json_encode($message));
            } else {
                echo "User {$recipientId} not connected or invalid message format\n";
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        foreach ($this->userConnections as $userId => $userConn) {
            if ($userConn === $conn) {
                unset($this->userConnections[$userId]);
                echo "User {$userId} has disconnected\n";
            }
        }

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }

    public function associateUserWithConnection($userId, ConnectionInterface $conn) {
        $this->userConnections[$userId] = $conn;
    }
}
