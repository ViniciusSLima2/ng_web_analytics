📊 O que é
Uma plataforma de análise de tráfego web construída em Angular 19 (standalone components + signals) que exibe estatísticas e métricas de sites cadastrados, similar a um Google Analytics simplificado.

🎯 Funcionalidades Principais
1. Seleção de Sites (/)
Lista todos os sites cadastrados em cards clicáveis
Cada card exibe nome e domínio do site
2. Dashboard de Análise (/dashboard/:id)
Painel completo com:

📈 Métricas Simples (Cards)
Total de acessos
Média de acessos/dia
Dias com site online
Dia com pico de visitas
📊 Gráficos Interativos (Chart.js + Plotly)
Série Temporal - Visitas ao longo do tempo (linha)
Referrers - Sites que geraram tráfego (barras)
Novos vs Retornantes - Pizza comparando visitantes
Dispositivos - Pizza com desktop/mobile/tablet
Geo-localização - Mapa coroplético mundial
Tabela de Páginas - Visualizações/entradas/saídas/bounce rate por página
🔍 Filtros de Data
Últimos 7/30/90 dias
Intervalo customizado (date range picker)
Todos os tempos
🛠️ Stack Técnica
Tecnologia	Uso
Angular 19	Framework principal (zoneless + signals)
PrimeNG	Componentes UI (tabelas, filtros, skeletons)
Chart.js (ng2-charts)	Gráficos de linha/pizza/barra
Plotly.js	Mapa geográfico
RxJS	Requisições HTTP + resolvers
Python/Flask API	Backend (pythonanywhere.com)
📂 Arquitetura
🔄 Fluxo de Dados
Usuário acessa / → carrega lista de sites via Analytics.getSitesMetadata()
Clica em um site → navega para /dashboard/:id
siteDataResolver faz 8 requisições paralelas (forkJoin) antes de renderizar
Dashboard exibe dados e aguarda filtros de data
Ao aplicar filtro → nova requisição busca dados filtrados (startDate/endDate)
🎨 Destaques de Código
Signals nativos para reatividade (signal(), computed(), effect())
Standalone components (sem NgModules)
Lazy loading com loadComponent()
Skeleton loaders durante carregamento
Responsive design (media queries para mobile)
Scroll sincronizado na sidebar
🚀 Objetivo
Fornecer insights acionáveis sobre tráfego web através de visualizações intuitivas, com performance otimizada (zoneless change detection) e UX moderna.
