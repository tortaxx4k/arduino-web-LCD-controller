const express = require('express');
const { SerialPort } = require('serialport');
const app = express();
const port = 80;


const arduinoPort = new SerialPort({
  path: 'COM5',  // replace with your Arduino port
  baudRate: 9600
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }

          .form-container {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 100%;
            max-width: 500px;
          }

          h2 {
            color: #333;
            margin-bottom: 20px;
            font-size: 24px;
          }

          input[type="text"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
          }

          button {
            background-color: #28a745;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            width: 100%;
          }

          button:hover {
            background-color: #218838;
          }

          .message {
            margin-top: 20px;
            color: #333;
            font-size: 18px;
          }

          footer {
            position: absolute;
            bottom: 10px;
            font-size: 14px;
            color: #888;
          }

          @media only screen and (max-width: 768px) {
            .form-container {
              padding: 20px;
              width: 90%;
            }

            h2 {
              font-size: 20px;
            }

            input[type="text"], button {
              font-size: 14px;
            }
          }

          @media only screen and (max-width: 480px) {
            .form-container {
              padding: 15px;
            }

            h2 {
              font-size: 18px;
            }

            input[type="text"], button {
              font-size: 12px;
            }
          }
        </style>
      </head>
      <body>
        <div class="form-container">
          <h2>set the text to display on the LCD screen</h2>
          <form action="/send" method="POST">
            <input type="text" name="lcdMessage" placeholder="message to display on the screen" required />
            <button type="submit">submit</button>
          </form>
          <div class="message">
          </div>
        </div>
        <footer>made with ♥ by <a href="https://github.com/tortaxx4k">tortaxx</a></footer>
      </body>
    </html>
  `);
});


app.post('/send', (req, res) => {
  const message = req.body.lcdMessage;

  if (message.length > 32) {
    return res.status(400).send(`
      <html>
        <body>
          <div class="form-container">
            <h2>Erreur</h2>
            <p>the message cannot exceed 32 characters.</p>
            <a href="/">Retour</a>
          </div>
        </body>
      </html>
    `);
  }


  arduinoPort.write(message + '\n', (err) => {
    if (err) {
      return res.send(`
        <html>
          <body>
            <div class="form-container">
              <h2>error while sending</h2>
              <p>Erreur : ${err.message}</p>
              <a href="/">back</a>
            </div>
          </body>
        </html>
      `);
    }

    res.send(`
      <html>
        <body>
          <div class="form-container">
            <h2>The message was been sended</h2>
            <p>Message : "${message}" was sended to the arduino</p>
            <a href="/">go back</a>
          </div>
        </body>
      </html>
    `);
  });
});


app.post('/api/send-text', (req, res) => {
  const { text } = req.body;

  if (!text || text.length === 0) {
    return res.status(400).json({ error: 'the message cannot be empty.' });
  }

  if (text.length > 32) {
    return res.status(400).json({ error: 'Text cannot exceed 32 characters.' })
  }

  arduinoPort.write(text + '\n', (err) => {
    if (err) {
      return res.status(500).json({ error: 'an error has occurred' })
    }

    res.json({ message: 'Text sent successfully' })
  })
})

// Lancement du serveur
app.listen(port, () => {
  console.log(`Web server launched on http://localhost:${port}`);
});