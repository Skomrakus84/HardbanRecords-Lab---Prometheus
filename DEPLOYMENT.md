# 🚀 Przewodnik wdrożenia HardbanRecords Lab

## ✅ Lista kontrolna przed wdrożeniem

### Wymagania wstępne
- [ ] Node.js 18+ zainstalowany
- [ ] Klucz API Google Gemini (https://makersuite.google.com/app/apikey)
- [ ] Konto na platformie deploymentowej (Vercel/Netlify/etc.)

### Przygotowanie środowiska
- [ ] Skopiuj `.env.example` do `.env.local`
- [ ] Ustaw `GEMINI_API_KEY` w `.env.local`
- [ ] Przetestuj aplikację lokalnie: `npm run dev`
- [ ] Zbuduj aplikację: `npm run build`
- [ ] Przetestuj build: `npm run preview`

## 🔧 Szybkie wdrożenie

### Vercel (Zalecane - 5 minut)

1. **Przez Vercel CLI:**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

2. **Przez GitHub (automatyczne):**
   - Połącz repozytorium w Vercel Dashboard
   - Ustaw `GEMINI_API_KEY` w Environment Variables
   - Deploy automatyczny przy każdym push

3. **Wymagane zmienne środowiskowe:**
   - `GEMINI_API_KEY` = Twój klucz API Gemini

### Netlify (Alternatywa - 5 minut)

1. **Przez Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

2. **Przez drag & drop:**
   - `npm run build`
   - Przeciągnij folder `dist/` na netlify.com/drop

3. **Konfiguracja:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

### Docker (Self-hosted)

```bash
# Zbuduj obraz
npm run docker:build

# Uruchom kontener
npm run docker:run

# Lub użyj docker-compose
npm run docker:up
```

Aplikacja dostępna na http://localhost:3000

## 🔐 Konfiguracja zmiennych środowiskowych

### Vercel
```bash
vercel env add GEMINI_API_KEY
```

### Netlify
Site settings → Environment variables → Add variable

### Docker
Ustaw w docker-compose.yml:
```yaml
environment:
  - GEMINI_API_KEY=your_key_here
```

## 🚦 Weryfikacja wdrożenia

- [ ] Aplikacja ładuje się bez błędów
- [ ] Funkcje AI działają (wymaga GEMINI_API_KEY)
- [ ] Routing działa poprawnie
- [ ] Responsywność na urządzeniach mobilnych
- [ ] Performance score > 90 (Lighthouse)

## 🆘 Rozwiązywanie problemów

### Błąd: "Cannot resolve dependencies"
```bash
npm install --legacy-peer-deps
```

### Błąd: "Missing GEMINI_API_KEY"
- Sprawdź zmienne środowiskowe w platformie deploymentowej
- Upewnij się, że klucz jest prawidłowy

### Błąd: "Build failed"
```bash
npm run build:prod
```

### Performance
- Użyj CDN dla statycznych zasobów
- Włącz Gzip compression
- Skonfiguruj caching headers

## 📊 Monitorowanie

### Health Check
- Endpoint: `/health` (tylko Docker)
- Status: 200 OK = aplikacja działa

### Metryki
- Vercel Analytics (wbudowane)
- Google Analytics (dodaj tracking ID)
- Sentry dla error tracking

## 🔄 CI/CD

GitHub Actions automatycznie:
1. Buduje aplikację
2. Testuje build
3. Deployuje na Vercel/Netlify
4. Powiadamia o statusie

Wymagane GitHub Secrets:
- `GEMINI_API_KEY`
- `VERCEL_TOKEN` (opcjonalne)
- `NETLIFY_AUTH_TOKEN` (opcjonalne)

## 📞 Wsparcie

W przypadku problemów:
1. Sprawdź logi deployment
2. Zweryfikuj zmienne środowiskowe  
3. Przetestuj build lokalnie
4. Otwórz Issue w repozytorium