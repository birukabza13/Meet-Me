from rest_framework import serializers
from .models import UserProfile, Post


class UserProfileSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    post_count = serializers.SerializerMethodField()
    liked_count = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = [
            "user_id",
            "username",
            "bio",
            "avatar",
            "first_name",
            "last_name",
            "followers_count",
            "following_count",
            "post_count",
            "liked_count",  
        ]

    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()

    def get_post_count(self, obj):
        return obj.posts.count()  
    
    def get_liked_count(self, obj):
        return obj.liked_posts.count()

    def validate_bio(self, value):
        if value:
            if len(value) > 600:
                raise serializers.ValidationError(
                    "Bio can not be greater than 600 characters"
                )
        return value


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = UserProfile
        fields = ["username", "email", "first_name", "last_name", "password"]

    def create(self, validated_data):
        user = UserProfile(
            username=validated_data.get("username"),
            email=validated_data.get("email"),
            first_name=validated_data.get("first_name"),
            last_name=validated_data.get("last_name"),
        )

        user.set_password(validated_data.get("password"))
        user.save()
        return user


class PostSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField() 
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Post
        fields = [
            "post_id",
            "username",
            "content",
            "image",
            "created_at",
            "updated_at",
            "likes",
            "likes_count",
        ]
        read_only_fields = ["likes", "likes_count", "is_liked"]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_username(self, obj):
        return obj.user.username
    
    
    




    
