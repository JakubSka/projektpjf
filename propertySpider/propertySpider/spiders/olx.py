import scrapy

class OlxSpider(scrapy.Spider):
    name = 'olx'
    allowed_domains = ['www.olx.pl']
    start_urls = ['https://www.olx.pl/']

    def parse(self, response):
       pass
