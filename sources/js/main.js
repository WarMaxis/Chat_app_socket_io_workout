import Chat from './components/chat';

class App {
    constructor() {
        this.init();
    }

    init() {
        new Chat();
    }
}

document.addEventListener('DOMContentLoaded', () => new App());
