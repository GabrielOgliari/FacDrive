<?php
return [
    'facdrive' => [
        'Routing\Controller\RouterController' => [
            'GET' => [
                'getUserRoutesAction',
                'getRoutePointsAction',
                'getNearbyRoutesAction'
            ],
            'POST' => [
                'saveRouteAction'
            ],
            'PUT' => [

            ],
            'DELETE' => [

            ]
        ]
    ]
];
