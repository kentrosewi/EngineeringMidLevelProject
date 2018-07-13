from datetime import date

import unittest
import utility

class UtilityTestMethods(unittest.TestCase):

		def test_convert_is_none(self):
			non_date = "I am not a date."
			self.assertIsNone(utility.convert(non_date))

		def test_convert_is_date(self):
			current_date = date.today()
			current_date_converted = utility.convert(current_date)
			self.assertIsNotNone(current_date_converted)
			self.assertEquals(
				current_date_converted, 
				str(current_date.year) + '-' + 
				str(current_date.month).zfill(2) + '-' + 
				str(current_date.day).zfill(2))
			