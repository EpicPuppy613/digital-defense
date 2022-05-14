G.A.A = {
    "config": {
        "size": [
            64, 64
        ],
        "tiles": [
            8, 4
        ],
        "scale": [
            64, 64
        ],
        "defaultscale": [
            64, 64
        ]
    },
    "atlas": {
        "track-": [
            0, 0
        ],
        "track-r": [
            64, 0
        ],
        "track-rl": [
            128, 0
        ],
        "track-l": [
            192, 0
        ],
        "track-d": [
            256, 0
        ],
        "track-rd": [
            320, 0
        ],
        "track-rld": [
            384, 0
        ],
        "track-ld": [
            448, 0
        ],
        "track-ud": [
            0, 64
        ],
        "track-rud": [
            64, 64
        ],
        "track-rlud": [
            128, 64
        ],
        "track-lud": [
            192, 64
        ],
        "track-u": [
            256, 64
        ],
        "track-ru": [
            320, 64
        ],
        "track-rlu": [
            384, 64
        ],
        "track-lu": [
            448, 64
        ],
        "selected": [
            0, 192
        ],
        "selected-invalid": [
            0, 256
        ],
        "spawn": [
            64, 256
        ],
        "base": [
            128, 256
        ],
        "tower": [
            0, 128
        ],
        "basic": [
            64, 128
        ],
        "basic-turret": [
            64, 192
        ],
        "sniper": [
            128, 128
        ],
        "sniper-turret": [
            128, 192
        ],
        "beam": [
            192, 128
        ],
        "beam-turret": [
            192, 192
        ],
        "enemy-basic": [
            192, 256
        ],
        "enemy-heavy": [
            256, 256
        ],
        "enemy-fast": [
            320, 256
        ],
        "multi": [
            256, 128
        ],
        "multi-turret": [
            256, 192
        ],
        "aura": [
            320, 128
        ],
        "aura-turret": [
            320, 192
        ],
        "super": [
            384, 128
        ],
        "super-turret": [
            384, 192
        ],
        "enemy-tank": [
            384, 256
        ],
        "enemy-speeder": [
            448, 256
        ]
    }
}

G.P = new OffscreenCanvas(G.A.A.config.scale[0], G.A.A.config.scale[1]); //PRELOAD
G.PC = G.P.getContext('2d');