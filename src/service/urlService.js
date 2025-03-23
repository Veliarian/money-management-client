export default {
    getApplicationServerUrl() {
        // Перевірка, чи знаходиться додаток на localhost
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:8080'; // Локальний сервер
        } else {
            return 'http://' + window.location.hostname + ':8080'; // Продукційний сервер
        }
    }
}