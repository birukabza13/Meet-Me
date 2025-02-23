from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework.exceptions import ValidationError
from cloudinary.models import CloudinaryField


class UserProfile(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    bio = models.TextField(blank=True, null=True)
    avatar = CloudinaryField("image", blank=True, null=True)
    followers = models.ManyToManyField(
        "self", symmetrical=False, related_name="following", blank=True
    )


    def clean(self):
        if self.bio:
            char_count = len(self.bio)
            if char_count > 600:
                raise ValidationError("Bio can not be greater than 600 characters")

    # over riding the built in save method
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username


class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="posts"
    )
    content = models.TextField(max_length=1000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = CloudinaryField("image", blank=False, null=False)
    likes = models.ManyToManyField(UserProfile, related_name="liked_posts", blank=True)

    # over riding the built in save method
    def save(self, *args, **kwargs):
        print("image being saved: " , self.image)
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Post by {self.user.username} at {self.created_at}"

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=['created_at'])
        ]
