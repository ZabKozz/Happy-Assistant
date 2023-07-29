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
```json
{
    client_Token = 'DiscordBotToken'
    client_Prefix = 'BotPrefix'

    web_Port = 'WebPort'
}
```

* **``clientID``** - This is the Client ID for your BOT, this can be found in the [Discord Developer Portal](https://discord.com/developers) or in the Discord Client.
* **``clientSecret``** - This is the Client Secret for your BOT, this can be ONLY be found in the [Discord Developer Portal](https://discord.com/developers)
* **``callbackURL``** - Head over to OAuth2 and create a redirect link. Please use: ``http://localhost:3000/login/api`` Can change ``localhost`` for the IP of your system.

</br>
</br>

#### 📡 Starting the application 
Open up the root directory and run the following command.
```bash
npm run start
```
You should now be able to access the dashboard at http://localhost:**web_Port** or the port you chose to use.
</br>

If you ran into any errors or need any further help feel free to ask in the [Discord Server](#)[For the time being, no]
