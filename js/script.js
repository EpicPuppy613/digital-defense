//override 
Array.prototype.includes = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

const TC = new OffscreenCanvas(8, 8); //TEXT CANVAS
const TCX = TC.getContext('2d');

const G = {}; //GAME
/** @type {HTMLCanvasElement} */
G.canvas = document.getElementById('main');
/** @type {CanvasRenderingContext2D} */
G.C = G.canvas.getContext('2d'); //CANVAS
G.canvas.width = window.innerWidth + 1;
G.canvas.height = window.innerHeight + 1;
G.width = G.canvas.width; //GAME WIDTH
G.height = G.canvas.height; //GAME HEIGHT
G.map = "test";
G.wave = 0;
G.wavetimer = 0;
G.wavespawn = 0;
G.wavespawned = 0;
G.wavetotal = 0;
G.wavespace = 0;
G.waveset = "test";
G.speed = 2;
G.multi = 1;
G.speeds = [0, 0.5, 1, 2, 4];
G.maxspeed = 4;
G.alternate = false;
G.skip = false;
G.tick = true;
G.pause = false;
G.DEEEEEEEEBUG = false;
G.time = 0;
G.path = [];
G.S = {}; //SETTINGS
G.S.mapy = 0;
//W-SETTINGS
// -----[SETTINGS]-----
G.S.extendedtargeting = false; //Extended targetting options
G.S.MORESPEED = true; //MORE speed options
G.S.lives = 1.0; //Lives multiplier
G.S.mapx = Math.floor(G.width / 5); //Minimap X max width
G.S.cheatmode = true; //Enable increased starting money & lives
// --------------------
if (G.S.MORESPEED) {
    G.speeds = [0, 0.5, 1, 2, 3, 4, 6, 8, 12, 16];
    G.maxspeed = 9;
}
G.M = {}; //MOUSE
G.M.X = 0; //MOUSE X
G.M.Y = 0; //MOUSE Y
G.N = {}; //NAVIGATION
G.N.B = {}; //BUTTONS
G.N.pos = 0; //MENU POSITION
G.scene = 'm'; //SCENE
G.boss = null;
G.A = {}; //ASSETS
/** @type {Track{}} */
G.A.M = {}; //MAPS
G.A.TS = [64, 64]; //TILE SCALE
G.A.DS = [64, 64]; //DEFAULT SCALE
G.A.S = 1; //SCALE
G.A.A = {}; //TEXTURE ATLASES
G.A.T = {}; //TEXTURE DIRECTORY
G.A.loaded = false; //GAME LOADED
G.D = ["", "", "", "", "", "", "", ""]; //CONSOLE
/** @type {DEbugMsg[]} */
G.DC = []; //Debug Componenets
G.A.L = {}; //LOCATIONS
G.A.L.S = []; //SPAWNS
G.A.C = {}; //CURSOR
G.A.C.on = false;
G.A.C.pos = 0; //CURSOR ANIMATION FRAME
G.A.C.X = 2; //CURSOR X
G.A.C.Y = 2; //CURSOR Y
G.O = {}; //OFFSET
G.O.X = 0;
G.O.Y = 0;
/** TRACK SELECT */
G.TS = {};
G.TS.page = 0;
/** options */
G.TS.O = [];
/** available */
G.TS.A = [];
G.T = {};
/** projectiles */
G.T.P = [];
/** tiles */
G.T.T = [];
/** locations */
G.T.L = [];
/** buildings */
G.T.B = [];
/** enemies */
G.T.E = [];
G.B = []; //BUTTONS
G.U = {};
G.U.on = false;
G.U.anim = 0;
G.points = 0;
G.basepoints = 150;
G.basehp = 25;
G.hp = Math.round(G.basehp * G.S.lives);
G.maxhp = Math.round(G.basehp * G.S.lives);

if (G.S.cheatmode) {
    G.basepoints *= 1000;
    G.basehp *= 100;
}

K = {}; //HOTKEYS
S = {}; //SCENES
T = {}; //TARGETING
T.T = {};
T.L = [];

const E = {}; //EDITOR
E.C = {}; //MAP BOUNDS
E.C.LX = 0; //LEFT
E.C.TY = 0; //TOP
E.C.RX = 0; //RIGHT
E.C.BY = 0; //BOTTOM
E.D = {}; //DIRECTIONS
E.D.L = false; //LEFT
E.D.R = false; //RIGHT
E.D.U = false; //UP
E.D.D = false; //DOWN
E.D.B = false; //BASE
E.D.P = false; //PLATFORM

const A = {}; //AUDIO
A.M = {}; //MUSIC
A.M.M = [
    {
        "scenes": ['m', 't'],
        "pool": ["audio/menua.mp3"]
    },
    {
        "scenes": ['s', 'ss', 'sg', 'sb'],
        "pool": ["audio/settings.mp3"]
    }
]; //MUSIC
A.M.T = 1; //TRANSITION
A.M.S = false; //SWITCH
A.M.D = [ //DEFAULT
    "audio/menua.mp3"
]
/** @type {HTMLAudioElement} */
A.M.C = null; //CURRENT
A.V = {}; //VOLUME
A.V.M = 1; //MUSIC VOLUME
A.V.S = 1; //SFX VOLUME

G.R = {}; //REBINDING
G.R.P = 0; //REBINDING PAGE
G.R.R = undefined; //REBIND
//W-REBIND
S = [
    {
        category: "General",
        bindings: ["deselect", "wave", "quit", "back"]
    },
    {
        category: "Movement",
        bindings: ["right", "left", "up", "down", "recenter"]
    },
    {
        category: "Timing",
        bindings: ["slow", "speed", "pause"]
    },
    {
        category: "Towers [1/2]",
        bindings: ["basic", "sniper", "beam", "multi", "aura", "super"]
    },
    {
        category: "Towers [2/2]",
        bindings: ["destroy", "upgrade1", "upgrade2", "upgrade3", "nexttargeting", "prevtargeting"]
    },
    {
        category: "Editor",
        bindings: ["eright", "eleft", "eup", "edown", "ebase"]
    }
];

function NextAudio (src) {
    A.M.C = new Audio();
    A.M.C.src = src;
    A.M.C.volume = A.V.M;
    A.M.C.oncanplay = function () {
        this.play();
    }
    A.M.C.onpause = function () {
        A.M.S = false;
        for (const pool of A.M.M) {
            if (pool.scenes.includes(G.scene)) {
                NextAudio(pool.pool[Math.floor(Math.random() * pool.pool.length)]);
                return;
            }
        }
        NextAudio(A.M.D[Math.floor(Math.random() * A.M.D.length)]);
    }
}

setTimeout(() => NextAudio(A.M.D[Math.floor(Math.random() * A.M.D.length)]), 500);

String.prototype.formatDuration = function () {
    var sec_num = Math.floor(parseInt(this, 10)); // don't forget the second param
    var days = Math.floor(sec_num / 86400);
    var hours = Math.floor((sec_num % 86400) / 3600);
    var minutes = Math.floor((sec_num % 3600) / 60);
    var seconds = sec_num % 60;

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    if (hours < 1 && days < 1) return minutes + ':' + seconds;
    if (days < 1) return hours + ':' + minutes + ':' + seconds;
    return `${days}:${hours}:${minutes}:${seconds}`;
}

class DEbugMsg {
    /**
     * 
     * @param {null|String} label 
     * @param {null|Function} content 
     * @param {String=} color 
     * @param {'r'|'l'} side
     * @param {Number=} indent 
     * @param {Boolean=} hscroll 
     */
    constructor(label, content, color = 'white', side = 'l', indent = 0, hscroll = false) {
        this.label = label;
        this.content = content;
        this.side = side;
        this.color = color;
        this.indent = indent;
        this.hscroll = hscroll;
        G.DC.push(this);
    }
    out() {
        var indent = "";
        if (this.side == 'r') {
            for (var i = 0; i < this.indent; i++) {
                indent += " -";
            }
            if (this.content == null) return this.label + indent;
            else if (this.label == null) return this.content() + indent;
            return this.label + ": " + this.content() + indent;
        } else {
            for (var i = 0; i < this.indent; i++) {
                indent += "- ";
            }
            if (this.content == null) return indent + this.label;
            else if (this.label == null) return indent + this.content();
            return indent + this.label + ": " + this.content();
        }

    }
}

