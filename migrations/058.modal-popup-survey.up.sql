-- CREATE NEW RELEVANT COLUMNS IF NOT EXISTS 
-- to store status according to shows of popup/modal in the past for each user

-- data structure for JSON Array:
-- '["datetime1","datetime2","datetime3","datetime4"]'

-- using TEXT[] instead of TIMESTAMP[] because ARRAY_APPEND ist not working for TIMESTAMP
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS suryev_popup_shows TEXT[];

-- CREATE OR REPLACE FUNCTION to determine status of shown popups in the past
-- Input parameter is user id
-- return ist boolean

CREATE OR REPLACE FUNCTION public.handleSurveyPopupStatus(user_id_input uuid)
RETURNS text
LANGUAGE plpgsql
AS
$$
DECLARE
   output_status text;
   datetime_registered timestamp;
   datetime_last_show timestamp;
   arr_suryev_popup_shows text[];
   arr_suryev_popup_shows_length int;
   difference_now_registered double precision;
   difference_now_last_show double precision;

BEGIN
   -- read data into variables by using SELECT ... INTO ...
   SELECT registered INTO datetime_registered FROM public.users WHERE user_id=user_id_input;
   SELECT suryev_popup_shows INTO arr_suryev_popup_shows FROM public.users WHERE user_id=user_id_input;
   SELECT ARRAY_LENGTH(suryev_popup_shows, 1) INTO arr_suryev_popup_shows_length FROM public.users WHERE user_id=user_id_input;

   -- length of jsonb jsonb_suryev_popup_shows

   -- calculate difference between now and timestamp
   SELECT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP-datetime_registered)/3600 INTO difference_now_registered;
   -- calculate difference between now and last show of popup, if len of pop > 0

   IF arr_suryev_popup_shows_length > 0 THEN
      -- assign timestamp of last show into difference now-last show
      raise notice'array length greater than zero';
      SELECT TO_TIMESTAMP(arr_suryev_popup_shows[ARRAY_LENGTH(arr_suryev_popup_shows, 1)],'YYYY-MM-DD HH24:MI:SS') INTO datetime_last_show FROM public.users WHERE user_id=user_id_input;
      raise notice'last show: %', datetime_last_show;
      SELECT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP-datetime_last_show)/3600 INTO difference_now_last_show;
   END IF;

	-- assign output value for boolean depending on two input variables
    -- TRUE means popup will be shown in the webapp, FALSE means not

   output_status =  'false';

   CASE 
       WHEN arr_suryev_popup_shows_length IS NULL AND difference_now_registered < 24 THEN
           output_status =  'false';
       WHEN arr_suryev_popup_shows_length IS NULL AND difference_now_registered >= 24 THEN
           output_status =  'first';
       WHEN arr_suryev_popup_shows_length = 1 AND difference_now_last_show < 24 THEN
           output_status =  'false';
       WHEN arr_suryev_popup_shows_length = 1 AND difference_now_last_show >= 24 THEN
           output_status =  'second';
       WHEN arr_suryev_popup_shows_length > 1 THEN
           output_status =  'false';

       ELSE
           output_status = 'false';
   END CASE;
   
   -- add current timestamp to array text[] if output_status is 'first' OR 'second' --> add a new show of the popup
   IF output_status = 'first' OR output_status = 'second' THEN
      UPDATE public.users 
      SET suryev_popup_shows = ARRAY_APPEND(suryev_popup_shows, TO_CHAR(CURRENT_TIMESTAMP,'YYYY-MM-DD HH24:MI:SS')) 
      WHERE user_id=user_id_input;
   END IF;


   RAISE NOTICE 'handleSurveyPopupStatus: user_id % ; datetime_registered % ; jsonb_suryev_popup_shows % ; jsonb_suryev_popup_shows_length % ; difference_now_registered % ; difference_now_last_show % ; output_status %', user_id_input, datetime_registered, arr_suryev_popup_shows, arr_suryev_popup_shows_length, difference_now_registered, difference_now_last_show, output_status;  

   RETURN output_status;
END;
$$;