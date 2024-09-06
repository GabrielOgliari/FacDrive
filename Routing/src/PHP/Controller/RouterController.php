<?php

namespace Routing\Controller;

use Routing\Service\RouterService;

class RouterController extends AbstractController {

    public function saveRouteAction()
    {
        $data = $this->getData();
        $routerService = new RouterService();
        return ['status' => $routerService->saveRoute($data)];
    }
}
