//W-BINDINGS
new KeyBinding('Deselect', 'deselect', 'Escape', () => { G.data.cursor.on = false; }, ['g', 'ee']);
new KeyBinding('Recenter', 'recenter', 'KeyR', () => { G.offset.X = Math.floor((G.width - G.data.maps[G.map].map.size[0] * G.data.tileSize[0]) / 2); G.offset.Y = 48 + Math.floor((G.height - 48 - G.data.maps[G.map].map.size[1] * G.data.tileSize[1]) / 2); }, 'g');
new KeyBinding('Recenter Editor', 'erecenter', 'KeyR', () => { G.offset.X = Math.floor((G.width - G.data.maps[G.map].map.size[0] * G.data.tileSize[0]) / 2); G.offset.Y = 12 + Math.floor((G.height - 12 - G.data.maps[G.map].map.size[1] * G.data.tileSize[1]) / 2); }, 'ee');
new KeyBinding('Move Right', 'right', 'ArrowRight', e => {
    if (e.ctrlKey && e.shiftKey) G.offset.X -= G.data.tileSize[0] * 16;
    else if (e.ctrlKey) G.offset.X -= G.data.tileSize[0] / 4;
    else if (e.shiftKey) G.offset.X -= G.data.tileSize[0] * 4;
    else G.offset.X -= G.data.tileSize[0];
}, ['g', 'ee']);
new KeyBinding('Move Left', 'left', 'ArrowLeft', e => {
    if (e.ctrlKey && e.shiftKey) G.offset.X += G.data.tileSize[0] * 16;
    else if (e.ctrlKey) G.offset.X += G.data.tileSize[0] / 4;
    else if (e.shiftKey) G.offset.X += G.data.tileSize[0] * 4;
    else G.offset.X += G.data.tileSize[0];
}, ['g', 'ee']);
new KeyBinding('Move Up', 'up', 'ArrowUp', e => {
    if (e.ctrlKey && e.shiftKey) G.offset.Y += G.data.tileSize[1] * 16;
    else if (e.ctrlKey) G.offset.Y += G.data.tileSize[0] / 4;
    else if (e.shiftKey) G.offset.Y += G.data.tileSize[0] * 4;
    else G.offset.Y += G.data.tileSize[0];
}, ['g', 'ee']);
new KeyBinding('Move Down', 'down', 'ArrowDown', e => {
    if (e.ctrlKey && e.shiftKey) G.offset.Y -= G.data.tileSize[1] * 16;
    else if (e.ctrlKey) G.offset.Y -= G.data.tileSize[0] / 4;
    else if (e.shiftKey) G.offset.Y -= G.data.tileSize[0] * 4;
    else G.offset.Y -= G.data.tileSize[0];
}, ['g', 'ee']);
new KeyBinding('Build Basic', 'basic', 'KeyG', e => {
    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).type == 'platform' && getTile(G.data.cursor.X, G.data.cursor.Y).tower == null && G.points >= G.data.buildings.basic.cost && G.data.cursor.on) {
        G.data.buildings.basic.generate(G.data.cursor.X, G.data.cursor.Y);
        G.points -= G.data.buildings.basic.cost;
    }
}, 'g');
new KeyBinding('Build Sniper', 'sniper', 'KeyH', e => {
    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).type == 'platform' && getTile(G.data.cursor.X, G.data.cursor.Y).tower == null && G.points >= G.data.buildings.sniper.cost && G.data.cursor.on) {
        G.data.buildings.sniper.generate(G.data.cursor.X, G.data.cursor.Y);
        G.points -= G.data.buildings.sniper.cost;
    }
}, 'g');
new KeyBinding('Build Beam', 'beam', 'KeyJ', e => {
    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).type == 'platform' && getTile(G.data.cursor.X, G.data.cursor.Y).tower == null && G.points >= G.data.buildings.beam.cost && G.data.cursor.on) {
        G.data.buildings.beam.generate(G.data.cursor.X, G.data.cursor.Y);
        G.points -= G.data.buildings.beam.cost;
    }
}, 'g');
new KeyBinding('Build Multishot', 'multi', 'KeyB', e => {
    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).type == 'platform' && getTile(G.data.cursor.X, G.data.cursor.Y).tower == null && G.points >= G.data.buildings.multi.cost && G.data.cursor.on) {
        G.data.buildings.multi.generate(G.data.cursor.X, G.data.cursor.Y);
        G.points -= G.data.buildings.multi.cost;
    }
}, 'g');
new KeyBinding('Build Aura', 'aura', 'KeyN', e => {
    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).type == 'platform' && getTile(G.data.cursor.X, G.data.cursor.Y).tower == null && G.points >= G.data.buildings.aura.cost && G.data.cursor.on) {
        G.data.buildings.aura.generate(G.data.cursor.X, G.data.cursor.Y);
        G.points -= G.data.buildings.aura.cost;
    }
}, 'g');
new KeyBinding('Build Ultimate', 'super', 'KeyM', e => {
    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).type == 'platform' && getTile(G.data.cursor.X, G.data.cursor.Y).tower == null && G.points >= G.data.buildings.super.cost && G.data.cursor.on) {
        G.data.buildings.super.generate(G.data.cursor.X, G.data.cursor.Y);
        G.points -= G.data.buildings.super.cost;
    }
}, 'g');
new KeyBinding('Destroy', 'destroy', 'KeyX', e => {
    for (let i = 0; i < G.objects.buildings.length; i++) {
        if (G.objects.buildings[i].x == G.data.cursor.X && G.objects.buildings[i].y == G.data.cursor.Y && getTile(G.objects.buildings[i].x, G.objects.buildings[i].y, true).tower != null) {
            G.points += getTile(G.objects.buildings[i].x, G.objects.buildings[i].y).tower.refund;
            getTile(G.objects.buildings[i].x, G.objects.buildings[i].y).tower = null;
            G.objects.buildings.splice(i, 1);
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
new KeyBinding('Send Wave', 'wave', 'KeyW', e => { if (G.wavespawn < 0) NextWave(); }, 'g');
new KeyBinding('Buy Upgrade 1', 'upgrade1', 'Digit1', e => { BuyUpgrade(getTile(G.data.cursor.X, G.data.cursor.Y, true), 0); }, 'g');
new KeyBinding('Buy Upgrade 2', 'upgrade2', 'Digit2', e => { BuyUpgrade(getTile(G.data.cursor.X, G.data.cursor.Y, true), 1); }, 'g');
new KeyBinding('Buy Upgrade 3', 'upgrade3', 'Digit3', e => { BuyUpgrade(getTile(G.data.cursor.X, G.data.cursor.Y, true), 2); }, 'g');
new KeyBinding('Force Wave', 'force', 'KeyF', e => { NextWave(); }, 'g');
new KeyBinding('Start', 'start', 'Enter', e => { G.scene = 'g' }, 'm');
new KeyBinding('Quit', 'quit', 'KeyQ', e => { G.scene = 'm'; G.speed = 0; G.pause = true; G.audio.music.switch = true; }, 'g');
new KeyBinding('Next Targeting', 'nexttargeting', 'KeyY', e => { if (getTile(G.data.cursor.X, G.data.cursor.Y, true).tower !== null) getTile(G.data.cursor.X, G.data.cursor.Y).tower.targetchange(1) }, 'g');
new KeyBinding('Previous Targeting', 'prevtargeting', 'KeyT', e => { if (getTile(G.data.cursor.X, G.data.cursor.Y, true).tower !== null) getTile(G.data.cursor.X, G.data.cursor.Y).tower.targetchange(-1) }, 'g');
new KeyBinding('Back', 'back', 'Escape', e => { if (G.scene.length > 1) G.scene = G.scene.slice(0, -1); else G.scene = 'm' }, ['e', 's', 'sb', 't', 'sg', 'ss']);
new KeyBinding('Debug On', 'don', 'KeyP', e => { G.DEEEEEEEEBUG = true }, ['g', 'm', 's', 'e', 'ee']);
new KeyBinding('Debug Off', 'doff', 'KeyO', e => { G.DEEEEEEEEBUG = false }, ['g', 'm', 's', 'e', 'ee']);
new KeyBinding('Toggle Spawn', 'espawn', 'KeyX', e => { ChangeTile('s'); }, 'ee');
new KeyBinding('Toggle Left', 'eleft', 'KeyA', e => { ChangeTile('l'); }, 'ee');
new KeyBinding('Toggle Right', 'eright', 'KeyD', e => { ChangeTile('r'); }, 'ee');
new KeyBinding('Toggle Up', 'eup', 'KeyW', e => { ChangeTile('u'); }, 'ee');
new KeyBinding('Toggle Down', 'edown', 'KeyS', e => { ChangeTile('d'); }, 'ee');
new KeyBinding('Toggle Base', 'ebase', 'KeyB', e => { ChangeTile('b'); }, 'ee');
new KeyBinding('Toggle Platform', 'eplat', 'KeyC', e => { ChangeTile('p'); }, 'ee');
new KeyBinding('Exit', 'eexit', 'KeyQ', e => { G.scene = 'e'; }, 'ee');
new KeyBinding('Confirm Entry', 'eeeconfirm', 'Enter', e => { G.export.selected.desc = false; G.export.selected.name = false; G.export.selected.id = false; G.export.selected.author = false; }, 'eee');