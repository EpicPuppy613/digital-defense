/*
0 = empty
1 = platform
b = base

                     
q w e      t        k
a s d    f   h    i   i 
z x c      v        k
                    
*/

/*
new Track("The First Defense", "track1a", "the first one, nice and easy", [
    [ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
    [ 1 ,'d','d','d','d','x', 1 , 1 ,'d','d','d','d','d','d','d','d','x', 1 ],
    [ 1 , 1 , 1 , 1 , 1 ,'x', 1 , 1 ,'w', 1 , 1 , 1 , 1 , 1 , 1 , 1 ,'x', 1 ],
    [ 1 ,'x','a','a', 1 ,'x', 1 , 1 ,'w', 1 , 1 , 1 , 1 , 1 , 1 , 1 ,'x', 1 ],
    [ 1 ,'x', 1 ,'w', 1 ,'x', 1 , 1 ,'w', 1 , 1 ,'x','a','a', 1 , 1 ,'x', 1 ],
    [ 1 ,'x', 1 ,'w', 1 ,'x', 1 , 1 ,'w', 1 , 1 ,'x', 1 ,'w', 1 , 1 ,'x', 1 ],
    [ 1 ,'x', 1 ,'w','a','a', 1 , 1 ,'w', 1 , 1 ,'x', 1 ,'w', 1 , 1 ,'x', 1 ],
    [ 1 ,'x', 1 , 1 , 1 , 1 , 1 , 1 ,'w', 1 , 1 ,'x', 1 ,'w', 1 , 1 ,'x', 1 ],
    [ 1 ,'x', 1 , 1 , 1 , 1 , 1 , 1 ,'w', 1 , 1 ,'x', 1 ,'w', 1 , 1 ,'x', 1 ],
    [ 1 ,'d','d','d','d','d','d','d','w', 1 , 1 ,'b', 1 ,'w','a','a','a', 1 ],
    [ 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ]
],[
    {
        "type": "spawn",
        "pos": [1, 1]
    },
    {
        "type": "base",
        "pos": [11, 9]
    }
],{
    "start": [0, 0],
    "size": [18, 11],
    "lines": [
        [[1, 1], [5, 1], [5, 6], [3, 6], [3, 3], [1, 3], [1, 9], [8, 9], [8, 1], [16, 1], [16, 9], [13, 9], [13, 4], [11, 4], [11, 9]]
    ]
}, 1, true);
*/

new Track("Blank", "blank", "template", [
    []
],[

],{
    "start": [0, 0],
    "size": [1, 1],
    "lines": [
        
    ]
}, 1, false);

G.data.upgrades = {
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

for (const tower in G.data.upgrades) {
    for (const upgrade of G.data.upgrades[tower]) {
        upgrade.tower = tower;
        console.log(JSON.stringify(upgrade, null, 4));
    }
}