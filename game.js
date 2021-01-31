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
const confIcon = 'confIcon'
const closeIcon = 'closeIcon'
const startButton = 'startButton'
const taskbarBackground = 'taskbar'
const chatwindow = 'chatwindow'
const explorer = 'explorer'
const backbtn = 'backbtn'
const imgIcon= 'imgIcon'
const textIcon='textIcon'
const trashcan='trashcan'

const notepadWindow = 'notepad'
const imageWindow = 'imageviewer'

scene.preload = function () {
    this.load.setBaseURL('sprites');

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
    this.load.image('on_my_way', 'on_my_way.gif')
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
    this.load.image(chatwindow, 'desktopchatwindow.png')
    this.load.image(explorer, 'explorer.png')
    this.load.image(backbtn, 'backbtn.png')
    this.load.image(confIcon, 'config.png')
    this.load.image(imgIcon, 'img.png')

    this.load.image(notepadWindow, 'notepad.png')
    this.load.image(imageWindow, 'imageviewer.png')
    this.load.image(trashcan, 'bin.png')

    this.load.image('screensaver', 'screensaver.jpg')
    this.load.audio('popupSound', '../sounds/popup.ogg')
    this.load.audio('soundtrack', '../sounds/hacked_song.ogg')
}


let myFileWindow = [];

const fileSize = 75
const columns = 5
const margin = 30
const textConfig = {fontSize: '12px', color: '#000000', fontFamily: 'Courier New'};

let files
let content = "Hello, this is the cops. We found that you have been hacked by a criminal entity. To recover full access to your system and your data it is vital to follow our instructions."
+ "\n \n" + "There’s a config file somewhere, I cannot remember it’s full name but it was something with kernel in it. You have to click it!"


