
/**
 * THE STORY SCRIPT
 */

export const story = [
    {
        text: "Hey Love ❤️",
        style: "text-lg",
        autoNext: false,
        buttonText: "Su Che Pan 🧐",
        action: "playMusic"
    },
    {
        text: "I wanted to do something special for you.... 🪄 🎁",
        autoNext: true,
        duration: 3000
    },
    {
        text: "Because...",
        autoNext: true,
        duration: 1000
    },
    {
        text: "You are Very Special.... ✨👸👑",
        style: "text-lg text-gold",
        autoNext: false,
        buttonText: "Jaldi Bol Na Pan... Time Nathi Mara Paase ⏱️"
    },
    {
        text: "More special than words can ever say... 🙈💖",
        autoNext: true,
        duration: 3000
    },
    {
        text: "I have something really important to tell you... 😙🙈",
        autoNext: true,
        duration: 3500
    },
    {
        text: "Do you remember the moment we first met? 🙈🥰🫣",
        style: "text-lg",
        autoNext: false,
        buttonText: "Ha Ha Pan Bol Aagar... 🤔😑"
    },
    {
        text: "Since that day...<br>My world has been brighter..... 🌍🌟🥰😍",
        autoNext: true,
        duration: 4000
    },
    {
        text: "Every laugh you share with me...<br>Every look you steal my way...<br>It all means more to me than you know 💫❤️",
        style: "text-gold",
        autoNext: false,
        buttonText: "Ha Ha Pata hai mhuje... 😑🤨"
    },
    {
        text: "Every moment with you feels unreal...<br>Like my heart finally found its home... 🏡🫶✨",
        autoNext: true,
        duration: 3500
    },
    {
        text: "Every time you’re near me...<br>My heart forgets how to act normal 😌💞...",
        autoNext: true,
        duration: 3500
    },
    {
        text: "So, I have a question for you my loveee...🤔😙",
        style: "text-script",
        autoNext: false,
        buttonText: "Bol Bol Jaldi Bol... 🙈☺️🫣💖"
    },
    {
        text: "Will you be my Valentine? 🌹",
        style: "text-xl text-script",
        autoNext: false,
        yesNo: true
    },
    {
        text: "I knew you would say yes !!! 🙈❤️",
        style: "text-xl text-gold",
        autoNext: true,
        duration: 3000,
        action: "fireworks"
    },
    {
        text: "I Love You Forever!!! 💑🥰😍❤️",
        style: "text-lg",
        autoNext: true,
        duration: 3000,
        action: "fireworks"
    },
    // --- Memory Lane (Gallery Mode) ---
    {
        text: "Some of my favorite memories with you... 📸",
        autoNext: true,
        duration: 3000
    },
    {
        gallery: [
            "assets/img/1.JPG",
            "assets/img/2.JPG",
            "assets/img/3.jpg",
            "assets/img/4.jpg",
            "assets/img/5.jpg",
            "assets/img/6.jpg",
            "assets/img/7.jpg",
            "assets/img/8.jpg"
        ],
        caption: "Every moment I spend with you feels like something I’ll always want to hold onto ✨🌙",
        autoNext: false,
        buttonText: "I love all the memories we’ve made together ❤️✨"
    },
    {
        text: "I can’t wait for all the memories still waiting for us... ❤️🫶",
        style: "text-lg text-gold",
        autoNext: false,
        buttonText: "Replay Story ↺",
        replay: true
    }
];
