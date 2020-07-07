---
title: projects
color: "#DFE0DF"

---

poetry, thoughts, songs, videos, and the rest.

{% assign types = 'featured' %}
{% assign use-featured = true %}
{% include category-list types = 'featured' %}

{% assign use-featured = false %}
{% assign types = 'read,listen,watch,see' | split: ',' %}
{% include category-list %}
