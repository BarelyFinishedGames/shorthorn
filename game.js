var scene = new Phaser.Scene("game");
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    backgroundColor: '#b8e3f4',
    scene: scene
};
const game = new Phaser.Game(config);


scene.preload = function () {
    this.load.setBaseURL('/');

    this.load.image('file', 'file.png');
}


let myFileWindow;
const fileSize = 75
const columns = 5
const margin = 10
const textConfig = {fontSize: '16px', color: '#000000', fontFamily: 'Arial'};

const files = [
    {text: "allesAusserBilder", children: [1, 2], id: 0, parent: -1},
    {text: "abc", parent: 0, id: 1, children: [3]},
    {text: "hello.txt", parent: 0, id: 4, content: "According to all known laws\n" +
            "of aviation,\n" +
            "\n" +
            "  \n" +
            "there is no way a bee\n" +
            "should be able to fly.\n" +
            "\n" +
            "  \n" +
            "Its wings are too small to get\n" +
            "its fat little body off the ground.\n" +
            "\n" +
            "  \n" +
            "The bee, of course, flies anyway\n"},
    {text: "pictures", parent: 1, id: 5},
    {text: "def", parent: 1, id: 6},
    {text: "picture-0", parent: 6, id: 7},
    {text: "picture-1", parent: 6, id: 8}
]

scene.create = function () {

    fileWindow = fileWindow.bind(this)
    openFileDialog = openFileDialog.bind(this)

    myFileWindow = fileWindow(-1, true)
}

const directory = []

function fileWindow(parentID, down) {
    if (myFileWindow) {
        for (let obj of myFileWindow) {
            obj.destroy()
        }
    }
    let objects = []
    const numFiles = files.length
    const origin = new Phaser.Math.Vector3(100, 100, 0)
    const windowWidth = fileSize * columns + (columns + 2) * margin
    const windowHeight = (fileSize * (numFiles / columns)) + ((numFiles / columns) + 2) * margin
    const rect = new Phaser.Geom.Rectangle(origin.x, origin.y, windowWidth, windowHeight);

    const graphics = this.add.graphics({fillStyle: {color: 0xff0000}});
    const background = graphics.fillRectShape(rect);

    const treeUP = this.add.sprite(origin.x, origin.y, 'treeUP').setInteractive();
    treeUP.displayWidth = 20
    treeUP.displayHeight = 20
    treeUP.on('pointerdown', () => {
        for (let node of files) {
            if (node.id === parentID) {
                directory.pop();

                fileWindow(node.parent, false);
            }
        }
    })

    if (down) {
        const parent = files.find(file => file.id === parentID);
    
        if (parent !== undefined) {
            directory.push(parent.text);
        }

        const txt = this.add.text(origin.x + 10 + margin, origin.y + 50 + fileSize + 5, directory.join(' > '), textConfig);

        objects.push(txt);
    }

    let x = 0
    let y = 0
    for (let i = 0; i < numFiles; i++) {
        let currentFile = files[i]

        if (currentFile.parent !== parentID) {
            continue;
        }

        if (i !== 0 && i % columns === 0) {
            y += fileSize + margin
            x = 0
        }
        const file = this.add.sprite(origin.x + fileSize / 2 + margin + x, origin.y + fileSize / 2 + margin + y, 'file').setInteractive();
        file.displayWidth = fileSize
        file.displayHeight = fileSize

        const txt = this.add.text(origin.x + x + margin, origin.y + y + fileSize + 5, files[i].text, textConfig);


        if (currentFile.children) {
            file.on('pointerdown', () => {
                console.log("clickedi cklick")
                fileWindow(currentFile.id, true)
            })
        }
        if (currentFile.content) {
            file.on('pointerdown', () => {
                openFileDialog(currentFile)
            })
        }
        objects.push(file)
        objects.push(txt)
        objects.push(background)
        objects.push(graphics)
        x += fileSize + margin
    }
    return objects
}

function openFileDialog(file) {
    const origin = new Phaser.Math.Vector3(100, 100, 0)
    const width = 400;
    const height = 400;
    const rect = new Phaser.Geom.Rectangle(origin.x, origin.y, width, height);

    const graphics = this.add.graphics({fillStyle: {color: 0xc3b9c2}});
    const background = graphics.fillRectShape(rect);

    var text = this.make.text({
        x: origin.x + width/2,
        y: origin.y + height/2,
        text: file.content,
        origin: 0.5,
        style: {
            font: 'bold 11px Arial',
            fill: 'black'
        }
    });
    text.setWordWrapWidth(width, false);
    const txt = this.add.text(text);

    const btnClose = this.add.sprite(origin.x + width, origin.y, 'closeButton').setInteractive();
    btnClose.displayWidth = 20
    btnClose.displayHeight = 20

    const objects = [txt, text, background, graphics, btnClose]

    btnClose.on('pointerdown', () => {
        for (let obj of objects) {
            obj.destroy()
        }
    })
}
