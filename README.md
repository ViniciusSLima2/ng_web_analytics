# NG Web Analytics - Documentação do Projeto

## 📋 Visão Geral

Uma **plataforma de análise de tráfego web** construída em **Angular 19** (standalone components + signals) que exibe estatísticas e métricas de sites cadastrados, similar a um Google Analytics simplificado.

---

## 🎯 Funcionalidades Principais

### 1. Seleção de Sites (`/`)
- Lista todos os sites cadastrados em cards clicáveis
- Cada card exibe nome e domínio do site
- Interface responsiva com grid flexível

### 2. Dashboard de Análise (`/dashboard/:id`)

#### 📈 Métricas Simples (Cards)
- **Total de acessos** - Soma de todas as visitas
- **Média de acessos/dia** - Cálculo da média diária
- **Dias com site online** - Contagem de dias ativos
- **Dia com pico de visitas** - Data com maior tráfego

#### 📊 Gráficos Interativos
Visualizações usando Chart.js e Plotly:

1. **Série Temporal** - Gráfico de linha com evolução de visitas ao longo do tempo
2. **Referrers** - Gráfico de barras mostrando sites que geraram tráfego
3. **Novos vs Retornantes** - Pizza comparando novos visitantes e recorrentes
4. **Dispositivos** - Pizza com distribuição desktop/mobile/tablet
5. **Geo-localização** - Mapa coroplético mundial com distribuição geográfica
6. **Tabela de Páginas** - Análise detalhada por página com:
   - Visualizações (pageviews)
   - Entradas (entry)
   - Saídas (exit)
   - Taxa de rejeição (bounce rate)

#### 🔍 Filtros de Data
- **Últimos 7 dias**
- **Últimos 30 dias**
- **Últimos 90 dias**
- **Intervalo customizado** (date range picker)
- **Todos os tempos** (padrão)

---

## 🛠️ Stack Técnica

| Tecnologia | Versão/Biblioteca | Uso |
|------------|-------------------|-----|
| **Angular** | 19.x | Framework principal (zoneless + signals) |
| **TypeScript** | ~5.6.2 | Linguagem de programação |
| **PrimeNG** | ^19.0.1 | Componentes UI (tabelas, filtros, skeletons) |
| **Chart.js** | ^4.4.7 | Gráficos de linha/pizza/barra |
| **ng2-charts** | ^7.0.0 | Wrapper Angular para Chart.js |
| **Plotly.js** | ^2.35.3 | Mapas geográficos interativos |
| **angular-plotly.js** | ^5.3.0 | Wrapper Angular para Plotly |
| **RxJS** | ~7.8.0 | Requisições HTTP + resolvers |
| **Python/Flask** | - | Backend API (pythonanywhere.com) |

---

## 📂 Arquitetura do Projeto
