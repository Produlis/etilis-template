Crea un snippet reutilizable de Shopify:

## Template
```liquid
{%- comment -%}
  {{ SNIPPET_NAME }}
  
  Description: [Qué hace este snippet]
  
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
  {%- comment -%} Contenido del snippet {%- endcomment -%}
</div>
```

## Pasos

1. Crea archivo `snippets/{{ snippet-name }}.liquid`
2. Documenta parámetros claramente
3. Implementa lógica Liquid
4. Test con diferentes parámetros
5. Valida con Theme Check

Nombre del snippet: $ARGUMENTS
