/*
0 = empty
1 = platform
b = base
q w e     t      k
a s d   f   h  i   i
z x c     v      k
*/

new Track("Test", "test", "test track", [
    [],
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1],
    [ 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 1 , 0 , 1 , 1 , 1],
    [ 0 , 0 , 1 ,'d','d','d','x', 1 , 1 , 1 , 1 ,'d','d','b'],
    [ 0 , 0 , 1 , 1 , 1 , 1 ,'x', 1 , 1 , 0 , 1 ,'w', 1 ],
    [ 0 , 0 , 0 , 1 ,'x','a','a', 1 , 0 , 1 , 1 ,'w', 1 ],
    [ 0 , 0 , 0 , 1 ,'x', 1 , 1 , 1 , 1 , 1 , 1 ,'w', 1 ],
    [ 0 , 0 , 0 , 0 ,'d','d','d','d','d','d','d','w'],
    [ 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]
],[
    [ 3, 3], [ 4, 3], [ 5, 3], [ 5, 2],
    [ 6, 3], [ 6, 4], [ 6, 5], [ 5, 5], 
    [ 4, 5], [ 4, 6], [ 4, 7], [ 5, 7], 
    [ 6, 7], [ 7, 7], [ 8, 7], [ 9, 7], 
    [10, 7], [11, 7], [11, 6], [11, 5], 
    [11, 4], [11, 3], [12, 3], [13, 3]
],[
    {
        "type": "spawn",
        "pos": [3, 3]
    },
    {
        "type": "base",
        "pos": [13, 3]
    }
],{
    "start": [2, 1],
    "size": [12, 8],
    "lines": [
        [[3, 3], [6, 3], [6, 5], [4, 5], [4, 7], [11, 7], [11, 3], [13, 3]]
    ]
});

new Track("Map", "map", "its a map", [
    [],
    [],
    [],
    [],
    [ 0 ,'d','b'],
    [],
    [],
    [ 0 , 1 ]
],[
    [1, 4], [2, 4]
],[
    {
        "type": "spawn",
        "pos": [1, 4]
    },
    {
        "type": "base",
        "pos": [2, 4]
    
    }
], {
    "start": [-1, 4],
    "size": [6, 4],
    "lines": [
        [[1, 4], [2, 4]]
    ]
});

new Track("Basic", "basic", "its a track", [
    [],
    [],
    [],
    [ 0 , 0 ,'d','d','d','d','x', 1 ],
    [ 0 , 0 , 1 , 1 , 1 , 1 ,'x', 1 ],
    [ 0 , 0 , 0 , 1 ,'x','a','a', 1 , 0 , 1 ],
    [ 0 , 0 , 0 , 1 ,'x', 1 , 1 , 1 , 1 , 1 , 1 ],
    [ 0 , 0 , 0 , 0 ,'d','d','d','d','d','d','b'],
    [ 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 ]
],[
    [2, 3], [3, 3], [4, 3], [5, 3],
    [6, 3], [6, 4], [6, 5], [5, 5],
    [4, 5], [4, 6], [4, 7], [5, 7],
    [6, 7], [7, 7], [8, 7], [9, 7],
    [10, 7]
],[
    {
        "type": "spawn",
        "pos": [2, 3]
    },
    {
        "type": "base",
        "pos": [10, 7]
    }
],{
    "start": [2, 3],
    "size": [9, 6],
    "lines": [
        [[2, 3], [6, 3], [6, 5], [4, 5], [4, 7], [10, 7]]
    ]
});

