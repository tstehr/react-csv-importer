import React, { useMemo, useRef, useEffect, useState } from 'react';

import {
  parsePreview,
  PreviewResults,
  Preview,
  CustomizablePapaParseConfig
} from './parser';
import { ImporterFrame } from './ImporterFrame';
import { FormatRawPreview } from './FormatRawPreview';
import { FormatDataRowPreview } from './FormatDataRowPreview';
import { FormatErrorMessage } from './FormatErrorMessage';

import './FormatPreview.scss';
import { useLocale } from '../locale/LocaleContext';

export const FormatPreview: React.FC<{
  customConfig: CustomizablePapaParseConfig;
  file: File;
  assumeNoHeaders?: boolean;
  currentPreview: Preview | null;
  onChange: (preview: Preview | null) => void;
  onAccept: () => void;
  onCancel: () => void;
}> = ({
  customConfig,
  file,
  assumeNoHeaders,
  currentPreview,
  onChange,
  onAccept,
  onCancel
}) => {
  // augmented PreviewResults from parser
  const [preview, setPreview] = useState<PreviewResults<Preview> | null>(
    () =>
      currentPreview && {
        parseError: undefined,
        ...currentPreview
      }
  );

  // wrap in ref to avoid triggering effect
  const customConfigRef = useRef(customConfig);
  customConfigRef.current = customConfig;
  const assumeNoHeadersRef = useRef(assumeNoHeaders);
  assumeNoHeadersRef.current = assumeNoHeaders;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // notify of current state
  useEffect(() => {
    onChangeRef.current(preview && !preview.parseError ? preview : null);
  }, [preview]);

  // perform async preview parse once for the given file
  const asyncLockRef = useRef<number>(0);
  useEffect(() => {
    const oplock = asyncLockRef.current;

    // lock in the current PapaParse config instance for use in multiple spots
    const papaParseConfig = customConfigRef.current;

    // kick off the preview parse
    parsePreview(file, papaParseConfig).then((results) => {
      // ignore if stale
      if (oplock !== asyncLockRef.current) {
        return;
      }

      if (results.parseError) {
        setPreview(results);
      } else {
        // pre-fill headers flag (only possible with >1 lines)
        const hasHeaders = !assumeNoHeadersRef.current && !results.isSingleLine;

        setPreview({ ...results, papaParseConfig, hasHeaders });
      }
    });

    return () => {
      // invalidate current oplock on change or unmount
      asyncLockRef.current += 1;
    };
  }, [file]);

  const {
    importErrorText,
    rawFileContentsText,
    previewImportText,
    hasHeadersText,
    loadingPreviewText,
    nextStepText
  } = useLocale('FormatPreview');

  // preview result content to display
  const reportBlock = useMemo(() => {
    if (!preview) {
      return null;
    }

    if (preview.parseError) {
      return (
        <div className="CSVImporter_FormatPreview__mainResultBlock">
          <FormatErrorMessage onCancelClick={onCancel}>
            {importErrorText}{' '}
            <b>{preview.parseError.message || String(preview.parseError)}</b>
          </FormatErrorMessage>
        </div>
      );
    }

    return (
      <div className="CSVImporter_FormatPreview__mainResultBlock">
        <div className="CSVImporter_FormatPreview__header">
          {rawFileContentsText}
        </div>

        <FormatRawPreview
          chunk={preview.firstChunk}
          warning={preview.parseWarning}
          onCancelClick={onCancel}
        />

        {preview.parseWarning ? null : (
          <>
            <div className="CSVImporter_FormatPreview__header">
              {previewImportText}
              {!preview.isSingleLine && ( // hide setting if only one line anyway
                <label className="CSVImporter_FormatPreview__headerToggle">
                  <input
                    type="checkbox"
                    checked={preview.hasHeaders}
                    onChange={() => {
                      setPreview((prev) =>
                        prev && !prev.parseError // appease type safety
                          ? {
                              ...prev,
                              hasHeaders: !prev.hasHeaders
                            }
                          : prev
                      );
                    }}
                  />
                  <span>{hasHeadersText}</span>
                </label>
              )}
            </div>
            <FormatDataRowPreview
              hasHeaders={preview.hasHeaders}
              rows={preview.firstRows}
            />
          </>
        )}
      </div>
    );
  }, [
    preview,
    rawFileContentsText,
    onCancel,
    previewImportText,
    hasHeadersText,
    importErrorText
  ]);

  return (
    <ImporterFrame
      fileName={file.name}
      nextLabel={nextStepText}
      nextDisabled={!preview || !!preview.parseError || !!preview.parseWarning}
      onNext={() => {
        if (!preview || preview.parseError) {
          throw new Error('unexpected missing preview info');
        }

        onAccept();
      }}
      onCancel={onCancel}
    >
      {reportBlock || (
        <div className="CSVImporter_FormatPreview__mainPendingBlock">
          {loadingPreviewText}
        </div>
      )}
    </ImporterFrame>
  );
};
