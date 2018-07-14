from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from db_model import Client, ProductArea, FeatureRequest

import db_config

db = db_config.db

def get_client(id_param):
	where = {}
	
	if id_param:
		where['id'] = id_param
		
	return Client.query.filter_by(**where)

		
def get_product_area(id_param):
	where = {}
	
	if id_param:
		where['id'] = id_param
	
	return ProductArea.query.filter_by(**where)

def get_feature_request(id_param, client_id_param, product_area_id_param, priority_param):
	where = {}
	
	if id_param:
		where['id'] = id_param
	if client_id_param:
		where['client_id'] = client_id_param
	if product_area_id_param:
		where['product_area_id'] = product_area_id_param
	if priority_param:
		where['priority'] = priority_param
	
	return FeatureRequest.query.filter_by(**where).order_by(FeatureRequest.priority.asc())
	
def post_feature_request(title_param, description_param, client_id_param, priority_param, target_param, product_area_id_param):
	if has_same_priority_feature_request(client_id_param, priority_param):
		increment_priority(client_id_param, priority_param)
		
	new_feature_request = FeatureRequest(0, title_param, description_param, client_id_param, priority_param, target_param, product_area_id_param)
	db.session.add(new_feature_request)
	db.session.commit()
	
def delete_feature_request(feature_request_id_param):
	if feature_request_id_param:
		feature_requests = get_feature_request(feature_request_id_param, '', '', '')
		if feature_requests.count() == 1:
			db.session.delete(feature_requests[0])
			db.session.commit()
		
def has_same_priority_feature_request(client_id_param, priority_param):
	feature_requests = get_feature_request('', client_id_param, '', priority_param)

	if feature_requests:
		return True
	else:
		return False
		
def increment_priority(client_id_param, priority_param):
	feature_requests = FeatureRequest.query.filter(FeatureRequest.client_id==client_id_param, FeatureRequest.priority >= priority_param)
	for fr in feature_requests:
		fr.priority += 1