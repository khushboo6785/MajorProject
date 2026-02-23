// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();
async function selectCountry(country) {
  const countryBtn = document.getElementById("countryBtn");
  countryBtn.textContent = country;

  const res = await fetch(`listings/get/${country}`);
  const jsonRes = await res.json();
  const allListings = jsonRes.allListings;

  const container = document.getElementById("listingsContainer");
  container.innerHTML = "";

  allListings.forEach((listing) => {
    const card = document.createElement("a");
    card.href = `listings/${listing._id}`;
    card.className = "listing-link col ";
    card.innerHTML = `
    <div class="card listing-card">
    <img src=${listing.image.url} class="card-img-top"
          style="height: 18rem"
          alt="..." />
      <div class="card-img-overlay"></div>
      <div class="card-body">
          <p class="card-text">
            <b>${listing.title}</b> <br />
            &#8377;${listing.price.toLocaleString("en-IN")}
            /night &nbsp; &nbsp;
           <i class="taxToggle">+18% GST</i>
          </p>
        </div>    
    </div>
    `;
    container.appendChild(card);
  });
}
