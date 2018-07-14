from flask import request

import json
import utility
import db_manager
import config

app = config.app

@app.route("/client/GET", methods=['GET'])
def get_client():
	clients = db_manager.get_client(request.args.get("id"))
	return request.args.get("callback") + "(" + json.dumps(utility.dict_list(clients)) + ")"

@app.route("/product-area/GET", methods=['GET'])
def get_product_area():
	product_areas = db_manager.get_product_area(request.args.get("id"))
	return request.args.get("callback") + "(" + json.dumps(utility.dict_list(product_areas)) + ")"

@app.route("/feature-request/GET", methods=['GET'])
def get_feature_request():
	feature_request_id_param = request.args.get("id")
	client_id_param = request.args.get("clientId")
	product_area_id_param = request.args.get("productAreaId")
	priority_param = request.args.get("priority")
	
	feature_requests = db_manager.get_feature_request(feature_request_id_param, client_id_param, product_area_id_param, priority_param)
	# return json.dumps(utility.dict_list(feature_requests), default = utility.convert)
	return request.args.get("callback") + "(" + json.dumps(utility.dict_list(feature_requests), default = utility.convert) + ")"
		
		

@app.route("/feature-request/POST", methods=['GET'])
#@app.route("/feature-request/POST/", methods=['POST'])
def post_feature_request():
	title_param = request.args.get("title")
	description_param = request.args.get("description")
	client_id_param = request.args.get("clientId")
	priority_param = request.args.get("priority")
	target_param = request.args.get("target")
	product_area_id_param = request.args.get("productAreaId")

	db_manager.post_feature_request(title_param, description_param, client_id_param, priority_param, target_param, product_area_id_param)

if (__name__ == "__main__"):
	app.run(host='0.0.0.0')