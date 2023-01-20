//W-SCENE:L // LOADING
new Scene('l', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', monospace";
    G.C.textAlign = 'center';
    G.C.text('initializing...', Math.round(G.width / 2), 250);
    //MAIN PROGRESS BAR
    G.C.font = "24px 'Press Start 2P', monospace";
    G.C.text(`${(L.percent * 100).toFixed(1)}%`, Math.round(G.width / 2), 340);
    G.C.strokeStyle = 'white';
    G.C.lineWidth = 2;
    G.C.strokeRect(Math.round(G.width / 6), 350, Math.round(G.width / 1.5), 25);
    G.C.fillStyle = '#3df';
    G.C.fillRect(Math.round(G.width / 6) + 1, 351, (Math.round(G.width / 1.5) - 2) * L.percent, 23);
    //SECONDARY PROGRESS BAR
    G.C.fillStyle = 'white';
    G.C.font = "16px 'Press Start 2P', monospace";
    G.C.strokeStyle = 'gray';
    G.C.text(`${L.stages[L.stage].display}`, Math.round(G.width / 2), 400);
    G.C.strokeRect(Math.round(G.width / 3), 410, Math.round(G.width / 3), 10);
    G.C.fillStyle = '#08c'
    G.C.fillRect(Math.round(G.width / 3) + 1, 411, (Math.round(G.width / 3) - 2) * L.stages[L.stage].percent, 8);
    //CHANGE TO MENU SCREEN WHEN FINISHED
    if (L.percent >= 1) {
        G.scene = 'm';
    }
})

//W-SCENE:M // MENU
new Scene('m', () => {
    G.C.fillStyle = 'white';
    G.C.font = "40px 'Press Start 2P', monospace";
    G.C.textAlign = 'center';
    G.C.text('Just Another Tower Defense', Math.round(G.width / 2), 150);
    G.C.font = "32px 'Press Start 2P', monospace";
    if (G.N.B.start.hover) G.C.text('> NEW GAME <', Math.round(G.width / 2), 350);
    else G.C.text('NEW GAME', Math.round(G.width / 2), 350);
    G.C.font = "24px 'Press Start 2P', monospace";
    if (G.wave != 0) {
        if (G.N.B.resume.hover) G.C.text('> RESUME <', Math.round(G.width / 2), 450);
        else G.C.text('RESUME', Math.round(G.width / 2), 450);
    }
    if (G.N.B.settings.hover) G.C.text('> SETTINGS <', Math.round(G.width / 2), 530);
    else G.C.text('SETTINGS', Math.round(G.width / 2), 530);
    if (G.N.B.editor.hover) G.C.text('> EDITOR <', Math.round(G.width / 2), 610);
    else G.C.text('EDITOR', Math.round(G.width / 2), 610);
    if (G.N.B.quit.hover) G.C.text('> QUIT <', Math.round(G.width / 2), 690);
    else G.C.text('QUIT', Math.round(G.width / 2), 690);
});

//W-SCENE:E // EDITOR
new Scene('e', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', monospace";
    G.C.textAlign = 'center';
    G.C.text('EDITOR', Math.round(G.width / 2), 200);
    G.C.font = "24px 'Press Start 2P', monospace";
    if (G.N.B.new.hover) G.C.text('> CREATE NEW <', Math.round(G.width / 2), 350);
    else G.C.text('CREATE NEW', Math.round(G.width / 2), 350);
    if (G.N.B.load.hover) G.C.text('> LOAD MAP <', Math.round(G.width / 2), 430);
    else G.C.text('LOAD MAP', Math.round(G.width / 2), 430);
    if (G.map == 'blank') {
        if (G.N.B.continue.hover) G.C.text('> CONTINUE <', Math.round(G.width / 2), 510);
        else G.C.text('CONTINUE', Math.round(G.width / 2), 510);
    }
    if (G.N.B.eback.hover) G.C.text('> BACK <', 100, 50);
    else G.C.text('BACK', 100, 50);
});

