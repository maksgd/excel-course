export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // Уведомляем слушателей, если они есть
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }

    // Подписываемся на уведомление / Добавляем нов. слушателя
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}

// const emitter = new Emitter()
// const unsub = emitter.subscribe('max', data => console.log('Sub:', data))
// emitter.emit('max', 42)
