

function myDialog() {
    this.sound.add('popupSound').play()

    objects = [];
    originX = 870;
    originY = 580;

    const dialog = this.add.sprite(originX, originY,chatwindow)
    const text = this.add.text(originX -130, originY-112, content, textConfig)
    text.setWordWrapWidth(250)

    objects.push(dialog);
    objects.push(text);
    
    return objects;
}

