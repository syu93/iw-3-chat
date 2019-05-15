import { LitElement, html, css } from 'lit-element';
import './chat-data.js';

class ChatApp extends LitElement {

  constructor() {
    super();
    this.data = [];
  }

  static get properties() {
    return {
      email: String,
      pseudo: String,
      data: { type: Array }
    };
  }

  firstUpdated() {

  }

  handleForm(e) {
    e.preventDefault();
    const email = this.shadowRoot.querySelector('input[name=email]');
    const pseudo = this.shadowRoot.querySelector('input[name=pseudo]');

    this.shadowRoot.querySelector('#data').push({
      email: email.value,
      pseudo: pseudo.value
    });
  }

  childAdded(e) {
    this.data = [
      ...this.data,
      e.detail
    ];
  }

  static get styles() {
    return css`
      form { padding: 1rem; }
      form input {
        display: block;
        margin-bottom:  1rem;
      }
    `;
  }

  render() {
    return html`
      <chat-data
        id="data"
        path="users"
        apiKey="AIzaSyAH0oncQi3cXnqxpwI4pHtqsTDCooqroRc"
        authDomain="my-project-bf769.firebaseapp.com"
        databaseURL="https://my-project-bf769.firebaseio.com"
        projectId="my-project-bf769"
        storageBucket="my-project-bf769.appspot.com"
        messagingSenderId="975375538780"
        appId="1:975375538780:web:ca0f8aefd0fbc653"
        @child-added="${this.childAdded}"
      ></chat-data>

      <form id="form" @submit="${this.handleForm}">
        <input type="text" name="pseudo" placeholder="pseudo" id="pseudo">
        <input type="text" name="email" placeholder="email" id="email">
        <button type="submit">Send</button>
      </form>
      <ul>
      ${this.data.map(item => html`<li>${item.email} - ${item.pseudo}</li>`)}
      </ul>
    `;
  }
}
customElements.define('chat-app', ChatApp);
