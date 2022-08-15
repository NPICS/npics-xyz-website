import {useEffect} from "react";
import moment from "moment";

export default function ConfigureUpdater() {

  // Moment
  useEffect(() => {
    moment.updateLocale('en', {
      relativeTime: {
        d: '1 day',
        h: '1 hour',
        m: '1 minutes',
        M: '1 month',
        y: '1 year'
      }
    })
  }, [])

  return null
}