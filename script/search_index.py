from haystack import indexes

# Create a search index for the pages on your website.
class WebsiteIndex(indexes.SearchIndex, indexes.Indexable):

    # Define the fields that you want to be searchable.
    text = indexes.TextField(document=True, use_template=True)
    title = indexes.CharField(model_attr='title')
    url = indexes.CharField(model_attr='url')

    # Define the pages that you want to be indexed.
    def get_model(self):
        return Page

    # Define the way that you want the pages to be indexed.
    def index_for_object(self, obj):
        yield obj, {
            'text': obj.content,
            'title': obj.title,
            'url': obj.url,
        }

# Register the search index with Haystack.
indexes.register(WebsiteIndex)

