import { registerLicense } from '@syncfusion/ej2-base';
import { DocumentEditorContainerComponent, Toolbar, SpellChecker, Inject } from '@syncfusion/ej2-react-documenteditor';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-react-documenteditor/styles/material.css';
import './App.css'
import {useEffect} from 'react';

// Register Syncfusion license
registerLicense(import.meta.env.VITE_SYNCFUSION_KEY);

const CONTAINER_ID = 'documenteditor';
function App() {
  let documentEditorContainer: DocumentEditorContainerComponent | null = null;


  useEffect(() => {
    componentDidMount()
  }, []);


  function componentDidMount(): void {
    if (!documentEditorContainer) return;
    const documentEditor = documentEditorContainer.documentEditor;
    if (!documentEditor) return;

    documentEditor.spellChecker.languageID = 1033 //LCID of "en-us";
    documentEditor.spellChecker.removeUnderline = false;
    documentEditor.spellChecker.allowSpellCheckAndSuggestion = true;
  }


  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex' }}>
      <DocumentEditorContainerComponent
        id={CONTAINER_ID}
        height="100%"
        width="70%"
        enableToolbar={true}
        enableSpellCheck={true}
        ref={(scope) => {
          documentEditorContainer = scope;
        }}
        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
        showPropertiesPane={false}
        enableLocalPaste={true}
      >
        <Inject services={[Toolbar, SpellChecker]}></Inject>
      </DocumentEditorContainerComponent>

    </div>
  );
}

export default App;