define([
	'knockout', 
	'pubsub', 
	'../../services/feature-request-service',
	'../../services/product-area-service',
	'../feature-request-display/feature-request-display',
	'../../data-objects/feature-request',
	'text!./feature-request-display-list.html'
	], function(
		ko, 
		pubsub, 
		FeatureRequestService,
		ProductAreaService,
		FeatureRequestDisplay,
		FeatureRequest,
		htmlString
		) {
    function FeatureRequestDisplayListViewModel(params) {
		
		var self = this;		
		
		self.clientId = ko.observable();
		self.productAreaId = ko.observable();
		
		self.loadFeatureRequestDisplayListTopic = params.loadFeatureRequestDisplayListTopic();
		self.errorTopic = params.errorTopic();
		
		self.featureRequests = ko.observableArray([]);
		self.featureRequestService = new FeatureRequestService();
		
		self.productAreaService = new ProductAreaService();
		self.productAreasMap = new Map();
		
		self.addFeatureRequest = function(data) {
			data.product_area_name = self.getProductAreaName(data.product_area_id);
			self.featureRequests.push(data);
		};
		
		self.getClientFeatureRequests = function() {
			self.featureRequestService.getClientFeatureRequests(
				self.clientId, 
				self.productAreaId,
				self.getClientFeatureRequestsSuccess,
				self.getClientFeatureRequestsError
			);
		};
		
		self.getClientFeatureRequestsSuccess = function(data) {
			self.featureRequests.removeAll();
			$.each(data, function(k, v) {
				self.addFeatureRequest(v);
			});			
		};
		
		self.alertError = function() {
			if(self.errorTopic) {
				pubsub.publish(self.errorTopic, "ERROR");
			}			
		}
		
		self.getClientFeatureRequestsError = function(data) {
			self.alertError();			
		};
		
		self.setParams = function(params) {
			if(params) {
				this.clientId = params.clientId;
				this.productAreaId = params.productAreaId;
				
				this.getClientFeatureRequests();
			}
		};
		
		self.getProductAreaName = function(id) {
			return self.productAreasMap.get(id);
		}
		
		self.productAreaService.getProductAreas(
			null,
			function(data) {
				$.each(data, function(k, v) {
					self.productAreasMap.set(v.id, v.name);
				});				
			},
			function(data) {
				self.alertError();
			}
		);
		
		if(self.loadFeatureRequestDisplayListTopic) {
			pubsub.subscribe(self.loadFeatureRequestDisplayListTopic, function(msg, data) {
				self.setParams(data);
			});			
		}
	
		// if is set when first created, load list w/ data
		if(self.clientId()) {
			self.getClientFeatureRequests(self.clientId(), self.productAreaId());
		};
	}

    return { viewModel: FeatureRequestDisplayListViewModel, template: htmlString };
});