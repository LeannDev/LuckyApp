import base64

from django.views import View
from django.shortcuts import render
from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from django.http import JsonResponse
from django.views.generic import TemplateView # for urls.py
from django.http import JsonResponse


from base_project.settings import CURRENT_SITE, BRAND, SLOGAN

class HomeView(View):

    def get(self, request, *args, **kwargs):

        title = 'Pay or Not? - The Ultimate Fun Game to Decide Who Pays the Bill!'
        meta_description = 'Turn paying the bill into an exciting game of luck! No more awkward moments – let Pay or Not make every decision fun and fair. Start playing now!'
        social_title = title
        image = '/media/main/brand.webp'

        context = {
            'site': CURRENT_SITE,
            'brand': BRAND,
            'slogan': SLOGAN,
            'title': title,
            'meta_description': meta_description,
            'social_title': social_title,
            'social_description': meta_description,
            'image': image,
        }

        return render(request, 'home.html', context)
    
class PlayView(View):

    def get(self, request, *args, **kwargs):

        title = 'Start a New Game - Let Luck Decide Who Pays!'
        meta_description = 'Ready to play? Create a new game, add players, and let fate decide who pays the bill. Quick, fun, and perfect for any group! Start now!'
        social_title = title
        image = '/media/main/brand.webp'

        context = {
            'site': CURRENT_SITE,
            'brand': BRAND,
            'slogan': SLOGAN,
            'title': title,
            'meta_description': meta_description,
            'social_title': social_title,
            'social_description': meta_description,
            'image': image,
        }

        return render(request, 'play.html', context)
    
class PlayingView(View):

    def is_valid_participants(self, participants):
        """Validate if the number of participants is an integer greater than 1."""
        try:
            num = int(participants)
            return num > 1
        except ValueError:
            return False

    def get(self, request, *args, **kwargs):
        title = 'Test Your Luck - Who Pays Today?'
        meta_description = 'The game is on! Scan the QR code, press the button, and see who luck favors. Will it be you, or someone else? Find out now!'
        social_title = title
        image = '/media/main/brand.webp'

        # Obtener los parámetros de la URL
        encoded_players = request.GET.get('np', None)
        encoded_url = request.GET.get('pl', None)

        if not encoded_players or not encoded_url:
            return JsonResponse({"error": "Missing parameters"}, status=400)

        try:
            # Decodificar los valores desde Base64
            decoded_players = base64.b64decode(encoded_players).decode('utf-8')
            decoded_url = base64.b64decode(encoded_url).decode('utf-8')
        except (base64.binascii.Error, UnicodeDecodeError):
            return JsonResponse({"error": "Invalid Base64 encoding"}, status=400)

        # Validar los datos decodificados
        if not self.is_valid_participants(decoded_players):
            return JsonResponse({"error": "Invalid number of participants"}, status=400)

        # Preparar el contexto
        context = {
            'site': CURRENT_SITE,
            'brand': BRAND,
            'slogan': SLOGAN,
            'title': title,
            'meta_description': meta_description,
            'social_title': social_title,
            'social_description': meta_description,
            'image': image,
            'players': decoded_players,
            'url': decoded_url
        }

        return render(request, 'playing.html', context)
    
class LuckyView(View):

    def get(self, request, *args, **kwargs):

        title = 'Fate Decided - Who Pays the Bill?'
        meta_description = 'The moment of truth! See if luck is on your side or if it’s your turn to pay. Fun, suspense, and a little bit of luck – find out now!'
        social_title = title
        image = '/media/main/brand.webp'

        # Obtener los parámetros de la URL
        encoded_url = request.GET.get('url', None)
        pay = request.GET.get('pay', None)

        if pay == 'true':
            try:
                # Decodificar los valores desde Base64
                decoded_url = base64.b64decode(encoded_url).decode('utf-8').strip('"')
            except:
                return JsonResponse({"error": "Invalid URL"}, status=400)
        else:
            pay = False
            decoded_url = False
        
        context = {
            'site': CURRENT_SITE,
            'brand': BRAND,
            'slogan': SLOGAN,
            'title': title,
            'meta_description': meta_description,
            'social_title': social_title,
            'social_description': meta_description,
            'image': image,
            'pay': pay,
            'url': decoded_url
        }

        return render(request, 'lucky.html', context)
    
class AboutUsView(View):

    def get(self, request):

        title = 'About Us'
        meta_description = 'About Us'
        social_title = title
        image = '/media/main/brand.webp'

        context = {
            'site': CURRENT_SITE,
            'brand': BRAND,
            'slogan': SLOGAN,
            'title': title,
            'meta_description': meta_description,
            'social_title': social_title,
            'social_description': meta_description,
            'image': image,
        }

        return render(request, 'about_us.html', context)
    
class CookiesView(View):

    def get(self, request):

        title = 'Cookie Policy'
        meta_description = 'Cookie Policy'
        social_title = title
        image = '/media/main/brand.webp'

        context = {
            'site': CURRENT_SITE,
            'brand': BRAND,
            'slogan': SLOGAN,
            'title': title,
            'meta_description': meta_description,
            'social_title': social_title,
            'social_description': meta_description,
            'image': image,
        }

        return render(request, 'politics/cookies.html', context)
    
class LegalView(View):

    def get(self, request):

        title = 'Legal Notice'
        meta_description = 'Legal Notice'
        social_title = title
        image = '/media/main/brand.webp'

        context = {
            'site': CURRENT_SITE,
            'brand': BRAND,
            'slogan': SLOGAN,
            'title': title,
            'meta_description': meta_description,
            'social_title': social_title,
            'social_description': meta_description,
            'image': image,
        }

        return render(request, 'politics/legal.html', context)
    
class PrivacyView(View):

    def get(self, request):

        title = 'Privacy Policy'
        meta_description = 'Privacy Policy'
        social_title = title
        image = '/media/main/brand.webp'

        context = {
            'site': CURRENT_SITE,
            'brand': BRAND,
            'slogan': SLOGAN,
            'title': title,
            'meta_description': meta_description,
            'social_title': social_title,
            'social_description': meta_description,
            'image': image,
        }

        return render(request, 'politics/privacy.html', context)
    

class SitemapView(Sitemap):

    changefreq = "daily"
    priority = 0.5

    def items(self):
        # Lista de nombres de vistas
        return ['home', 'about-us', 'play', 'lucky', 'capture_parameters', 'cookies', 'legal', 'privacy']

    def location(self, item):
        return reverse(item)