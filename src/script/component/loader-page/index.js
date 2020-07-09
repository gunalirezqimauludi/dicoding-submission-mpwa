class LoaderPage extends HTMLElement {

    set display(status) {
        this._status = status;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const status = this._status || false;
        this.innerHTML = `
        <div class="loader loader-default is-active" style="display: ${status ? 'block': 'none'};"></div>`;
    }
}

customElements.define("loader-page", LoaderPage);