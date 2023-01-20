//W-SCENE:L // LOADING
new Scene('l', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', monospace";
    G.C.textAlign = 'center';
    G.C.text('initializing...', Math.round(G.width / 2), 250);
    //MAIN PROGRESS BAR
    G.C.font = "24px 'Press Start 2P', monospace";
    G.C.text(`${(G.load.percent * 100).toFixed(1)}%`, Math.round(G.width / 2), 340);
    G.C.strokeStyle = 'white';
    G.C.lineWidth = 2;
    G.C.strokeRect(Math.round(G.width / 6), 350, Math.round(G.width / 1.5), 25);
    G.C.fillStyle = '#3df';
    G.C.fillRect(Math.round(G.width / 6) + 1, 351, (Math.round(G.width / 1.5) - 2) * G.load.percent, 23);
    //SECONDARY PROGRESS BAR
    G.C.fillStyle = 'white';
    G.C.font = "16px 'Press Start 2P', monospace";
    G.C.strokeStyle = 'gray';
    G.C.text(`${G.load.stages[G.load.stage].display}`, Math.round(G.width / 2), 400);
    G.C.strokeRect(Math.round(G.width / 3), 410, Math.round(G.width / 3), 10);
    G.C.fillStyle = '#08c'
    G.C.fillRect(Math.round(G.width / 3) + 1, 411, (Math.round(G.width / 3) - 2) * G.load.stages[G.load.stage].percent, 8);
})

//W-SCENE:M // MENU
new Scene('m', () => {
    G.C.fillStyle = 'white';
    G.C.font = "40px 'Press Start 2P', monospace";
    G.C.textAlign = 'center';
    G.C.text('Just Another Tower Defense', Math.round(G.width / 2), 150);
    G.C.font = "32px 'Press Start 2P', monospace";
    if (G.nav.buttons.start.hover) G.C.text('> NEW GAME <', Math.round(G.width / 2), 350);
    else G.C.text('NEW GAME', Math.round(G.width / 2), 350);
    G.C.font = "24px 'Press Start 2P', monospace";
    if (G.wave != 0) {
        if (G.nav.buttons.resume.hover) G.C.text('> RESUME <', Math.round(G.width / 2), 450);
        else G.C.text('RESUME', Math.round(G.width / 2), 450);
    }
    if (G.nav.buttons.settings.hover) G.C.text('> SETTINGS <', Math.round(G.width / 2), 530);
    else G.C.text('SETTINGS', Math.round(G.width / 2), 530);
    if (G.nav.buttons.editor.hover) G.C.text('> EDITOR <', Math.round(G.width / 2), 610);
    else G.C.text('EDITOR', Math.round(G.width / 2), 610);
    if (G.nav.buttons.quit.hover) G.C.text('> QUIT <', Math.round(G.width / 2), 690);
    else G.C.text('QUIT', Math.round(G.width / 2), 690);
});

//W-SCENE:E // EDITOR
new Scene('e', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', monospace";
    G.C.textAlign = 'center';
    G.C.text('EDITOR', Math.round(G.width / 2), 200);
    G.C.font = "24px 'Press Start 2P', monospace";
    if (G.nav.buttons.new.hover) G.C.text('> CREATE NEW <', Math.round(G.width / 2), 350);
    else G.C.text('CREATE NEW', Math.round(G.width / 2), 350);
    if (G.nav.buttons.load.hover) G.C.text('> LOAD MAP <', Math.round(G.width / 2), 430);
    else G.C.text('LOAD MAP', Math.round(G.width / 2), 430);
    if (G.map == 'blank') {
        if (G.nav.buttons.continue.hover) G.C.text('> CONTINUE <', Math.round(G.width / 2), 510);
        else G.C.text('CONTINUE', Math.round(G.width / 2), 510);
    }
    if (G.nav.buttons.eback.hover) G.C.text('> BACK <', 100, 50);
    else G.C.text('BACK', 100, 50);
});

