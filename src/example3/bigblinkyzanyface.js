// Create a class for the element
class ZanyFace extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // Changing from const to 'this' to access it later
    this.wrapper = document.createElement('div');
    this.wrapper.textContent = '🤪';
    
    /* Styling our custom component */
    const style = document.createElement('style');
    style.textContent = `div {
  font-size: 40em;
}

.hidden {
  display: none;
}
`;

    shadow.appendChild(style);
    shadow.appendChild(this.wrapper);
  }

  // This method is called when the element is first connected to the document DOM
  connectedCallback() {
    this.interval = setInterval(() => this.wrapper.classList.toggle('hidden'), 1000);
  }

  //This method is called when the element is disconnected from the document DOM
  disconnectedCallback() {
    clearInterval(this.interval);
  }
}

// Define the new element
customElements.define('x-🤪', ZanyFace);