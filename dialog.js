

function myDialog() {

    objects = [];
    originX = 800;
    originY = 650;
    const rect = new Phaser.Geom.Rectangle(originX, originY, 200,100);
    const graphics = this.add.graphics({fillStyle: {color: 0xff0000}});
    const dialog = graphics.fillRectShape(rect);
    const text = this.add.text(originX + 10, originY + 10, content)
    text.setWordWrapWidth(200)
    objects.push(dialog);
    objects.push(text);
    return objects;
}

