import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { BeforeEnterObserver, RouterLocation } from '@vaadin/router';

export class BoardingStepsDetails
  extends LitElement
  implements BeforeEnterObserver
{
  @state()
  stepId?: number;

  onBeforeEnter(location: RouterLocation) {
    this.stepId = parseInt(location.params.id as string, 10);
  }

  render() {
    return html`
      <main>
        <h1>Aline > Boarding > Steps Library > Details</h1>
        <p>Step: ${this.stepId}</p>
      </main>
    `;
  }
}
