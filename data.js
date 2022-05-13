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
                [],
                [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1],
                [ 0 , 0 , 1 , 1 , 1 , 1 , 1     , 1 , 0 , 1 , 0 , 1 , 1 , 1],
                [ 0 , 0 , 1 ,'r','r','r','d', 1 , 1 , 1 , 1 ,'r','r','b'],
                [ 0 , 0 , 1 , 1 , 1 , 1 ,'d', 1 , 1 , 0 , 1 ,'u', 1 ],
                [ 0 , 0 , 0 , 1 ,'d','l','l', 1 , 0 , 1 , 1 ,'u', 1 ],
                [ 0 , 0 , 0 , 1 ,'d', 1 , 1 , 1 , 1 , 1 , 1 ,'u', 1 ],
                [ 0 , 0 , 0 , 0 ,'r','r','r','r','r','r','r','u'],
                [ 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]
            ],
            "locations": [
                {
                    "type": "spawn",
                    "pos": [3, 3]
                },
                {
                    "type": "base",
                    "pos": [13, 3]
                }
            ]
        },
        "map": {
            "track": [
                [],
                [],
                [],
                [],
                [ 0 ,'r','b'],
                [],
                [],
                [ 0 , 1 ]
            ],
            "locations": [
                {
                    "type": "spawn",
                    "pos": [1, 4]
                },
                {
                    "type": "base",
                    "pos": [2, 4]
                
                }
            ]
        }
    }
};

G.A.E = {
    basic: new EnemyPrototype("basic", "basic", [24, 24], "enemy-basic", 4, 1, 1, [14, 14], 1)
};

loadMap(G.A.D.T.test);
basic.generate(1, 1);