from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    email = models.EmailField(max_length=20, null=True)
    # status = models.CharField(max_length=20, null=True, choices=(('Pending', 'Pending'), ('Accept', 'Accept'), ('Canceled', 'Canceled')))

    def __str__(self):
        return self.user.username

class Service(models.Model):
    name = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.name

class Business(models.Model):
    name = models.CharField(max_length=30, null=True)
    service = models.ManyToManyField(Service)

    def __str__(self):
        return self.name
    def display_service(self):
        return ', '.join(service.name for service in self.service.all()[:3])

    display_service.short_description = 'Service'

class Appointment(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, null=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True)
    service = models.CharField(max_length=30, null=True)
    status = models.CharField(max_length=20, null=True, choices=(('confirmed', 'confirmed'), ('pending', 'pending'), ('canceled', 'canceled')))
    date = models.DateField(null=True)
    start_time = models.TimeField(null=True)
    end_time = models.TimeField(null=True)
    lat = models.FloatField(null=True)
    lon = models.FloatField(null=True)
    # location = models.TextField(max_length=200)

    def __str__(self):
        return self.customer.user.username + " " + self.business.name