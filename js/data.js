/*
0 = empty
1 = platform
b = base
q w e     t      k
a s d   f   h  i   i
z x c     v      k
*/
new Track("Serpentine", "s", "big snake", [
    [],
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
    [ 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
    [ 0 , 0 , 1 ,'d','d','d','x', 1 ,'d','d','d','b'],
    [ 0 , 0 , 1 , 1 , 1 , 1 ,'x', 1 ,'w', 1 , 1 , 1 ],
    [ 0 , 0 , 0 , 1 ,'x','a','a', 1 ,'w','a','a', 1 ],
    [ 0 , 0 , 0 , 1 ,'x', 1 , 1 , 1 , 1 , 1 ,'w', 1 ],
    [ 0 , 0 , 0 , 0 ,'d','d','d','d','d','d','w', 1 ],
    [ 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 0 ]
],[
    {
        "type": "spawn",
        "pos": [3, 3]
    },
    {
        "type": "base",
        "pos": [11, 3]
    }
],{
    "start": [2, 2],
    "size": [10, 7],
    "lines": [
        [[3, 3], [6, 3], [6, 5], [4, 5], [4, 7], [10, 7], [10, 5], [8, 5], [8, 3], [11, 3]]
    ]
}, 1);

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
}, 2, false);

new Track("Map", "map", "its a map", [
    [],
    [],
    [],
    [ 0 , 0 , 1 , 1 , 1 , 1 ],
    [ 0 , 0 , 1 ,'d','b', 1 ],
    [ 0 , 0 , 1 , 1 , 1 , 1 ],
    [],
    []
],[
    {
        "type": "spawn",
        "pos": [3, 4]
    },
    {
        "type": "base",
        "pos": [4, 4]
    
    }
], {
    "start": [2, 3],
    "size": [4, 3],
    "lines": [
        [[3, 4], [4, 4]]
    ]
}, 10);

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
}, 3);

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
}, 8);

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
}, 5);

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
}, 4);

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
}, 6);

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
}, 8);

