from rest_framework import serializers
from .models import *

class CustomerSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    # status = serializers.SerializerMethodField()
    class Meta:
        model = Customer
        fields = ('id', 'user', 'first_name', 'last_name', 'email')

    def get_user(self, obj):
        return obj.user.username
    def get_first_name(self, obj):
        return obj.user.first_name
    def get_last_name(self, obj):
        return obj.user.last_name

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ('id', 'name', 'service')

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('id', 'name')

class AppointmentSerializer(serializers.ModelSerializer):
    business = serializers.SerializerMethodField()
    customer = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = ('id', 'customer', 'business', 'service','status', 'date', 'start_time', 'end_time','lat','lon')

    def get_customer(self, obj):
        return obj.customer.user.username

    def get_business(self, obj):
        return obj.business.name

    def get_status(self, obj):
        return obj.get_status_display()