import React, { FC } from 'react';
// import parse from 'html-react-parser';
import Head from 'next/head';
// import { MetaType } from '../../typing/types/MetaType';

// TODO: Тут ещё много чего не хватает. И помню ещё про опенграф-штуки и индексацию их

type PropsType = {
  meta?: any; //MetaType;
};

const CustomHead: FC<PropsType> = ({ meta }) => {
  // const roistatCounterScript = `
  //   <script>
  //     (function(w, d, s, h, id) {
  //         w.roistatProjectId = id; w.roistatHost = h;
  //         var p = d.location.protocol == "https:" ? "https://" : "http://";
  //         var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? "/dist/module.js" : "/api/site/1.0/"+id+"/init?referrer="+encodeURIComponent(d.location.href);
  //         var js = d.createElement(s); js.charset="UTF-8"; js.async = 1; js.src = p+h+u; var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2);
  //     })(window, document, 'script', 'cloud.roistat.com', '3ca99006e5663819d26141972f587682');
  //     </script>
  // `;

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <meta
        httpEquiv="x-ua-compatible"
        content="ie=edge"
      />
      <meta
        name="format-detection"
        content="telephone=no"
      />
      <meta
        content="true"
        name="HandheldFriendly"
      />
      <meta
        content="width"
        name="MobileOptimized"
      />
      <meta
        content="yes"
        name="apple-mobile-web-app-capable"
      />
      <link
        rel="shortcut icon"
        href="/favicon.ico"
      />

      <title>ТЕСТ</title>

      {meta && (
        <>
          {meta.title && <title>{meta.title}</title>}
          {meta.description && (
            <meta
              name="description"
              content={meta.description}
            />
          )}
          {meta.ogTitle && (
            <meta
              property="og:title"
              content={meta.ogTitle}
            />
          )}
          {meta.ogDescription && (
            <meta
              property="og:description"
              content={meta.ogDescription}
            />
          )}
        </>
      )}

      {/* {roistatCounterScript && parse(roistatCounterScript)} */}
    </Head>
  );
};

export default CustomHead;
