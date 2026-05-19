### **SECURING YOUR AUTO\_REDIRECT/EVILGINX BEHIND CLOUDFLARE**



**PRENOTE: YOU WILL NEED ONLY ONE DOMAINS DOESN'T MATTER IF IT'S NEW OR OLD DOMAIN. PREFERRABLY BUY FROM CLOUDFLARE SINCE THEY ARE BENEFITS OF SECURITY WHEN BUYING FROM THEM.**


1. ***REGISTER YOUR DOMAIN ON CLOUDFLARE OR BUY BUT MAKE SURE YOUR DOMAIN IS FULLY REGISTERED AND READY.***



**AFTER DOMAINS REGISTERATION, PROCEED TO UPGRADING YOUR PLAN TO A PRO PLAN.**



**2. *ADDING CUSTOM CAPTCHA PAGES EXTRA LAYER SECURITY***



**You can learn more and teach yourself how to do so here:
https://developers.cloudflare.com/rules/custom-errors/edit-error-pages/?preferred-color-scheme=light**



**3. *AFTER UPLOADING YOUR SITE TO CLOUDFLARE PAGES. STEP 4***



***Add a custom domain and subdomain to your cloudflare static page .dom and www.***



***This is were our main lecture lies. I believe before you found this script you'lready have a knowledge of cloudflare and how to host around it.***


**4.** 

* **You will need an ubuntu vps 2gb or 4gb is fine**
* 
* **ssh into your vps and update.**
* **npx wrangler login**
* 
* **Authenticating your VPS WITH CLOUDFLARE VIA API KEY(Better For VPS)**



* 
* **API Token authentication**
* 
* **This is usually cleaner for servers/VPS.**
* 
* **Step 1 — Create API Token**
* 
* **Go to:**
* 
* **Cloudflare Dashboard**
* 
* **→ My Profile**
* **→ API Tokens**
* **→ Create Token**
* 
* **Use:**
* 
* **“Edit Cloudflare Workers”**
* 
* **OR custom permissions:**
* 
* **Recommended Permissions**
* **Account**
* **Workers Scripts: Edit**
* **Workers Routes: Edit**
* **Zone**
* **Workers Routes: Edit**
* **Step 2 — Copy Token**
* 
* **You’ll get something like:**
* 
* **xxxxxxxxxxxxxxxxxxxxx**
* **Step 3 — Set Environment Variable**
* 
* **On Linux VPS:**
* 
* **export CLOUDFLARE_API_TOKEN=API_KEY_TOKEN
* 
* **Optional permanent method:**
* 
* **nano ~/.bashrc**
* 
* **Add:**
* 
* **export CLOUDFLARE_API_TOKEN=CLOUDFLARE_API_TOKEN=API_KEY_TOKEN
* 
* **Then:**
* 
* **source ~/.bashrc**
* **Step 4 — Get your .dev cloudflare url to your website (not your custom domain) usually https://......pages.dev**
* 
* **Create a folder in vps : sudo mkdir aurionthas-bot**
* **cd crawlers-bot**
* **nano worker.js**
* **nano wrangler.toml**
* **nano package.json
(I have included a demo script)**
* 
* **Deploy**
* 
* **Now deploy normally:**
* 
* **npx wrangler deploy**
* 
* **No browser required.**
* 
* **Recommended VPS Workflow**
* 
**Debug Note (If you experience issue trying to deploy another script to a new repo, clear your cache, update your api key and update file name to match your folder in wrangler.toml)**
* **clear cache : rm -rf ~/.wrangler**
* 
* **For VPS/server:**
* 
* **API Token auth is better than browser login.**
* 
* **More stable.**
* **More secure.**
* **Better for CI/CD later.**
* 
* **Also Verify Node/NPM**
* 
* **Run:**
* 
* **node -v**
* **npm -v**
* 
* **If missing:**
* 
* **Ubuntu/Debian:**
* 
* **sudo apt update**
* **sudo apt install nodejs npm**
* **Then Final Deploy Flow**
* **cd crawlers-bot**
* **npm install**
* **export CLOUDFLARE\_API\_TOKEN=YOUR\_TOKEN**
* **npx wrangler deploy**
* **After the installation process.

Go to the deployed bot server on your cloudflare pages, add your custome route 
\*.YOUR-DOMAIN.work/\* (This is the ight pattern)**





**5. 

Summary, you now have a fully secured page which this bot service runs as a frontend proxy-server behind cloudflare protecting your sites.

Visitors >>> They hit your proxy first >>>>> then your proxy carries valid and non-risky visitors to the main page. while still injecting html dynamic obfuscation. when ever a bot tries reading site they get a 404 error.**  

---

