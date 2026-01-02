# Shadcn Dashboard Next.js

Este projeto é um dashboard moderno e robusto construído com a stack mais recente do ecossistema React. Ele serve como um template inicial de alta qualidade, focado em performance, acessibilidade e experiência de desenvolvimento.

## 🚀 Tecnologias e Stack

O projeto utiliza uma combinação de ferramentas de ponta:

- **Framework Core:** [Next.js 15](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) (com `@theme` inline e variáveis CSS nativas)
- **Code Quality:** Prettier (Tailwind Class Sorting + Import Sorting)
- **Segurança:** Validação de variáveis de ambiente com [T3 Env](https://env.t3.gg/) & Zod
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind)
- **Internacionalização:** [next-intl](https://next-intl-docs.vercel.app/) (Suporte a Português e Inglês)
- **Gerenciamento de Estado:** [Zustand](https://github.com/pmndrs/zustand) (estados globais) & Context API
- **Formulários:** React Hook Form + Zod (validação)
- **Ícones:** Lucide React
- **Gráficos:** Recharts
- **Gerenciamento de Datas:** date-fns

## 📂 Estrutura do Projeto

A organização segue as melhores práticas do Next.js App Router:

```
src/
├── app/                  # Rotas e Layouts (App Router)
│   ├── (auth)/           # Rotas de Autenticação (Login, Registro)
│   ├── (dashboard)/      # Área protegida do painel
│   └── globals.css       # Estilos globais e variáveis de tema (OKLCH)
├── components/           # Biblioteca de componentes
│   ├── ui/               # Componentes base do shadcn/ui (Button, Input, etc.)
│   ├── app-sidebar.tsx   # Configuração da barra lateral
│   └── ...
├── config/               # Constantes e configurações
├── contexts/             # Providers de Contexto (Tema, Sidebar)
├── hooks/                # Hooks customizados
├── lib/                  # Utilitários (cn, utils)
└── types/                # Definições de tipos TypeScript
```

## � Internacionalização (i18n)

O projeto possui suporte completo para múltiplos idiomas usando **next-intl**:

### Idiomas Suportados

- **Português (pt)** - Idioma padrão
- **English (en)**

### Estrutura de Tradução

```text
src/
├── i18n/
│   ├── routing.ts         # Configuração de rotas e locales
│   └── request.ts         # Handler de requisições i18n
├── messages/
│   ├── en.json            # Traduções em Inglês
│   └── pt.json            # Traduções em Português
└── components/
    └── language-switcher.tsx  # Componente para trocar idioma
```

### Como Usar Traduções

**Em Componentes Client:**

```tsx
"use client"

import { useTranslations } from "next-intl"

export function MyComponent() {
  const t = useTranslations("Dashboard")

  return <h1>{t("title")}</h1>
}
```

**Em Componentes Server:**

```tsx
import { getTranslations } from "next-intl/server"

export default async function Page() {
  const t = await getTranslations("Dashboard")

  return <h1>{t("title")}</h1>
}
```

### Adicionar Novas Traduções

1. Abra os arquivos `src/messages/en.json` e `src/messages/pt.json`
2. Adicione a chave e valor no namespace apropriado:

```json
{
  "Dashboard": {
    "title": "Dashboard",
    "newKey": "Your new translation"
  }
}
```

3. Use no componente: `t('newKey')`

### Language Switcher

O componente `<LanguageSwitcher />` já está integrado no layout e permite alternar entre idiomas. A preferência é salva automaticamente.

### Namespaces Disponíveis

- `Common` - Traduções gerais (botões, labels, etc.)
- `Dashboard` - Painel principal
- `Tasks` - Módulo de tarefas
- `Chat` - Sistema de chat
- `Mail` - Sistema de email
- `Users` - Gerenciamento de usuários
- `Settings` - Configurações
- E mais...

## 🎨 Sistema de Design e Temas

### Cores e Dark Mode

O projeto utiliza um sistema de cores dinâmico baseado no espaço de cor **OKLCH** para maior fidelidade visual.

- **Dark/Light Mode:** Implementado nativamente, persistido via `localStorage` e respeita a preferência do sistema.
- **Variáveis:** Definidas em `globals.css` (ex: `--primary`, `--sidebar`, `--chart-1`).

### Sidebar Dinâmica

A barra lateral é altamente configurável, suportando estados colapsados, variantes móveis e temas independentes do conteúdo principal.

## 🛠️ Como Iniciar

### Pré-requisitos

- Node.js (versão LTS recomendada)
- Gerenciador de pacotes (Yarn, NPM ou PNPM)

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta
cd financial.dash

# Instale as dependências
yarn install
# ou
npm install
```

### Rodando o Projeto

Para iniciar o servidor de desenvolvimento com Turbopack:

```bash
yarn dev
# ou
npm run dev
```

O projeto estará disponível em `http://localhost:3000`.

## 📦 Componentes Disponíveis

O dashboard já vem equipado com uma suíte completa de componentes UI prontos para uso:

- **Layout:** Sidebar, Sheet, Resizable Panels, ScrollArea.
- **Formulários:** Inputs, Selects, Switches, DatePickers, Form validation wrapper.
- **Feedback:** Toasts (Sonner), Dialogs, Alerts, Progress bars.
- **Data Display:** Tabelas (TanStack Table) e Gráficos (Recharts).

## 📝 Diretrizes de Desenvolvimento

1. **Novas Páginas:** Crie novas rotas dentro de `src/app/(dashboard)` para herdar automaticamente o layout do painel.
2. **Estilização:** Use sempre as classes utilitárias do Tailwind e as variáveis de tema (`bg-primary`, `text-muted-foreground`) para manter a consistência.
3. **Componentes:** Prefira compor interfaces usando os componentes existentes em `src/components/ui` ao invés de criar elementos HTML puros.
4. **Utils:** Utilize a função `cn()` (em `src/lib/utils.ts`) para combinar classes condicionalmente.

---

_Análise baseada na versão do template de 02/01/2026._