//W-SCENE:EE // EDITOR
new Scene('ee', () => {
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
    //GRID
    G.C.strokeStyle = '#333';
    G.C.lineWidth = 2;
    for (var x = Math.floor(-G.O.X / G.A.TS[0]) * G.A.TS[0]; x < -G.O.X + G.width; x += G.A.TS[0]) {
        G.C.beginPath();
        G.C.moveTo(x + G.O.X, -10);
        G.C.lineTo(x + G.O.X, G.height + 10);
        G.C.stroke();
    }
    for (var y = Math.floor(-G.O.Y / G.A.TS[1]) * G.A.TS[1]; y < -G.O.Y + G.height; y += G.A.TS[1]) {
        G.C.beginPath();
        G.C.moveTo(-10, y + G.O.Y);
        G.C.lineTo(G.width + 10, y + G.O.Y);
        G.C.stroke();
    }
    if (G.A.C.on) {
        texture = 'selected';
        img = G.A.T[texture];
        img.atlas.PC.clearRect(0, 0, img.atlas.config.scale[0], img.atlas.config.scale[1]);
        img.atlas.PC.drawImage(
            img.atlas.img,
            img.xpos,
            img.ypos,
            img.atlas.config.size[0],
            img.atlas.config.size[1],
            0, 0,
            img.atlas.config.scale[0],
            img.atlas.config.scale[1]
        )
        img.atlas.PC.globalCompositeOperation = 'source-atop';
        img.atlas.PC.fillStyle = 'white';
        img.atlas.PC.fillRect(0, 0, img.atlas.config.scale[0], img.atlas.config.scale[1]);
        img.atlas.PC.globalCompositeOperation = 'source-over';
        G.C.save();
        G.C.translate(img.atlas.config.scale[0] * (G.A.C.X + 0.5) + G.O.X, img.atlas.config.scale[1] * (G.A.C.Y + 0.5) + G.O.Y);
        G.C.rotate(G.A.C.pos * Math.PI / 180);
        G.C.drawImage(
            img.atlas.P,
            -img.atlas.config.scale[0] / 2,
            -img.atlas.config.scale[1] / 2
        );
        G.C.restore();
    }
    //UI
    //TOPBAR
    G.C.fillStyle = '#393939';
    G.C.font = "16px 'Press Start 2P', monospace";
    G.C.fillRect(0, 0, G.width, 32);
    G.C.fillStyle = '#444';
    G.C.fillRect(0, G.height - 32, G.width, 32);
    G.C.fillStyle = 'white';
    G.C.textAlign = 'center';
    if (G.N.B.eeback.hover) G.C.text("> Exit <", Math.round(G.width / 20), 26);
    else G.C.text("Exit", Math.round(G.width / 20), 26);
    if (G.N.B.eesave.hover) G.C.text("> Save <", Math.round(G.width / 20 * 3), 26);
    else G.C.text("Save", Math.round(G.width / 20 * 3), 26);
    if (E.D.L) G.C.fillStyle = '#3ff';
    else if (!E.D.B && !E.D.P) G.C.fillStyle = '#888';
    else G.C.fillStyle = '#866';
    if (G.N.B.eeleft.hover && !E.D.B && !E.D.P) G.C.text("> LEFT <", Math.round(G.width / 12), G.height - 6);
    else G.C.text("LEFT", Math.round(G.width / 12), G.height - 6);
    if (E.D.R) G.C.fillStyle = '#3ff';
    else if (!E.D.B && !E.D.P) G.C.fillStyle = '#888';
    else G.C.fillStyle = '#866';
    if (G.N.B.eeright.hover && !E.D.B && !E.D.P) G.C.text("> RIGHT <", Math.round(G.width / 12 * 3), G.height - 6);
    else G.C.text("RIGHT", Math.round(G.width / 12 * 3), G.height - 6);
    if (E.D.U) G.C.fillStyle = '#3ff';
    else if (!E.D.B && !E.D.P) G.C.fillStyle = '#888';
    else G.C.fillStyle = '#866';
    if (G.N.B.eeup.hover && !E.D.B && !E.D.P) G.C.text("> UP <", Math.round(G.width / 12 * 5), G.height - 6);
    else G.C.text("UP", Math.round(G.width / 12 * 5), G.height - 6);
    if (E.D.D) G.C.fillStyle = '#3ff';
    else if (!E.D.B && !E.D.P) G.C.fillStyle = '#888';
    else G.C.fillStyle = '#866';
    if (G.N.B.eedown.hover && !E.D.B && !E.D.P) G.C.text("> DOWN <", Math.round(G.width / 12 * 7), G.height - 6);
    else G.C.text("DOWN", Math.round(G.width / 12 * 7), G.height - 6);
    if (E.D.B) G.C.fillStyle = '#3ff';
    else if (!E.D.P) G.C.fillStyle = '#888';
    else G.C.fillStyle = '#866';
    if (G.N.B.eebase.hover && !E.D.P) G.C.text("> BASE <", Math.round(G.width / 12 * 9), G.height - 6);
    else G.C.text("BASE", Math.round(G.width / 12 * 9), G.height - 6);
    if (E.D.P) G.C.fillStyle = '#3ff';
    else G.C.fillStyle = '#888';
    if (G.N.B.eeplatform.hover) G.C.text("> PLATFORM <", Math.round(G.width / 12 * 11), G.height - 6);
    else G.C.text("PLATFORM", Math.round(G.width / 12 * 11), G.height - 6);
});

