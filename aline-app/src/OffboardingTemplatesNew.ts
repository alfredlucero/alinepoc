import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@vaadin/router';

export interface OffboardingTemplateSubstep {
  id: string;
  value: string;
}

export interface OffboardingTemplateStep {
  id: string;
  value: string;
  substeps: OffboardingTemplateSubstep[];
}

export class OffboardingTemplatesNew extends LitElement {
  @state()
  steps: OffboardingTemplateStep[] = [
    {
      id: uuidv4(),
      value: '',
      substeps: [
        {
          id: uuidv4(),
          value: '',
        },
      ],
    },
  ];

  @state()
  previewMode = false;

  static styles = css`
    .header {
      display: flex;
      justify-content: space-between;
    }

    .offboarding-template-steps {
      padding: 2rem;
    }

    .offboarding-template-row {
      display: flex;
    }

    .offboarding-template-row-input {
      flex: 4;
    }

    .offboarding-template-row-actions {
      flex: 1;
      align-self: flex-end;
    }

    .offboarding-template-substeps {
      padding: 2rem;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
    }
  `;

  render() {
    if (this.previewMode) {
      return html`
        <main>
          <h1>Aline > Offboarding > Templates > New</h1>
          <div class="header">
            <p>
              This is a preview. Everything below is what the experience would
              look like for an offboardee with some data such as dates
              pre-filled.
            </p>
            <sl-button type="button" @click=${this.handleContinueEditingClick}
              >Continue Editing</sl-button
            >
          </div>
        </main>
      `;
    }

    return html`
      <main>
        <h1>Aline > Offboarding > Templates > New</h1>
        <h2 class="header">
          Create an Offboarding Template
          <sl-button type="button" @click=${this.handleGoBackClick}
            >Go Back</sl-button
          >
        </h2>
        <form @submit=${this.handlePublishSubmit}>
          <sl-input
            label="What would you like to name this offboarding template?"
            type="text"
          >
          </sl-input>
          <sl-textarea
            label="What general description and guidelines would you like to add for offboardees to see?"
          >
          </sl-textarea>
          <p>What steps do they need to take to offboard?</p>
          <div class="offboarding-template-steps">
            ${this.steps.map(
              (step, stepIndex) =>
                html`
                  <div class="offboarding-template-row">
                    <sl-input
                      type="text"
                      label="Step ${stepIndex + 1}"
                      class="offboarding-template-row-input"
                      .value=${step.value}
                      @input=${(e: Event) => {
                        this.handleStepChange(
                          step.id,
                          (e.target as HTMLInputElement).value
                        );
                      }}
                    ></sl-input>
                    <sl-button
                      type="button"
                      @click=${() => this.handleRemoveStepClick(step.id)}
                      class="offboarding-template-row-actions"
                      data-id="${step.id}"
                      >Remove Step and its Substeps</sl-button
                    >
                  </div>
                  <div class="offboarding-template-substeps">
                    ${step.substeps.map(
                      (substep, substepIndex) => html`
                        <div class="offboarding-template-row">
                          <sl-input
                            type="text"
                            label="Substep ${substepIndex + 1}"
                            class="offboarding-template-row-input"
                            .value=${substep.value}
                            @input=${(e: Event) => {
                              this.handleSubstepChange(
                                step.id,
                                substep.id,
                                (e.target as HTMLInputElement).value
                              );
                            }}
                          ></sl-input>
                          <sl-button
                            type="button"
                            @click=${() =>
                              this.handleRemoveSubstepClick(
                                step.id,
                                substep.id
                              )}
                            class="offboarding-template-row-actions"
                            data-id="${substep.id}"
                            >Remove Substep</sl-button
                          >
                        </div>
                      `
                    )}
                    <sl-button
                      type="button"
                      @click=${() => this.handleAddSubstepClick(step.id)}
                      >Add a Substep</sl-button
                    >
                  </div>
                `
            )}
            <sl-button @click=${this.handleAddStepClick} type="button"
              >Add a Step</sl-button
            >
          </div>
          <div class="form-actions">
            <sl-button type="button" @click=${this.handlePreviewClick}
              >Preview</sl-button
            >
            <sl-button type="submit" variant="primary">Publish</sl-button>
          </div>
        </form>
      </main>
    `;
  }

  handlePublishSubmit(e: Event) {
    e.preventDefault();
    // TODO: open up modal
  }

  handleGoBackClick() {
    Router.go('/offboarding/templates');
  }

  handleStepChange(stepId: string, newValue: string) {
    console.log('Updating step value for ', stepId, 'before', this.steps);
    this.steps = this.steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          value: newValue,
        };
      }
      return step;
    });
    console.log('Updating step value for ', stepId, 'after', this.steps);
  }

  handleAddStepClick() {
    console.log('Adding step before', this.steps);
    this.steps = [
      ...this.steps,
      {
        id: uuidv4(),
        value: '',
        substeps: [
          {
            id: uuidv4(),
            value: '',
          },
        ],
      },
    ];
    console.log('Adding steps after: ', this.steps);
  }

  handleRemoveStepClick(stepId: string) {
    console.log('Removing step', stepId, 'before', this.steps);
    this.steps = this.steps.filter(step => step.id !== stepId);
    console.log('Removing steps after: ', this.steps);
  }

  handleSubstepChange(stepId: string, substepId: string, newValue: string) {
    console.log(
      'Updating substep value for step',
      stepId,
      'and substep',
      substepId,
      'before',
      this.steps
    );
    this.steps = this.steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          substeps: step.substeps.map(substep => {
            if (substep.id === substepId) {
              return {
                ...substep,
                value: newValue,
              };
            }
            return substep;
          }),
        };
      }
      return step;
    });
    console.log(
      'Updating substep value for step',
      stepId,
      'and substep',
      substepId,
      'after',
      this.steps
    );
  }

  handleAddSubstepClick(stepId: string) {
    console.log('Adding substep to step', stepId, 'before', this.steps);
    this.steps = this.steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          substeps: [
            ...step.substeps,
            {
              id: uuidv4(),
              value: '',
            },
          ],
        };
      }
      return step;
    });
    console.log('Adding substep after: ', this.steps);
  }

  handleRemoveSubstepClick(stepId: string, substepId: string) {
    console.log(
      'Removing substep ',
      substepId,
      ' from step ',
      stepId,
      'before',
      this.steps
    );
    this.steps = this.steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          substeps: step.substeps.filter(substep => substep.id !== substepId),
        };
      }
      return step;
    });
    console.log(
      'Removing substep ',
      substepId,
      ' from step ',
      stepId,
      'after',
      this.steps
    );
  }

  handlePreviewClick() {
    this.previewMode = true;
  }

  handleContinueEditingClick() {
    this.previewMode = false;
  }
}
