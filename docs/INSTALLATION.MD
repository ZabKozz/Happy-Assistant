# Installation V1
Installing Discord BOT Vollie is a very simple and easy process

#### ⌚ Installing Requirements
Download the latest version from [Releases](https://github.com/ZabKozz/Vollie/releases), open up the root directory and run the following command.
```bash
npm install
```
</br>

#### 🖥️ Setting up BOT
Rename ``.env.example`` to ``.env`` and open up the file, this can be found found in the **root** folder and input the required fields.
```js
{
    client_Token = 'DiscordBotToken'
    client_Prefix = 'BotPrefix'
    client_ID = 'BotID'
    client_Secret = 'ClientSecret'

    invite_Link = 'BotLinkInviteToServer'
    web_Port = 'WebPort'
    web_Secret = 'WebSecret'
    web_CallbackURL = ''

    developers = ['ID1','ID2']
}
```
* **``client_Token``** - This is the Token for your BOT used to login to Discord.
* **``client_Prefix``** - Is what we will use to call for commands.
* **``client_ID``** - This is the Client ID for your BOT, this can be found in the [Discord Developer Portal](https://discord.com/developers) or in the Discord Client.
* **``client_Secret``** - This is the Client Secret for your BOT, this can be ONLY be found in the [Discord Developer Portal](https://discord.com/developers)

* **``invite_Link``** - 
* **``web_Port``** - Is port that will be used to access the dashboard! Ensure you change the port on your OAuth2 url.
* **``web_Secret``** - 
* **``web_CallbackURL``** - Head over to OAuth2 and create a redirect link. Please use: ``http://localhost:3000/login/api`` Can change ``localhost`` for the IP of your system.

* **``developers``** - This is the Client ID of your Discord account used to authenticate in the login process. Multiple admins can be added ``["userAdminID","userAdminID2"]``

</br>
</br>

Make sure to enable both "Privileged Gateway Intents" on the [**Discord Developer Dashboard**](https://discord.com/developers). This is to fix errors  with "Kick / Ban" Commands!

#### 📡 Starting the application 
Open up the root directory and run the following command.
```bash
npm run start
```
You should now be able to access the dashboard at http://localhost:**web_Port** or the port you chose to use.
</br>

If you ran into any errors or need any further help feel free to ask in the [Discord Server](#)[For the time being, no]
