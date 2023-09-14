// pages/[...page].tsx
import React from "react";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { GetStaticProps } from "next";

// Replace with your Public API Key
builder.init("3f2e4166c5a949bb8a361a63d655f7e9");


//Builder.register("editor.settings", { hideCommentsTab: true });

const locale = 'es-ES';

const theme = [{
  'darkMode': true,
}];
 //builder.apiVersion = "v1"
// Define a function that fetches the Builder
// content for a given page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch the builder content for the given page
  const page = await builder
    .get("page", {
      options: {
        noTraverse: false,
        includeUnpublished: true,
        locale: locale,
      },
      userAttributes: {
        urlPath: "/" + ((params?.page as string[])?.join("/") || ""),
      },
      
      locale:locale,
    })
    .toPromise();

    //console.log("🚀 ~ file: [...page].tsx:49 ~ getStaticPaths ~ pages:", page);

  // Return the page content as props
  return {
    props: {
      page: page || null,
    },
    // Revalidate the content every 5 seconds
    revalidate: 60,
  };
};

// Define a function that generates the
// static paths for all pages in Builder
export async function getStaticPaths() {
  // Get a list of all pages in Builder
  const pages = await builder.getAll("page", {
    // We only need the URL field
    fields: "data.url",
    options: { noTargeting: true},
  });


  // Generate the static paths for all pages in Builder
  return {
    paths: pages.map((page) => `${page.data?.url}`).filter(url => url !== '/'),
    fallback: 'blocking',
  };
}

// Define the Page component
export default function Page({ page }: { page: BuilderContent | null }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  // If the page content is not available
  // and not in preview mode, show a 404 error page
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  // If the page content is available, render
  // the BuilderComponent with the page content
  // const handleContentLoaded = (content: BuilderContent) => {
  //     console.log("🚀 ~ file: [...page].tsx:74 ~ handleContentLoaded ~ content:", content);
  // };
  
  return (
    <>
      <Head>
        <title>{page?.data?.title}</title>
      </Head>
      {/* Render  twice  Builder contentLoaded */}
      {/* <BuilderComponent model="page" content={page || undefined} 
                      contentLoaded={(data, content) => {
                        handleContentLoaded(content);
                      }}
      /> */}
            <BuilderComponent model="page" locale={locale} content={page || undefined} data={{theme}}/>
      {/* Workaround for single render */}
    </>
  );
}
