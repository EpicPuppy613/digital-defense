//W-BUTTON:M // MENU BUTTONS
new MenuButton("start", () => G.width / 2 - 250, 310, 500, 48, () => { G.scene = 't'; }, 'm');
new MenuButton("resume", () => G.width / 2 - 250, 420, 400, 36, () => { if (G.wave != 0) G.scene = 'g'; }, 'm');
new MenuButton("settings", () => G.width / 2 - 200, 500, 400, 36, () => { G.scene = 's'; G.audio.music.switch = true; }, 'm');
new MenuButton("editor", () => G.width / 2 - 200, 580, 400, 36, () => { G.scene = 'e' }, 'm');
new MenuButton("quit", () => G.width / 2 - 200, 660, 400, 36, () => { window.close() }, 'm');
//W-BUTTON:E // EDITOR BUTTONS
new MenuButton("eback", 0, 20, 200, 36, () => { G.scene = 'm' }, 'e');
new MenuButton("new", () => G.width / 2 - 200, 320, 400, 36, () => { NewGame("blank", true); G.scene = 'ee' }, 'e');
new MenuButton("load", () => G.width / 2 - 200, 400, 400, 36, () => { }, 'e');
new MenuButton("continue", () => G.width / 2 - 200, 480, 480, 36, () => { if (G.map == 'blank') G.scene = 'ee' }, 'e');
//W-BUTTON:EE // EDITOR BUTTONS
new MenuButton('eeback', 0, 0, () => G.width / 10, 32, () => { G.scene = 'e' }, 'ee');
new MenuButton('eesave', () => G.width / 10, 0, () => G.width / 10, 32, () => { G.scene = 'e' }, 'ee');
new MenuButton('eeexport', () => G.width / 10 * 2, 0, () => G.width / 10, 32, () => { ExportMap(); }, 'ee');
new MenuButton('eespawn', 0, () => G.height - 32, () => G.width / 7, 32, () => { ChangeTile('s'); }, 'ee');
new MenuButton('eeleft', () => G.width / 7, () => G.height - 32, () => G.width / 7, 32, () => { ChangeTile('l'); }, 'ee');
new MenuButton('eeright', () => G.width / 7 * 2, () => G.height - 32, () => G.width / 7, 32, () => { ChangeTile('r'); }, 'ee');
new MenuButton('eeup', () => G.width / 7 * 3, () => G.height - 32, () => G.width / 7, 32, () => { ChangeTile('u'); }, 'ee');
new MenuButton('eedown', () => G.width / 7 * 4, () => G.height - 32, () => G.width / 7, 32, () => { ChangeTile('d'); }, 'ee');
new MenuButton('eebase', () => G.width / 7 * 5, () => G.height - 32, () => G.width / 7, 32, () => { ChangeTile('b'); }, 'ee');
new MenuButton('eeplatform', () => G.width / 7 * 6, () => G.height - 32, () => G.width / 7, 32, () => { ChangeTile('p'); }, 'ee');
//W-BUTTON:S // SETTINGS BUTTONS
new MenuButton("sback", 0, 20, 200, 36, () => { G.scene = 'm'; G.audio.music.switch = true; }, 's');
new MenuButton("bindings", () => G.width / 2 - 200, 320, 400, 36, () => { G.scene = 'sb' }, 's');
new MenuButton("default", () => G.width / 2 - 200, 400, 400, 36, () => { if (confirm("Are you sure?\nThis will reset all key bindings to default and reload the page.")) { window.localStorage.setItem('keys', null); location.reload(); } }, 's');
new MenuButton("graphics", () => G.width / 2 - 200, 480, 400, 36, () => { G.scene = 'sg' }, 's');
new MenuButton("sound", () => G.width / 2 - 200, 560, 400, 36, () => { G.scene = 'ss' }, 's');
//W-BUTTON:SS // SETTINGS: SOUND
new MenuButton("ssback", 0, 20, 200, 36, () => { G.scene = 's' }, 'ss');
new MenuButton("musicdown", () => G.width / 2 - 200, 360, 200, 36, (e) => { 
    if (e.shiftKey) G.audio.volume.music = Math.max(0, Math.round((G.audio.volume.music - 0.25) * 20) / 20);
    else G.audio.volume.music = Math.max(0, Math.round((G.audio.volume.music - 0.05) * 20) / 20);
    window.localStorage.setItem('sound', JSON.stringify([G.audio.volume.music, G.audio.volume.sfx]));
}, 'ss');
new MenuButton("musicup", () => G.width / 2, 360, 200, 36, (e) => { 
    if (e.shiftKey) G.audio.volume.music = Math.min(1, Math.round((G.audio.volume.music + 0.25) * 20) / 20);
    else G.audio.volume.music = Math.min(1, Math.round((G.audio.volume.music + 0.05) * 20) / 20);
    window.localStorage.setItem('sound', JSON.stringify([G.audio.volume.music, G.audio.volume.sfx]));
}, 'ss');
new MenuButton("sfxdown", () => G.width / 2 - 200, 440, 200, 36, (e) => { 
    if (e.shiftKey) G.audio.volume.sfx = Math.max(0, Math.round((G.audio.volume.sfx - 0.25) * 20) / 20);
    else G.audio.volume.sfx = Math.max(0, Math.round((G.audio.volume.sfx - 0.05) * 20) / 20);
    window.localStorage.setItem('sound', JSON.stringify([G.audio.volume.music, G.audio.volume.sfx]));
}, 'ss');
new MenuButton("sfxup", () => G.width / 2, 440, 200, 36, (e) => { 
    if (e.shiftKey) G.audio.volume.sfx = Math.min(1, Math.round((G.audio.volume.sfx + 0.25) * 20) / 20);
    else G.audio.volume.sfx = Math.min(1, Math.round((G.audio.volume.sfx + 0.05) * 20) / 20);
    window.localStorage.setItem('sound', JSON.stringify([G.audio.volume.music, G.audio.volume.sfx]));
}, 'ss');
//W-BUTTON:SB // SETTINGS: BINDINGS BUTTONS
new MenuButton("sbback", 0, 20, 200, 36, () => { G.scene = 's' }, 'sb');
new MenuButton("sbnext", () => Math.round(G.width / 2) + 50, () => G.height - 80, 300, 36, () => { G.rebind.page = Math.min(G.rebind.bindings.length - 1, G.rebind.page + 1); G.rebind.current = undefined }, 'sb');
new MenuButton("sbprev", () => Math.round(G.width / 2) - 350, () => G.height - 80, 300, 36, () => { G.rebind.page = Math.max(0, G.rebind.page - 1); G.rebind.current = undefined }, 'sb');
new MenuButton("sbbind0", () => Math.round(G.width / 2) - 250, 290, 500, 36, () => { G.rebind.current = G.rebind.bindings[G.rebind.page].bindings[0] }, 'sb');
new MenuButton("sbbind1", () => Math.round(G.width / 2) - 250, 340, 500, 36, () => { G.rebind.current = G.rebind.bindings[G.rebind.page].bindings[1] }, 'sb');
new MenuButton("sbbind2", () => Math.round(G.width / 2) - 250, 390, 500, 36, () => { G.rebind.current = G.rebind.bindings[G.rebind.page].bindings[2] }, 'sb');
new MenuButton("sbbind3", () => Math.round(G.width / 2) - 250, 440, 500, 36, () => { G.rebind.current = G.rebind.bindings[G.rebind.page].bindings[3] }, 'sb');
new MenuButton("sbbind4", () => Math.round(G.width / 2) - 250, 490, 500, 36, () => { G.rebind.current = G.rebind.bindings[G.rebind.page].bindings[4] }, 'sb');
new MenuButton("sbbind5", () => Math.round(G.width / 2) - 250, 540, 500, 36, () => { G.rebind.current = G.rebind.bindings[G.rebind.page].bindings[5] }, 'sb');
new MenuButton("sbbind6", () => Math.round(G.width / 2) - 250, 590, 500, 36, () => { G.rebind.current = G.rebind.bindings[G.rebind.page].bindings[6] }, 'sb');
new MenuButton("sbbind7", () => Math.round(G.width / 2) - 250, 640, 500, 36, () => { G.rebind.current = G.rebind.bindings[G.rebind.page].bindings[7] }, 'sb');
//W-BUTTON:T
new MenuButton("tback", 0, 20, 200, 36, () => { G.scene = 'm' }, 't');
new MenuButton("tnext", () => Math.round(G.width / 2) + 50, () => G.height - 80, 300, 36, () => { G.trackSelect.page = Math.min(Math.floor((G.trackSelect.available.length - 1) / 2), G.trackSelect.page + 1) }, 't');
new MenuButton("tprev", () => Math.round(G.width / 2) - 350, () => G.height - 80, 300, 36, () => { G.trackSelect.page = Math.max(0, G.trackSelect.page - 1) }, 't');
new MenuButton("tleft", 50, 180, () => Math.round(G.width / 2) - 100, 450, function () {
    let tracks = [];
    for (const track in G.data.maps) {
        if (G.trackSelect.available.includes(G.data.maps[track].id)) {
            tracks.push(G.data.maps[track]);
        }
    }
    tracks.sort((a, b) => a.difficulty - b.difficulty);
    if (G.trackSelect.page * 2 < G.trackSelect.available.length) {
        NewGame(tracks[G.trackSelect.page * 2].id); G.scene = 'g';
        G.audio.music.switch = true;
    }
}, 't');
new MenuButton("tright", () => Math.round(G.width / 2) + 50, 180, () => Math.round(G.width / 2) - 100, 450, function () {
    let tracks = [];
    for (const track in G.data.maps) {
        if (G.trackSelect.available.includes(G.data.maps[track].id)) {
            tracks.push(G.data.maps[track]);
        }
    }
    tracks.sort((a, b) => a.difficulty - b.difficulty);
    if (G.trackSelect.page * 2 + 1 < G.trackSelect.available.length) { 
        NewGame(tracks[G.trackSelect.page * 2 + 1].id); G.scene = 'g'; 
        G.audio.music.switch = true;
    }
}, 't');
//W-BUTTON:SG // SETTINGS: GRAPHICS BUTTONS
new MenuButton("sgback", 0, 20, 200, 36, () => { G.scene = 's' }, 'sg');
new MenuButton("rescale", () => G.width / 2 - 200, 320, 400, 36, () => { 
    G.width = window.innerWidth; 
    G.height = window.innerHeight; 
    G.canvas.width = G.width; 
    G.canvas.height = G.height;
    for (const font of fonts) {
        font.C.width = G.width;
        font.C.height = G.height;
    }
}, 'sg');
new MenuButton("fpsdown", () => G.width / 2 - 200, 440, 200, 36, () => { FrameLimit(-1) }, 'sg');
new MenuButton("fpsup", () => G.width / 2, 440, 200, 36, () => { FrameLimit(1) }, 'sg');