//W-SCENE:EE // EDITOR
new Scene('ee', () => {
    //TRACK
    for (const tile of G.objects.tiles) {
        img = G.data.textures[tile.texture];
        G.C.drawImage(img.atlas.img,
            img.xpos,
            img.ypos,
            img.atlas.config.size[0],
            img.atlas.config.size[1],
            tile.x * img.atlas.config.scale[0] + G.offset.X,
            tile.y * img.atlas.config.scale[1] + G.offset.Y,
            img.atlas.config.scale[0],
            img.atlas.config.scale[1]);
    }
    for (const location of G.objects.locations) {
        img = G.data.textures[location.texture];
        G.C.drawImage(img.atlas.img,
            img.xpos,
            img.ypos,
            img.atlas.config.size[0],
            img.atlas.config.size[1],
            location.x * img.atlas.config.scale[0] + G.offset.X,
            location.y * img.atlas.config.scale[1] + G.offset.Y,
            img.atlas.config.scale[0],
            img.atlas.config.scale[1]);
    }
    //GRID
    G.C.strokeStyle = '#333';
    G.C.lineWidth = 2;
    for (let x = Math.floor(-G.offset.X / G.data.tileSize[0]) * G.data.tileSize[0]; x < -G.offset.X + G.width; x += G.data.tileSize[0]) {
        G.C.beginPath();
        G.C.moveTo(x + G.offset.X, -10);
        G.C.lineTo(x + G.offset.X, G.height + 10);
        G.C.stroke();
    }
    for (let y = Math.floor(-G.offset.Y / G.data.tileSize[1]) * G.data.tileSize[1]; y < -G.offset.Y + G.height; y += G.data.tileSize[1]) {
        G.C.beginPath();
        G.C.moveTo(-10, y + G.offset.Y);
        G.C.lineTo(G.width + 10, y + G.offset.Y);
        G.C.stroke();
    }
    if (G.data.cursor.on) {
        texture = 'selected';
        img = G.data.textures[texture];
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
        G.C.translate(img.atlas.config.scale[0] * (G.data.cursor.X + 0.5) + G.offset.X, img.atlas.config.scale[1] * (G.data.cursor.Y + 0.5) + G.offset.Y);
        G.C.rotate(G.data.cursor.pos * Math.PI / 180);
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
    if (G.nav.buttons.eeback.hover) G.C.text("> Exit <", Math.round(G.width / 20), 26);
    else G.C.text("Exit", Math.round(G.width / 20), 26);
    if (G.nav.buttons.eesave.hover) G.C.text("> Save <", Math.round(G.width / 20 * 3), 26);
    else G.C.text("Save", Math.round(G.width / 20 * 3), 26);
    if (G.editor.direction.left) G.C.fillStyle = '#3ff';
    else if (!G.editor.direction.base && !G.editor.direction.platform) G.C.fillStyle = '#888';
    else G.C.fillStyle = '#866';
    if (G.nav.buttons.eeleft.hover && !G.editor.direction.base && !G.editor.direction.platform) G.C.text("> LEFT <", Math.round(G.width / 12), G.height - 6);
    else G.C.text("LEFT", Math.round(G.width / 12), G.height - 6);
    if (G.editor.direction.right) G.C.fillStyle = '#3ff';
    else if (!G.editor.direction.base && !G.editor.direction.platform) G.C.fillStyle = '#888';
    else G.C.fillStyle = '#866';
    if (G.nav.buttons.eeright.hover && !G.editor.direction.base && !G.editor.direction.platform) G.C.text("> RIGHT <", Math.round(G.width / 12 * 3), G.height - 6);
    else G.C.text("RIGHT", Math.round(G.width / 12 * 3), G.height - 6);
    if (G.editor.direction.up) G.C.fillStyle = '#3ff';
    else if (!G.editor.direction.base && !G.editor.direction.platform) G.C.fillStyle = '#888';
    else G.C.fillStyle = '#866';
    if (G.nav.buttons.eeup.hover && !G.editor.direction.base && !G.editor.direction.platform) G.C.text("> UP <", Math.round(G.width / 12 * 5), G.height - 6);
    else G.C.text("UP", Math.round(G.width / 12 * 5), G.height - 6);
    if (G.editor.direction.down) G.C.fillStyle = '#3ff';
    else if (!G.editor.direction.base && !G.editor.direction.platform) G.C.fillStyle = '#888';
    else G.C.fillStyle = '#866';
    if (G.nav.buttons.eedown.hover && !G.editor.direction.base && !G.editor.direction.platform) G.C.text("> DOWN <", Math.round(G.width / 12 * 7), G.height - 6);
    else G.C.text("DOWN", Math.round(G.width / 12 * 7), G.height - 6);
    if (G.editor.direction.base) G.C.fillStyle = '#3ff';
    else if (!G.editor.direction.platform) G.C.fillStyle = '#888';
    else G.C.fillStyle = '#866';
    if (G.nav.buttons.eebase.hover && !G.editor.direction.platform) G.C.text("> BASE <", Math.round(G.width / 12 * 9), G.height - 6);
    else G.C.text("BASE", Math.round(G.width / 12 * 9), G.height - 6);
    if (G.editor.direction.platform) G.C.fillStyle = '#3ff';
    else G.C.fillStyle = '#888';
    if (G.nav.buttons.eeplatform.hover) G.C.text("> PLATFORM <", Math.round(G.width / 12 * 11), G.height - 6);
    else G.C.text("PLATFORM", Math.round(G.width / 12 * 11), G.height - 6);
});

//W-SCENE:S // SETTINGS
new Scene('s', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', monospace";
    G.C.textAlign = 'center';
    G.C.text('SETTINGS', Math.round(G.width / 2), 200);
    G.C.font = "24px 'Press Start 2P', monospace";
    if (G.nav.buttons.bindings.hover) G.C.text('> CONTROLS <', Math.round(G.width / 2), 350);
    else G.C.text('CONTROLS', Math.round(G.width / 2), 350);
    if (G.nav.buttons.default.hover) G.C.text('> RESET BINDINGS <', Math.round(G.width / 2), 430);
    else G.C.text('RESET BINDINGS', Math.round(G.width / 2), 430);
    if (G.nav.buttons.graphics.hover) G.C.text('> GRAPHICS <', Math.round(G.width / 2), 510);
    else G.C.text('GRAPHICS', Math.round(G.width / 2), 510);
    if (G.nav.buttons.sound.hover) G.C.text('> SOUND <', Math.round(G.width / 2), 590);
    else G.C.text('SOUND', Math.round(G.width / 2), 590);
    if (G.nav.buttons.sback.hover) G.C.text('> BACK <', 100, 50);
    else G.C.text('BACK', 100, 50);
});

