from django.shortcuts import render

from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import UserSerializer, NoteSerializer
from .models import Note


class CreateUserView(generics.CreateAPIView):
    """
        Concrete view for creating a model instance 
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class NoteListCreate(generics.ListCreateAPIView):
    """
    Concrete view for listing a queryset or creating a model instance
    """
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self): 
        username = self.request.user
        # notes = Note.objects.filter(author__username=user)
        notes = Note.objects.filter(author=username)            
        return notes
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else: 
            print(serializer.error)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)




# >>> a2 = Article.objects.filter(reporter__username='John')
# >>> a2
# <QuerySet [<Article: International News>, <Article: Local News>, <Article: Prime time>, <Article: Test Article>, <Article: Weather Report>]>
# >>> print(a2.query)
# SELECT "events_article"."id", "events_article"."headline", "events_article"."pub_date", 
# "events_article"."reporter_id", "events_article"."slug" FROM "events_article" INNER JOIN "auth_user" 
# ON ("events_article"."reporter_id" = "auth_user"."id") WHERE "auth_user"."username" = John ORDER BY "events_article"."headline" ASC