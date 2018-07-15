define(['knockout'], function(ko) {
    function FeatureRequest(params) {
		var self = this;
		
		self.id = ko.observable(params.id);
		self.title = ko.observable(params.title);
		self.description = ko.observable(params.description);
		self.clientId = ko.observable(params.client_id);
		self.priority = ko.observable(params.priority);
		self.target = ko.observable(params.target);
		self.productAreaId = ko.observable(params.product_area_id);		
    }

    return FeatureRequest;
});