import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { BeforeEnterObserver, RouterLocation } from '@vaadin/router';

export class OffboardingTemplatesDetails
  extends LitElement
  implements BeforeEnterObserver
{
  @state()
  templateId?: number;

  onBeforeEnter(location: RouterLocation) {
    this.templateId = parseInt(location.params.id as string, 10);
  }

  render() {
    return html`
      <main>
        <h1>Aline > Offboarding > Templates > Details</h1>
        <p>Template: ${this.templateId}</p>
      </main>
    `;
  }
}
