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
{% assign chosen_tag = page.url | split: "#" | last %}
{% if chosen_tag %}
  {% assign chosen_tag_pretty = chosen_tag | replace: "_", " " | capitalize %}
  <div class="tag-list">
    <div id="#{{ chosen_tag | slugize }}"></div>
    <h3 class="post-list-heading line-bottom"> In #{{ chosen_tag }}: </h3>
    <a name="{{ chosen_tag | slugize }}"></a>
    <ul class="post-list post-list-narrow">
     {% for post in site.tags[chosen_tag] %}
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
{% else %}
  {% for tag in site.tags %}
    {% assign tag_name = tag | first %}
    {% assign tag_name_pretty = tag_name | replace: "_", " " | capitalize %}
    <div class="tag-list">
      <div id="#{{ tag_name | slugize }}"></div>
      <h3 class="post-list-heading line-bottom"> In #{{ tag_name }}: </h3>
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
{% endif %}
</div>
