const AccountVerifactionSucessFull = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sucessful</title>

  <style>
    * {
      box-sizing: border-box;
      /* outline:1px solid ;*/
    }

    body {
      background: #ffffff;
      background: linear-gradient(to bottom, #ffffff 0%, #e1e8ed 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#e1e8ed', GradientType=0);
      height: 100%;
      margin: 0;
      background-repeat: no-repeat;
      background-attachment: fixed;

    }

    .wrapper-1 {
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .wrapper-2 {
      padding: 60px;
      text-align: center;
    }

    h1 {
      font-family: 'Kaushan Script', cursive;
      font-size: 4em;
      letter-spacing: 3px;
      color: #5892FF;
      margin: 0;
      margin-bottom: 20px;
    }

    .wrapper-2 p {
      margin: 0;
      font-size: 1.3em;
      color: #aaa;
      font-family: 'Source Sans Pro', sans-serif;
      letter-spacing: 1px;
    }

    .go-home {
      color: #fff;
      background: #5892FF;
      padding: 10px 50px;
      margin-top: 60px;
      border-radius: 30px;
      text-transform: capitalize;
      box-shadow: 0 10px 16px 1px rgba(174, 199, 251, 1);
      text-decoration: none;
    }



    @media (min-width:360px) {
      h1 {
        font-size: 4.5em;
      }

      /* .go-home {
        margin-bottom: 20px;
      } */
    }

    @media (min-width:600px) {
      .content {
        max-width: 1000px;
        margin: 0 auto;
      }

      .wrapper-1 {
        height: initial;
        max-width: 620px;
        margin: 0 auto;
        margin-top: 50px;
        box-shadow: 4px 8px 40px 8px rgba(88, 146, 255, 0.2);
      }

    }
  </style>

</head>

<body>
  <div class=content>
    <div class="wrapper-1">
      <div class="wrapper-2">
        <h1>Thank you !</h1>
        <p>Thanks for account confirmation . </p>
        <br>
        <a href="" class="go-home">Go To Home </a>

      </div>

    </div>
  </div>
</body>

</html>`;

export { AccountVerifactionSucessFull };
