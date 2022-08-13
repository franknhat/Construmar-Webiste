import { Application} from "https://deno.land/x/oak/mod.ts";//oak library for deno
import pages from './Routers/pages.js'

const pageService = () => {
    //create a new application instance
    const app = new Application();
    //get argument instance
    let instance = Deno.args[0];
    //init port variable
    let port;
    //inline if else
    instance == 'local'? port = 3000: port = 8080;

    //listen event listener
    app.addEventListener("listen", ({port}) => {
        console.log(
          `Listening on port ${port}`
        );
    });
    
    //pass the request to the page router
    app.use(pages.routes());
    app.use(pages.allowedMethods());

    //send the static files to client
    app.use(async (ctx, next) => {        
        //send static folder here async
        await ctx.send({
            root: `${Deno.cwd()}/App/Static/`
        })
    })

    app.listen({port: port})
}

pageService();
