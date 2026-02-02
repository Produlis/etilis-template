Create a new Shopify section following this template:

## Structure
```liquid
{%- comment -%}
  {{ SECTION_NAME }}
  
  Description: [Section description]
  
  Settings:
  - [List of settings]
{%- endcomment -%}

{%- liquid
  assign section_id = 'section-' | append: section.id
  assign heading = section.settings.heading
-%}

<div 
  id="{{ section_id }}"
  class="section section-{{ section.type }}"
  style="
    padding-top: {{ section.settings.padding_top }}px;
    padding-bottom: {{ section.settings.padding_bottom }}px;
  "
>
  <div class="container">
    {%- if heading != blank -%}
      <h2 class="section__heading">{{ heading }}</h2>
    {%- endif -%}

    {%- comment -%} Section content {%- endcomment -%}
    <div class="section__content">
      {%- for block in section.blocks -%}
        {%- case block.type -%}
          {%- when 'heading' -%}
            <h3>{{ block.settings.heading }}</h3>
          
          {%- when 'text' -%}
            <div class="rte">{{ block.settings.text }}</div>
        {%- endcase -%}
      {%- endfor -%}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "{{ SECTION_NAME }}",
  "tag": "section",
  "class": "section-{{ SECTION_TYPE }}",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Section Heading"
    },
    {
      "type": "header",
      "content": "Section Padding"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding Top",
      "default": 36
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding Bottom",
      "default": 36
    }
  ],
  "blocks": [
    {
      "type": "heading",
      "name": "Heading",
      "settings": [
        {
          "type": "text",
          "id": "heading",
          "label": "Heading",
          "default": "Block Heading"
        }
      ]
    },
    {
      "type": "text",
      "name": "Text",
      "settings": [
        {
          "type": "richtext",
          "id": "text",
          "label": "Text",
          "default": "<p>Block text content</p>"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "{{ SECTION_NAME }}",
      "blocks": [
        {
          "type": "heading"
        },
        {
          "type": "text"
        }
      ]
    }
  ]
}
{% endschema %}
```

## Steps

1. Create file `sections/{{ section-name }}.liquid`
2. Implement complete schema with settings and blocks
3. Add Liquid logic
4. Create CSS in `assets/section-{{ section-name }}.css`
5. JavaScript if needed in `assets/section-{{ section-name }}.js`
6. Test in theme editor
7. Validate with Theme Check

Section name: $ARGUMENTS
