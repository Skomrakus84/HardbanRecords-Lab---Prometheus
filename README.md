<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# HardbanRecords Lab - Prometheus

Ujednolicony dashboard dla publikacji muzyki i książek, zapewniający twórcom narzędzia do dystrybucji, analityki i monetyzacji. Zawiera oddzielne widoki dla administratorów i indywidualnych twórców.

View your app in AI Studio: https://ai.studio/apps/drive/10qfztbbP-b8xkyqSqMT6paJhhswiAyoL

## 🚀 Uruchomienie lokalne

**Wymagania:** Node.js 18+

1. **Zainstaluj zależności:**
   ```bash
   npm install
   ```

2. **Skonfiguruj zmienne środowiskowe:**
   - Skopiuj `.env.example` do `.env.local`
   - Ustaw `GEMINI_API_KEY` na swój klucz API Gemini (pobierz z: https://makersuite.google.com/app/apikey)

3. **Uruchom aplikację:**
   ```bash
   npm run dev
   ```

## 📦 Deployment na produkcję

### Vercel (Zalecane)

1. **Deploy przez Vercel CLI:**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Ustaw zmienne środowiskowe w Vercel:**
   - `GEMINI_API_KEY` - Twój klucz API Gemini

3. **Automatyczny deploy z GitHub:**
   - Połącz repozytorium z Vercel
   - Deploy będzie automatyczny przy każdym push

### Netlify

1. **Deploy przez Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod
   ```

2. **Lub przez GitHub:**
   - Połącz repozytorium z Netlify
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Ustaw `GEMINI_API_KEY` w zmiennych środowiskowych

### Docker

1. **Zbuduj obraz:**
   ```bash
   npm run docker:build
   ```

2. **Uruchom kontener:**
   ```bash
   npm run docker:run
   ```

3. **Lub użyj docker-compose:**
   ```bash
   npm run docker:up
   ```

Aplikacja będzie dostępna na http://localhost:3000

### Inne platformy

- **Railway:** Połącz repozytorium GitHub i ustaw `GEMINI_API_KEY`
- **Render:** Static Site deployment z build command `npm run build`
- **AWS S3 + CloudFront:** Upload folder `dist` po `npm run build`

## 🔧 Konfiguracja

### Zmienne środowiskowe

| Zmienna | Opis | Wymagana |
|---------|------|----------|
| `GEMINI_API_KEY` | Klucz API Google Gemini | Tak |
| `GEMINI_MODEL` | Model Gemini (domyślnie: gemini-2.5-flash) | Nie |

### Budowanie

- **Development:** `npm run dev`
- **Production build:** `npm run build`
- **Preview build:** `npm run preview`
- **Production build z optymalizacjami:** `npm run build:prod`

## 🏗️ Architektura

- **Frontend:** React 19 + TypeScript + Vite
- **UI:** Tailwind CSS
- **Routing:** React Router v7
- **Charts:** Recharts + react-simple-maps
- **AI:** Google Gemini API
- **State:** React Context API

## 🔍 Health Check

Po deployment aplikacja udostępnia endpoint `/health` do monitorowania statusu.

## 📝 Notatki techniczne

- Aplikacja używa `--legacy-peer-deps` z powodu konfliktu między React 19 a react-simple-maps
- Wszystkie konfiguracje deployment są gotowe do użycia
- Aplikacja jest w pełni statyczna po zbudowaniu
- Wymaga tylko zmiennej środowiskowej `GEMINI_API_KEY` do działania

## 🤝 Contributing

1. Fork repozytorium
2. Utwórz branch feature (`git checkout -b feature/amazing-feature`)
3. Commit zmiany (`git commit -m 'Add amazing feature'`)
4. Push do branch (`git push origin feature/amazing-feature`)
5. Otwórz Pull Request