//W-SCENE:S // SETTINGS
new Scene('s', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', monospace";
    G.C.textAlign = 'center';
    G.C.text('SETTINGS', Math.round(G.width / 2), 200);
    G.C.font = "24px 'Press Start 2P', monospace";
    if (G.N.B.bindings.hover) G.C.text('> CONTROLS <', Math.round(G.width / 2), 350);
    else G.C.text('CONTROLS', Math.round(G.width / 2), 350);
    if (G.N.B.default.hover) G.C.text('> RESET BINDINGS <', Math.round(G.width / 2), 430);
    else G.C.text('RESET BINDINGS', Math.round(G.width / 2), 430);
    if (G.N.B.graphics.hover) G.C.text('> GRAPHICS <', Math.round(G.width / 2), 510);
    else G.C.text('GRAPHICS', Math.round(G.width / 2), 510);
    if (G.N.B.sound.hover) G.C.text('> SOUND <', Math.round(G.width / 2), 590);
    else G.C.text('SOUND', Math.round(G.width / 2), 590);
    if (G.N.B.sback.hover) G.C.text('> BACK <', 100, 50);
    else G.C.text('BACK', 100, 50);
});

//W-SCENE:SG // SETTINGS:GRAPHICS
new Scene('sg', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', monospace";
    G.C.textAlign = 'center';
    G.C.text('GRAPHICS', Math.round(G.width / 2), 200);
    G.C.font = "24px 'Press Start 2P', monospace";
    if (G.N.B.rescale.hover) G.C.text('> RESCALE <', Math.round(G.width / 2), 350);
    else G.C.text('RESCALE', Math.round(G.width / 2), 350);
    G.C.text('FPS LIMIT:', Math.round(G.width / 2), 430);
    if (F.limit != 'None') {
        if (G.N.B.fpsup.hover) G.C.text('> ' + F.limit + ' fps >', Math.round(G.width / 2), 470);
        else if (G.N.B.fpsdown.hover) G.C.text('< ' + F.limit + ' fps <', Math.round(G.width / 2), 470);
        else G.C.text('< ' + F.limit + ' fps >', Math.round(G.width / 2), 470);
    } else {
        if (G.N.B.fpsup.hover) G.C.text('> ' + F.limit + ' >', Math.round(G.width / 2), 470);
        else if (G.N.B.fpsdown.hover) G.C.text('< ' + F.limit + ' <', Math.round(G.width / 2), 470);
        else G.C.text('< ' + F.limit + ' >', Math.round(G.width / 2), 470);
    }
    if (G.N.B.sgback.hover) G.C.text('> BACK <', 100, 50);
    else G.C.text('BACK', 100, 50);
});

