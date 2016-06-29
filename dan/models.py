from __future__ import unicode_literals
from django.db import models

# Create your models here.
#用户表
class User(models.Model):
    UserName = models.CharField(u'用户名', max_length=100)
    PassWord = models.CharField(u'密码', max_length=64)
    Mail = models.CharField(u'邮箱', max_length=64)
    VerifiedMail = models.CharField(u'邮箱是否认证',default=0, max_length=1)                 #默认是0，未认证， 1：已认证
    QQ = models.CharField(u'qq号', max_length=16)
    WeChat =models.CharField(u'微信账号', max_length=100)
    Mobile =models.CharField(u'手机号', primary_key=True, max_length=11)
    Status =models.CharField(u'状态', default='0', max_length=1)                             #默认是0，未认证， 1：身份证认证， 2：视频认证
    RefUserID = models.CharField(u'推荐人ID', max_length=20)
    Level = models.CharField(u'用户等级', default='0', max_length=2)                        #默认是0，用户等级0-9
    VerifiedViedo = models.CharField(u'视频认证', default='0', max_length=2)                #默认是0，未认证。 1：已认证
    Type =models.CharField(u'用户类型', default='0', max_length=2)                          #默认是0，未认证， 1：刷手 2：商家

#经济表
class Economy(models.Model):
    Mobile = models.CharField(u'手机号', primary_key=True, max_length=11)
    JiFen = models.CharField(u'积分', max_length=16)
    KuaiDian = models.CharField(u'快点', max_length=16)
    YuE = models.CharField(u'余额', max_length=19)
    DongJie = models.CharField(u'冻结', default='0', max_length=2)                          #默认是0，不冻结， 1：冻结

#小号表
class Member(models.Model):
    Mobile = models.CharField(u'手机号', primary_key=True, max_length=11)
    AltUserName = models.CharField(u'马甲号', max_length=100)
    Platform = models.CharField(u'平台', max_length=10)                                      #平台类型，0 ：淘宝 ，1：京东
    Level = models.CharField(u'账号级别', max_length=2)                                      #京东淘宝号级别

#资金交易表
class Money(models.Model):
    FromUser = models.CharField(u'转出方', max_length=100)
    ToUser = models.CharField(u'转入方', max_length=100)
    ModifiTime = models.DateTimeField(u'修改时间')
    TransType = models.CharField(u'交易类型', max_length=2)                                 # 0：划扣， 1：退款 ， 2：转账
    MoneyType = models.CharField(u'资金类型', max_length=2)                                 # 0：现金， 1：积分 ， 2：旺点
    Quntity = models.CharField(u'金额', max_length=16)

#认证表
class Identify(models.Model):
    Idc = models.CharField(u'身份证号', primary_key=True, max_length=19)
    Mobile = models.CharField(u'手机号', max_length=11)
    RealName = models.CharField(u'真实姓名', max_length=100)
    IdcFront = models.ImageField(u'照片正面', upload_to='upload_imgs')
    IdcBack = models.ImageField(u'照片背面', upload_to='upload_imgs')
