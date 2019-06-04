import { LitElement, html, css } from 'lit-element';
import './data/chat-data.js';
import './data/chat-auth.js';
import './data/chat-login.js';

class ChatApp extends LitElement {

  constructor() {
    super();
    this.users = [];
    this.user = {};
  }

  static get properties() {
    return {
      unresolved: {
        type: Boolean,
        reflect: true
      },
      email: String,
      pseudo: String,
      users: { type: Array },
      user: Object
    };
  }

  firstUpdated() {
    this.unresolved = false;
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
    this.users = e.detail;
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

  handleLogin(e) {
    this.user = e.detail.user;
  }

  render() {
    return html`
      <chat-data
        path="users"
        @child-changed="${this.childAdded}">
      </chat-data>
      <!-- Header -->
      <slot></slot>
      <!-- Header -->

      ${
        !this.user.email ? html`
          <chat-auth></chat-auth>
          <chat-login
            @user-logged="${this.handleLogin}"
            ></chat-login>
        ` : html `
          <h1>Hi, ${this.user.email}</h1>
        `
      }

      <ul>
        ${this.users.map(user => html`
          <li>${user.name}</li>
        `)}
      </ul>
    `;
  }
}
customElements.define('chat-app', ChatApp);
