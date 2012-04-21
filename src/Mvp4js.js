var Mvp4js = Mvp4js || {};

Mvp4js.EventBus = {};
Mvp4js.EventBus._new = function(events){
	var self = {};
	var handlers = [];
	
	var addEventAndBindHandlers = function(event){
		var eventHandlers = [];
		handlers[event.name] = eventHandlers;
		for (var i=0; i < event.handlers.length; i++){
			var handler = event.handlers[i];
			eventHandlers[eventHandlers.length] = self.getHandler(event.name, handler);
		}
		self[event.name] = function (){
			for(var j = 0; j < eventHandlers.length; j++){
				var a = arguments;
				/*It dosn't look good, but will work nice*/				
				eventHandlers[j](a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]);
			}
		};
	};
	
	var bindCallers = function(event){
		if (event.bind){
			for (var i = 0; i < event.bind.length; i++){
				var call = event.bind[i];
				if (call.obj.addEventListener){
					call.obj.addEventListener(call.event, self[event.name], false);
				} else if (call.obj.attachEvent){
					call.obj.attachEvent('on' + call.event, self[event.name]);
				}
			}
		}
	};
	
	self.init = function(){
		for (var i = 0; i < events.length; i++){
			var event = events[i];
			addEventAndBindHandlers(event);
			bindCallers(event);
		}
	};
	
	/**
	 * It should be private, but for test purposes I will make it public
	 * @param eventName - name of event
	 * @param handler - handler to take
	 */
	self.getHandler = function(eventName, handler){
		var handlerObj = handler;
		var handlerFunct = handler;
		if (typeof(handler) == 'string'){
			handlerObj = eval(handler);
		}
		var handlerFunctName = 'on' + eventName.capitalize();
		if (typeof(handlerObj[handlerFunctName]) == 'function'){
			handlerFunct = handlerObj[handlerFunctName];
		}
		return handlerFunct;
	};
	
	self.add = function(eventName, handler){
		handlers[eventName][handlers[eventName].length] = self.getHandler(eventName, handler);
	};
	
	return self;
	
};

String.prototype.capitalize = String.capitalize || function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};