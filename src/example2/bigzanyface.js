// Create a class for the element
class ZanyFace extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    const wrapper = document.createElement('div');
    wrapper.textContent = '🤪';
    
    /* Styling our custom component */
    const style = document.createElement('style');
    style.textContent = `div {
  font-size: 40em;
}`;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
}

// Define the new element
customElements.define('x-🤪', ZanyFace);