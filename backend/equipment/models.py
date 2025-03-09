from django.db import models
from django.contrib.auth.models import User

class Equipment(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    image = models.URLField(blank=True, null=True)
    purchase_date = models.DateField(blank=True, null=True)
    purchase_location = models.CharField(max_length=255, blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='equipment')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class RetailerLink(models.Model):
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE, related_name='retailers')
    retailer_id = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    url = models.URLField()
    affiliate_code = models.CharField(max_length=50, blank=True, null=True)
    
    def __str__(self):
        return f"{self.equipment.name} - {self.retailer_id}"
