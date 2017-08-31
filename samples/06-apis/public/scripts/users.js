if (navigator.credentials && navigator.credentials.preventSilentAccess) {
    const lnkUser = document.getElementById('lnkUser');
    lnkUser.addEventListener('click', () => {
        const cred = new PasswordCredential({
          id:       'spugachev@gmail.com',
          name:     'Sergey Pugachev',
          password: 'Hello!',
          iconURL:  'https://lh3.googleusercontent.com/-KFIgYAXzcl8/AAAAAAAAAAI/AAAAAAAAAAA/APJypA1dbRV9tq9gGjj8-2Wh65JIEeV-Dg/mo/photo.jpg?sz=64'
        });
  
        navigator.credentials.store(cred);
    });
  
    navigator.credentials.get({
      password: true,
      mediation: 'optional'
    }).then(cred => {
      console.log(cred);
    }).catch((err) => {
      console.log(err);
    });    
}