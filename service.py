from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import json
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = ''
db = SQLAlchemy(app)

#db classes
class Client(db.Model):
	__tablename__ = 'client'
	id = db.Column('id', db.Integer, primary_key=True)
	name = db.Column('name', db.Unicode)
	def __init__(self, id, name):
		self.id = id
		self.name = name

class ProductArea(db.Model):
	__tablename__ = "product_area"
	id = db.Column('id', db.Integer, primary_key=True)
	name = db.Column('name', db.Unicode)
	def __init__(self, id, name):
		self.id = id
		self.name = name

class FeatureRequest(db.Model):
	__tablename__ = "feature_request"
	id = db.Column('id', db.Integer, primary_key=True)
	title = db.Column('title', db.Unicode)
	description = db.Column('description', db.Unicode)
	client_id = db.Column('client_id', db.Integer)
	priority = db.Column('priority', db.Integer)
	target = db.Column('target', db.Date)
	product_area_id = db.Column('product_area_id', db.Integer)
	def __init__(self, id, title, description, client_id, priority, target, product_area_id):
		self.id = id
		self.title = title
		self.description = description
		self.client_id = client_id
		self.priority = priority
		self.target = target
		self.product_area_id = product_area_id

#utility functions
def as_dict(self):
	return {c.name: getattr(self, c.name) for c in self.__table__.columns}

def dict_list(self):
	new_list = list()
	for i in self:
		new_list.append(as_dict(i))
	return new_list

def convert(to_convert):
	if isinstance(to_convert, datetime.date):
		return to_convert.__str__()

#api routes
@app.route("/")
def index():
	return "index"

@app.route("/client/GET", methods=['GET'])
def get_client():
	clients = Client.query.all()
	return json.dumps(dict_list(clients))

@app.route("/product-area/GET", methods=['GET'])
def get_product_area():
	product_areas = ProductArea.query.all()
	return json.dumps(dict_list(product_areas))

@app.route("/feature-request/GET", methods=['GET'])
def get_feature_request():
	client_id_param = request.args.get("clientId")
	product_area_id_param = request.args.get("productAreaId")
	
	if not product_area_id_param:
		feature_requests = FeatureRequest.query.filter_by(client_id=client_id_param)
	else:
		feature_requests = FeatureRequest.query.filter_by(client_id=client_id_param, product_area_id=product_area_id_param)
	
	return json.dumps(dict_list(feature_requests), default = convert)

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