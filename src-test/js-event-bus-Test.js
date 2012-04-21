TestCase("JsEBTest", {
	setUp : function(){
		this.commons = Commons();
	},
	
	test_function_call: function(){
		var functionHasBeanCalled = false;
		var handlingFunction = function(){
			functionHasBeanCalled = true;
		};
		var eventBus = JsEB.EventBus([{
			name: "testEvent",
			handlers: [handlingFunction]
		}]);
		eventBus.init();
		eventBus.testEvent();
		assertTrue('Function has not bean called!', functionHasBeanCalled);	
	},
	
	test_object_method_call: function(){
		var objectMethodHasBeanCalled = false;
		var ObjectWithEventHandlerMethod = {
			onTestEvent: function(){
				objectMethodHasBeanCalled = true;
			}
		};
		var eventBus = JsEB.EventBus([{
			name: "testEvent",
			handlers: [ObjectWithEventHandlerMethod]
		}]);
		eventBus.init();
		eventBus.testEvent();
		assertTrue('Object method has not bean called!', objectMethodHasBeanCalled);
	},
	
	test_passing_parameters: function(){
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
		var eventBus = JsEB.EventBus([{
			name: "testEvent",
			handlers: [ObjectWithEventHandlerMethod, eventHandlingFunction]		
		}]);
		eventBus.init();
		eventBus.testEvent('Hello!');
		assertEquals('Object handler didn\'t execute or didn\'t pass the parameter!', 'Hello!', objectHandlerParameter);
		assertEquals('Function handler didn\'t execute or didn\'t pass the parameter!', 'Hello!', functionHandlerParameter);
	},
	
	test_caller_call: function (){
		/*:DOC clickElem = <div id="clickTest">Click It</div>*/
		
		assertNotUndefined(this.clickElem);
		
		var functionHasBeanCalled = false;
		var handlingFunction = function(){
			functionHasBeanCalled = true;
		};
		
		var eventBus = JsEB.EventBus([{
			name : "testEvent",
			handlers : [handlingFunction],
			bind : [{
				obj : this.clickElem,
				event : 'click'}]
		}]);	
		eventBus.init();	
		this.commons.event.fire(this.clickElem, 'click');
		
		assertTrue('Click event didn\'t fired bus event',functionHasBeanCalled);	
	}
});