const objectives = {
    something: {
        func: function() {
            setTimeout(function(){
                content = "phew, that was a close one. This could have ruined everything you know? We call it the „Publish-everything“ file, so..."
                + "\n \n" + "The next one is a little tricky: Some recovery functionalities have been transfered to one of your bazillion cat images... I knew your compulsive hoarding of feline files would be a problem! I think it’s the one with the kinda weird name..."
                myDialog(this)
            }, 500)
        },
        depends: [],
        complete: false,
    },
    final: {
        func: function () {
            setTimeout(function() {
                content = "That was a weird one, gotta admit that. But at least the directory tree validator is up and running again."
                + "\n \n" + "So yeah, your System is recovered, congrats!"
                myDialog(this)
            }, 500)
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

    this.sound.add('soundtrack').play()

    files = [
        {icon: dirIcon, name: "User", children: [1, 2], id: 0, parent: -1},
        {icon: dirIcon, name: "Personal Files", parent: 0, id: 1, children: [3]},
        {icon: dirIcon, name: "Drivers", parent: 0, id: 2, children: [3]},

        {icon: confIcon, name: "kernel_0.17.23.config", parent: 2, id: 10, objective: objectives.something},
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

        {icon: imgIcon, name: "boxcat.gif", parent: 5, id: 8, image: 'boxcat'},
        {icon: imgIcon, name: "sleepy_cads.gif", parent: 5, id: 8, image: 'sleepy_cads'},
        {icon: imgIcon, name: "dreamy_fluff.gif", parent: 5, id: 8, image: 'dreamy_fluff'},
        {icon: imgIcon, name: "dreamy_fluff2.gif", parent: 5, id: 8, image: 'dreamy_fluff2'},
        {icon: imgIcon, name: "ball_of_fluff.gif", parent: 5, id: 8, image: 'ball_of_fluff'},
        {icon: imgIcon, name: "faaaast.gif", parent: 5, id: 8, image: 'faaaast'},
        {icon: imgIcon, name: "flower_fluff.gif", parent: 5, id: 8, image: 'flower_fluff'},
        {icon: imgIcon, name: "conceiving_the_vastness_of_beyond.gif", parent: 5, id: 8, image: 'contemplating_on', objective: objectives.final},
        {icon: imgIcon, name: "grumpy_fluff.gif", parent: 5, id: 8, image: 'grumpy_fluff'},
        {icon: imgIcon, name: "have_i_seen_mouse.gif", parent: 5, id: 8, image: 'have_i_seen_mouse'},
        {icon: imgIcon, name: "let_me_go_hooman.gif", parent: 5, id: 8, image: 'let_me_go_hooman'},
        {icon: imgIcon, name: "loafy_cads.gif", parent: 5, id: 8, image: 'loafy_cads'},
        {icon: imgIcon, name: "loafy_cads2.gif", parent: 5, id: 8, image: 'loafy_cads2'},
        {icon: imgIcon, name: "majestic_fluff.gif", parent: 5, id: 8, image: 'majestic_fluff'},
        {icon: imgIcon, name: "me_wants_in.gif", parent: 5, id: 8, image: 'me_wants_in'},
        {icon: imgIcon, name: "on_my_way.gif", parent: 5, id: 8, image: 'on_my_way'},

        {icon: imgIcon, name: "photogenic_fluff.gif", parent: 7, id: 9, image: 'photogenic_fluff'},
        {icon: imgIcon, name: "sleepy_cads2.gif", parent: 7, id: 9, image: 'sleepy_cads2'},
        {icon: imgIcon, name: "sleepy_cads3.gif", parent: 7, id: 9, image: 'sleepy_cads3'},
        {icon: imgIcon, name: "sleepy_cads4.gif", parent: 7, id: 9, image: 'sleepy_cads4'},
        {icon: imgIcon, name: "sleepy_cads5.gif", parent: 7, id: 9, image: 'sleepy_cads5'},
        {icon: imgIcon, name: "sleepy_cads6.gif", parent: 7, id: 9, image: 'sleepy_cads6'},
        {icon: imgIcon, name: "take_break_from_your_bs.gif", parent: 7, id: 9, image: 'take_break_from_your_bs'},
        {icon: imgIcon, name: "vibin_outside.gif", parent: 7, id: 9, image: 'vibin_outside'},
        {icon: imgIcon, name: "where_am_i_hooman.gif", parent: 7, id: 9, image: 'where_am_i_hooman'},
        {icon: imgIcon, name: "why_u_bore_me.gif", parent: 7, id: 9, image: 'why_u_bore_me'}
    ]

    dialog = myDialog(this)

    createFile(files[0], 120 + fileSize/2,10 + fileSize/2)
    createFile({icon: trashcan, name: "Recycle Bin", parent: -1}, 10 + fileSize/2, 10 + fileSize/2)

    const screensaver = this.add.sprite(1024/2, 768/2, 'screensaver').setInteractive()
    createTaskbar(screensaver)
}

let directory = []

function fileWindow(parentID, down) {
    myFileWindow.forEach(obj => obj.destroy())

    let objects = []
    const origin = new Phaser.Math.Vector3(100, 100, 0)
    const windowWidth = 600

    const graphics = this.add.graphics({fillStyle: {color: 0xff0000}});
    const background = this.add.sprite(origin.x +305, origin.y + 270, explorer);

    const treeUP = this.add.sprite(origin.x + 23, origin.y + 28, backbtn).setInteractive();
    treeUP.displayWidth = 18
    treeUP.displayHeight = 18
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

        const txt = this.add.text(origin.x + 10 + margin, origin.y + 20, directory.join(' > '), textConfig);

        objects.push(txt);
    }

    let x = 0
    let y = 0

    let i = 0;

    files.filter(file => file.parent === parentID).forEach(currentFile => {
        if (i !== 0 && i % columns === 0) {
            y += fileSize + margin + 20
            x = 0
        }

        const fileX = origin.x + fileSize / 2 + margin + x
        const fileY = origin.y + fileSize / 2 + margin + y +15
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
        objects.forEach(obj => obj.destroy())
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
            file.objective.func()
        }
    }
}
