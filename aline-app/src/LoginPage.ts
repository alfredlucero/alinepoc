import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import { Router } from '@vaadin/router';

export class LoginPage extends LitElement {
  @state()
  isLoggingIn = false;

  @state()
  loginError: string | null = null;

  render() {
    return html`
      <h1>Log into Aline</h1>
      <form @submit=${this.handleSubmitLogin}>
        <sl-input
          label="Username"
          type="text"
          placeholder="Type in your username."
        ></sl-input>
        <sl-input
          label="Password"
          type="password"
          placeholder="Type in your password."
          password-toggle
        ></sl-input>

        <sl-button variant="primary" type="submit">Log In</sl-button>
      </form>
    `;
  }

  async handleSubmitLogin(e: Event) {
    e.preventDefault();

    try {
      console.log('Logging in!');
      this.isLoggingIn = true;
      setTimeout(() => {
        this.isLoggingIn = false;
        sessionStorage.setItem('aline_authenticated', 'true');
        Router.go('/offboarding/templates');
      }, 2000);
    } catch (err: unknown) {
      console.error('Failed to login: ', err);
      this.isLoggingIn = false;
      this.loginError = 'Failed to login!';
    }
  }
}
