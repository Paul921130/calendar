const ModuleName = 'calendar';
const ModuleDefaults = {
    //
    
};
const ModuleReturns = ['output', 'methods'];

class Module {
    constructor(ele, options) {
        this.ele = ele;
        this.$ele = $(ele);
        this.option = options;
    }
    init() {
        var self = this;
        var $this = this.$ele;
        var opts = this.option;  
        return this;
    }

    methods() {
        return this;
    }

    calendar() {
        return this;
    }

    
    

 
    
    
};

export { ModuleName, ModuleDefaults, ModuleReturns, Module };