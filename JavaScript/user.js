const form = document.querySelector('.login-form');
const usernameInput = form.querySelector('input[type="text"]');
const passwordInput = form.querySelector('input[type="password"]');

// Form gönderildiğinde çalışacak fonksiyon
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Sayfanın yenilenmesini önle
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Basit doğrulama
  if (username === '' || password === '') {
    alert('Lütfen tüm alanları doldurun!');
    return;
  }

  // Örnek kullanıcı doğrulama
  if (username === 'admin' && password === '123456') {
    alert('Başarıyla giriş yaptınız!');
    // Kullanıcıyı yönlendirme (örneğin, ana sayfaya)
    window.location.href = 'index.html';
  } else {
    alert('Kullanıcı adı veya şifre hatalı!');
  }
});



