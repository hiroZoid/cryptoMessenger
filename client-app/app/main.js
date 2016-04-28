"use strict";
define(function (require) {
    var App = require('./controllers/App');
    var app = new App(document.body);
    var socket = require('/socket.io/socket.io.js')();

    socket.emit('message', { message: 'shitless', from: 'me', to: 'you' });

    var avatarImgUrl = 'stormtrooper.jpeg';
    app.setData({
        name: "MyApplication",
        chatData: [
            {
                name: "Mary",
                avatar: avatarImgUrl,
                chatHistory: [
                    { who: 'they', text: "Hi Jack.  What are you doing?" },
                    { who: 'me', text: "Hi Mary.  I'm filling out a job application." },
                    { who: 'they', text: "Are you finished with school already?" },
                    { who: 'me', text: "No.  I have one more semester, but it would be great to have a job lined up." }
                ]
            },
            {
                name: "Jessika",
                avatar: avatarImgUrl,
                chatHistory: [
                    { who: 'they', text: "How is your day going?" },
                    {
                        who: 'me',
                        text: "Quite busy.  I'm preparing for my presentation tomorrow on our marketing strategy.  I'm not even half done yet."
                    },
                    { who: 'they', text: "You must feel stressed out now." },
                    { who: 'me', text: "That's an understatement." }
                ]
            },
            {
                name: "Susan",
                avatar: avatarImgUrl,
                chatHistory: [
                    { who: 'they', text: "What are you doing now?" },
                    { who: 'me', text: "I'm playing pool with my friends at a pool hall." },
                    { who: 'they', text: "I didn't know you play pool.  Are you having fun?" },
                    { who: 'me', text: "I'm having a great time.  How about you?  What are you doing?" },
                    {
                        who: 'they',
                        text: "I'm taking a break from my homework.  There seems to be no end to the amount of work I have to do."
                    },
                    { who: 'me', text: "I'm glad I'm not in your shoes." }
                ]
            }
        ]
    });
    app.render();
    console.log('main executed!');
});