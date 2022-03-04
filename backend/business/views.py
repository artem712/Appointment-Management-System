
from rest_framework.views import APIView
from rest_framework import generics
from .serializers import AppointmentSerializer,BusinessSerializer, CustomerSerializer, ServiceSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_201_CREATED
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from .models import Customer,Business,Appointment,Service
# Create your views here.
class Signup(APIView):
    def post(self, request):
        fname = request.data.get('fname')
        lname = request.data.get('lname')
        uname = request.data.get('uname')
        email = request.data.get('email')
        try:
            user = User.objects.get(username=uname)
            return Response({"message": "Username already exits"}, HTTP_200_OK)
        except:
            pass
        pwd = request.data.get('pwd')
        user = User.objects.create(username=uname, first_name=fname, last_name=lname, email=email)
        user.set_password(pwd)
        user.save()
        Customer.objects.create(user=user, email=email)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'key': token.key},
                        status=HTTP_200_OK)


class Login(APIView):

    def post(self, request):
        email = request.data.get('email')
        pwd = request.data.get('pwd')
        username = User.objects.get(email=email.lower()).username
        user = authenticate(username=username, password=pwd)

        if email is None or pwd is None:
            return Response({'error': 'Please provide both username and password'}, status=HTTP_400_BAD_REQUEST)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            if user.is_staff:
                priority = 'business'
            else: priority = ''
            return Response({'key': token.key,'username':username, 'priority':priority},
                            status=HTTP_200_OK)
        else:
            return Response({'error': 'That user is not exist. Please sign up.'}, status=HTTP_404_NOT_FOUND)


class Admin_login(APIView):

    def post(self, request):
        uname = request.data.get('uname')
        pwd = request.data.get('pwd')
        user = authenticate(username=uname, password=pwd)
        if user.is_staff:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'key': token.key},
                            status=HTTP_200_OK)
        else:
            return Response({"error": "User is not an admin"},
                            status=HTTP_200_OK)

class BusinessView(APIView):
    serializer_class = BusinessSerializer
    # permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        username = request.GET.get('username')
        user = User.objects.get(username=username)
        
        if user:
            pro = Business.objects.all()
            serializer = self.serializer_class(pro, many=True).data
            return Response(serializer, HTTP_200_OK)

class ServiceView(APIView):
    serializer_class = ServiceSerializer
    # permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        pro = Service.objects.all()
        serializer = self.serializer_class(pro, many=True).data
        return Response(serializer, HTTP_200_OK)

class CustomerView(APIView):
    serializer_class = CustomerSerializer
    # permission_classes = [IsAdminUser]
    authentication_classes = (TokenAuthentication,)

    def get(self,request):
        pro = Customer.objects.all()
        serializer = self.serializer_class(pro, many = True).data
        return Response(serializer, HTTP_200_OK)

class AppointmentClientView(APIView):
    serializer_class = AppointmentSerializer
    # permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        username = request.GET.get('username')
        user = User.objects.get(username=username)
        customer = Customer.objects.get(user=user)
        date = request.GET.get('date')
        pro = Appointment.objects.filter(customer = customer.id, date=date).order_by('start_time')
        serializer = self.serializer_class(pro, many = True).data
        return Response(serializer, HTTP_200_OK)

class AppointmentBusinessAllView(APIView):
    serializer_class = AppointmentSerializer
    # permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        business = request.GET.get('business')
        pro = Appointment.objects.filter(business = business)
        serializer = self.serializer_class(pro, many=True).data
        return Response(serializer, HTTP_200_OK)

class AppointmentBusinessView(APIView):
    serializer_class = AppointmentSerializer
    # permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        business = request.GET.get('business')
        date = request.GET.get('date')
        pro = Appointment.objects.filter(business = business, date = date, status='confirmed')
        serializer = self.serializer_class(pro, many=True).data
        return Response(serializer, HTTP_200_OK)

class AddAppointment(APIView):
    # permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def post(self, request):
        username = request.data.get('username')
        user = User.objects.get(username=username)
        customer = Customer.objects.get(user=user)
        business_name = request.data.get("business")
        business = Business.objects.get(name = business_name)
        service = business.display_service()
        date = request.data.get('date')
        start_time = request.data.get('start_time')
        end_time = request.data.get('end_time')
        status = "pending"
        lat = request.data.get('lat')
        lon = request.data.get('lon')
        appointments=Appointment.objects.filter(business=business,date=date,status='confirmed')
        for appointment in appointments:
            if (start_time>=str(appointment.start_time) and start_time <= str(appointment.end_time)) or (end_time>=str(appointment.start_time) and end_time <= str(appointment.end_time)) or (start_time <= str(appointment.start_time) and end_time >= str(appointment.end_time)):
                return Response({"message": "That timeslot is already used"}, status=HTTP_400_BAD_REQUEST)
        Appointment.objects.create(customer=customer, business=business, service=service, status=status, date=date, start_time=start_time, end_time=end_time, lat=lat,lon=lon)
        return Response({"message": "Appointment create successfully. Please wait until business accept it."}, status=HTTP_201_CREATED)    

class RUDAppointment(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    serializer_class = AppointmentSerializer
    # permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Appointment.objects.all()

class ChangeStatus(APIView):
    serializer_class = AppointmentSerializer
    # permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def post(self,request):
        status = request.data.get('status')
        appointment_id = request.data.get('id')
        pro = Appointment.objects.filter(id=appointment_id).update(status=status)
        # pro.save()
        return Response(pro,{"message": "Succesfully changed"}, status=HTTP_201_CREATED)