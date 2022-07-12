import { Application } from "https://deno.land/x/oak/mod.ts";//oak library for deno

const main = () => {
    //create a new application instance
    const app = new Application();
    //get argument instance
    let instance = Deno.args[0];
    instance = instance.toLowerCase();
    //init port variable
    let port;
    //inline if else
    instance == 'local'? port = 3000: port = 80;

    //listen event listener
    app.addEventListener("listen", ({port, secure }) => {
        console.log(
          `Listening on: ${secure ? "https://" : "http://"}${"localhost"}:${port}`
        );
    });
      
    //read the html file and send it to the client
    app.use(async (ctx, next) => {
        try {
            await ctx.send({
                root: `${Deno.cwd()}/App/static/Templates`,
                index: 'index.html'
            });
        }catch{
            await next();
        }
    })

    //error handling html read
    app.use(async (ctx, next) => {
        //internal server error
        ctx.response.status = 500;
        next();
    })

    app.listen({port: port}, () => {
        console.log(`app running on port ${port}`);
    })
}

main();