new Track("A Long Road", "long", "a long road ahead", [
    [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
    [ 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 1 ,'d','d','d','d','d','d','d','x', 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
    [ 0 , 0 , 1 ,'d','d','d','d','x', 1 , 0 , 0 , 0 , 1 ,'w', 1 , 1 , 1 , 1 , 1 , 1 ,'d','d','d','d','d','d','b', 1 ],
    [ 0 , 0 , 1 , 1 , 1 , 1 , 1 ,'x', 1 , 0 , 0 , 0 , 1 ,'w', 1 , 1 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
    [ 0 , 0 , 0 , 0 , 0 , 0 , 1 ,'x', 1 , 0 , 0 , 0 , 1 ,'w','a', 1 ],
    [ 0 , 0 , 0 , 0 , 0 , 0 , 1 ,'x', 1 , 1 , 1 , 1 , 1 , 1 ,'w', 1 ],
    [ 0 , 0 , 0 , 0 , 0 , 0 , 1 ,'d','d','d','d','d','d','d','w', 1 ],
    [ 0 , 0 , 0 , 0 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]
],[
    {
        "type": "spawn",
        "pos": [3, 2]
    },
    {
        "type": "base",
        "pos": [26, 2]
    }
],{
    "start": [2, -5],
    "size": [26, 18],
    "lines":[
        [[3, 2], [7, 2], [7, 6], [14, 6], [14, 4], [13, 4], [13, 1], [20, 1], [20, 2], [26, 2]]
    ]
}, 3);

new Track("Blank", "blank", "template", [
    []
],[

],{
    "start": [0, 0],
    "size": [1, 1],
    "lines": [
        
    ]
}, 1, false);

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
                [1.1, 1.0, 1.0, 0.50, 20.0, "bbbbbbbb"], //1
                [1.2, 1.0, 1.1, 0.48, 20.4, "bbbbbbbbbbbb"], //2
                [1.3, 1.0, 1.1, 0.46, 20.8, "bbbbbbbbbbbbbbbb"], //3
                [1.4, 1.0, 1.2, 0.44, 21.2, "bbbbbbbbbbbbbbbbbbbb"], //4
                [1.5, 1.0, 1.2, 0.42, 21.6, "bbbbbb h bbbbbb h bbbbbb"], //5
                [1.6, 1.1, 1.3, 0.40, 22.0, "bbbbb hh bbbbb hh bbbbb hh bbbbb"], //6
                [1.7, 1.1, 1.3, 0.38, 22.4, "fbbbbbf h fbbbbbf h fbbbbbf h fbbbbbf"], //7
                [1.8, 1.1, 1.4, 0.30, 22.8, "bbbfffbbb bbbfffbbb bbbfffbbb bbbfffbbb"], //8
                [1.9, 1.1, 1.4, 0.30, 23.2, "bbff h ffbbff h ffbbff h ffbbff h ffbb"], //9
                [2.0, 1.1, 1.5, 0.24, 23.6, "bbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbbfbb"], //10
                [2.1, 1.2, 1.5, 0.30, 24.0, "hbbbbffffhffffbbbbffffhffffbbbbh"], //11
                [2.2, 1.2, 1.6, 0.50, 24.4, "fhf   t    bbbbffhhffbbbb   t    fhf"], //12
                [2.3, 1.2, 1.6, 0.48, 24.8, "fbfbhbfbf   t    fbfbhbfbf   t    fbfbhbfbf"], //13
                [2.4, 1.2, 1.7, 0.36, 25.2, "fff ss fff ss fff ss fff ss fff ss fff ss fff"], //14
                [2.5, 1.2, 1.7, 0.36, 25.6, "ffbbsbbff ffbbsbbff ffbbsbbff ffbbsbbff ffbbsbbff"], //15
                [2.6, 1.3, 1.8, 0.40, 26.0, "fbsbf   t    fbsbf   t   fbsbf   t    fbsbf"], //16
                [2.7, 1.3, 1.8, 0.20, 26.4, "bbssffssbbssffssbb     bbssffssbbssffssbb"], //17
                [2.8, 1.3, 1.9, 0.24, 26.8, "fff sss fff hhh fff sts fff hhh fff sss fff"], //18
                [2.9, 1.3, 1.9, 0.30, 27.2, "fbfsbsfbfhbhfbfstsfbfhbhfbfsbsfbfstsfbfhbhfbfsbsfbf"], //19
                [3.0, 1.3, 1.0, 0.32, 27.6, "bbfbb    bbfbb      c      bbfbb    bbfbb"], //20
                [3.1, 1.4, 2.0, 0.36, 28.0, "hhffbbsbbffhhffbbssbbffhhffbbsbbffhh"], //21
                [3.2, 1.4, 2.1, 0.16, 28.4, "ssssssssssss          ffffffffff          bbbbbbbb          hhhh          tt"], //22
                [3.3, 1.4, 2.1, 0.24, 28.8, "sbfbhbfbs   t   sbfbhbfbs   t   sbfbhbfbs   t   sbfbhbfbs   t   sbfbhbfbs"], //23
                [3.4, 1.4, 2.2, 0.04, 29.2, "bbbfhfbbbfhfbbb                                                                      bbbfhfbbbfhfbbb"], //24
                [3.5, 1.4, 2.2, 0.16, 29.6, "ffff ssss ffff               bb t bb t bb               ffff ssss ffff"], //25
                [3.6, 1.5, 2.3, 0.08, 30.0, "ssfss  ssfss  ssfss  ssfss  ssfss  ssfss  ssfss  ssfss  ssfss  ssfss"], //26
                [3.7, 1.5, 2.3, 0.10, 30.4, "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"], //27
                [3.8, 1.5, 2.4, 0.10, 30.8, "shths  shths  shths  shths  shths  shths  shths  shths  shths  shths"], //28
                [3.9, 1.5, 2.4, 0.01, 31.2, ""], //29
                [4.0, 1.5, 2.5, 0.01, 31.6, ""] //30
            ]
        }
    }
};

