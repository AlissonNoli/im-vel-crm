# CRM Imobiliário

CRM para gestão de leads, imóveis e clientes do mercado imobiliário português.

## Como rodar

```bash
npm install
npm run dev
```

O app estará disponível em `http://localhost:8080`.

## Variáveis de ambiente

Crie um ficheiro `.env` na raiz do projeto (ou configure as variáveis no ambiente):

```env
# URL base da API Django REST Framework
VITE_API_BASE_URL=http://localhost:8000/api/v1

# Estratégia de autenticação: "cookie" ou "token"
# - cookie: usa Django session com CSRF (credentials: include)
# - token: usa JWT com Authorization: Bearer header
VITE_AUTH_STRATEGY=cookie

# Usar dados mock (sem API)? "true" ou "false"
# Enquanto o backend não está pronto, deixe "true"
VITE_USE_MOCKS=true
```

## Autenticação

O app suporta duas estratégias de autenticação, configuráveis via `VITE_AUTH_STRATEGY`:

### Cookie Session (`cookie`)
- Faz requests com `credentials: "include"`
- Envia automaticamente o header `X-CSRFToken` em POST/PUT/PATCH/DELETE
- O token CSRF é lido do cookie `csrftoken`

### Token/JWT (`token`)
- Armazena o token em memória (com fallback em localStorage)
- Envia `Authorization: Bearer <token>` em todos os requests
- Intercepta 401 e redireciona para `/login`

**Para alterar**: mude `VITE_AUTH_STRATEGY` no `.env`.

## Endpoints esperados (DRF)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/login/` | Login |
| POST | `/auth/logout/` | Logout |
| GET | `/auth/me/` | Utilizador atual |
| GET/POST | `/leads/` | Listar/criar leads |
| GET/PATCH/DELETE | `/leads/:id/` | Detalhe/editar/eliminar lead |
| GET/POST | `/properties/` | Listar/criar imóveis |
| GET/PATCH/DELETE | `/properties/:id/` | Detalhe/editar/eliminar imóvel |
| GET/POST | `/clients/` | Listar/criar clientes |
| GET/PATCH/DELETE | `/clients/:id/` | Detalhe/editar/eliminar cliente |

### Formato de paginação (DRF padrão)

```json
{
  "count": 42,
  "next": "http://localhost:8000/api/v1/leads/?page=2",
  "previous": null,
  "results": [...]
}
```

### Filtros via querystring

```
/leads/?search=Ana&status=novo&ordering=-created_at&page=1
```

## Estrutura do projeto

```
src/
├── api/          # Cliente HTTP e endpoints
├── auth/         # Contexto de autenticação e guardas de rota
├── components/   # Componentes reutilizáveis
├── data/         # Dados mock (fácil de desligar)
├── hooks/        # Hooks personalizados
├── pages/        # Páginas/telas
└── types/        # Tipos TypeScript (DTOs)
```

## Tecnologias

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- shadcn/ui
- React Router DOM
- Recharts
