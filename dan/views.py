from django.shortcuts import render,render_to_response
from .models import MyUser
from django.http import HttpResponse,HttpResponseRedirect
from django.template import RequestContext
import time
from .myclass import form
from django.template import RequestContext
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required


# Create your views here.

def index(request):
    return render(request, 'index.html' )

# @login_required
def mem(request):
    return render(request, 'member.html')

#注册
def register(request):
    error = []
    # if request.method == 'GET':
    #     return render_to_response('register.html',{'uf':uf})
    if request.method == 'POST':
        uf = form.RegisterForm(request.POST)
        if uf.is_valid():
            username = uf.cleaned_data['username']
            password = uf.cleaned_data['password']
            password2 = uf.cleaned_data['password2']
            qq = uf.cleaned_data['qq']
            email = uf.cleaned_data['email']
            mobile = uf.cleaned_data['mobile']
            type = uf.cleaned_data['type']
            if not MyUser.objects.all().filter(username=username):
                user = MyUser()
                user.username = username
                user.set_password(password)
                user.qq = qq
                user.email = email
                user.mobile = mobile
                user.type = type
                user.save()
                return render_to_response('member.html', {'username': username})
    else:
        uf = form.RegisterForm()
    return render_to_response('register.html',{'uf':uf,'error':error})

#登陆
def do_login(request):

    if request.method =='POST':
        lf = form.LoginForm(request.POST)
        if lf.is_valid():
            username = lf.cleaned_data['username']
            password = lf.cleaned_data['password']
            user = authenticate(username=username, password=password)               #django自带auth验证用户名密码
            if user is not None:                                                  #判断用户是否存在
                if user.is_active:                                                  #判断用户是否激活
                    login(request,user)                                                 #用户信息验证成功后把登陆信息写入session
                    return render_to_response("member.html", {'username':username})
                else:
                    return render_to_response('disable.html',{'username':username})
            else:
                return HttpResponse("无效的用户名或者密码!!!")
    else:
        lf = form.LoginForm()
    return render_to_response('index.html',{'lf':lf})


#退出
def do_logout(request):
    logout(request)
    return HttpResponseRedirect('/')