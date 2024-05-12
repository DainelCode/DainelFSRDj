
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView

# rest_framework_simplejwt
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),

    # rest_framework_simplejwt
    path('api/token', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='refresh'),
    
    # rest_framework 
    path('api-auth/', include('rest_framework.urls')),
    
    # My app (API)
    path('api/user/register', CreateUserView.as_view(), name='register'),
    path('api/', include('api.urls')),     
]
