

function myDialog() {

    objects = [];
    originX = 810;
    originY = 580;
    const rect = new Phaser.Geom.Rectangle(originX, originY, 200,100);
    const graphics = this.add.graphics({fillStyle: {color: 0xff0000}});
    const dialog = this.add.sprite(originX, originY,chatwindow)
    const text = this.add.text(originX -200, originY-110, content, textConfig)
    setTimeout(function(){
        text = this.add.text(originX -200, originY-110, content2, textConfig)
    }, 1000)
    text.setWordWrapWidth(390)
    objects.push(dialog);
    objects.push(text);
    return objects;
}

