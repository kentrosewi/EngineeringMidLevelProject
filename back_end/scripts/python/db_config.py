from flask_sqlalchemy import SQLAlchemy

import config
import db_secret

config.app.config['SQLALCHEMY_DATABASE_URI'] = db_secret.db_uri
config.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(config.app)