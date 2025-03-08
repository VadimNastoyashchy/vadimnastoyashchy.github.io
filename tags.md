---
title: Tag Archive
layout: page
permalink: /tags/
---

<div>
  Search through all of my posts by tag!
</div> 
<br>

<div id="tags-list">
{% for tag in site.tags %}
  {% assign tag_name = tag | first %}
  {% assign tag_name_pretty = tag_name | replace: " ", "-" | downcase %}
  <div class="tag-list" id="{{ tag_name_pretty | slugize }}">
    <h3 class="post-list-heading line-bottom"> #{{ tag_name }}: </h3>
    <a name="{{ tag_name | slugize }}"></a>
    <ul class="post-list post-list-narrow">
     {% for post in site.tags[tag_name] %}
     <li>
       {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
       <b>
         <a href="{{ post.url | relative_url }}">
           {{ post.title | escape }}
         </a>
       </b> - <i>{{ post.date | date: date_format }}</i>
     </li>
     {% endfor %}
    </ul>
  </div>
{% endfor %}
</div>

<div id="you-may-also-like" style="display: none;">
  <h3>You may also like:</h3>
  <div id="other-tags-list"></div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var hash = window.location.hash.substring(1);
    var tagsList = document.getElementById("tags-list");
    var otherTagsList = document.getElementById("other-tags-list");
    var youMayAlsoLike = document.getElementById("you-may-also-like");

    if (hash) {
      var currentTagElement = document.getElementById(hash);
      if (currentTagElement) {
        tagsList.innerHTML = "";
        tagsList.appendChild(currentTagElement);
        youMayAlsoLike.style.display = "block";
      }

      var allTags = document.querySelectorAll(".tag-list");
      allTags.forEach(function(tag) {
        if (tag.id !== hash) {
          otherTagsList.appendChild(tag.cloneNode(true));
        }
      });
    }
  });
</script>
