define([], function() {
    function ClientService(params) {
	
    }
 
	ClientService.prototype.getClients = function(clientId, successCallback, errorCallback) {
		urlString = "http://localhost:5000/client/GET";
		
		if(clientId) {
			urlString += "?id=" + clientId;
		}
		
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			cache: true,
			url: encodeURI(urlString),
			crossDomain: true,
			success: function(data) {
				if(successCallback) {
					successCallback(data);
				}
			},
			error: function(data) {
				if(errorCallback) {
					errorCallback(data);
				}
			}
		});		
	};
 
    return ClientService;
});