import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import { Router } from '@vaadin/router';

export interface BoardingStep {
  id: number;
  name: string;
  description: string;
  lastModified: string;
  numSubsteps: number;
}

export class BoardingSteps extends LitElement {
  @state()
  steps: BoardingStep[] = [];

  @state()
  isLoading = true;

  firstUpdated() {
    setTimeout(() => {
      this.isLoading = false;
      this.steps = [
        {
          id: 1,
          name: 'Coding Knowledge Transfer Step',
          description:
            'Step intended for software engineers and engineering managers to share any coding and architectural knowledge before they lose access.',
          lastModified: '12/21/2022',
          numSubsteps: 7,
        },
      ];
    }, 2000);
  }

  static styles = css`
    .steps-header {
      display: flex;
      justify-content: flex-end;
    }

    .steps-container {
      min-height: 100vh;
      min-width: 100vw;
    }

    .steps-container-loading {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

  render() {
    if (this.isLoading) {
      return html`
        <main>
          <h1>Aline > Boarding > Steps Library</h1>
          <div class="steps-container steps-container-loading">
            <sl-spinner
              style="font-size: 3rem; --track-width: 10px;"
            ></sl-spinner>
          </div>
        </main>
      `;
    }

    return html`
      <main>
        <h1>Aline > Boarding > Steps Library</h1>
        <header class="steps-header">
          <sl-button
            type="button"
            variant="primary"
            @click=${this.handleCreateClick}
          >
            Create a New Template
          </sl-button>
        </header>
        <div class="steps-container">
          ${this.steps.map(
            step => html`
              <boarding-steps-card
                @sl-select=${(e: CustomEvent<{ item: HTMLElement }>) => {
                  const selectedItem = e.detail.item;
                  const stepAction = selectedItem.getAttribute('value') ?? '';
                  const stepId = step.id;
                  this.handleStepDropdownSelect(stepId, stepAction);
                }}
                .step=${step}
              ></boarding-steps-card>
            `
          )}
        </div>
      </main>
    `;
  }

  handleCreateClick() {
    Router.go('/boarding/steps/new');
  }

  handleStepDropdownSelect(stepId: number, stepAction: string) {
    if (stepAction === 'edit') {
      Router.go(`boarding/steps/${stepId}`);
    } else if (stepAction === 'delete') {
      console.log('Opening up delete modal for step id ', stepId);
    }
  }
}

export class BoardingStepsCard extends LitElement {
  @property({ type: Object })
  step: BoardingStep | null = null;

  static styles = css`
    .steps-card {
      min-width: 100%;
    }

    .steps-card [slot='header'] {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `;

  render() {
    if (this.step === null) {
      return '';
    }

    return html`
      <sl-card class="steps-card">
        <header slot="header">
          ${this.step.name} (ID: ${this.step.id} - Last Modified:
          ${this.step.lastModified} - ${this.step.numSubsteps}
          substep${this.step.numSubsteps > 1 ? 's' : ''})

          <sl-dropdown>
            <sl-button slot="trigger" caret>Actions</sl-button>
            <sl-menu>
              <sl-menu-item value="edit">Edit/View</sl-menu-item>
              <sl-menu-item value="delete">Delete</sl-menu-item>
            </sl-menu>
          </sl-dropdown>
        </header>

        ${this.step.description}
      </sl-card>
    `;
  }
}
