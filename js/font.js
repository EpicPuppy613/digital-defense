let fonts = [];
for (let f = 8; f <= 64; f += 8) {
    let font = new Image();
    font.src = 'font/' + f + 'px.png';
    font.C = new OffscreenCanvas(G.width, G.height);
    font.CX = font.C.getContext('2d');
    fonts.push(font);
}

CanvasRenderingContext2D.prototype.text = function(text, x, y) {
    let size = this.font.split(' ')[0].split('px')[0];
    let xpos = 0;
    //STARTING X POS
    if (this.textAlign == 'left') {
        xpos = x;
    }
    else if (this.textAlign == 'center') {
        xpos = x - (text.length * size / 2);
    }
    else if (this.textAlign == 'right') {
        xpos = x - (text.length * size);
    }
    //GET IMAGE
    let texturesize = Math.round(size / 8) * 8;
    let texture = fonts[Math.round(size / 8) - 1];
    texture.CX.clearRect(0, 0, G.width, G.height);
    //ITERATE THROUGH TEXT
    for (let i = 0; i < text.length; i++) {
        //GET CHARACTER LOCATION ON SPRITESHEET
        let loc = text.charCodeAt(i);
        if (loc > 126 || loc < 32) continue;
        loc -= 32;
        //GET SPRITE LOCATION
        let xloc = Math.floor(loc % 12);
        let yloc = Math.floor(loc / 12);
        //DRAW SPRITE
        let ypos = 0;
        switch (this.textBaseline) {
            case 'top':
                ypos = y;
                break;
            case 'middle':
                ypos = y - size / 2;
                break;
            case 'alphabetic':
                ypos = y - size;
                break;
            case 'bottom':
                ypos = y - size;
                break;
        }
        texture.CX.drawImage(texture, xloc * texturesize, yloc * texturesize, texturesize, texturesize, xpos + i * size, ypos, texturesize, texturesize);
    }
    //DRAW COLOR
    texture.CX.globalCompositeOperation = 'source-atop';
    texture.CX.fillStyle = this.fillStyle;
    texture.CX.fillRect(0, 0, G.width, G.height);
    texture.CX.globalCompositeOperation = 'source-over';
    //RENDER TEXT
    this.drawImage(texture.C, 0, 0);
}
CanvasRenderingContext2D.prototype.textWidth = function(text) {
    let size = this.font.split(' ')[0].split('px')[0];
    return {width: text.length * size};
}