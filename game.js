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
const notepadWindow = 'notepad'
const imageWindow = 'imageviewer'

scene.preload = function () {
    this.load.setBaseURL('/sprites');

    this.load.image(fileIcon, 'file.png');
    this.load.image(dirIcon, 'directory.png');
    this.load.image('boxcat', 'boxcat.gif');
    this.load.image('contemplating_on', 'contemplating_on_the_vastness_of_beyond.gif')
    this.load.image('sleepy_cads', 'sleepy_cads.gif')
    this.load.image('dreamy_fluff2', 'dreamy_fluff2.gif')
    this.load.image('ball_of_fluff', 'ball_off_fluff.gif')
    this.load.image('dreamy_fluff', 'dreamy_fluff.gif')
    this.load.image('faaaast', 'faaaast.gif')
    this.load.image('flower_fluff', 'flower_fluff.gif')
    this.load.image('grumpy_fluff', 'grumpy_fluff.gif')
    this.load.image('have_i_seen_mouse', 'have_i_seen_mouse.gif')
    this.load.image('let_me_go_hooman', 'let_me_go_hooman.gif')
    this.load.image('loafy_cads', 'loafy_cads.gif')
    this.load.image('loafy_cads2', 'loafy_cads_2.gif')
    this.load.image('majestic_fluff', 'majestic_fluff.gif')
    this.load.image('me_wants_in', 'me_wants_in.gif')
    this.load.image('photogenic_fluff', 'photogenic_fluff.gif')
    this.load.image('sleepy_cads2', 'sleepy_cads2.gif')
    this.load.image('sleepy_cads3', 'sleepy_cads3.gif')
    this.load.image('sleepy_cads4', 'sleepy_cads4.gif')
    this.load.image('sleepy_cads5', 'sleepy_cads5.gif')
    this.load.image('sleepy_cads6', 'sleepy_cads6.gif')
    this.load.image('take_break_from_your_bs', 'take_break_from_your_bs.gif')
    this.load.image('vibin_outside', 'vibin_outside.gif')
    this.load.image('where_am_i_hooman', 'where_am_i_hooman.gif')
    this.load.image('why_u_bore_me', 'why_u_bore_me.gif')


    this.load.image(closeIcon, 'closebtn.png');
    this.load.image(startButton, 'startbtn.png');
    this.load.image(taskbarBackground, 'taskbar.png');
    this.load.image(notepadWindow, 'notepad.png')
    this.load.image(imageWindow, 'imageviewer.png')
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
    showImage = showImage.bind(this)
    myDialog = myDialog.bind(this)
    createFile = createFile.bind(this)
    showTextfile = showTextfile.bind(this)

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
        {icon: dirIcon, name: "pictures", children: [8], parent: 1, id: 5},
        {icon: dirIcon, name: "pictures2", children: [9], parent: 1, id: 7},
        {icon: fileIcon, name: "def", parent: 1, id: 6},

        {icon: fileIcon, name: "boxcat.gif", parent: 5, id: 8, image: 'boxcat'},
        {icon: fileIcon, name: "sleepy_cads.gif", parent: 5, id: 8, image: 'sleepy_cads', objective: objectives.final},
        {icon: fileIcon, name: "dreamy_fluff.gif", parent: 5, id: 8, image: 'dreamy_fluff', objective: objectives.final},
        {icon: fileIcon, name: "dreamy_fluff2.gif", parent: 5, id: 8, image: 'dreamy_fluff2', objective: objectives.final},
        {icon: fileIcon, name: "ball_of_fluff.gif", parent: 5, id: 8, image: 'ball_of_fluff', objective: objectives.final},
        {icon: fileIcon, name: "faaaast.gif", parent: 5, id: 8, image: 'faaaast', objective: objectives.final},
        {icon: fileIcon, name: "flower_fluff.gif", parent: 5, id: 8, image: 'flower_fluff', objective: objectives.final},
        {icon: fileIcon, name: "conceiving_the_vastness_of_beyond.gif", parent: 5, id: 8, image: 'contemplating_on', objective: objectives.final},
        {icon: fileIcon, name: "grumpy_fluff.gif", parent: 5, id: 8, image: 'grumpy_fluff', objective: objectives.final},
        {icon: fileIcon, name: "have_i_seen_mouse.gif", parent: 5, id: 8, image: 'have_i_seen_mouse', objective: objectives.final},
        {icon: fileIcon, name: "let_me_go_hooman.gif", parent: 5, id: 8, image: 'let_me_go_hooman', objective: objectives.final},
        {icon: fileIcon, name: "loafy_cads.gif", parent: 5, id: 8, image: 'loafy_cads', objective: objectives.final},
        {icon: fileIcon, name: "loafy_cads2.gif", parent: 5, id: 8, image: 'loafy_cads2', objective: objectives.final},
        {icon: fileIcon, name: "majestic_fluff.gif", parent: 5, id: 8, image: 'majestic_fluff', objective: objectives.final},
        {icon: fileIcon, name: "me_wants_in.gif", parent: 5, id: 8, image: 'me_wants_in', objective: objectives.final},
        {icon: fileIcon, name: "on_my_way.gif", parent: 5, id: 8, image: 'on_my_way', objective: objectives.final},

        {icon: fileIcon, name: "photogenic_fluff.gif", parent: 7, id: 9, image: 'photogenic_fluff', objective: objectives.final},
        {icon: fileIcon, name: "sleepy_cads2.gif", parent: 7, id: 9, image: 'sleepy_cads2', objective: objectives.final},
        {icon: fileIcon, name: "sleepy_cads3.gif", parent: 7, id: 9, image: 'sleepy_cads3', objective: objectives.final},
        {icon: fileIcon, name: "sleepy_cads4.gif", parent: 7, id: 9, image: 'sleepy_cads4', objective: objectives.final},
        {icon: fileIcon, name: "sleepy_cads5.gif", parent: 7, id: 9, image: 'sleepy_cads5', objective: objectives.final},
        {icon: fileIcon, name: "sleepy_cads6.gif", parent: 7, id: 9, image: 'sleepy_cads6', objective: objectives.final},
        {icon: fileIcon, name: "take_break_from_your_bs.gif", parent: 7, id: 9, image: 'take_break_from_your_bs', objective: objectives.final},
        {icon: fileIcon, name: "vibin_outside.gif", parent: 7, id: 9, image: 'vibin_outside', objective: objectives.final},
        {icon: fileIcon, name: "where_am_i_hooman.gif", parent: 7, id: 9, image: 'where_am_i_hooman', objective: objectives.final},
        {icon: fileIcon, name: "why_u_bore_me.gif", parent: 7, id: 9, image: 'why_u_bore_me', objective: objectives.final}


    ]

    dialog = myDialog(this)

    createFile(files[0], 10 + fileSize/2,10 + fileSize/2)
}

