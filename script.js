//try {

const G  = {}; //GAME
/** @type {HTMLCanvasElement} */
G.canvas = document.getElementById('main');
/** @type {CanvasRenderingContext2D} */
G.C = G.canvas.getContext('2d'); //CANVAS
G.canvas.width = window.innerWidth;
G.canvas.height = window.innerHeight;
G.width = G.canvas.width; //GAME WIDTH
G.height = G.canvas.height; //GAME HEIGHT
G.map = "test";
G.wave = 0;
G.wavetimer = 0;
G.wavespawn = 0;
G.wavespawned = 0;
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
G.S.MORESPEED = false; //MORE speed options
G.S.lives = 1.0; //Lives multiplier
G.S.mapx = Math.floor(G.width / 5); //Minimap X max width
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
G.TS.A = [
    "test",
    "basic",
    "ouch",
    "crossed",
    "e",
    "grid",
    "grid2"
];
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
G.hp = Math.round(25 * G.S.lives);
G.maxhp = Math.round(25 * G.S.lives); 

K = {}; //HOTKEYS
S = {}; //SCENES
T = {}; //TARGETING
T.T = {};
T.L = [];

String.prototype.formatDuration = function () {
    var sec_num = Math.floor(parseInt(this, 10) / 50); // don't forget the second param
    var days    = Math.floor(sec_num / 86400)
    var hours   = Math.floor((sec_num % 86400) / 3600);
    var minutes = Math.floor((sec_num % 3600) / 60);
    var seconds = sec_num % 60;

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    if (hours < 1 && days < 1) return minutes+':'+seconds;
    if (days < 1) return hours+':'+minutes+':'+seconds;
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
    constructor (label, content, color='white', side='l', indent=0, hscroll=false) {
        this.label = label;
        this.content = content;
        this.side = side;
        this.color = color;
        this.indent = indent;
        this.hscroll = hscroll;
        G.DC.push(this);
    }
    out () {
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
    constructor (type, x, y, texture, direction) {
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
    constructor (type, x, y, texture) {
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
     * @param {any[][]} path 
     * @param {Object[]} locations
     * @param {String} locations[].type - type of location (spawn / base)
     * @param {Number[]} locations[].pos - position of location (tile grid x,y)
     * @param {Object} map
     * @param {Number[]} map.start - top left corner (in tiles) of map
     * @param {Number[]} map.size - size (in tiles) of map
     * @param {Number[][][]} map.lines - array of lines that are arrays containing an array of the points of the line
     */
    constructor (name, id, desc, track, path, locations, map) {
        this.name = name;
        this.id = id;
        this.desc = desc;
        this.track = track;
        this.path = path;
        this.locations = locations;
        this.map = map;
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
     */
    constructor (name, type, texture, turret, firerate, damage, range, color, offset, firewidth, fireduration, shots, cost, tiers=[]) {
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
    generate (x, y) {
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
     */
    constructor (name, type, x, y, texture, turret, firerate, damage, range, color, offset, firewidth, fireduration, shots=1, value=0, tiers=[]) {
        this.name = name;
        this.type = type;
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.turret = turret;
        this.firerate = firerate;
        this.reload = 50/firerate;
        this.cooldown = 0;
        this.shots = shots;
        this.damage = damage;
        this.level = 1;
        this.direction = 0;
        this.range = range;
        this.color = color;
        this.tiers = tiers;
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
    tick () {
        //find enemy
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
            var distance = (difx / Math.cos((direction - 90) * (Math.PI/180)));
            var hit = [distance * Math.sin(this.direction * (Math.PI/180)), -distance * Math.cos(this.direction * (Math.PI/180))];
            //G.D = [difx, dify, hit];
            if (
                hit[0] >= difx - enemy.hitbox[0]/2 && 
                hit[0] <= difx + enemy.hitbox[0]/2 &&
                hit[1] >= dify - enemy.hitbox[1]/2 &&
                hit[1] <= dify + enemy.hitbox[1]/2 &&
                this.cooldown <= 0
            ) {
                fire = true;
                var prevhp = JSON.parse(JSON.stringify(enemy.hp));
                enemy.hp -= this.damage;
                if (enemy.hp <= 0 && prevhp > 0) {this.kills++; this.earned += enemy.reward;}
                var offset = [(this.offset / G.A.TS[0]) * Math.sin(this.direction * (Math.PI/180)), -(this.offset / G.A.TS[1]) * Math.cos(this.direction * (Math.PI/180))];
                G.T.P.push(new Laser(this.width, this.color, hit[0] / G.A.TS[0] + (this.x + 0.5), hit[1] / G.A.TS[1] + (this.y + 0.5),
                    (this.x + 0.5) + offset[0],
                    (this.y + 0.5) + offset[1],
                    this.duration));
            }
            shots--
            if (shots < 1) break;
        }
        if (this.cooldown <= 0 && fire) {
            this.cooldown = this.reload;
        }
        this.cooldown--;
    }
    targetchange (change) {
        this.tnum += change;
        if (this.tnum >= T.L.length) this.tnum -= T.L.length;
        if (this.tnum < 0) this.tnum += T.L.length;
        this.targeting = T.L[this.tnum];    
    }
    refreshupgrades () {
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
    constructor (width, color, x1, y1, x2, y2, duration) {
        this.width = width;
        this.color = color;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.duration = duration;
    }
    tick () {
        this.duration--;
        if (this.duration <= 0) return true;
    }
}

class EnemyPrototype {
    constructor (type, id, size, texture, hp, damage, speed, hitbox, reward, color1, color2, boss=false) {
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
    generate (hpmult, speedmult, rewardmult) {
        var tile = Math.floor(Math.random() * G.A.L.S.length);
        var img = G.A.T[this.texture];
        G.T.E.push(new Enemy(
            (G.A.L.S[tile][0] + this.size[0] / (2 * img.atlas.config.scale[0])) + Math.floor(Math.random() * (1 - this.size[0] / img.atlas.config.scale[0]) * img.atlas.config.scale[0])/img.atlas.config.scale[0],
            (G.A.L.S[tile][1] + this.size[1] / (2 * img.atlas.config.scale[1])) + Math.floor(Math.random() * (1 - this.size[1] / img.atlas.config.scale[1]) * img.atlas.config.scale[1])/img.atlas.config.scale[1],
            // G.A.L.S[tile][0] * G.A.A.config.scale[0],
            // G.A.L.S[tile][1] * G.A.A.config.scale[1], 
            G.A.L.S[tile], this.type, this.size, this.texture, this.hp * hpmult, this.damage, this.speed * speedmult,
            this.hitbox, Math.round(this.reward * rewardmult), this.color1, this.color2));
        return G.T.E[-1];
    }
}

class Enemy {
    constructor (x, y, tile, type, size, texture, hp, damage, speed, hitbox, reward, color1, color2) {
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
    tick () {
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
            this.x += this.direction[0] * this.speed / 50;
            this.y += this.direction[1] * this.speed / 50;
            this.movement -= Math.abs(((this.direction[0] * this.speed) + (this.direction[1] * this.speed)) / 50);
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
     */
    constructor (name, id, desc, tower, cost, req, add) {
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
    constructor (sizex, sizey, tilex, tiley, scalex, scaley) {
        this.size = [sizex, sizey];
        this.tiles = [tilex, tiley];
        this.scale = [scalex, scaley];
        this.defaultscale = [scalex, scaley];
    }
}

class TextureAtlas {
    constructor (id, src, config, items) {
        this.id = id;
        this.config = config;
        this.src = src;
        this.items = items;
        G.A.A[this.id] = this;
        this.img = new Image();
        this.img.src = this.src;
        this.img.style.display = 'none';
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
    constructor (id, xpos, ypos) {
        this.id = id;
        this.xpos = xpos;
        this.ypos = ypos;
    }
}

class MenuButton {
    constructor (id, x, y, width, height, action, scene) {
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
    collide (x, y) {
        return (
            this.x < x &&
            this.x + this.w > x &&
            this.y < y &&
            this.y + this.h > y &&
            G.scene == this.scene
        );
    }
}

class Targeting {
    constructor (name, id, property, reverse, color, available=true, condition=() => true) {
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

function debug (msg) {
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
function getTile (x, y, object=false) {
    for (const tile of G.T.T) {
        //Check if matching tile
        if (tile.x == x && tile.y == y) {
            return tile; //Return tile
        }
    }
    //Return null if no tile
    if (object) return {type: null, x: null, y: null, texture: null, direction: null, tower: null, paths: null};
    else return null;
}

function loadMap (mapdata) {
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
        if (getTile(G.T.T[t].x + 1, G.T.T[t].y, true).type == 'track') G.T.T[t].paths += 'r';
        if (getTile(G.T.T[t].x - 1, G.T.T[t].y, true).type == 'track') G.T.T[t].paths += 'l';
        if (getTile(G.T.T[t].x, G.T.T[t].y - 1, true).type == 'track') G.T.T[t].paths += 'u';
        if (getTile(G.T.T[t].x, G.T.T[t].y + 1, true).type == 'track') G.T.T[t].paths += 'd';
        G.T.T[t].texture = 'track-' + G.T.T[t].paths;
    }
    for (const path of mapdata.path) {
        G.path.push(path[0] + "," + path[1]);
    }
    G.S.mapy = Math.floor((G.S.mapx / mapdata.map.size[0]) * mapdata.map.size[1]);
}

setInterval(() => {
    G.A.C.pos += 3;
    if (G.A.C.pos >= 360) {
        G.A.C.pos -= 360;
    }
}, 20);

G.nodes = [];

G.canvas.addEventListener('mousemove', e => {
    G.M.X = e.offsetX;
    G.M.Y = e.offsetY;
    for (const button in G.N.B) {
        G.N.B[button].hover = G.N.B[button].collide(e.offsetX, e.offsetY);
    }
});

G.loop = setInterval(Main, 20);

function Main () {
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
                    if (G.wave != 0) G.time += 1;
                    G.wavetimer--;
                    G.wavespawn--;
                }
                if (G.wave != 0 && G.wavespawn % G.wavespace == 0 && G.wavespawn >= 0) {
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

new DEbugMsg("Console:", null, "red");
new DEbugMsg(null, () => G.D[7], "#f77", 'l', 1, true);
new DEbugMsg(null, () => G.D[6], "#f77", 'l', 1, true);
new DEbugMsg(null, () => G.D[5], "#f77", 'l', 1, true);
new DEbugMsg(null, () => G.D[4], "#f77", 'l', 1, true);
new DEbugMsg(null, () => G.D[3], "#f77", 'l', 1, true);
new DEbugMsg(null, () => G.D[2], "#f77", 'l', 1, true);
new DEbugMsg(null, () => G.D[1], "#f77", 'l', 1, true);
new DEbugMsg(null, () => G.D[0], "#f77", 'l', 1, true);
new DEbugMsg('[DEBUG INFO]', null, 'cyan', 'r');
new DEbugMsg("Cursor", () => G.M.X + ", " + G.M.Y, '#7ff', 'r');
new DEbugMsg("Offset", () => G.O.X.toFixed(0) + ", " + G.O.Y.toFixed(0), '#7ff', 'r');
new DEbugMsg("Map", () => G.map, '#7ff', 'r');
new DEbugMsg('Speed', () => G.speed, '#7ff', 'r');
new DEbugMsg('Time', () => G.time, '#7ff', 'r');
new DEbugMsg('Wave', () => G.wave, '#7ff', 'r');
new DEbugMsg('Timer', () => G.wavetimer, '#aff', 'r', 1);
new DEbugMsg('Set', () => G.waveset, '#aff', 'r', 1);
new DEbugMsg('Space', () => G.wavespace, '#aff', 'r', 1);
new DEbugMsg('Spawn', () => G.wavespawn, '#aff', 'r', 1);
new DEbugMsg('Spawned', () => G.wavespawned, '#aff', 'r', 1);
new DEbugMsg("[MAP INFO]", null, 'lime', 'l');
new DEbugMsg("Tiles", () => JSON.stringify(G.T.T), '#7f7', 'l', 0, true);
new DEbugMsg("Length", () => G.T.T.length, '#afa', 'l', 1);
new DEbugMsg("Locations", () => JSON.stringify(G.T.L), '#7f7', 'l', 0, true);
new DEbugMsg("Length", () => G.T.L.length, '#afa', 'l', 1);
new DEbugMsg("Enemies", () => JSON.stringify(G.T.E), '#7f7', 'l', 0, true);
new DEbugMsg("Length", () => G.T.E.length, '#afa', 'l', 1);
new DEbugMsg("Buildings", () => JSON.stringify(G.T.B), '#7f7', 'l', 0, true);
new DEbugMsg("Length", () => G.T.B.length, '#afa', 'l', 1);
new DEbugMsg("[SELECTED TILE]", null, 'yellow');
new DEbugMsg("Tile", () => JSON.stringify(getTile(G.A.C.X, G.A.C.Y), (key, value) => {
    if (key == 'tower') return undefined;
    return value;
}), '#ff7', 'l', 0, true);
new DEbugMsg("Tower", () => JSON.stringify(getTile(G.A.C.X, G.A.C.Y).tower), '#ff7', 'l', 0, true);

function DrawConsole() {
    if (!G.DEEEEEEEEBUG) return;
    //G.D = G.A.B;
    G.C.font = "8px 'Press Start 2P', sans-serif";
    G.C.textAlign = 'left';
    var ly = 64 - 12;
    var ry = 96 - 12;
    var inc = 12;
    try {
        for (const c of G.DC) {
            try {
                G.C.fillStyle = c.color;
                if (c.side == 'r') x = G.width - 6;
                else x = 6;
                hidden = false;
                if (G.O.X > G.width / 2 - 16 && c.hscroll && c.side != 'r') hidden = true;
                if (c.hscroll && c.side != 'r') x += G.O.X;
                if (c.side == 'r') {
                    G.C.textAlign = 'right';
                    ry += inc;
                    out = c.out();
                    if (out.length > (G.width / 2 - 32) / 8) {
                        out = out.slice(0, (G.width / 2 - 32) / 8);
                    }
                    if (!hidden) G.C.fillText(out, x, ry);
                } else {
                    G.C.textAlign = 'left';
                    ly += inc;
                    out = c.out();
                    if (out.length > (G.width / 2 + 24 - G.O.X) / 8 && c.hscroll) {
                        out = out.slice(0, (G.width / 2 + 24 - G.O.X) / 8);
                    } else if (out.length > (G.width / 2 + 24) / 8) {
                        out = out.slice(0, (G.width / 2 + 24) / 8);
                    }
                    if (!hidden) G.C.fillText(out, x, ly);
                }
            } catch {
                if (c.side == 'r') {
                    G.C.textAlign = 'right';
                    G.C.fillText("[DEBUG ERROR]", G.width - 6, ry);
                } else {
                    G.C.textAlign = 'left';
                    G.C.fillText("[DEBUG ERROR]", 6, ly);
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
                G.N.B[button].action();
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
            destroy.x = G.width - G.C.measureText("[X] Destroy: " + tile.tower.refund + "p").width - 20;
            destroy.w = G.C.measureText("[X] Destroy: " + tile.tower.refund + "p").width + 20;
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
        if (G.wave == 0) next.x = G.width - G.C.measureText('Send Wave: --').width - 20;
        else next.x = G.width - G.C.measureText('Send Wave: ' + Math.max(Math.floor(G.wavetimer / 50), 0)).width - 20;
        next.y = 48;
        if (G.wave == 0) next.w = G.C.measureText('Send Wave: --').width + 20;
        else next.w = G.C.measureText('Send Wave: ' + Math.max(Math.floor(G.wavetimer / 50), 0)).width + 20;
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
        G.A.C.X = Math.round((e.offsetX - G.O.X - G.A.TS[0]/2)/G.A.TS[0]);
        G.A.C.Y = Math.round((e.offsetY - G.O.Y - G.A.TS[1]/2)/G.A.TS[1]);
        G.A.C.on = true;
    }
});

class KeyBinding {
    constructor (name, id, key, action, scene) {
        this.name = name;
        this.id = id;
        this.key = key;
        this.action = action;
        this.scene = scene;
        K[this.id] = this;
    }
}

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
    }
];

/**
 * 
 * @param {Tile} tile 
 * @param {Number} index 
 * @returns 
 */
function BuyUpgrade (tile, index) {
    if (tile.tower == null) return;
    if (!tile.tower.available[index]) return;
    upgrade = tile.tower.available[index];
    if (G.points < upgrade.cost) return;
    G.points -= upgrade.cost;
    for (const add in upgrade.add) {
        switch (add) {
            case "fr":
                tile.tower.firerate += upgrade.add.fr;
                tile.tower.reload = 50/tile.tower.firerate;
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
        }
    }
    tile.tower.value += upgrade.cost;
    tile.tower.level += 1;
    tile.tower.refund = Math.round(tile.tower.value * 0.75);
    tile.tower.upgrades.push(upgrade.id);
    tile.tower.available = [];
    for (const tier of tile.tower.tiers) {
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
            }
        }
    }
}



class Scene {
    constructor (scene, draw) {
        this.scene = scene;
        this.draw = draw;
        S[this.scene] = this;
    }
}

function Draw () {
    G.C.clearRect(0, 0, G.width, G.height);
    G.C.fillStyle = 'black';
    G.C.fillRect(0, 0, G.width, G.height);
    S[G.scene].draw();
}

function NewGame (map) {
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
    clearInterval(G.loop);
    G.loop = setInterval(Main, 20 / (G.speed / 2));
    G.path = [];
    G.A.C.on = false;
    G.hp = Math.round(25 * G.S.lives);
    G.maxhp = Math.round(25 * G.S.lives);
    G.points = G.basepoints;
    loadMap(G.A.M[map]);
}

//W-BUTTON:M // MENU BUTTONS
new MenuButton("start", G.width / 2 - 250, 310, 500, 48, () => {G.scene = 't';}, 'm');
new MenuButton("resume", G.width / 2 - 250, 420, 400, 36, () => {if (G.wave != 0) G.scene = 'g';}, 'm');
new MenuButton("settings", G.width / 2 - 200, 500, 400, 36, () => {G.scene = 's'}, 'm');
new MenuButton("editor", G.width / 2 - 200, 580, 400, 36, () => {G.scene = 'e'}, 'm');
new MenuButton("quit", G.width / 2 - 200, 660, 400, 36, () => {window.close()}, 'm');
//W-BUTTON:E // EDITOR BUTTONS
new MenuButton("eback", 0, 20, 200, 36, () => {G.scene = 'm'}, 'e');
//W-BUTTON:S // SETTINGS BUTTONS
new MenuButton("sback", 0, 20, 200, 36, () => {G.scene = 'm'}, 's');
new MenuButton("bindings", G.width / 2 - 200, 320, 400, 36, () => {G.scene = 'sb'}, 's');
new MenuButton("default", G.width / 2 - 200, 400, 400, 36, () => {if (confirm("Are you sure?\nThis will reset all key bindings to default and reload the page.")) {window.localStorage.setItem('keys', null); location.reload();}}, 's');
//W-BUTTON:SB // SETTINGS: BINDINGS BUTTONS
new MenuButton("sbback", 0, 20, 200, 36, () => {G.scene = 's'}, 'sb');
new MenuButton("sbnext", Math.round(G.width / 2) + 50, G.height - 80, 300, 36, () => {G.R.P = Math.min(S.length - 1, G.R.P + 1); G.R.R = undefined}, 'sb');
new MenuButton("sbprev", Math.round(G.width / 2) - 350, G.height - 80, 300, 36, () => {G.R.P = Math.max(0, G.R.P - 1); G.R.R = undefined}, 'sb');
new MenuButton("sbbind0", Math.round(G.width / 2) - 250, 290, 500, 36, () => {G.R.R = S[G.R.P].bindings[0]}, 'sb');
new MenuButton("sbbind1", Math.round(G.width / 2) - 250, 340, 500, 36, () => {G.R.R = S[G.R.P].bindings[1]}, 'sb');
new MenuButton("sbbind2", Math.round(G.width / 2) - 250, 390, 500, 36, () => {G.R.R = S[G.R.P].bindings[2]}, 'sb');
new MenuButton("sbbind3", Math.round(G.width / 2) - 250, 440, 500, 36, () => {G.R.R = S[G.R.P].bindings[3]}, 'sb');
new MenuButton("sbbind4", Math.round(G.width / 2) - 250, 490, 500, 36, () => {G.R.R = S[G.R.P].bindings[4]}, 'sb');
new MenuButton("sbbind5", Math.round(G.width / 2) - 250, 540, 500, 36, () => {G.R.R = S[G.R.P].bindings[5]}, 'sb');
new MenuButton("sbbind6", Math.round(G.width / 2) - 250, 590, 500, 36, () => {G.R.R = S[G.R.P].bindings[6]}, 'sb');
new MenuButton("sbbind7", Math.round(G.width / 2) - 250, 640, 500, 36, () => {G.R.R = S[G.R.P].bindings[7]}, 'sb');
//W-BUTTON:T
new MenuButton("tback", 0, 20, 200, 36, () => {G.scene = 'm'}, 't');
new MenuButton("tnext", Math.round(G.width / 2) + 50, G.height - 80, 300, 36, () => {G.TS.page = Math.min(Math.floor((G.TS.A.length - 1) / 2), G.TS.page + 1)}, 't');
new MenuButton("tprev", Math.round(G.width / 2) - 350, G.height - 80, 300, 36, () => {G.TS.page = Math.max(0, G.TS.page - 1)}, 't');
new MenuButton("tleft", 50, 180, Math.round(G.width / 2) - 100, 450, () => {if (G.TS.page * 2 < G.TS.A.length) {NewGame(G.TS.A[G.TS.page * 2]); G.scene = 'g';}}, 't');
new MenuButton("tright", Math.round(G.width / 2) + 50, 180, Math.round(G.width / 2) - 100, 450, () => {if (G.TS.page * 2 + 1 < G.TS.A.length) {NewGame(G.TS.A[G.TS.page * 2 + 1]); G.scene = 'g';}}, 't');

//W-SCENE:M // MENU
new Scene ('m', () => {
    G.C.fillStyle = 'white';
    G.C.font = "40px 'Press Start 2P', sans-serif";
    G.C.textAlign = 'center';
    G.C.fillText('Just Another Tower Defense', Math.round(G.width / 2), 150);
    G.C.font = "32px 'Press Start 2P', sans-serif";
    if (G.N.B.start.hover) G.C.fillText('> NEW GAME <', Math.round(G.width / 2), 350);
    else G.C.fillText('NEW GAME', Math.round(G.width / 2), 350);
    G.C.font = "24px 'Press Start 2P', sans-serif";
    if (G.wave != 0) {
        if (G.N.B.resume.hover) G.C.fillText('> RESUME <', Math.round(G.width / 2), 450);
        else G.C.fillText('RESUME', Math.round(G.width / 2), 450);
    }
    if (G.N.B.settings.hover) G.C.fillText('> SETTINGS <', Math.round(G.width / 2), 530);
    else G.C.fillText('SETTINGS', Math.round(G.width / 2), 530);
    if (G.N.B.editor.hover) G.C.fillText('> EDITOR <', Math.round(G.width / 2), 610);
    else G.C.fillText('EDITOR', Math.round(G.width / 2), 610);
    if (G.N.B.quit.hover) G.C.fillText('> QUIT <', Math.round(G.width / 2), 690);
    else G.C.fillText('QUIT', Math.round(G.width / 2), 690);
});

//W-SCENE:E // EDITOR
new Scene ('e', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', sans-serif";
    G.C.textAlign = 'center';
    G.C.fillText('Not implemented yet -_-', Math.round(G.width / 2), 300);
    G.C.font = "24px 'Press Start 2P', sans-serif";
    if (G.N.B.eback.hover) G.C.fillText('> BACK <', 100, 50);
    else G.C.fillText('BACK', 100, 50);
});

//W-SCENE:S // SETTINGS
new Scene ('s', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', sans-serif";
    G.C.textAlign = 'center';
    G.C.fillText('SETTINGS', Math.round(G.width / 2), 200);
    G.C.font = "24px 'Press Start 2P', sans-serif";
    if (G.N.B.bindings.hover) G.C.fillText('> CONTROLS <', Math.round(G.width / 2), 350);
    else G.C.fillText('CONTROLS', Math.round(G.width / 2), 350);
    if (G.N.B.default.hover) G.C.fillText('> RESET BINDINGS <', Math.round(G.width / 2), 430);
    else G.C.fillText('RESET BINDINGS', Math.round(G.width / 2), 430);
    if (G.N.B.sback.hover) G.C.fillText('> BACK <', 100, 50);
    else G.C.fillText('BACK', 100, 50);
});

//W-SCENE:SB // SETTINGS:BINDINGS
new Scene ('sb', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', sans-serif";
    G.C.textAlign = 'center';
    G.C.fillText("CONTROLS", Math.round(G.width / 2), 200);
    G.C.fillText(S[G.R.P].category, Math.round(G.width / 2), 260);
    G.C.font = "24px 'Press Start 2P', sans-serif";
    y = 320;
    x = 0;
    for (const binding of S[G.R.P].bindings) {
        if (G.R.R == binding) G.C.fillStyle = 'dodgerblue';
        else G.C.fillStyle = 'white';
        key = K[binding].key;
        key = key.replaceAll(/(Digit)|(Arrow)|(Key)/g, "");
        if (G.N.B["sbbind" + x].hover) G.C.fillText(`> ${K[binding].name}: ${key} <`, Math.round(G.width / 2), y);
        else G.C.fillText(`${K[binding].name}: ${key}`, Math.round(G.width / 2), y);
        y += 50;
        x++;
    }
    G.C.fillStyle = 'white';
    G.C.textAlign = 'left';
    if (G.R.P < S.length - 1) {
        if (G.N.B.sbnext.hover) G.C.fillText('NEXT >', Math.round(G.width / 2) + 100, G.height - 50);
        else G.C.fillText('NEXT', Math.round(G.width / 2) + 100, G.height - 50);
    }
    G.C.textAlign = 'right';
    if (G.R.P > 0) {
        if (G.N.B.sbprev.hover) G.C.fillText('< PREVIOUS', Math.round(G.width / 2) - 100, G.height - 50);
        else G.C.fillText('PREVIOUS', Math.round(G.width / 2) - 100, G.height - 50);
    }
    G.C.textAlign = 'center';
    if (G.N.B.sbback.hover) G.C.fillText('> BACK <', 100, 50);
    else G.C.fillText('BACK', 100, 50);
});

//W-SCENE:T // TRACK SELECT
new Scene ('t', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', sans-serif";
    G.C.textAlign = 'center';
    G.C.fillText("TRACK SELECT", Math.round(G.width / 2), 200);
    G.C.textAlign = 'center';
    G.C.font = "24px 'Press Start 2P', sans-serif";
    if (G.N.B.tback.hover) G.C.fillText('> BACK <', 100, 50);
    else G.C.fillText('BACK', 100, 50);
    G.C.fillStyle = 'white';
    G.C.textAlign = 'left';
    if (G.TS.page < Math.floor((G.TS.A.length - 1) / 2)) {
        if (G.N.B.tnext.hover) G.C.fillText('NEXT >', Math.round(G.width / 2) + 100, G.height - 50);
        else G.C.fillText('NEXT', Math.round(G.width / 2) + 100, G.height - 50);
    }
    G.C.textAlign = 'right';
    if (G.TS.page > 0) {
        if (G.N.B.tprev.hover) G.C.fillText('< PREVIOUS', Math.round(G.width / 2) - 100, G.height - 50);
        else G.C.fillText('PREVIOUS', Math.round(G.width / 2) - 100, G.height - 50);
    }
    G.C.textAlign = 'center';
    if (G.TS.page * 2 < G.TS.A.length) {
        G.C.font = "24px 'Press Start 2P', sans-serif";
        if (G.N.B.tleft.hover) G.C.fillText("> " + G.A.M[G.TS.A[G.TS.page * 2]].name + " <", Math.round(G.width / 2 - G.width / 4), 260)
        else G.C.fillText(G.A.M[G.TS.A[G.TS.page * 2]].name, Math.round(G.width / 2 - G.width / 4), 260);
        DrawMiniMap(G.A.M[G.TS.A[G.TS.page * 2]], Math.round(G.width / 2 - G.width / 4 - G.width / 6), 280, Math.round(G.width / 3), 300);
        G.C.font = "16px 'Press Start 2P', sans-serif";
        G.C.fillText(G.A.M[G.TS.A[G.TS.page * 2]].desc, Math.round(G.width / 2 - G.width / 4), 612);
    }
    if (G.TS.page * 2 + 1 < G.TS.A.length) {
        G.C.font = "24px 'Press Start 2P', sans-serif";
        if (G.N.B.tright.hover) G.C.fillText("> " + G.A.M[G.TS.A[G.TS.page * 2 + 1]].name + " <", Math.round(G.width / 2 + G.width / 4), 260);
        else G.C.fillText(G.A.M[G.TS.A[G.TS.page * 2 + 1]].name, Math.round(G.width / 2 + G.width / 4), 260);
        DrawMiniMap(G.A.M[G.TS.A[G.TS.page * 2 + 1]], Math.round(G.width / 2 + G.width / 4 - G.width / 6), 280, Math.round(G.width / 3), 300);
        G.C.font = "16px 'Press Start 2P', sans-serif";
        G.C.fillText(G.A.M[G.TS.A[G.TS.page * 2 + 1]].desc, Math.round(G.width / 2 + G.width / 4), 612);
    }
    G.C.textAlign = 'left';
});

//W-SCENE:G // GAME
new Scene ('g', () => {
    //TRACK
    for (const tile of G.T.T) {
        img = G.A.T[tile.texture];
        G.C.drawImage(img.atlas.img,
            img.xpos, 
            img.ypos, 
            img.atlas.config.size[0],
            img.atlas.config.size[1],
            tile.x * img.atlas.config.scale[0] + G.O.X,
            tile.y * img.atlas.config.scale[1] + G.O.Y,
            img.atlas.config.scale[0],
            img.atlas.config.scale[1]);
    }
    for (const location of G.T.L) {
        img = G.A.T[location.texture];
        G.C.drawImage(img.atlas.img, 
            img.xpos, 
            img.ypos, 
            img.atlas.config.size[0], 
            img.atlas.config.size[1],
            location.x * img.atlas.config.scale[0] + G.O.X,
            location.y * img.atlas.config.scale[1] + G.O.Y,
            img.atlas.config.scale[0],
            img.atlas.config.scale[1]);
    }
    //ENEMIES
    for (const enemy of G.T.E) {
        img = G.A.T[enemy.texture];
        G.C.drawImage(img.atlas.img, 
            img.xpos, 
            img.ypos, 
            img.atlas.config.size[0], 
            img.atlas.config.size[1],
            enemy.x * img.atlas.config.scale[0] - img.atlas.config.scale[0] / 2 + G.O.X,
            enemy.y * img.atlas.config.scale[1] - img.atlas.config.scale[1] / 2 + G.O.Y,
            img.atlas.config.scale[0],
            img.atlas.config.scale[1]);
    }
    if (G.A.S < 0.75) return;
    for (const enemy of G.T.E) {
        img = G.A.T[enemy.texture];
        G.C.fillStyle = enemy.color1;
        G.C.fillRect(
            Math.round(enemy.x * img.atlas.config.scale[0] - (enemy.size[0] / img.atlas.config.defaultscale[0] / 2 * img.atlas.config.scale[0]) + G.O.X),
            Math.round(enemy.y * img.atlas.config.scale[1] - (enemy.size[0] / img.atlas.config.defaultscale[1] / 2 * img.atlas.config.scale[1]) + G.O.Y),
            Math.round((enemy.size[0] * (enemy.hp / enemy.maxhp)) / img.atlas.config.defaultscale[0] * img.atlas.config.scale[0]),
            Math.round(4 / img.atlas.config.defaultscale[1] * img.atlas.config.scale[1])
        );
        G.C.strokeStyle = enemy.color2;
        G.C.lineWidth = 1;
        G.C.strokeRect(
            Math.round(enemy.x * img.atlas.config.scale[0] - (enemy.size[0] / img.atlas.config.defaultscale[0] / 2 * img.atlas.config.scale[0]) + G.O.X),
            Math.round(enemy.y * img.atlas.config.scale[1] - (enemy.size[0] / img.atlas.config.defaultscale[1] / 2 * img.atlas.config.scale[1]) + G.O.Y),
            Math.round((enemy.size[0] * (enemy.hp / enemy.maxhp)) / img.atlas.config.defaultscale[0] * img.atlas.config.scale[0]),
            Math.round(4 / img.atlas.config.defaultscale[1] * img.atlas.config.scale[1])
        );
    }
    //TOWERS
    //RENDERING ORDER: TOWERS
    for (const defense of G.T.B) {
        img = G.A.T[defense.texture];
        G.C.drawImage(img.atlas.img, 
            img.xpos, 
            img.ypos, 
            img.atlas.config.size[0], 
            img.atlas.config.size[1],
            defense.x * img.atlas.config.scale[0] + G.O.X,
            defense.y * img.atlas.config.scale[1] + G.O.Y,
            img.atlas.config.scale[0],
            img.atlas.config.scale[1]);
        img = G.A.T[defense.turret];
        img.atlas.PC.clearRect(0, 0, img.atlas.config.scale[0], img.atlas.config.scale[1]);
        img.atlas.PC.drawImage(
            img.atlas.img,
            img.xpos,
            img.ypos,
            img.atlas.config.size[0],
            img.atlas.config.size[1],
            0,0,
            img.atlas.config.scale[0],
            img.atlas.config.scale[1]
        )
        G.C.save();
        G.C.translate(img.atlas.config.scale[0] * (defense.x + 0.5) + G.O.X, img.atlas.config.scale[1] * (defense.y + 0.5) + G.O.Y);
        G.C.rotate(defense.direction * Math.PI / 180);
        G.C.drawImage(
            img.atlas.P,
            - img.atlas.config.scale[0]/2,
            - img.atlas.config.scale[1]/2
        );
        G.C.restore();
    }
    for (const projectile of G.T.P) {
        G.C.strokeStyle = projectile.color;
        G.C.lineWidth = projectile.width * G.A.S;
        G.C.beginPath();
        G.C.moveTo(projectile.x1 * G.A.TS[0] + G.O.X, projectile.y1 * G.A.TS[0] + G.O.Y);
        G.C.lineTo(projectile.x2 * G.A.TS[1] + G.O.X, projectile.y2 * G.A.TS[1] + G.O.Y);
        G.C.stroke();
    }
    //RENDERING ORDER: TOWER RANGE
    for (const defense of G.T.B) {
        if (defense.x != G.A.C.X || defense.y != G.A.C.Y || !G.A.C.on) continue;
        img = G.A.T[defense.texture];
        G.C.strokeStyle = defense.color + '77';
        G.C.lineWidth = 2;
        gradient = G.C.createRadialGradient(img.atlas.config.scale[0] * (defense.x + 0.5) + G.O.X, img.atlas.config.scale[1] * (defense.y + 0.5) + G.O.Y, 0,
        img.atlas.config.scale[0] * (defense.x + 0.5) + G.O.X, img.atlas.config.scale[1] * (defense.y + 0.5) + G.O.Y, 
        defense.range * img.atlas.config.scale[0]);
        gradient.addColorStop(0, defense.color + '00');
        gradient.addColorStop(0.6, defense.color + '11');
        gradient.addColorStop(1, defense.color + '66');
        G.C.fillStyle = gradient;
        G.C.beginPath();
        G.C.arc(img.atlas.config.scale[0] * (defense.x + 0.5) + G.O.X, img.atlas.config.scale[1] * (defense.y + 0.5) + G.O.Y, 
        defense.range * img.atlas.config.scale[0], 0, 2 * Math.PI);
        G.C.stroke();
        G.C.fill();
    }
    //CURSOR
    if (G.A.C.on) {
        texture = 'selected-invalid';
        try { if (getTile(G.A.C.X, G.A.C.Y).type == 'platform') {texture = 'selected';} } catch {};
        img = G.A.T[texture];
        img.atlas.PC.clearRect(0, 0, img.atlas.config.scale[0], img.atlas.config.scale[1]);
        img.atlas.PC.drawImage(
            img.atlas.img,
            img.xpos,
            img.ypos,
            img.atlas.config.size[0],
            img.atlas.config.size[1],
            0,0,
            img.atlas.config.scale[0],
            img.atlas.config.scale[1]
        )
        G.C.save();
        G.C.translate(img.atlas.config.scale[0] * (G.A.C.X + 0.5) + G.O.X, img.atlas.config.scale[1] * (G.A.C.Y + 0.5) + G.O.Y);
        G.C.rotate(G.A.C.pos * Math.PI / 180);
        G.C.drawImage(
            img.atlas.P,
            -img.atlas.config.scale[0]/2,
            -img.atlas.config.scale[1]/2
        );
        G.C.restore();
    }
    if (getTile(G.A.C.X, G.A.C.Y, true).type == 'platform' && G.A.C.on) G.U.on = true;
    else G.U.on = false;
    if (G.U.on && G.U.anim < 50) G.U.anim += 10;
    if (!G.U.on && G.U.anim > 0) G.U.anim -= 10;
    offset = (96 * Math.sin((Math.PI / 50) * (G.U.anim - 25)) + 96);
    //W-UI
    //TOPBAR
    G.C.fillStyle = '#393939';
    G.C.font = "16px 'Press Start 2P', sans-serif";
    G.C.fillRect(0, 0, G.width, 48);
    G.C.fillRect(0, G.height - offset, G.width, 192);
    //BOSSBAR
    //G.D = G.boss;
    if (G.boss != null) {
        G.C.fillStyle = '#555';
        G.C.font = "16px 'Press Start 2P', sans-serif";
        G.C.fillRect(12, 48, G.C.measureText('BOSS').width + 8, 24);
        G.C.fillStyle = 'crimson';
        G.C.fillText("BOSS", 16, 68);
        var gradient = G.C.createLinearGradient(0, 48, 0, G.height - offset);
        gradient.addColorStop(0, '#a70018');
        gradient.addColorStop(1, '#ff0000');
        G.C.fillStyle = gradient;
        G.C.fillRect(0, 48, 12, (G.height - 48 - offset) * (G.boss.hp / G.boss.maxhp));
    }
    //WAVE TIMER
    G.C.fillStyle = '#555';
    if (G.wave == 0) G.C.fillRect(G.width - G.C.measureText('Send Wave: --').width - 20, 48, 
    G.C.measureText('Send Wave: --').width + 20, 32);
    else G.C.fillRect(G.width - G.C.measureText('Send Wave: ' + Math.max(Math.floor(G.wavetimer / 50), 0)).width - 20, 48, 
    G.C.measureText('Send Wave: ' + Math.max(Math.floor(G.wavetimer / 50), 0)).width + 20, 32);
    if (G.wavespawn > 0) G.C.fillStyle = '#999';
    else G.C.fillStyle = 'white';
    G.C.textAlign = 'right';
    if (G.wave == 0) G.C.fillText('Send Wave: --', G.width - 10, 72);
    else G.C.fillText('Send Wave: ' + Math.max(Math.floor(G.wavetimer / 50), 0), G.width - 10, 72);
    G.C.textAlign = 'left';
    if (getTile(G.A.C.X, G.A.C.Y, true).tower == null) G.C.fillStyle = 'white';
    else G.C.fillStyle = getTile(G.A.C.X, G.A.C.Y, true).tower.color;
    G.C.textBaseline = 'top';
    G.C.font = "24px 'Press Start 2P', sans-serif";
    //W-UI:INFOBOX
    if (getTile(G.A.C.X, G.A.C.Y, true).tower == null && G.U.on) {
        G.C.fillText("Platform [Lv. -]", 10, G.height - offset + 10,);
        G.C.font = "16px 'Press Start 2P', sans-serif";
        G.C.strokeStyle = 'gray';
        G.C.lineWidth = 2;
        G.C.textAlign = 'center';

        if (G.points < G.A.B.basic.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.A.B.basic.color;
        G.C.fillText(`[${G.A.B.basic.cost}p] ${G.A.B.basic.name}`, Math.floor(G.width / 6), G.height - offset + 80);
        G.C.strokeRect(0, G.height - offset + 68, Math.floor((G.width) / 3), 40);

        if (G.points < G.A.B.sniper.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.A.B.sniper.color;
        G.C.fillText(`[${G.A.B.sniper.cost}p] ${G.A.B.sniper.name}`, Math.floor(G.width / 6 * 3), G.height - offset + 80);
        G.C.strokeRect(Math.floor(G.width / 3), G.height - offset + 68, Math.floor((G.width) / 3), 40);

        if (G.points < G.A.B.beam.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.A.B.beam.color;
        G.C.fillText(`[${G.A.B.beam.cost}p] ${G.A.B.beam.name}`, Math.floor(G.width / 6 * 5), G.height - offset + 80);
        G.C.strokeRect(Math.floor(G.width / 3 * 2), G.height - offset + 68, Math.floor((G.width) / 3), 40);

        if (G.points < G.A.B.multi.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.A.B.multi.color;
        G.C.fillText(`[${G.A.B.multi.cost}p] ${G.A.B.multi.name}`, Math.floor(G.width / 6), G.height - offset + 120);
        G.C.strokeRect(0, G.height - offset + 108, Math.floor((G.width) / 3), 40);

        if (G.points < G.A.B.aura.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.A.B.aura.color;
        G.C.fillText(`[${G.A.B.aura.cost}p] ${G.A.B.aura.name}`, Math.floor(G.width / 6 * 3), G.height - offset + 120);
        G.C.strokeRect(Math.floor(G.width / 3), G.height - offset + 108, Math.floor((G.width) / 3), 40);

        if (G.points < G.A.B.super.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.A.B.super.color;
        G.C.fillText(`[${G.A.B.super.cost}p] ${G.A.B.super.name}`, Math.floor(G.width / 6 * 5), G.height - offset + 120);
        G.C.strokeRect(Math.floor(G.width / 3 * 2), G.height - offset + 108, Math.floor((G.width) / 3), 40);

        G.C.textAlign = 'left';
    } else if (G.U.on) {
        tower = getTile(G.A.C.X, G.A.C.Y, true).tower;
        G.C.fillText(tower.name + ` [Lv. ${tower.level}]`, 10, G.height - offset + 10);
        G.C.font = "16px 'Press Start 2P', sans-serif";
        G.C.fillText("Kills: " + tower.kills.toLocaleString(), 10, G.height - offset + 44);
        G.C.fillText("Earned: " + tower.earned.toLocaleString() + "p", 10, G.height - offset + 64);
        G.C.fillText("Fire Rate: " + tower.firerate.toFixed(1) + "/s", 10, G.height - offset + 84);
        G.C.fillText("Damage: " + tower.damage.toFixed(1), 10, G.height - offset + 104);
        G.C.fillText("DPS: " + (tower.firerate * tower.damage).toFixed(1) + "/s", 10, G.height - offset + 124); 
        G.C.fillText("Range: " + tower.range.toFixed(2), 10, G.height - offset + 144);  
        G.C.fillText("Shots: " + tower.shots.toFixed(0) + " (" + (tower.firerate * tower.damage * tower.shots).toFixed(0) + " DPS)", 10, G.height - offset + 164);
        //DRAW UPGRADES
        upgradeOffset = Math.floor(G.width / 3);
        upgradeTop = G.height - offset + 40;
        upgradeWidth = Math.floor(G.width / 3 * 2);
        pos1 = upgradeOffset + Math.floor(upgradeWidth / 6);
        pos2 = upgradeOffset + Math.floor(upgradeWidth / 6) + Math.floor(upgradeWidth / 3);
        pos3 = upgradeOffset + Math.floor(upgradeWidth / 6) + Math.floor(upgradeWidth / 3 * 2);
        G.C.textAlign = 'center';
        if (tower.available[0]) {
            if (G.points < tower.available[0].cost) G.C.fillStyle = 'gray';
            else G.C.fillStyle = tower.color;
            G.C.fillText(tower.available[0].name, pos1, upgradeTop);
            vpos = upgradeTop + 26;
            G.C.font = "8px 'Press Start 2P', sans-serif";
            for (const desc of tower.available[0].desc) {
                G.C.fillText(desc, pos1, vpos);
                vpos += 12;
            }
            vpos += 8;
            G.C.font = "16px 'Press Start 2P', sans-serif";
            G.C.fillText("[" + tower.available[0].cost + "p]", pos1, vpos);
        }
        if (tower.available[1]) {
            if (G.points < tower.available[1].cost) G.C.fillStyle = 'gray';
            else G.C.fillStyle = tower.color;
            G.C.fillText(tower.available[1].name, pos2, upgradeTop);
            vpos = upgradeTop + 26;
            G.C.font = "8px 'Press Start 2P', sans-serif";
            for (const desc of tower.available[1].desc) {
                G.C.fillText(desc, pos2, vpos);
                vpos += 12;
            }
            vpos += 8;
            G.C.font = "16px 'Press Start 2P', sans-serif";
            G.C.fillText("[" + tower.available[1].cost + "p]", pos2, vpos);
        }
        if (tower.available[2]) {
            if (G.points < tower.available[2].cost) G.C.fillStyle = 'gray';
            else G.C.fillStyle = tower.color;
            G.C.fillText(tower.available[2].name, pos3, upgradeTop);
            vpos = upgradeTop + 26;
            G.C.font = "8px 'Press Start 2P', sans-serif";
            for (const desc of tower.available[2].desc) {
                G.C.fillText(desc, pos3, vpos);
                vpos += 12;
            }
            vpos += 8;
            G.C.font = "16px 'Press Start 2P', sans-serif";
            G.C.fillText("[" + tower.available[2].cost + "p]", pos3, vpos);
        }
        G.C.font = "16px 'Press Start 2P', sans-serif";
        G.C.fillStyle = tower.color;
        G.C.fillText('<', Math.round(G.width / 2), G.height - offset + 10);
        G.C.fillText('>', Math.round(G.width / 2) + 200, G.height - offset + 10);
        G.C.fillStyle = T.T[tower.targeting].color;
        G.C.fillText(T.T[tower.targeting].name, Math.round(G.width / 2) + 100, G.height - offset + 10);
        G.C.fillStyle = 'firebrick';
        G.C.textAlign = 'right';
        G.C.strokeStyle = 'gray';
        G.C.lineWidth = 2;
        G.C.fillText("Destroy: " + tower.refund + "p", G.width - 10, G.height - offset + 10);
        G.C.textAlign = 'left';
    }
    G.C.textBaseline = 'alphabetic';
    G.C.fillStyle = 'gold';
    G.C.font = "24px 'Press Start 2P', sans-serif";
    G.C.fillText(G.points.toLocaleString() + 'p', 12, 36);
    G.C.textAlign = 'right';
    if (G.hp / G.maxhp > 1) G.C.fillStyle = 'rgb(0, 255, ' + Math.round((G.hp / G.maxhp - 1) * 255) + ')';
    if (G.hp / G.maxhp > 0.5 && G.hp / G.maxhp <= 1) G.C.fillStyle = 'rgb(' + Math.round(255 - (G.hp / G.maxhp - 0.5) * 2 * 255) + ', 255, 0)';
    if (G.hp / G.maxhp <= 0.5) G.C.fillStyle = 'rgb(255, ' + Math.round((G.hp / G.maxhp) * 2 * 255) + ',0)';
    G.C.fillText(Math.max(Math.round(G.hp), 0) + "HP", G.width - 12, 36);
    G.C.textAlign = 'center';
    G.C.fillStyle = 'white';
    if (!G.S.MORESPEED) switch (G.speed) {
        case 0:
            speed = ' | 0x | ';
            break;
        case 1:
            speed = ' > .5x | ';
            break;
        case 2:
            speed = ' > 1x > ';
            break;
        case 3:
            speed = ' >> 2x >> ';
            break;
        case 4:
            speed = ' >>> 4x >>> ';
            break;
    }
    if (G.S.MORESPEED) switch (G.speed) {
        case 0:
            speed = ' | 0x | ';
            break;
        case 1:
            speed = ' > .5x | ';
            break;
        case 2:
            speed = ' > 1x > ';
            break;
        case 3:
            speed = ' >> 2x >> ';
            break;
        case 4:
            speed = ' >>> 3x >> ';
            break;
        case 5:
            speed = ' >>> 4x >>> ';
            break;
        case 6:
            speed = ' >>>> 6x >>> ';
            break;
        case 7:
            speed = ' >>>> 8x >>>> ';
            break;
        case 8:
            speed = ' >>>>> 12x >>>> ';
            break;
        case 9:
            speed = ' >>>>> 16x >>>>> ';
            break;
    }
    //W-UI:MINIMAP
    G.C.fillText('Wave ' + G.wave + speed + G.time.toString().formatDuration(), Math.floor(G.width / 2), 36);
    DrawMiniMap(G.A.M[G.map], G.width - G.S.mapx, G.height - offset - G.S.mapy, G.S.mapx, G.S.mapy, G.T.E, G.T.B);
    G.C.textAlign = 'left';
});

//W-BINDINGS
new KeyBinding('Deselect', 'deselect', 'Escape', () => {G.A.C.on = false;}, 'g');
new KeyBinding('Recenter', 'recenter', 'KeyR', () => {G.O.X = 0; G.O.Y = 0;}, 'g');
new KeyBinding('Move Right', 'right', 'ArrowRight', e => {
    if (e.ctrlKey && e.shiftKey) G.O.X -= G.A.TS[0] * 16;
    else if (e.ctrlKey) G.O.X -= G.A.TS[0] / 4; 
    else if (e.shiftKey) G.O.X -= G.A.TS[0] * 4; 
    else G.O.X -= G.A.TS[0];
}, 'g');
new KeyBinding('Move Left', 'left', 'ArrowLeft', e => {
    if (e.ctrlKey && e.shiftKey) G.O.X += G.A.TS[0] * 16;
    else if (e.ctrlKey) G.O.X += G.A.TS[0] / 4;
    else if (e.shiftKey) G.O.X += G.A.TS[0] * 4;
    else G.O.X += G.A.TS[0];
}, 'g');
new KeyBinding('Move Up', 'up', 'ArrowUp', e => {
    if (e.ctrlKey && e.shiftKey) G.O.Y += G.A.TS[1] * 16;
    else if (e.ctrlKey) G.O.Y += G.A.TS[0] / 4;
    else if (e.shiftKey) G.O.Y += G.A.TS[0] * 4;
    else G.O.Y += G.A.TS[0];
}, 'g');
new KeyBinding('Move Down', 'down', 'ArrowDown', e => {
    if (e.ctrlKey && e.shiftKey) G.O.Y -= G.A.TS[1] * 16;
    else if (e.ctrlKey) G.O.Y -= G.A.TS[0] / 4;
    else if (e.shiftKey) G.O.Y -= G.A.TS[0] * 4;
    else G.O.Y -= G.A.TS[0];
}, 'g');
new KeyBinding('Build Basic', 'basic', 'KeyG', e => {
    if (getTile(G.A.C.X, G.A.C.Y, true).type == 'platform' && getTile(G.A.C.X, G.A.C.Y).tower == null && G.points >= G.A.B.basic.cost && G.A.C.on) {
        G.A.B.basic.generate(G.A.C.X, G.A.C.Y);
        G.points -= G.A.B.basic.cost;
    } 
}, 'g');
new KeyBinding('Build Sniper', 'sniper', 'KeyH', e => {
    if (getTile(G.A.C.X, G.A.C.Y, true).type == 'platform' && getTile(G.A.C.X, G.A.C.Y).tower == null && G.points >= G.A.B.sniper.cost && G.A.C.on) {
        G.A.B.sniper.generate(G.A.C.X, G.A.C.Y);
        G.points -= G.A.B.sniper.cost;
    } 
}, 'g');
new KeyBinding('Build Beam', 'beam', 'KeyJ', e => {
    if (getTile(G.A.C.X, G.A.C.Y, true).type == 'platform' && getTile(G.A.C.X, G.A.C.Y).tower == null && G.points >= G.A.B.beam.cost && G.A.C.on) {
        G.A.B.beam.generate(G.A.C.X, G.A.C.Y);
        G.points -= G.A.B.beam.cost;
    } 
}, 'g');
new KeyBinding('Build Multishot', 'multi', 'KeyB', e => {
    if (getTile(G.A.C.X, G.A.C.Y, true).type == 'platform' && getTile(G.A.C.X, G.A.C.Y).tower == null && G.points >= G.A.B.multi.cost && G.A.C.on) {
        G.A.B.multi.generate(G.A.C.X, G.A.C.Y);
        G.points -= G.A.B.multi.cost;
    } 
}, 'g');
new KeyBinding('Build Aura', 'aura', 'KeyN', e => {
    if (getTile(G.A.C.X, G.A.C.Y, true).type == 'platform' && getTile(G.A.C.X, G.A.C.Y).tower == null && G.points >= G.A.B.aura.cost && G.A.C.on) {
        G.A.B.aura.generate(G.A.C.X, G.A.C.Y);
        G.points -= G.A.B.aura.cost;
    } 
}, 'g');
new KeyBinding('Build Ultimate', 'super', 'KeyM', e => {
    if (getTile(G.A.C.X, G.A.C.Y, true).type == 'platform' && getTile(G.A.C.X, G.A.C.Y).tower == null && G.points >= G.A.B.super.cost && G.A.C.on) {
        G.A.B.super.generate(G.A.C.X, G.A.C.Y);
        G.points -= G.A.B.super.cost;
    } 
}, 'g');
new KeyBinding('Destroy', 'destroy', 'KeyX', e => {
    for (var i = 0; i < G.T.B.length; i++) {
        if (G.T.B[i].x == G.A.C.X && G.T.B[i].y == G.A.C.Y && getTile(G.T.B[i].x, G.T.B[i].y, true).tower != null) {
            G.points += getTile(G.T.B[i].x, G.T.B[i].y).tower.refund;
            getTile(G.T.B[i].x, G.T.B[i].y).tower = null;
            G.T.B.splice(i, 1);
        } 
    }
}, 'g');
new KeyBinding('Speed Up', 'speed', 'KeyD', e => {
    G.speed = Math.min(G.maxspeed, G.speed + 1);
    if (G.speed == 0) {
        G.pause = true;
    } else {
        G.pause = false;
    }
    if (G.speed == 1) {
        G.alternate = true;
    } else {
        G.alternate = false;
    }
    G.multi = G.speeds[G.speed];
}, 'g');
new KeyBinding('Slow Down', 'slow', 'KeyA', e => {
    G.speed = Math.max(0, G.speed - 1);
    if (G.speed == 0) {
        G.pause = true;
    } else {
        G.pause = false;
    }
    if (G.speed == 1) {
        G.alternate = true;
    } else {
        G.alternate = false;
    }
    G.multi = G.speeds[G.speed];
}, 'g');
new KeyBinding('Pause', 'pause', 'KeyS', e => {
    if (G.pause) {
        G.speed = 2;
        G.pause = false;
    }
    else {
        G.speed = 0;
        G.pause = true;
    }
    if (G.speed == 1) {
        G.alternate = true;
    } else {
        G.alternate = false;
    }
    G.multi = G.speeds[G.speed];
}, 'g');
new KeyBinding('Send Wave', 'wave', 'KeyW', e => {if (G.wavespawn < 0) NextWave();}, 'g');
new KeyBinding('Buy Upgrade 1', 'upgrade1', 'Digit1', e => {BuyUpgrade(getTile(G.A.C.X, G.A.C.Y, true), 0);}, 'g');
new KeyBinding('Buy Upgrade 2', 'upgrade2', 'Digit2', e => {BuyUpgrade(getTile(G.A.C.X, G.A.C.Y, true), 1);}, 'g');
new KeyBinding('Buy Upgrade 3', 'upgrade3', 'Digit3', e => {BuyUpgrade(getTile(G.A.C.X, G.A.C.Y, true), 2);}, 'g');
new KeyBinding('Force Wave', 'force', 'KeyF', e => {NextWave();}, 'g');
new KeyBinding('Start', 'start', 'Enter', e => {G.scene = 'g'}, 'm');
new KeyBinding('Quit', 'quit', 'KeyQ', e => {G.scene = 'm'; G.speed = 0; G.pause = true;}, 'g');`q`
new KeyBinding('Next Targeting', 'nexttargeting', 'KeyY', e => {if (getTile(G.A.C.X, G.A.C.Y, true).tower !== null) getTile(G.A.C.X, G.A.C.Y).tower.targetchange(1)}, 'g');
new KeyBinding('Previous Targeting', 'prevtargeting', 'KeyT', e => {if (getTile(G.A.C.X, G.A.C.Y, true).tower !== null) getTile(G.A.C.X, G.A.C.Y).tower.targetchange(-1)}, 'g');
new KeyBinding('Back', 'back', 'Escape', e => {if (G.scene.length > 1) G.scene = G.scene.slice(0, -1); else G.scene = 'm'}, ['e', 's', 'sb', 't']);
new KeyBinding('Debug On', 'don', 'KeyP', e => {G.DEEEEEEEEBUG = true}, ['g', 'm', 's']);
new KeyBinding('Debug Off', 'doff', 'KeyO', e => {G.DEEEEEEEEBUG = false}, ['g', 'm', 's']);

B = JSON.parse(window.localStorage.getItem('keys'));
if (B != null) for (const binding in B) if (K[binding]) K[binding].key = B[binding];

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
function DrawMiniMap(data, posx, posy, width, height, enemies=[], towers=[]) {
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