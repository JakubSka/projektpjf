

class Offer:
    def __init__(self,
                 identifier=None,
                 title=None,
                 price=None,
                 area=None,
                 price_per_square=None,
                 url=None,
                 location=None,
                 date=None):
        self.identifier = identifier
        self.title = title
        self.price = price
        self.area = area
        self.price_per_square = price_per_square
        self.url = url
        self.location = location
        self.date = date