import {conf} from '../conf/conf.js'; // 

export default class {
    constructor(userId){
        this.es = new EventSource(conf().CHAT_SERVER_URL+'/api/alarm/chat', {withCredentials:false}); 
    }

    addMessageEvent(){
        this.es.addEventListener('message', (e) => {
            console.log(e.data);
         
          });
    }

    addRedEvent(){
        this.es.addEventListener('red', (e) => {
            console.log(e.data);
         
          });
    }

    addOpenEvent(){
        this.es.addEventListener('open', (e) => {
            console.log(e.data);
         
          });
    }
    
    addOpenEvent(){
        this.es.addEventListener('error', function(e) {    
            if (e.eventPhase == EventSource.CLOSED){
                this.es.close();
            }
            if (e.target.readyState == EventSource.CLOSED) {
                console.log("Disconnected");
            }
            else if (e.target.readyState == EventSource.CONNECTING) {
                console.log("Connecting...");
            }
        }, false);
    }

 
    close(){
        this.es.close();
    }


}