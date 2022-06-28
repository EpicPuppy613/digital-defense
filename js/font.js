var fonts = [];
for (var f = 8; f <= 64; f += 8) {
    var font = new Image();
    font.src = 'font/' + f + 'px.png';
    font.C = new OffscreenCanvas(f, f);
    font.CX = font.C.getContext('2d');
    fonts.push(font);
}

CanvasRenderingContext2D.prototype.text = function(text, x, y) {
    var size = this.font.split(' ')[0].split('px')[0];
    //STARTING X POS
    if (this.textAlign == 'left') {
        var xpos = x;
    }
    else if (this.textAlign == 'center') {
        var xpos = x - (text.length * size / 2);
    }
    else if (this.textAlign == 'right') {
        var xpos = x - (text.length * size);
    }
    //ITERATE THROUGH TEXT
    for (var i = 0; i < text.length; i++) {
        //GET CHARACTER LOCATION ON SPRITESHEET
        var loc = text.charCodeAt(i);
        if (loc > 126 || loc < 32) continue;
        loc -= 32;
        //GET SPRITE LOCATION
        var xloc = Math.floor(loc % 12);
        var yloc = Math.floor(loc / 12);
        //GET IMAGE
        var texturesize = Math.round(size / 8) * 8;
        var texture = fonts[Math.round(size / 8) - 1];
        //DRAW SPRITE
        texture.CX.clearRect(0, 0, texture.C.width, texture.C.height);
        texture.CX.drawImage(texture, xloc * texturesize, yloc * texturesize, texturesize, texturesize, 0, 0, texturesize, texturesize);
        //DRAW COLOR
        texture.CX.globalCompositeOperation = 'source-atop';
        texture.CX.fillStyle = this.fillStyle;
        texture.CX.fillRect(0, 0, texturesize, texturesize);
        texture.CX.globalCompositeOperation = 'source-over';
        if (this.textBaseline == 'top') this.drawImage(texture.C, 0, 0, texturesize, texturesize, xpos + i * size, y, size, size);
        else if (this.textBaseline == 'middle') this.drawImage(texture.C, 0, 0, texturesize, texturesize, xpos + i * size, y - size / 2, size, size);
        else if (this.textBaseline == 'alphabetic') this.drawImage(texture.C, 0, 0, texturesize, texturesize, xpos + i * size, y - size, size, size);
        else if (this.textBaseline == 'bottom') this.drawImage(texture.C, 0, 0, texturesize, texturesize, xpos + i * size, y - size, size, size);
    }
}
CanvasRenderingContext2D.prototype.textWidth = function(text) {
    var size = this.font.split(' ')[0].split('px')[0];
    return {width: text.length * size};
}