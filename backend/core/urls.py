from django.urls import path
from . import views
    
urlpatterns = [
	# path('', views.PostRetrieveUpdateDestroyView.as_view(), name='post'),
	path('create/', views.PostCreateView.as_view(), name='post-create'),
]