import './TextEditor.sass';

import { Component, Fragment } from 'preact';

import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import hljs from 'highlight.js';

interface ComProps {

}

interface ComState {

}

export default class TextEditor extends Component<ComProps, ComState> {

    private editorContainer?: HTMLDivElement;
    private editor?: HTMLDivElement;
    private quillInstance?: Quill;

    constructor(props: ComProps) {
        super(props);
        this.state = {
            active: false,
        };
    }
  
    componentDidMount() {
      if (this.editorContainer) {
        this.quillInstance = new Quill(this.editor, { 
            theme: 'snow',   
            modules: {
                syntax: { hljs },
                toolbar: this.editorContainer,
            },
            placeholder: 'Compose an epic...', 
        });
      }
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Fragment>
                <div id="toolbar-container" ref={el => (this.editorContainer = el)}>
                    <span class="ql-formats">
                        <select class="ql-font"></select>
                        <select class="ql-size"></select>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-bold"></button>
                        <button class="ql-italic"></button>
                        <button class="ql-underline"></button>
                        <button class="ql-strike"></button>
                    </span>
                    <span class="ql-formats">
                        <select class="ql-color"></select>
                        <select class="ql-background"></select>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-script" value="sub"></button>
                        <button class="ql-script" value="super"></button>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-header" value="1"></button>
                        <button class="ql-header" value="2"></button>
                        <button class="ql-blockquote"></button>
                        <button class="ql-code-block"></button>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-list" value="ordered"></button>
                        <button class="ql-list" value="bullet"></button>
                        <button class="ql-indent" value="-1"></button>
                        <button class="ql-indent" value="+1"></button>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-direction" value="rtl"></button>
                        <select class="ql-align"></select>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-link"></button>
                        <button class="ql-image"></button>
                        <button class="ql-video"></button>
                        <button class="ql-formula"></button>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-clean"></button>
                    </span>
                </div>
                <div id="editor" ref={el => (this.editor = el)}></div>
            </Fragment>
        );
    }
}
