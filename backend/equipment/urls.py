from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EquipmentViewSet, RetailerLinkViewSet

router = DefaultRouter()
router.register(r'equipment', EquipmentViewSet, basename='equipment')
router.register(r'retailer-links', RetailerLinkViewSet, basename='retailer-links')

urlpatterns = [
    path('', include(router.urls)),
] 