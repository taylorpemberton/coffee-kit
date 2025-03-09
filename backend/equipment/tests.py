from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Equipment, RetailerLink
import json
from decimal import Decimal

class EquipmentAPITestCase(TestCase):
    def setUp(self):
        # Create test users
        self.user1 = User.objects.create_user(
            username='testuser1', 
            email='test1@example.com', 
            password='testpassword1'
        )
        self.user2 = User.objects.create_user(
            username='testuser2', 
            email='test2@example.com', 
            password='testpassword2'
        )
        
        # Create test equipment
        self.equipment1 = Equipment.objects.create(
            name='Test Espresso Machine',
            category='Espresso Machine',
            price=Decimal('999.99'),
            description='A test espresso machine',
            user=self.user1
        )
        
        self.equipment2 = Equipment.objects.create(
            name='Test Grinder',
            category='Grinder',
            price=Decimal('299.99'),
            description='A test grinder',
            user=self.user2
        )
        
        # Create test retailer link
        self.retailer_link = RetailerLink.objects.create(
            equipment=self.equipment1,
            retailer_id='amazon',
            price=Decimal('899.99'),
            url='https://example.com/product'
        )
        
        # Set up API client
        self.client = APIClient()
    
    def test_list_equipment_authenticated(self):
        # Authenticate as user1
        self.client.force_authenticate(user=self.user1)
        
        # Get equipment list
        url = reverse('equipment-list')
        response = self.client.get(url)
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'Test Espresso Machine')
    
    def test_create_equipment(self):
        # Authenticate as user1
        self.client.force_authenticate(user=self.user1)
        
        # Create new equipment
        url = reverse('equipment-list')
        data = {
            'name': 'New Coffee Machine',
            'category': 'Coffee Machine',
            'price': '499.99',
            'description': 'A new coffee machine'
        }
        response = self.client.post(url, data, format='json')
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Equipment.objects.count(), 3)
        
        # Check that the equipment was created with the correct user
        new_equipment = Equipment.objects.get(name='New Coffee Machine')
        self.assertEqual(new_equipment.user, self.user1)
    
    def test_update_equipment_owner(self):
        # Authenticate as user1 (owner of equipment1)
        self.client.force_authenticate(user=self.user1)
        
        # Update equipment1
        url = reverse('equipment-detail', args=[self.equipment1.id])
        data = {
            'name': 'Updated Espresso Machine',
            'category': 'Espresso Machine',
            'price': '1099.99',
            'description': 'An updated espresso machine'
        }
        response = self.client.put(url, data, format='json')
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check that the equipment was updated
        self.equipment1.refresh_from_db()
        self.assertEqual(self.equipment1.name, 'Updated Espresso Machine')
        self.assertEqual(self.equipment1.price, Decimal('1099.99'))
    
    def test_update_equipment_non_owner(self):
        # Authenticate as user2 (not owner of equipment1)
        self.client.force_authenticate(user=self.user2)
        
        # Try to update equipment1
        url = reverse('equipment-detail', args=[self.equipment1.id])
        data = {
            'name': 'Hacked Espresso Machine',
            'category': 'Espresso Machine',
            'price': '1.99',
            'description': 'A hacked espresso machine'
        }
        response = self.client.put(url, data, format='json')
        
        # Check response (should be forbidden)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
        # Check that the equipment was not updated
        self.equipment1.refresh_from_db()
        self.assertEqual(self.equipment1.name, 'Test Espresso Machine')
    
    def test_add_retailer_link(self):
        # Authenticate as user1
        self.client.force_authenticate(user=self.user1)
        
        # Add retailer link to equipment1
        url = reverse('equipment-add-retailer', args=[self.equipment1.id])
        data = {
            'retailer_id': 'bestbuy',
            'price': '949.99',
            'url': 'https://example.com/bestbuy/product'
        }
        response = self.client.post(url, data, format='json')
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Check that the retailer link was created
        self.assertEqual(RetailerLink.objects.count(), 2)
        new_link = RetailerLink.objects.get(retailer_id='bestbuy')
        self.assertEqual(new_link.equipment, self.equipment1)
        self.assertEqual(new_link.price, Decimal('949.99'))
