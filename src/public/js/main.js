// console.log('hello');
// io();
$(function () {
  const socket = io();
  //dom元素
  const $messageForm = $('#message-form');
  const $messageBox = $('#message');
  const $chat = $('#chat');

  //nickname dom元素
  const $nickForm = $('#nickForm');
  const $nickError = $('#nickError');
  const $nickname = $('#nickname');

  const $users = $('#usernames');

  //用户事件
  $nickForm.submit( e => {
    e.preventDefault();
    socket.emit('new user', $nickname.val(), data =>{
      if (data) {
        $('#nickWrap').hide();
        $('#contentWrap').show();
      }else{
        $nickError.html(`
          <div class="alert alert-danger">
            用户名已存在！
          </div>
        `);
      }
      $nickname.val('');
    });
  });
  //用户列表事件
  socket.on('usernames', data => {
    let html = '';
    for (let i = 0; i < data.length; i++) {
      html += `<p><i class="fas fa-user"></i>${data[i]}</p>`;
      $users.html(html);
    } 
  }); 
  //事件
  //消息记录
  $messageForm .submit(e => {
    e.preventDefault();
    socket.emit('send message',$messageBox.val(),data => {
      $chat.append(`<p class="error">${data}</p>`);
    });
    $messageBox.val('');
  });
  //接受消息
  socket.on('new message',function (data) {
    $chat.append('<b>'+data.nick + '</b>:' + data.msg+ '<br/>' );
  });
  //接受私人消息
  socket.on('whisper' , data => {
    $chat.append(`<p class="whisper"><b>${data.nick}:</b>${data.msg}</p>`);
  })
  //接受先前的消息
  socket.on('load old msgs',msgs =>{
    for (let i = 0; i < msgs.length; i++) {
      displayMsg(msgs[i]);
    }
  });
  //显示功能
  function displayMsg(data) {
    $chat.append(`<p class="whisper"><b>${data.nick}:</b>${data.msg}</p>`);
  }
});
