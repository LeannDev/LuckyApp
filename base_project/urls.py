from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.sitemaps.views import sitemap

from .views import TemplateView, HomeView, PlayView, PlayingView, LuckyView, AboutUsView, CookiesView, LegalView, PrivacyView, SitemapView

sitemaps = {
    'static': SitemapView,
}

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('play/', PlayView.as_view(), name='play'),
    path('lucky/', LuckyView.as_view(), name='lucky'),
    path('play/go/', PlayingView.as_view(), name='capture_parameters'),
    path('about-us/', AboutUsView.as_view(), name='about-us'),
    path('cookies/', CookiesView.as_view(), name='cookies'),
    path('legal/', LegalView.as_view(), name='legal'),
    path('privacy/', PrivacyView.as_view(), name='privacy'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='sitemap'), # Sitemap
    path('robots.txt', TemplateView.as_view(template_name='robots.txt', content_type="text/plain"), name='robots'), # robots.txt
    # path('admin/', admin.site.urls),
]

# Static files route
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_URL)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
