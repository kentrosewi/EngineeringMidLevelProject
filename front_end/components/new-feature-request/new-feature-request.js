define(['knockout', 'text!./new-feature-request.html'], function(ko, htmlString) {
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
			document.getElementById("targetDateInput").setAttribute("min", today);
			fiveYearsFromToday = (yyyy + 5) + '-' + mm + '-' + dd;
			document.getElementById("targetDateInput").setAttribute("max", fiveYearsFromToday);
		}
	
		self.setTargetDateBounds();
		
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
			
			self.submitNewFeatureRequestService(newFeatureRequestModel);
		};

		self.submitNewFeatureRequestService = function(newFeatureRequest) {
			urlString = "http://localhost:5000/feature-request/POST?";
			
			if(newFeatureRequest.title) {
				urlString += "title=" + newFeatureRequest.title + "&";
			}
			
			if(newFeatureRequest.description) {
				urlString += "description=" + newFeatureRequest.description + "&";
			}
			
			if(newFeatureRequest.target) {
				urlString += "target=" + newFeatureRequest.target + "&";
			}
			
			if(newFeatureRequest.priority) {
				urlString += "priority=" + newFeatureRequest.priority + "&";
			}
			
			if(newFeatureRequest.client_id) {
				urlString += "clientId=" + newFeatureRequest.client_id + "&";
			}
			
			if(newFeatureRequest.product_area_id) {
				urlString += "productAreaId=" + newFeatureRequest.product_area_id;
			}		
			
			$.ajax({
				type: "GET",
				contentType: "application/json; charset=utf-8",
				dataType: "jsonp",
				url: encodeURI(urlString),
				crossDomain: true,
				success: function(data) {
					console.log("submit fr success" + data);
					document.getElementById("submitForm").reset();
					// $('#submitBlock').collapse('toggle')
					// alertSuccess();
				},
				error: function(data) {
					console.log("submit fr error " + data);
					// alertError();
				}
			});			
		};		
		
		self.getClients = function(clientId) {
			self.clients.removeAll();
			urlString = "http://localhost:5000/client/GET";
			
			if(clientId) {
				urlString += "?id=" + clientId;
			}
			
			$.ajax({
				type: "GET",
				contentType: "application/json; charset=utf-8",
				dataType: "jsonp",
				url: encodeURI(urlString),
				crossDomain: true,
				success: function(data) {
					$.each(data, function(k, v) {
						self.clients.push(v);
					});
				},
				error: function(data) {
					alertError();
				}
			});			
		};		
		
		self.getProductAreas = function(productAreaId) {
			self.productAreas.removeAll();
			urlString = "http://localhost:5000/product-area/GET";
			
			if(productAreaId) {
				urlString += "?id=" + productAreaId;
			}
			
			$.ajax({
				type: "GET",
				contentType: "application/json; charset=utf-8",
				dataType: "jsonp",
				url: encodeURI(urlString),
				crossDomain: true,
				success: function(data) {
					$.each(data, function(k, v) {
						self.productAreas.push(v);	
						//self.productAreasMap.set(v.id, v.name);
					});				
				},
				error: function(data) {
					alertError();
				}
			});			
		};	
		
		self.getClients();
		self.getProductAreas();
    }
 
    // Use prototype to declare any public methods
    //NewFeatureRequestViewModel.prototype.doSomething = function() { ... };
	//ko.applyBindings(new NewFeatureRequestViewModel());
    // Return component definition
    return { viewModel: NewFeatureRequestViewModel, template: htmlString };
});