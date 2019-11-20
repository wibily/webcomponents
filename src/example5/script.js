const formResult = document.getElementById("formResult");

document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  formResult.innerHTML = "";
  formResult.textContent = "Successful submit!";
  for (let [key, value] of new FormData(e.target)) {
    const p = document.createElement("p");
    p.textContent = `${key} : ${value}`;
    formResult.appendChild(p);
  }
});

const ValidityStateFlags = {
  valueMissing: false,
  typeMismatch: false,
  patternMismatch: false,
  tooLong: false,
  tooShort: false,
  rangeUnderflow: false,
  rangeOverflow: false,
  stepMismatch: false,
  badInput: false,
  customError: false
};
const serverResp = document.getElementById("serverResp");

const apiHandler = function(evt) {
  if (!this._dogBreed.value) {
    this._internals.setValidity(
      {
        ...ValidityStateFlags,
        valueMissing: true
      },
      "Oh nOES, you forgot the dog breed?"
    );
  } else {
    this._internals.setValidity(
      {
        ...ValidityStateFlags,
        customError: true
      },
      "Hol up, still loading!"
    );
    /* this is the real url */
    // const url = "https://dog.ceo/api/breeds/list/all";
    const url = "http://localhost:3000/dogz";
    serverResp.textContent = "Loading...";

    fetch(url)
      .then(resp => resp.json())
      .then(resp => {
        serverResp.textContent = JSON.stringify(resp);
        if (Object.keys(resp.message).includes(this._dogBreed.value)) {
          this._internals.setValidity({
            ...ValidityStateFlags
          });
          this._internals.setFormValue(this._dogBreed.value);
        } else {
          this._internals.setValidity(
            {
              ...ValidityStateFlags,
              customError: true
            },
            "Dat not a dog!"
          );
        }
      })
      .catch(err => {
        console.log(err);
        this._internals.setValidity(
          {
            ...ValidityStateFlags,
            customError: true
          },
          "Oh noes, the API goofed!"
        );
      });
  }
};

class DogBreed extends HTMLElement {
  //this makes it a form associating custom element
  static get formAssociated() {
    return true;
  }

  constructor() {
    super();

    //the shadow root contains our custom component's shadow DOM
    const shadow = this.attachShadow({
      mode: "open"
    });
    this._dogBreed = document.createElement("input");
    this._dogBreed.id = "dogBreed";
    const dogBreedLabel = document.createElement("label");
    dogBreedLabel.textContent = "What is your dog breed? ";
    dogBreedLabel.setAttribute("for", this._dogBreed.id);

    shadow.appendChild(dogBreedLabel);
    shadow.appendChild(this._dogBreed);

    this._internals = this.attachInternals(); //this is how you get access to the ElementsInternal interface aka validation stuff
    this.setAttribute("tabindex", 0); //this makes it focusable
    this._internals.setValidity(
      {
        ...ValidityStateFlags,
        valueMissing: true
      },
      "Oh nOES, you forgot the dog breed?"
    );

    this.blurHandler = apiHandler.bind(this);
  }

  connectedCallback() {
    this._dogBreed.addEventListener("blur", this.blurHandler); //make api call on blur of input field
  }

  disconnectedCallback() {
    this._dogBreed.removeEventListener("blur", this.blurHandler);
  }
}

//autonomous custom element means no extending existing elements
customElements.define("dog-breed", DogBreed);
