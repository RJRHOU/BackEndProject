console.log('hello world')

// still trying to figure out how to get this page to render

let form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e.target);
  let username = e.target.username.value;
  let password = e.target.password.value;


  let body = {
    username: username,
    password: password
  }

  fetch('/views/templates/login.html', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json()).then(data => {
    console.log(data)

    location.href = "/views/templates/forgotPass.html";
  })
})