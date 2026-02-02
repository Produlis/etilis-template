Create a reusable Shopify snippet:

## Template
```liquid
{%- comment -%}
  {{ SNIPPET_NAME }}
  
  Description: [What this snippet does]
  
  Parameters:
  - param1 {Type} - Description (required/optional)
  - param2 {Type} - Description (default: value)
  
  Usage:
  {% render 'snippet-name', param1: value, param2: value %}
{%- endcomment -%}

{%- liquid
  assign default_value = param2 | default: 'default'
-%}

<div class="snippet-{{ SNIPPET_NAME }}">
  {%- comment -%} Snippet content {%- endcomment -%}
</div>
```

## Steps

1. Create file `snippets/{{ snippet-name }}.liquid`
2. Document parameters clearly
3. Implement Liquid logic
4. Test with different parameters
5. Validate with Theme Check

Snippet name: $ARGUMENTS