class Tile {
    /**
     * 
     * @param {String} type 
     * @param {Number} x 
     * @param {Number} y 
     * @param {String} texture 
     * @param {String} direction - rlud
     */
    constructor(type, x, y, texture, direction) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.direction = direction;
        /** @type {null|Tower} */
        this.tower = null;
        this.paths = '';
        G.T.T.push(this);
    }
}

class Location {
    constructor(type, x, y, texture) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.texture = texture;
        G.T.L.push(this);
    }
}

class Track {
    /**
     * 
     * @param {String} name 
     * @param {String} desc 
     * @param {any[][]} track 
     * @param {Object[]} locations
     * @param {String} locations[].type - type of location (spawn / base)
     * @param {Number[]} locations[].pos - position of location (tile grid x,y)
     * @param {Object} map
     * @param {Number[]} map.start - top left corner (in tiles) of map
     * @param {Number[]} map.size - size (in tiles) of map
     * @param {Number[][][]} map.lines - array of lines that are arrays containing an array of the points of the line
     * @param {Number} difficulty - ranked on a scale from 1-10
     * @param {Boolean} available
     */
    constructor(name, id, desc, track, locations, map, difficulty, available=true) {
        this.name = name;
        this.id = id;
        this.desc = desc;
        this.track = track;
        this.locations = locations;
        this.map = map;
        this.difficulty = difficulty;
        this.available = available;
        if (this.available) {
            G.TS.A.push(this.id);
        }
        G.A.M[this.id] = this;
    }
}

class TowerPrototype {
    /**
     * 
     * @param {String} name 
     * @param {String} type 
     * @param {String} texture 
     * @param {String} turret 
     * @param {Number} firerate 
     * @param {Number} damage 
     * @param {Number} range 
     * @param {String} color 
     * @param {Number[]} offset 
     * @param {Number} firewidth 
     * @param {Number} fireduration 
     * @param {Number} shots 
     * @param {Number} cost 
     * @param {Object[]} tiers 
     * @param {Number} tiers[].level
     * @param {String[]} tiers[].req
     * @param {String} tiers[].texture
     * @param {String} tiers[].turret
     * @param {Object} tiers[].add
     * @param {Number} tiers[].add.dg - damage
     * @param {Number} tiers[].add.fr - fire rate
     * @param {Number} tiers[].add.rg - range
     * @param {Number} tiers[].add.sh - shots
     * @param {Number} tiers[].add.to - turret offset
     * @param {Number} tiers[].add.fw - fire width
     * @param {Number} tiers[].add.fd - fire duration
     */
    constructor(name, type, texture, turret, firerate, damage, range, color, offset, firewidth, fireduration, shots, cost, tiers = []) {
        this.name = name;
        this.type = type;
        this.texture = texture;
        this.turret = turret;
        this.firerate = firerate;
        this.damage = damage;
        this.range = range;
        this.color = color;
        this.offset = offset;
        this.firewidth = firewidth;
        this.fireduration = fireduration;
        this.shots = shots;
        this.cost = cost;
        this.tiers = tiers;
    }
    generate(x, y) {
        new Tower(
            this.name, this.type, x, y,
            this.texture, this.turret,
            this.firerate, this.damage, this.range, this.color, this.offset,
            this.firewidth, this.fireduration, this.shots, this.cost, this.tiers
        );
    }
}
class Tower {
    /**
     * tower
     * @param {String} type 
     * @param {Number} x 
     * @param {Number} y 
     * @param {String} texture 
     * @param {String} turret 
     * @param {Number} rotspeed 
     * @param {Number} firerate 
     * @param {Number} damage 
     * @param {Number} range 
     * @param {String} color 
     * @param {Number} offset 
     * @param {Object[]} tiers 
     * @param {Number} tiers[].level
     * @param {String[]} tiers[].req
     * @param {String} tiers[].texture
     * @param {String} tiers[].turret
     * @param {Object} tiers[].add
     * @param {Number} tiers[].add.dg - damage
     * @param {Number} tiers[].add.fr - fire rate
     * @param {Number} tiers[].add.rg - range
     * @param {Number} tiers[].add.sh - shots
     * @param {Number} tiers[].add.to - turret offset
     * @param {Number} tiers[].add.fw - fire width
     * @param {Number} tiers[].add.fd - fire duration
     * @prop {Boolean} tiers[].achieved
     */
    constructor(name, type, x, y, texture, turret, firerate, damage, range, color, offset, firewidth, fireduration, shots = 1, value = 0, tiers = []) {
        this.name = name;
        this.type = type;
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.turret = turret;
        this.firerate = firerate;
        this.reload = 1 / firerate;
        this.cooldown = 0;
        this.shots = shots;
        this.damage = damage;
        this.level = 1;
        this.direction = 0;
        this.range = range;
        this.color = color;
        this.tiers = tiers;
        for (const tier of this.tiers) {
            tier.achieved = false;
        }
        this.offset = offset;
        this.left = false;
        this.right = false;
        this.width = firewidth;
        this.duration = fireduration;
        this.level = 1;
        this.earned = 0;
        this.kills = 0;
        this.upgrades = [];
        this.available = [];
        this.value = value;
        this.refund = Math.round(value * 0.75);
        this.targeting = 'f'; //First, Last, Health, Speed, Damage, Rewardpoo
        this.tnum = 0;
        getTile(this.x, this.y).tower = this;
        G.T.B.push(getTile(this.x, this.y).tower);
    }
    tick() {
        //find enemy
        while (this.cooldown <= 0) {
            var shots = this.shots;
            var sort = [];
            var property = 'distance';
            var reverse = false;
            for (const targeting in T.T) {
                if (this.targeting == targeting) {
                    property = T.T[targeting].property;
                    reverse = T.T[targeting].reverse;
                }
            }
            for (var e = 0; e < G.T.E.length; e++) {
                sort.push([e, G.T.E[e][property], G.T.E[e].distance]);
            }
            sort.sort((a, b) => b[2] - a[2]);
            sort.sort((a, b) => b[1] - a[1]);
            if (reverse) sort.reverse();
            var fire = false;
            for (const s of sort) {
                var enemy = G.T.E[s[0]];
                var difx = enemy.x * G.A.TS[0] - (this.x + 0.5) * G.A.TS[0];
                var dify = enemy.y * G.A.TS[1] - (this.y + 0.5) * G.A.TS[1];
                if (!(difx ** 2 + dify ** 2 <= (this.range * G.A.TS[0]) ** 2)) continue;
                var direction = (Math.atan2(enemy.y * G.A.TS[1] - (this.y + 0.5) * G.A.TS[1], enemy.x * G.A.TS[0] - (this.x + 0.5) * G.A.TS[0]) * (180 / Math.PI)) + 90;
                var directionDiff = direction - this.direction;
                if (directionDiff > 180) directionDiff -= 360;
                else if (directionDiff < -180) directionDiff += 360;
                if (this.cooldown <= 0/*Math.abs(directionDiff) < this.rotspeed / 50*/) {
                    this.direction = direction;
                }
                var distance = (difx / Math.cos((direction - 90) * (Math.PI / 180)));
                var hit = [distance * Math.sin(this.direction * (Math.PI / 180)), -distance * Math.cos(this.direction * (Math.PI / 180))];
                //G.D = [difx, dify, hit];
                if (
                    hit[0] >= difx - enemy.hitbox[0] / 2 &&
                    hit[0] <= difx + enemy.hitbox[0] / 2 &&
                    hit[1] >= dify - enemy.hitbox[1] / 2 &&
                    hit[1] <= dify + enemy.hitbox[1] / 2 &&
                    this.cooldown <= 0
                ) {
                    fire = true;
                    var prevhp = JSON.parse(JSON.stringify(enemy.hp));
                    enemy.hp -= this.damage;
                    if (enemy.hp <= 0 && prevhp > 0) { this.kills++; this.earned += enemy.reward; }
                    var offset = [(this.offset / G.A.TS[0]) * Math.sin(this.direction * (Math.PI / 180)), -(this.offset / G.A.TS[1]) * Math.cos(this.direction * (Math.PI / 180))];
                    G.T.P.push(new Laser(this.width, this.color, hit[0] / G.A.TS[0] + (this.x + 0.5), hit[1] / G.A.TS[1] + (this.y + 0.5),
                        (this.x + 0.5) + offset[0],
                        (this.y + 0.5) + offset[1],
                        this.duration));
                }
                shots--
                if (shots < 1) break;
            }
            if (this.cooldown <= 0 && fire) {
                this.cooldown += this.reload;
            }
            if (!fire) break;
        }
        if (this.cooldown > 0) this.cooldown -= (1 / F.time);
    }
    targetchange(change) {
        this.tnum += change;
        if (this.tnum >= T.L.length) this.tnum -= T.L.length;
        if (this.tnum < 0) this.tnum += T.L.length;
        this.targeting = T.L[this.tnum];
    }
    refreshupgrades() {
        if (this.available.length != 0) return;
        var pool = [];
        for (const upgrade of G.A.U[this.type]) {
            if (this.upgrades.includes(upgrade.id)) continue;
            var buyable = true;
            for (const req of upgrade.req) {
                if (this.upgrades.includes(req)) continue;
                buyable = false;
            }
            if (!buyable) continue;
            pool.push(upgrade);
        }
        if (pool.length <= 3) {
            this.available = pool;
            return;
        }
        for (var i = 0; i < 3; i++) {
            var choose = Math.floor(Math.random() * pool.length);
            this.available.push(pool[choose]);
            pool.splice(choose, 1);
        }
    }
}

