class MiniRouter {
    constructor(routes=[]){
        this.routes = routes ;
        this.history = [];
        this.routes.forEach(r => {
            r.path = r.dataset.path || "#" ;
            r.show = () => { 
                r.dataset.state = "visible" 
            };
            r.hide = () => { 
                r.dataset.state = "hidden" 
            };
        });
    }
    get path(){
        return this.history[this.history.length-1]||null;
    }
    goto(href){
        this.history.push(href);
        this.update();
    }
    back(){
        this.history.length && this.goto(this.history.pop())
    }
    update(){
        let notRendered = true  ;
        let path = this.path ;
        this.routes.forEach(route => {
            if(notRendered && route.path.startsWith(path)){
                route.show();
                notRendered = false ;
            } else {
                route.hide();
            }
        });
    }
}