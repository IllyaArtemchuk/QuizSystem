# Generated by Django 3.0.1 on 2019-12-31 19:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20191231_1156'),
        ('homework', '0008_quiz_course'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='students',
            field=models.ManyToManyField(blank=True, to='users.Student'),
        ),
    ]