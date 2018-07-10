import datetime

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