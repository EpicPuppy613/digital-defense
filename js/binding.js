//W-BINDINGS
new KeyBinding('Deselect', 'deselect', 'Escape', () => { G.A.C.on = false; }, 'g');
new KeyBinding('Recenter', 'recenter', 'KeyR', () => { G.O.X = Math.floor((G.width - G.A.M[G.map].map.size[0] * G.A.TS[0]) / 2); G.O.Y = 48 + Math.floor((G.height - 48 - G.A.M[G.map].map.size[1] * G.A.TS[1]) / 2); }, ['g', 'ee']);
new KeyBinding('Move Right', 'right', 'ArrowRight', e => {
    if (e.ctrlKey && e.shiftKey) G.O.X -= G.A.TS[0] * 16;
    else if (e.ctrlKey) G.O.X -= G.A.TS[0] / 4;
    else if (e.shiftKey) G.O.X -= G.A.TS[0] * 4;
    else G.O.X -= G.A.TS[0];
}, ['g', 'ee']);
new KeyBinding('Move Left', 'left', 'ArrowLeft', e => {
    if (e.ctrlKey && e.shiftKey) G.O.X += G.A.TS[0] * 16;
    else if (e.ctrlKey) G.O.X += G.A.TS[0] / 4;
    else if (e.shiftKey) G.O.X += G.A.TS[0] * 4;
    else G.O.X += G.A.TS[0];
}, ['g', 'ee']);
new KeyBinding('Move Up', 'up', 'ArrowUp', e => {
    if (e.ctrlKey && e.shiftKey) G.O.Y += G.A.TS[1] * 16;
    else if (e.ctrlKey) G.O.Y += G.A.TS[0] / 4;
    else if (e.shiftKey) G.O.Y += G.A.TS[0] * 4;
    else G.O.Y += G.A.TS[0];
}, ['g', 'ee']);
new KeyBinding('Move Down', 'down', 'ArrowDown', e => {
    if (e.ctrlKey && e.shiftKey) G.O.Y -= G.A.TS[1] * 16;
    else if (e.ctrlKey) G.O.Y -= G.A.TS[0] / 4;
    else if (e.shiftKey) G.O.Y -= G.A.TS[0] * 4;
    else G.O.Y -= G.A.TS[0];
}, ['g', 'ee']);
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
new KeyBinding('Send Wave', 'wave', 'KeyW', e => { if (G.wavespawn < 0) NextWave(); }, 'g');
new KeyBinding('Buy Upgrade 1', 'upgrade1', 'Digit1', e => { BuyUpgrade(getTile(G.A.C.X, G.A.C.Y, true), 0); }, 'g');
new KeyBinding('Buy Upgrade 2', 'upgrade2', 'Digit2', e => { BuyUpgrade(getTile(G.A.C.X, G.A.C.Y, true), 1); }, 'g');
new KeyBinding('Buy Upgrade 3', 'upgrade3', 'Digit3', e => { BuyUpgrade(getTile(G.A.C.X, G.A.C.Y, true), 2); }, 'g');
new KeyBinding('Force Wave', 'force', 'KeyF', e => { NextWave(); }, 'g');
new KeyBinding('Start', 'start', 'Enter', e => { G.scene = 'g' }, 'm');
new KeyBinding('Quit', 'quit', 'KeyQ', e => { G.scene = 'm'; G.speed = 0; G.pause = true; A.M.S = true; }, 'g'); `q`
new KeyBinding('Next Targeting', 'nexttargeting', 'KeyY', e => { if (getTile(G.A.C.X, G.A.C.Y, true).tower !== null) getTile(G.A.C.X, G.A.C.Y).tower.targetchange(1) }, 'g');
new KeyBinding('Previous Targeting', 'prevtargeting', 'KeyT', e => { if (getTile(G.A.C.X, G.A.C.Y, true).tower !== null) getTile(G.A.C.X, G.A.C.Y).tower.targetchange(-1) }, 'g');
new KeyBinding('Back', 'back', 'Escape', e => { if (G.scene.length > 1) G.scene = G.scene.slice(0, -1); else G.scene = 'm' }, ['e', 's', 'sb', 't', 'sg', 'ee', 'ss']);
new KeyBinding('Debug On', 'don', 'KeyP', e => { G.DEEEEEEEEBUG = true }, ['g', 'm', 's', 'e', 'ee']);
new KeyBinding('Debug Off', 'doff', 'KeyO', e => { G.DEEEEEEEEBUG = false }, ['g', 'm', 's', 'e', 'ee']);
new KeyBinding('Toggle Left', 'eleft', 'KeyA', e => { if (E.D.L) E.D.L = false; else if (!E.D.B && !E.D.P) E.D.L = true; }, 'ee');
new KeyBinding('Toggle Right', 'eright', 'KeyD', e => { if (E.D.R) E.D.R = false; else if (!E.D.B && !E.D.P) E.D.R = true; }, 'ee');
new KeyBinding('Toggle Up', 'eup', 'KeyW', e => { if (E.D.U) E.D.U = false; else if (!E.D.B && !E.D.P) E.D.U = true; }, 'ee');
new KeyBinding('Toggle Down', 'edown', 'KeyS', e => { if (E.D.D) E.D.D = false; else if (!E.D.B && !E.D.P) E.D.D = true; }, 'ee');
new KeyBinding('Toggle Base', 'ebase', 'KeyB', e => { if (E.D.B) E.D.B = false; else if (!E.D.P) {E.D.B = true; E.D.L = false; E.D.R = false; E.D.U = false; E.D.D = false;} }, 'ee');
new KeyBinding('Toggle Platform', 'eplat', 'KeyC', e => {  if (E.D.P) E.D.P = false; else {E.D.P = true; E.D.B = false; E.D.L = false; E.D.R = false; E.D.U = false; E.D.D = false;} }, 'ee');
new KeyBinding('Increase Percent Total', 'lt', 'KeyT', e => { L.percent = Math.min(L.percent + 0.025, 0.999) }, 'l');
new KeyBinding('Increase Sub Total', 'ls', 'KeyF', e => { L.stages[L.stage].percent = Math.min(L.stages[L.stage].percent + 0.025, 1) }, 'l');
new KeyBinding('Next Stage', 'ln', 'KeyG', e => { L.stage = Math.min(L.stage + 1, 3); L.stages[L.stage].percent = 0 }, 'l');