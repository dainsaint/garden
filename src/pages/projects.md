---
title: projects
color: "#DFE0DF"
eleventyExcludeFromCollections: false
featured: []

---
poetry, thoughts, songs, videos, and the rest.

{% assign use-featured = true %}
{% include category-list, types: 'featured' %}

{% assign use-featured = false %}
{% assign types = 'read,listen,watch,see,play' | split: ',' %}
{% include category-list %}
