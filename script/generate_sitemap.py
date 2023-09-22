import sitemap

# Create a sitemap object.
sitemap_obj = sitemap.Sitemap()

# Add all of the pages on your website to the sitemap.
for page in your_website_pages:
    sitemap_obj.add_url(page)

# Generate the sitemap file.
sitemap_file = sitemap_obj.generate()

# Save the sitemap file to your website.
sitemap_file.save('sitemap.xml')

