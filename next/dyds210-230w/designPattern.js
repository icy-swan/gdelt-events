// observer publish-subscribe patterner
class Notifier {
    constructor() {
        this.events = new Map();
    }
    subscribe(event, callback) {
        if(typeof callback !== 'function') {
            return;
        }
        const callbackList = this.events.get(event);
        if(Array.isArray(callbackList)) {
            this.events.set(event, callbackList.concat(callback));
        } else {
            this.events.set(event, [callback]);
        }
    }
    publish(event, ...args) {
        const callbackList = this.events.get(event);
        if(Array.isArray(callbackList) && callbackList.length > 0) {
            callbackList.forEach(cb => {
                cb(...args);
            })
        }
    }
    unsubscribe(event, callback) {
        const callbackList = this.events.get(event);
        if(Array.isArray(callbackList) && callbackList.length > 0) {
						this.events.set(event, callbackList.filter(cb => {
                return cb !== callback;
            }))   
        }
    }
}
const nf = new Notifier();
const clickCb = (data)=> {
    console.log(data, 'click callback');
}
nf.subscribe('click', clickCb);
nf.publish('click', 'auto');
nf.unsubscribe('click', clickCb);
nf.publish('click');

// singleton
const singletonify = (className) => {
    let instance = null;
    return new Proxy(className.prototype.constructor, {
        construct: (target, argList) => {
            if(!instance) {
                instance = new target(...argList);
            }
            return instance;
        }
    })
}
class TestClass {
    constructor(msg) {
    		this.msg = msg;
    }
    printMsg() {
        console.log(this.msg);
    }
}
const sTC = singletonify(TestClass);
const st1 = new sTC('1');
const st2 = new sTC('2');
st1.printMsg();
st2.printMsg();

function TestFunction(msg) {
    this.msg = msg;
    this.printMsg = () => {
        console.log(this.msg)
    }
}
const sTF = singletonify(TestFunction);
const stf1 = new sTF('3');
const stf2 = new sTF('4');
stf1.printMsg();
stf2.printMsg();

// factory model
class InputBtn {
    constructor(title) {
        this.type = 'input';
        this.title = title;
    }
    onClick() {
        console.log(this.type, this.title);
    }
}
class NumberBtn {
    constructor(title) {
        this.type = 'number';
        this.title = title;
    }
    onClick() {
        console.log(this.type, this.title);
    }
}
class Button {
    constructor(type, title) {
        switch(type) {
            case 'input':
            return new InputBtn(title);
            case 'number':
            return new NumberBtn(title);
        }
    }
}

new Button('input', 'a simple input').onClick();
new Button('number', 'a number').onClick();