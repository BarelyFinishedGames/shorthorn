function showTextfile(file, x, y) {
    const width = 423;
    const height = 311;

    let background = this.add.sprite(x + width / 2, y + height / 2, notepadWindow).setInteractive()
    const text = this.make.text({
        x: x + 20,
        y: y + 60,
        text: file.content,
        origin: 0,
        style: {
            font: 'bold 11px Arial',
            fill: 'black'
        }
    });
    text.setWordWrapWidth(width, false);
    this.add.text(text);

    const title = this.make.text({
        x: x + 10,
        y: y + 9,
        text: `${file.name} - notepad.exe`,
        origin: 0,
        style: {
            font: '10px Arial',
            fill: 'white'
        }
    });
    this.add.text(title)
    const closeBtnSize = 16
    const btnClose = this.add.sprite(x - 4 + width - closeBtnSize / 2, y + 6 + closeBtnSize / 2, closeIcon).setInteractive();
    btnClose.displayWidth = closeBtnSize
    btnClose.displayHeight = closeBtnSize

    let objects = [background, text, btnClose, title]

    btnClose.on('pointerdown', () => {
        objects.forEach(obj => {
            console.log(obj);
            obj.destroy()
        })
    })
}