class Laser {
    constructor(width, color, x1, y1, x2, y2, duration) {
        this.width = width;
        this.color = color;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.duration = duration;
    }
    tick() {
        this.duration -= 1 / F.time;
        if (this.duration <= 0) return true;
    }
}

class EnemyPrototype {
    constructor(type, id, size, texture, hp, damage, speed, hitbox, reward, color1, color2, boss = false) {
        this.type = type;
        this.id = id;
        this.size = size;
        this.texture = texture;
        this.hp = hp;
        this.damage = damage;
        this.speed = speed;
        this.hitbox = hitbox;
        this.reward = reward;
        this.color1 = color1;
        this.color2 = color2;
        this.boss = boss;
    }
    generate(hpmult, speedmult, rewardmult) {
        var tile = Math.floor(Math.random() * G.A.L.S.length);
        var img = G.A.T[this.texture];
        G.T.E.push(new Enemy(
            (G.A.L.S[tile][0] + this.size[0] / (2 * img.atlas.config.scale[0])) + Math.floor(Math.random() * (1 - this.size[0] / img.atlas.config.scale[0]) * img.atlas.config.scale[0]) / img.atlas.config.scale[0],
            (G.A.L.S[tile][1] + this.size[1] / (2 * img.atlas.config.scale[1])) + Math.floor(Math.random() * (1 - this.size[1] / img.atlas.config.scale[1]) * img.atlas.config.scale[1]) / img.atlas.config.scale[1],
            // G.A.L.S[tile][0] * G.A.A.config.scale[0],
            // G.A.L.S[tile][1] * G.A.A.config.scale[1], 
            G.A.L.S[tile], this.type, this.size, this.texture, this.hp * hpmult, this.damage, this.speed * speedmult,
            this.hitbox, Math.round(this.reward * rewardmult), this.color1, this.color2));
        return G.T.E[-1];
    }
}

class Enemy {
    constructor(x, y, tile, type, size, texture, hp, damage, speed, hitbox, reward, color1, color2) {
        this.x = JSON.parse(JSON.stringify(x));
        this.y = JSON.parse(JSON.stringify(y));
        this.tile = JSON.parse(JSON.stringify(tile));
        this.size = size;
        this.type = type;
        this.texture = texture;
        this.hp = JSON.parse(JSON.stringify(hp));
        this.maxhp = this.hp;
        this.damage = JSON.parse(JSON.stringify(damage));
        this.speed = JSON.parse(JSON.stringify(speed));
        this.direction = [0, 0];
        this.movement = 0;
        this.hitbox = hitbox;
        this.reward = reward;
        this.distance = 0;
        this.color1 = color1;
        this.color2 = color2;
    }
    tick() {
        if (this.movement <= 0) {
            var direction;
            if (getTile(this.tile[0], this.tile[1], true).direction.length > 1) {
                direction = getTile(this.tile[0], this.tile[1], true).direction[Math.floor(Math.random() * getTile(this.tile[0], this.tile[1], true).direction.length)];
            } else {
                direction = getTile(this.tile[0], this.tile[1], true).direction
            }
            switch (direction) {
                case 'l':
                    this.direction = [-1, 0];
                    this.movement += 1;
                    this.tile[0] -= 1;
                    break;
                case 'r':
                    this.direction = [1, 0];
                    this.movement += 1;
                    this.tile[0] += 1;
                    break;
                case 'u':
                    this.direction = [0, -1];
                    this.movement += 1;
                    this.tile[1] -= 1;
                    break;
                case 'd':
                    this.direction = [0, 1];
                    this.movement += 1;
                    this.tile[1] += 1;
                    break;
                case 'b':
                    G.hp -= this.damage;
                    return true;
                    break;
            }
        } else {
            this.x += this.direction[0] * this.speed / F.time;
            this.y += this.direction[1] * this.speed / F.time;
            this.movement -= Math.abs(((this.direction[0] * this.speed) + (this.direction[1] * this.speed)) / F.time);
        }
        this.distance = G.path.indexOf(Math.floor(this.x) + ',' + Math.floor(this.y));
        if (this.direction[0] > 0) {
            this.distance += this.x - Math.floor(this.x);
        }
        if (this.direction[0] < 0) {
            this.distance += 1 - (this.x - Math.floor(this.x));
        }
        if (this.direction[1] > 0) {
            this.distance += this.y - Math.floor(this.y);
        }
        if (this.direction[1] < 0) {
            this.distance += 1 - (this.y - Math.floor(this.y));
        }
        if (this.hp <= 0) {
            G.points += this.reward;
            return true;
        }
    }
}

class Upgrade {
    /**
     * 
     * @param {String} name 
     * @param {String} id 
     * @param {String[]} desc 
     * @param {String} tower 
     * @param {Number} cost 
     * @param {String[]} req 
     * @param {Object} add 
     * @param {Number} add.dg - damage
     * @param {Number} add.fr - fire rate
     * @param {Number} add.rg - range
     * @param {Number} add.sh - shots
     * @param {Number} add.to - turret offset
     * @param {Number} add.fw - fire width
     * @param {Number} add.fd - fire duration
     */
    constructor(name, id, desc, tower, cost, req, add) {
        this.name = name;
        this.id = id;
        this.desc = desc;
        this.tower = tower;
        this.cost = cost;
        this.req = req;
        this.add = add;
    }
}
class TextureConfig {
    constructor(sizex, sizey, tilex, tiley, scalex, scaley) {
        this.size = [sizex, sizey];
        this.tiles = [tilex, tiley];
        this.scale = [scalex, scaley];
        this.defaultscale = [scalex, scaley];
    }
}

class TextureAtlas {
    constructor(id, src, config, items) {
        this.id = id;
        this.config = config;
        this.src = src;
        this.items = items;
        G.A.A[this.id] = this;
        this.img = new Image();
        this.img.src = this.src;
        this.P = new OffscreenCanvas(this.config.size[0], this.config.size[1]);
        this.PC = this.P.getContext('2d');
        for (const i of this.items) {
            i.xpos = i.xpos * this.config.size[0];
            i.ypos = i.ypos * this.config.size[1];
            i.atlas = this;
            G.A.T[i.id] = i;
        }
    }
}

class TextureEntry {
    constructor(id, xpos, ypos) {
        this.id = id;
        this.xpos = xpos;
        this.ypos = ypos;
    }
}

