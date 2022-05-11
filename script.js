const G  = {}; //GAME
G.canvas = document.getElementById('main');
G.C = G.canvas.getContext('2d'); //CANVAS
G.canvas.width = window.innerWidth;
G.canvas.height = window.innerHeight;
G.width = G.canvas.width; //GAME WIDTH
G.height = G.canvas.height; //GAME HEIGHT
G.M = {}; //MOUSE
G.M.X = 0; //MOUSE X
G.M.Y = 0; //MOUSE Y
G.scene = 'l'; //SCENE
G.A = {}; //ASSETS
G.A.S = 1; //SCALE
G.A.loaded = false; //GAME LOADED
G.D = ""; //CONSOLE
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
G.T = {};
G.T.P = [];
G.T.T = [];
G.T.L = [];
G.T.B = [];
G.T.E = [];

class Tile {
    constructor (type, x, y, texture, direction) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.direction = direction;
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
     */
    constructor (type, x, y, texture, turret, rotspeed, firerate, damage, range, color, offset) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.turret = turret;
        this.rotspeed = rotspeed;
        this.firerate = firerate;
        this.reload = 50/firerate;
        this.damage = damage;
        this.level = 1;
        this.direction = 0;
        this.range = range;
        this.color = color;
        this.offset = offset;
        getTile(this.x, this.y).tower = this;
        G.T.B.push(getTile(this.x, this.y).tower);
    }
    tick () {
        //find enemy
        for (const enemy of G.T.E) {
            var difx = enemy.x - this.x * G.A.A.config.scale[0] + G.A.A.config.scale[0] / 2;
            var dify = enemy.y - this.y * G.A.A.config.scale[1] + G.A.A.config.scale[1] / 2;
            if (!(difx ** 2 + dify ** 2 <= (this.range * G.A.A.config.scale[0]) ** 2)) continue;
            var direction = Math.atan2(-dify, difx);
            break;
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
    constructor (type, id, size, texture, hp, damage, speed) {
        this.type = type;
        this.id = id;
        this.size = size;
        this.texture = texture;
        this.hp = hp;
        this.damage = damage;
        this.speed = speed;
    }
    generate (hpmult, speedmult) {
        var tile = Math.floor(Math.random() * G.A.L.S.length);
        G.T.E.push(new Enemy(
            (G.A.L.S[tile][0] * G.A.A.config.scale[0] + this.size[0] / 2) + Math.floor(Math.random() * (G.A.A.config.scale[0] - this.size[0])),
            (G.A.L.S[tile][1] * G.A.A.config.scale[1] + this.size[1] / 2) + Math.floor(Math.random() * (G.A.A.config.scale[1] - this.size[1])),
            // G.A.L.S[tile][0] * G.A.A.config.scale[0],
            // G.A.L.S[tile][1] * G.A.A.config.scale[1],
            G.A.L.S[tile], this.type, this.size, this.texture, this.hp * hpmult, this.damage, this.speed * speedmult));
    }
}

class Enemy {
    constructor (x, y, tile, type, size, texture, hp, damage, speed) {
        this.x = JSON.parse(JSON.stringify(x));
        this.y = JSON.parse(JSON.stringify(y));
        this.tile = JSON.parse(JSON.stringify(tile));
        this.size = size;
        this.type = type;
        this.texture = texture;
        this.hp = JSON.parse(JSON.stringify(hp));
        this.damage = JSON.parse(JSON.stringify(damage));
        this.speed = JSON.parse(JSON.stringify(speed));
        this.direction = [0, 0];
        this.movement = 0;
    }
    tick () {
        if (this.movement <= 0) {
            switch (getTile(this.tile[0], this.tile[1], true).direction) {
                case 'l':
                    this.direction = [-1, 0];
                    this.movement = G.A.A.config.scale[0];
                    this.tile[0] -= 1;
                    break;
                case 'r':
                    this.direction = [1, 0];
                    this.movement = G.A.A.config.scale[0];
                    this.tile[0] += 1;
                    break;
                case 'u':
                    this.direction = [0, -1];
                    this.movement = G.A.A.config.scale[1];
                    this.tile[1] -= 1;
                    break;
                case 'd':
                    this.direction = [0, 1];
                    this.movement = G.A.A.config.scale[1];
                    this.tile[1] += 1;
                    break;
                case 'b':
                    return true;
                    break;
            }
        } else {
            this.x += this.direction[0] * this.speed * G.A.A.config.scale[0] / 50;
            this.y += this.direction[1] * this.speed * G.A.A.config.scale[1] / 50;
            this.movement -= Math.abs(((this.direction[0] * this.speed * G.A.A.config.scale[0]) + (this.direction[1] * this.speed * G.A.A.config.scale[1])) / 50);
        }
    }
}

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
    for (var y = 0; y < mapdata.track.length; y++) {
        for (var x = 0; x < mapdata.track[y].length; x++) {
            switch (mapdata.track[y][x]) {
                case 0:
                    break;
                case 1:
                    new Tile('platform', x, y, 'tower');
                    break;
                case 'l':
                    new Tile('track', x, y, 'track-', 'l');
                    break;
                case 'r':
                    new Tile('track', x, y, 'track-', 'r');
                    break;
                case 'u':
                    new Tile('track', x, y, 'track-', 'u');
                    break;
                case 'd':
                    new Tile('track', x, y, 'track-', 'd');
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
    for (const tile of G.T.T) {
        if (tile.type != 'track' || tile.paths != '') continue;
        if (getTile(tile.x + 1, tile.y, true).type == 'track') tile.paths += 'r';
        if (getTile(tile.x - 1, tile.y, true).type == 'track') tile.paths += 'l';
        if (getTile(tile.x, tile.y - 1, true).type == 'track') tile.paths += 'u';
        if (getTile(tile.x, tile.y + 1, true).type == 'track') tile.paths += 'd';
        tile.texture = 'track-' + tile.paths;
    }
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
});

G.canvas.addEventListener('click', e => {
    //if (G.A.loaded) G.nodes.push([Math.round(e.offsetX/G.A.A.config.scale[0])*G.A.A.config.scale[0], Math.round(e.offsetY/G.A.A.config.scale[1])*G.A.A.config.scale[1]]);
    G.A.C.X = Math.round((e.offsetX - G.O.X - G.A.A.config.scale[0]/2)/G.A.A.config.scale[0]);
    G.A.C.Y = Math.round((e.offsetY - G.O.Y - G.A.A.config.scale[1]/2)/G.A.A.config.scale[1]);
    G.A.C.on = true;
});

document.addEventListener('keydown', e => {
    try {
    switch (e.code) {
        case 'Escape':
            G.A.C.on = false;
            break;
        case 'KeyR':
            G.O.X -= G.width / 2 * (1 - G.A.S);
            G.O.Y -= G.height / 2 * (1 - G.A.S);
            G.A.S = 1;
            G.A.A.config.scale[0] = G.A.S * G.A.A.config.defaultscale[0];
            G.A.A.config.scale[1] = G.A.S * G.A.A.config.defaultscale[1];
            G.P = new OffscreenCanvas(G.A.A.config.scale[0], G.A.A.config.scale[1]); //PRELOAD
            G.PC = G.P.getContext('2d');
            break;
        case 'KeyH':
            G.O.X = 0;
            G.O.Y = 0;
            break;
        case 'ArrowRight':
            if (e.ctrlKey) G.O.X -= G.A.A.config.scale[0] * 0.1;
            else if (e.shiftKey) G.O.X -= G.A.A.config.scale[0] * 5;
            else G.O.X -= G.A.A.config.scale[0];
            break;
        case 'ArrowUp':
            if (e.ctrlKey) G.O.Y += G.A.A.config.scale[1] * 0.1;
            else if (e.shiftKey) G.O.Y += G.A.A.config.scale[1] * 5;
            else G.O.Y += G.A.A.config.scale[1];
            break;
        case 'ArrowLeft':
            if (e.ctrlKey) G.O.X += G.A.A.config.scale[0] * 0.1;
            else if (e.shiftKey) G.O.X += G.A.A.config.scale[0] * 5;
            else G.O.X += G.A.A.config.scale[0];
            break;
        case 'ArrowDown':
            if (e.ctrlKey) G.O.Y -= G.A.A.config.scale[1] * 0.1;
            else if (e.shiftKey) G.O.Y -= G.A.A.config.scale[1] * 5;
            else G.O.Y -= G.A.A.config.scale[1];
            break;
        case 'KeyB':
            if (getTile(G.A.C.X, G.A.C.Y).type == 'platform' && getTile(G.A.C.X, G.A.C.Y).tower == null) {
                new Tower('basic', G.A.C.X, G.A.C.Y, 'basic', 'basic-turret', 90, 1, 2, 2.5, '#007eeb');
            } 
            break;
        case 'KeyN':
            if (getTile(G.A.C.X, G.A.C.Y).type == 'platform' && getTile(G.A.C.X, G.A.C.Y).tower == null) {
                new Tower('sniper', G.A.C.X, G.A.C.Y, 'sniper', 'sniper-turret', 45, 0.25, 8, 4, '#00cb3e');
            } 
            break;
        case 'KeyM':
            if (getTile(G.A.C.X, G.A.C.Y).type == 'platform' && getTile(G.A.C.X, G.A.C.Y).tower == null) {
                new Tower('beam', G.A.C.X, G.A.C.Y, 'beam', 'beam-turret', 1800, 10, 0.2, 1.25, '#b700dc');
            } 
            break;
        case 'KeyE':
            G.A.E.basic.generate(1, 1);
            break;
    }
    } catch (err) {
        G.D = err.stackz;
    } 
});

function Main () {
    try {
        for (const b of G.T.B) {
            b.tick();
        }
        for (var e = 0; e < G.T.E.length; e++) {
            if (G.T.E[e].tick()) {
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
        Draw();
    } catch (e) {
        G.D = e.stack;
    }
    DrawConsole();
}

function DrawConsole() {
    G.C.fillStyle = 'red';
    G.C.font = '14px sans-serif';
    G.C.fillText(G.D, 10 + G.O.X, 24 + G.O.Y);
    //G.D = "";
}

function Draw () {
    G.C.clearRect(0, 0, G.width, G.height);
    G.C.fillStyle = 'black';
    G.C.fillRect(0, 0, G.width, G.height);
    switch (G.scene) {
        case 'l':
            DrawL();
            break;
        case 'm':
            DrawM();
    }
}

function DrawL () {
    G.C.fillStyle = 'white';
    G.C.font = '24px sans-serif';
    G.C.fillText('Loading...', 100, 100);
}

function DrawM () {
    DrawTrack();
    DrawEnemy();
    DrawTower();
    if (G.A.C.on) {
        texture = 'selected-invalid';
        try { if (getTile(G.A.C.X, G.A.C.Y).type == 'platform') texture = 'selected' } catch {};
        G.PC.clearRect(0, 0, G.A.A.config.scale[0], G.A.A.config.scale[1]);
        G.PC.drawImage(
            G.A.T,
            G.A.A.atlas[texture][0],
            G.A.A.atlas[texture][1],
            G.A.A.config.size[0],
            G.A.A.config.size[1],
            0,0,
            G.A.A.config.scale[0],
            G.A.A.config.scale[1]
        )
        G.C.save();
        G.C.translate(G.A.A.config.scale[0] * (G.A.C.X + 0.5) + G.O.X, G.A.A.config.scale[1] * (G.A.C.Y + 0.5) + G.O.Y);
        G.C.rotate(G.A.C.pos * Math.PI / 180);
        G.C.drawImage(
            G.P,
            -G.A.A.config.scale[0]/2,
            -G.A.A.config.scale[1]/2
        );
        G.C.restore();
    }
}

function DrawTrack() {
    for (const tile of G.T.T) {
        G.C.drawImage(G.A.T, 
            G.A.A.atlas[tile.texture][0], 
            G.A.A.atlas[tile.texture][1], 
            G.A.A.config.size[0], 
            G.A.A.config.size[1],
            tile.x * G.A.A.config.scale[0] + G.O.X,
            tile.y * G.A.A.config.scale[1] + G.O.Y,
            G.A.A.config.scale[0],
            G.A.A.config.scale[1]);
    }
    for (const location of G.T.L) {
        G.C.drawImage(G.A.T, 
            G.A.A.atlas[location.texture][0], 
            G.A.A.atlas[location.texture][1], 
            G.A.A.config.size[0], 
            G.A.A.config.size[1],
            location.x * G.A.A.config.scale[0] + G.O.X,
            location.y * G.A.A.config.scale[1] + G.O.Y,
            G.A.A.config.scale[0],
            G.A.A.config.scale[1]);
    }
}

function DrawTower() {
    //RENDERING ORDER: TOWERS
    for (const defense of G.T.B) {
        G.C.drawImage(G.A.T, 
            G.A.A.atlas[defense.texture][0], 
            G.A.A.atlas[defense.texture][1], 
            G.A.A.config.size[0], 
            G.A.A.config.size[1],
            defense.x * G.A.A.config.scale[0] + G.O.X,
            defense.y * G.A.A.config.scale[1] + G.O.Y,
            G.A.A.config.scale[0],
            G.A.A.config.scale[1]);
        G.PC.clearRect(0, 0, G.A.A.config.scale[0], G.A.A.config.scale[1]);
        G.PC.drawImage(
            G.A.T,
            G.A.A.atlas[defense.turret][0],
            G.A.A.atlas[defense.turret][1],
            G.A.A.config.size[0],
            G.A.A.config.size[1],
            0,0,
            G.A.A.config.scale[0],
            G.A.A.config.scale[1]
        )
        G.C.save();
        G.C.translate(G.A.A.config.scale[0] * (defense.x + 0.5) + G.O.X, G.A.A.config.scale[1] * (defense.y + 0.5) + G.O.Y);
        G.C.rotate(defense.direction * Math.PI / 180);
        G.C.drawImage(
            G.P,
            - G.A.A.config.scale[0]/2,
            - G.A.A.config.scale[1]/2
        );
        G.C.restore();
    }
    //RENDERING ORDER: TOWER RANGE
    for (const defense of G.T.B) {
        if (defense.x != G.A.C.X || defense.y != G.A.C.Y || !G.A.C.on) continue;
        G.C.strokeStyle = defense.color;
        G.C.lineWidth = 2;
        gradient = G.C.createRadialGradient(G.A.A.config.scale[0] * (defense.x + 0.5) + G.O.X, G.A.A.config.scale[1] * (defense.y + 0.5) + G.O.Y, 0,
        G.A.A.config.scale[0] * (defense.x + 0.5) + G.O.X, G.A.A.config.scale[1] * (defense.y + 0.5) + G.O.Y, 
        defense.range * G.A.A.config.scale[0]);
        gradient.addColorStop(0, defense.color + '00');
        gradient.addColorStop(0.7, defense.color + '22');
        gradient.addColorStop(1, defense.color + 'cc');
        G.C.fillStyle = gradient;
        G.C.beginPath();
        G.C.arc(G.A.A.config.scale[0] * (defense.x + 0.5) + G.O.X, G.A.A.config.scale[1] * (defense.y + 0.5) + G.O.Y, 
        defense.range * G.A.A.config.scale[0], 0, 2 * Math.PI);
        G.C.stroke();
        G.C.fill();
    }
}

function DrawEnemy() {
    for (const enemy of G.T.E) {
        G.C.drawImage(G.A.T, 
            G.A.A.atlas[enemy.texture][0], 
            G.A.A.atlas[enemy.texture][1], 
            G.A.A.config.size[0], 
            G.A.A.config.size[1],
            enemy.x * G.A.S - G.A.A.config.size[0] / 2 + G.O.X,
            enemy.y * G.A.S - G.A.A.config.size[1] / 2 + G.O.Y,
            G.A.A.config.scale[0],
            G.A.A.config.scale[1]);
    }
}

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

StartLoad();

G.loop = setInterval(Main, 20);

G.canvas.addEventListener('wheel', (e) => {
    G.O.X -= G.M.X * (Math.max(0.5, Math.min(2, G.A.S - e.deltaY * 0.0005)) - G.A.S);
    G.O.Y -= G.M.Y * (Math.max(0.5, Math.min(2, G.A.S - e.deltaY * 0.0005)) - G.A.S);
    G.A.S = Math.max(0.5, Math.min(2, G.A.S - e.deltaY * 0.0005));
    G.A.A.config.scale[0] = G.A.S * G.A.A.config.defaultscale[0];
    G.A.A.config.scale[1] = G.A.S * G.A.A.config.defaultscale[1];
    G.P = new OffscreenCanvas(G.A.A.config.scale[0], G.A.A.config.scale[1]); //PRELOAD
    G.PC = G.P.getContext('2d');
});