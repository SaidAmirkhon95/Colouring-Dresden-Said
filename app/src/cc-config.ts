export interface CCConfig
{
    cityName: string;
    projectBlurb: string;
    githubURL: string;
    privacyStatement: string;
    
    initialMapPosition: [number, number];
    initialZoomLevel: number;
    enable_survey_popup: boolean;
}
/* +++ Description for 'enable_survey_popup' +++ */
/* enable_survey_popup equals true triggers a modal/popup via API and plpgsql function to show it twice for each user after saving edits for building features */
/* survey popup is a feature to enable evaluation research using external survey e.g. on SoSci survey page */
/* first update modal content: /app/src/frontend/components/survey-modal.tsx */
/* and run proper SQL migrations to add SQL column and function: /migrations/058.modal-popup-survey.up.sql */