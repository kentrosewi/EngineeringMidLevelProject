from flask import Flask
from flask_testing import TestCase

class UtilityFlaskTestMethods(TestCase):

	SQLALCHEMY_DATABASE_URI = 'mysql://'
	TESTING = True
	
	def create_app(self):
		app = Flask(__name__)
        app.config['TESTING'] = True
		#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://'
		#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
		#db = SQLAlchemy(app)
		return app

	#def setUp(self):
	#	db.create_all()
		
	#def tearDown(self):
	#	db.session.remove()
	#	db.drop_all()
		
	#TODO tests