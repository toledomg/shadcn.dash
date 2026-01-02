# ShadCN Dashboard + Landing Page Template Next.js

Este projeto é um dashboard moderno e robusto construído com a stack mais recente do ecossistema React. Ele serve como um template inicial de alta qualidade, focado em performance, acessibilidade e experiência de desenvolvimento.

## 🌟 Por Que Usar Este Template?

### 🆓 Completamente Gratuito & Open Source

- **Licença MIT** - Use em projetos pessoais e comerciais
- **Sem restrições** - Modifique, distribua e venda
- **Comunidade ativa** - Contribuições são bem-vindas

### 🏢 Pronto para Produção

- **Código de qualidade** - Limpo, manutenível e escalável
- **Design profissional** - Interface moderna que impressiona
- **Templates completos** - Dashboard + Landing page incluídos

### 🌍 Internacionalização Completa

- **Suporte multilíngue** - Português (BR) e Inglês nativamente
- **next-intl integrado** - Sistema robusto de tradução
- **Fácil expansão** - Adicione novos idiomas facilmente

### 🎨 Temas Avançados

- **Dark/Light mode** - Alternância suave entre temas
- **Customização ao vivo** - Veja mudanças em tempo real
- **Múltiplos layouts** - Variantes de sidebar e opções colapsáveis

### ⚡ Amigável ao Desenvolvedor

- **Stack moderna** - Next.js 15, React 19, TypeScript, Tailwind CSS v4
- **Type safety** - Cobertura completa de TypeScript
- **Bem documentado** - Código claro e comentado
- **DX excelente** - Desenvolvimento rápido com Turbopack

## 📋 Funcionalidades e Páginas Incluídas

### 🖥️ Páginas de Dashboard

- **Dashboard Overview** - Visão geral com cards analíticos e gráficos
- **Dashboard v2** - Dashboard alternativo com métricas diferentes

### 📱 Demonstrações de Aplicativos

- **📧 Mail** - Interface completa de email (Inbox, Leitura, Composição)
- **✅ Tasks** - Gerenciamento de tarefas com drag & drop
- **💬 Chat** - Interface de chat em tempo real
- **📅 Calendar** - Agendamento e gerenciamento de eventos
- **👥 Users** - Gerenciamento de usuários com tabelas avançadas

### 🔐 Autenticação

- **Login** - 3 variantes de página de login com layouts diferentes
- **Cadastro** - 3 variantes de página de registro com designs variados
- **Recuperação de Senha** - 3 variantes de página de recuperação de senha

### ⚙️ Configurações & Perfil

- **Configurações de Usuário** - Gerencie informações pessoais e preferências
- **Conta** - Gerenciamento de perfil
- **Planos & Cobrança** - Páginas de assinatura e pagamento
- **Aparência** - Preferências de tema e exibição
- **Notificações** - Preferências de notificação
- **Conexões** - Integrações de redes sociais

### ❌ Páginas de Erro

- **404** - Página não encontrada
- **401** - Acesso não autorizado
- **403** - Proibido
- **500** - Erro interno do servidor
- **Em Manutenção** - Página de modo de manutenção

### 🌐 Template de Landing Page

- **Hero Section** - Headlines atraentes e CTAs
- **Sobre** - Introdução da empresa/produto com elementos interativos
- **Recursos** - Destaques de produto/serviço com ícones
- **Estatísticas** - Exibição de métricas e conquistas principais
- **Carrossel de Logos** - Showcase de logos de parceiros/clientes
- **Equipe** - Perfis e informações dos membros da equipe
- **Depoimentos** - Avaliações de clientes e prova social
- **Blog** - Últimas postagens e artigos do blog
- **Preços** - Tabelas de preços e planos
- **FAQ** - Perguntas frequentes com respostas expansíveis
- **Contato** - Formulários de contato e informações
- **CTA Section** - Componentes de call-to-action
- **Navegação & Footer** - Componentes completos de navegação e rodapé

### 📄 Páginas Adicionais

- **FAQ** - Perguntas frequentes
- **Preços** - Páginas detalhadas de preços

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

1. Use no componente: `t('newKey')`

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
cd shadcn.dash

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

## 🙏 Créditos e Reconhecimentos

Este projeto é baseado no excelente template open-source criado por [ShadcnStore](https://shadcnstore.com):

**Template Original:**

- 📦 [shadcn-dashboard-landing-template](https://github.com/silicondeck/shadcn-dashboard-landing-template)
- 🏢 Desenvolvido e mantido por [ShadcnStore](https://shadcnstore.com)
- 📄 Licença: MIT
- 🌟 [Ver Demo Ao Vivo](https://shadcnstore.com/templates/dashboard/shadcn-dashboard-landing-template/dashboard)

**Tecnologias e Bibliotecas:**

Este template é construído sobre projetos open-source incríveis:

- [shadcn/ui](https://ui.shadcn.com) - Componentes lindos e acessíveis
- [Radix UI](https://www.radix-ui.com) - Primitivos acessíveis de baixo nível
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS utilitário
- [Next.js](https://nextjs.org) - Framework React para produção
- [Lucide Icons](https://lucide.dev) - Ícones bonitos e consistentes
- [Recharts](https://recharts.org) - Biblioteca de gráficos componível
- [TanStack Table](https://tanstack.com/table) - Tabelas de dados poderosas
- [next-intl](https://next-intl-docs.vercel.app/) - Internacionalização para Next.js

**Agradecimentos Especiais:**

- À comunidade [shadcn/ui](https://ui.shadcn.com) pela incrível biblioteca de componentes
- Ao time da [ShadcnStore](https://shadcnstore.com) por disponibilizar este template gratuitamente

---

**Modificações Neste Fork:**

- ✅ Implementação completa de internacionalização (i18n) com suporte a Português e Inglês
- ✅ Correções de lint e melhorias de qualidade de código
- ✅ Customizações específicas para o contexto do projeto
