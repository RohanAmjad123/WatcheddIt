import http from 'k6/http';

export default function () {
  const url = 'http://127.0.0.1:3000/api/posts/';
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.get(url)
}