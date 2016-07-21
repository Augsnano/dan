"""tarena URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin
from dan import views

# from django.contrib.auth import urls as auth_urls

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.do_login, name='index'),                    # 默认页
    url(r'^login/$', views.do_login, name='login'),              # 登录页
    url(r'^reg/$', views.register, name='register'),          # 注册页
    url(r'^logout/', views.do_logout, name='logout'),           # 注销
    url(r'^member/', views.mem),
    url(r'^captcha/', include('captcha.urls')),
]
# urlpatterns += patterns('',
#     url(r'^captcha/', include('captcha.urls')),
# )