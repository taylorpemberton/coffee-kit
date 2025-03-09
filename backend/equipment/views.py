from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404

from .models import Equipment, RetailerLink
from .serializers import (
    EquipmentSerializer, 
    EquipmentCreateUpdateSerializer,
    RetailerLinkSerializer
)

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to the owner
        return obj.user == request.user

class EquipmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows equipment to be viewed or edited.
    """
    queryset = Equipment.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return EquipmentCreateUpdateSerializer
        return EquipmentSerializer
    
    def get_queryset(self):
        # Filter equipment by the current user
        return Equipment.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def add_retailer(self, request, pk=None):
        equipment = self.get_object()
        serializer = RetailerLinkSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(equipment=equipment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['delete'])
    def remove_retailer(self, request, pk=None):
        equipment = self.get_object()
        retailer_id = request.data.get('retailer_id')
        
        if not retailer_id:
            return Response(
                {"error": "retailer_id is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        retailer = get_object_or_404(RetailerLink, equipment=equipment, id=retailer_id)
        retailer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class RetailerLinkViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows retailer links to be viewed or edited.
    """
    serializer_class = RetailerLinkSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Filter retailer links by the current user's equipment
        return RetailerLink.objects.filter(equipment__user=self.request.user)
