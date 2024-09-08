<?php

namespace Routing\Controller;

use Routing\Exceptions\RouteExceptions;
use Routing\Service\RouterService;

class RouterController extends AbstractController {

    /**
     * [
     *      'route' => ['iduser' => number, 'routename' => string],
     *      'routePoints' => [[latitude: number, longitude: number], [latitude: number, longitude: number], ...]
     * ]
     *
     * @throws RouteExceptions
     */
    public function saveRouteAction(): array
    {
        $data = $this->getData();
        $routerService = new RouterService();
        return ['status' => $routerService->saveRoute($data)];
    }

    public function getUserRoutesAction(): array
    {
        $data = $this->getData();
        $routerService = new RouterService();
        return ['status' => 'true', 'response' => $routerService->getUserRoutes($data)];
    }

    public function  getRoutePointsAction(): array
    {
        $data = $this->getData();
        $routerService = new RouterService();
        return ['status' => 'true', 'response' => $routerService->getRoutePoints($data)];
    }

    public function getNearbyRoutesAction(): array
    {
        $data = $this->getData();
        $routerService = new RouterService();
        return ['status' => 'true', 'response' => $routerService->getNearbyRoutes($data)];
    }
}
