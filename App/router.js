import { Router } from "https://deno.land/x/oak/mod.ts";
import { viewEngine, dejsEngine, oakAdapter } from "https://deno.land/x/view_engine@v10.6.0/mod.ts"
//offical github says to use ejsEngine but thats not an export ... /: so I used dejsEngine and it works with ejs files just fine

const router = new Router();

//making the router use the view engine to allow render of .ejs files
router.use(
    viewEngine(oakAdapter, dejsEngine, {
        viewRoot: `${Deno.cwd()}/App`,
    }),
);


router
    .get("/", async (ctx) => {
        ctx.render("static/Templates/index.ejs"); //issue with background img
    })
    .get("/projects", async (ctx) => {
        ctx.render("static/Templates/projects.ejs", {});
    })
    .get("/contact-us", async (ctx, next) => {
        ctx.render("static/Templates/contact-us.ejs", {});
    })
    .get("/services", async (ctx, next) => {
        ctx.render("static/Templates/services.ejs", {});
    });
    
export default router;