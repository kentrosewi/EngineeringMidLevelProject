define([
	'knockout', 
	'pubsub', 
	'text!./new-feature-request.html', 
	'../../services/feature-request-service', 
	'../../services/client-service',
	'../../services/product-area-service'
	], function(
		ko, 
		pubsub, 
		htmlString, 
		FeatureRequestService, 
		ClientService, 
		ProductAreaService
		) {
    function NewFeatureRequestViewModel(params) {
		var self = this;		

		self.clients = ko.observableArray([]);
		self.productAreas = ko.observableArray([]);
		
		self.newTitle = ko.observable();
		self.newDescription = ko.observable();
		self.newClientId =ko.observable();
		self.newProductAreaId = ko.observable();
		self.newTargetDate = ko.observable();
		self.newPriority = ko.observable();
		self.submitNewFeatureRequestTopic = params.submitNewFeatureRequestTopic();
		self.SUCCESS = "SUCCESS";
		self.ERROR = "ERROR";
		
		self.featureRequestService = new FeatureRequestService();
		self.clientService = new ClientService();
		self.productAreaService = new ProductAreaService();
		
		self.setTargetDateBounds = function() {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1; 
			var yyyy = today.getFullYear();
			if(dd < 10){
				dd = '0' + dd
			} 
			if(mm < 10){
				mm = '0' + mm
			} 

			today = yyyy + '-' + mm + '-' + dd;
			$('#targetDateInput').attr("min", today);

			fiveYearsFromToday = (yyyy + 5) + '-' + mm + '-' + dd;
			$('#targetDateInput').attr("max", fiveYearsFromToday);
		}
	
		self.setTargetDateBounds();
		
		self.publishToSubmitNewFeatureRequestTopic = function(successful) {
			var result = self.ERROR;
			if(successful) {
				result = self.SUCCESS;	
			} 			
			
			if(self.submitNewFeatureRequestTopic) {
				pubsub.publish(self.submitNewFeatureRequestTopic, result);				
			}							
		}
		
		self.submitNewFeatureRequest = function() {
			newFeatureRequestModel = {
				"id": 0,
				"title": self.newTitle(),
				"description": self.newDescription(),
				"client_id": self.newClientId(),
				"priority": self.newPriority(),
				"target": self.newTargetDate(),
				"product_area_id": self.newProductAreaId()
			}			
			
			self.featureRequestService.submitNewFeatureRequest(
				newFeatureRequestModel,
				function() {
					$('#submitForm').trigger("reset");
					self.publishToSubmitNewFeatureRequestTopic(true);
				},
				function() {
					self.publishToSubmitNewFeatureRequestTopic(true);
				}
			);
		};		

		self.clientService.getClients(
			null, 
			function(data) {
				self.clients.removeAll();
				$.each(data, function(k, v) {
					self.clients.push(v);
				});		
			}, function(data) {
				alertError();			
			}
		);
		
		self.productAreaService.getProductAreas(
			null, 
			function(data) {
				self.productAreas.removeAll();
				$.each(data, function(k, v) {
					self.productAreas.push(v);
				});		
			}, function(data) {
				alertError();			
			}
		);
    }
 
    return { viewModel: NewFeatureRequestViewModel, template: htmlString };
});