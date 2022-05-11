/*
0 = empty
1 = platform
left
right
up
down
base
*/

G.A.D = {
    T: {
        "test": {
            "track": [
                [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1],
                [ 0 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 1 , 0 , 1 , 1 , 1],
                [ 0 , 1 ,'r','r','r','d', 1 , 0 , 0 , 1 ,'r','r','b'],
                [ 0 , 1 , 1 , 1 , 1 ,'d', 1 , 1 , 0 , 1 ,'u', 1 ],
                [ 0 , 0 , 1 ,'d','l','l', 1 , 0 , 1 , 1 ,'u', 1 ],
                [ 0 , 0 , 1 ,'d', 1 , 1 , 1 , 1 , 1 , 1 ,'u', 1 ],
                [ 0 , 0 , 0 ,'r','r','r','r','r','r','r','u'],
                [ 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]
            ],
            "paths": [
                [
                    [2, 2],
                    [3, 2]
                ]
            ],
            "locations": [
                {
                    "type": "spawn",
                    "pos": [2, 2]
                },
                {
                    "type": "base",
                    "pos": [12, 2]
                }
            ]
        }
    }
};

G.A.E = {
    basic: new EnemyPrototype("basic", "basic", [32, 32], "enemy-basic", 5, 1, 1)
};

loadMap(G.A.D.T.test);
basic.generate(1, 1);