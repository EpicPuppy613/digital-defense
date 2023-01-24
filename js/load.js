async function LoadAsset(file, callback) {
    const data = await fetch(file + "?v=" + G.load.manifest.version);
    const json = await data.json();
    setTimeout(() => {callback(json)}, 0);
}

function LoadMaps() {
    let i = 0;
    for (const map of G.load.manifest.maps) {
        setTimeout(() => LoadAsset(map, (data) => {
            new Track(data.name, data.id, data.desc, data.tiles, data.locations, data.map, data.difficulty, data.show);
            G.load.stages[0].progress++;
            G.load.stages[0].percent = G.load.stages[0].progress / G.load.stages[0].total;
            G.load.percent = G.load.stages[0].percent / 6;
            if (G.load.stages[0].progress >= G.load.stages[0].total) {
                G.load.stage++;
            }
        }), 10 * i);
        i++
    }
}

function LoadEnemies() {
    let i = 0;
    for (const enemy of G.load.manifest.enemies) {
        setTimeout(() => LoadAsset(enemy, (data) => {
            G.data.enemies[data.id] = new EnemyPrototype(
                data.type, data.id, data.size, data.texture, data.hp, data.damage, data.speed, data.hitbox, data.reward, data.color1, data.color2, data.boss
                );
            G.load.stages[1].progress++;
            G.load.stages[1].percent = G.load.stages[1].progress / G.load.stages[1].total;
            G.load.percent = (1/6) + G.load.stages[1].percent / 6;
            if (G.load.stages[1].progress >= G.load.stages[1].total) {
                G.load.stage++;
            }
        }), 8 * i);
        i++;
    }
}

function LoadWaves() {
    let i = 0;
    for (const wave of G.load.manifest.waves) {
        setTimeout(() => LoadAsset(wave, (data) => {
            G.data.difficulties.W[data.id] = data;
            G.load.stages[2].progress++;
            G.load.stages[2].percent = G.load.stages[2].progress / G.load.stages[2].total;
            G.load.percent = (2/6) + G.load.stages[2].percent / 6;
            if (G.load.stages[2].progress >= G.load.stages[2].total) {
                G.load.stage++;
            }
        }), 20 * i);
        i++;
    }
}

function LoadTowers() {
    let i = 0;
    for (const tower of G.load.manifest.towers) {
        setTimeout(() => LoadAsset(tower, (data) => {
            G.data.buildings[data.id] = new TowerPrototype(
                data.name, data.type, data.texture, data.turret, data.firerate, data.damage, data.range, 
                data.color, data.offset, data.firewidth, data.fireduration, data.shots, data.cost
            );
            G.load.stages[3].progress++;
            G.load.stages[3].percent = G.load.stages[3].progress / G.load.stages[3].total;
            G.load.percent = (3/6) + G.load.stages[3].percent / 6;
            if (G.load.stages[3].progress >= G.load.stages[3].total) {
                G.load.stage++;
            }
        }), 8 * i);
        i++;
    }
}

function LoadUpgrades() {
    let i = 0;
    for (const upgrade of G.load.manifest.upgrades) {
        setTimeout(() => LoadAsset(upgrade, (data) => {
            if (G.data.upgrades[data.tower] === undefined) {
                G.data.upgrades[data.tower] = [];
            }
            G.data.upgrades[data.tower].push(new Upgrade(data.name, data.id, data.desc, data.tower, data.cost, data.req, data.add));
            G.load.stages[4].progress++;
            G.load.stages[4].percent = G.load.stages[4].progress / G.load.stages[4].total;
            G.load.percent = (4/6) + G.load.stages[4].percent / 6;
            if (G.load.stages[4].progress >= G.load.stages[4].total) {
                G.load.stage++;
            }
        }), 2 * i);
        i++;
    }
}

function LoadTextures() {
    let i = 0;
    for (const texture of G.load.manifest.textures) {
        setTimeout(() => LoadAsset(texture, (data) => {
            const config = new TextureConfig(data.config.sizex, data.config.sizey, data.config.tilex, data.config.tiley, data.config.scalex, data.config.scaley);
            const textures = [];
            for (const texture of data.textures) {
                textures.push(new TextureEntry(texture.id, texture.x, texture.y));
            }
            new TextureAtlas(data.id, data.src, config, textures);
            G.load.stages[5].progress++;
            G.load.stages[5].percent = G.load.stages[5].progress / G.load.stages[5].total;
            G.load.percent = (5/6) + G.load.stages[5].percent / 6;
            if (G.load.stages[5].progress >= G.load.stages[5].total) {
                G.load.stage++;
                G.scene = 'm';
            }
        }), 10 * i);
    }
}

async function LoadGame() {
    if (G.load.manifest === null) {
        const manifestRaw = await fetch("data/manifest.json");
        G.load.manifest = await manifestRaw.json();
        for (const manifest of G.load.manifest.manifests) {
            const newManifest = await fetch(manifest);
            G.load.manifest = {
                ...G.load.manifest,
                ...await newManifest.json()
            };
        }
        G.load.stages[0].total = G.load.manifest.maps.length;
        G.load.stages[1].total = G.load.manifest.enemies.length;
        G.load.stages[2].total = G.load.manifest.waves.length;
        G.load.stages[3].total = G.load.manifest.towers.length;
        G.load.stages[4].total = G.load.manifest.upgrades.length;
        G.load.stages[5].total = G.load.manifest.textures.length;
    }
    switch (G.load.stage) {
        case 0:
            if (G.load.loaded.includes("maps")) return;
            LoadMaps();
            G.load.loaded.push("maps");
            break;
        case 1:
            if (G.load.loaded.includes("enemies")) return;
            LoadEnemies();
            G.load.loaded.push("enemies");
            break;
        case 2:
            if (G.load.loaded.includes("waves")) return;
            LoadWaves();
            G.load.loaded.push("waves");
            break;
        case 3:
            if (G.load.loaded.includes("towers")) return;
            LoadTowers();
            G.load.loaded.push("towers");
            break;
        case 4:
            if (G.load.loaded.includes("upgrades")) return;
            LoadUpgrades();
            G.load.loaded.push("upgrades");
            break;
        case 5:
            if (G.load.loaded.includes("textures")) return;
            LoadTextures();
            LoadTextures();
            G.load.loaded.push("textures");
            break;
    }
}