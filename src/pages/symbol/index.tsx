import { builder, BuilderComponent } from '@builder.io/react'

builder.init('3f2e4166c5a949bb8a361a63d655f7e9')


const myLocale = 'en-fr';

export const getStaticProps = async () => {
  // Dynamically fetch latest content from Builder.io API, so you can publish updates without
  // codebase changes
  const content = await builder.get('symbol',{
    userAttributes: { locale: myLocale },
    options: {
      locale: myLocale,
      includeUnpublishe: true,
    },
  }).promise();
  return { props: { content } }
}

// View full integration options and docs here: https://builder.io/c/docs/developers
export default function MyComponent({props}) {
  return <BuilderComponent
    content={props?.content}
    locale={myLocale}

    model="symbol" />
}