//W-SCENE:SS // SETTINGS:SOUND
new Scene('ss', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', monospace";
    G.C.textAlign = 'center';
    G.C.text('SOUND', Math.round(G.width / 2), 200);
    G.C.font = "24px 'Press Start 2P', monospace";
    G.C.text('MUSIC VOLUME:', Math.round(G.width / 2), 350);
    if (G.N.B.musicup.hover) G.C.text('> ' + Math.round(A.V.M * 100) + '% >', Math.round(G.width / 2), 390);
    else if (G.N.B.musicdown.hover) G.C.text('< ' + Math.round(A.V.M * 100) + '% <', Math.round(G.width / 2), 390);
    else G.C.text('< ' + Math.round(A.V.M * 100) + '% >', Math.round(G.width / 2), 390);
    G.C.text('SOUND VOLUME:', Math.round(G.width / 2), 430);
    if (G.N.B.sfxup.hover) G.C.text('> ' + Math.round(A.V.S * 100) + '% >', Math.round(G.width / 2), 470);
    else if (G.N.B.sfxdown.hover) G.C.text('< ' + Math.round(A.V.S * 100) + '% <', Math.round(G.width / 2), 470);
    else G.C.text('< ' + Math.round(A.V.S * 100) + '% >', Math.round(G.width / 2), 470);
    if (G.N.B.ssback.hover) G.C.text('> BACK <', 100, 50);
    else G.C.text('BACK', 100, 50);
});

//W-SCENE:SB // SETTINGS:BINDINGS
new Scene('sb', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', monospace";
    G.C.textAlign = 'center';
    G.C.text("CONTROLS", Math.round(G.width / 2), 200);
    G.C.text(S[G.R.P].category, Math.round(G.width / 2), 260);
    G.C.font = "24px 'Press Start 2P', monospace";
    y = 320;
    x = 0;
    for (const binding of S[G.R.P].bindings) {
        if (G.R.R == binding) G.C.fillStyle = 'dodgerblue';
        else G.C.fillStyle = 'white';
        key = K[binding].key;
        key = key.replaceAll(/(Digit)|(Arrow)|(Key)/g, "");
        if (G.N.B["sbbind" + x].hover) G.C.text(`> ${K[binding].name}: ${key} <`, Math.round(G.width / 2), y);
        else G.C.text(`${K[binding].name}: ${key}`, Math.round(G.width / 2), y);
        y += 50;
        x++;
    }
    G.C.fillStyle = 'white';
    G.C.textAlign = 'left';
    if (G.R.P < S.length - 1) {
        if (G.N.B.sbnext.hover) G.C.text('NEXT >', Math.round(G.width / 2) + 100, G.height - 50);
        else G.C.text('NEXT', Math.round(G.width / 2) + 100, G.height - 50);
    }
    G.C.textAlign = 'right';
    if (G.R.P > 0) {
        if (G.N.B.sbprev.hover) G.C.text('< PREVIOUS', Math.round(G.width / 2) - 100, G.height - 50);
        else G.C.text('PREVIOUS', Math.round(G.width / 2) - 100, G.height - 50);
    }
    G.C.textAlign = 'center';
    if (G.N.B.sbback.hover) G.C.text('> BACK <', 100, 50);
    else G.C.text('BACK', 100, 50);
});

