#coding:utf-8
from django import forms
from captcha.fields import CaptchaField

#注册表单
class RegisterForm(forms.Form):
    username = forms.CharField(label='用户名',max_length=100)
    password = forms.CharField(label='密码',widget=forms.PasswordInput())
    password2 = forms.CharField(label='确认密码',widget=forms.PasswordInput())
    mobile = forms.CharField(label='手机号', max_length=11)
    email = forms.EmailField()
    qq = forms.CharField(label='QQ号', max_length=16)
    type = forms.ChoiceField(label='注册类型', choices=(('buyer','买家'),('saler','商家')))

    def clean(self):
        if not self.is_valid():
            raise forms.ValidationError('所有项都为必填项')
        elif self.cleaned_data['password2'] != self.cleaned_data['password']:
            raise forms.ValidationError('两次输入密码不一致')
        else:
            cleaned_data = super(RegisterForm, self).clean()
        return cleaned_data

#登陆表单
class LoginForm(forms.Form):
    username = forms.CharField(label='用户名',widget=forms.TextInput(attrs={"placeholder": "用户名", "required": "required",}),
                               max_length=50, error_messages={"required": "username不能为空",})
    password = forms.CharField(label='密码',widget=forms.PasswordInput(attrs={"placeholder": "密码", "required": "required",}),
                               max_length=20, error_messages={"required": "password不能为空",})
    captcha = CaptchaField(label='验证码')

    def clean(self):
        #验证码
        try:
            captcha_x = self.cleaned_data['captcha']
        except Exception as e:
            print ('except: ' + str(e))
            raise forms.ValidationError(u"验证码有误，请重新输入")