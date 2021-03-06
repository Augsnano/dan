# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-21 06:09
from __future__ import unicode_literals

import django.contrib.auth.models
import django.core.validators
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0007_alter_validators_add_error_messages'),
    ]

    operations = [
        migrations.CreateModel(
            name='MyUser',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 30 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=30, unique=True, validators=[django.core.validators.RegexValidator('^[\\w.@+-]+$', 'Enter a valid username. This value may contain only letters, numbers and @/./+/-/_ characters.')], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=30, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('qq', models.CharField(max_length=16, verbose_name='qq号')),
                ('weChat', models.CharField(max_length=100, verbose_name='微信账号')),
                ('mobile', models.CharField(max_length=11, primary_key=True, serialize=False, verbose_name='手机号')),
                ('identicard', models.BooleanField(default=False, verbose_name='身份证认证')),
                ('refuserid', models.CharField(max_length=20, verbose_name='推荐人ID')),
                ('Level', models.CharField(default='0', max_length=2, verbose_name='用户等级')),
                ('vevideo', models.BooleanField(default=False, verbose_name='视频认证')),
                ('Type', models.CharField(default='0', max_length=1, verbose_name='用户类型')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name_plural': 'users',
                'abstract': False,
                'verbose_name': 'user',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Economy',
            fields=[
                ('Mobile', models.CharField(max_length=11, primary_key=True, serialize=False, verbose_name='手机号')),
                ('JiFen', models.CharField(max_length=16, verbose_name='积分')),
                ('KuaiDian', models.CharField(max_length=16, verbose_name='快点')),
                ('YuE', models.CharField(max_length=19, verbose_name='余额')),
                ('DongJie', models.CharField(default='0', max_length=2, verbose_name='冻结')),
            ],
        ),
        migrations.CreateModel(
            name='Identify',
            fields=[
                ('Idc', models.CharField(max_length=19, primary_key=True, serialize=False, verbose_name='身份证号')),
                ('Mobile', models.CharField(max_length=11, verbose_name='手机号')),
                ('RealName', models.CharField(max_length=100, verbose_name='真实姓名')),
                ('IdcFront', models.ImageField(upload_to='upload_imgs', verbose_name='照片正面')),
                ('IdcBack', models.ImageField(upload_to='upload_imgs', verbose_name='照片背面')),
            ],
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('Mobile', models.CharField(max_length=11, primary_key=True, serialize=False, verbose_name='手机号')),
                ('AltUserName', models.CharField(max_length=100, verbose_name='马甲号')),
                ('Platform', models.CharField(max_length=10, verbose_name='平台')),
                ('Level', models.CharField(max_length=2, verbose_name='账号级别')),
            ],
        ),
        migrations.CreateModel(
            name='Money',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('FromUser', models.CharField(max_length=100, verbose_name='转出方')),
                ('ToUser', models.CharField(max_length=100, verbose_name='转入方')),
                ('ModifiTime', models.DateTimeField(verbose_name='修改时间')),
                ('TransType', models.CharField(max_length=2, verbose_name='交易类型')),
                ('MoneyType', models.CharField(max_length=2, verbose_name='资金类型')),
                ('Quntity', models.CharField(max_length=16, verbose_name='金额')),
            ],
        ),
    ]
