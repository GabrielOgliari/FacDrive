<?php

namespace Routing\Service;

use Routing\Exceptions\RouteExceptions;
use Routing\Repository\RoutePointsRepository;
use Routing\Repository\RouteRepository;

class RouterService
{
    private RouteRepository $routeRepository;
    private RoutePointsRepository $routePointsRepository;

    public function __construct()
    {
        $this->routePointsRepository = new RoutePointsRepository();
        $this->routeRepository = new RouteRepository();
    }

    /**
     * @throws RouteExceptions
     */
    public function saveRoute($data): bool
    {
        $response = $this->routeRepository->saveNewRoute($data['route']);
        if (!$response) {
            throw new RouteExceptions(1);
        }

        return $this->saveRoutePoints($data['routePoints'], $response);
    }

    /**
     * @throws RouteExceptions
     */
    public function saveRoutePoints($data, $routeID): bool
    {
        foreach ($data as $item) {
            $response = $this->routePointsRepository->saveRoutePoints([...$item, 'idroute' => $routeID]);
            if (!$response['status']) {
                throw new RouteExceptions(1);
            }
        }

        return true;
    }

    public function getUserRoutes($data): array
    {
        $columns = 'idroute, iduser, routename';
        $where = [];
        $where[] = ['column' => 'iduser', 'operator' => '=', 'value' => $data['iduser']];
        return $this->routeRepository->getRoutes($columns, $where);
    }

}
