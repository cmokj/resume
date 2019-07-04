var APP_ID = 'WiPEmWqfwjUOHcrnVFgUXtt0-gzGzoHsz';
var APP_KEY = 'gPaS2HQuVsOBkdHmIO5FaofU';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var postMessage = document.querySelector('#postMessage');
postMessage.addEventListener('submit', function (e) {
    e.preventDefault();
    let content = postMessage.querySelector('input[name=content]').value;
    let name = postMessage.querySelector('input[name=name]').value;
    let Message = AV.Object.extend('message');
    let message = new Message();

    if (content == ' ' || content == null) {
        alert('请填写留言内容！');
    } else if (name == ' ' || name == null) {
        alert('请填写用户名！');
    } else {
        message.save({
            content: content,
            name: name
        }).then(function (object) {
            let li = document.createElement('li');
            li.innerText = `${object.attributes.name}:${object.attributes.content}`;
            let messageList = document.querySelector('#messageList');
            messageList.appendChild(li);
            postMessage.querySelector('input[name=content]').value = '';
        })
    }
})

var query = new AV.Query('message');
query.find().then(function (message) {
    let array = message.map((item) => item.attributes);
    array.forEach(item => {
        let li = document.createElement('li');
        let messageList = document.querySelector('#messageList');
        if (item.name !== '' && item.content !== '') {
            li.innerText = `${item.name}:${item.content}`;
            messageList.appendChild(li);
        }

    })
}, function (error) {
    // 异常处理
});