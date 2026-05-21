# Defesa360

Dashboard jurídico para gestão de defesas criminais, acompanhamento de casos, documentos, prazos, evidências e apoio por assistente de IA.

## Requisitos

- Windows
- Acesso a internet

## Como executar

Este projeto pode rodar sem senha de administrador. Os scripts abaixo baixam uma copia portatil do Node.js para `.tools/` quando necessario.

Instale as dependencias:

```bat
scripts\install-deps.cmd
```

Inicie o servidor de desenvolvimento:

```bat
scripts\dev.cmd
```

Abra no navegador:

```text
http://127.0.0.1:5173/
```

Gere a build de producao:

```bat
scripts\build.cmd
```

Se voce ja tiver Node.js e npm instalados globalmente, tambem pode usar:

```bash
npm install
npm run dev
npm run build
```

## Origem

Este projeto foi iniciado a partir de um bundle exportado do Figma Make e adaptado para o repositório Defesa360.
