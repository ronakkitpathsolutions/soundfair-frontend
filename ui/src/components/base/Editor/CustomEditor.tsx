import { useState, useEffect, useRef, forwardRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  Autosave,
  BlockQuote,
  BlockToolbar,
  Bold,
  CloudServices,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  ImageBlock,
  ImageInsertViaUrl,
  ImageToolbar,
  ImageUpload,
  Indent,
  Italic,
  Link,
  Paragraph,
  SelectAll,
  SpecialCharacters,
  Strikethrough,
  TextTransformation,
  Underline,
  Undo,
} from 'ckeditor5'

import 'ckeditor5/ckeditor5.css'
import { cn } from 'ui/src/utils/cn'
import { cx } from 'class-variance-authority'

export interface EditorProps {
  label?: string
  error?: string
  validate?: () => boolean | string
  className?: string
  inputClass?: string
  labelClass?: string
  name?: string
  required?: boolean
  displayName?: string
  value?: string
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const CustomEditor = forwardRef<HTMLDivElement, EditorProps>(
  (
    {
      name,
      label,
      required = false,
      labelClass,
      inputClass,
      error,
      onBlur,
      onChange,
      value,
      className,
      resize = 'none',
      displayName = '',
      ...props
    },
    ref,
  ) => {
    const editorContainerRef = useRef(null)
    const editorRef = useRef(null)
    const [isLayoutReady, setIsLayoutReady] = useState(false)
    useEffect(() => {
      setIsLayoutReady(true)

      return () => setIsLayoutReady(false)
    }, [])

    const editorConfig = {
      toolbar: {
        items: [
          'undo',
          'redo',
          '|',
          'findAndReplace',
          'selectAll',
          '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          '|',
          'specialCharacters',
          'link',
          'insertImageViaUrl',
          'blockQuote',
          '|',
          'alignment',
          '|',
          'outdent',
          'indent',
          '|',
          'accessibilityHelp',
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        AccessibilityHelp,
        Alignment,
        Autoformat,
        AutoImage,
        Autosave,
        BlockQuote,
        BlockToolbar,
        Bold,
        CloudServices,
        Essentials,
        FindAndReplace,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        ImageBlock,
        ImageInsertViaUrl,
        ImageToolbar,
        ImageUpload,
        Indent,
        Italic,
        Link,
        Paragraph,
        SelectAll,
        SpecialCharacters,
        Strikethrough,
        TextTransformation,
        Underline,
        Undo,
      ],
      blockToolbar: [
        'fontSize',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        '|',
        'link',
        '|',
        'outdent',
        'indent',
      ],
      fontFamily: {
        supportAllValues: true,
      },
      fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true,
      },
      image: {
        toolbar: ['imageTextAlternative'],
      },
      initialData: '',
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file',
            },
          },
        },
      },
      menuBar: {
        isVisible: true,
      },
      placeholder: 'Type or paste your content here!',
    }
    const textareaClassList = cx(
      'flex min-h-[80px] h-full w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      inputClass,
      {
        'border-error': error,
        'resize-none': resize === 'none',
        'resize-y': resize === 'vertical',
        'resize-h': resize === 'horizontal',
        resize: resize === 'both',
      },
    )

    const handleEditorChange = (event, editor) => {
      const data = editor.getData()
      if (onChange) {
        onChange(data)
      }
    }

    return (
      <>
        <div className={cx('relative mb-6 mt-4', className)}>
          <label
            htmlFor={name}
            className={cn(
              'absolute left-[15px] top-[-12px] z-10 bg-white px-1 text-sm font-medium leading-6',
              labelClass,
            )}
          >
            {label}
          </label>
          <div>
            <div className="main-container">
              <div
                className="editor-container editor-container_classic-editor editor-container_include-block-toolbar"
                ref={editorContainerRef}
              >
                <div className="editor-container__editor">
                  <div ref={editorRef}>
                    {isLayoutReady && (
                      <CKEditor
                        ref={ref}
                        id={name}
                        onBlur={onBlur}
                        onChange={handleEditorChange}
                        editor={ClassicEditor}
                        config={editorConfig}
                        data={value}
                        className={textareaClassList}
                        {...props}
                        onReady={(editor) => {
                          editor.ui.view.editable.element.style.minHeight =
                            '200px'
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {error ? (
            <p
              className="text-error ml-1 mt-1 text-sm font-normal text-red-500"
              role="alert"
            >
              {error}
            </p>
          ) : null}
        </div>
      </>
    )
  },
)

CustomEditor.displayName = 'CustomEditor'

export default CustomEditor
