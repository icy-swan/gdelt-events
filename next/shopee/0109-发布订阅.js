class Notifier {
    constructor() {
        this.events = new Map();
    }
    subscribe(eventName, callback) {
        const callbackList = this.events.get(eventName);
        this.events.set(eventName, callbackList ? callbackList.concat(callback) : [callback]);
    }
    publish(eventName, ...args) {
        const callbackList = this.events.get(eventName);
        if(Array.isArray(callbackList)) {
            callbackList.forEach(cb => cb(...args));
        }
    }
    unsubscribe(eventName, callback) {
        const callbackList = this.events.get(eventName);
        if(Array.isArray(callbackList)) {
            const next = callbackList.filter(p => p !== callback);
            if(next.length > 0) {
                this.events.set(eventName, next);
            } else {
                this.events.delete(eventName);
            }
        }
    }
}
const nf = new Notifier();
function showLoad(data) {
    console.log('load', data);
}
nf.subscribe("load", showLoad);
nf.subscribe("load", showLoad);
nf.publish("load", "a information");
nf.unsubscribe("load", showLoad);
nf.publish("load", "a information");