from django.conf.urls import url
from django.urls import include, path
from .views import *

urlpatterns = [
    path('login/', Login.as_view(), name='login'),
    path('signup/', Signup.as_view(), name='signup'),
    path('admin-login/', Admin_login.as_view(), name='admin-login'),
    path('business/', BusinessView.as_view(), name='business'),
    path('service/', ServiceView.as_view(), name='service'),
    path('client/', AppointmentClientView.as_view(), name='appointment'),
    path('customer/', CustomerView.as_view(), name='customer'),
    path('businessview/', AppointmentBusinessView.as_view(), name='appointment-date'),
    path('add/', AddAppointment.as_view(), name='add-appointment'),
    path('businessAll/', AppointmentBusinessAllView.as_view(), name='appointment-business'),
    url(r'^(?P<id>\d+)/$', RUDAppointment.as_view(), name='rud-appointment'),
    path('change/', ChangeStatus.as_view(), name='change-status'),
]