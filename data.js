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
                [ 0 , 0 , 1 , 1 , 1 , 1 ,'d', 1 , 0 , 1 , 0 , 1 , 1 , 1],
                [ 0 , 0 , 1 ,'r','r','r','d', 1 , 1 , 1 , 1 ,'r','r','b'],
                [ 0 , 0 , 1 , 1 , 1 , 1 ,'d', 1 , 1 , 0 , 1 ,'u', 1 ],
                [ 0 , 0 , 0 , 1 ,'d','l','l', 1 , 0 , 1 , 1 ,'u', 1 ],
                [ 0 , 0 , 0 , 1 ,'d', 1 , 1 , 1 , 1 , 1 , 1 ,'u', 1 ],
                [ 0 , 0 , 0 , 0 ,'r','r','r','r','r','r','r','u'],
                [ 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]
            ],
            "path": [
                "3,  3", "4,  3", "5,  3", "5,  2",
                "6,  3", "6,  4", "6,  5", "5,  5", 
                "4,  5", "4,  6", "4,  7", "5,  7", 
                "6,  7", "7,  7", "8,  7", "9,  7", 
                "10, 7", "11, 7", "11, 6", "11, 5", 
                "11, 4", "11, 3", "12, 3", "13, 3"
            ],
            "locations": [
                {
                    "type": "spawn",
                    "pos": [3, 3]
                },
                {
                    "type": "spawn",
                    "pos": [6, 2]
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
    basic: new EnemyPrototype("basic", "basic", [30, 30], "enemy-basic", 5, 1, 1, [14, 14], 1),
    heavy: new EnemyPrototype("heavy", "heavy", [34, 34], "enemy-heavy", 20, 2, 0.7, [22, 22], 2),
    fast: new EnemyPrototype("fast", "fast", [30, 30], "enemy-fast", 3, 1, 1.5, [12, 12], 1.5),
    tank: new EnemyPrototype("tank", "tank", [48, 48], "enemy-tank", 200, 5, 0.4, [28, 28], 5),
    speeder: new EnemyPrototype("speeder", "speeder", [32, 32], "enemy-speeder", 1, 1, 2.5, [10, 10], 1.5)
};

loadMap(G.A.D.T[G.map]);