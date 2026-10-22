# Chord Card 🎸

기타 코드(음 이름) 암기용 랜덤 카드 앱. React + Vite, DB 없음.

## Docker로 실행

```bash
# 개발 (핫 리로드)  → http://localhost:5173
docker compose --profile dev up --build

# 배포 형태 확인 (nginx) → http://localhost:8080
docker compose --profile prod up --build

# 테스트만
docker compose --profile test run --rm test
```

종료: `Ctrl+C` 후 `docker compose --profile dev down`

## Docker 없이

```bash
npm install
npm run dev     # 개발
npm test        # 테스트
npm run build   # dist/ 생성
```

## 무료 배포

`npm run build` 결과물 `dist/` 를 Netlify / Cloudflare Pages / GitHub Pages 에 올리면 됩니다.
(Netlify·Cloudflare Pages: Build command `npm run build`, Output `dist`)

## 조작

- 버전: 기본음(7) / 샵·플랫(14, ♯ ♭ 악보 기호) / 전체(21)
- 기본 제한 시간 2초
- `→` / `Enter` 다음, `Space` 일시정지, `Esc` 종료
- 제한 시간 0초 = 타이머 없이 직접 넘기기
