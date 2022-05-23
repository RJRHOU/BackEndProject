console.log('hello world')

let form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e.target);
  let email = e.target.email.value;
  let password = e.target.password.value;
  
  let body = {
    email: email,
    password: password
  }

  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json()).then(data => {
    console.log(data)
    if (data.error) {
      let errors = data.error.map((error) => {
        return `<p>${error}</p>`
      })

      document.getElementById('errors').innerHTML = errors
    }
  })
})