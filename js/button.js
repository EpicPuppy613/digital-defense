//W-BUTTON:M // MENU BUTTONS
new MenuButton("start", () => G.width / 2 - 250, 310, 500, 48, () => { G.scene = 't'; }, 'm');
new MenuButton("resume", () => G.width / 2 - 250, 420, 400, 36, () => { if (G.wave != 0) G.scene = 'g'; }, 'm');
new MenuButton("settings", () => G.width / 2 - 200, 500, 400, 36, () => { G.scene = 's'; A.M.S = true; }, 'm');
new MenuButton("editor", () => G.width / 2 - 200, 580, 400, 36, () => { G.scene = 'e' }, 'm');
new MenuButton("quit", () => G.width / 2 - 200, 660, 400, 36, () => { window.close() }, 'm');
//W-BUTTON:E // EDITOR BUTTONS
new MenuButton("eback", 0, 20, 200, 36, () => { G.scene = 'm' }, 'e');
new MenuButton("new", () => G.width / 2 - 200, 320, 400, 36, () => { NewGame("blank"); G.scene = 'ee' }, 'e');
new MenuButton("load", () => G.width / 2 - 200, 400, 400, 36, () => { }, 'e');
new MenuButton("continue", () => G.width / 2 - 200, 480, 480, 36, () => { if (G.map == 'blank') G.scene = 'ee' }, 'e');
//W-BUTTON:EE // EDITOR BUTTONS
new MenuButton('eeback', 0, 0, () => G.width / 10, 32, () => { G.scene = 'e' }, 'ee');
new MenuButton('eesave', () => G.width / 10, 0, () => G.width / 10, 32, () => { G.scene = 'e' }, 'ee');
new MenuButton('eeleft', 0, () => G.height - 32, () => G.width / 6, 32, () => { if (E.D.L) E.D.L = false; else if (!E.D.B && !E.D.P) E.D.L = true; }, 'ee');
new MenuButton('eeright', () => G.width / 6, () => G.height - 32, () => G.width / 6, 32, () => { if (E.D.R) E.D.R = false; else if (!E.D.B && !E.D.P) E.D.R = true; }, 'ee');
new MenuButton('eeup', () => G.width / 6 * 2, () => G.height - 32, () => G.width / 6, 32, () => { if (E.D.U) E.D.U = false; else if (!E.D.B && !E.D.P) E.D.U = true; }, 'ee');
new MenuButton('eedown', () => G.width / 6 * 3, () => G.height - 32, () => G.width / 6, 32, () => { if (E.D.D) E.D.D = false; else if (!E.D.B && !E.D.P) E.D.D = true; }, 'ee');
new MenuButton('eebase', () => G.width / 6 * 4, () => G.height - 32, () => G.width / 6, 32, () => { if (E.D.B) E.D.B = false; else if (!E.D.P) {E.D.B = true; E.D.L = false; E.D.R = false; E.D.U = false; E.D.D = false;} }, 'ee');
new MenuButton('eeplatform', () => G.width / 6 * 5, () => G.height - 32, () => G.width / 6, 32, () => { if (E.D.P) E.D.P = false; else {E.D.P = true; E.D.B = false; E.D.L = false; E.D.R = false; E.D.U = false; E.D.D = false;} }, 'ee');
//W-BUTTON:S // SETTINGS BUTTONS
new MenuButton("sback", 0, 20, 200, 36, () => { G.scene = 'm'; A.M.S = true; }, 's');
new MenuButton("bindings", () => G.width / 2 - 200, 320, 400, 36, () => { G.scene = 'sb' }, 's');
new MenuButton("default", () => G.width / 2 - 200, 400, 400, 36, () => { if (confirm("Are you sure?\nThis will reset all key bindings to default and reload the page.")) { window.localStorage.setItem('keys', null); location.reload(); } }, 's');
new MenuButton("graphics", () => G.width / 2 - 200, 480, 400, 36, () => { G.scene = 'sg' }, 's');
new MenuButton("sound", () => G.width / 2 - 200, 560, 400, 36, () => { G.scene = 'ss' }, 's');
//W-BUTTON:SS // SETTINGS: SOUND
new MenuButton("ssback", 0, 20, 200, 36, () => { G.scene = 's' }, 'ss');
new MenuButton("musicdown", () => G.width / 2 - 200, 360, 200, 36, (e) => { 
    if (e.shiftKey) A.V.M = Math.max(0, Math.round((A.V.M - 0.25) * 20) / 20);
    else A.V.M = Math.max(0, Math.round((A.V.M - 0.05) * 20) / 20);
    window.localStorage.setItem('sound', JSON.stringify([A.V.M, A.V.S]));
}, 'ss');
new MenuButton("musicup", () => G.width / 2, 360, 200, 36, (e) => { 
    if (e.shiftKey) A.V.M = Math.min(1, Math.round((A.V.M + 0.25) * 20) / 20);
    else A.V.M = Math.min(1, Math.round((A.V.M + 0.05) * 20) / 20);
    window.localStorage.setItem('sound', JSON.stringify([A.V.M, A.V.S]));
}, 'ss');
new MenuButton("sfxdown", () => G.width / 2 - 200, 440, 200, 36, (e) => { 
    if (e.shiftKey) A.V.S = Math.max(0, Math.round((A.V.S - 0.25) * 20) / 20);
    else A.V.S = Math.max(0, Math.round((A.V.S - 0.05) * 20) / 20);
    window.localStorage.setItem('sound', JSON.stringify([A.V.M, A.V.S]));
}, 'ss');
new MenuButton("sfxup", () => G.width / 2, 440, 200, 36, (e) => { 
    if (e.shiftKey) A.V.S = Math.min(1, Math.round((A.V.S + 0.25) * 20) / 20);
    else A.V.S = Math.min(1, Math.round((A.V.S + 0.05) * 20) / 20);
    window.localStorage.setItem('sound', JSON.stringify([A.V.M, A.V.S]));
}, 'ss');
//W-BUTTON:SB // SETTINGS: BINDINGS BUTTONS
new MenuButton("sbback", 0, 20, 200, 36, () => { G.scene = 's' }, 'sb');
new MenuButton("sbnext", () => Math.round(G.width / 2) + 50, () => G.height - 80, 300, 36, () => { G.R.P = Math.min(S.length - 1, G.R.P + 1); G.R.R = undefined }, 'sb');
new MenuButton("sbprev", () => Math.round(G.width / 2) - 350, () => G.height - 80, 300, 36, () => { G.R.P = Math.max(0, G.R.P - 1); G.R.R = undefined }, 'sb');
new MenuButton("sbbind0", () => Math.round(G.width / 2) - 250, 290, 500, 36, () => { G.R.R = S[G.R.P].bindings[0] }, 'sb');
new MenuButton("sbbind1", () => Math.round(G.width / 2) - 250, 340, 500, 36, () => { G.R.R = S[G.R.P].bindings[1] }, 'sb');
new MenuButton("sbbind2", () => Math.round(G.width / 2) - 250, 390, 500, 36, () => { G.R.R = S[G.R.P].bindings[2] }, 'sb');
new MenuButton("sbbind3", () => Math.round(G.width / 2) - 250, 440, 500, 36, () => { G.R.R = S[G.R.P].bindings[3] }, 'sb');
new MenuButton("sbbind4", () => Math.round(G.width / 2) - 250, 490, 500, 36, () => { G.R.R = S[G.R.P].bindings[4] }, 'sb');
new MenuButton("sbbind5", () => Math.round(G.width / 2) - 250, 540, 500, 36, () => { G.R.R = S[G.R.P].bindings[5] }, 'sb');
new MenuButton("sbbind6", () => Math.round(G.width / 2) - 250, 590, 500, 36, () => { G.R.R = S[G.R.P].bindings[6] }, 'sb');
new MenuButton("sbbind7", () => Math.round(G.width / 2) - 250, 640, 500, 36, () => { G.R.R = S[G.R.P].bindings[7] }, 'sb');
//W-BUTTON:T
new MenuButton("tback", 0, 20, 200, 36, () => { G.scene = 'm' }, 't');
new MenuButton("tnext", () => Math.round(G.width / 2) + 50, () => G.height - 80, 300, 36, () => { G.TS.page = Math.min(Math.floor((G.TS.A.length - 1) / 2), G.TS.page + 1) }, 't');
new MenuButton("tprev", () => Math.round(G.width / 2) - 350, () => G.height - 80, 300, 36, () => { G.TS.page = Math.max(0, G.TS.page - 1) }, 't');
new MenuButton("tleft", 50, 180, () => Math.round(G.width / 2) - 100, 450, function () {
    var tracks = [];
    for (const track in G.A.M) {
        if (G.TS.A.includes(G.A.M[track].id)) {
            tracks.push(G.A.M[track]);
        }
    }
    tracks.sort((a, b) => a.difficulty - b.difficulty);
    if (G.TS.page * 2 < G.TS.A.length) {
        NewGame(tracks[G.TS.page * 2].id); G.scene = 'g';
        A.M.S = true;
    }
}, 't');
new MenuButton("tright", () => Math.round(G.width / 2) + 50, 180, () => Math.round(G.width / 2) - 100, 450, function () {
    var tracks = [];
    for (const track in G.A.M) {
        if (G.TS.A.includes(G.A.M[track].id)) {
            tracks.push(G.A.M[track]);
        }
    }
    tracks.sort((a, b) => a.difficulty - b.difficulty);
    if (G.TS.page * 2 + 1 < G.TS.A.length) { 
        NewGame(tracks[G.TS.page * 2 + 1].id); G.scene = 'g'; 
        A.M.S = true;
    }
}, 't');
//W-BUTTON:SG // SETTINGS: GRAPHICS BUTTONS
new MenuButton("sgback", 0, 20, 200, 36, () => { G.scene = 's' }, 'sg');
new MenuButton("rescale", () => G.width / 2 - 200, 320, 400, 36, () => { G.width = window.innerWidth; G.height = window.innerHeight; G.canvas.width = G.width; G.canvas.height = G.height }, 'sg');
new MenuButton("fpsdown", () => G.width / 2 - 200, 440, 200, 36, () => { FrameLimit(-1) }, 'sg');
new MenuButton("fpsup", () => G.width / 2, 440, 200, 36, () => { FrameLimit(1) }, 'sg');