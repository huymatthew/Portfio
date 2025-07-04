from django.urls import path
from .views import dictionary_view, search_view

urlpatterns = [
    path('', dictionary_view, name='dictionary'),
    path('search/', search_view, name='search'),
]