class MenuButton {
    constructor(id, x, y, width, height, action, scene) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.hover = false;
        this.action = action;
        this.scene = scene;
        G.N.B[this.id] = this;
    }
    collide(x, y) {
        var px;
        var py;
        var pw;
        var ph;
        if (typeof this.x == 'function') px = this.x();
        else px = this.x;
        if (typeof this.y == 'function') py = this.y();
        else py = this.y;
        if (typeof this.w == 'function') pw = this.w();
        else pw = this.w;
        if (typeof this.h == 'function') ph = this.h();
        else ph = this.h;
        return (
            px < x &&
            px + pw > x &&
            py < y &&
            py + ph > y &&
            G.scene == this.scene
        );
    }
}

class Targeting {
    constructor(name, id, property, reverse, color, available = true, condition = () => true) {
        this.name = name;
        this.id = id;
        this.property = property;
        this.reverse = reverse;
        this.color = color;
        this.available = available;
        this.condition = condition;
        T.T[id] = this;
        if (this.available) T.L.push(this.id);
    }
}

function debug(msg) {
    G.D.push(msg);
    G.D.shift();
}

//W-TARGETING
new Targeting('First', 'f', 'distance', false, '#007eeb');
new Targeting('Last', 'l', 'distance', true, '#00cb3e');
new Targeting('Strong', 'h', 'hp', false, '#b700dc');
new Targeting('Fast', 's', 'speed', false, '#eded00');
new Targeting('Lives', 'd', 'damage', false, '#f17a00', false);
new Targeting('Max HP', 'm', 'maxhp', false, '#f30000', false);

/**
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} object 
 * @returns {Tile}
 */
function getTile(x, y, object = false) {
    for (const tile of G.T.T) {
        //Check if matching tile
        if (tile.x == x && tile.y == y) {
            return tile; //Return tile
        }
    }
    //Return null if no tile
    if (object) return { type: null, x: null, y: null, texture: null, direction: null, tower: null, paths: null };
    else return null;
}

function delTile(x, y) {
    for (t = 0; t < G.T.T.length; t++) {
        if (G.T.T[t].x == x && G.T.T[t].y == y) {
            G.T.T.splice(t, 1);
            return true;
        }
    }
    return false;
}

/**
 * 
 * @param {Track} mapdata 
 */
function loadMap(mapdata) {
    G.A.L.S = [];
    G.T = {};
    G.T.P = [];
    G.T.T = [];
    G.T.L = [];
    G.T.B = [];
    G.T.E = [];
    for (var y = 0; y < mapdata.track.length; y++) {
        for (var x = 0; x < mapdata.track[y].length; x++) {
            switch (mapdata.track[y][x]) {
                case 0:
                    break;
                case 1:
                    new Tile('platform', x, y, 'tower');
                    break;
                case 'a':
                    new Tile('track', x, y, 'track-', 'l');
                    break;
                case 'd':
                    new Tile('track', x, y, 'track-', 'r');
                    break;
                case 'w':
                    new Tile('track', x, y, 'track-', 'u');
                    break;
                case 'x':
                    new Tile('track', x, y, 'track-', 'd');
                    break;
                case 'q':
                    new Tile('track', x, y, 'track-', 'lu');
                    break;
                case 'e':
                    new Tile('track', x, y, 'track-', 'ru');
                    break;
                case 'c':
                    new Tile('track', x, y, 'track-', 'rd');
                    break;
                case 'z':
                    new Tile('track', x, y, 'track-', 'ld');
                    break;
                case 'f':
                    new Tile('track', x, y, 'track-', 'lud');
                    break;
                case 'h':
                    new Tile('track', x, y, 'track-', 'rud');
                    break;
                case 't':
                    new Tile('track', x, y, 'track-', 'lru');
                    break;
                case 'v':
                    new Tile('track', x, y, 'track-', 'lrd');
                    break;
                case 'i':
                    new Tile('track', x, y, 'track-', 'lr');
                    break;
                case 'k':
                    new Tile('track', x, y, 'track-', 'ud');
                    break;
                case 's':
                    new Tile('track', x, y, 'track-', 'rlud');
                    break;
                case 'b':
                    new Tile('track', x, y, 'track-', 'b');
                    break;
            }
        }
    }
    for (var i = 0; i < mapdata.locations.length; i++) {
        new Location(mapdata.locations[i].type, mapdata.locations[i].pos[0], mapdata.locations[i].pos[1], mapdata.locations[i].type);
        if (mapdata.locations[i].type == "spawn") G.A.L.S.push(mapdata.locations[i].pos);
    }
    for (var t = 0; t < G.T.T.length; t++) {
        if (G.T.T[t].type != 'track' || G.T.T[t].paths != '') continue;
        var r = false;
        var l = false;
        var u = false;
        var d = false;
        tile = G.T.T[t];
        if (getTile(G.T.T[t].x + 1, G.T.T[t].y, true).type == 'track') if (getTile(G.T.T[t].x + 1, G.T.T[t].y, true).direction.includes('l')) r = true;
        if (getTile(G.T.T[t].x - 1, G.T.T[t].y, true).type == 'track') if (getTile(G.T.T[t].x - 1, G.T.T[t].y, true).direction.includes('r')) l = true;
        if (getTile(G.T.T[t].x, G.T.T[t].y - 1, true).type == 'track') if (getTile(G.T.T[t].x, G.T.T[t].y - 1, true).direction.includes('d')) u = true;
        if (getTile(G.T.T[t].x, G.T.T[t].y + 1, true).type == 'track') if (getTile(G.T.T[t].x, G.T.T[t].y + 1, true).direction.includes('u')) d = true;
        if (tile.direction.includes('r')) r = true;
        if (tile.direction.includes('l')) l = true;
        if (tile.direction.includes('u')) u = true;
        if (tile.direction.includes('d')) d = true;
        if (r) tile.paths += 'r';
        if (l) tile.paths += 'l';
        if (u) tile.paths += 'u';
        if (d) tile.paths += 'd';
        G.T.T[t].texture = 'track-' + G.T.T[t].paths;
    }
    G.S.mapy = Math.floor((G.S.mapx / mapdata.map.size[0]) * mapdata.map.size[1]);
    //RECURSIVE PATHFINDING NOOOOOOOOOOOOOOOOOOOOOOOOO
    var routes = 0;
    var path = [];
    var spawns = [];
    var checks = [];
    for (const location of mapdata.locations) {
        if (location.type == "base") {
            checks.push(location.pos);
            G.path.push(location.pos[0] + "," + location.pos[1]);
            routes++;
        }
        if (location.type == "spawn") {
            spawns.push(location.pos[0] + "," + location.pos[1]);
        }
    }
    var p = 0;
    while (routes > 0) {
        //UP
        var tile = getTile(checks[p][0], checks[p][1] - 1, true);
        if (tile.type == 'track') if (tile.direction.includes('d')) {
            if (!G.path.includes((checks[p][0]) + "," + (checks[p][1] - 1))) {
                //alert(!path.includes([checks[p][0], checks[p][1] - 1]) + JSON.stringify(path) + JSON.stringify([checks[p][0], checks[p][1] - 1]));
                G.path.push((checks[p][0]) + "," + (checks[p][1] - 1));
                if (!spawns.includes((checks[p][0]) + "," + (checks[p][1] - 1))) { routes++; checks.push([checks[p][0], checks[p][1] - 1]); }
            }
        }
        //LEFT
        var tile = getTile(checks[p][0] - 1, checks[p][1], true);
        if (tile.type == 'track') if (tile.direction.includes('r')) {
            if (!G.path.includes((checks[p][0] - 1) + "," + (checks[p][1]))) {
                //alert(!path.includes([checks[p][0], checks[p][1] - 1]));
                G.path.push((checks[p][0] - 1) + "," + (checks[p][1]));
                if (!spawns.includes((checks[p][0] - 1) + "," + (checks[p][1]))) { routes++; checks.push([checks[p][0] - 1, checks[p][1]]); }
            }
        }
        //DOWN
        var tile = getTile(checks[p][0], checks[p][1] + 1, true);
        if (tile.type == 'track') if (tile.direction.includes('u')) {
            if (!G.path.includes((checks[p][0]) + "," + (checks[p][1] + 1))) {
                //alert(!path.includes([checks[p][0], checks[p][1] - 1]));
                G.path.push((checks[p][0]) + "," + (checks[p][1] + 1));
                if (!spawns.includes((checks[p][0]) + "," + (checks[p][1] + 1))) { routes++; checks.push([checks[p][0], checks[p][1] + 1]); }
            }
        }
        //RIGHT
        var tile = getTile(checks[p][0] + 1, checks[p][1], true);
        if (tile.type == 'track') if (tile.direction.includes('l')) {
            if (!G.path.includes((checks[p][0] + 1) + "," + (checks[p][1]))) {
                //alert(!path.includes([checks[p][0], checks[p][1] - 1]));
                G.path.push((checks[p][0] + 1) + "," + (checks[p][1]));
                if (!spawns.includes((checks[p][0] + 1) + "," + (checks[p][1]))) { routes++; checks.push([checks[p][0] + 1, checks[p][1]]); }
            }
        }
        routes--;
        p++;
    }
    G.path.reverse();
}

