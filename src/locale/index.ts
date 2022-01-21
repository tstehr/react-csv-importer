/* eslint-disable @typescript-eslint/explicit-module-boundary-types -- all exports are ImporterLocale which is already fully typed */

export interface ImporterLocale {
  components: {
    ColumnDragCard: {
      dummyHeaderText: string;
      getHeaderText: (code: string) => string;
    };
    ColumnDragSourceArea: {
      ariaLabelText: string;
      getPageIndicatorText: (currentPage: number, pageCount: number) => string;
      getAssigningColumnText: (columnCode: string) => string;
      nextColumnsText: string;
      previousColumnsText: string;
    };
    ColumnDragTargetArea: {
      ariaLabelText: string;
    };
    ColumnPicker: {
      requiredFieldsErrorText: string;
      subtitleText: string;
    };
    FileSelector: {
      defaultText: string;
      dragActiveText: string;
    };
    FormatErrorMessage: {
      backText: string;
    };
    FormatPreview: {
      importErrorText: string;
      rawFileContentsText: string;
      previewImportText: string;
      hasHeadersText: string;
      loadingPreviewText: string;
    };
    FormatRawPreview: {
      getWarningText: (warningMessage: string) => string;
    };
    ImporterFrame: {
      previousStepText: string;
      nextStepText: string;
    };
    ProgressDisplay: {
      subtitleText: string;
      uploadMoreText: string;
      finishText: string;
      statusErrorText: string;
      statusCompleteText: string;
      statusPendingText: string;
      processedRowsText: string;
    };
    SourceBox: {
      clearAssignmentText: string;
      selectColumnText: string;
      unselectColumnText: string;
    };
    TargetBox: {
      optionalAriaLabelText: string;
      requiredAriaLabelText: string;
      boxPlaceholderText: string;
      getBoxValueActionText: (columnCode: string) => string;
      clearText: string;
    };
  };
}

export const enUS: ImporterLocale = {
  components: {
    ColumnDragCard: {
      dummyHeaderText: 'Unassigned field',
      getHeaderText: (code) => `Column ${code}`
    },
    ColumnDragSourceArea: {
      ariaLabelText: 'Columns to import',
      getPageIndicatorText: (currentPage: number, pageCount: number) =>
        `Page ${currentPage} of ${pageCount}`,
      getAssigningColumnText: (columnCode: string) =>
        `Assigning column ${columnCode}`,
      nextColumnsText: 'Show next columns',
      previousColumnsText: 'Show previous columns'
    },
    ColumnDragTargetArea: {
      ariaLabelText: 'Target fields'
    },
    ColumnPicker: {
      requiredFieldsErrorText: 'Please assign all required fields',
      subtitleText: 'Select Columns'
    },
    FileSelector: {
      defaultText: 'Drag-and-drop CSV file here, or click to select in folder',
      dragActiveText: 'Drop CSV file here...'
    },
    FormatPreview: {
      importErrorText: 'Import error:',
      rawFileContentsText: 'Raw File Contents',
      previewImportText: 'Preview Import',
      hasHeadersText: 'Data has headers',
      loadingPreviewText: 'Loading preview...'
    },
    FormatRawPreview: {
      getWarningText: (warningMessage: string) =>
        `${warningMessage}: please check data formatting`
    },
    FormatErrorMessage: {
      backText: 'Go Back'
    },
    ImporterFrame: {
      previousStepText: 'Go to previous step',
      nextStepText: 'Next'
    },
    ProgressDisplay: {
      subtitleText: 'Import',
      uploadMoreText: 'Upload More',
      finishText: 'Finish',
      statusErrorText: 'Could not import',
      statusCompleteText: 'Complete',
      statusPendingText: 'Importing...',
      processedRowsText: 'Processed rows:'
    },
    SourceBox: {
      clearAssignmentText: 'Clear column assignment',
      selectColumnText: 'Select column for assignment',
      unselectColumnText: 'Unselect column'
    },
    TargetBox: {
      optionalAriaLabelText: 'optional',
      requiredAriaLabelText: 'required',
      boxPlaceholderText: 'Drag column here',
      getBoxValueActionText: (columnCode: string) =>
        `Assign column ${columnCode}`,
      clearText: 'Clear column assignment'
    }
  }
};
