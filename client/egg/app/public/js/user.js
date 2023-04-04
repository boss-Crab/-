// eslint-disable-next-line no-unused-vars
function login() {
  fetch('/login', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name: 'admin2',
      pwd: 'admin',
    }),
  })
    .then(() => {
      // eslint-disable-next-line no-undef
      location.reload();
    });
}
// eslint-disable-next-line no-unused-vars
function logout() {
  fetch('/logout', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({}),
  })
    .then(() => {
      // eslint-disable-next-line no-undef
      location.reload();
    });
}