//W-SCENE:T // TRACK SELECT
new Scene('t', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', monospace";
    G.C.textAlign = 'center';
    G.C.text("TRACK SELECT", Math.round(G.width / 2), 200);
    G.C.textAlign = 'center';
    G.C.font = "24px 'Press Start 2P', monospace";
    if (G.N.B.tback.hover) G.C.text('> BACK <', 100, 50);
    else G.C.text('BACK', 100, 50);
    G.C.fillStyle = 'white';
    G.C.textAlign = 'left';
    if (G.TS.page < Math.floor((G.TS.A.length - 1) / 2)) {
        if (G.N.B.tnext.hover) G.C.text('NEXT >', Math.round(G.width / 2) + 100, G.height - 50);
        else G.C.text('NEXT', Math.round(G.width / 2) + 100, G.height - 50);
    }
    G.C.textAlign = 'right';
    if (G.TS.page > 0) {
        if (G.N.B.tprev.hover) G.C.text('< PREVIOUS', Math.round(G.width / 2) - 100, G.height - 50);
        else G.C.text('PREVIOUS', Math.round(G.width / 2) - 100, G.height - 50);
    }
    G.C.textAlign = 'center';
    /** @type {Track[]} */
    var tracks = [];
    for (const track in G.A.M) {
        if (G.TS.A.includes(G.A.M[track].id)) {
            tracks.push(G.A.M[track]);
        }
    }
    tracks.sort((a, b) => a.difficulty - b.difficulty);
    if (G.TS.page * 2 < G.TS.A.length) {
        G.C.font = "24px 'Press Start 2P', monospace";
        if (G.N.B.tleft.hover) G.C.text("> " + tracks[G.TS.page * 2].name + " <", Math.round(G.width / 2 - G.width / 4), 260)
        else G.C.text(tracks[G.TS.page * 2].name, Math.round(G.width / 2 - G.width / 4), 260);
        G.C.font = "16px 'Press Start 2P', monospace";
        G.C.text(tracks[G.TS.page * 2].desc, Math.round(G.width / 2 - G.width / 4), 286);
        switch (tracks[G.TS.page * 2].difficulty) {
            case 1: G.C.fillStyle = '#1e90ff'; break;
            case 2: G.C.fillStyle = '#00ff7f'; break;
            case 3: G.C.fillStyle = '#7cfc00'; break;
            case 4: G.C.fillStyle = '#befe00'; break;
            case 5: G.C.fillStyle = '#ffff00'; break;
            case 6: G.C.fillStyle = '#ffdb00'; break;
            case 7: G.C.fillStyle = '#ffb700'; break;
            case 8: G.C.fillStyle = '#f8880c'; break;
            case 9: G.C.fillStyle = '#ea4e24'; break;
            case 10: G.C.fillStyle = '#dc143c'; break;
            default: G.C.fillStyle = 'white';
        }
        G.C.text(`Difficulty: [${"X".repeat(tracks[G.TS.page * 2].difficulty)}${" ".repeat(10 - tracks[G.TS.page * 2].difficulty)}]`, Math.round(G.width / 2 - G.width / 4), 310);
        DrawMiniMap(tracks[G.TS.page * 2], Math.round(G.width / 2 - G.width / 4 - G.width / 6), 320, Math.round(G.width / 3), Math.round(((G.width / 3) / tracks[G.TS.page * 2].map.size[0]) * tracks[G.TS.page * 2].map.size[1]));
    }
    if (G.TS.page * 2 + 1 < G.TS.A.length) {
        G.C.font = "24px 'Press Start 2P', monospace";
        if (G.N.B.tright.hover) G.C.text("> " + tracks[G.TS.page * 2 + 1].name + " <", Math.round(G.width / 2 + G.width / 4), 260);
        else G.C.text(tracks[G.TS.page * 2 + 1].name, Math.round(G.width / 2 + G.width / 4), 260);
        G.C.font = "16px 'Press Start 2P', monospace";
        G.C.text(tracks[G.TS.page * 2 + 1].desc, Math.round(G.width / 2 + G.width / 4), 286);
        switch (tracks[G.TS.page * 2 + 1].difficulty) {
            case 1: G.C.fillStyle = '#1e90ff'; break;
            case 2: G.C.fillStyle = '#00ff7f'; break;
            case 3: G.C.fillStyle = '#7cfc00'; break;
            case 4: G.C.fillStyle = '#befe00'; break;
            case 5: G.C.fillStyle = '#ffff00'; break;
            case 6: G.C.fillStyle = '#ffdb00'; break;
            case 7: G.C.fillStyle = '#ffb700'; break;
            case 8: G.C.fillStyle = '#f8880c'; break;
            case 9: G.C.fillStyle = '#ea4e24'; break;
            case 10: G.C.fillStyle = '#dc143c'; break;
            default: G.C.fillStyle = 'white';
        }
        G.C.text(`Difficulty: [${"X".repeat(tracks[G.TS.page * 2 + 1].difficulty)}${" ".repeat(10 - tracks[G.TS.page * 2 + 1].difficulty)}]`, Math.round(G.width / 2 + G.width / 4), 310);
        DrawMiniMap(tracks[G.TS.page * 2 + 1], Math.round(G.width / 2 + G.width / 4 - G.width / 6), 320, Math.round(G.width / 3), Math.floor(G.height / 5 * 2));
    }
    G.C.textAlign = 'left';
});

