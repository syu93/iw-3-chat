import { LitElement, html, css } from 'lit-element';

import firebase from 'firebase/app';
import 'firebase/auth';

export class ChatLogin extends LitElement {
  constructor() {
    super();
    this.email = '';
    this.password = '';
  }
  static get properties() {
    return {
      email: String,
      password: String,
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  firstUpdated() {
    this.auth = firebase.auth();
    this.auth.onAuthStateChanged(user => {
      if (!user) {
        // handle logout ...
      } else {
        console.log('user logged', user)
        this.dispatchEvent(new CustomEvent('user-logged', { detail: { user }}));
      }
    });
  }

  handleForm(e) {
    e.preventDefault();
    this.auth.signInWithEmailAndPassword(this.email, this.password);
  }

  render() {
    return html`
      <h1>Login</h1>
      <form @submit="${this.handleForm}">
        <input type="text" .value="${this.email}" @input="${e => this.email = e.target.value}">
        <input type="password" .value="${this.password}" @input="${e => this.password = e.target.value}">
        <button type="submit">Login</button>
      </form>
    `;
  }
}
customElements.define('chat-login', ChatLogin);