G.A.B = {
    basic: new TowerPrototype("Basic", 'basic', 'tower-basic', 'turret-basic', 2, 4, 2.5, '#007eeb', 20, 2, 0.20, 1, 60, [
        {"level": 2, "req": ["basic-mk1"], "texture": "tower-basic-1", "turret": "turret-basic-1", "add": {"to": 1}},
        {"level": 4, "req": ["basic-mk2"], "texture": "tower-basic-2", "turret": "turret-basic-2"},
        {"level": 7, "req": ["basic-mk3"], "texture": "tower-basic-3", "turret": "turret-basic-3"},
        {"level": 11, "req": ["basic-mk4"], "texture": "tower-basic-4", "turret": "turret-basic-4", "add": {"to": 1}},
        {"level": 16, "req": ["basic-mk5"], "texture": "tower-basic-5", "turret": "turret-basic-5"}
    ]),
    sniper: new TowerPrototype("Sniper", 'sniper', 'tower-sniper', 'turret-sniper', 0.5, 15, 4.5, '#00cb3e', 26, 1, 0.50, 1, 85, [
        {"level": 2, "req": ["sniper-mk1"], "texture": "tower-sniper-1", "turret": "turret-sniper-1", "add": {"to": 2}},
        {"level": 4, "req": ["sniper-mk2"], "texture": "tower-sniper-2", "turret": "turret-sniper-2"},
        {"level": 7, "req": ["sniper-mk3"], "texture": "tower-sniper-3", "turret": "turret-sniper-3", "add": {"to": 1}},
        {"level": 11, "req": ["sniper-mk4"], "texture": "tower-sniper-4", "turret": "turret-sniper-4", "add": {"to": 1}},
        {"level": 16, "req": ["sniper-mk5"], "texture": "tower-sniper-5", "turret": "turret-sniper-5"}
    ]),
    beam: new TowerPrototype("Beam", 'beam', 'tower-beam', 'turret-beam', 25, 0.15, 1.25, '#b700dc', 9, 4, 0.08, 3, 110, [
        {"level": 2, "req": ["beam-mk1"], "texture": "tower-beam-1", "turret": "turret-beam-1"},
        {"level": 4, "req": ["beam-mk2"], "texture": "tower-beam-2", "turret": "turret-beam-2"},
        {"level": 7, "req": ["beam-mk3"], "texture": "tower-beam-3", "turret": "turret-beam-3"},
        {"level": 11, "req": ["beam-mk4"], "texture": "tower-beam-4", "turret": "turret-beam-4"},
        {"level": 16, "req": ["beam-mk5"], "texture": "tower-beam-5", "turret": "turret-beam-5"}
    ]),
    multi: new TowerPrototype("Multishot", 'multi', 'tower-multi', 'turret-multi', 2, 2.5, 2, '#eded00', 4, 2, 0.20, 3, 150, [
        {"level": 2, "req": ["multi-mk1"], "texture": "tower-multi-1", "turret": "turret-multi-1", "add": {"to": 1}},
        {"level": 4, "req": ["multi-mk2"], "texture": "tower-multi-2", "turret": "turret-multi-2"},
        {"level": 7, "req": ["multi-mk3"], "texture": "tower-multi-3", "turret": "turret-multi-3", "add": {"to": 1}},
        {"level": 11, "req": ["multi-mk4"], "texture": "tower-multi-4", "turret": "turret-multi-4", "add": {"to": 1}},
        {"level": 16, "req": ["multi-mk5"], "texture": "tower-multi-5", "turret": "turret-multi-5"}
    ]),
    aura: new TowerPrototype("Aura", 'aura', 'tower-aura', 'turret-aura', 50, 0.01, 1.5, '#f17a00', 0, 0.2, 0.04, 100, 185, [
        {"level": 2, "req": ["aura-mk1"], "texture": "tower-aura-1", "turret": "turret-aura-1"},
        {"level": 4, "req": ["aura-mk2"], "texture": "tower-aura-2", "turret": "turret-aura-2"},
        {"level": 7, "req": ["aura-mk3"], "texture": "tower-aura-3", "turret": "turret-aura-3"},
        {"level": 11, "req": ["aura-mk4"], "texture": "tower-aura-4", "turret": "turret-aura-4"},
        {"level": 16, "req": ["aura-mk5"], "texture": "tower-aura-5", "turret": "turret-aura-5"}
    ]),
    super: new TowerPrototype("Ultimate", 'super', 'tower-super', 'turret-super', 4, 15, 3.5, '#f30000', 20, 2, 0.20, 1, 500, [
        {"level": 2, "req": ["super-mk1"], "texture": "tower-super-1", "turret": "turret-super-1"},
        {"level": 4, "req": ["super-mk2"], "texture": "tower-super-2", "turret": "turret-super-2"},
        {"level": 7, "req": ["super-mk3"], "texture": "tower-super-3", "turret": "turret-super-3"},
        {"level": 11, "req": ["super-mk4"], "texture": "tower-super-4", "turret": "turret-super-4"},
        {"level": 16, "req": ["super-mk5"], "texture": "tower-super-5", "turret": "turret-super-5"}
    ])
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
            "BASIC BOOST", "basic-PB",
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
            "BASIC AMP", "basic-PA",
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
            ["the first major tower upgrade", "", "+ 2 damage", "+ 0.1 fire rate", "+ 0.15 range"], 
            "sniper", 90, [], {"dg": 2, "fr": 0.1, "rg": 0.15}
        ),
        new Upgrade(
            "Range I", "sniper-rg1",
            ["increases the range of the tower", "", "+ 0.2 range"],
            "sniper", 110, ["sniper-mk1"], {"rg": 0.2}
        ),
        new Upgrade(
            "Precision I", "sniper-dg1", 
            ["increases the damage of the tower", "", "+ 2 damage"],
            "sniper", 125, ["sniper-mk1"], {"dg": 2}
        ),
        new Upgrade(
            "MK 2", "sniper-mk2", 
            ["the second major tower upgrade", "", "+ 4 damage", "+ 0.1 fire rate", "+ 0.25 range"], 
            "sniper", 180, ["sniper-mk1"], {"dg": 4, "fr": 0.1, "rg": 0.25}
        ),
        new Upgrade(
            "Rate I", "sniper-fr1",
            ["increases the fire rate of the tower", "", "+ 0.1 fire rate"],
            "sniper", 225, ["sniper-mk2"], {"fr": 0.1}
        ),
        new Upgrade(
            "Precision II", "sniper-dg2",
            ["increases the damage of the tower", "", "+ 4 damage"],
            "sniper", 280, ["sniper-mk2", "sniper-dg1"], {"dg": 4}
        ),
        new Upgrade(
            "Repeater Module", "sniper-rep",
            ["increases the fire rate of the tower", "", "+ 0.2 fire rate"],
            "sniper", 300, ["sniper-mk2"], {'fr': 0.2}
        ),
        new Upgrade(
            "MK 3", "sniper-mk3", 
            ["the third major tower upgrade", "", "+ 10 damage", "+ 0.1 fire rate", "+ 0.35 range"], 
            "sniper", 360, ["sniper-mk2"], {"dg": 10, "fr": 0.1, "rg": 0.35}
        ),
        new Upgrade(
            "Range II", "sniper-rg2",
            ["increases the range of the tower", "", "+ 0.4 range"],
            "sniper", 400, ["sniper-mk3", "sniper-rg1"], {"rg": 0.4}
        ),
        new Upgrade(
            "Rate II", "sniper-fr2",
            ["increases the fire rate of the tower", "", "+ 0.1 fire rate"],
            "sniper", 420, ["sniper-mk2", "sniper-fr1"], {"fr": 0.1}
        ),
        new Upgrade(
            "SNIPER BOOST", "sniper-PB",
            ["increases the stats of the tower", "", "+ 16 damage", "+ 0.15 fire rate", "+ 0.45 range"],
            "sniper", 550, ["sniper-mk3", "sniper-rg2", "sniper-dg2", "sniper-fr2"], {"dg": 16, "fr": 0.15, "rg": 0.45}
        ),
        new Upgrade(
            "MK 4", "sniper-mk4", 
            ["the fourth major tower upgrade", "", "+ 22 damage", "+ 0.1 fire rate", "+ 0.5 range"], 
            "sniper", 720, ["sniper-mk3"], {"dg": 22, "fr": 0.1, "rg": 0.5}
        ),
        new Upgrade(
            "Precision III", "sniper-dg3",
            ["massively increases the", "damage of the tower", "", "+ 28 damage"],
            "sniper", 800, ["sniper-mk4", "sniper-PB", "sniper-dg2"], {"dg": 28}
        ),
        new Upgrade(
            "Range III", "sniper-rg3",
            ["massively increases the", "range of the tower", "", "+ 0.5 range"],
            "sniper", 840, ["sniper-mk4", "sniper-PB", "sniper-rg2"], {"rg": 0.5}
        ),
        new Upgrade(
            "Rate III", "sniper-fr3",
            ["massively increases the", "fire rate of the tower", "", "+ 0.1 fire rate"],
            "sniper", 880, ["sniper-mk4", "sniper-PB", "sniper-fr2"], {"fr": 0.1}
        ),
        new Upgrade(
            "MK 5", "sniper-mk5", 
            ["the final major tower upgrade", "", "+ 36 damage", "+ 0.1 fire rate", "+ 0.6 range", "+ 1 multishot"], 
            "sniper", 1440, ["sniper-mk4"], {"dg": 36, "fr": 0.1, "rg": 0.6, "sh": 1}
        ),
        new Upgrade(
            "SNIPER AMP", "sniper-PA",
            ["massively increases the", "stats of the tower", "", "+ 44 damage", "+ 0.15 fire rate", "+ 0.65 range"],
            "sniper", 1800, ["sniper-mk5", "sniper-dg3", "sniper-rg3", "sniper-fr3"], {"dg": 44, "fr": 0.15, "rg": 0.65}
        )
    ],
    beam: [
        new Upgrade(
            "MK 1", "beam-mk1", 
            ["the first major tower upgrade", "", "+ 0.1 damage", "+ 0.02 range"], 
            "beam", 115, [], {"dg": 0.1, "rg": 0.02}
        ),
        new Upgrade(
            "Distance I", "beam-rg1",
            ["increases the range of the tower", "", "+ 0.03 range"],
            "beam", 140, ["beam-mk1"], {"rg": 0.03}
        ),
        new Upgrade(
            "Power I", "beam-dg1",
            ["increases the damage of the tower", "", "+ 0.1 damage"],
            "beam", 180, ["beam-mk1"], {"dg": 0.1}
        ),
        new Upgrade(
            "Small Repeater", "beam-rp1",
            ["increases the damage rate of the tower", "", "+ 5 fire rate"],
            "beam", 210, ["beam-mk1"], {"fr": 5}
        ),
        new Upgrade(
            "MK 2", "beam-mk2", 
            ["the second major tower upgrade", "", "+ 0.15 damage", "+ 0.04 range", "+ 1 multishot"], 
            "beam", 230, ["beam-mk1"], {"dg": 0.15, "rg": 0.04, "sh": 1}
        ),
        new Upgrade(
            "Distance II", "beam-rg2",
            ["increaes the range of the tower", "", "+ 0.05 range"],
            "beam", 260, ["beam-rg1", "beam-mk2"], {"rg": 0.05}
        ),
        new Upgrade(
            "Power II", "beam-dg2",
            ["increases the damage of the tower", "", "+ 0.15 damage"],
            "beam", 290, ["beam-dg1", "beam-mk2"], {"dg": 0.15}
        ),
        new Upgrade(
            "MK 3", "beam-mk3", 
            ["the third major tower upgrade", "", "+ 0.2 damage", "+ 0.06 range", "+ 1 multishot"], 
            "beam", 460, ["beam-mk2"], {"dg": 0.2, "rg": 0.06, "sh": 1}
        ),
        new Upgrade(
            "BEAM BOOST", "beam-PB",
            ["increases the stats of the tower", "", "+ 0.25 damage", "+ 0.07 range", "+ 5 fire rate"],
            "beam", 520, ["beam-mk3", "beam-dg2", "beam-rg2", "beam-rp1"], {"dg": 0.25, "rg": 0.07, "fr": 5}
        ),
        new Upgrade(
            "Distance III", "beam-rg3",
            ["massively increases the", "range of the tower", "", "+ 0.07 range"],
            "beam", 550, ["beam-mk3", "beam-PB", "beam-rg2"], {"rg": 0.07}
        ),
        new Upgrade(
            "Power III", "beam-dg3",
            ["massively increases the", "damage of the tower", "", "+ 0.25 damage"],
            "beam", 580, ["beam-mk3", "beam-PB", "beam-dg2"], {"dg": 0.25}
        ),
        new Upgrade(
            "MK 4", "beam-mk4", 
            ["the fourth major tower upgrade", "", "+ 0.25 damage", "+ 0.08 range", "+ 1 multishot"], 
            "beam", 920, ["beam-mk3"], {"dg": 0.25, "rg": 0.08, "sh": 1}
        ),
        new Upgrade(
            "Distance IV", "beam-rg4",
            ["massively increases the", "range of the tower", "", "+ 0.09 range"],
            "beam", 960, ["beam-mk4", "beam-PB", "beam-rg3"], {"rg": 0.07}
        ),
        new Upgrade(
            "Power IV", "beam-dg4",
            ["massively increases the", "damage of the tower", "", "+ 0.25 damage"],
            "beam", 1000, ["beam-mk4", "beam-PB", "beam-dg3"], {"dg": 0.25}
        ),
        new Upgrade(
            "Medium Repeater", "beam-rp2",
            ["increases the fire rate of the tower", "", "+ 5 fire rate"],
            "beam", 1200, ["beam-mk4", "beam-PB", "beam-rp1"], {"fr": 5}
        ),
        new Upgrade(
            "MK 5", "beam-mk5", 
            ["the final major tower upgrade", "", "+ 0.3 damage", "+ 0.1 range", "+ 2 multishot"], 
            "beam", 1840, ["beam-mk4"], {"dg": 0.3, "rg": 0.1, "sh": 2}
        ),
        new Upgrade(
            "BEAM AMP", "beam-PA",
            ["massively increases the", "stats of the tower", "", "+ 0.35 damage", "+ 0.12 range", "+ 10 fire rate", "+ 1 multishot"],
            "beam", 2000, ["beam-mk5", "beam-dg4", "beam-rg4", "beam-rp2"], {"dg": 0.35, "rg": 0.12, "fr": 10, "sh": 1}
        ),
        new Upgrade(
            "Large Repeater", "beam-rp3",
            ["massively increases the", "fire rate of the tower", "", "+ 10 fire rate"],
            "beam", 2200, ["beam-mk5", "beam-PA", "beam-rp2"], {"fr": 10}
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