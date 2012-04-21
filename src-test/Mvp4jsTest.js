Mvp4jsTest = TestCase("Mvp4jsTest");

Mvp4jsTest.prototype.test_get_handler = function(){
	var eventBus = Mvp4js.EventBus._new();
	
	var returnedType = typeof(eventBus.getHandler("testEvent", function(){}));
	assertEquals("Should return function when passing function as handler", 'function', returnedType);
	
	returnedType = typeof(eventBus.getHandler("testEvent", { onTestEvent : function(){}}));
	assertEquals("Should return function when passing object with on[EventName] method as handler.", 'function', returnedType);
};

Mvp4jsTest.prototype.test_function_call = function(){
	var functionHasBeanCalled = false;
	var handlingFunction = function(){
		functionHasBeanCalled = true;
	};
	var eventBus = Mvp4js.EventBus._new([{
		name: "testEvent",
		handlers: [handlingFunction]
	}]);
	eventBus.init();
	eventBus.testEvent();
	assertTrue('Function has not bean called!', functionHasBeanCalled);	
};

Mvp4jsTest.prototype.test_object_method_call = function(){
	var objectMethodHasBeanCalled = false;
	var ObjectWithEventHandlerMethod = {
		onTestEvent: function(){
			objectMethodHasBeanCalled = true;
		}
	};
	var eventBus = Mvp4js.EventBus._new([{
		name: "testEvent",
		handlers: [ObjectWithEventHandlerMethod]
	}]);
	eventBus.init();
	eventBus.testEvent();
	assertTrue('Object method has not bean called!', objectMethodHasBeanCalled);
};

Mvp4jsTest.prototype.test_passing_parameters = function(){
	var objectHandlerParameter = null;
	var functionHandlerParameter = null;
	var ObjectWithEventHandlerMethod = {
		onTestEvent: function(parameter){
			objectHandlerParameter = parameter;
		}
	};
	var eventHandlingFunction = function(parameter){
		functionHandlerParameter = parameter;
	};
	var eventBus = Mvp4js.EventBus._new([{
		name: "testEvent",
		handlers: [ObjectWithEventHandlerMethod, eventHandlingFunction]		
	}]);
	eventBus.init();
	eventBus.testEvent('Hello!');
	assertEquals('Object handler didn\'t execute or didn\'t pass the parameter!', 'Hello!', objectHandlerParameter);
	assertEquals('Function handler didn\'t execute or didn\'t pass the parameter!', 'Hello!', functionHandlerParameter);
};

Mvp4jsTest.prototype.test_caller_call = function (){
	/*:DOC clickElem = <div id="clickTest">Click It</div>*/
	
	assertNotUndefined(this.clickElem);
	
	var functionHasBeanCalled = false;
	var handlingFunction = function(){
		functionHasBeanCalled = true;
	};
	
	var eventBus = Mvp4js.EventBus._new([{
		name : "testEvent",
		handlers : [handlingFunction],
		bind : [{
			obj : this.clickElem,
			event : 'click'}]
	}]);	
	eventBus.init();	
	fireEvent(this.clickElem, 'click');
	
	assertTrue('Click event didn\'t fired bus event',functionHasBeanCalled);	
};

function fireEvent(element,event){
    if (document.createEventObject){
    // dispatch for IE
	    var evt = document.createEventObject();
	    return element.fireEvent('on'+event,evt);
    }
    // dispatch for firefox + others
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true ); // event type,bubbling,cancelable
    return !element.dispatchEvent(evt);
}
