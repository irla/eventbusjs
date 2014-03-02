define(function(){
	return function(){
		var self = {};
		var handlers = [];
		
		var capitalize = function(str) {
		    return str.charAt(0).toUpperCase() + str.slice(1);
		};
		
		var addEventAndBindHandlers = function(event){
			var eventHandlers = [];
			handlers[event.name] = eventHandlers;
			for (var i=0; i < event.handlers.length; i++){
				var handler = event.handlers[i];
				eventHandlers[eventHandlers.length] = getHandler(event.name, handler);
			}
			self[event.name] = function (){
				for(var j = 0; j < eventHandlers.length; j++){
					var a = arguments;
					/*It dosn't look good, but will work nice*/				
					eventHandlers[j](a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]);
				}
			};
		};
		
		var getHandler = function(eventName, handler){
			var handlerObj = handler;
			var handlerFunct = handler;
			if (typeof(handler) == 'string'){
				handlerObj = eval(handler);
			}
			var handlerFunctName = 'on' + capitalize(eventName);
			if (typeof(handlerObj[handlerFunctName]) == 'function'){
				handlerFunct = handlerObj[handlerFunctName];
			}
			return handlerFunct;
		};
		
		
		self.init = function(events){
			for (var i = 0; i < events.length; i++){
				var event = events[i];
				addEventAndBindHandlers(event);
			}
		};
		
		return self;
	};
});
