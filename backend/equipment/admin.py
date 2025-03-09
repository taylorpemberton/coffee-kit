from django.contrib import admin
from .models import Equipment, RetailerLink

class RetailerLinkInline(admin.TabularInline):
    model = RetailerLink
    extra = 1

@admin.register(Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'user', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('name', 'description', 'category')
    readonly_fields = ('created_at', 'updated_at')
    inlines = [RetailerLinkInline]

@admin.register(RetailerLink)
class RetailerLinkAdmin(admin.ModelAdmin):
    list_display = ('equipment', 'retailer_id', 'price', 'url')
    list_filter = ('retailer_id',)
    search_fields = ('equipment__name', 'retailer_id')
