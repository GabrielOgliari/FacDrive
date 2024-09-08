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

    public function getRoutePoints($data): array
    {
        $columns = 'idroutepoints, idroute, longitude, latitude';
        $where = [];
        $where[] = ['column' => 'idroute', 'operator' => '=', 'value' => $data['idroute']];
        return $this->routePointsRepository->getRoutePoints($columns, $where);
    }

    public function getNearbyRoutes($data): array
    {
        $userID = $data['userID'];
        $coordinates = ['latitude' => $data['latitude'], 'longitude' => $data['longitude']];
        $distance = $this->sqlToCalculateDistanceInMeters($coordinates);

        $columns = "route.idroute, route.iduser, route.routename,
               routepoints.idroutepoints,
               CAST(routepoints.latitude AS numeric) AS latitude,
               CAST(routepoints.longitude AS numeric) AS longitude,
               {$distance} AS distance";
        $join = [
            ['type' => "JOIN", 'table' => 'routepoints', 'V1' => 'route.idroute', 'operator' => '=', 'V2' => 'routepoints.idroute']
        ];
        $where = [
            ['column' => 'route.iduser', 'operator' => '!=', 'value' => $userID]
        ];
        $groupBy = "route.idroute, route.iduser, route.routename, routepoints.idroutepoints, routepoints.latitude, routepoints.longitude";
        $having = "{$distance} < 50";
        $orderBy = 'distance ASC';
        $limit = '1';

        return $this->routeRepository->getRoutes($columns, $where, $join, $having, $orderBy, $limit, $groupBy);
    }

    private function sqlToCalculateDistanceInMeters($coordinates): string
    {
        return "(
                   6371000 * acos(
                           cos(radians({$coordinates['latitude']})) * cos(radians(CAST(routepoints.latitude AS numeric))) *
                           cos(radians(CAST(routepoints.longitude AS numeric)) - radians({$coordinates['longitude']})) +
                           sin(radians({$coordinates['latitude']})) * sin(radians(CAST(routepoints.latitude AS numeric)))
                             )
               )";
    }

}
