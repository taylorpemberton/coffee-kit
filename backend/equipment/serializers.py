from rest_framework import serializers
from .models import Equipment, RetailerLink
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']

class RetailerLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = RetailerLink
        fields = ['id', 'retailer_id', 'price', 'url', 'affiliate_code']
        read_only_fields = ['id']

class EquipmentSerializer(serializers.ModelSerializer):
    retailers = RetailerLinkSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Equipment
        fields = [
            'id', 'name', 'category', 'price', 'description', 
            'image', 'purchase_date', 'purchase_location', 
            'link', 'user', 'retailers', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        # Get the current user from the context
        user = self.context['request'].user
        # Add the user to the validated data
        validated_data['user'] = user
        return super().create(validated_data)

class EquipmentCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = [
            'name', 'category', 'price', 'description', 
            'image', 'purchase_date', 'purchase_location', 'link'
        ] 