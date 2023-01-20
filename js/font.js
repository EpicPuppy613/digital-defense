var fonts = [];
for (var f = 8; f <= 64; f += 8) {
    var font = new Image();
    font.src = 'font/' + f + 'px.png';
    font.C = new OffscreenCanvas(G.width, G.height);
    font.CX = font.C.getContext('2d');
    fonts.push(font);
}

CanvasRenderingContext2D.prototype.text = function(text, x, y) {
    var size = this.font.split(' ')[0].split('px')[0];
    var xpos = 0;
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
    var texturesize = Math.round(size / 8) * 8;
    var texture = fonts[Math.round(size / 8) - 1];
    texture.CX.clearRect(0, 0, G.width, G.height);
    //ITERATE THROUGH TEXT
    for (var i = 0; i < text.length; i++) {
        //GET CHARACTER LOCATION ON SPRITESHEET
        var loc = text.charCodeAt(i);
        if (loc > 126 || loc < 32) continue;
        loc -= 32;
        //GET SPRITE LOCATION
        var xloc = Math.floor(loc % 12);
        var yloc = Math.floor(loc / 12);
        //DRAW SPRITE
        var ypos = 0;
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
    var size = this.font.split(' ')[0].split('px')[0];
    return {width: text.length * size};
}