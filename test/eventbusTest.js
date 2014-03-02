define(['eventbus'], function(EventBus){

	describe("Function can be a handler", function() {
		var eventBus = EventBus();

		var functionHasBeanCalled = false;
		var handlingFunction = function(){
			functionHasBeanCalled = true;
		};
		
		eventBus.init([{
			name: "testEvent",
			handlers: [handlingFunction]
		}]);
		
		it("function should be called", function(){
			eventBus.testEvent();
			expect(functionHasBeanCalled).toBe(true);
		});
	});
	
	describe("Object method can be a handler", function() {
		var eventBus = EventBus();

		var objectMethodHasBeanCalled = false;
		var ObjectWithEventHandlerMethod = {
			onTestEvent: function(){
				objectMethodHasBeanCalled = true;
			}
		};
		
		eventBus.init([{
			name: "testEvent",
			handlers: [ObjectWithEventHandlerMethod]
		}]);
		
		it("on[EventName] method should be called", function(){
			eventBus.testEvent();
			expect(objectMethodHasBeanCalled).toBe(true);
		});
	});
	
	describe("Passing parameters", function() {
		var eventBus = EventBus();
		
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
		
		eventBus.init([{
			name: "testEvent",
			handlers: [ObjectWithEventHandlerMethod, eventHandlingFunction]		
		}]);

		eventBus.testEvent('Hello!');
		
		it("should execute and pass parameter to function", function(){
			expect(functionHandlerParameter).toBe('Hello!');
		});
		
		it("should execute and pass parameter to object method", function(){
			expect(objectHandlerParameter).toBe('Hello!');
		});
	});
});