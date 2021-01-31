var scene = new Phaser.Scene("game");
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    backgroundColor: '#b8e3f4',
    scene: scene
};
const game = new Phaser.Game(config);

const fileIcon = 'fileIcon'
const dirIcon = 'directoryIcon'
const closeIcon = 'closeIcon'
const startButton = 'startButton'
const taskbarBackground = 'taskbar'


scene.preload = function () {
    this.load.setBaseURL('/sprites');

    this.load.image(fileIcon, 'file.png');
    this.load.image(dirIcon, 'directory.png');
    this.load.image('catImage', 'cat-23.gif');
    this.load.image(closeIcon, 'closebtn.png');
    this.load.image(startButton, 'startbtn.png');
    this.load.image(taskbarBackground, 'taskbar.png');

}


let myFileWindow = [];
const fileSize = 75
const columns = 5
const margin = 30
const textConfig = {fontSize: '16px', color: '#000000', fontFamily: 'Arial'};

let files
let content = "hacked";

const objectives = {
    something: {
        func: function() {
            setTimeout(function(){
                content = "phew, you found it"
                myDialog(this)
            }, 500)
            
            // alert("oh hai")
        },
        depends: [],
        complete: false,
    },
    final: {
        func: function () {
            setTimeout(function() {
                content = "You did it!"
                myDialog(this)
            }, 500)
            
            // alert("you did it")
        },
        depends: ['something'],
        complete: false,
    },
}

scene.create = function () {

    createTaskbar = createTaskbar.bind(this)
    fileWindow = fileWindow.bind(this)
    openFileDialog = openFileDialog.bind(this)
    myDialog = myDialog.bind(this)

    createTaskbar()
    files = [
        {icon: dirIcon, name: "allesAusserBilder", children: [1, 2], id: 0, parent: -1},
        {icon: dirIcon, name: "abc", parent: 0, id: 1, children: [3]},
        {
            icon: fileIcon, name: "hello.txt", parent: 0, id: 4, content: "According to all known laws\n" +
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
                "The bee, of course, flies anyway\n",
            objective: objectives.something
        },
        {icon: dirIcon, name: "pictures", children: [7, 8], parent: 1, id: 5},
        {icon: fileIcon, name: "def", parent: 1, id: 6},
        {icon: fileIcon, name: "cat picture", parent: 5, id: 7, image: 'catImage'},
        {icon: fileIcon, name: "picture-1", parent: 5, id: 8, objective: objectives.final}
    ]
    myFileWindow = fileWindow(-1, true)
    dialog = myDialog(this, "You been haxed")

}

const directory = []

function fileWindow(parentID, down) {
    myFileWindow.forEach(obj => obj.destroy())

    let objects = []
    const numFiles = files.length
    const origin = new Phaser.Math.Vector3(100, 100, 0)
    const windowWidth = fileSize * columns + (columns + 2) * margin
    const windowHeight = (fileSize * (numFiles / columns)) + ((numFiles / columns) + 2) * margin
    const rect = new Phaser.Geom.Rectangle(origin.x, origin.y, windowWidth, windowHeight);

    const graphics = this.add.graphics({fillStyle: {color: 0xff0000}});
    const background = graphics.fillRectShape(rect);

    const treeUP = this.add.sprite(origin.x + 20, origin.y + 10, 'treeUP').setInteractive();
    treeUP.displayWidth = 20
    treeUP.displayHeight = 20
    treeUP.on('pointerdown', () => {
        const node = files.find(node => node.id === parentID)

        if (node !== undefined) {
            directory.pop();

            fileWindow(node.parent, false);
        }
    })

    if (down) {
        const parent = files.find(file => file.id === parentID);

        if (parent !== undefined) {
            directory.push(parent.name);
        }

        const txt = this.add.text(origin.x + 10 + margin, origin.y, directory.join(' > '), textConfig);

        objects.push(txt);
    }

    let x = 0
    let y = 0

    let i = 0;
    console.log(files.filter(file => file.parent === parentID))
    files.filter(file => file.parent === parentID).forEach(currentFile => {
        if (i !== 0 && i % columns === 0) {
            y += fileSize + margin + 20
            x = 0
        }

        const file = this.add.sprite(origin.x + fileSize / 2 + margin + x, origin.y + fileSize / 2 + margin + y, currentFile.icon).setInteractive();
        file.displayWidth = fileSize
        file.displayHeight = fileSize

        const text = this.make.text({
            x: origin.x + x + margin + fileSize/2,
            y: origin.y + y + fileSize + 50,
            text: currentFile.name,
            origin: 0.5,
            style: {
                font: 'bold 11px Arial',
                fill: 'black'
            }
        });
        text.setWordWrapWidth(fileSize, false);
        const txt = this.add.text(text);


        file.on('pointerdown', () => {
            handleFileClick(currentFile)
        })

        objects.push(file)
        objects.push(txt)
        objects.push(background)
        objects.push(graphics)
        x += fileSize + margin

        i++
    })

    return objects
}

function handleFileClick(file) {

    if (file.children) {
            console.log("clickedi cklick")
            fileWindow(file.id, true)
    }
    if (file.content || file.image) {
            openFileDialog(file)
    }
    if (file.objective) {
        const uncompleteDependency = file.objective.depends.find((key) => objectives[key].complete !== true)
        if (!uncompleteDependency) {
            file.objective.complete = true
            console.log("completed objective " + JSON.stringify(file.objective))
            file.objective.func()
        }
    }
}

function openFileDialog(file) {
    const origin = new Phaser.Math.Vector3(100, 100, 0)
    const width = 400;
    const height = 400;
    const rect = new Phaser.Geom.Rectangle(origin.x, origin.y, width, height);

    const graphics = this.add.graphics({fillStyle: {color: 0xc3b9c2}});
    const background = graphics.fillRectShape(rect);
    let objects = [graphics, background]
    if (file.content) {
        const text = this.make.text({
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
        objects.push(txt, text)

    } else if (file.image) {

        const imgWidth = width - 8;
        const imgHeight = height - 8;
        const sprite = this.add.sprite(origin.x + imgWidth/2 + 4, origin.y + imgHeight/2 + 4, 'catImage')
        sprite.displayWidth = imgWidth
        sprite.displayHeight = imgHeight
        objects.push(sprite)
    }

    const closeBtnSize = 20
    const btnClose = this.add.sprite(origin.x + width - closeBtnSize/2, origin.y + closeBtnSize / 2, closeIcon).setInteractive();
    btnClose.displayWidth = closeBtnSize
    btnClose.displayHeight = closeBtnSize

    objects.push(btnClose)

    btnClose.on('pointerdown', () => {
        objects.forEach(obj => {console.log(obj);obj.destroy()})
    })
}