G.nodes = [];

G.canvas.addEventListener('mousemove', e => {
    G.M.X = e.offsetX;
    G.M.Y = e.offsetY;
    for (const button in G.N.B) {
        G.N.B[button].hover = G.N.B[button].collide(e.offsetX, e.offsetY);
    }
});

//FRAME STUFF
F = {};
F.last = performance.now();
F.fps = Array(48).fill(0);
F.time = 1;
F.limit = 60;
F.limiti = 3;
F.limits = [24, 30, 50, 60, 120, 240, "None"];

G.loop = setInterval(Main, 1000 / F.limit);

fload = window.localStorage.getItem("FPS");
if (fload != null) {
    F.limiti = Math.max(0, Math.min(F.limits.length - 1, parseInt(fload)));
    F.limit = F.limits[F.limiti];
    clearInterval(G.loop);
    if (F.limit == "None") G.loop = setInterval(Main, 0);
    else G.loop = setInterval(Main, 1000 / F.limit);
}

function Main() {
    F.time = 1000 / (performance.now() - F.last);
    F.last = performance.now();
    F.fps.push(F.time);
    F.fps.shift();
    try {
        if (A.M.S) {
            A.M.T -= 0.5 / F.time;
            if (A.M.T <= 0) A.M.C.pause();
        } else {
            A.M.T = 1;
        }
        A.M.C.volume = A.V.M * A.M.T;
    } catch (err) {
        debug('audio fail');
        A.M.S = false;
    }
    G.C.clearRect(0, 0, G.width, G.height);
    G.C.fillStyle = 'black';
    G.C.fillRect(0, 0, G.width, G.height);
    G.A.C.pos += 180 / F.time;
    if (G.A.C.pos >= 360) {
        G.A.C.pos -= 360;
    }
    try {
        Draw();
        if (G.scene == 'g' && G.pause) {
            for (const b of G.T.B) {
                b.refreshupgrades();
            }
        }
        else if (G.scene == 'g' && !G.pause) {
            for (var r = 0; r < G.multi; r++) {
                if (G.alternate && G.skip) G.skip = false
                else {
                    G.skip = true;
                    for (const b of G.T.B) {
                        b.tick();
                        b.refreshupgrades();
                    }
                    for (var e = 0; e < G.T.E.length; e++) {
                        if (G.T.E[e].tick()) {
                            if (G.T.E[e] === G.boss) {
                                G.boss = null;
                            }
                            G.T.E.splice(e, 1);
                            e--;
                        }
                    }
                    for (var p = 0; p < G.T.P.length; p++) {
                        if (G.T.P[p].tick()) {
                            G.T.P.splice(p, 1);
                            p--;
                        }
                    }
                    if (G.wave != 0) G.time += 1 / F.time;
                    G.wavetimer -= 1 / F.time;
                    G.wavespawn -= 1 / F.time;
                }
                if (G.wave != 0 && G.wavespawn + (G.wavespace * G.wavespawned) - G.wavetotal <= 0 && G.wavespawn >= 0) {
                    spawn = G.A.D.W[G.waveset].key[G.A.D.W[G.waveset].W[G.wave - 1][5][G.wavespawned]];
                    if (spawn != null) {
                        G.A.E[spawn].generate(G.A.D.W[G.waveset].W[G.wave - 1][0], G.A.D.W[G.waveset].W[G.wave - 1][1], G.A.D.W[G.waveset].W[G.wave - 1][2]);
                        if (G.A.E[spawn].boss) {
                            G.boss = G.T.E[G.T.E.length - 1];
                        }
                    }
                    G.wavespawned++;
                }
                if (G.wavetimer < 0 && G.wave != 0) NextWave();
            }
        }
        //G.D = [G.wave, G.wavespawn, G.wavespace, G.waveset, G.wavespawned];
    } catch (e) {
        debug(e.stack);
    }
    DrawConsole();
}

new DEbugMsg("FPS", () => Math.round(F.fps.reduce((a, b) => a + b, 0) / F.fps.length));
new DEbugMsg("Width", () => G.width);
new DEbugMsg("Height", () => G.height);
new DEbugMsg('Scene', () => G.scene);
new DEbugMsg('Buttons', () => JSON.stringify(G.N.B, (k, v) => {
    if (["x", "y", "w", "h"].includes(k) && typeof v == 'function') return v();
    else return v;
}), '#77f', 'l', 0, true);
new DEbugMsg("Console:", null, "red");
new DEbugMsg(null, () => G.D[7], "#f77", 'l', 1, true);
new DEbugMsg(null, () => G.D[6], "#f77", 'l', 1, true);
new DEbugMsg(null, () => G.D[5], "#f77", 'l', 1, true);
new DEbugMsg(null, () => G.D[4], "#f77", 'l', 1, true);
new DEbugMsg(null, () => G.D[3], "#f77", 'l', 1, true);
new DEbugMsg(null, () => G.D[2], "#f77", 'l', 1, true);
new DEbugMsg(null, () => G.D[1], "#f77", 'l', 1, true);
new DEbugMsg(null, () => G.D[0], "#f77", 'l', 1, true);
new DEbugMsg('[SOUND INFO]', null, '#f7f');
new DEbugMsg('Music Volume', () => A.V.M, '#faf');
new DEbugMsg('SFX Volume', () => A.V.S, '#faf');
new DEbugMsg('Switch', () => A.M.S, '#faf');
new DEbugMsg('Transition', () => A.M.T, '#faf');
new DEbugMsg('[DEBUG INFO]', null, 'cyan', 'r');
new DEbugMsg("Cursor", () => G.M.X + ", " + G.M.Y, '#7ff', 'r');
new DEbugMsg("Offset", () => G.O.X.toFixed(0) + ", " + G.O.Y.toFixed(0), '#7ff', 'r');
new DEbugMsg("Map", () => G.map, '#7ff', 'r');
new DEbugMsg('Speed', () => G.speed, '#7ff', 'r');
new DEbugMsg('Time', () => G.time.toFixed(2), '#7ff', 'r');
new DEbugMsg('Wave', () => G.wave, '#7ff', 'r');
new DEbugMsg('Timer', () => G.wavetimer.toFixed(2), '#aff', 'r', 1);
new DEbugMsg('Set', () => G.waveset, '#aff', 'r', 1);
new DEbugMsg('Space', () => G.wavespace.toFixed(2), '#aff', 'r', 1);
new DEbugMsg('Spawn', () => G.wavespawn.toFixed(2), '#aff', 'r', 1);
new DEbugMsg('Spawned', () => G.wavespawned, '#aff', 'r', 1);
new DEbugMsg('Total', () => G.wavetotal.toFixed(2), '#aff', 'r', 1);
new DEbugMsg("[MAP INFO]", null, 'lime', 'l');
new DEbugMsg("Tiles", () => JSON.stringify(G.T.T), '#7f7', 'l', 0, true);
new DEbugMsg("Length", () => G.T.T.length, '#afa', 'l', 1);
new DEbugMsg("Locations", () => JSON.stringify(G.T.L), '#7f7', 'l', 0, true);
new DEbugMsg("Length", () => G.T.L.length, '#afa', 'l', 1);
new DEbugMsg("Enemies", () => JSON.stringify(G.T.E, (key, value) => {
    if (typeof value == 'number') if (value.toString().length > 4) return value.toFixed(2);
    return value;
}), '#7f7', 'l', 0, true);
new DEbugMsg("Length", () => G.T.E.length, '#afa', 'l', 1);
new DEbugMsg("Buildings", () => JSON.stringify(G.T.B, (key, value) => {
    if (typeof value == 'number') if (value.toString().length > 4) return value.toFixed(2);
    return value;
}), '#7f7', 'l', 0, true);
new DEbugMsg("Length", () => G.T.B.length, '#afa', 'l', 1);
new DEbugMsg("Path", () => JSON.stringify(G.path), '#7f7', 'l', 0, true);
new DEbugMsg("Length", () => G.path.length, '#afa', 'l', 1);
new DEbugMsg("[SELECTED TILE]", null, 'yellow');
new DEbugMsg("Tile", () => JSON.stringify(getTile(G.A.C.X, G.A.C.Y), (key, value) => {
    if (key == 'tower') return undefined;
    return value;
}), '#ff7', 'l', 0, true);
new DEbugMsg("Tower", () => JSON.stringify(getTile(G.A.C.X, G.A.C.Y).tower, (key, value) => {
    if (typeof value == 'number') if (value.toString().length > 4) return value.toFixed(2);
    return value;
}), '#ff7', 'l', 0, true);

