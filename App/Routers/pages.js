import { Router } from "https://deno.land/x/oak/mod.ts";
import { viewEngine, dejsEngine, oakAdapter } from "https://deno.land/x/view_engine@v10.6.0/mod.ts"
//offical github says to use ejsEngine but thats not an export ... /: so I used dejsEngine and it works with ejs files just fine

const pages = new Router();

//making the router use the view engine to allow render of .ejs files
pages.use(
    viewEngine(oakAdapter, dejsEngine, {
        viewRoot: `${Deno.cwd()}/App/Static/Templates/`,
    }),
);

//page routes
pages
    .get("/", async (ctx) => {
        await ctx.render("index.ejs", {}); //issue with background img
    })
    .get("/projects", async (ctx) => {
        await ctx.render("projects.ejs", {});
    })
    .get("/contact-us", async (ctx) => {
        await ctx.render("contact-us.ejs", {});
    })
    .get("/services", async (ctx) => {
        await ctx.render("services.ejs", {});
    });
    
export default pages;
