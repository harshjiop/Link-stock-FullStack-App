const AccountVerifaction = `<div class="app font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4">

<div class="mail__wrapper max-w-md mx-auto">

  <div class="mail__content bg-white p-8 shadow-md">

    <div class="content__header text-center tracking-wide border-b">
      <div class="text-red text-sm font-bold">lets-start-code.com</div>
      <h1 class="text-3xl h-48 flex items-center justify-center">E-mail Confirmation</h1>
    </div>

    <div class="content__body py-8 border-b">
      <p>
        Hello Sir! <br><br>It looks like you just signed up for The App, that’s awesome! Can we ask you for email confirmation? Just click the button bellow.
      </p>
      <button  class="  bg-red rounded w-full my-8 p-4 ">
      <a href="${process.env.Cors_Origin}/account-verifecation?token=${Forget_Token}"  class="text-white no-underline " >CONFIRM EMAIL ADRESS</a>
        </button>
      <p class="text-sm">
        Keep Rockin!<br> lets-start-code.com
      </p>
    </div>

    <div class="content__footer mt-8 text-center text-grey-darker">
      <h3 class="text-base sm:text-lg mb-4">Thanks for using The App!</h3>
      <p>https://www.lets-start-code.com/</p>
    </div>

  </div>

<!--     <div class="mail__meta text-center text-sm text-grey-darker mt-8">

    <div class="meta__social flex justify-center my-4">
      <a href="#" class="flex items-center justify-center mr-4 bg-black text-white rounded-full w-8 h-8 no-underline"><i class="fab fa-facebook-f"></i></a>
      <a href="#" class="flex items-center justify-center mr-4 bg-black text-white rounded-full w-8 h-8 no-underline"><i class="fab fa-instagram"></i></a>
      <a href="#" class="flex items-center justify-center bg-black text-white rounded-full w-8 h-8 no-underline"><i class="fab fa-twitter"></i></a>
    </div>

    <div class="meta__help">
      <p class="leading-loose">
        Questions or concerns? <a href="#" class="text-grey-darkest">help@theapp.io</a>

        <br> Want to quit getting updates? <a href="#" class="text-grey-darkest">Unsubscribe</a>
      </p>
    </div>

  </div>

</div> -->

</div>`;
