# Generated by Django 4.1.2 on 2022-12-16 21:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_application_photo_after'),
    ]

    operations = [
        migrations.CreateModel(
            name='AfterPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo_after', models.ImageField(null=True, upload_to='photo_after/%Y/%m/%d/', verbose_name='Фотография заявки после')),
            ],
        ),
        migrations.AddField(
            model_name='application',
            name='pa',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='users.afterphoto'),
        ),
    ]
