function createTaskbar(screensaver) {

    console.log(this)

    const taskbarHeight = 38
    const taskbarWidth = this.game.config.width
    this.add.sprite(taskbarWidth/2, this.game.config.height - taskbarHeight/2, taskbarBackground)

    const btnWidth = 56 * 1.1;
    const btnHeight = 20 * 1.1;
    const start = this.add.sprite(btnWidth/2 + 5, this.game.config.height - taskbarHeight/2, startButton).setInteractive()
    start.displayWidth = btnWidth
    start.displayHeight = btnHeight
    start.on('pointerdown', () => {
        screensaver.destroy()
    })
}
