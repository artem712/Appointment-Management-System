from django.contrib import admin

from .models import Appointment, Customer, Business, Service

# class ServiceInline(admin.TabularInline):
#     model = Service
# Register your models here.
admin.site.register(Customer)
@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ('name', 'display_service')
admin.site.register(Appointment)
admin.site.register(Service)