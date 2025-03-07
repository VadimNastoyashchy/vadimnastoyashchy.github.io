---
title: Tag Archive
layout: page
permalink: /tags/#javascript
---

<div>
  Search through all of my posts by tag!
</div> 
<br>

<div id="tags-list">
  <div class="tag-list">
    <div id="#javascript"></div>
    <h3 class="post-list-heading line-bottom"> In #JavaScript: </h3>
    <a name="javascript"></a>
    <ul class="post-list post-list-narrow">
     {% for post in site.tags[JavaScript] %}
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
</div>
