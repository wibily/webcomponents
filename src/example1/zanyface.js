// Create a class for the element
class ZanyFace extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root - ignore this bit for now
    const shadow = this.attachShadow({mode: 'open'});

    // Create my div to contain zany face
    const wrapper = document.createElement('div');
    // Zany face!
    wrapper.textContent = '🤪';    
    
    shadow.appendChild(wrapper);
  }
}

// Define the new element
customElements.define('x-🤪', ZanyFace);