let directory = []

function fileWindow(parentID, down) {
    myFileWindow.forEach(obj => obj.destroy())

    let objects = []
    const numFiles = files.length
    const origin = new Phaser.Math.Vector3(100, 100, 0)
    const windowWidth = 600
    const windowHeight = 550
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

            myFileWindow = fileWindow(node.parent, false);
        }
    })
    objects.push(treeUP)
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

        const fileX = origin.x + fileSize / 2 + margin + x
        const fileY = origin.y + fileSize / 2 + margin + y
        let fileObjs = createFile(currentFile, fileX, fileY,)

        fileObjs.forEach(obj => objects.push(obj))
        objects.push(background)
        objects.push(graphics)
        x += fileSize + margin

        i++
    })

    const closeBtnSize = 20
    const btnClose = this.add.sprite(origin.x + windowWidth - closeBtnSize/2, origin.y + closeBtnSize / 2, closeIcon).setInteractive();
    btnClose.displayWidth = closeBtnSize
    btnClose.displayHeight = closeBtnSize

    objects.push(btnClose)

    btnClose.on('pointerdown', () => {
        objects.forEach(obj => {console.log(obj);obj.destroy()})
        directory = []
    })
    return objects
}

function createFile(f, x,y) {
    const file = this.add.sprite(x,y, f.icon).setInteractive();
    file.displayWidth = fileSize
    file.displayHeight = fileSize

    const text = this.make.text({
        x: x,
        y: y + 60,
        text: f.name,
        origin: 0.5,
        style: {
            font: 'bold 11px Arial',
            fill: 'black'
        }
    });
    text.setWordWrapWidth(fileSize, true);
    const txt = this.add.text(text);


    file.on('pointerdown', () => {
        handleFileClick(f)
    })

    return [file, text, txt]
}

function handleFileClick(file) {

    if (file.children) {
            console.log("clickedi cklick")
            myFileWindow = fileWindow(file.id, true)
    }
    if (file.image) {
        showImage(file, 100, 100)
    }
    if (file.content) {
        showTextfile(file, 100,100)
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

