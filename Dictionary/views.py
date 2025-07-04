from django.shortcuts import render
from .dicty import display_suggestions
# Create your views here.
def dictionary_view(request):
    """
    Render the dictionary page.
    """
    return render(request, 'dictionary/index.html')

def search_view(request):
    if request.method == 'GET':
        query = request.GET.get('q', '').strip()
        if query:
            # Here you would typically perform a search operation
            # For now, we just pass the query to the template
            print(f"Search query: {query}")
            vocabulary = display_suggestions(query, 1)
            return render(request, 'dictionary/search.html', {'query': query, 'vocabulary': vocabulary[0], 'length': vocabulary[1]})
    return render(request, 'dictionary/search.html', {'query': '', 'vocabulary': [], 'length': 0})