function DrawConsole() {
    G.C.textAlign = 'left';
    if (!G.DEEEEEEEEBUG) return;
    //G.D = G.A.B;
    G.C.font = "8px 'Press Start 2P', sans-serif";
    var ly = 64 - 12;
    var ry = 96 - 12;
    var inc = 12;
    try {
        for (const c of G.DC) {
            try {
                G.C.fillStyle = c.color;
                x = 6;
                if (c.side == 'r') x = G.width - 6;
                hidden = false;
                if (G.O.X > G.width / 2 - 16 && c.hscroll && c.side != 'r') hidden = true;
                if (c.hscroll && c.side != 'r') x += G.O.X;
                if (c.side == 'r') {
                    G.C.textAlign = 'right';
                    ry += inc;
                    out = c.out();
                    if (out.length > (G.width / 2 - 64) / 8) {
                        out = out.slice(0, (G.width / 2 - 64) / 8);
                    }
                    if (!hidden) G.C.text(out, x, ry);
                } else {
                    G.C.textAlign = 'left';
                    ly += inc;
                    out = c.out();
                    if (out.length > (G.width / 2 + 60 - G.O.X) / 8 && c.hscroll) {
                        out = out.slice(0, (G.width / 2 + 60 - G.O.X) / 8);
                    } else if (out.length > (G.width / 2 + 60) / 8) {
                        out = out.slice(0, (G.width / 2 + 60) / 8);
                    }
                    if (!hidden) G.C.text(out, x, ly);
                }
            } catch {
                if (c.side == 'r') {
                    G.C.textAlign = 'right';
                    G.C.text("[DEBUG ERROR]", G.width - 6, ry);
                } else {
                    G.C.textAlign = 'left';
                    G.C.text("[DEBUG ERROR]", 6, ly);
                }
            }
        }
    } catch (err) {
        debug(err.stack);
    }
    G.C.textAlign = 'left';
    //G.D = G.A.T;
    //G.D = "";
}

//W-CLICK
G.canvas.addEventListener('click', e => {
    for (const button in G.N.B) {
        if (G.N.B[button].collide(e.offsetX, e.offsetY)) {
            try {
                G.N.B[button].action(e);
            } catch (err) {
                debug(err.stack);
            }
            return;
        }
    }
    if (G.scene == 'g') {
        if (e.offsetY < 48) return;
        if (e.offsetY > G.height - 192 && G.U.on) {
            tile = getTile(G.A.C.X, G.A.C.Y, true);
            if (tile.type != 'platform') return
            if (tile.tower == null) {
                //basic
                if (
                    Math.floor(G.width / 3 * 0) < e.offsetX &&
                    Math.floor(G.width / 3) > e.offsetX &&
                    G.height - offset + 68 < e.offsetY &&
                    G.height - offset + 108 > e.offsetY
                ) {
                    if (getTile(G.A.C.X, G.A.C.Y, true).type == 'platform' && getTile(G.A.C.X, G.A.C.Y).tower == null && G.points >= G.A.B.basic.cost) {
                        G.A.B.basic.generate(G.A.C.X, G.A.C.Y);
                        G.points -= G.A.B.basic.cost;
                    }
                }
                //sniper
                if (
                    Math.floor(G.width / 3) < e.offsetX &&
                    Math.floor(G.width / 3 * 2) > e.offsetX &&
                    G.height - offset + 68 < e.offsetY &&
                    G.height - offset + 108 > e.offsetY
                ) {
                    if (getTile(G.A.C.X, G.A.C.Y, true).type == 'platform' && getTile(G.A.C.X, G.A.C.Y).tower == null && G.points >= G.A.B.sniper.cost) {
                        G.A.B.sniper.generate(G.A.C.X, G.A.C.Y);
                        G.points -= G.A.B.sniper.cost;
                    }
                }
                //beam
                if (
                    Math.floor(G.width / 3 * 2) < e.offsetX &&
                    Math.floor(G.width / 3 * 3) > e.offsetX &&
                    G.height - offset + 68 < e.offsetY &&
                    G.height - offset + 108 > e.offsetY
                ) {
                    if (getTile(G.A.C.X, G.A.C.Y, true).type == 'platform' && getTile(G.A.C.X, G.A.C.Y).tower == null && G.points >= G.A.B.beam.cost) {
                        G.A.B.beam.generate(G.A.C.X, G.A.C.Y);
                        G.points -= G.A.B.beam.cost;
                    }
                }
                //multi
                if (
                    Math.floor(G.width / 3 * 0) < e.offsetX &&
                    Math.floor(G.width / 3) > e.offsetX &&
                    G.height - offset + 108 < e.offsetY &&
                    G.height - offset + 148 > e.offsetY
                ) {
                    if (getTile(G.A.C.X, G.A.C.Y, true).type == 'platform' && getTile(G.A.C.X, G.A.C.Y).tower == null && G.points >= G.A.B.multi.cost) {
                        G.A.B.multi.generate(G.A.C.X, G.A.C.Y);
                        G.points -= G.A.B.multi.cost;
                    }
                }
                //aura
                if (
                    Math.floor(G.width / 3) < e.offsetX &&
                    Math.floor(G.width / 3 * 2) > e.offsetX &&
                    G.height - offset + 108 < e.offsetY &&
                    G.height - offset + 148 > e.offsetY
                ) {
                    if (getTile(G.A.C.X, G.A.C.Y, true).type == 'platform' && getTile(G.A.C.X, G.A.C.Y).tower == null && G.points >= G.A.B.aura.cost) {
                        G.A.B.aura.generate(G.A.C.X, G.A.C.Y);
                        G.points -= G.A.B.aura.cost;
                    }
                }
                //super
                if (
                    Math.floor(G.width / 3 * 2) < e.offsetX &&
                    Math.floor(G.width / 3 * 3) > e.offsetX &&
                    G.height - offset + 108 < e.offsetY &&
                    G.height - offset + 148 > e.offsetY
                ) {
                    if (getTile(G.A.C.X, G.A.C.Y, true).type == 'platform' && getTile(G.A.C.X, G.A.C.Y).tower == null && G.points >= G.A.B.super.cost) {
                        G.A.B.super.generate(G.A.C.X, G.A.C.Y);
                        G.points -= G.A.B.super.cost;
                    }
                }
                return;
            } else {
                //Upgrades
                upgradeOffset = Math.floor(G.width / 3);
                upgradeTop = G.height - offset + 36;
                upgradeWidth = Math.floor(G.width / 3 * 2);
                pos1 = upgradeOffset;
                pos2 = upgradeOffset + Math.floor(upgradeWidth / 3);
                pos3 = upgradeOffset + Math.floor(upgradeWidth / 3 * 2);
                if (
                    pos1 < e.offsetX &&
                    pos1 + Math.floor(upgradeWidth / 3) > e.offsetX &&
                    upgradeTop < e.offsetY
                ) {
                    BuyUpgrade(getTile(G.A.C.X, G.A.C.Y, true), 0);
                    return;
                }
                if (
                    pos2 < e.offsetX &&
                    pos2 + Math.floor(upgradeWidth / 3) > e.offsetX &&
                    upgradeTop < e.offsetY
                ) {
                    BuyUpgrade(getTile(G.A.C.X, G.A.C.Y, true), 1);
                    return;
                }
                if (
                    pos3 < e.offsetX &&
                    pos3 + Math.floor(upgradeWidth / 3) > e.offsetX &&
                    upgradeTop < e.offsetY
                ) {
                    BuyUpgrade(getTile(G.A.C.X, G.A.C.Y, true), 2);
                    return;
                }
                leftarrow = G.width / 2;
                rightarrow = G.width / 2 + 200;
                hitwidth = 40;
                //Targeting
                if (
                    leftarrow - hitwidth / 2 < e.offsetX &&
                    leftarrow + hitwidth / 2 > e.offsetX &&
                    G.height - offset < e.offsetY &&
                    G.height - offset + 36
                ) {
                    if (getTile(G.A.C.X, G.A.C.Y, true).tower !== null) getTile(G.A.C.X, G.A.C.Y).tower.targetchange(-1);
                }
                if (
                    rightarrow - hitwidth / 2 < e.offsetX &&
                    rightarrow + hitwidth / 2 > e.offsetX &&
                    G.height - offset < e.offsetY &&
                    G.height - offset + 36
                ) {
                    if (getTile(G.A.C.X, G.A.C.Y, true).tower !== null) getTile(G.A.C.X, G.A.C.Y).tower.targetchange(1);
                }
            };
            //Destroy tower
            offset = (96 * Math.sin((Math.PI / 50) * (G.U.anim - 25)) + 96);
            G.C.font = "16px 'Press Start 2P', sans-serif";
            destroy = {};
            destroy.x = G.width - G.C.textWidth("[X] Destroy: " + tile.tower.refund + "p").width - 20;
            destroy.w = G.C.textWidth("[X] Destroy: " + tile.tower.refund + "p").width + 20;
            destroy.y = G.height - offset;
            destroy.h = 26;
            if (
                destroy.x < e.offsetX &&
                destroy.x + destroy.w > e.offsetX &&
                destroy.y < e.offsetY &&
                destroy.y + destroy.h > e.offsetY
            ) {
                for (var i = 0; i < G.T.B.length; i++) {
                    if (G.T.B[i].x == G.A.C.X && G.T.B[i].y == G.A.C.Y && getTile(G.T.B[i].x, G.T.B[i].y, true).tower != null) {
                        G.points += getTile(G.T.B[i].x, G.T.B[i].y).tower.refund;
                        getTile(G.T.B[i].x, G.T.B[i].y).tower = null;
                        G.T.B.splice(i, 1);
                    }
                }
            }
            return;
        }
        G.C.font = "16px 'Press Start 2P', sans-serif";
        next = {};
        if (G.wave == 0) next.x = G.width - G.C.textWidth('Send Wave: --').width - 20;
        else next.x = G.width - G.C.textWidth('Send Wave: ' + Math.max(Math.floor(G.wavetimer), 0)).width - 20;
        next.y = 48;
        if (G.wave == 0) next.w = G.C.textWidth('Send Wave: --').width + 20;
        else next.w = G.C.textWidth('Send Wave: ' + Math.max(Math.floor(G.wavetimer), 0)).width + 20;
        next.h = 32;
        if (
            next.x < e.offsetX &&
            next.x + next.w > e.offsetX &&
            next.y < e.offsetY &&
            next.y + next.h > e.offsetY
        ) {
            if (G.wavespawn < 0) NextWave();
            return;
        }
        //if (G.A.loaded) G.nodes.push([Math.round(e.offsetX/G.A.A.config.scale[0])*G.A.A.config.scale[0], Math.round(e.offsetY/G.A.A.config.scale[1])*G.A.A.config.scale[1]]);
        G.A.C.X = Math.round((e.offsetX - G.O.X - G.A.TS[0] / 2) / G.A.TS[0]);
        G.A.C.Y = Math.round((e.offsetY - G.O.Y - G.A.TS[1] / 2) / G.A.TS[1]);
        G.A.C.on = true;
    }
    else if (G.scene == 'ee') {
        G.A.C.X = Math.round((e.offsetX - G.O.X - G.A.TS[0] / 2) / G.A.TS[0]);
        G.A.C.Y = Math.round((e.offsetY - G.O.Y - G.A.TS[1] / 2) / G.A.TS[1]);
        G.A.C.on = true;
    }
});

