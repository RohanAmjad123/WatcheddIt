import http from 'k6/http';

export default function () {


  const url = 'https://watcheddit-ljy5gpprra-uc.a.run.app/api/login/';
  const payload = JSON.stringify({
    username: 'adminman',
    password: 'fakepass123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}