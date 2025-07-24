// import { chatGPTPrompt, getChatGPTApiKey} from "./coreContext"
import { addAction } from "@extensions/actions/coreContext/addAction";
import { addCard } from "@extensions/cards/coreContext/addCard";
import { getLogger, getServiceToken } from 'protobase';
import { ai, handler } from 'protonode'


export default (app, context) => {


    const registerActions = async (context) => {
        addAction({
            group: 'playwright',
            name: 'browser',
            url: `/api/v1/playwright/open-browser`,
            tag: "openBrowser",
            description: "open a playwright browser",
            params: {},
            emitEvent: true,
            token: await getServiceToken()
        })

        addAction({
            group: 'playwright',
            name: 'browser',
            url: `/api/v1/playwright/close-browser`,
            tag: "closeBrowser",
            description: "close a playwright browser",
            params: {},
            emitEvent: true,
            token: await getServiceToken()
        })

        addAction({
            group: 'playwright',
            name: 'browser',
            url: `/api/v1/playwright/navigate`,
            tag: "navigateBrowser",
            description: "navigate to playwright browser page",
            params: { url: "https://..." },
            emitEvent: true,
            token: await getServiceToken()
        })

        addAction({
            group: 'playwright',
            name: 'browser',
            url: `/api/v1/playwright/ai-action`,
            tag: "aiAction",
            description: "do a playwright action using AI",
            params: { prompt: "your action here" },
            emitEvent: true,
            token: await getServiceToken()
        })

        addAction({
            group: 'playwright',
            name: 'js-action',
            url: `/api/v1/playwright/js-action`,
            tag: "jsAction",
            description: "do a playwright action using js",
            params: { message: "your js message here" },
            emitEvent: true,
            token: await getServiceToken()
        })

    }

    const registerCards = async (context) => {
        addCard({
            group: 'playwright',
            tag: "browser",
            id: 'playwright_open_browser',
            templateName: "playwright open browser",
            name: "open_browser",
            defaults: {
                width: 2,
                height: 8,
                name: "playwright_open_browser",
                icon: "openai",
                color: "#45BA4B",
                description: "open playwright browser",
                rulesCode: `return execute_action("/api/v1/playwright/open-browser", { });`,
                params: {},
                type: 'action',
                buttonLabel: "Open"
            },
            emitEvent: true,
            token: await getServiceToken()
        })

        addCard({
            group: 'playwright',
            tag: "message",
            id: 'playwright_close_browser',
            templateName: "playwright close browser",
            name: "close_browser",
            defaults: {
                width: 2,
                height: 8,
                name: "playwright_close_browser",
                icon: "openai",
                color: "#45BA4B",
                description: "close playwright browser",
                rulesCode: `return execute_action("/api/v1/playwright/close-browser", { });`,
                params: {},
                type: 'action',
                buttonLabel: "Close"
            },
            emitEvent: true,
            token: await getServiceToken()
        })

        addCard({
            group: 'playwright',
            tag: "browser",
            id: 'playwright_navigate',
            templateName: "playwright navigate",
            name: "navigate_browser",
            defaults: {
                width: 2,
                height: 8,
                name: "playwright_navigate",
                icon: "openai",
                color: "#45BA4B",
                description: "navigate playwright browser",
                rulesCode: `return execute_action("/api/v1/playwright/navigate", { url: userParams.url });`,
                params: { url: "url" },
                type: 'action'
            },
            emitEvent: true,
            token: await getServiceToken()
        })

        addCard({
            group: 'playwright',
            tag: "browser",
            id: 'playwright_browser_page',
            templateName: "playwright browser page",
            name: "response",
            defaults: {
                width: 2,
                height: 8,
                name: "playwright_browser_page",
                color: "#74AA9C",
                description: "playwright browser page",
                rulesCode: `return states?.playwright?.page?.content`,
                type: 'value',
                html: "return markdown(data)",
            },
            emitEvent: true,
            token: await getServiceToken()
        })
    }

    let playwrightPage
    let playwrightBrowser

    app.get("/api/v1/playwright/open-browser", handler(async (req, res, session) => {
        if (!session || !session.user.admin) {
            res.status(401).send({ error: "Unauthorized" })
            return
        }
        await context.playwright.getBrowser({
            visible: true,
            browser: "chromium",
            onDone: async (browser, page) => {
                playwrightPage = page;
                console.log('Browser launched successfully: page is ready to use', await playwrightPage.title());
                context.state.set({ group: 'playwright', tag: "page", name: "content", value: await playwrightPage.title(), emitEvent: true });
                playwrightBrowser = browser;
                // res.json({ message: "Browser launched successfully" });
            }
        })
        res.json({ message: "Browser launched successfully" });
    }))

    app.get("/api/v1/playwright/close-browser", handler(async (req, res, session) => {
        if (!session || !session.user.admin) {
            res.status(401).send({ error: "Unauthorized" })
            return
        }
        await context.playwright.close({
            browser: playwrightBrowser,
            onDone: () => {
                playwrightPage = null;
                playwrightBrowser = null;
            }
        })
        res.json({ message: "Browser closed successfully" });
    }))

    app.get("/api/v1/playwright/navigate", handler(async (req, res, session) => {
        if (!session || !session.user.admin) {
            res.status(401).send({ error: "Unauthorized" })
            return
        }
        const { url } = req.query;
        if (!url) {
            res.status(400).send({ error: "URL parameter is required" });
            return;
        }
        await context.playwright.navigate({
            page: playwrightPage,
            url: url,
        })
        console.log('Browser launched successfully: page is ready to use', await playwrightPage.url());

        res.json(await playwrightPage.url());
    }))

    app.get("/api/v1/playwright/ai-action", handler(async (req, res, session) => {
        if (!session || !session.user.admin) {
            res.status(401).send({ error: "Unauthorized" })
            return
        }
        const { prompt: userPrompt } = req.query;

        if (!userPrompt) {
            res.status(400).send({ error: "Prompt parameter is required" });
            return;
        }

        let prompt = await context.autopilot.getPromptFromTemplate({
            userPrompt: userPrompt,
            templateName: "aiPlaywright",
        });
        // console.log('-------------------------------------------------------------------------')
        // console.log("******** AI prompt: ", prompt)
        let jsCode = "";
        let jsCodeRes;
        const reply = await ai.callModel(prompt, context, { useChatGPT: true });
        jsCode = ai.cleanCode(reply.choices[0].message.content)


        try {
            const fn = new Function('page', 'context', `
                (async () => {
                    ${jsCode}
                    })()
                    `);
            jsCodeRes = await fn(playwrightPage, context);
        } catch (error) {
            console.error({ error }, `Error executing Playwright code: ${jsCode}`);
        }

        console.log('DEV: AI generated code:', jsCode);
        console.log('DEV: AI jsCodeRes:', jsCodeRes);

        res.json(jsCodeRes ?? jsCode);
    }))

    app.get("/api/v1/playwright/js-action", handler(async (req, res, session) => {
        if (!session || !session.user.admin) {
            res.status(401).send({ error: "Unauthorized" })
            return
        }

        const { message: userMessage } = req.query;

        if (!userMessage) {
            res.status(400).send({ error: "Message parameter is required" });
            return;
        }

        let jsCodeRes = "";

        try {
            const fn = new Function('page', 'context', `
                    return (async () => {
                        ${userMessage}
                    })();
            `);
            jsCodeRes = await fn(playwrightPage, context);
        } catch (error) {
            console.error({ error }, `Error executing Playwright code: ${userMessage}`);
        }

        res.json(jsCodeRes);
    }))

    registerActions(context);
    registerCards(context);

}

