importScripts('http://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('http://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp({
'messagingSenderId': '474218226931',
'projectId':'c2capp-1a798',
'apiKey':'AIzaSyBqZ5F9WFJeRM5ezMQbIpj17id6snPeBIQ',
'appId':'c2capp'
});

const messaging = firebase.messaging();