# DEPLOYING CLOUDFLARE TURNSTILE ON YOUR WEBAPP, WEBSITE, LANDING PAGE AND FORMS.

# 

# (Explains in steps for Client-side and Server-side Turnstile configuration process)

# 

# After setting up cloudflare on your html source code (frontend)

# 

# We now need to configure our captcha using Cloudflare Workers Page

# 

# Go to cloudflare and create an endpoint using workers page, dont deploy static website.

# 

# Go with 'Hello World'

# 

# Now you should have your worker up and running.



* ### 1\. Edit workers code then add this ---



export default {

&#x20; async fetch(request, env) {

&#x20;   const corsHeaders = {

&#x20;     "Access-Control-Allow-Origin": "\*",

&#x20;     "Access-Control-Allow-Methods": "POST, OPTIONS",

&#x20;     "Access-Control-Allow-Headers": "Content-Type"

&#x20;   };



&#x20;   if (request.method === "OPTIONS") {

&#x20;     return new Response(null, { headers: corsHeaders });

&#x20;   }



&#x20;   if (request.method !== "POST") {

&#x20;     return new Response("Method not allowed", {

&#x20;       status: 405,

&#x20;       headers: corsHeaders

&#x20;     });

&#x20;   }



&#x20;   try {

&#x20;     const body = await request.json();



&#x20;     if (!body.token) {

&#x20;       return Response.json(

&#x20;         { success: false, error: "Missing Turnstile token" },

&#x20;         { status: 400, headers: corsHeaders }

&#x20;       );

&#x20;     }



&#x20;     if (!env.TURNSTILE\_SECRET\_KEY) {

&#x20;       return Response.json(

&#x20;         { success: false, error: "Missing Worker secret" },

&#x20;         { status: 500, headers: corsHeaders }

&#x20;       );

&#x20;     }



&#x20;     const ip = request.headers.get("CF-Connecting-IP") || "";



&#x20;     const verifyRes = await fetch(

&#x20;       "https://challenges.cloudflare.com/turnstile/v0/siteverify",

&#x20;       {

&#x20;         method: "POST",

&#x20;         headers: { "Content-Type": "application/json" },

&#x20;         body: JSON.stringify({

&#x20;           secret: env.TURNSTILE\_SECRET\_KEY,

&#x20;           response: body.token,

&#x20;           remoteip: ip

&#x20;         })

&#x20;       }

&#x20;     );



&#x20;     const outcome = await verifyRes.json();



&#x20;     return Response.json(

&#x20;       {

&#x20;         success: outcome.success,

&#x20;         errors: outcome\["error-codes"] || \[]

&#x20;       },

&#x20;       { headers: corsHeaders }

&#x20;     );



&#x20;   } catch (err) {

&#x20;     return Response.json(

&#x20;       { success: false, error: err.message },

&#x20;       { status: 500, headers: corsHeaders }

&#x20;     );

&#x20;   }

&#x20; }

};





* ### 2\. Then verify you added this secret:



Cloudflare Worker → Settings → Variables → Secrets



Add:



TURNSTILE\_SECRET\_KEY



Paste your Turnstile SECRET key (not site key).



Then redeploy Worker.



Also ensure your HTML has your TURNSTILE\_SITE\_KEY site key:



data-sitekey="TURNSTILE\_SITE\_KEY"



NOT:



YOUR\_TURNSTILE\_SECRET\_KEY



* ### 3\. After deployment:



Check your server-side endpoint to be sure it's working you should get "Method Not Allowed" - endpoint usually looks like 'https://subdomain.www.workers.dev/' ends with .dev



You should NOT see:



Cloudflare error page

HTML page

404

500



You SHOULD see:

Method not allowed



* ### 4\. Add a few edits to your HTML page to maximize security properly and avoid disruption.



Edit this script to match your wants as it has a few security in it. 



<script>

/\*

&#x20; REQUIRED CONFIG:

&#x20; 1. Replace YOUR\_TURNSTILE\_SITE\_KEY with your Cloudflare Turnstile site key.

&#x20; 2. Your Worker should validate the token server-side and return JSON:

&#x20;    { "success": true } or { "success": false, "error": "..." }

\*/

const TURNSTILE\_VERIFY\_ENDPOINT = "https://empty-queen-f43f.miroyb57.workers.dev/";

let turnstileToken = "";

let turnstileVerified = false;



async function verifyTurnstileWithWorker(token){

&#x20; const payload = {

&#x20;   token,

&#x20;   email: localStorage.getItem("demo\_email") || "",

&#x20;   visitor\_id: localStorage.getItem("visitor\_id") || "",

&#x20;   event\_id: localStorage.getItem("event\_id") || "",

&#x20;   user\_agent: navigator.userAgent

&#x20; };



&#x20; const res = await fetch(TURNSTILE\_VERIFY\_ENDPOINT, {

&#x20;   method: "POST",

&#x20;   headers: {"Content-Type":"application/json"},

&#x20;   body: JSON.stringify(payload)

&#x20; });



&#x20; return await res.json().catch(() => ({success:false,error:"Invalid Worker response"}));

}



window.onTurnstileSuccess = async function(token){

&#x20; turnstileToken = token;

&#x20; turnstileVerified = false;



&#x20; showMsg("pending","Security check received. Confirming secure session...");



&#x20; try{

&#x20;   const result = await verifyTurnstileWithWorker(token);



&#x20;   if(!result.success){

&#x20;     turnstileToken = "";

&#x20;     turnstileVerified = false;

&#x20;     showMsg("error", result.error || "Security check failed. Please try again.");

&#x20;     if(window.turnstile) turnstile.reset();

&#x20;     return;

&#x20;   }



&#x20;   turnstileVerified = true;

&#x20;   document.getElementById("smartRedirectBtn").href = getRedirectPath();

&#x20;   showMsg("success","Security check completed. Enter your access code to continue.");



&#x20; }catch(err){

&#x20;   console.error("Worker Turnstile validation failed:", err);

&#x20;   turnstileToken = "";

&#x20;   turnstileVerified = false;

&#x20;   showMsg("error","Security validation is unavailable. Please refresh and try again.");

&#x20;   if(window.turnstile) turnstile.reset();

&#x20; }

};



window.onTurnstileExpired = function(){

&#x20; turnstileToken = "";

&#x20; turnstileVerified = false;

&#x20; showMsg("error","Security check expired. Please complete it again.");

};



window.onTurnstileError = function(){

&#x20; turnstileToken = "";

&#x20; turnstileVerified = false;

&#x20; showMsg("error","Security check could not be completed. Please refresh and try again.");

};

</script>



* ### 5\. CHECK YOUR CAPTCHA PAGE



refresh page

complete Turnstile

you should get:

Security check completed.



Good — After that, refresh the page and test again.

