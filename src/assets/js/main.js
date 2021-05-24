const links = document.querySelectorAll(".copy-link");

links.forEach( link => {
  link.addEventListener("click", async event => {
    event.preventDefault();

    if( !navigator.clipboard )
      return;

    const text = event.target.href;


    try{
      await navigator.clipboard.writeText(text);
      event.target.parentNode.classList.add( "message-visible" );
      // console.log('Copied to clipboard', event);
    } catch(err) {
      console.error('Failed to copy!', err);
    }

    return false;
  })

})

const imgs = document.querySelectorAll("img.blur")

imgs.forEach( img => {
  img.addEventListener("load", event => {
    img.classList.remove("blur");
    img.removeAttribute("style");
  })
})