class KeyBinding {
    constructor(name, id, key, action, scene) {
        this.name = name;
        this.id = id;
        this.key = key;
        this.action = action;
        this.scene = scene;
        K[this.id] = this;
    }
}

/**
 * 
 * @param {Tile} tile 
 * @param {Number} index 
 * @returns 
 */
function BuyUpgrade(tile, index) {
    if (tile.tower == null) return;
    if (!tile.tower.available[index]) return;
    upgrade = tile.tower.available[index];
    if (G.points < upgrade.cost) return;
    G.points -= upgrade.cost;
    for (const add in upgrade.add) {
        switch (add) {
            case "fr":
                tile.tower.firerate += upgrade.add.fr;
                tile.tower.reload = 1 / tile.tower.firerate;
                break;
            case "dg":
                tile.tower.damage += upgrade.add.dg;
                break;
            case "rg":
                tile.tower.range += upgrade.add.rg;
                break;
            case "sh":
                tile.tower.shots += upgrade.add.sh;
                break;
            case "to":
                tile.tower.offset += upgrade.add.to;
                break;
            case "fw":
                tile.tower.width += upgrade.add.fw;
                break;
            case "fd":
                tile.tower.duration += upgrade.add.fd;
                break;
        }
    }
    tile.tower.value += upgrade.cost;
    tile.tower.level += 1;
    tile.tower.refund = Math.round(tile.tower.value * 0.75);
    tile.tower.upgrades.push(upgrade.id);
    tile.tower.available = [];
    for (const tier of tile.tower.tiers) {
        if (tier.achieved) continue;
        if (tile.tower.level >= tier.level) {
            available = true;
            for (const req of tier.req) {
                if (!tile.tower.upgrades.includes(req)) {
                    available = false;
                    break;
                }
            }
            if (available) {
                if (tier.texture) tile.tower.texture = tier.texture;
                if (tier.turret) tile.tower.turret = tier.turret;
                tier.achieved = true;
                for (const add in tier.add) {
                    switch (add) {
                        case "fr":
                            tile.tower.firerate += tier.add.fr;
                            tile.tower.reload = 1 / tile.tower.firerate;
                            break;
                        case "dg":
                            tile.tower.damage += tier.add.dg;
                            break;
                        case "rg":
                            tile.tower.range += tier.add.rg;
                            break;
                        case "sh":
                            tile.tower.shots += tier.add.sh;
                            break;
                        case "to":
                            tile.tower.offset += tier.add.to;
                            break;
                        case "fw":
                            tile.tower.width += tier.add.fw;
                            break;
                        case "fd":
                            tile.tower.duration += tier.add.fd;
                            break;
                    }
                }
            }
        }
    }
}



class Scene {
    constructor(scene, draw) {
        this.scene = scene;
        this.draw = draw;
        S[this.scene] = this;
    }
}

function Draw() {
    S[G.scene].draw();
}

function NewGame(map) {
    G.O.X = 0;
    G.O.Y = 0;
    G.map = map;
    G.boss = null;
    G.wave = 0;
    G.wavespace = 0;
    G.wavespawn = 0;
    G.wavespawned = 0;
    G.wavetime = 0;
    G.time = 0;
    G.speed = 2;
    G.multi = 1;
    G.alternate = false;
    G.pause = false;
    G.path = [];
    G.A.C.on = false;
    G.hp = Math.round(G.basehp * G.S.lives);
    G.maxhp = Math.round(G.basehp * G.S.lives);
    G.points = G.basepoints;
    loadMap(G.A.M[map]);
}

