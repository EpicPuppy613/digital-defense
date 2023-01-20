//override 
Array.prototype.includes = function (obj) {
    let i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

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
G.settings = {}; //SETTINGS
G.settings.mapy = 0;

//W-SETTINGS
// -----[SETTINGS]-----
G.settings.extendedtargeting = true; //Extended targetting options
G.settings.MORESPEED = false; //MORE speed options
G.settings.lives = 1.0; //Lives multiplier
G.settings.mapx = Math.floor(G.width / 5); //Minimap X max width
G.settings.cheatmode = false; //Enable increased starting money & lives
// --------------------
if (G.settings.MORESPEED) {
    G.speeds = [0, 0.5, 1, 2, 3, 4, 6, 8, 12, 16];
    G.maxspeed = 9;
}
G.mouse = {}; //MOUSE
G.mouse.X = 0; //MOUSE X
G.mouse.Y = 0; //MOUSE Y
G.nav = {}; //NAVIGATION
G.nav.buttons = {}; //BUTTONS
G.nav.pos = 0; //MENU POSITION
G.scene = 'l'; //SCENE
G.boss = null;
G.data = {}; //ASSETS
/** @type {Track{}} */
G.data.maps = {}; //MAPS
G.data.tileSize = [64, 64]; //TILE SCALE
G.data.difficultiesefaultSize = [64, 64]; //DEFAULT SCALE
G.data.scale = 1; //SCALE
G.data.atlas = {}; //TEXTURE ATLASES
G.data.textures = {}; //TEXTURE DIRECTORY
G.data.loaded = false; //GAME LOADED
G.debug = ["", "", "", "", "", "", "", ""]; //CONSOLE
/** @type {DEbugMsg[]} */
G.DC = []; //Debug Componenets
G.data.enemies = {};
G.data.buildings = {};
G.data.difficulties = {};
G.data.difficulties.W = {};
G.data.locations = {}; //LOCATIONS
G.data.locations.spawn = []; //SPAWNS
G.data.cursor = {}; //CURSOR
G.data.cursor.on = false;
G.data.cursor.pos = 0; //CURSOR ANIMATION FRAME
G.data.cursor.X = 2; //CURSOR X
G.data.cursor.Y = 2; //CURSOR Y
G.offset = {}; //OFFSET
G.offset.X = 0;
G.offset.Y = 0;
/** TRACK SELECT */
G.trackSelect = {};
G.trackSelect.page = 0;
/** options */
G.trackSelect.O = [];
/** available @type {Track[]} */
G.trackSelect.available = [];
G.objects = {};
/** projectiles */
G.objects.projectiles = [];
/** tiles */
G.objects.tiles = [];
/** locations */
G.objects.locations = [];
/** buildings */
G.objects.buildings = [];
/** enemies */
G.objects.enemies = [];
G.toolBar = {};
G.toolBar.on = false;
G.toolBar.anim = 0;
G.points = 0;
G.basepoints = 150;
G.basehp = 25;
G.hp = Math.round(G.basehp * G.settings.lives);
G.maxhp = Math.round(G.basehp * G.settings.lives);
G.pan = {};
G.pan.down = false;
G.pan.x = 0;
G.pan.y = 0;

if (G.settings.cheatmode) {
    G.basepoints *= 1000;
    G.basehp *= 100;
}

G.bindings = {}; //HOTKEYS
G.scenes = {}; //SCENES
G.targeting = {};
G.targeting.all = {};
G.targeting.list = [];

/** Loading */
G.load = {};
G.load.percent = 0;
G.load.loaded = [];
G.load.stage = 0;
G.load.manifest = null;
G.load.stages = [
    {
        stage: 'maps',
        display: 'loading maps...',
        percent: 0,
        progress: 0,
        total: 0
    },
    {
        stage: 'enemies',
        display: 'loading enemies...',
        percent: 0,
        progress: 0,
        total: 0
    },
    {
        stage: 'waves',
        display: 'loading waves...',
        percent: 0,
        progress: 0,
        total: 0
    },
    {
        stage: 'towers',
        display: 'loading towers...',
        percent: 0,
        progress: 0,
        total: 0
    },
    {
        stage: 'upgrades',
        display: 'loading upgrades...',
        percent: 0,
        progress: 0,
        total: 0
    }
];

G.editor = {}; //EDITOR
G.editor.bounds = {}; //MAP BOUNDS
G.editor.bounds.left = 0; //LEFT
G.editor.bounds.top = 0; //TOP
G.editor.bounds.right = 0; //RIGHT
G.editor.bounds.bottom = 0; //BOTTOM
G.editor.direction = {}; //DIRECTIONS
G.editor.direction.left = false; //LEFT
G.editor.direction.right = false; //RIGHT
G.editor.direction.up = false; //UP
G.editor.direction.down = false; //DOWN
G.editor.direction.base = false; //BASE
G.editor.direction.platform = false; //PLATFORM

G.audio = {}; //AUDIO
G.audio.music = {}; //MUSIC
G.audio.music.list = [
    {
        "scenes": ['m', 't'],
        "pool": ["audio/menua.mp3"]
    },
    {
        "scenes": ['s', 'ss', 'sg', 'sb'],
        "pool": ["audio/settings.mp3"]
    }
]; //MUSIC
G.audio.music.transition = 1; //TRANSITION
G.audio.music.switch = false; //SWITCH
G.audio.music.default = [ //DEFAULT
    "audio/menua.mp3"
]
/** @type {HTMLAudioElement} */
G.audio.music.current = null; //CURRENT
G.audio.volume = {}; //VOLUME
G.audio.volume.music = 1; //MUSIC VOLUME
G.audio.volume.sfx = 1; //SFX VOLUME

G.rebind = {}; //REBINDING
G.rebind.page = 0; //REBINDING PAGE
G.rebind.current = undefined; //REBIND
//W-REBIND
G.rebind.bindings = [
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
    G.audio.music.current = new Audio();
    G.audio.music.current.src = src;
    G.audio.music.current.volume = G.audio.volume.music;
    G.audio.music.current.oncanplay = function () {
        this.play();
    }
    G.audio.music.current.onpause = function () {
        G.audio.music.switch = false;
        for (const pool of G.audio.music.list) {
            if (pool.scenes.includes(G.scene)) {
                NextAudio(pool.pool[Math.floor(Math.random() * pool.pool.length)]);
                return;
            }
        }
        NextAudio(G.audio.music.default[Math.floor(Math.random() * G.audio.music.default.length)]);
    }
}

setTimeout(() => NextAudio(G.audio.music.default[Math.floor(Math.random() * G.audio.music.default.length)]), 500);

String.prototype.formatDuration = function () {
    let sec_num = Math.floor(parseInt(this, 10)); // don't forget the second param
    let days = Math.floor(sec_num / 86400);
    let hours = Math.floor((sec_num % 86400) / 3600);
    let minutes = Math.floor((sec_num % 3600) / 60);
    let seconds = sec_num % 60;

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
        let indent = "";
        if (this.side == 'r') {
            for (let i = 0; i < this.indent; i++) {
                indent += " -";
            }
            if (this.content == null) return this.label + indent;
            else if (this.label == null) return this.content() + indent;
            return this.label + ": " + this.content() + indent;
        } else {
            for (let i = 0; i < this.indent; i++) {
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
        G.objects.tiles.push(this);
    }
}

class Location {
    constructor(type, x, y, texture) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.texture = texture;
        G.objects.locations.push(this);
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
            G.trackSelect.available.push(this.id);
        }
        G.data.maps[this.id] = this;
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
        G.objects.buildings.push(getTile(this.x, this.y).tower);
    }
    tick() {
        //find enemy
        while (this.cooldown <= 0) {
            let shots = this.shots;
            let sort = [];
            let property = 'distance';
            let reverse = false;
            for (const targeting in G.targeting.all) {
                if (this.targeting == targeting) {
                    property = G.targeting.all[targeting].property;
                    reverse = G.targeting.all[targeting].reverse;
                }
            }
            for (let e = 0; e < G.objects.enemies.length; e++) {
                sort.push([e, G.objects.enemies[e][property], G.objects.enemies[e].distance]);
            }
            sort.sort((a, b) => b[2] - a[2]);
            sort.sort((a, b) => b[1] - a[1]);
            if (reverse) sort.reverse();
            let fire = false;
            for (const s of sort) {
                let enemy = G.objects.enemies[s[0]];
                let difx = enemy.x * G.data.tileSize[0] - (this.x + 0.5) * G.data.tileSize[0];
                let dify = enemy.y * G.data.tileSize[1] - (this.y + 0.5) * G.data.tileSize[1];
                if (!(difx ** 2 + dify ** 2 <= (this.range * G.data.tileSize[0]) ** 2)) continue;
                let direction = (Math.atan2(enemy.y * G.data.tileSize[1] - (this.y + 0.5) * G.data.tileSize[1], enemy.x * G.data.tileSize[0] - (this.x + 0.5) * G.data.tileSize[0]) * (180 / Math.PI)) + 90;
                let directionDiff = direction - this.direction;
                if (directionDiff > 180) directionDiff -= 360;
                else if (directionDiff < -180) directionDiff += 360;
                if (this.cooldown <= 0/*Math.abs(directionDiff) < this.rotspeed / 50*/) {
                    this.direction = direction;
                }
                let distance = (difx / Math.cos((direction - 90) * (Math.PI / 180)));
                let hit = [distance * Math.sin(this.direction * (Math.PI / 180)), -distance * Math.cos(this.direction * (Math.PI / 180))];
                //G.D = [difx, dify, hit];
                if (
                    hit[0] >= difx - enemy.hitbox[0] / 2 &&
                    hit[0] <= difx + enemy.hitbox[0] / 2 &&
                    hit[1] >= dify - enemy.hitbox[1] / 2 &&
                    hit[1] <= dify + enemy.hitbox[1] / 2 &&
                    this.cooldown <= 0
                ) {
                    fire = true;
                    let prevhp = JSON.parse(JSON.stringify(enemy.hp));
                    enemy.hp -= this.damage;
                    if (enemy.hp <= 0 && prevhp > 0) { this.kills++; this.earned += enemy.reward; }
                    let offset = [(this.offset / G.data.tileSize[0]) * Math.sin(this.direction * (Math.PI / 180)), -(this.offset / G.data.tileSize[1]) * Math.cos(this.direction * (Math.PI / 180))];
                    G.objects.projectiles.push(new Laser(this.width, this.color, hit[0] / G.data.tileSize[0] + (this.x + 0.5), hit[1] / G.data.tileSize[1] + (this.y + 0.5),
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
        if (this.tnum >= G.targeting.list.length) this.tnum -= G.targeting.list.length;
        if (this.tnum < 0) this.tnum += G.targeting.list.length;
        this.targeting = G.targeting.list[this.tnum];
    }
    refreshupgrades() {
        if (this.available.length != 0) return;
        let pool = [];
        for (const upgrade of G.data.upgrades[this.type]) {
            if (this.upgrades.includes(upgrade.id)) continue;
            let buyable = true;
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
        for (let i = 0; i < 3; i++) {
            let choose = Math.floor(Math.random() * pool.length);
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
        let tile = Math.floor(Math.random() * G.data.locations.spawn.length);
        let img = G.data.textures[this.texture];
        G.objects.enemies.push(new Enemy(
            (G.data.locations.spawn[tile][0] + this.size[0] / (2 * img.atlas.config.scale[0])) + Math.floor(Math.random() * (1 - this.size[0] / img.atlas.config.scale[0]) * img.atlas.config.scale[0]) / img.atlas.config.scale[0],
            (G.data.locations.spawn[tile][1] + this.size[1] / (2 * img.atlas.config.scale[1])) + Math.floor(Math.random() * (1 - this.size[1] / img.atlas.config.scale[1]) * img.atlas.config.scale[1]) / img.atlas.config.scale[1],
            // G.data.locations.spawn[tile][0] * G.data.atlas.config.scale[0],
            // G.data.locations.spawn[tile][1] * G.data.atlas.config.scale[1], 
            G.data.locations.spawn[tile], this.type, this.size, this.texture, this.hp * hpmult, this.damage, this.speed * speedmult,
            this.hitbox, Math.round(this.reward * rewardmult), this.color1, this.color2));
        return G.objects.enemies[-1];
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
    newTile() {
        let direction;
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
    }
    tick() {
        if (this.movement <= 0) {
            if(this.newTile()) return true;
        } else {
            let movedistance = this.speed / F.time;
            while (movedistance > 0) {
                if (movedistance > this.movement) {
                    this.x += this.direction[0] * this.movement;
                    this.y += this.direction[1] * this.movement;
                    movedistance -= this.movement;
                    this.movement = 0;
                } else {
                    this.x += this.direction[0] * this.speed / F.time;
                    this.y += this.direction[1] * this.speed / F.time;
                    movedistance = 0;
                    this.movement -= Math.abs(((this.direction[0] * this.speed) + (this.direction[1] * this.speed)) / F.time);
                }
                if (this.movement <= 0) if(this.newTile()) return true;
            }
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
        G.data.atlas[this.id] = this;
        this.img = new Image();
        this.img.src = this.src;
        this.P = new OffscreenCanvas(this.config.size[0], this.config.size[1]);
        this.PC = this.P.getContext('2d');
        for (const i of this.items) {
            i.xpos = i.xpos * this.config.size[0];
            i.ypos = i.ypos * this.config.size[1];
            i.atlas = this;
            G.data.textures[i.id] = i;
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
        G.nav.buttons[this.id] = this;
    }
    collide(x, y) {
        let px;
        let py;
        let pw;
        let ph;
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
        G.targeting.all[id] = this;
        if (this.available) G.targeting.list.push(this.id);
    }
}

function debug(msg) {
    G.debug.push(msg);
    G.debug.shift();
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
    for (const tile of G.objects.tiles) {
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
    for (t = 0; t < G.objects.tiles.length; t++) {
        if (G.objects.tiles[t].x == x && G.objects.tiles[t].y == y) {
            G.objects.tiles.splice(t, 1);
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
    G.data.locations.spawn = [];
    G.T = {};
    G.objects.projectiles = [];
    G.objects.tiles = [];
    G.objects.locations = [];
    G.objects.buildings = [];
    G.objects.enemies = [];
    for (let y = 0; y < mapdata.track.length; y++) {
        for (let x = 0; x < mapdata.track[y].length; x++) {
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
    for (let i = 0; i < mapdata.locations.length; i++) {
        new Location(mapdata.locations[i].type, mapdata.locations[i].pos[0], mapdata.locations[i].pos[1], mapdata.locations[i].type);
        if (mapdata.locations[i].type == "spawn") G.data.locations.spawn.push(mapdata.locations[i].pos);
    }
    for (let t = 0; t < G.objects.tiles.length; t++) {
        if (G.objects.tiles[t].type != 'track' || G.objects.tiles[t].paths != '') continue;
        let r = false;
        let l = false;
        let u = false;
        let d = false;
        tile = G.objects.tiles[t];
        if (getTile(G.objects.tiles[t].x + 1, G.objects.tiles[t].y, true).type == 'track') if (getTile(G.objects.tiles[t].x + 1, G.objects.tiles[t].y, true).direction.includes('l')) r = true;
        if (getTile(G.objects.tiles[t].x - 1, G.objects.tiles[t].y, true).type == 'track') if (getTile(G.objects.tiles[t].x - 1, G.objects.tiles[t].y, true).direction.includes('r')) l = true;
        if (getTile(G.objects.tiles[t].x, G.objects.tiles[t].y - 1, true).type == 'track') if (getTile(G.objects.tiles[t].x, G.objects.tiles[t].y - 1, true).direction.includes('d')) u = true;
        if (getTile(G.objects.tiles[t].x, G.objects.tiles[t].y + 1, true).type == 'track') if (getTile(G.objects.tiles[t].x, G.objects.tiles[t].y + 1, true).direction.includes('u')) d = true;
        if (tile.direction.includes('r')) r = true;
        if (tile.direction.includes('l')) l = true;
        if (tile.direction.includes('u')) u = true;
        if (tile.direction.includes('d')) d = true;
        if (r) tile.paths += 'r';
        if (l) tile.paths += 'l';
        if (u) tile.paths += 'u';
        if (d) tile.paths += 'd';
        G.objects.tiles[t].texture = 'track-' + G.objects.tiles[t].paths;
    }
    G.settings.mapy = Math.floor((G.settings.mapx / mapdata.map.size[0]) * mapdata.map.size[1]);
    //RECURSIVE PATHFINDING NOOOOOOOOOOOOOOOOOOOOOOOOO
    let routes = 0;
    let path = [];
    let spawns = [];
    let checks = [];
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
    let p = 0;
    while (routes > 0) {
        //UP
        let tile;
        tile = getTile(checks[p][0], checks[p][1] - 1, true);
        if (tile.type == 'track') if (tile.direction.includes('d')) {
            if (!G.path.includes((checks[p][0]) + "," + (checks[p][1] - 1))) {
                //alert(!path.includes([checks[p][0], checks[p][1] - 1]) + JSON.stringify(path) + JSON.stringify([checks[p][0], checks[p][1] - 1]));
                G.path.push((checks[p][0]) + "," + (checks[p][1] - 1));
                if (!spawns.includes((checks[p][0]) + "," + (checks[p][1] - 1))) { routes++; checks.push([checks[p][0], checks[p][1] - 1]); }
            }
        }
        //LEFT
        tile = getTile(checks[p][0] - 1, checks[p][1], true);
        if (tile.type == 'track') if (tile.direction.includes('r')) {
            if (!G.path.includes((checks[p][0] - 1) + "," + (checks[p][1]))) {
                //alert(!path.includes([checks[p][0], checks[p][1] - 1]));
                G.path.push((checks[p][0] - 1) + "," + (checks[p][1]));
                if (!spawns.includes((checks[p][0] - 1) + "," + (checks[p][1]))) { routes++; checks.push([checks[p][0] - 1, checks[p][1]]); }
            }
        }
        //DOWN
        tile = getTile(checks[p][0], checks[p][1] + 1, true);
        if (tile.type == 'track') if (tile.direction.includes('u')) {
            if (!G.path.includes((checks[p][0]) + "," + (checks[p][1] + 1))) {
                //alert(!path.includes([checks[p][0], checks[p][1] - 1]));
                G.path.push((checks[p][0]) + "," + (checks[p][1] + 1));
                if (!spawns.includes((checks[p][0]) + "," + (checks[p][1] + 1))) { routes++; checks.push([checks[p][0], checks[p][1] + 1]); }
            }
        }
        //RIGHT
        tile = getTile(checks[p][0] + 1, checks[p][1], true);
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
    G.mouse.X = e.offsetX;
    G.mouse.Y = e.offsetY;
    for (const button in G.nav.buttons) {
        G.nav.buttons[button].hover = G.nav.buttons[button].collide(e.offsetX, e.offsetY);
    }
    if (G.pan.down) {
        G.offset.X -= G.pan.x - G.mouse.X;
        G.offset.Y -= G.pan.y - G.mouse.Y;
        G.pan.x = G.mouse.X;
        G.pan.y = G.mouse.Y;
    }
});

//FRAME STUFF
F = {};
F.last = performance.now();
F.fps = Array(10).fill(0);
F.getFPS = function () {
    return this.fps.reduce((a, b) => (a + b) / 2);
}
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
        if (G.audio.music.switch) {
            G.audio.music.transition -= 0.5 / F.time;
            if (G.audio.music.transition <= 0) G.audio.music.current.pause();
        } else {
            G.audio.music.transition = 1;
        }
        G.audio.music.current.volume = G.audio.volume.music * G.audio.music.transition;
    } catch (err) {
        debug('audio fail');
        G.audio.music.switch = false;
    }
    G.C.clearRect(0, 0, G.width, G.height);
    G.C.fillStyle = 'black';
    G.C.fillRect(0, 0, G.width, G.height);
    G.data.cursor.pos += 180 / F.time;
    if (G.data.cursor.pos >= 360) {
        G.data.cursor.pos -= 360;
    }
    if (G.scene == 'l') {
        LoadGame();
    }
    try {
        Draw();
        if (G.scene == 'g' && G.pause) {
            for (const b of G.objects.buildings) {
                b.refreshupgrades();
            }
        }
        else if (G.scene == 'g' && !G.pause) {
            for (let r = 0; r < G.multi; r++) {
                if (G.alternate && G.skip) G.skip = false
                else {
                    G.skip = true;
                    for (const b of G.objects.buildings) {
                        b.tick();
                        b.refreshupgrades();
                    }
                    for (let e = 0; e < G.objects.enemies.length; e++) {
                        if (G.objects.enemies[e].tick()) {
                            if (G.objects.enemies[e] === G.boss) {
                                G.boss = null;
                            }
                            G.objects.enemies.splice(e, 1);
                            e--;
                        }
                    }
                    for (let p = 0; p < G.objects.projectiles.length; p++) {
                        if (G.objects.projectiles[p].tick()) {
                            G.objects.projectiles.splice(p, 1);
                            p--;
                        }
                    }
                    if (G.wave != 0) G.time += 1 / F.time;
                    G.wavetimer -= 1 / F.time;
                    G.wavespawn -= 1 / F.time;
                }
                if (G.wave != 0 && G.wavespawn + (G.wavespace * G.wavespawned) - G.wavetotal <= 0 && G.wavespawn >= 0) {
                    spawn = G.data.difficulties.W[G.waveset].key[G.data.difficulties.W[G.waveset].W[G.wave - 1][5][G.wavespawned]];
                    if (spawn != null) {
                        G.data.enemies[spawn].generate(G.data.difficulties.W[G.waveset].W[G.wave - 1][0], G.data.difficulties.W[G.waveset].W[G.wave - 1][1], G.data.difficulties.W[G.waveset].W[G.wave - 1][2]);
                        if (G.data.enemies[spawn].boss) {
                            G.boss = G.objects.enemies[G.objects.enemies.length - 1];
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
new DEbugMsg('Buttons', () => JSON.stringify(G.nav.buttons, (k, v) => {
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
new DEbugMsg('Music Volume', () => G.audio.volume.music, '#faf');
new DEbugMsg('SFX Volume', () => G.audio.volume.sfx, '#faf');
new DEbugMsg('Switch', () => G.audio.music.switch, '#faf');
new DEbugMsg('Transition', () => G.audio.music.transition, '#faf');
new DEbugMsg('[DEBUG INFO]', null, 'cyan', 'r');
new DEbugMsg("Cursor", () => G.mouse.X + ", " + G.mouse.Y, '#7ff', 'r');
new DEbugMsg("Offset", () => G.offset.X.toFixed(0) + ", " + G.offset.Y.toFixed(0), '#7ff', 'r');
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
new DEbugMsg("Tiles", () => JSON.stringify(G.objects.tiles), '#7f7', 'l', 0, true);
new DEbugMsg("Length", () => G.objects.tiles.length, '#afa', 'l', 1);
new DEbugMsg("Locations", () => JSON.stringify(G.objects.locations), '#7f7', 'l', 0, true);
new DEbugMsg("Length", () => G.objects.locations.length, '#afa', 'l', 1);
new DEbugMsg("Enemies", () => JSON.stringify(G.objects.enemies, (key, value) => {
    if (typeof value == 'number') if (value.toString().length > 4) return value.toFixed(2);
    return value;
}), '#7f7', 'l', 0, true);
new DEbugMsg("Length", () => G.objects.enemies.length, '#afa', 'l', 1);
new DEbugMsg("Buildings", () => JSON.stringify(G.objects.buildings, (key, value) => {
    if (typeof value == 'number') if (value.toString().length > 4) return value.toFixed(2);
    return value;
}), '#7f7', 'l', 0, true);
new DEbugMsg("Length", () => G.objects.buildings.length, '#afa', 'l', 1);
new DEbugMsg("Path", () => JSON.stringify(G.path), '#7f7', 'l', 0, true);
new DEbugMsg("Length", () => G.path.length, '#afa', 'l', 1);
new DEbugMsg("[SELECTED TILE]", null, 'yellow');
new DEbugMsg("Tile", () => JSON.stringify(getTile(G.data.cursor.X, G.data.cursor.Y), (key, value) => {
    if (key == 'tower') return undefined;
    return value;
}), '#ff7', 'l', 0, true);
new DEbugMsg("Tower", () => JSON.stringify(getTile(G.data.cursor.X, G.data.cursor.Y).tower, (key, value) => {
    if (typeof value == 'number') if (value.toString().length > 4) return value.toFixed(2);
    return value;
}), '#ff7', 'l', 0, true);

function DrawConsole() {
    G.C.textAlign = 'left';
    if (!G.DEEEEEEEEBUG) return;
    //G.D = G.data.buildings;
    G.C.font = "8px 'Press Start 2P', sans-serif";
    let ly = 64 - 12;
    let ry = 96 - 12;
    let inc = 12;
    try {
        for (const c of G.DC) {
            try {
                G.C.fillStyle = c.color;
                x = 6;
                if (c.side == 'r') x = G.width - 6;
                hidden = false;
                if (G.offset.X > G.width / 2 - 16 && c.hscroll && c.side != 'r') hidden = true;
                if (c.hscroll && c.side != 'r') x += G.offset.X;
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
                    if (out.length > (G.width / 2 + 60 - G.offset.X) / 8 && c.hscroll) {
                        out = out.slice(0, (G.width / 2 + 60 - G.offset.X) / 8);
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
    //G.D = G.data.textures;
    //G.D = "";
}

//W-PAN
G.canvas.addEventListener('mousedown', e => {
    e.preventDefault();
    if (G.scene != 'g') return;
    if (e.button == '1') {
        G.pan.down = true;
        G.pan.x = G.mouse.X;
        G.pan.y = G.mouse.Y;
    }
});

G.canvas.addEventListener('mouseup', e => {
    e.preventDefault();
    if (G.scene != 'g') return;
    if (e.button == '1') {
        G.pan.down = false;
    }
});

//W-CLICK
G.canvas.addEventListener('click', e => {
    for (const button in G.nav.buttons) {
        if (G.nav.buttons[button].collide(e.offsetX, e.offsetY)) {
            try {
                G.nav.buttons[button].action(e);
            } catch (err) {
                debug(err.stack);
            }
            return;
        }
    }
    if (G.scene == 'g') {
        if (e.offsetY < 48) return;
        if (e.offsetY > G.height - 192 && G.toolBar.on) {
            tile = getTile(G.data.cursor.X, G.data.cursor.Y, true);
            if (tile.type != 'platform') return
            if (tile.tower == null) {
                //basic
                if (
                    Math.floor(G.width / 3 * 0) < e.offsetX &&
                    Math.floor(G.width / 3) > e.offsetX &&
                    G.height - offset + 68 < e.offsetY &&
                    G.height - offset + 108 > e.offsetY
                ) {
                    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).type == 'platform' && getTile(G.data.cursor.X, G.data.cursor.Y).tower == null && G.points >= G.data.buildings.basic.cost) {
                        G.data.buildings.basic.generate(G.data.cursor.X, G.data.cursor.Y);
                        G.points -= G.data.buildings.basic.cost;
                    }
                }
                //sniper
                if (
                    Math.floor(G.width / 3) < e.offsetX &&
                    Math.floor(G.width / 3 * 2) > e.offsetX &&
                    G.height - offset + 68 < e.offsetY &&
                    G.height - offset + 108 > e.offsetY
                ) {
                    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).type == 'platform' && getTile(G.data.cursor.X, G.data.cursor.Y).tower == null && G.points >= G.data.buildings.sniper.cost) {
                        G.data.buildings.sniper.generate(G.data.cursor.X, G.data.cursor.Y);
                        G.points -= G.data.buildings.sniper.cost;
                    }
                }
                //beam
                if (
                    Math.floor(G.width / 3 * 2) < e.offsetX &&
                    Math.floor(G.width / 3 * 3) > e.offsetX &&
                    G.height - offset + 68 < e.offsetY &&
                    G.height - offset + 108 > e.offsetY
                ) {
                    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).type == 'platform' && getTile(G.data.cursor.X, G.data.cursor.Y).tower == null && G.points >= G.data.buildings.beam.cost) {
                        G.data.buildings.beam.generate(G.data.cursor.X, G.data.cursor.Y);
                        G.points -= G.data.buildings.beam.cost;
                    }
                }
                //multi
                if (
                    Math.floor(G.width / 3 * 0) < e.offsetX &&
                    Math.floor(G.width / 3) > e.offsetX &&
                    G.height - offset + 108 < e.offsetY &&
                    G.height - offset + 148 > e.offsetY
                ) {
                    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).type == 'platform' && getTile(G.data.cursor.X, G.data.cursor.Y).tower == null && G.points >= G.data.buildings.multi.cost) {
                        G.data.buildings.multi.generate(G.data.cursor.X, G.data.cursor.Y);
                        G.points -= G.data.buildings.multi.cost;
                    }
                }
                //aura
                if (
                    Math.floor(G.width / 3) < e.offsetX &&
                    Math.floor(G.width / 3 * 2) > e.offsetX &&
                    G.height - offset + 108 < e.offsetY &&
                    G.height - offset + 148 > e.offsetY
                ) {
                    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).type == 'platform' && getTile(G.data.cursor.X, G.data.cursor.Y).tower == null && G.points >= G.data.buildings.aura.cost) {
                        G.data.buildings.aura.generate(G.data.cursor.X, G.data.cursor.Y);
                        G.points -= G.data.buildings.aura.cost;
                    }
                }
                //super
                if (
                    Math.floor(G.width / 3 * 2) < e.offsetX &&
                    Math.floor(G.width / 3 * 3) > e.offsetX &&
                    G.height - offset + 108 < e.offsetY &&
                    G.height - offset + 148 > e.offsetY
                ) {
                    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).type == 'platform' && getTile(G.data.cursor.X, G.data.cursor.Y).tower == null && G.points >= G.data.buildings.super.cost) {
                        G.data.buildings.super.generate(G.data.cursor.X, G.data.cursor.Y);
                        G.points -= G.data.buildings.super.cost;
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
                    BuyUpgrade(getTile(G.data.cursor.X, G.data.cursor.Y, true), 0);
                    return;
                }
                if (
                    pos2 < e.offsetX &&
                    pos2 + Math.floor(upgradeWidth / 3) > e.offsetX &&
                    upgradeTop < e.offsetY
                ) {
                    BuyUpgrade(getTile(G.data.cursor.X, G.data.cursor.Y, true), 1);
                    return;
                }
                if (
                    pos3 < e.offsetX &&
                    pos3 + Math.floor(upgradeWidth / 3) > e.offsetX &&
                    upgradeTop < e.offsetY
                ) {
                    BuyUpgrade(getTile(G.data.cursor.X, G.data.cursor.Y, true), 2);
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
                    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).tower !== null) getTile(G.data.cursor.X, G.data.cursor.Y).tower.targetchange(-1);
                }
                if (
                    rightarrow - hitwidth / 2 < e.offsetX &&
                    rightarrow + hitwidth / 2 > e.offsetX &&
                    G.height - offset < e.offsetY &&
                    G.height - offset + 36
                ) {
                    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).tower !== null) getTile(G.data.cursor.X, G.data.cursor.Y).tower.targetchange(1);
                }
            };
            //Destroy tower
            offset = (96 * Math.sin((Math.PI / F.time) * (G.toolBar.anim - 25)) + 96);
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
                for (let i = 0; i < G.objects.buildings.length; i++) {
                    if (G.objects.buildings[i].x == G.data.cursor.X && G.objects.buildings[i].y == G.data.cursor.Y && getTile(G.objects.buildings[i].x, G.objects.buildings[i].y, true).tower != null) {
                        G.points += getTile(G.objects.buildings[i].x, G.objects.buildings[i].y).tower.refund;
                        getTile(G.objects.buildings[i].x, G.objects.buildings[i].y).tower = null;
                        G.objects.buildings.splice(i, 1);
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
        //if (G.data.loaded) G.nodes.push([Math.round(e.offsetX/G.data.atlas.config.scale[0])*G.data.atlas.config.scale[0], Math.round(e.offsetY/G.data.atlas.config.scale[1])*G.data.atlas.config.scale[1]]);
        G.data.cursor.X = Math.round((e.offsetX - G.offset.X - G.data.tileSize[0] / 2) / G.data.tileSize[0]);
        G.data.cursor.Y = Math.round((e.offsetY - G.offset.Y - G.data.tileSize[1] / 2) / G.data.tileSize[1]);
        G.data.cursor.on = true;
    }
    else if (G.scene == 'ee') {
        G.data.cursor.X = Math.round((e.offsetX - G.offset.X - G.data.tileSize[0] / 2) / G.data.tileSize[0]);
        G.data.cursor.Y = Math.round((e.offsetY - G.offset.Y - G.data.tileSize[1] / 2) / G.data.tileSize[1]);
        G.data.cursor.on = true;
    }
});

class KeyBinding {
    constructor(name, id, key, action, scene) {
        this.name = name;
        this.id = id;
        this.key = key;
        this.action = action;
        this.scene = scene;
        G.bindings[this.id] = this;
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
        G.scenes[this.scene] = this;
    }
}

function Draw() {
    G.scenes[G.scene].draw();
    G.C.font = "8px 'Press Start 2P'";
    G.C.fillStyle = 'white';
    G.C.textAlign = 'left';
    G.C.text("FPS: " + Math.round(F.getFPS()), 4, G.height - 4);
}

function NewGame(map) {
    /** @type {Track} */
    let mapdata = G.data.maps[map];
    G.offset.X = Math.floor((G.width - mapdata.map.size[0] * G.data.tileSize[0]) / 2);
    G.offset.Y = 48 + Math.floor((G.height - 48 - mapdata.map.size[1] * G.data.tileSize[1]) / 2);
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
    G.data.cursor.on = false;
    G.hp = Math.round(G.basehp * G.settings.lives);
    G.maxhp = Math.round(G.basehp * G.settings.lives);
    G.points = G.basepoints;
    loadMap(G.data.maps[map]);
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
if (B != null) for (const binding in B) if (G.bindings[binding]) G.bindings[binding].key = B[binding];

loadsound = JSON.parse(window.localStorage.getItem('sound'));
if (loadsound != null) {
    G.audio.volume.music = loadsound[0];
    G.audio.volume.sfx = loadsound[1];
}


//W-KEY
document.addEventListener('keydown', e => {
    try {
        if (G.rebind.current != undefined) {
            if (e.code == G.bindings[G.rebind.current].key) {
                G.rebind.current = undefined;
                return;
            }
            G.bindings[G.rebind.current].key = e.code;
            G.rebind.current = undefined;
            if (B == null) B = {};
            for (const binding in G.bindings) {
                B[binding] = G.bindings[binding.key];
            }
            window.localStorage.setItem('keys', JSON.stringify(B));
        }
        else for (const binding in G.bindings) {
            if (Array.isArray(G.bindings[binding].scene)) {
                if (e.code == G.bindings[binding].key && G.bindings[binding].scene.includes(G.scene)) G.bindings[binding].action(e);
            } else {
                if (e.code == G.bindings[binding].key && G.bindings[binding].scene == G.scene) G.bindings[binding].action(e);
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
        G.C.fillStyle = '#4447';
        G.C.fillRect(posx, posy, width, height);
        for (let x = 0; x < data.map.size[0]; x++) for (let y = 0; y < data.map.size[1]; y++) {
            if ((x + y) % 2 != 0) {
                continue;
            }
            else {
                G.C.fillStyle = '#4444';
            }
            G.C.fillRect(Math.round(posx + x * tilewidth), Math.round(posy + y * tileheight), Math.round(tilewidth), Math.round(tileheight));
        }
        G.C.lineWidth = Math.round(width / data.map.size[0] / 8) * 2;
        G.C.strokeStyle = '#777';
        for (let p = 0; p < data.map.lines.length; p++) {
            G.C.beginPath();
            G.C.moveTo(Math.floor((data.map.lines[p][0][0] - data.map.start[0] + 0.5) * (width / data.map.size[0])) + posx,
                Math.floor((data.map.lines[p][0][1] - data.map.start[1] + 0.5) * (height / data.map.size[1])) + posy);
            for (let v = 1; v < data.map.lines[p].length; v++) {
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
                    Math.floor((l.pos[1] - data.map.start[1] + 0.5) * (height / data.map.size[1])) + posy, Math.floor(G.settings.mapx / data.map.size[0] / 3),
                    0, 2 * Math.PI);
                G.C.fill();
            }
            if (l.type == "base") {
                G.C.fillStyle = '#0073d7';
                G.C.beginPath();
                G.C.arc(Math.floor((l.pos[0] - data.map.start[0] + 0.5) * (width / data.map.size[0])) + posx,
                    Math.floor((l.pos[1] - data.map.start[1] + 0.5) * (height / data.map.size[1])) + posy, Math.floor(G.settings.mapx / data.map.size[0] / 3),
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
                Math.floor((Math.round((e.y + 0.5) * 4) / 4 - 0.5 - data.map.start[1]) * (height / data.map.size[1])) + posy, G.settings.mapx / data.map.size[0] / 6,
                0, 2 * Math.PI);
            G.C.stroke();
            G.C.beginPath();
            G.C.arc(Math.floor((Math.round((e.x + 0.5) * 4) / 4 - 0.5 - data.map.start[0]) * (width / data.map.size[0])) + posx,
                Math.floor((Math.round((e.y + 0.5) * 4) / 4 - 0.5 - data.map.start[1]) * (height / data.map.size[1])) + posy, G.settings.mapx / data.map.size[0] / 6,
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
    G.data.textures = new Image();
    G.data.textures.src = "tiles.png";
    G.data.textures.style.display = 'none';
    G.data.textures.onload = () => {
        EndLoad();
    }
    document.body.appendChild(G.data.textures);
    } catch (e) {
        G.D = e.stack;
    }
}

function EndLoad() {
    G.scene = 'm';
    G.data.loaded = true;
}
*/

function NextWave() {
    wave = G.data.difficulties.W[G.waveset].W[G.wave]
    G.wave++;
    if (G.wavetimer > 0) {
        G.points += Math.floor(G.wavetimer * Math.sqrt(G.wave));
    }
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
    G.offset.X -= G.mouse.X * (Math.max(0.5, Math.min(2, G.data.scale - e.deltaY * 0.0005)) - G.data.scale);
    G.offset.Y -= G.mouse.Y * (Math.max(0.5, Math.min(2, G.data.scale - e.deltaY * 0.0005)) - G.data.scale);
    G.data.scale = Math.max(0.5, Math.min(2, G.data.scale - e.deltaY * 0.0005));
    G.data.atlas.config.scale[0] = G.data.scale * G.data.atlas.config.defaultscale[0];
    G.data.atlas.config.scale[1] = G.data.scale * G.data.atlas.config.defaultscale[1];
    G.P = new OffscreenCanvas(G.data.atlas.config.scale[0], G.data.atlas.config.scale[1]); //PRELOAD
    G.PC = G.P.getContext('2d');
});*/

//} catch (err) {
//    alert(err.stack);
//}