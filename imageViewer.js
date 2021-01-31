function showImage(file, x, y) {
    const width = 233;
    const height = 296;

    let background = this.add.sprite(x + width / 2, y + height / 2, imageWindow).setInteractive()

    const title = this.make.text({
        x: x + 10,
        y: y + 5,
        text: `${file.name}`,
        origin: 0,
        style: {
            font: '10px Arial',
            fill: 'white'
        }
    });
    this.add.text(title)

    const imageWidth = 219
    const imageHeight = 254
    const image = this.add.sprite(x + imageWidth / 2 + 8, y + 30 + imageHeight / 2, file.image)
    image.displayWidth = 220
    image.displayHeight = 255

    const closeBtnSize = 16
    const btnClose = this.add.sprite(x - 4 + width - closeBtnSize / 2, y + 3 + closeBtnSize / 2, closeIcon).setInteractive();
    btnClose.displayWidth = closeBtnSize
    btnClose.displayHeight = closeBtnSize

    let objects = [background, btnClose, title, image]

    btnClose.on('pointerdown', () => {
        objects.forEach(obj => {
            console.log(obj);
            obj.destroy()
        })
    })
}
