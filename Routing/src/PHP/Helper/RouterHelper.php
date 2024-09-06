<?php

namespace Routing\Helper;

class RouterHelper
{
    public function prepareRoutePointsArray(array $coordinates, $routeID): array
    {
        foreach ($coordinates as $key => $coordinate) {
            $coordinates[$key]['idroute'] = $routeID;
        }

        return $coordinates;
    }
}
