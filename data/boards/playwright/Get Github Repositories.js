const message = `
await page.goto('https://github.com/topics/${userParams.topic ?? "llm"}')
const repos = await page.locator('article').evaluateAll(cards => {
        return cards.map(card => {
                const nameEl = card.querySelector('h3 a');

                const url = nameEl?.href;
                const name = nameEl?.innerText?.trim();

                
                const language = card.querySelector('[itemprop="programmingLanguage"]')?.innerText?.trim();
                
                const starsSpan = card.querySelector('span.Counter[aria-label*="starred"]');
                const starsRaw = starsSpan?.textContent?.trim() || '0';

                const stars = (() => {
                const cleaned = starsRaw.replace(',', '').toLowerCase();
                if (cleaned.endsWith('k')) return Math.round(parseFloat(cleaned) * 1000);
                if (cleaned.endsWith('m')) return Math.round(parseFloat(cleaned) * 1000000);
                return parseInt(cleaned) || 0;
                })();
                
                return { name, url, language, stars };
        });
});

return repos;
`

return execute_action("/api/v1/playwright/js-action", { message: userParams.message ?? message });