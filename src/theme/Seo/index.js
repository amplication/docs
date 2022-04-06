import React from 'react';
import Seo from '@theme-original/Seo';

export default function SeoWrapper(props) {
  return (
    <>
      <Seo {...props} />
      {/* Start of HubSpot Embed Code */}
      <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25691669.js"></script>
      {/* End of HubSpot Embed Code */}
    </>
  );
}
