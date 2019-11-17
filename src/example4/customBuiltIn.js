// Note that we are extending the HTMLParagraphElement instead of just a HTMLElement
class DogeParagraph extends HTMLParagraphElement {
  constructor() {
    super();
 
    // this code simply uppercases any of the below keywords
    const dogeWords = ['very', 'much', 'wow', 'many'];
    dogeWords.map(word => {
      const dogeRegex = new RegExp(word, 'g'); // greedy match
      this.innerText = this.innerText.replace(dogeRegex, word.toLocaleUpperCase());
    }); 
  }
}

console.log('javascript enabled');
customElements.define('doge-p', DogeParagraph, { extends: "p" });