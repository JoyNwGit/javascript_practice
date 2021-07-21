const express = require('express');
const app = express();
//import express.js which is actually a function
// so () to initialize it.

const PORT = 8080;

app.use( express.json() ) // use -> express.json middleware -> every request wiill
// go through this middleware first allowing any bodies in the form of json to be available
// in the post callback.
// also be sure to define this BEFORE the post section (otherwise it won't be defined in time.)

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`) // callback to know when the api is ready
); //fire up api on the server

// run "node ." in terminal.
// you should see "Cannot GET /" meaning its running but can only respond with this message.
// no api endpoint but express is still responding.

// How to make api requests
/**
 * curl http://localhost:8080 on command line
 * or use a rest client like insomnia or postman
 */

// Endpoint URI -> Route: GET http://localhost:8080/tshirt
// () => {} handler to run when the route is requested
// req = request object - incoming data, res = response object - outgoing data send back to the client
// responses: 2** -> good, 4** -> problem with request, 5** -> problem with server
// sending a js object converts it to json by default
app.get(
    '/tshirt',
    (req, res) => {
        res.status(200).send({
            tshirt: '👚',
            size: 'large'
        })
    }); 

// now lets add a dynamic url parameter -> /:id -> to capture dynamic values
// post is used to create new data on the server
// req.params gives you the id in the url
// logo is from req.body which is a custom data payload contained in the incoming request
// request object allows us to see a lot of the information abou the incoming request
app.post(
    '/tshirt/:id',
    (req, res) => {

        const { id } = req.params;
        const { logo } = req.body;

        if (!logo) {
            res.status(418).send({ message: 'We need a logo!' })
        }
        // google 418 error status message. its kinda funny

        //i'm going to guess that the first send function hit acts like a 'return' point
        res.send({
            tshirt: `👚 with your ${logo} and ID of ${id}`,
        })
    }
    )

    // What happens if you run it again now? You get an error message:
    /**
     * Cannot destructure property 'logo' of 'req.body' as it is undefined.
     */
    /** Express can't parse json from the message body by default -> not everybody uses express
     * to build a json api so that's not the default behavior
     * Will need middleware to parse the json of the request and handle it before it hits the 
     * response related to it.
     * Req -> middleware -> response
    */

/**
 * Epilogue:
 * OpenAPI spec -> Standard way to describe an api in yaml
 * came about from the swagger framework that helps you build apis that is readable by both humans
 * and machines -> well documented and can be used to generate client side and server side code
 * This allows you to upload the configuration to aws or google cloud's api gateway where it can
 * be secured monitored and connected to backend infrastructure.
 */