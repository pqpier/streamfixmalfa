# FocusFlow - App de Produtividade Pessoal

Um aplicativo moderno de produtividade pessoal para ajudá-lo a manter o foco, organizar tarefas e alcançar seus objetivos diários. Desenvolvido com Next.js, TypeScript e Tailwind CSS.

## 🎯 Funcionalidades Principais

### Pomodoro Timer
- Timer personalizável para sessões de foco
- Pausas curtas e longas automáticas
- Contador de sessões diárias
- Notificações sonoras
- Estatísticas de produtividade

### Gerenciamento de Tarefas
- Criação e organização de tarefas
- Priorização (Alta, Média, Baixa)
- Categorização com etiquetas
- Visualização em Lista ou Kanban
- Busca e filtros inteligentes

### Calendário e Planejamento
- Visualização mensal de atividades
- Agendamento de tarefas e eventos
- Blocos de tempo para deep work
- Integração com tarefas e projetos

### Metas e Objetivos
- Definição de metas pessoais
- Acompanhamento de progresso
- Marcos e conquistas
- Categorias personalizadas

### Sistema de Notas
- Editor de notas rápidas
- Organização por tags
- Busca em texto completo
- Notas fixadas

### Estatísticas e Insights
- Dashboard de produtividade
- Gráficos de desempenho semanal
- Conquistas e gamificação
- Insights personalizados
- Sequências de dias produtivos

## 🚀 Começando

### Pré-requisitos
- Node.js 18+ 
- npm, yarn ou pnpm

### Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd productivity-app
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.local.example .env.local
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🛠 Stack Tecnológica

- **Framework**: Next.js 15.5 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4
- **Componentes**: shadcn/ui + Radix UI
- **Ícones**: Lucide React
- **Formulários**: React Hook Form + Zod
- **Datas**: date-fns
- **Gráficos**: Recharts

## 📁 Estrutura do Projeto

```
productivity-app/
├── app/
│   ├── (auth)/            # Páginas de autenticação
│   ├── (dashboard)/        # Área principal do app
│   │   ├── dashboard/      # Página inicial
│   │   ├── pomodoro/       # Timer Pomodoro
│   │   ├── tasks/          # Gerenciamento de tarefas
│   │   ├── projects/       # Projetos pessoais
│   │   ├── calendar/       # Calendário
│   │   ├── goals/          # Metas e objetivos
│   │   ├── notes/          # Sistema de notas
│   │   ├── stats/          # Estatísticas
│   │   └── settings/       # Configurações
│   └── layout.tsx          # Layout principal
├── components/
│   ├── layout/            # Componentes de layout
│   └── ui/                # Componentes reutilizáveis
├── lib/
│   ├── types/             # Definições TypeScript
│   └── utils.ts           # Funções utilitárias
└── public/                # Assets estáticos
```

## 💡 Casos de Uso

### Para Estudantes
- Organize sessões de estudo com Pomodoro
- Acompanhe progresso em disciplinas
- Crie notas de revisão
- Defina metas de aprendizado

### Para Profissionais
- Gerencie tarefas do trabalho
- Mantenha foco em projetos importantes
- Acompanhe tempo produtivo
- Organize ideias e anotações

### Para Desenvolvimento Pessoal
- Estabeleça hábitos saudáveis
- Acompanhe metas pessoais
- Monitore progresso diário
- Celebre conquistas

## 🎨 Personalização

### Temas
- Modo claro/escuro automático
- Cores personalizáveis
- Layouts responsivos

### Configurações
- Tempos do Pomodoro ajustáveis
- Notificações personalizadas
- Metas e objetivos flexíveis

## 📱 Recursos Futuros

- [ ] App mobile (React Native)
- [ ] Sincronização na nuvem
- [ ] Modo offline
- [ ] Integração com calendários externos
- [ ] Relatórios em PDF
- [ ] Widgets para desktop
- [ ] Temas personalizados
- [ ] Backup automático

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a Branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 💬 Suporte

Para suporte, abra uma issue no repositório GitHub ou entre em contato.

## 🏆 Créditos

Desenvolvido com ❤️ para ajudar pessoas a serem mais produtivas e focadas em seus objetivos.