"use strict";

function App(parentElement) {
    var view = document.createElement('div');
    view.className = 'application';

    var children = {
        chatView: new ChatView(this, view)
    };

    var data = null;
    this.setData = function (newData) {
        console.log('App.setData()');
        data = newData;
        children.chatView.setData(data.chatData);
    };

    this.render = function () {
        console.log('App.render()');
        if (view.parentNode !== parentElement) {
            parentElement.appendChild(view);
        }
        children.chatView.render();
    };
}

function ChatView(parentController, parentElement) {
    var view = document.createElement('div');
    view.className = 'navigatorContent';

    var contactBox = document.createElement('div');
    contactBox.className = 'contactBox';
    view.appendChild(contactBox)

    var contactBoxTitle = document.createElement('div');
    contactBoxTitle.className = 'boxTitle';
    contactBoxTitle.innerHTML = "<h2>Contatos</h2>";
    contactBox.appendChild(contactBoxTitle);

    var children = {
        contactList: new ContactList(this, contactBox),
        chatBox: new ChatBox(this, view)
    };

    var data = null;
    this.setData = function (newData) {
        console.log('App.setData()');
        data = newData;
        children.contactList.setData(data);
    };

    this.setChatBoxData = function (newData) {
        console.log('App.setChatBoxData()');
        children.chatBox.setData(newData);
        children.chatBox.render();
    };

    this.render = function () {
        console.log('App.render()');
        if (view.parentNode !== parentElement) {
            parentElement.appendChild(view);
        }
        children.contactList.render();
        children.chatBox.render();
    };
}

function ContactList(parentController, parentElement) {
    var view = document.createElement('div');
    view.className = 'contactList';

    var data = [];
    this.setData = function (newData) {
        console.log('ContactList.setData()');
        data = newData;
    };

    this.render = function () {
        console.log('ContactList.render()');
        if (view.parentNode !== parentElement) {
            parentElement.appendChild(view);
        }
        while (view.firstChild) {
            view.removeChild(view.firstChild);
        }
        for (var i = 0; i < data.length; i++) {
            var img = document.createElement('img');
            img.src = data[i].avatar;
            img.className = 'avatar';

            var p = document.createElement("p");
            p.textContent = data[i].name;

            var div = document.createElement("div");
            div.className = 'contact';
            div.appendChild(img);
            div.appendChild(p);
            div.data = data[i];
            div.addEventListener("click", function (e) {
                console.log('ContactList.onContactClicked()');
                parentController.setChatBoxData(e.target.data);
            });

            view.appendChild(div);
        }
    };
}

function ChatBox(parentController, parentElement) {
    var view = document.createElement('div');
    view.className = 'chatBox';

    var title = document.createElement('div');
    title.className = 'boxTitle';
    view.appendChild(title);

    var children = {
        chatHistory: new ChatHistory(this, view),
        textInput: new TextInput(this, view)
    }

    var data = [];
    this.setData = function (newData) {
        console.log('ChatBox.setData()', newData);
        data = newData;
        children.chatHistory.setData(data.chatHistory);
        children.textInput.setData(data);
    };

    this.render = function () {
        console.log('ChatBox.render()');
        if (view.parentNode !== parentElement) {
            parentElement.appendChild(view);
        }
        while (title.firstChild) {
            title.removeChild(title.firstChild);
        }
        if (data.name) {
            var img = document.createElement('img');
            img.src = data.avatar;
            img.className = 'avatar';

            var h2 = document.createElement('h2');
            h2.textContent = data.name;
            h2.style.float = 'right';

            title.appendChild(img)
            title.appendChild(h2);
        }
        children.chatHistory.render();
        children.textInput.render();
    }

    this.renderChatHistory = function () {
        console.log('ChatBox.renderChatHistory()');
        children.chatHistory.render();
    }
}

function ChatHistory(parentController, parentElement) {
    var view = document.createElement('div');
    view.className = 'chatHistory';

    var data = [];
    this.setData = function (newData) {
        console.log('ChatHistory.setData()');
        data = newData;
    };

    this.render = function () {
        console.log('ChatHistory.render()');
        if (view.parentNode !== parentElement) {
            parentElement.appendChild(view);
        }
        while (view.firstChild) {
            view.removeChild(view.firstChild);
        }
        for (var i = 0; i < data.length; i++) {
            var p = document.createElement("p");
            p.textContent = data[i].text;
            var div = document.createElement("div");
            div.appendChild(p);
            div.className = (data[i].who == 'me') ? 'chatTextMe' : 'chatTextThey';
            view.appendChild(div);
        }
        view.scrollTop = view.scrollHeight;
    }
}

function TextInput(parentController, parentElement) {
    var view = document.createElement('input');
    view.type = 'text';
    view.className = 'textInput';
    view.owner = this;

    view.addEventListener('keydown', function (e) {
        console.log('TextInput.view.onKeyDown()');
        if (e.keyCode == 13 && e.target.value.length > 0) {
            data.chatHistory.push({who: 'me', text: e.target.value});
            e.target.value = '';
            parentController.renderChatHistory();
        }
    });

    var data = null;
    this.setData = function (newData) {
        console.log('TextInput.setData()');
        data = newData;
    };

    this.render = function () {
        console.log('TextInput.render()');
        if (view.parentNode !== parentElement) {
            parentElement.appendChild(view);
        }
        view.disabled = (data == null);
        if (!view.disabled) {
            view.focus();
        }
    }
}

var avatarImgUrl = 'stormtrooper.jpeg';

var app = new App(document.body);
app.setData({
    name: "MyApplication",
    chatData: [
        {
            name: "Mary",
            avatar: avatarImgUrl,
            chatHistory: [
                {who: 'they', text: "Hi Jack.  What are you doing?"},
                {who: 'me', text: "Hi Mary.  I'm filling out a job application."},
                {who: 'they', text: "Are you finished with school already?"},
                {who: 'me', text: "No.  I have one more semester, but it would be great to have a job lined up."}
            ]
        },
        {
            name: "Jessika",
            avatar: avatarImgUrl,
            chatHistory: [
                {who: 'they', text: "How is your day going?"},
                {
                    who: 'me',
                    text: "Quite busy.  I'm preparing for my presentation tomorrow on our marketing strategy.  I'm not even half done yet."
                },
                {who: 'they', text: "You must feel stressed out now."},
                {who: 'me', text: "That's an understatement."}
            ]
        },
        {
            name: "Susan",
            avatar: avatarImgUrl,
            chatHistory: [
                {who: 'they', text: "What are you doing now?"},
                {who: 'me', text: "I'm playing pool with my friends at a pool hall."},
                {who: 'they', text: "I didn't know you play pool.  Are you having fun?"},
                {who: 'me', text: "I'm having a great time.  How about you?  What are you doing?"},
                {
                    who: 'they',
                    text: "I'm taking a break from my homework.  There seems to be no end to the amount of work I have to do."
                },
                {who: 'me', text: "I'm glad I'm not in your shoes."}
            ]
        }
    ]
});
app.render();
