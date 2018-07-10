from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from db_model import Client, ProductArea, FeatureRequest
import json
import utility
import db_config

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = db_config.db_uri
db = SQLAlchemy(app)

@app.route("/client/GET", methods=['GET'])
def get_client():
	clients = Client.query.all()
	return json.dumps(utility.dict_list(clients))

@app.route("/product-area/GET", methods=['GET'])
def get_product_area():
	product_areas = ProductArea.query.all()
	return json.dumps(utility.dict_list(product_areas))

@app.route("/feature-request/GET", methods=['GET'])
def get_feature_request():
	client_id_param = request.args.get("clientId")
	product_area_id_param = request.args.get("productAreaId")
	
	if not product_area_id_param:
		feature_requests = FeatureRequest.query.filter_by(client_id=client_id_param)
	else:
		feature_requests = FeatureRequest.query.filter_by(client_id=client_id_param, product_area_id=product_area_id_param)
	
	return json.dumps(utility.dict_list(feature_requests), default = utility.convert)

@app.route("/feature-request/POST", methods=['GET'])
#@app.route("/feature-request/POST/", methods=['POST'])
def post_feature_request():
	title_param = request.args.get("title")
	description_param = request.args.get("description")
	client_id_param = request.args.get("clientId")
	priority_param = request.args.get("priority")
	target_param = request.args.get("target")
	product_area_id_param = request.args.get("productAreaId")

	if has_same_priority_feature_request(client_id_param, priority_param):
		increment_priority(client_id_param, priority_param)
	
	new_feature_request = FeatureRequest(0, title_param, description_param, client_id_param, priority_param, target_param, product_area_id_param)

	db.session.add(new_feature_request)
	db.session.commit()

	return "posted feature request"

def increment_priority(client_id_param, priority_param):
	feature_requests = FeatureRequest.query.filter(FeatureRequest.client_id==client_id_param, FeatureRequest.priority >= priority_param)
	for fr in feature_requests:
		fr.priority += 1
#	db.session.commit() 
	
def has_same_priority_feature_request(client_id_param, priority_param):
	feature_requests = FeatureRequest.query.filter_by(client_id=client_id_param, priority=priority_param)
	if feature_requests:
		return True
	else:
		return False

if (__name__ == "__main__"):
	app.run(host='0.0.0.0')