function FrameLimit(change) {
    F.limiti = Math.max(Math.min(F.limiti + change, F.limits.length - 1), 0);
    F.limit = F.limits[F.limiti];
    clearInterval(G.loop);
    console.log(F.limit == "None", 1000 / F.limit);
    if (F.limit == "None") {
        G.loop = setInterval(Main, 0);
        console.log('bruh');
    }
    else G.loop = setInterval(Main, 1000 / F.limit);
    window.localStorage.setItem("FPS", F.limiti);
}

B = JSON.parse(window.localStorage.getItem('keys'));
if (B != null) for (const binding in B) if (K[binding]) K[binding].key = B[binding];

loadsound = JSON.parse(window.localStorage.getItem('sound'));
if (loadsound != null) {
    A.V.M = loadsound[0];
    A.V.S = loadsound[1];
}


//W-KEY
document.addEventListener('keydown', e => {
    try {
        if (G.R.R != undefined) {
            if (e.code == K[G.R.R].key) {
                G.R.R = undefined;
                return;
            }
            K[G.R.R].key = e.code;
            G.R.R = undefined;
            if (B == null) B = {};
            for (const binding in K) {
                B[binding] = K[binding.key];
            }
            window.localStorage.setItem('keys', JSON.stringify(B));
        }
        else for (const binding in K) {
            if (Array.isArray(K[binding].scene)) {
                if (e.code == K[binding].key && K[binding].scene.includes(G.scene)) K[binding].action(e);
            } else {
                if (e.code == K[binding].key && K[binding].scene == G.scene) K[binding].action(e);
            }
        }
    } catch (err) {
        debug(err.stack);
    }
});

/**
 * 
 * @param {Object} data 
 * @param {Number} posx 
 * @param {Number} posy 
 * @param {Number} width 
 * @param {Number} height 
 * @param {Enemy[]} enemies 
 * @param {Tower[]} towers 
 */
function DrawMiniMap(data, posx, posy, width, height, enemies = [], towers = []) {
    //W-MINIMAP
    if (data.map !== undefined) {
        tilewidth = width / data.map.size[0];
        tileheight = height / data.map.size[1];
        G.C.fillStyle = '#4448';
        G.C.fillRect(posx, posy, width, height);
        for (var x = 0; x < data.map.size[0]; x++) for (var y = 0; y < data.map.size[1]; y++) {
            if ((x + y) % 2 != 0) {
                continue;
            }
            else {
                G.C.fillStyle = '#4442';
            }
            G.C.fillRect(Math.round(posx + x * tilewidth), Math.round(posy + y * tileheight), Math.round(tilewidth), Math.round(tileheight));
        }
        G.C.lineWidth = Math.round(width / data.map.size[0] / 8) * 2;
        G.C.strokeStyle = '#777';
        for (var p = 0; p < data.map.lines.length; p++) {
            G.C.beginPath();
            G.C.moveTo(Math.floor((data.map.lines[p][0][0] - data.map.start[0] + 0.5) * (width / data.map.size[0])) + posx,
                Math.floor((data.map.lines[p][0][1] - data.map.start[1] + 0.5) * (height / data.map.size[1])) + posy);
            for (var v = 1; v < data.map.lines[p].length; v++) {
                G.C.lineTo(Math.floor((data.map.lines[p][v][0] - data.map.start[0] + 0.5) * (width / data.map.size[0])) + posx,
                    Math.floor((data.map.lines[p][v][1] - data.map.start[1] + 0.5) * (height / data.map.size[1])) + posy);
            }
            G.C.stroke();
        }
        for (const l of data.locations) {
            if (l.type == "spawn") {
                G.C.fillStyle = '#d90000';
                G.C.beginPath();
                G.C.arc(Math.floor((l.pos[0] - data.map.start[0] + 0.5) * (width / data.map.size[0])) + posx,
                    Math.floor((l.pos[1] - data.map.start[1] + 0.5) * (height / data.map.size[1])) + posy, Math.floor(G.S.mapx / data.map.size[0] / 3),
                    0, 2 * Math.PI);
                G.C.fill();
            }
            if (l.type == "base") {
                G.C.fillStyle = '#0073d7';
                G.C.beginPath();
                G.C.arc(Math.floor((l.pos[0] - data.map.start[0] + 0.5) * (width / data.map.size[0])) + posx,
                    Math.floor((l.pos[1] - data.map.start[1] + 0.5) * (height / data.map.size[1])) + posy, Math.floor(G.S.mapx / data.map.size[0] / 3),
                    0, 2 * Math.PI);
                G.C.fill();
            }
        }
        for (const e of enemies) {
            G.C.fillStyle = e.color1;
            G.C.strokeStyle = e.color2;
            G.C.lineWidth = 1;
            G.C.beginPath();
            G.C.arc(Math.floor((Math.round((e.x + 0.5) * 4) / 4 - 0.5 - data.map.start[0]) * (width / data.map.size[0])) + posx,
                Math.floor((Math.round((e.y + 0.5) * 4) / 4 - 0.5 - data.map.start[1]) * (height / data.map.size[1])) + posy, G.S.mapx / data.map.size[0] / 6,
                0, 2 * Math.PI);
            G.C.stroke();
            G.C.beginPath();
            G.C.arc(Math.floor((Math.round((e.x + 0.5) * 4) / 4 - 0.5 - data.map.start[0]) * (width / data.map.size[0])) + posx,
                Math.floor((Math.round((e.y + 0.5) * 4) / 4 - 0.5 - data.map.start[1]) * (height / data.map.size[1])) + posy, G.S.mapx / data.map.size[0] / 6,
                0, 2 * Math.PI * (e.hp / e.maxhp));
            G.C.lineTo(Math.floor((Math.round((e.x + 0.5) * 4) / 4 - 0.5 - data.map.start[0]) * (width / data.map.size[0])) + posx,
                Math.floor((Math.round((e.y + 0.5) * 4) / 4 - 0.5 - data.map.start[1]) * (height / data.map.size[1])) + posy);
            G.C.fill();
        }
        for (const t of towers) {
            G.C.fillStyle = t.color;
            G.C.fillRect(Math.floor((t.x + 0.5 - data.map.start[0]) * (width / data.map.size[0])) + posx - height / data.map.size[1] / 4,
                Math.floor((t.y + 0.5 - data.map.start[1]) * (height / data.map.size[1])) + posy - height / data.map.size[1] / 4,
                width / data.map.size[0] / 2, height / data.map.size[1] / 2);
        }
        G.C.fillStyle = 'white';
    }
}

/*
function StartLoad() {
    try {
    G.A.T = new Image();
    G.A.T.src = "tiles.png";
    G.A.T.style.display = 'none';
    G.A.T.onload = () => {
        EndLoad();
    }
    document.body.appendChild(G.A.T);
    } catch (e) {
        G.D = e.stack;
    }
}

function EndLoad() {
    G.scene = 'm';
    G.A.loaded = true;
}
*/

function NextWave() {
    wave = G.A.D.W[G.waveset].W[G.wave]
    G.wave++;
    try {
        G.wavespawn = wave[3] * wave[5].length;
        G.wavetotal = G.wavespawn;
        G.wavetimer = G.wavespawn + wave[4];
        G.wavespace = wave[3];
        G.wavespawned = 0;
    }
    catch (err) {
        G.wave--;
    }
}

//StartLoad();

/*G.canvas.addEventListener('wheel', (e) => {
    G.O.X -= G.M.X * (Math.max(0.5, Math.min(2, G.A.S - e.deltaY * 0.0005)) - G.A.S);
    G.O.Y -= G.M.Y * (Math.max(0.5, Math.min(2, G.A.S - e.deltaY * 0.0005)) - G.A.S);
    G.A.S = Math.max(0.5, Math.min(2, G.A.S - e.deltaY * 0.0005));
    G.A.A.config.scale[0] = G.A.S * G.A.A.config.defaultscale[0];
    G.A.A.config.scale[1] = G.A.S * G.A.A.config.defaultscale[1];
    G.P = new OffscreenCanvas(G.A.A.config.scale[0], G.A.A.config.scale[1]); //PRELOAD
    G.PC = G.P.getContext('2d');
});*/

//} catch (err) {
//    alert(err.stack);
//}