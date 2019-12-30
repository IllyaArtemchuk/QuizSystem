from allauth.account.adapter import DefaultAccountAdapter

#This code is required to save custom fields in django rest-auth on registration

class CustomUserAccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=True):
        """
        Saves a new `User` instance using information provided in the signup form.
        """
        from allauth.account.utils import user_field
        user = super().save_user(request, user, form, False)
        user_field(user, 'Role', request.data.get('Role', ''))
        user.save()
        return user