//W-SCENE:SG // SETTINGS:GRAPHICS
new Scene('sg', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', monospace";
    G.C.textAlign = 'center';
    G.C.text('GRAPHICS', Math.round(G.width / 2), 200);
    G.C.font = "24px 'Press Start 2P', monospace";
    if (G.nav.buttons.rescale.hover) G.C.text('> RESCALE <', Math.round(G.width / 2), 350);
    else G.C.text('RESCALE', Math.round(G.width / 2), 350);
    G.C.text('FPS LIMIT:', Math.round(G.width / 2), 430);
    if (F.limit != 'None') {
        if (G.nav.buttons.fpsup.hover) G.C.text('> ' + F.limit + ' fps >', Math.round(G.width / 2), 470);
        else if (G.nav.buttons.fpsdown.hover) G.C.text('< ' + F.limit + ' fps <', Math.round(G.width / 2), 470);
        else G.C.text('< ' + F.limit + ' fps >', Math.round(G.width / 2), 470);
    } else {
        if (G.nav.buttons.fpsup.hover) G.C.text('> ' + F.limit + ' >', Math.round(G.width / 2), 470);
        else if (G.nav.buttons.fpsdown.hover) G.C.text('< ' + F.limit + ' <', Math.round(G.width / 2), 470);
        else G.C.text('< ' + F.limit + ' >', Math.round(G.width / 2), 470);
    }
    if (G.nav.buttons.sgback.hover) G.C.text('> BACK <', 100, 50);
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
    if (G.nav.buttons.musicup.hover) G.C.text('> ' + Math.round(G.audio.volume.music * 100) + '% >', Math.round(G.width / 2), 390);
    else if (G.nav.buttons.musicdown.hover) G.C.text('< ' + Math.round(G.audio.volume.music * 100) + '% <', Math.round(G.width / 2), 390);
    else G.C.text('< ' + Math.round(G.audio.volume.music * 100) + '% >', Math.round(G.width / 2), 390);
    G.C.text('SOUND VOLUME:', Math.round(G.width / 2), 430);
    if (G.nav.buttons.sfxup.hover) G.C.text('> ' + Math.round(G.audio.volume.sfx * 100) + '% >', Math.round(G.width / 2), 470);
    else if (G.nav.buttons.sfxdown.hover) G.C.text('< ' + Math.round(G.audio.volume.sfx * 100) + '% <', Math.round(G.width / 2), 470);
    else G.C.text('< ' + Math.round(G.audio.volume.sfx * 100) + '% >', Math.round(G.width / 2), 470);
    if (G.nav.buttons.ssback.hover) G.C.text('> BACK <', 100, 50);
    else G.C.text('BACK', 100, 50);
});

