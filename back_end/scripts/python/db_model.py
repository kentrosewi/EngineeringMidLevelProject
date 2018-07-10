from flask import Flask
from flask_sqlalchemy import SQLAlchemy

import db_config

db = db_config.db

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