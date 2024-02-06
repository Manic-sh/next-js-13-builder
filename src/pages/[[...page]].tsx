import React from "react";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { BuilderContent } from "@builder.io/sdk";
import { GetStaticProps } from "next";
import Link from 'next/link';

builder.init("3f2e4166c5a949bb8a361a63d655f7e9");

const products = [
  {
    id: 103,
    name: 'Product A',
    description: 'This is the description for Product A.',
    price: 19.99,
    category: 'Electronics',
    inStock: true
  },
  {
    id: 104,
    name: 'Product B',
    description: 'This is the description for Product B.',
    price: 39.99,
    category: 'Clothing',
    inStock: false
  },
  {
    id: 3,
    name: 'Product C',
    description: 'This is the description for Product C.',
    price: 29.99,
    category: 'Home Goods',
    inStock: true
  }
];



// Define a function that fetches the Builder
// content for a given page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch the builder content for the given page
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + ((params?.page as string[])?.join("/") || ""),
      },
      
      options: {
        enrich: true,
        includeRefs: true,
      },
      enrich: true,
    
    })
    .toPromise();
  // Return the page content as props
  return {
    props: {
      page: page || null,
    },
    // // Revalidate the content every 5 seconds
    revalidate: 5,
  };
};

// Define a function that generates the
// static paths for all pages in Builder
export async function getStaticPaths() {
  // Get a list of all pages in Builder
  const pages = await builder.getAll("page", {
    // We only need the URL field
    fields: "data.url",
    options: { noTargeting: true },
  });

  // Generate the static paths for all pages in Builder
  return {
    paths: pages
      .map((page) => String(page.data?.url))
      .filter((url) => url !== "/"),
    fallback: "blocking",
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

  return (
    <>
      <Head>
        <title>{page?.data?.title}</title>
      </Head>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/aboutus">
                <a>About</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {/* Render the Builder page */}
      <BuilderComponent model="page" content={page || undefined} options={{ enrich: true }}  />
    </>
  );
}