new Track("Ouch", "ouch", "good luck", [
    [],
    [],
    [],
    [ 0 , 0 , 0 ,'d','d','d','d','d','d','d','b'],
    [ 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
    [ 0 , 0 , 0 ,'d','d','d','d','d','d','d','b'],
    [ 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
    [ 0 , 0 , 0 ,'d','d','d','d','d','d','d','b'],
    [ 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
    [ 0 , 0 , 0 ,'d','d','d','d','d','d','d','b']
],[
    [ 3, 3], [ 3, 5], [ 3, 7], [ 3, 9],
    [ 4, 3], [ 4, 5], [ 4, 7], [ 4, 9],
    [ 5, 3], [ 5, 5], [ 5, 7], [ 5, 9],
    [ 6, 3], [ 6, 5], [ 6, 7], [ 6, 9],
    [ 7, 3], [ 7, 5], [ 7, 7], [ 7, 9],
    [ 8, 3], [ 8, 5], [ 8, 7], [ 8, 9],
    [ 9, 3], [ 9, 5], [ 9, 7], [ 9, 9],
    [10, 3], [10, 5], [10, 7], [10, 9],
],[
    {
        "type": "spawn",
        "pos": [3, 3]
    },
    {
        "type": "spawn",
        "pos": [3, 5]
    },
    {
        "type": "spawn",
        "pos": [3, 7]
    },
    {
        "type": "spawn",
        "pos": [3, 9]
    },
    {
        "type": "base",
        "pos": [10, 3]
    },
    {
        "type": "base",
        "pos": [10, 5]
    },
    {
        "type": "base",
        "pos": [10, 7]
    },
    {
        "type": "base",
        "pos": [10, 9]
    }
],{
    "start": [2, 3],
    "size": [10, 7],
    "lines": [
        [[3, 3], [10, 3]],
        [[3, 5], [10, 5]],
        [[3, 7], [10, 7]],
        [[3, 9], [10, 9]]
    ]
});

new Track("Crossed", "crossed", "+", [
    [],
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
    [ 0 , 1 , 1 , 0 , 0 , 0 , 0 , 0 ],
    [ 0 , 1 ,'d','d','d','d','x', 1 ],
    [ 0 , 1 , 1 , 1 , 1 , 1 ,'x', 1 ],
    [ 0 , 0 , 0 , 1 , 1 , 1 ,'x', 1 , 1 , 1 , 1 ],
    [ 0 , 0 , 0 ,'d','d','d','c','d','d','d','x'],
    [ 0 , 0 , 0 , 1 , 1 , 1 ,'x', 1 , 1 , 1 ,'b'],
    [ 0 , 0 , 0 , 0 , 0 , 1 ,'d','b', 1 ]
],[

],[
    {
        "type": "spawn",
        "pos": [2, 3]
    },
    {
        "type": "spawn",
        "pos": [3, 6]
    },
    {
        "type": "base",
        "pos": [7, 8]
    },
    {
        "type": "base",
        "pos": [10, 7]
    }
],{
    "start": [1, 2],
    "size": [10, 7],
    "lines": [
        [[2, 3], [6, 3], [6, 8], [7, 8]],
        [[3, 6], [10, 6], [10, 7]]
    ]
});

new Track("E", "e", "e", [
    [],
    [],
    [ 0 , 1 ,'x','a','a','a','a','a', 1 ],
    [ 0 , 1 ,'x', 1 , 1 , 1 , 1 , 1 , 1 ],
    [ 0 , 1 ,'x', 1 , 0 , 0 , 0 , 0 , 1 ],
    [ 0 , 1 ,'x', 1 , 1 , 1 , 1 , 1 , 1 ],
    [ 0 , 1 ,'x','a','a','a','a','a', 1 ],
    [ 0 , 1 ,'x', 1 , 1 , 1 , 1 , 1 , 1 ],
    [ 0 , 1 ,'x', 1 , 0 , 0 , 0 , 0 , 1 ],
    [ 0 , 1 ,'x', 1 , 1 , 1 , 1 , 1 , 1 ],
    [ 0 , 1 ,'d','d','d','d','d','b', 1 ]
],[
                
],[
    {
        "type": "spawn",
        "pos": [7, 2]
    },
    {
        "type": "spawn",
        "pos": [7, 6]
    },
    {
        "type": "base",
        "pos": [7, 10]
    }
],{
    "start": [-1, 2],
    "size": [12, 9],
    "lines": [
        [[7, 2], [2, 2], [2, 10], [7, 10]],
        [[7, 6], [2, 6]]
    ]
});

new Track("Gridlock", "grid", "A grid of RNG", [
    [],
    [ 0 ,'c','d','d','c','d','d','c','d','d','x'],
    [ 0 ,'x', 1 , 1 ,'x', 1 , 1 ,'x', 1 , 1 ,'x'],
    [ 0 ,'x', 1 , 1 ,'x', 1 , 1 ,'x', 1 , 1 ,'x'],
    [ 0 ,'c','d','d','c','d','d','c','d','d','x'],
    [ 0 ,'x', 1 , 1 ,'x', 1 , 1 ,'x', 1 , 1 ,'x'],
    [ 0 ,'x', 1 , 1 ,'x', 1 , 1 ,'x', 1 , 1 ,'x'],
    [ 0 ,'c','d','d','c','d','d','c','d','d','x'],
    [ 0 ,'x', 1 , 1 ,'x', 1 , 1 ,'x', 1 , 1 ,'x'],
    [ 0 ,'x', 1 , 1 ,'x', 1 , 1 ,'x', 1 , 1 ,'x'],
    [ 0 ,'d','d','d','d','d','d','d','d','d','b'],
],[

],[
    {
        "type": "spawn",
        "pos": [1, 1]
    },
    {
        "type": "base",
        "pos": [10, 10]
    }
],{
    "start": [0, 1],
    "size": [12, 10],
    "lines": [
        [[1, 1], [1, 10], [10, 10]],
        [[1, 1], [10, 1], [10, 10]],
        [[4, 1], [4, 10]],
        [[7, 1], [7, 10]],
        [[1, 4], [10, 4]],
        [[1, 7], [10, 7]]
    ]
});

new Track("Gridlock +", "grid2", "A LARGE grid of RNG", [
    ['b','a','a','a','a','a','i','d','d','d','d','d','b'],
    ['w', 1 ,'w', 1 ,'w', 1 ,'w', 1 ,'w', 1 ,'w', 1 ,'w'],
    ['w','a','q','a','q','a','t','d','e','d','e','d','w'],
    ['w', 1 ,'w', 1 ,'w', 1 ,'w', 1 ,'w', 1 ,'w', 1 ,'w'],
    ['w','a','q','a','q','a','t','d','e','d','e','d','w'],
    ['w', 1 ,'w', 1 ,'w', 1 ,'w', 1 ,'w', 1 ,'w', 1 ,'w'],
    ['k','a','f','a','f','a','s','d','h','d','h','d','k'],
    ['x', 1 ,'x', 1 ,'x', 1 ,'x', 1 ,'x', 1 ,'x', 1 ,'x'],
    ['x','a','z','a','z','a','v','d','c','d','c','d','x'],
    ['x', 1 ,'x', 1 ,'x', 1 ,'x', 1 ,'x', 1 ,'x', 1 ,'x'],
    ['x','a','z','a','z','a','v','d','c','d','c','d','x'],
    ['x', 1 ,'x', 1 ,'x', 1 ,'x', 1 ,'x', 1 ,'x', 1 ,'x'],
    ['b','a','a','a','a','a','i','d','d','d','d','d','b'],
],[

],[
    {
        "type": "spawn",
        "pos": [6, 6]
    },
    {
        "type": "base",
        "pos": [0, 0]
    },
    {
        "type": "base",
        "pos": [12, 0]
    },
    {
        "type": "base",
        "pos": [0, 12]
    },
    {
        "type": "base",
        "pos": [12, 12]
    }
],{
    "start": [-2, 0],
    "size": [17, 13],
    "lines": [
        [[0, 0], [12, 0], [12, 12], [0, 12], [0, 0]],
        [[2, 0], [2, 12]],
        [[4, 0], [4, 12]],
        [[6, 0], [6, 12]],
        [[8, 0], [8, 12]],
        [[10, 0], [10, 12]],
        [[0, 2], [12, 2]],
        [[0, 4], [12, 4]],
        [[0, 6], [12, 6]],
        [[0, 8], [12, 8]],
        [[0, 10], [12, 10]]
    ]
});

new Track("Long Road Ahead", "long", "there's a long road ahead")

G.A.D = {
    W: {
        "test": {
            "key": {
                "s": "speeder",
                "f": "fast",
                "b": "basic",
                "h": "heavy",
                "t": "tank",
                "c": "thiccboi",
                " ": null
            },
            "W": [
                [1.1, 1.0, 1.0, 0.50, 20.0, "bbbbbbbb"],
                [1.2, 1.0, 1.1, 0.48, 20.4, "bbbbbbbbbbbb"],
                [1.3, 1.0, 1.1, 0.46, 20.8, "bbbbbbbbbbbbbbbb"],
                [1.4, 1.0, 1.2, 0.44, 21.2, "bbbbbbbbbbbbbbbbbbbb"],
                [1.5, 1.0, 1.2, 0.42, 21.6, "bbbbbb h bbbbbb h bbbbbb"],
                [1.6, 1.1, 1.3, 0.40, 22.0, "bbbbb hh bbbbb hh bbbbb hh bbbbb"],
                [1.7, 1.1, 1.3, 0.38, 22.4, "fbbbbbf h fbbbbbf h fbbbbbf h fbbbbbf"],
                [1.8, 1.1, 1.4, 0.30, 22.8, "bbbfffbbb bbbfffbbb bbbfffbbb bbbfffbbb"],
                [1.9, 1.1, 1.4, 0.30, 23.2, "bbff h ffbbff h ffbbff h ffbbff h ffbb"],
                [2.0, 1.1, 1.5, 0.24, 23.6, "bbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbb"],
                [2.1, 1.2, 1.5, 0.30, 24.0, "hbbbbffffhffffbbbbffffhffffbbbbh"],
                [2.2, 1.2, 1.6, 0.50, 24.4, "fhf   t    bbbbffhhffbbbb   t    fhf"],
                [2.3, 1.2, 1.6, 0.48, 24.8, "fbfbhbfbf   t    fbfbhbfbf   t    fbfbhbfbf"],
                [2.4, 1.2, 1.7, 0.36, 25.2, "fff ss fff ss fff ss fff ss fff ss fff ss fff"],
                [2.5, 1.2, 1.7, 0.36, 25.6, "ffbbsbbff ffbbsbbff ffbbsbbff ffbbsbbff ffbbsbbff"],
                [2.6, 1.3, 1.8, 0.40, 26.0, "fbsbf   t    fbsbf   t   fbsbf   t    fbsbf"],
                [2.7, 1.3, 1.8, 0.20, 26.4, "bbssffssbbssffssbb     bbssffssbbssffssbb"],
                [2.8, 1.3, 1.9, 0.24, 26.8, "fff sss fff hhh fff sts fff hhh fff sss fff"],
                [2.9, 1.3, 1.9, 0.30, 27.2, "fbfsbsfbfhbhfbfstsfbfhbhfbfsbsfbfstsfbfhbhfbfsbsfbf"],
                [3.0, 1.3, 1.0, 0.32, 27.6, "bbfbb    bbfbb      c      bbfbb    bbfbb"],
                [3.1, 1.4, 2.0, 0.36, 28.0, "hhffbbsbbffhhffbbssbbffhhffbbsbbffhh"],
                [3.2, 1.4, 2.1, 0.16, 28.4, "ssssssssssss          ffffffffff          bbbbbbbb          hhhh          tt"],
                [3.3, 1.4, 2.1, 0.24, 28.8, "sbfbhbfbs   t   sbfbhbfbs   t   sbfbhbfbs   t   sbfbhbfbs   t   sbfbhbfbs"],
                [3.4, 1.4, 2.2, 0.04, 29.2, "bbbfhfbbbfhfbbb                                                                      bbbfhfbbbfhfbbb"],
                [3.5, 1.4, 2.2, 0.16, 29.6, "ffff ssss ffff               bb t bb t bb               ffff ssss ffff"],
                [3.6, 1.5, 2.3, 0.01, 30.0, ""],
                [3.7, 1.5, 2.3, 0.01, 30.4, ""],
                [3.8, 1.5, 2.4, 0.01, 30.8, ""],
                [3.9, 1.5, 2.4, 0.01, 31.2, ""],
                [4.0, 1.5, 2.5, 0.01, 31.6, ""]
            ]
        }
    }
};

G.A.B = {
    basic: new TowerPrototype("Basic", 'basic', 'tower-basic', 'turret-basic', 2, 4, 2.5, '#007eeb', 20, 2, 0.20, 1, 60, [
        {"level": 2, "req": ["basic-mk1"], "texture": "tower-basic-1", "turret": "turret-basic-1"},
        {"level": 4, "req": ["basic-mk2"], "texture": "tower-basic-2", "turret": "turret-basic-2"},
        {"level": 7, "req": ["basic-mk3"], "texture": "tower-basic-3", "turret": "turret-basic-3"},
        {"level": 11, "req": ["basic-mk4"], "texture": "tower-basic-4", "turret": "turret-basic-4"},
        {"level": 16, "req": ["basic-mk5"], "texture": "tower-basic-5", "turret": "turret-basic-5"}
    ]),
    sniper: new TowerPrototype("Sniper", 'sniper', 'tower-sniper', 'turret-sniper', 0.5, 15, 4.5, '#00cb3e', 26, 1, 0.50, 1, 85),
    beam: new TowerPrototype("Beam", 'beam', 'tower-beam', 'turret-beam', 25, 0.2, 1.25, '#b700dc', 9, 4, 0.08, 3, 110),
    multi: new TowerPrototype("Multishot", 'multi', 'tower-multi', 'turret-multi', 2, 2.5, 2, '#eded00', 4, 2, 0.20, 3, 150),
    aura: new TowerPrototype("Aura", 'aura', 'tower-aura', 'turret-aura', 50, 0.01, 1.5, '#f17a00', 0, 0.2, 0.04, 100, 185),
    super: new TowerPrototype("Ultimate", 'super', 'tower-super', 'turret-super', 4, 15, 3.5, '#f30000', 20, 2, 0.20, 1, 500)
};

G.A.E = {
    basic: new EnemyPrototype("basic", "basic", [30, 30], "enemy-basic", 10, 1, 1, [14, 14], 1, '#ff0000', '#e00000'),
    heavy: new EnemyPrototype("heavy", "heavy", [44, 44], "enemy-heavy", 25, 2, 0.7, [22, 22], 2.5, '#be0000', '#930000'),
    fast: new EnemyPrototype("fast", "fast", [26, 26], "enemy-fast", 5, 1, 1.5, [12, 12], 2, '#ff6b00', '#e05e00'),
    tank: new EnemyPrototype("tank", "tank", [56, 56], "enemy-tank", 100, 5, 0.4, [28, 28], 10, '#790000', '#550000'),
    speeder: new EnemyPrototype("speeder", "speeder", [20, 20], "enemy-speeder", 2, 1, 2.5, [10, 10], 1.5, '#ffae00', '#e0a300'),
    thiccboi: new EnemyPrototype("boss", "thiccboi", [60, 60], "enemy-boss", 200, 20, 0.3, [28, 28], 25, '#982c00', '#742100', true)
};


G.A.U = {
    basic: [
        new Upgrade(
            "MK 1", "basic-mk1", 
            ["the first major tower upgrade", "", "+ 2 damage", "+ 0.2 fire rate", "+ 0.2 range"], 
            "basic", 65, [], {"dg": 2, "fr": 0.2, "rg": 0.2}
        ),
        new Upgrade(
            "Damage I", "basic-dg1",
            ["increases the damage of the tower", "", "+ 2 damage"],
            "basic", 85, ["basic-mk1"], {"dg": 2}
        ),
        new Upgrade(
            "Fire Rate I", "basic-fr1",
            ["increases the fire rate of the tower", "", "+ 0.1 fire rate"],
            "basic", 75, ["basic-mk1"], {"fr": 0.1}
        ),
        new Upgrade(
            "Longer Turret", "basic-lt",
            ["increases the range of the tower", "", "+ 0.15 range"],
            "basic", 95, ["basic-mk1"], {"rg": 0.15}
        ),
        new Upgrade(
            "MK 2", "basic-mk2", 
            ["the second major tower upgrade", "", "+ 3 damage", "+ 0.2 fire rate", "+ 0.25 range"], 
            "basic", 130, ["basic-mk1"], {"dg": 3, "fr": 0.2, "rg": 0.25}
        ),
        new Upgrade(
            "Damage II", "basic-dg2",
            ["increases the damage of the tower", "", "+ 1.5 damage"],
            "basic", 150, ["basic-mk2", "basic-dg1"], {"dg": 1.5}
        ),
        new Upgrade(
            "Fire Rate II", "basic-fr2",
            ["increases the fire rate of the tower", "", "+ 0.1 fire rate"],
            "basic", 160, ["basic-mk2", "basic-fr1"], {"fr": 0.1}
        ),
        new Upgrade(
            "MK 3", "basic-mk3", 
            ["the third major tower upgrade", "", "+ 5 damage", "+ 0.2 fire rate", "+ 0.3 range"], 
            "basic", 260, ["basic-mk2"], {"dg": 5, "fr": 0.2, "rg": 0.3}
        ),
        new Upgrade(
            "POWER BOOST", "basic-PB",
            ["tower damage and fire rate booster", "", "+ 7 damage", "+ 0.2 fire rate"],
            "basic", 360, ["basic-mk3", "basic-dg2", "basic-fr2"], {"dg": 7, "fr": 0.2}
        ),
        new Upgrade(
            "Damage III", "basic-dg3",
            ["increases the damage of the tower", "", "+ 3 damage"],
            "basic", 300, ["basic-mk3", "basic-dg2"], {"dg": 3}
        ),
        new Upgrade(
            "Fire Rate III", "basic-fr3",
            ["increases the fire rate of the tower", "", "+ 0.1 fire rate"],
            "basic", 310, ["basic-mk3", "basic-fr2"], {"fr": 0.1}
        ),
        new Upgrade(
            "Basic Scope", "basic-sc",
            ["increases the range of the tower", "", "+ 0.25 range"],
            "basic", 400, ["basic-mk3", "basic-lt"], {"rg": 0.25}
        ),
        new Upgrade(
            "MK 4", "basic-mk4", 
            ["the fourth major tower upgrade", "", "+ 10 damage", "+ 0.2 fire rate", "+0.35 range"], 
            "basic", 520, ["basic-mk3"], {"dg": 10, "fr": 0.2, "rg": 0.35}
        ),
        new Upgrade(
            "Damage IV", "basic-dg4",
            ["massively increases the", "damage of the tower", "", "+ 5 damage"],
            "basic", 580, ["basic-mk4", "basic-dg3", "basic-PB"], {"dg": 5}
        ),
        new Upgrade(
            "Fire Rate IV", "basic-fr4",
            ["massively increases the", "fire rate of the tower", "", "+ 0.2 fire rate"],
            "basic", 620, ["basic-mk4", "basic-fr3", "basic-PB"], {"fr": 0.2}
        ),
        new Upgrade(
            "MK 5", "basic-mk5", 
            ["the final major tower upgrade", "", "+ 18 damage", "+ 0.2 fire rate", "+0.4 range", "+1 multishot"], 
            "basic", 1040, ["basic-mk4"], {"dg": 18, "fr": 0.2, "rg": 0.4, "sh": 1}
        ),
        new Upgrade(
            "Super Scope", "basic-ss",
            ["massively increases the", "range of the tower", "", "+ 0.4 range"],
            "basic", 1320, ["basic-mk5", "basic-sc", "basic-PB"], {"rg": 0.4}
        ),
        new Upgrade(
            "POWER AMP", "basic-PA",
            ["massively increases the", "fire rate and damage of the tower", "", "+ 10 damage", "+ 0.3 fire rate"],
            "basic", 1280, ["basic-mk5", "basic-fr4", "basic-dg4", "basic-PB"], {"dg": 10, "fr": 0.3}
        ),
        new Upgrade(
            "Double turret", "basic-dt",
            ["increases the amount of multishots", "", "+ 1 multishot"],
            "basic", 1500, ["basic-mk5", "basic-fr4", "basic-dg4", "basic-PB", "basic-PA"], {"sh": 1}
        )
    ],
    sniper: [
        new Upgrade(
            "MK 1", "sniper-mk1", 
            ["the first major tower upgrade", "", "+ 2 damage", "+ 0.1 fire rate", "+ 0.3 range"], 
            "sniper", 90, [], {"dg": 2, "fr": 0.1, "rg": 0.3}
        ),
        new Upgrade(
            "Longer Barrel", "sniper-rg1",
            ["increases the range of the tower", "", "+ 0.2 range"],
            "sniper", 110, ["sniper-mk1"], {"rg": 0.2}
        ),
        new Upgrade(
            "Better Accuracy", "sniper-ac1", 
            ["increases the damage of the tower", "", "+ 2 damage"],
            "sniper", 125, ["sniper-mk1"], {"dg": 2}
        ),
        new Upgrade(
            "MK 2", "sniper-mk2", 
            ["the second major tower upgrade", "", "+ 4 damage", "+ 0.1 fire rate", "+ 0.4 range"], 
            "sniper", 180, ["sniper-mk1"], {"dg": 4, "fr": 0.1, "rg": 0.4}
        ),
        new Upgrade(
            "MK 3", "sniper-mk3", 
            ["the third major tower upgrade", "", "+ 8 damage", "+ 0.1 fire rate", "+ 0.5 range"], 
            "sniper", 360, ["sniper-mk2"], {"dg": 8, "fr": 0.1, "rg": 0.5}
        ),
        new Upgrade(
            "MK 4", "sniper-mk4", 
            ["the fourth major tower upgrade", "", "+ 16 damage", "+ 0.1 fire rate", "+ 0.6 range"], 
            "sniper", 720, ["sniper-mk3"], {"dg": 16, "fr": 0.1, "rg": 0.6}
        ),
        new Upgrade(
            "MK 5", "sniper-mk5", 
            ["the final major tower upgrade", "", "+ 32 damage", "+ 0.1 fire rate", "+ 0.7 range", "+ 1 multishot"], 
            "sniper", 1440, ["sniper-mk4"], {"dg": 32, "fr": 0.1, "rg": 0.7, "sh": 1}
        )
    ],
    beam: [
        new Upgrade(
            "MK 1", "beam-mk1", 
            ["the first major tower upgrade", "", "+ 0.1 damage", "+ 0.02 range"], 
            "beam", 115, [], {"dg": 0.1, "rg": 0.02}
        ),
        new Upgrade(
            "MK 2", "beam-mk2", 
            ["the second major tower upgrade", "", "+ 0.15 damage", "+ 0.04 range", "+ 1 multishot"], 
            "beam", 230, ["beam-mk1"], {"dg": 0.15, "rg": 0.04, "sh": 1}
        ),
        new Upgrade(
            "MK 3", "beam-mk3", 
            ["the third major tower upgrade", "", "+ 0.2 damage", "+ 0.06 range", "+ 1 multishot"], 
            "beam", 460, ["beam-mk2"], {"dg": 0.2, "rg": 0.06, "sh": 1}
        ),
        new Upgrade(
            "MK 4", "beam-mk4", 
            ["the fourth major tower upgrade", "", "+ 0.25 damage", "+ 0.08 range", "+ 1 multishot"], 
            "beam", 920, ["beam-mk3"], {"dg": 0.25, "rg": 0.08, "sh": 1}
        ),
        new Upgrade(
            "MK 5", "beam-mk5", 
            ["the final major tower upgrade", "", "+ 0.3 damage", "+ 0.1 range", "+ 2 multishot"], 
            "beam", 1840, ["beam-mk4"], {"dg": 0.3, "rg": 0.1, "sh": 2}
        )
    ],
    multi: [
        new Upgrade(
            "MK 1", "multi-mk1", 
            ["the first major tower upgrade", "", "+ 0.75 damage", "+ 0.1 fire rate", "+ 0.15 range"], 
            "multi", 155, [], {"dg": 0.75, "fr": 0.1, "rg": 0.15}
        ),
        new Upgrade(
            "MK 2", "multi-mk2", 
            ["the second major tower upgrade", "", "+ 1.5 damage", "+ 0.1 fire rate", "+ 0.2 range"], 
            "multi", 310, ["multi-mk1"], {"dg": 1.5, "fr": 0.1, "rg": 0.2}
        ),
        new Upgrade(
            "MK 3", "multi-mk3", 
            ["the third major tower upgrade", "", "+ 3 damage", "+ 0.1 fire rate", "+ 0.25 range", "+ 1 multishot"], 
            "multi", 620, ["multi-mk2"], {"dg": 3, "fr": 0.1, "rg": 0.25, "sh": 1}
        ),
        new Upgrade(
            "MK 4", "multi-mk4", 
            ["the fourth major tower upgrade", "", "+ 6 damage", "+ 0.1 fire rate", "+ 0.3 range"], 
            "multi", 1240, ["multi-mk3"], {"dg": 6, "fr": 0.1, "rg": 0.3}
        ),
        new Upgrade(
            "MK 5", "multi-mk5", 
            ["the final major tower upgrade", "", "+ 12 damage", "+ 0.1 fire rate", "+ 0.35 range", "+ 1 multishot"], 
            "multi", 2480, ["multi-mk4"], {"dg": 12, "fr": 0.1, "rg": 0.35, "sh": 1}
        )
    ],
    aura: [
        new Upgrade(
            "MK 1", "aura-mk1", 
            ["the first major tower upgrade", "", "+ 0.005 damage", "+ 0.04 range", "+ 25 multishot"], 
            "aura", 190, [], {"dg": 0.005, "rg": 0.04, "sh": 25}
        ),
        new Upgrade(
            "MK 2", "aura-mk2", 
            ["the second major tower upgrade", "", "+ 0.01 damage", "+ 0.08 range", "+ 25 multishot"], 
            "aura", 380, ["aura-mk1"], {"dg": 0.01, "rg": 0.08, "sh": 25}
        ),
        new Upgrade(
            "MK 3", "aura-mk3", 
            ["the third major tower upgrade", "", "+ 0.02 damage", "+ 0.12 range", "+ 25 multishot"], 
            "aura", 760, ["aura-mk2"], {"dg": 0.02, "rg": 0.12, "sh": 25}
        ),
        new Upgrade(
            "MK 4", "aura-mk4", 
            ["the fourth major tower upgrade", "", "+ 0.04 damage", "+ 0.16 range", "+ 25 multishot"], 
            "aura", 1520, ["aura-mk3"], {"dg": 0.04, "rg": 0.16, "sh": 25}
        ),
        new Upgrade(
            "MK 5", "aura-mk5", 
            ["the final major tower upgrade", "", "+ 0.08 damage", "+ 0.2 range", "+ 50 multishot"], 
            "aura", 3040, ["aura-mk4"], {"dg": 0.08, "rg": 0.2, "sh": 50}
        )
    ],
    super: [
        new Upgrade(
            "MK 1", "super-mk1", 
            ["the first major tower upgrade", "", "+ 4 damage", "+ 0.4 fire rate", "+ 0.4 range"], 
            "super", 510, [], {"dg": 4, "fr": 0.4, "rg": 0.4}
        ),
        new Upgrade(
            "MK 2", "super-mk2", 
            ["the second major tower upgrade", "", "+ 8 damage", "+ 0.4 fire rate", "+ 0.45 range"], 
            "super", 1020, ["super-mk1"], {"dg": 8, "fr": 0.4, "rg": 0.45}
        ),
        new Upgrade(
            "MK 3", "super-mk3", 
            ["the third major tower upgrade", "", "+ 16 damage", "+ 0.4 fire rate", "+ 0.5 range"], 
            "super", 2040, ["super-mk2"], {"dg": 16, "fr": 0.4, "rg": 0.5}
        ),
        new Upgrade(
            "MK 4", "super-mk4", 
            ["the fourth major tower upgrade", "", "+ 32 damage", "+ 0.4 fire rate", "+ 0.55 range", "+ 1 multishot"], 
            "super", 4080, ["super-mk3"], {"dg": 32, "fr": 0.4, "rg": 0.55, "sh": 1}
        ),
        new Upgrade(
            "MK 5", "super-mk5", 
            ["the final major tower upgrade", "", "+ 64 damage", "+ 0.2 fire rate", "+ 0.6 range", "+ 1 multishot"], 
            "super", 8160, ["super-mk4"], {"dg": 64, "fr": 0.4, "rg": 0.6, "sh": 1}
        )
    ]
}