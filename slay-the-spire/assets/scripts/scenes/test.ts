import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
    start() {
        var ws = new WebSocket("ws://127.0.0.1:8080/ws");
        
        let p = new Promise<void>((resolve, reject) => {

        ws.onopen = function() {
            console.log("WebSocket connection opened.");
            ws.send("hello wangling")
        };
        ws.onmessage = function(event) {
            console.log("Received message: " + event.data);
        };
        ws.onclose = function() {
            console.log("WebSocket connection closed.");
        };
        ws.onerror = function(event) {
            console.log("WebSocket error: " + event);
        };

        });

        console.log("11")
    }

    update(deltaTime: number) {
        
    }
}


