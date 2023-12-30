import os
from datetime import datetime
import json
from typing import List
import scrapy
from scrapy.selector import SelectorList
from propertySpider.spiders.offer import Offer


class OlxSpider(scrapy.Spider):
    name = 'olx'
    allowed_domains = ['www.olx.pl']
    start_urls = [
        'https://www.olx.pl/nieruchomosci/mieszkania/sprzedaz/warszawa/?search%5Border%5D=created_at:desc']

    current_page_count = 1
    maximum_page_count = 5

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(url, callback=self.parse, errback=self.errback)

    def parse(self, response):
        offer_list = response.css('div[data-cy="l-card"]')
        offers = self.parse_property_elements(offer_list)
        self.save_to_file(offers)

        next_page = response.css('a[data-cy="pagination-forward"]::attr(href)').get()
        if next_page is not None and self.current_page_count < self.maximum_page_count:
            self.current_page_count += 1
            yield response.follow(next_page, self.parse)

    def errback(self, failure):
        self.logger.error(repr(failure))

    def save_to_file(self, data):
        file_name = self.name + '_result_{}.json'.format(datetime.now().strftime("%d-%m-%Y"))
        file_path = os.path.join(os.getcwd() + "\propertySpider\spiders\output", file_name)
        json_array = []

        if os.path.isfile(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                json_array = json.load(f)

        json_array.append(data)

        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(json_array, f, ensure_ascii=False, indent=4)

    @staticmethod
    def parse_property_elements(offer_list: SelectorList) -> List[object]:
        result = []
        for offer in offer_list:
            identifier = offer.css('a::attr(href)').get()
            title = offer.css('h6::text').get()

            location_and_date = offer.css('p[data-testid="location-date"]::text').getall()
            location = 'Unknown'
            date = 'Unknown'
            if location_and_date is not None:
                if len(location_and_date) >= 1:
                    location = location_and_date[0]

                if len(location_and_date) >= 3:
                    date = location_and_date[2]

            price = offer.css('p[data-testid="ad-price"]::text').get()

            area_and_price_per_m2 = offer.css('div[color="text-global-secondary"] > span::text').get().split('-')
            area = 'Unknown'
            price_per_square = 'Unknown'
            if area_and_price_per_m2 is not None:
                if len(area_and_price_per_m2) >= 1:
                    area = area_and_price_per_m2[0]

                if len(area_and_price_per_m2) >= 2:
                    price_per_square = area_and_price_per_m2[1]

            url = offer.css('a::attr(href)').get()

            current_offer = Offer(identifier, title, price, area, price_per_square, url, location, date)

            dict_obj = vars(current_offer)
            result.append(dict_obj)

        return result