//W-SCENE:SB // SETTINGS:BINDINGS
new Scene('sb', () => {
    G.C.fillStyle = 'white';
    G.C.font = "32px 'Press Start 2P', monospace";
    G.C.textAlign = 'center';
    G.C.text("CONTROLS", Math.round(G.width / 2), 200);
    G.C.text(G.rebind.bindings[G.rebind.page].category, Math.round(G.width / 2), 260);
    G.C.font = "24px 'Press Start 2P', monospace";
    y = 320;
    x = 0;
    for (const binding of G.rebind.bindings[G.rebind.page].bindings) {
        if (G.rebind.current == binding) G.C.fillStyle = 'dodgerblue';
        else G.C.fillStyle = 'white';
        key = G.bindings[binding].key;
        key = key.replaceAll(/(Digit)|(Arrow)|(Key)/g, "");
        if (G.nav.buttons["sbbind" + x].hover) G.C.text(`> ${G.bindings[binding].name}: ${key} <`, Math.round(G.width / 2), y);
        else G.C.text(`${G.bindings[binding].name}: ${key}`, Math.round(G.width / 2), y);
        y += 50;
        x++;
    }
    G.C.fillStyle = 'white';
    G.C.textAlign = 'left';
    if (G.rebind.page < G.rebind.bindings.length - 1) {
        if (G.nav.buttons.sbnext.hover) G.C.text('NEXT >', Math.round(G.width / 2) + 100, G.height - 50);
        else G.C.text('NEXT', Math.round(G.width / 2) + 100, G.height - 50);
    }
    G.C.textAlign = 'right';
    if (G.rebind.page > 0) {
        if (G.nav.buttons.sbprev.hover) G.C.text('< PREVIOUS', Math.round(G.width / 2) - 100, G.height - 50);
        else G.C.text('PREVIOUS', Math.round(G.width / 2) - 100, G.height - 50);
    }
    G.C.textAlign = 'center';
    if (G.nav.buttons.sbback.hover) G.C.text('> BACK <', 100, 50);
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
    if (G.nav.buttons.tback.hover) G.C.text('> BACK <', 100, 50);
    else G.C.text('BACK', 100, 50);
    G.C.fillStyle = 'white';
    G.C.textAlign = 'left';
    if (G.trackSelect.page < Math.floor((G.trackSelect.available.length - 1) / 2)) {
        if (G.nav.buttons.tnext.hover) G.C.text('NEXT >', Math.round(G.width / 2) + 100, G.height - 50);
        else G.C.text('NEXT', Math.round(G.width / 2) + 100, G.height - 50);
    }
    G.C.textAlign = 'right';
    if (G.trackSelect.page > 0) {
        if (G.nav.buttons.tprev.hover) G.C.text('< PREVIOUS', Math.round(G.width / 2) - 100, G.height - 50);
        else G.C.text('PREVIOUS', Math.round(G.width / 2) - 100, G.height - 50);
    }
    G.C.textAlign = 'center';
    /** @type {Track[]} */
    let tracks = [];
    for (const track in G.data.maps) {
        if (G.trackSelect.available.includes(G.data.maps[track].id)) {
            tracks.push(G.data.maps[track]);
        }
    }
    tracks.sort((a, b) => a.difficulty - b.difficulty);
    if (G.trackSelect.page * 2 < G.trackSelect.available.length) {
        G.C.font = "24px 'Press Start 2P', monospace";
        if (G.nav.buttons.tleft.hover) G.C.text("> " + tracks[G.trackSelect.page * 2].name + " <", Math.round(G.width / 2 - G.width / 4), 260)
        else G.C.text(tracks[G.trackSelect.page * 2].name, Math.round(G.width / 2 - G.width / 4), 260);
        G.C.font = "16px 'Press Start 2P', monospace";
        G.C.text(tracks[G.trackSelect.page * 2].desc, Math.round(G.width / 2 - G.width / 4), 286);
        switch (tracks[G.trackSelect.page * 2].difficulty) {
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
        G.C.text(`Difficulty: [${"X".repeat(tracks[G.trackSelect.page * 2].difficulty)}${" ".repeat(10 - tracks[G.trackSelect.page * 2].difficulty)}]`, Math.round(G.width / 2 - G.width / 4), 310);
        DrawMiniMap(tracks[G.trackSelect.page * 2], Math.round(G.width / 2 - G.width / 4 - G.width / 6), 320, Math.round(G.width / 3), Math.round(((G.width / 3) / tracks[G.trackSelect.page * 2].map.size[0]) * tracks[G.trackSelect.page * 2].map.size[1]));
    }
    if (G.trackSelect.page * 2 + 1 < G.trackSelect.available.length) {
        G.C.font = "24px 'Press Start 2P', monospace";
        if (G.nav.buttons.tright.hover) G.C.text("> " + tracks[G.trackSelect.page * 2 + 1].name + " <", Math.round(G.width / 2 + G.width / 4), 260);
        else G.C.text(tracks[G.trackSelect.page * 2 + 1].name, Math.round(G.width / 2 + G.width / 4), 260);
        G.C.font = "16px 'Press Start 2P', monospace";
        G.C.text(tracks[G.trackSelect.page * 2 + 1].desc, Math.round(G.width / 2 + G.width / 4), 286);
        switch (tracks[G.trackSelect.page * 2 + 1].difficulty) {
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
        G.C.text(`Difficulty: [${"X".repeat(tracks[G.trackSelect.page * 2 + 1].difficulty)}${" ".repeat(10 - tracks[G.trackSelect.page * 2 + 1].difficulty)}]`, Math.round(G.width / 2 + G.width / 4), 310);
        DrawMiniMap(tracks[G.trackSelect.page * 2 + 1], Math.round(G.width / 2 + G.width / 4 - G.width / 6), 320, Math.round(G.width / 3), Math.floor(G.height / 5 * 2));
    }
    G.C.textAlign = 'left';
});

//W-SCENE:G // GAME
new Scene('g', () => {
    //TRACK
    for (const tile of G.objects.tiles) {
        img = G.data.textures[tile.texture];
        G.C.drawImage(img.atlas.img,
            img.xpos,
            img.ypos,
            img.atlas.config.size[0],
            img.atlas.config.size[1],
            tile.x * img.atlas.config.scale[0] + G.offset.X,
            tile.y * img.atlas.config.scale[1] + G.offset.Y,
            img.atlas.config.scale[0],
            img.atlas.config.scale[1]);
    }
    for (const location of G.objects.locations) {
        img = G.data.textures[location.texture];
        G.C.drawImage(img.atlas.img,
            img.xpos,
            img.ypos,
            img.atlas.config.size[0],
            img.atlas.config.size[1],
            location.x * img.atlas.config.scale[0] + G.offset.X,
            location.y * img.atlas.config.scale[1] + G.offset.Y,
            img.atlas.config.scale[0],
            img.atlas.config.scale[1]);
    }
    //ENEMIES
    for (const enemy of G.objects.enemies) {
        img = G.data.textures[enemy.texture];
        G.C.drawImage(img.atlas.img,
            img.xpos,
            img.ypos,
            img.atlas.config.size[0],
            img.atlas.config.size[1],
            enemy.x * img.atlas.config.scale[0] - img.atlas.config.scale[0] / 2 + G.offset.X,
            enemy.y * img.atlas.config.scale[1] - img.atlas.config.scale[1] / 2 + G.offset.Y,
            img.atlas.config.scale[0],
            img.atlas.config.scale[1]);
    }
    if (G.data.scale < 0.75) return;
    for (const enemy of G.objects.enemies) {
        img = G.data.textures[enemy.texture];
        G.C.fillStyle = enemy.color1;
        G.C.fillRect(
            Math.round(enemy.x * img.atlas.config.scale[0] - (enemy.size[0] / img.atlas.config.defaultscale[0] / 2 * img.atlas.config.scale[0]) + G.offset.X),
            Math.round(enemy.y * img.atlas.config.scale[1] - (enemy.size[0] / img.atlas.config.defaultscale[1] / 2 * img.atlas.config.scale[1]) + G.offset.Y),
            Math.round((enemy.size[0] * (enemy.hp / enemy.maxhp)) / img.atlas.config.defaultscale[0] * img.atlas.config.scale[0]),
            Math.round(4 / img.atlas.config.defaultscale[1] * img.atlas.config.scale[1])
        );
        G.C.strokeStyle = enemy.color2;
        G.C.lineWidth = 1;
        G.C.strokeRect(
            Math.round(enemy.x * img.atlas.config.scale[0] - (enemy.size[0] / img.atlas.config.defaultscale[0] / 2 * img.atlas.config.scale[0]) + G.offset.X),
            Math.round(enemy.y * img.atlas.config.scale[1] - (enemy.size[0] / img.atlas.config.defaultscale[1] / 2 * img.atlas.config.scale[1]) + G.offset.Y),
            Math.round((enemy.size[0] * (enemy.hp / enemy.maxhp)) / img.atlas.config.defaultscale[0] * img.atlas.config.scale[0]),
            Math.round(4 / img.atlas.config.defaultscale[1] * img.atlas.config.scale[1])
        );
    }
    //TOWERS
    //RENDERING ORDER: TOWERS
    for (const defense of G.objects.buildings) {
        img = G.data.textures[defense.texture];
        G.C.drawImage(img.atlas.img,
            img.xpos,
            img.ypos,
            img.atlas.config.size[0],
            img.atlas.config.size[1],
            defense.x * img.atlas.config.scale[0] + G.offset.X,
            defense.y * img.atlas.config.scale[1] + G.offset.Y,
            img.atlas.config.scale[0],
            img.atlas.config.scale[1]);
        img = G.data.textures[defense.turret];
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
        G.C.translate(img.atlas.config.scale[0] * (defense.x + 0.5) + G.offset.X, img.atlas.config.scale[1] * (defense.y + 0.5) + G.offset.Y);
        G.C.rotate(defense.direction * Math.PI / 180);
        G.C.drawImage(
            img.atlas.P,
            - img.atlas.config.scale[0] / 2,
            - img.atlas.config.scale[1] / 2
        );
        G.C.restore();
    }
    for (const projectile of G.objects.projectiles) {
        G.C.strokeStyle = projectile.color;
        G.C.lineWidth = projectile.width * G.data.scale;
        G.C.beginPath();
        G.C.moveTo(projectile.x1 * G.data.tileSize[0] + G.offset.X, projectile.y1 * G.data.tileSize[0] + G.offset.Y);
        G.C.lineTo(projectile.x2 * G.data.tileSize[1] + G.offset.X, projectile.y2 * G.data.tileSize[1] + G.offset.Y);
        G.C.stroke();
    }
    //RENDERING ORDER: TOWER RANGE
    for (const defense of G.objects.buildings) {
        if (defense.x != G.data.cursor.X || defense.y != G.data.cursor.Y || !G.data.cursor.on) continue;
        img = G.data.textures[defense.texture];
        G.C.strokeStyle = defense.color + '77';
        G.C.lineWidth = 2;
        gradient = G.C.createRadialGradient(img.atlas.config.scale[0] * (defense.x + 0.5) + G.offset.X, img.atlas.config.scale[1] * (defense.y + 0.5) + G.offset.Y, 0,
            img.atlas.config.scale[0] * (defense.x + 0.5) + G.offset.X, img.atlas.config.scale[1] * (defense.y + 0.5) + G.offset.Y,
            defense.range * img.atlas.config.scale[0]);
        gradient.addColorStop(0, defense.color + '00');
        gradient.addColorStop(0.6, defense.color + '11');
        gradient.addColorStop(1, defense.color + '66');
        G.C.fillStyle = gradient;
        G.C.beginPath();
        G.C.arc(img.atlas.config.scale[0] * (defense.x + 0.5) + G.offset.X, img.atlas.config.scale[1] * (defense.y + 0.5) + G.offset.Y,
            defense.range * img.atlas.config.scale[0], 0, 2 * Math.PI);
        G.C.stroke();
        G.C.fill();
    }
    //CURSOR
    if (G.data.cursor.on) {
        texture = 'selected-invalid';
        try { if (getTile(G.data.cursor.X, G.data.cursor.Y).type == 'platform') { texture = 'selected'; } } catch { };
        img = G.data.textures[texture];
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
        G.C.translate(img.atlas.config.scale[0] * (G.data.cursor.X + 0.5) + G.offset.X, img.atlas.config.scale[1] * (G.data.cursor.Y + 0.5) + G.offset.Y);
        G.C.rotate(G.data.cursor.pos * Math.PI / 180);
        G.C.drawImage(
            img.atlas.P,
            -img.atlas.config.scale[0] / 2,
            -img.atlas.config.scale[1] / 2
        );
        G.C.restore();
    }
    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).type == 'platform' && G.data.cursor.on) G.toolBar.on = true;
    else G.toolBar.on = false;
    if (G.toolBar.on && G.toolBar.anim < 50) G.toolBar.anim = Math.min(G.toolBar.anim + 500 / F.time, 50);
    if (!G.toolBar.on && G.toolBar.anim > 0) G.toolBar.anim = Math.max(G.toolBar.anim - 500 / F.time, 0);
    offset = (96 * Math.sin((Math.PI / 50) * (G.toolBar.anim - 25)) + 96);
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
        let gradient = G.C.createLinearGradient(0, 48, 0, G.height - offset);
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
    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).tower == null) G.C.fillStyle = 'white';
    else G.C.fillStyle = getTile(G.data.cursor.X, G.data.cursor.Y, true).tower.color;
    G.C.textBaseline = 'top';
    G.C.font = "24px 'Press Start 2P', monospace";
    //W-UI:INFOBOX
    if (getTile(G.data.cursor.X, G.data.cursor.Y, true).tower == null && G.toolBar.on) {
        G.C.text("Platform [Lv. -]", 10, G.height - offset + 10,);
        G.C.font = "16px 'Press Start 2P', monospace";
        G.C.strokeStyle = 'gray';
        G.C.lineWidth = 2;
        G.C.textAlign = 'center';

        if (G.points < G.data.buildings.basic.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.data.buildings.basic.color;
        G.C.text(`[${G.data.buildings.basic.cost}p] ${G.data.buildings.basic.name}`, Math.floor(G.width / 6), G.height - offset + 80);
        G.C.strokeRect(0, G.height - offset + 68, Math.floor((G.width) / 3), 40);

        if (G.points < G.data.buildings.sniper.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.data.buildings.sniper.color;
        G.C.text(`[${G.data.buildings.sniper.cost}p] ${G.data.buildings.sniper.name}`, Math.floor(G.width / 6 * 3), G.height - offset + 80);
        G.C.strokeRect(Math.floor(G.width / 3), G.height - offset + 68, Math.floor((G.width) / 3), 40);

        if (G.points < G.data.buildings.beam.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.data.buildings.beam.color;
        G.C.text(`[${G.data.buildings.beam.cost}p] ${G.data.buildings.beam.name}`, Math.floor(G.width / 6 * 5), G.height - offset + 80);
        G.C.strokeRect(Math.floor(G.width / 3 * 2), G.height - offset + 68, Math.floor((G.width) / 3), 40);

        if (G.points < G.data.buildings.multi.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.data.buildings.multi.color;
        G.C.text(`[${G.data.buildings.multi.cost}p] ${G.data.buildings.multi.name}`, Math.floor(G.width / 6), G.height - offset + 120);
        G.C.strokeRect(0, G.height - offset + 108, Math.floor((G.width) / 3), 40);

        if (G.points < G.data.buildings.aura.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.data.buildings.aura.color;
        G.C.text(`[${G.data.buildings.aura.cost}p] ${G.data.buildings.aura.name}`, Math.floor(G.width / 6 * 3), G.height - offset + 120);
        G.C.strokeRect(Math.floor(G.width / 3), G.height - offset + 108, Math.floor((G.width) / 3), 40);

        if (G.points < G.data.buildings.super.cost) G.C.fillStyle = 'gray';
        else G.C.fillStyle = G.data.buildings.super.color;
        G.C.text(`[${G.data.buildings.super.cost}p] ${G.data.buildings.super.name}`, Math.floor(G.width / 6 * 5), G.height - offset + 120);
        G.C.strokeRect(Math.floor(G.width / 3 * 2), G.height - offset + 108, Math.floor((G.width) / 3), 40);

        G.C.textAlign = 'left';
    } else if (G.toolBar.on) {
        tower = getTile(G.data.cursor.X, G.data.cursor.Y, true).tower;
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
        G.C.fillStyle = G.targeting.all[tower.targeting].color;
        G.C.text(G.targeting.all[tower.targeting].name, Math.round(G.width / 2) + 100, G.height - offset + 10);
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
    if (!G.settings.MORESPEED) switch (G.speed) {
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
    if (G.settings.MORESPEED) switch (G.speed) {
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
    DrawMiniMap(G.data.maps[G.map], G.width - G.settings.mapx, G.height - offset - G.settings.mapy, G.settings.mapx, G.settings.mapy, G.objects.enemies, G.objects.buildings);
    G.C.textAlign = 'left';
    //W-UI:FPS
    G.C.font = "16px 'Press Start 2P', monospace";
    G.C.fillStyle = 'white';
    G.C.text(Math.round(F.fps.reduce((a, b) => a + b) / F.fps.length), 6, G.height - offset - 6);
});