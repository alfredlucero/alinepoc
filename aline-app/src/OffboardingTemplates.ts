import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import { Router } from '@vaadin/router';

export interface OffboardingTemplate {
  id: number;
  name: string;
  description: string;
  lastModified: string;
  latestVersion: number;
}

export class OffboardingTemplates extends LitElement {
  @state()
  templates: OffboardingTemplate[] = [];

  @state()
  isLoading = true;

  firstUpdated() {
    setTimeout(() => {
      this.isLoading = false;
      this.templates = [
        {
          id: 1,
          name: 'Offboarding for Developers',
          description:
            'This offboarding is designed for all full-time, part-time, and intern software engineers...',
          lastModified: '12/08/2022',
          latestVersion: 2,
        },
      ];
    }, 2000);
  }

  static styles = css`
    .templates-container {
      min-height: 100vh;
      min-width: 100vw;
    }

    .templates-container-loading {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

  render() {
    if (this.isLoading) {
      return html`
        <main>
          <h1>Aline > Offboarding > Templates</h1>
          <div class="templates-container templates-container-loading">
            <sl-spinner
              style="font-size: 3rem; --track-width: 10px;"
            ></sl-spinner>
          </div>
        </main>
      `;
    }

    return html`
      <main>
        <h1>Aline > Offboarding > Templates</h1>
        <div class="templates-container">
          ${this.templates.map(
            template => html`
              <offboarding-template-card
                @sl-select=${this.handleTemplateDropdownSelect}
                .template=${template}
              ></offboarding-template-card>
            `
          )}
        </div>
      </main>
    `;
  }

  handleTemplateDropdownSelect(e: CustomEvent<{ item: HTMLElement }>) {
    const selectedItem = e.detail.item;
    const templateId = selectedItem.getAttribute('data-id');
    const templateAction = selectedItem.getAttribute('value');

    if (templateAction === 'edit') {
      Router.go(`/offboarding/templates/${templateId}`);
    } else if (templateAction === 'delete') {
      console.log('Opening up delete modal for template id ', templateId);
    }
  }
}

export class OffboardingTemplateCard extends LitElement {
  @property({ type: Object })
  template: OffboardingTemplate | null = null;

  static styles = css`
    .template-card {
      min-width: 100%;
    }

    .template-card [slot='header'] {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `;

  render() {
    if (this.template === null) {
      return '';
    }

    return html`
      <sl-card class="template-card">
        <div slot="header">
          ${this.template.name} (ID: ${this.template.id} - Version:
          ${this.template.latestVersion} - Last Modified:
          ${this.template.lastModified})

          <sl-dropdown>
            <sl-button slot="trigger" caret>Actions</sl-button>
            <sl-menu>
              <sl-menu-item value="edit" data-id=${this.template.id}
                >Edit/View</sl-menu-item
              >
              <sl-menu-item value="delete" data-id=${this.template.id}
                >Delete</sl-menu-item
              >
            </sl-menu>
          </sl-dropdown>
        </div>

        ${this.template.description}
      </sl-card>
    `;
  }
}
