import { registerLicense } from '@syncfusion/ej2-base';
import { DocumentEditorContainerComponent, Toolbar, SpellChecker, Inject, ToolbarItem, CustomToolbarItemModel, DocumentEditor } from '@syncfusion/ej2-react-documenteditor';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
import {useEffect, useState} from 'react';

// Register Syncfusion license
registerLicense(import.meta.env.VITE_SYNCFUSION_KEY);

const CONTAINER_ID = 'documenteditor';
const bookmarksNames = ['case_caption', 'case_number', 'docket_number', 'judge_name', 'hearing_date', 'hearing_time', 'location', 'appearances']
function App() {
  let documentEditorContainer: DocumentEditorContainerComponent | null = null;
  const [currentState, setCurrentState] = useState({});



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

  const handleToolbarClick = (args: ClickEventArgs): void => {
    if (args.item.id === 'insert_test') {
      insertTextAtBookmark();
    } else if (args.item.id === 'log_sfdt') {
      logSFDT();
    }
  };

  const insertTextAtBookmark = () => {
    if (!documentEditorContainer) return;
    
    const documentEditor = documentEditorContainer.documentEditor;
    if (!documentEditor) return;

    bookmarksNames.forEach((bookmark, index)=> {
      // Navigate to bookmark and insert text
      documentEditor.selection.selectBookmark(bookmark, true);
      documentEditor.editor.deleteBookmark(bookmark);
      const { start: startOffset } = getStartAndEndSelection(documentEditor);
      documentEditor.editor.insertText(bookmark);

      const { end: endOffset } = getStartAndEndSelection(documentEditor);
      setStartAndEndSelection(documentEditor, startOffset, endOffset);
      documentEditor.editor.insertBookmark(bookmark);
    })


  };

  const toolbarItems: (ToolbarItem | CustomToolbarItemModel)[] = [
    'New',
    'Open',
    'Undo',
    'Redo',
    'TrackChanges',
      'Bookmark',
    {
      prefixIcon: 'e-de-icon-Bold',
      tooltipText: 'Insert TEST at bookmark',
      text: 'Insert TEST',
      id: 'insert_test'
    } as CustomToolbarItemModel,
    {
      prefixIcon: 'e-de-icon-Print',
      tooltipText: 'Log SFDT',
      text: 'Log SFDT',
      id: 'log_sfdt'
    } as CustomToolbarItemModel
  ];

  const logSFDT = () => {
    if (!documentEditorContainer) return;
    const documentEditor = documentEditorContainer.documentEditor;
    if (!documentEditor) return;
    const sfdt: any = JSON.parse(documentEditor.serialize());
    setCurrentState(sfdt.sec[0].b);
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
        toolbarItems={toolbarItems}
        toolbarClick={handleToolbarClick}
      >
        <Inject services={[Toolbar, SpellChecker]}></Inject>
      </DocumentEditorContainerComponent>
      <div style={{ width: '30%', height: '100%', overflow: 'auto', backgroundColor: '#1E1E1E' }}>
        <SyntaxHighlighter
          language="json"
          style={vscDarkPlus}
          customStyle={{ margin: 0, minHeight: '100%' }}
        >
          {JSON.stringify(currentState, null, 2)}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default App;

const getStartAndEndSelection = (documentEditor: DocumentEditor) => {
  const selection = documentEditor.selection;
  return {
    start: selection.startOffset,
    end: selection.endOffset,
  };
};

const setStartAndEndSelection = (
  documentEditor: DocumentEditor,
  startOffset: string,
  endOffset: string,
) => {
  const selection = documentEditor.selection;
  selection.select(startOffset, endOffset);
};