//W-SCENE:G // GAME
new Scene('g', () => {
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
            0, 0,
            img.atlas.config.scale[0],
            img.atlas.config.scale[1]
        )
        G.C.save();
        G.C.translate(img.atlas.config.scale[0] * (defense.x + 0.5) + G.O.X, img.atlas.config.scale[1] * (defense.y + 0.5) + G.O.Y);
        G.C.rotate(defense.direction * Math.PI / 180);
        G.C.drawImage(
            img.atlas.P,
            - img.atlas.config.scale[0] / 2,
            - img.atlas.config.scale[1] / 2
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
        try { if (getTile(G.A.C.X, G.A.C.Y).type == 'platform') { texture = 'selected'; } } catch { };
        img = G.A.T[texture];
        img.atlas.PC.clearRect(0, 0, img.atlas.config.scale[0], img.atlas.config.scale[1]);
        img.atlas.PC.drawImage(
            img.atlas.img,
            img.xpos,
            img.ypos,
            img.atlas.config.size[0],
            img.atlas.config.size[1],
            0, 0,
            img.atlas.config.scale[0],
            img.atlas.config.scale[1]
        )
        G.C.save();
        G.C.translate(img.atlas.config.scale[0] * (G.A.C.X + 0.5) + G.O.X, img.atlas.config.scale[1] * (G.A.C.Y + 0.5) + G.O.Y);
        G.C.rotate(G.A.C.pos * Math.PI / 180);
        G.C.drawImage(
            img.atlas.P,
            -img.atlas.config.scale[0] / 2,
            -img.atlas.config.scale[1] / 2
        );
        G.C.restore();
    }
    if (getTile(G.A.C.X, G.A.C.Y, true).type == 'platform' && G.A.C.on) G.U.on = true;
    else G.U.on = false;
    if (G.U.on && G.U.anim < 50) G.U.anim = Math.min(G.U.anim + 500 / F.time, 50);
    if (!G.U.on && G.U.anim > 0) G.U.anim = Math.max(G.U.anim - 500 / F.time, 0);
    offset = (96 * Math.sin((Math.PI / 50) * (G.U.anim - 25)) + 96);
    //W-UI
    //TOPBAR
    G.C.fillStyle = '#393939';
    G.C.font = "16px 'Press Start 2P', monospace";
    G.C.fillRect(0, 0, G.width, 48);
    G.C.fillRect(0, G.height - offset, G.width, 192);
    //BOSSBAR
    //G.D = G.boss;
    if (G.boss != null) {
        G.C.fillStyle = '#555';
        G.C.font = "16px 'Press Start 2P', monospace";
        G.C.fillRect(12, 48, G.C.textWidth('BOSS').width + 8, 24);
        G.C.fillStyle = 'crimson';
        G.C.text("BOSS", 16, 68);
        var gradient = G.C.createLinearGradient(0, 48, 0, G.height - offset);
        gradient.addColorStop(0, '#a70018');
        gradient.addColorStop(1, '#ff0000');
        G.C.fillStyle = gradient;
        G.C.fillRect(0, 48, 12, (G.height - 48 - offset) * (G.boss.hp / G.boss.maxhp));
    }
    //WAVE TIMER
    G.C.fillStyle = '#555';
    if (G.wave == 0) G.C.fillRect(G.width - G.C.textWidth('Send Wave: --').width - 20, 48,
        G.C.textWidth('Send Wave: --').width + 20, 32);
    else G.C.fillRect(G.width - G.C.textWidth('Send Wave: ' + Math.max(Math.floor(G.wavetimer), 0)).width - 20, 48,
        G.C.textWidth('Send Wave: ' + Math.max(Math.floor(G.wavetimer), 0)).width + 20, 32);
    if (G.wavespawn > 0) G.C.fillStyle = '#999';
    else G.C.fillStyle = 'white';
    G.C.textAlign = 'right';
    if (G.wave == 0) G.C.text('Send Wave: --', G.width - 10, 72);
    else G.C.text('Send Wave: ' + Math.max(Math.floor(G.wavetimer), 0), G.width - 10, 72);
    G.C.textAlign = 'left';
    if (getTile(G.A.C.X, G.A.C.Y, true).tower == null) G.C.fillStyle = 'white';
    else G.C.fillStyle = getTile(G.A.C.X, G.A.C.Y, true).tower.color;
    G.C.textBaseline = 'top';
    G.C.font = "24px 'Press Start 2P', monospace";
    //W-UI:INFOBOX
    if (getTile(G.A.C.X, G.A.C.Y, true).tower == null && G.U.on) {
        G.C.text("Platform [Lv. -]", 10, G.height - offset + 10,);
        G.C.font = "16px 'Press Start 2P', monospace";
        G.C.strokeStyle = 'gray';
        G.C.lineWidth = 2;
        G.C.textAlign = 'center';

        if (G.points < G.A.B.basic.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.A.B.basic.color;
        G.C.text(`[${G.A.B.basic.cost}p] ${G.A.B.basic.name}`, Math.floor(G.width / 6), G.height - offset + 80);
        G.C.strokeRect(0, G.height - offset + 68, Math.floor((G.width) / 3), 40);

        if (G.points < G.A.B.sniper.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.A.B.sniper.color;
        G.C.text(`[${G.A.B.sniper.cost}p] ${G.A.B.sniper.name}`, Math.floor(G.width / 6 * 3), G.height - offset + 80);
        G.C.strokeRect(Math.floor(G.width / 3), G.height - offset + 68, Math.floor((G.width) / 3), 40);

        if (G.points < G.A.B.beam.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.A.B.beam.color;
        G.C.text(`[${G.A.B.beam.cost}p] ${G.A.B.beam.name}`, Math.floor(G.width / 6 * 5), G.height - offset + 80);
        G.C.strokeRect(Math.floor(G.width / 3 * 2), G.height - offset + 68, Math.floor((G.width) / 3), 40);

        if (G.points < G.A.B.multi.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.A.B.multi.color;
        G.C.text(`[${G.A.B.multi.cost}p] ${G.A.B.multi.name}`, Math.floor(G.width / 6), G.height - offset + 120);
        G.C.strokeRect(0, G.height - offset + 108, Math.floor((G.width) / 3), 40);

        if (G.points < G.A.B.aura.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.A.B.aura.color;
        G.C.text(`[${G.A.B.aura.cost}p] ${G.A.B.aura.name}`, Math.floor(G.width / 6 * 3), G.height - offset + 120);
        G.C.strokeRect(Math.floor(G.width / 3), G.height - offset + 108, Math.floor((G.width) / 3), 40);

        if (G.points < G.A.B.super.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.A.B.super.color;
        G.C.text(`[${G.A.B.super.cost}p] ${G.A.B.super.name}`, Math.floor(G.width / 6 * 5), G.height - offset + 120);
        G.C.strokeRect(Math.floor(G.width / 3 * 2), G.height - offset + 108, Math.floor((G.width) / 3), 40);

        G.C.textAlign = 'left';
    } else if (G.U.on) {
        tower = getTile(G.A.C.X, G.A.C.Y, true).tower;
        G.C.text(tower.name + ` [Lv. ${tower.level}]`, 10, G.height - offset + 10);
        G.C.font = "16px 'Press Start 2P', monospace";
        G.C.text("Kills: " + tower.kills.toLocaleString(), 10, G.height - offset + 44);
        G.C.text("Earned: " + tower.earned.toLocaleString() + "p", 10, G.height - offset + 64);
        G.C.text("Fire Rate: " + tower.firerate.toFixed(1) + "/s", 10, G.height - offset + 84);
        if (tower.damage < 0.1) G.C.text("Damage: " + tower.damage.toFixed(3), 10, G.height - offset + 104);
        else if (tower.damage < 1) G.C.text("Damage: " + tower.damage.toFixed(2), 10, G.height - offset + 104);
        else G.C.text("Damage: " + tower.damage.toFixed(1), 10, G.height - offset + 104);
        G.C.text("DPS: " + (tower.firerate * tower.damage).toFixed(1) + "/s", 10, G.height - offset + 124);
        G.C.text("Range: " + tower.range.toFixed(2), 10, G.height - offset + 144);
        G.C.text("Shots: " + tower.shots.toFixed(0) + " (" + (tower.firerate * tower.damage * tower.shots).toFixed(0) + " DPS)", 10, G.height - offset + 164);
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
            G.C.text(tower.available[0].name, pos1, upgradeTop);
            vpos = upgradeTop + 26;
            G.C.font = "8px 'Press Start 2P', monospace";
            for (const desc of tower.available[0].desc) {
                G.C.text(desc, pos1, vpos);
                vpos += 12;
            }
            vpos += 8;
            G.C.font = "16px 'Press Start 2P', monospace";
            G.C.text("[" + tower.available[0].cost + "p]", pos1, vpos);
        }
        if (tower.available[1]) {
            if (G.points < tower.available[1].cost) G.C.fillStyle = 'gray';
            else G.C.fillStyle = tower.color;
            G.C.text(tower.available[1].name, pos2, upgradeTop);
            vpos = upgradeTop + 26;
            G.C.font = "8px 'Press Start 2P', monospace";
            for (const desc of tower.available[1].desc) {
                G.C.text(desc, pos2, vpos);
                vpos += 12;
            }
            vpos += 8;
            G.C.font = "16px 'Press Start 2P', monospace";
            G.C.text("[" + tower.available[1].cost + "p]", pos2, vpos);
        }
        if (tower.available[2]) {
            if (G.points < tower.available[2].cost) G.C.fillStyle = 'gray';
            else G.C.fillStyle = tower.color;
            G.C.text(tower.available[2].name, pos3, upgradeTop);
            vpos = upgradeTop + 26;
            G.C.font = "8px 'Press Start 2P', monospace";
            for (const desc of tower.available[2].desc) {
                G.C.text(desc, pos3, vpos);
                vpos += 12;
            }
            vpos += 8;
            G.C.font = "16px 'Press Start 2P', monospace";
            G.C.text("[" + tower.available[2].cost + "p]", pos3, vpos);
        }
        G.C.font = "16px 'Press Start 2P', monospace";
        G.C.fillStyle = tower.color;
        G.C.text('<', Math.round(G.width / 2), G.height - offset + 10);
        G.C.text('>', Math.round(G.width / 2) + 200, G.height - offset + 10);
        G.C.fillStyle = T.T[tower.targeting].color;
        G.C.text(T.T[tower.targeting].name, Math.round(G.width / 2) + 100, G.height - offset + 10);
        G.C.fillStyle = 'firebrick';
        G.C.textAlign = 'right';
        G.C.strokeStyle = 'gray';
        G.C.lineWidth = 2;
        G.C.text("Destroy: " + tower.refund + "p", G.width - 10, G.height - offset + 10);
        G.C.textAlign = 'left';
    }
    G.C.textBaseline = 'alphabetic';
    G.C.fillStyle = 'gold';
    G.C.font = "24px 'Press Start 2P', monospace";
    G.C.text(G.points.toLocaleString() + 'p', 12, 36);
    G.C.textAlign = 'right';
    if (G.hp / G.maxhp > 1) G.C.fillStyle = 'rgb(0, 255, ' + Math.round((G.hp / G.maxhp - 1) * 255) + ')';
    if (G.hp / G.maxhp > 0.5 && G.hp / G.maxhp <= 1) G.C.fillStyle = 'rgb(' + Math.round(255 - (G.hp / G.maxhp - 0.5) * 2 * 255) + ', 255, 0)';
    if (G.hp / G.maxhp <= 0.5) G.C.fillStyle = 'rgb(255, ' + Math.round((G.hp / G.maxhp) * 2 * 255) + ',0)';
    G.C.text(Math.max(Math.round(G.hp), 0) + "HP", G.width - 12, 36);
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
    G.C.text('Wave ' + G.wave + speed + G.time.toString().formatDuration(), Math.floor(G.width / 2), 36);
    DrawMiniMap(G.A.M[G.map], G.width - G.S.mapx, G.height - offset - G.S.mapy, G.S.mapx, G.S.mapy, G.T.E, G.T.B);
    G.C.textAlign = 'left';
    //W-UI:FPS
    G.C.font = "16px 'Press Start 2P', monospace";
    G.C.fillStyle = 'white';
    G.C.text(Math.round(F.fps.reduce((a, b) => a + b) / F.fps.length), 6, G.height - offset - 6);
});