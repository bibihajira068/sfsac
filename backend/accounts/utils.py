from django.core.mail import  EmailMessage, send_mail
import pyotp  
import os  
from datetime import datetime, timedelta


################################################################
# Code for Sending OTP on Phone
################################################################

def send_otp_to_email(request, email):
    # send the msg to the client
    totp = pyotp.TOTP(pyotp.random_base32(), interval=900)
    otp = totp.now()
    print(otp)
    request.session["email_otp_secret_key"] = totp.secret 
    valid_date = datetime.now()+timedelta(seconds=900)
    request.session["valid_time"] = str(valid_date)
    subject="OTP for verification"
    message = f"Your One time Verification code is: {otp}"
 
    send_mail(
        subject='Your OTP for Registration',
        message=message,
        from_email = "1hk18cs009@hkbk.edu.in",
        recipient_list=[email],
    )
  
    # print(otp)
 
    return otp